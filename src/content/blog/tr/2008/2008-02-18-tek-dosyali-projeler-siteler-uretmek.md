---
title: "Tek dosyalı projeler (siteler) üretmek"
slug: tek-dosyali-projeler-siteler-uretmek
date: 2008-02-18
url: http://mfyz.com/tr/tek-dosyali-projeler-siteler-uretmek/
tags: ["NULL","PHP"]
category: PHP
migration: {"wpId":135,"wpPostDate":"2008-02-18T21:43:41.000Z"}
lang: tr
---

Bazen yazdığınız/yazacağınız modül/sayfa/proje çok işlem ve bölüm içermeyebilir. Farklı içeriğe sahip kısa ama çok metin olabilir elinizde. Ya da modülünüzde işlemler kısadır. Ya da tamamen ilginçlik olsun diye tek dosyada birçok işi yaptırmak isteyebilirsiniz.

Mesela sadece bir dizini listeleyip, dosyalar üzerinde ufak işlemler yaptıran bir betik yazıyor olabilirsiniz. Ya da bir reklam kampanyası için reklam sayfasının yanında ufak bir bilgi (hakkında) sayfası ve iletişim formu olan ufak bir site yapıyor olabilirsiniz.

Ufak işlemler içeren sayfalara bir sürü dosya oluşturup dosya kalabalığı yaptırmaktansa tek dosyada toplayabilirsiniz. Bu dökümanda ufak bir örnekle tek dosyadan oluşan bir site/sayfa yapacağım.

#### Başlıyoruz

Önce basit html yapınızı modüler yapıdaki gibi hazırlayalım.
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
  "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <title>Tek dosyadan oluşan sayfam</title>
  </head>
<body>
  <h1>Fatih'in sitesi</h1>
  <ul>
    <li><a href="index.php">Anasayfa</a></li>
    <li><a href="index.php?bolum=hakkimda">Hakkımda</a></li>
    <li><a href="index.php?bolum=projeler">Projeler</a></li>
    <li><a href="index.php?bolum=iletisim">İletişim</a></li>
  </ul>
  <hr>
  <div>
    içerik kısmı
  </div>
  <hr>
  Mehmet Fatih YILDIZ 2008
</body>
</html>

```
gördüğünüz gibi oldukça basit. Site başlığı, ufak bir menü iki HR arasında sayfa içeriği ve sayfa sonu notu. Sayfa içeriği kısmına modüler yapıdaki gibi içerğimizi basacağız.

Şimdi 4-5 tane sayfamız var bunların içeriklerini gömeceğiz dosyamızın içine. Aslında hepsi basit bir kontrol mekanizması ile hallolacak.
```php
<?php

// bilgiler
$bolum = $_GET["bolum"];
$islem = $_GET["islem"];

// ekrana basilani tamponlayalim
ob_start();

// sayfa icerikleri
if( $bolum == 'hakkimda' ){
echo <<<HTML_SON
<h2>Hakkımda</h2>
Ben buyum şunları bunları yaparım falan feşmekan.<br>
<br>
Şurada okudum, burada okuyorum büyüyünce X olacağım<br>
<br>
siteyi şöyle yaptım böyle ettim.
HTML_SON;
}
else if( $bolum == 'projeler' ){
echo <<<HTML_SON
<h2>Projelerim</h2>
PHP ile şu projelerin altyapısıyla uğraşıyorum.
Hede hödö
HTML_SON;
}
else if( $bolum == 'iletisim' ){
echo <<<HTML_SON
<h2>İletişim</h2>
İletişim bilgilerim : asd@asd.com<br>
<br>
<form action="index.php?islem=iletisim" method="post">
  Ad : <input type="text" name="ad">
  <br>
  E-posta : <input type="text" name="ad">
  <br>
  Mesaj : <textarea name="ad"></textarea>
  <br>
  <input type="submit" value="Mesajı gönder">
</form>
HTML_SON;
}
else { // anasayfa
echo <<<HTML_SON
Siteme hoşgeldiniz
HTML_SON;
}

// tamponlanan icerigi alalim
$icerik = ob_get_contents();

// tamponu bosaltalim, ekrana basilmasin
ob_end_clean();

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
  "http://www.w3.org/TR/html4/loose.dtd">
...
```

Yukarıda gördüğünüz gibi sayfa içeriklerini kontrole göre ekrana bastık. Burada dikkatinizi 2 şey çekmiştir. ob_start, ob_get_contents ve ob_end_clean fonksiyonlarını ekrana basılan şeyleri $icerik değişkenine aktarabilmek için yaptım.

```sh
echo <<<HTML_SON
...
HTML_SON;

