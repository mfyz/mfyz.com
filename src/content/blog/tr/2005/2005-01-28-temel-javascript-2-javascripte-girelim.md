---
title: "Temel JavaScript (2) - JavaScript'e Girelim"
slug: temel-javascript-2-javascripte-girelim
date: 2005-01-28
url: http://mfyz.com/tr/temel-javascript-2-javascripte-girelim/
tags: ["Arayüz Programlama","javascript","js"]
category: Arayüz Programlama
migration: {"wpId":119,"wpPostDate":"2005-01-28T05:00:00.000Z"}
lang: tr
---

##  Web Programcıları İçin Temel JavaScript Bilgisi

* * *

#### Gereksiz açıklamalar

Okuduğunuz bu dökümanın başlığından da anlayabileceğiniz gibi bunu okuyan arkadaşlarımın neredeyse hepsi programcı, illaki bir c veya java tabanlı dil ile uğraşmışsınızdır. Javascriptdeki neredeyse çoğu şey c, java ailesi dillerde olduğu gibidir. O açıdan döngüler, kontrol yapıları, operatörler ile ilgili verilmesi gereken bilgileri geçiyorum.

#### Olaylar, kullanıcı hareketinin kontrolü

Javascript dinamiktir, olaylara tepki vermesi için geliştirilmiştir. Zaten kullanım alanı kullanıcının etkisine tepki veren sayfa geliştirmektir. Mesela farenin hareketine, biryere tıklamaya veya bi nesne üzerindeki olaylara.

HTML nesneleri üzerinde bazı olaylar tanımlayarak o olaylarda javascript fonksiyonlarımızın/görevlerimizin çalıştırılmasını sağlayacağız. Bütün görevler olaylar ile tanımlanmak zorunda değildir. Bir görevi olay vermeden yazarsak, html sunucudan yüklenmeye başladıktan sonra, yazdığınız kod okunup anlamlı halde yorumlandığı anda işlenmiş olacaktır. Bu olaylar nesneler arasındaki farklara göre değişir. Bir buton tıklanabilir, üstüne fare imleci getirilebilir, odaklanabilir vs bir resim tıklanabilir, yüklenebilir, fare imleci üstüne getirilip üstünden kaçırılabilir ancak odaklanamaz!

Olayları html etiketlerine doğrudan argüman olarak yazabiliriz ya da betiğimiz içinde nesne olarak ulaştıktan sonra tarayıcı türüne göre o nesneye bir olay (event) ekleyerek tepki oluşturabiliriz.

Örneğin bir input butona tıklandığında tepki olarak ekrana birşeyler yazdıralım.
```
<input type="button" value="Tıkla" />

```
Çıktı : 

Her nesneye ait belirli olan bu olayları araştırarak bulabilirsiniz. Sabit birşey yok çünkü, bu olayları web tarayıcı programı yakaladığı için bazı olaylar her tarayıcı tarafından yakalanmıyor ya da farklı algılanıyor.

Burada bütün olası olayları ve anlamlarını açıklayarak yazacağım;
```
onLoad       Yüklenme olayıdır. Nesnenin yüklenmesi tamamlandığı zaman gerçekleşmiş demektir.
onAbort      Sayfa veya bir nesnenin yüklenmesinin kullanıcı tarafından durdurulması olayıdır.
onError      Sayfa veya bir nesnenin yüklenmesinde bir hata oluşması olayıdır.
onUnload     Kullanıcının sayfadan ayrılması olayıdır.
onClick      Kullanıcının belirtilen nesne alanına tıklanması olayıdır.
onMouseOver  Kullanıcının fare kursörünü, belirtilen nesne alanına getirmesi olayıdır.
onMouseOut   Kullanıcının fare kursörünü, belirtilen nesne alanından ayırması olayıdır.
onSelect     Belirtilen nesnenin seçilmesi olayıdır.
onFocus      Belirtilen nesneye herhangi bir şekilde odaklanması durumudur.
onBlur       Odaklanmış olan nesneden ayrılma durumudur.
onSumbit     Bir formun gönderim işleminin başlaması olayıdır.
onReset      Bir formun verilerinin sıfırlanması olayıdır.
onChange     Bir nesnenin parametrelerinin (değerlerinin) değişmesi olayıdır.

```
http://www.w3schools.com/jsref/jsref_events.asp adresinden hangi olayların hangi html nesneleri tarafından desteklenip desteklenmediğini öğrenebilirsiniz.

[Temel Javascript (3) - Çıktılar ve Nesneler](https://tr.mfyz.com/temel-javascript-3---ciktilar-ve-nesneler) dökümanından devam edin.