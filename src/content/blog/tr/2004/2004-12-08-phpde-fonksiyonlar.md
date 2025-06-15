---
title: "PHP'de fonksiyonlar"
slug: phpde-fonksiyonlar
date: 2004-12-08
description: "PHP'de fonksiyonların ne olduğunu, nasıl tanımlandığını ve kullanıldığını öğrenin. Bu rehber, yerleşik fonksiyonlar, parametreler, değer döndürme ve kendi özel fonksiyonlarınızı nasıl yazacağınızı örneklerle açıklıyor."
url: http://mfyz.com/tr/phpde-fonksiyonlar/
tags: ["fonksiyonlar", "function", "PHP", "programlama", "web geliştirme", "parametre", "return", "kodlama"]
category: PHP
migration: {"wpId":71,"wpPostDate":"2004-12-08T05:57:43.000Z"}
lang: tr
---

Fonksiyonlar, matematikteki gibi bazı işlem gruplarını sık sık kullandığımız alanlarda bize oldukça kolaylık sağlar. PHP'de de aynı şekilde, belli işleri yapan ve sonuçta bazı durumlara göre uygulamanın ilerleyişini değiştiren çoğu işlemde kolaylık sağlar. Bu fonksiyonları komplike uygulamaların sık tekrarlanan parçaları olarak görebiliriz. Fonksiyon yapılarını, aslında PHP içinde farkında olmadan, sık sık kullanıyoruz. (Biz her ne kadar farkında olmasak da onlar hep fonksiyondu ve fonksiyon olarak kalacaklar :)

Örneğin, **print()** ya da **echo()**, php içerisinde en sık kullandığımız fonksiyonlardandır. "print();" yazarak bu fonksiyonu çağırmış oluyoruz ve bize bir sonuç veriyor. Fonksiyonlar parametre alarak çalışırlar.

```php
print("Selam Gençler");

```

Buradaki "Selam Gençler" metini, print(); fonksiyonunun almış olduğu parametredir. Tabi fonksiyonların aldığı parametreler sadece string türünde olmayabilir. Bu parametre değer, değişken, dizi, sabit veya başka bir fonksiyonun sonuç kümesi olabilir.

```php
$metin = "Selam Gençler";
print($metin);

```

Bu örneğimizde, bir önceki örnekteki ile aynı sonucu verecektir, yani ekrana "Selam Gençler" yazdıracaktır.

PHP nin kendi içerisinde hazır olarak bulunan bu fonksiyon örneklerini çoğaltmak mümkündür (substr(), strlen(), mysql_fetch_array()...) Örnek olarak verdiğimiz bu fonksiyonlar parametre alarak çalışırlar. PHP nin parametre almadan çalışan fonksiyonları da vardır.

```php
exit();

```
PHP yorumlayıcısı bu satırı (fonksiyonu) gördüğünde sayfanın fonksiyondan sonrasını dikkate almayacaktır.Yani çalışma işlemi bu noktada duracaktır. Göründüğüz üzere exit(); fonksiyonu hiçbir parametre almadan çalışmaktadır. (phpinfo(), break()...)

PHP nin kullanılmak üzere bizlere sunduğu bu fonksiyonlara yerleşik fonksiyonlar adını verebiliriz. Burada asıl amacımız, kendi fonksiyonlarımızı yazmak. Bu yüzden ilk olarak PHP nin yerleşik olan, kendi fonksiyonlarını yüzeysel olarak inceledik. Temel olarak bir fonksiyon yazarken kullanacağımız komut dizisi şöyledir;

```php
function fonksiyonum ( parametre_1, parametre_2 ... ) {
  // yapılacak işlemler
}

```

Vermiş olduğumuz bu fonksiyon örneği, parametreler kullanarak işlem yapmaktadır. Yerleşik fonksiyonlarda olduğu gibi, kendi yazdığımız fonksiyonlar da parametre almadan işlem yapabilirler.

```php
function fonksiyonumx () {
  // yapılacak işlemler;
}

```
Fonksiyonumuzu yazdıktan sonra artık kullanıma hazır hale gelmiş olur. Sıra yazmış olduğumuz fonksiyonu çağırmaya geldi.

```php
fonksiyonumx();

```

Bu örneğimizde yazmış olduğumuz fonksiyonu parametre girmeden kullanıyoruz. Parametre alan fonksiyonumuzu ise şu şekilde çağırmalıyız;

```php
fonksiyonum("deger_1","deger_2" ...);

```
Fonksiyon yazım kurallarını gördükten sonra, konunun daha iyi anlaşılması için artık çalışır bir fonksiyon yazabiliriz. Örneğin PHP nin yerleşik fonksiyonlarından biri olan print() fonksiyonunu Türkçeleştirelim. (ama sakın bu örneği uyguladıktan sonra yerleşik fonksiyonları tümünü Türkçeleştirmeye kalkmayın) :)

```php
function yazdir( $girilen_metin ) {
  print($girilen_metin);
  // $girilen_metin degiskenini ekrana yaz.
}

// fonksiyonu cagirmak icin;
yazdir("merhaba arkadaşlar");

```

