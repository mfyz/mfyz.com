---
title: "Temel JavaScript (1) - JavaScript Hakkında"
slug: temel-javascript-1-javascript-hakkinda
date: 2005-01-29
description: "Temel JavaScript dersleri serisinin ilk bölümü. Bu rehber, JavaScript'in ne olduğunu, web geliştirmede neden önemli olduğunu, değişken tanımlamayı ve HTML nesnelerine erişimi (`document.getElementById`) temel düzeyde açıklıyor."
url: http://mfyz.com/tr/temel-javascript-1-javascript-hakkinda/
tags: ["JavaScript", "JS", "Arayüz Programlama", "web geliştirme", "javascript temelleri", "değişkenler", "DOM", "javascript dersleri", "betik dili"]
category: Arayüz Programlama
migration: {"wpId":118,"wpPostDate":"2005-01-29T05:00:00.000Z"}
lang: tr
---

## Web Programcıları İçin Temel JavaScript Bilgisi

* * *

#### JavaScript Nedir?

JavaScript günümüzde neredeyse bütün tarayıcılar tarafından desteklenen kullanıcı taraflı betik (script) dilidir. Web geliştirme ile ilgilenen tüm programcı arkadaşların en azından basitçe bilmesi gereken çok kullanışlı bir dildir. Kodları, ismindende anlaşılacağı gibi java tabanı üzerine kuruludur.

#### Neden Temel JavaScript Bilgisine İhtiyaç Duyayım?

Çünkü çogu web sayflarında aktif kısımlar vardir, üzerine gelince efekt uygulanan resimler, özellikle bol sayıda formlar vb. Bu öğelerde javascript fonksiyonlarını kullanırız ve bu bahsettiğim öğeler bir web sayfasının interaktif bir ortama dönüşmesini sağlayan şeylerdir. Kullanıcının etkileşimini sağlar.

Çoğu kişiden interaktif kısımlar hakkında çok soru alıyorum, "kendine özgü pop-up'ları", "bu kadar dinamik sayfaları nasıl yapıyorsun?" diye. Bunların hepsi javascript sayesinde oluyor.

Burada temel javascript bilgisi vermemin asıl amacı php, asp, jps gibi sunucu tabanlı uygulama geliştiren arkadaşlara web formlarındaki kontrolleri javascript ile yaptırarak sunucuyu yormamak. Aynı zamanda kullanıcı için de zaman tasarrufu anlamına geliyor bu.

Böyle birşeyi anlatmak için küçük bir örnek vereyim; Diyelim ki uzun bir başvuru formunuz var, bir de dosya yüklenmesi gereken bir alan (mesela fotograf). Her tarayıcı, bir form gönderilirken dosyaları da birlikte sunucuya gönderir. Bundan sonrası sunucu tarafında işler. Siz birkaç mehabytelık dosya göndericek olursanız ve adınızı girmediğinizde, form gönderilirken, dosyalar yüklenir ve o kadar beklemeden sonra bir hata ile karşılaşırsınız "Adınız boş olamaz!" diye. Bütün sinirinizle bilgisayara bakar ve geri tuşuna basarsınız. İşte bunun gibi durumlarda karakter sayısını kontrol etmek gibi basit işlemlerden oluşan kontrolleri javascript ile hallederek zamandan ve kullanıcının negatif bakış açısı kazanmasından tasarruf etmiş olursunuz.

Bir web programcısının neden javascript kullanması gerektiğini anlattığıma göre artık yavaştan yavaştan javascript'e girmeye başlayabilirim.

> Bu döküman serisinde anlatılan neredeyse her şeyi kendiniz de deneyip html'ler şeklinde ayrı ayrı kaydedip yapabilirliğinizi artırın ve pratik yaparak öğrenmiş olun.

Değişken tanımları Java ve c tabanlı dillerdeki gibi;

```js
var a = "deneme";
// veya
a = "deneme";
/* tanımlanmamış değişkenler kullanılırken hata verir. */
```
şeklinde tanımlanıyor.