```
kullanımı ise "HTML_SON" kelimesini bitirme kelimesi olarak görerek içeride tırnakları istediğimiz gibi kullanma özgürlüğü sunduğu için yaptım. Yani HTML_SON'ların arasında özgürce istediğiniz her karakteri kullanabilirsiniz. Bu sayede html olarak hazırladığınız sayfa içeriklerini 1-1 kopyala yapıştırarak rahatça işinizi halledebilirsiniz.

Gelelim neden çıktıyı tamponladığıma, bu işlemi hiç echo, tamponlama kullanmadan şöyle de yapabilirdiniz :
```php
if( $bolum == 'hakkimda' ){
$icerik = "<h2>Hakkımda</h2>
Ben buyum şunları bunları yaparım falan feşmekan.<br>
<br>
Şurada okudum, burada okuyorum büyüyünce X olacağım<br>
<br>
siteyi şöyle yaptım böyle ettim.";
}
else if( $bolum == 'projeler' ){
$icerik = "<h2>Projelerim</h2>
PHP ile şu projelerin altyapısıyla uğraşıyorum.
Hede hödö";
}
else if( $bolum == 'iletisim' ){
...

```
Ama bir sürü tırnak sorunu ile uğraşmanız gerekebilirdi.

Neyse içeriklerimizi get ile gelen bolum parametresine göre belirlediğimize göre htlm'imizde konumlandırabiliriz. Sayfanızdaki "içerik kısmı" yazan yere
```html
...
  <hr>
  <div>
    <?=$icerik;?>
  </div>
  <hr>
...

```
$icerik değişkenini basıyoruz. Böylece tek sayfada içerik basabiliyoruz.İşin bir de işlem kısmı var. Yani tek dosyada toplamaya çalıştığınız site/sayfa sadece içerikten oluşmak zorunda değil. Aynı zamanda php'ye bazı işler yaptırmanız gerekebilir. Hatta modül için bu tek dosya mantığını düşünürseniz işlem modüllerinde içerik değil sadece işlemler vardır. Aynı mantıkla bunu da yapabilirsiniz.

Örnekte gördüğünüz gibi iletişim bölümünde bir iletişim formu var. Bunu işleyen kısmı buraya gömmek için sayfa içeriklerini seçtirmeden önce işlemler için de bir kontrol bloüu koyuyoruz.
```php
<?php
// bilgiler
$bolum = $_GET["bolum"];
$islem = $_GET["islem"];
// once islemler kontrol edilmeli
if( $islem == 'iletisim' ){
  // iletisim formunu eposta ile gonderen
  // veya veritabanina kaydeden kodu
  // buraya yerlesitiryorsunuz
  
  /* tabiki islemler bittikten sonra exit ile
  betigin calismasini durdurmaniz lazim.
  zaten bundan once işleminizin sonucunu
  ekrana basmis olmaniz lazim.
  "başarıyla gönderildi" veya gönderilemedi gibi */
  exit();
}
/*
Eğer birden fazla işleminiz varsa else if koyarak işlemlerinizi
tanımlayıp buraya ekleyebilirsiniz.
Fakat else koymayın. Çünkü işlem değişkeni olmak zorunda değil.
mesela sadece içerik gösteriliyorsa islem parametresi yoktur.
*/
...
...

```
işlemleri de sayfaya gömdükten sonra son sayfa şuna benzer olacak:
```php
<?php
// bilgiler
$bolum = $_GET["bolum"];
$islem = $_GET["islem"];
// once islemler kontrol edilmeli
if( $islem == 'iletisim' ){
  // iletisim islemleri
  exit();
}
// ekrana basilani tamponlayalim
ob_start();
// sayfa icerikleri
if( $bolum == 'hakkimda' ){
echo <<<HTML_SON
<h2>Hakkımda</h2>
Ben buyum şunları bunları yaparım falan feşmekan.<br>
<br>
Şurada okudum, burada okuyorum büyüyünce X olacağım<br>
<br>
siteyi şöyle yaptım böyle ettim.
HTML_SON;
}else if( $bolum == 'projeler' ){
echo <<<HTML_SON
<h2>Projelerim</h2>
PHP ile şu projelerin altyapısıyla uğraşıyorum.
Hede hödö
HTML_SON;
}else if( $bolum == 'iletisim' ){
echo <<<HTML_SON
<h2>İletişim</h2>
İletişim bilgilerim : asd@asd.com<br>
<br>
<form action="index.php?islem=iletisim" method="post">
  Ad : <input type="text" name="ad">
  <br>
  E-posta : <input type="text" name="ad">
  <br>
  Mesaj : <textarea name="ad"></textarea>
  <br>
  <input type="submit" value="Mesajı gönder">
</form>
HTML_SON;
}else{ // anasayfa
echo <<<HTML_SON
Siteme hoşgeldiniz
HTML_SON;
}
// tamponlanan icerigi alalim
$icerik = ob_get_contents();
// tamponu bosaltalim, ekrana basilmasin
ob_end_clean();
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
  "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <title>Tek dosyadan oluşan sayfam</title>
  </head>
<body>
  <h1>Fatih'in sitesi</h1>
  <ul>
    <li><a href="index.php">Anasayfa</a></li>
    <li><a href="index.php?bolum=hakkimda">Hakkımda</a></li>
    <li><a href="index.php?bolum=projeler">Projeler</a></li>
    <li><a href="index.php?bolum=iletisim">İletişim</a></li>
  </ul>
  <hr>
  <div>
    <?=$icerik;?>
  </div>
  <hr>
  Mehmet Fatih YILDIZ 2008
</body>
</html>

```

#### Modüler yapıya ne oldu?

Daha önce /bir-sitenin-kod-duzeni-nasil-olmali/ dökümanında bahsettiğim bir modüler yapı vardı. Her türlü projenizde bu mantığı kullanmanızı önermiştim. Bu dökümanın amacı ufak projeler için zaten. Farkındaysanız örnekte verdiğim kodlar müthiş kısa kodlar. Çok basit bir site bile yapsanız bu kodlar uzayıp gidecektir. Bir de şunu unutmayın : eğer kodlarınız (yani bölümler veya işlemlerdeki) genellikle **20-30 satırı geçen kodlar** ise bu yöntem hata yakalamanızı, sorun yaşadığınızda çözme sürenizi, çalışabilirliğinizi ve kodun temizliğini kötüleştirecek/zorlaştıracaktır. Onun için çok paranoyak veya ihtiyaç duymadığnız sürece bu mantığı kullanmayın. Modüler yapıyla ilgili yazdığım döküman çok daha faydalı olacaktır.