Bu fonksiyonu yazıp, yukarıdaki haliyle çağırdıktan sonra ekranda fonksiyona girmiş olduğumuz metini, yani "merhaba arkadaşlar" yazısını göreceğiz. **$girilen_metin**, fonksiyonumuza ait parametremiz. Bu parametre, ekrana yazdırmak istediğimiz metini tutuyor. Parametre olarak yazdığımız metin $girilen_metin değişkenine depolanıyor, böylece fonksiyonumuz kendi içerisinde kullanılmak üzere bir veriye sahip oluyor. Daha sonra bu veri fonksiyon içerisinde gerekli yerlerde kullanılıyor.

**Önemli NOT :** Fonksiyonlar içerisinde olan bütün olaylar içeride kalır. İçeride atanan değişkenler, İçerideki sorgulamalar ve diğerleri. Aynı şekilde bir fonksiyon dışarıdan verileri TEK yolla alır. Onlar da parametrelerdir. Bunun dışında bir fonksiyon içerisinde sabitler ve ortam değişkenleri dışında hiçbir şekilde dış değişkenler direk kullanılamaz. Bunun için $GLOBALS dizisi kullanılır. Dışarıda atanan bir değişkene bu dizi içerisinde atanmış bir eleman gibi erişebiliriz.

### Ufak bir uygulama yapalım

Öyle bir fonksiyon yazalım ki kullanıcıdan aldığımız metnin karakter sayısını bulsun ve ekrana hem bu metni, hem de bu metnin kaç karakterden oluştuğunu yazdırsın. İlk olarak kullanıcıdan alacağımız bilgi giriş sayfasını yazalım;

-- uzunluk.html --
```html
<html>
  <body>
    <form action="uzunluk_hesapla.php" method="post">
      <input type="text" name="metin" size="15"><br>
      <input type="submit" value="Gönder">
    </form>
  </body>
</html>

```

-- uzunluk_hesapla.php --
```php
function uzunluk($deger){
  $kac_karakter = strlen($deger);
  echo 'Girilen Metin : '.$deger.'<br>';
  echo 'Metin Uzunlugu : '.$kac_karakter.'<br>';
}

// fonksiyonu çagiriyoruz.
uzunluk($metin);
```

Oldukça kolay değil mi? Uzunluk adında bir fonksiyon oluşturduk ve parametre olarak (girilen verileri depolaması için) $deger adında bir değişken belirledik. Daha sonra $deger değişkenimizin (bu değişkenin fonksiyonumuza ait parametremiz olduğunu söylemeye gerek yok sanırım) uzunluğunu bulabilmek için, PHP'nin yerleşik fonksiyonu olan strlen()'i kullandık. Bu değeri $kac_karakter değişkenine atadık. Böylece kullanıcıdan alacağımız değerin ($deger değişkeninin) uzunluğu artık, $kac_karakter değişkenimize depolanmış oldu.

Echo fonksiyonunu kullanarak bu verileri ekrana yazdırdık. İlk önce kullanıcıdan alarak $değer değişkeninde depoladığımız metini, ardında da metinimizin, $kac_karakter değişkeninde tuttuğumuz uzunluğunu. Son olarak da "uzunluk($metin);" komutuyla fonksiyonumuzu çağırdık. buradaki $metin değişkeni (tahmin ettiğiniz gibi) uzunluk_gonder.htm dosyamızdan PHP sayfamıza POST metoduyla göndermiş olduğumuz string i tutuyor)

### Parametrelere değer verilmezse?

Fonksiyonlar her sayfada kullanılacağı için fonksiyonlarımızı seçeneklere bağlı hale getirebiliriz. Eğer kullanıcı fonksiyona bir parametre göndermemişse fonksiyon sapıtabilir. Örneğin print() fonksiyonu kullanırken herhangi bir şekilde parametre kullanılmadan çağırılırsa fonksiyon boş değer döndürür (false değil NULL). Eğer fonksiyonunuz işlerinizde ölümcül bir işi yapıyorsa fonksiyonu kullanırken bunu denetleyebilirsiniz. Mesela;

```php
function hesap ( $deger = false ) {
  return $deger;
}

```
Eğer bir parametre verilmezse fonksiyon programsal yanlış dönecektir. Kontrolle işlerimize devam ederiz. Başka bir kullanımda; uygulamanın herhangi bir noktasında bir fonksiyon kullanılıyor ve işletilememesi uygulamanın hatalar getirmesine yol açıyorsa;

```php
if ( $sonuc = fonksiyon($deger) ) {
  print("Hata oluştu. Uygulama durduruldu!");
  exit;
}
```
Şeklindeki kullanımla bu hataları önleyebilir veya uygulamanın başka yollarda devam etmesini sağlayabiliriz. Gördüğünüz gibi parametrelere gelen değerleri geçerli olarak belirleyebiliyoruz. Bunun farklı bir kullanım alanı da şöyledir; fonksiyona gönderilen birden çok parametre sürekli farklı ayarlamalar yapıyor ve çok değişik kombinasyonlar çıkabiliyorsa, bu opsiyonların belirlenmemesi durumunda (yani parametrelerin boş olması durumunda) fonksiyonun kendimizce belirlediğimiz standart opsiyonlarda gitmesini sağlamak için fonksiyonu tanımlarken geçerli değerleri belirleyerek bu isteğimizi gerçekleştirmiş oluruz.

**Hazırlayan:** Sezgin Bilketay