Görüğünüz gibi açıklama satırları da // ve /* */ ile yapılıyor.

Yazacağınız kodlara bol bol açıklama koymayı unutmayın, çünkü açıklamalar hata yakalamanızı kolaylaştırır, yapılan işlemleri daha rahat görmenizi sağlar. Zira aynı koda 2 ay sonra baktığınızda herşeyi unutmuş olabilirsiniz. Ya da aynı koda başka birisi müdahale etmek zorunda kalabilir.

#### Nesne Adresleri

JavaScriptde objeler'in adresleri aynı bir ev adresi tanımlamak gibi oluyor. Büyük yer tanımından küçüğe doğru anlattığınızı düşünün:
```
Türkiye -> Ankara -> Kızılay -> Karanfil Sokak -> XX. Apartman -> YY. Numara

```
gibi, benzer şekilde her nesne kendinden bir üstteki nesnenin içinde olduğundan adresleme de bir ağaç yapısına benzetilebilir.
```
window.document.nesne_adi

```
window aynı penceredeki çerçeveler (frame) arasında iletişirken, document, aynı dökümandaki nesneler arasında geçerli oluyor. Mesela faklı bir çerçevedeki bir resim **window.frame_adi.resim_adi** şeklinde oluyor.

JavaScript'de bu bölümde en önemli nokta formlarda. Formlar kendi kategorisi içerisinde değerlendiriliyor. Mesela bir formdaki ad şeklindeki bi textfield'ın adresi **document.form_adi.text_input_adi** oluyor.

Sayfanızda kullandığınız nesneleri adreslemek için gereksiz formlar eklemenize gerek yoktur. Mesela, bir input'u sadece bir efektin taşıyıcısı olarak kullanacaksak bunun için bir form daha eklememiz gerekmez. Normalde form nesneleri bir formun içerisinde değilse doğrudan document'dan sonra belirterek erişilemez. Bir form bulunmadığında ise bu nesnemizin etikentinde id şeklinde belirttiğimiz prametreyi kullanarak adresini alabiliriz. Bu işi de document nesnesinin bir özelliği yardımı ile yapıyoruz.

```js
document.getElementById('eleman')
```
dediğimiz zaman document nesnesi üzerindeki bütün alt nesneler taranır ve "eleman" kimliğine uyan elemanın adresi nesne şeklinde döner. Bir değişkene atayıp "eleman" kimlikli nesneyi kullanabiliriz.

**Örnek:**

```html
<input id=""efekt"" type=""button"" value=""X"" />
<script>
 function degistir(){
  var nesne = document.getElementById('efekt');
  if(nesne.value=='X'){
   nesne.value='-';
  }else{
   nesne.value='X';
  }
 }
</script>
```

### Fonksiyonlar

Fonksiyonlar basitçe;

```js
function fonksiyonum( parametrem1, parametrem2, ... , parametremn ){
  // kodlar
}
```
şeklinde tanımlanıyor. Aynı php, flash ve çogu c, java dillerindeki gibi.

> JavaScript Büyük-Küçük harf ayrımı yapar. Onun için kullanımlarınızda tanımlı fonksiyon, değişken isimlerini yazarken dikkat edin!

#### Hata Yaparsak?

Çoğu browser bu konuda debugger'a sahiptir. Yani eğer hata yaparsanız uyarı alır, veya sayfanın status'unde hatalı olduğunu görürsünüz. Internet Explorer'da statusbar'da ünlem, Netscape'de uyari penceresi çıkar.

> Mozilla Firefox'da JavaScript konsolu ile takip edebilir, hatta firebug eklentisi ile çok daha iyi hata yakalama teknikleri uygulayabilirsiniz. Firebug ile aynı zamanda css ve html hatalarınızı da ölçebilir, sayfanızın yüklenme hızı optimizasyonunu yapabilirsiniz. http://www.getfirebug.com/

[Temel JavaScript (2) - JavaScript'e Girelim](/temel-javascript-2-javascripte-girelim/) dökümanından devam edin.