---
title: "Şekil URL'ler yapmak"
slug: sekil-urller-yapmak
date: 2006-09-04
url: http://mfyz.com/tr/sekil-urller-yapmak/
tags: ["PHP","url"]
category: PHP
migration: {"wpId":93,"wpPostDate":"2006-09-04T03:08:16.000Z"}
lang: tr
---

#### Sebep?

Bizim için önemli olan ne? Hava atmak mı? Yoksa gerçekten de fark yaratmak mı? Buna karar verdikten sonraki adım sizler için gerçekten de "belirleyici" olacaktır.

#### Nasıl?

Genel olarak siteler GET methodu ile gelen değişenlerini php'de sunucu öntanımlı değişkenleri ile kolaylıkla alabilmekte. Fakat bu anlatacağım döküman size bu sitedeki url yapısını anlayabilmenizi ve istediğiniz gibi uygulayabilmenizi sağlayacaktır. Sunucu öntanımlı değişkenleri arasında QUERY_STRING olduğunu biliyoruz. Bu değişken url çağrısındaki "?" (soru işaretinden) sonraki kısmı string olarak verir.

Yani:
```
http://www.domain.com/dosya.php?kategori=php&no=130
```
adresine göre QUERY_STRING, "kategori=php&no=130" olarak dönecektir.

Aslında normalde php'nin yaptığı şey bize bu string'i önce "&" işaretine göre parçalayıp ardından "=" işaretine göre parçalamak ve bir diziye ilk kısımları anahtar (key), ikinci kısımları da değer olarak $_GET dizisinde yayınlamak olmaktadır.

Şimdi stemizde url'lerimizde kullanmayacağımızı düşündüğümüz bir ayraç belirlememiz gerekiyor ("#" işareti hariç. Çünkü html'de sayfa içerisi çapa (anchor) olarak tanımlanır ve bize QUERY_STRING ile dönmez). MFYZ.Com'da bu ayraç normaldeki ile aynı yani "&" işareti parametre ayracı olarak kullanılmaktadır (bknz : "mfyz.com/?forum&php").

Tabiki daha da ilgiç şeyler yapmak isteyebilirsiniz;
```
http://www.mfyz.com/?forum.php.5
http://www.mfyz.com/?forum~php~5
http://www.mfyz.com/?forum_php_5
http://www.mfyz.com/?forum/php/5

```
gibi şekillere sokmanız da mümkün. Değişen tek şey diziyi parçaladığınız ayraçtır..

Yavaş yavaş koda girelim:
```
$parametreler = $_SERVER["QUERY_STRING"];

```
ilk önce $parametreler değişkenine alalım bu kısmı. Ardından $parametreler değişkenini dizi olarak &'lere göre parçalayalım.
```
$parametreler = explode("&", $parametreler);

```
Şu anda $parametreler dizisinde ?'den sonra gelen tüm parametreler parçalanmış şekilde bulunuyor. Ben sitemde modüler bir yapı izlediğim için, her sayfa aslında bir modül tarafından oluşturuluyor ve ben de alt parametrelerle modüllerin içindeki alt işlemleri uygulayabiliyorum.

Her modüle bir mantıksal sıra koyarak url'de parametrelerin sırasını belirli şeyler olarak algılatabilirim (ki öyle yapıyorum). Şimdi her sayfada modül adı şart olduğuna göre ?'den sonraki ilk parametreyi HER ZAMAN modül adı olarak alıyorum. Geri kalan kısımı da $parametreler adında bir dizi içinde saklıyorum.

Gelelim ilk elemanı nasıl alıp diğer kısmı dizide tutuyorum.
```
$modul = array_shift($parametreler);

```
Bu kod, daha doğrusu array_shift fonksiyonu bir dizinin başındaki elemanı atar ve o attığı elemanı döner. Yukarıdaki kullanım sayesinde, $parametreler dizisinin ilk elemanını hem atmış oluyorum hem de bu atılan elemanı $modul değişkeninde saklamış oluyorum.

Bundan sonra da modül işlemimi $modul değişkeni ile yapıyor, modüller içerisindeki parametreleri de doğrudan $parametreler dizisi ile kullanabiliyorum.

Eğer modüler sistemi bu şekilde nasıl kullanacağınızı bilmiyorsanız [https://tr.mfyz.com/bir-sitenin-kod-duzeni-nasil-olmali/](https://tr.mfyz.com/bir-sitenin-kod-duzeni-nasil-olmali/) dökümanından öğrenebilirsiniz. Yapacağınız tek şey var, orada index.php?module=bilmemne şeklinde aldığınız ve direk _GET ile kullandığınız modul kontrolu ve çalıştırma mantığını buradaki değişken alımını yapıp uygulayacaksınız 🙂