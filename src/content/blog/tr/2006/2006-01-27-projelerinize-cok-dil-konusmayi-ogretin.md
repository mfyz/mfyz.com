---
title: "Projelerinize çok dil konuşmayı öğretin!"
slug: projelerinize-cok-dil-konusmayi-ogretin
date: 2006-01-27
url: http://mfyz.com/tr/projelerinize-cok-dil-konusmayi-ogretin/
tags: ["dil desteği","language","PHP"]
category: PHP
migration: {"wpId":85,"wpPostDate":"2006-01-27T05:52:01.000Z"}
lang: tr
---

#### Farklı programlama dillerine göre çözümler.

Bu döküman sadece php projeler için değil, tüm programlama dillerinde kullanabileceğiniz bir yapıyı anlatmaktadır. İçindeki tüm yapılar çoğu dilde mevcuttur. Ben web basisli bir dilde, daha kolay anlatabileceğimi ve daha çok web programcıların bu dökümandan faydalanacağını düşünüyorum.

#### Seçeneklerim Neler?

Projenizi yazarken 2 yol izlemiş olabilirsiniz, birincisi modüler, template yapısına benzer bişeyler, yani bütün proje index.php veya module.php veya buna benzer tek dosya üzerinde yorumlanıyordur. Yada projede her dosya farklı biçimde, index.php, giris.php, forum.php, dosyalar.php vs böyle gider. İkisi için hibişey değişmeyecektir. Amaç bir dil yorumlayıcısını her dosyanın başında çalıştırmak.

#### Peki bu dil yorumlayıcısı ne iş görecek?

Bu dil yorumlayıcısı oturumdaki dil değişkenine göre bütün içeriği oturumdfaki kayıtlı dile göre ayarlamamızı sağlayacaktır. Daha açık konuşursak tercümanımız olacaktır :) Şimdi daha rahat anlayabileceğiniz uygulamaya geçelim.

Diyelimki sitemiz farklı farklı sayfalardan oluşuyor. (index.php, dosyalar.php, ziyaretci\_defteri.php vs...) Normal bi şekilde kendi dilimizde yazıp bitiriyoruz projemizi.. Ben burada tek bir dosya üzerinde örnek göstereceğim;

Önce dizin yapımıza dil diye bir klasör ekliyoruz; Son yapı şuna benzer olsun;

```
Proje
 |
 |- <dir>  moduller
 |- <dir>  include
 |- <dir>  dil
 |          |- tr.php
 |          |- ...
 |          '- en.php
 |
 '---.- index.php
     |- giris.php
     |- dokumanlar.php
     |- dosyalar.php
     |- dilsec.php
     '- dil.php

```

Bu şekilde bir dizin yapımız olsun.. (buradaki örnek sadece :) )(sadece dil dizini, dilsec.php ve dil.php'ye dikkat edin. dil dizininde dil dosyaları olacak tabiki) Kullanıcılar için arabirim basan tüm dosyalarda başında dil.php'yi include edin. Bu tercümanımızdı bizim.

#### Neden tercümana ihtiyacımız var?

Çünkü birisi sayfa açılmadan/çalışmadan önce dili seçmeli, ve bu dile ait çeviriyi yapmalı.

#### Peki çeviriyi sayfalarımızda nasıl uygulayacağız?

Sayfalarımızda basitçe metinleri yazdık ve siteyi bitirmiştik değil mi? Mesela Menümüz şöyle idi;

```
<!-- MENU -->
<a href="index.php">Anasayfa</a>
<a href="dosyalar.php">Dosyalar</a>
<a href="#...">Linkler</a>

```

Yani kullanıcılar doğrudan bir yazıyı statik olarak görüyorlardı. Tek yapmamız gereken şey, çevirilerimizi değişkenlerde tutmak, Zaten tercüman dosyamız dile göre bu değişkenleri değiştirecektir. Sizin kodda oynama yapmanıza gerek kalmaz. Tercüman otomatik olarak seçer ve bu değişkenleri ayarlar. Ekrana seçili dil basılır. Yani yukarıdaki kodumuz şu şekilde olmalıdır;

```

<a href="index.php"><?=$dil\["menu\_anasayfa"\];?></a>
<a href="dosyalar.php"><?=$dil\["menu\_dosyalar"\];?></a>
<a href="#..."><?=$dil\["menu\_linkler"\];?></a>

```

Amacımız, daha önce kullanıcının önüne getirdiğimiz (print ettiğimiz veya etmediğimiz) tüm metinleri değişkenlerle değiştirmek.

Şimdi bu dökümandaki örneğe ait hazırladığım index.php ve dosyalar.php'yi dökümanın sonunda bulacaksınız, bunları inceleyin. Bütün içeriğe ait kısımlarda değişkenler göreceksiniz. $dil diye bir dizide toplanıyor olacaktır bunlar..

Bu değişkenleştirme işlemini yaparken kendi dilimizdeki çeviri dosyamızı da hazırlamış oluyoruz. dil klasörüne o dildeki (bilgisayara göre tabiki) dilin kısaltmasına ait bir dosya oluşturuyoruz. (Türkçe için tr.php, İngilizce için -english- en.php, İspanyolca için -espanol- es.php gibi..) Bu dosya şu şekilde olacak biçimde değişkenlerimizi çevirerek koyuyoruz.

Türkçe çeviri dosyamız;

```
<?php

/\*
   TURKCE CEVIRIYE HOSGELDINIZ
   Ceviren : Mehmet Fatih YILDIZ
\*/

unset($dil);

// dil dosyasi ayarlari
   $dil\["dil"\]                     = 'Türkçe';
   $dil\["dil\_seciniz"\]             = 'Dil Seçiniz';

// site degiskenleri
   $dil\["site\_basligi"\]            = 'Bilmemne Projesi Sayasi';

// menu
   $dil\["menu\_anasayfa"\]           = 'Anasayfa';
   $dil\["menu\_dosyalar"\]           = 'Dosyalar';
   $dil\["menu\_linkler"\]            = 'Linkler';

// uye girisi paneli
   $dil\["uye\_giris\_k\_adi"\]         = 'Kullanici Adi';
   $dil\["uye\_giris\_sifre"\]         = 'Sifre';
   $dil\["uye\_giris\_buton"\]         = 'Giris Yap';

// dosyalar bolumu
   $dil\["dosyalar\_bolum\_basligi"\]  = 'Dosyalar';
   $dil\["dosyalar\_dosya\_listesi"\]  = 'Dosya Listesi';
   $dil\["dosyalar\_dosya\_adi"\]      = 'Dosya Adi';
   $dil\["dosyalar\_dosya\_boyutu"\]   = 'Boyut';
   $dil\["dosyalar\_eklenme\_tarihi"\] = 'Eklenme Tarihi';
   .
   .
   .

?>

```

İngilizçe çeviri dosyamız;

```
<?php

/\*
   WELCOME TO THE ENGLISH TRANSLATION
   Translator : Micheal Jackson :P
\*/

unset($dil);

// language file settings
   $dil\["dil"\]                     = 'English';
   $dil\["dil\_seciniz"\]             = 'Select Language';

// site variables
   $dil\["site\_basligi"\]            = 'Bilmemne Project Homepage';

// menu variables
   $dil\["menu\_anasayfa"\]           = 'Home';
   $dil\["menu\_dosyalar"\]           = 'Files';
   $dil\["menu\_linkler"\]            = 'Links';

// user login section
   $dil\["uye\_giris\_k\_adi"\]         = 'User Name';
   $dil\["uye\_giris\_sifre"\]         = 'Password';
   $dil\["uye\_giris\_buton"\]         = 'Login';

// files section
   $dil\["dosyalar\_bolum\_basligi"\]  = 'Files';
   $dil\["dosyalar\_dosya\_listesi"\]  = 'File List';
   $dil\["dosyalar\_dosya\_adi"\]      = 'Filename';
   $dil\["dosyalar\_dosya\_boyutu"\]   = 'Size';
   $dil\["dosyalar\_eklenme\_tarihi"\] = 'Date';
   .
   .
   .

?>

```

Burada sadece Türkçe ve ingilizcesini yazdım, rahatlıkla çoğaltabilirsiniz/çoğalttırabilirsiniz..

Gördüğünüz gibi içerikleri oldukça basit. Tek yaptığımız metinlerimizi değişkenlere dönüştürüp içeriklerini bir dosyaya (çeviri dosyalarımız) yazmak. Projeleriniz bu şekilde yapıp, Mesela sadece kendi ana dilinizde yapıp, bilen insanlara bu dosyaları verip çevirmelerini isteyebilirsiniz. Bu işlem hem zahmetsiz hem de çok işe yarar. Ben çoklu dilli projelerimde çok fazla dili bilmeden bilen arkadaşlarımın sayesinde ekledim ;)

Çeviri dosyalarımızı da yazdık, bütün projede değişken dışında bişey kalmadı, (Bu örneğe ait index.php'yi ve dosyalar.php'yi bu dökümanın sonunda görebilirsiniz.)

#### Tercüman dosyası

Şimdi gelelim çeviri dosyalarını seçecek ve siteye uygulayacak olan tercümanımızı kodlamaya :) Önce kodu vereyim, sonra açıklayalım.

```
<?php

session\_start();

# oturuma gore dil seciyoruz
$secili\_dil = $\_SESSION\["dil"\];

# eger dil oturumda secili degilse
if( empty($secili\_dil) ){
  # dili browser ayarina gore otomatik sectiriyoruz.
  $secili\_dil = $\_SERVER\["HTTP\_ACCEPT\_LANGUAGE"\];
  
  if( !file\_exists("dil/".$secili\_dil.".php") ){
    # eger o dile ait ceviri dosyasi yoksa site icin varsayilan dili sectirelim.
    # bizim site icin turkce olsun
    $secili\_dil = 'tr';
  }
}

# oturuma kaydedelim
  $\_SESSION\["dil"\]=$secili\_dil;

# simdide ceviri dosyasini yukleyelim
include("dil/".$secili\_dil.".php");

?>

```

Kodu açıklayalım; ilk önce $secili\_dil degiskenine oturumda kayitli olan dili aliyoruz, eğer oturuma kaydedip onu seçtirmezsek, kullanıcı, browser'in geçerli dilinden başka bir dil seçtiğinde her sayfada bu değer sıfırlanacak ve browser'in geçerli dili ile görüntülenecektir. Bunu yaparak oturum boyunca aynı dilde kalmayı sağlıyoruz. Cookie desteği koyup da hangi bilgisayarda hangi dilde gösterilecek bunu da rahatlıkla kontrol ettirebiliriz. Devam edelim; eğer dil değişkeni boş ise, demektir ki, kullanıcı ilk sayfasında ve dil seçilmedi. Site için uygun olan geçerli dili seçtirmeliyiz. Öncelikle kullanıcının tarayıcı bilgisinden tarayıcısını hangi dilde kullanıyor bunu bulduralım. Mesela Türkçe işletim sistemi, ve Türkçe tarayıcı kullanıyorsa sayfasyı Türkçe göstermemiz muhtemel olacaktır. İspanyol girdiğinde siteye, tarayıcısı ispanyolca olduğundan otomatik olarak site ispanyolda açılacaktır böylece.. :) $secili\_dil = $\_SERVER\["HTTP\_ACCEP\_LANGUAGE"\]; ile bunu sağlamış olduk. Çeviri dosyalarımız dil klasöründe idi. Şimdi çeviri dosyamızı yüklememiz gerek. Ancak eğer tarayıcıda bulunan dil'e ait çeviri dosyamız yok ise sistem hata verecektir, çeviri görünmeyecektir. Bunun için dosya varmı kontrol ettiriyoruz. Eğer yoksa bize göre, yani projenin ana diline göre $secili\_dil'e istediğimiz çeviri dosyasının adını giriyoruz. Bu örnekte Türkçe olmasını istediğimiz için "tr" girdik. Daha sonra oturuma daha sonraki sayfalarda bu dil görünmesi için dil değişkenini kaydettik ve son olarak çeviri dosyamızı yükledik. Böylece dosyanın devamında basılacak değişkenler seçili olan dile göre yer alacaktır.

#### Dil seçimi

Şimdi index dosyamıza dil seçici bir seçim kutusu koyuyoruz. Kodu şuna benzer olacaktır;

```
<select onChange="window.top.location='dilsec.php?dil='+this.value;">
  <option value="tr">Türkçe</option>
  <option value="en">English</option>
  <option value="de">Deutch</option>
  <option value="es">Espanol</option>
  .
  .
  .
</select>

```

Görüldüğü gibi seçildiği anda dilsec.php dosyasına dil değişkenini GET methodu yöntemi ile gönderiyoruz. dilsec.php dosyamız da, aktif bulunan oturumda kullanıcının sitenin dilini değiştirmesini sağlayacaktır. Kodu şu şekilde;

```
<?php

session\_start();

# bilgiyi alalim
$dil=$\_GET\["dil"\];

# dil dosyasi varsa;
if( file\_exists("dil/".$dil.".php") ){
  #oturuma kaydediyoruz
  $\_SESSION\["dil"\]=$dil;
}

# anasayfaya yonleniyoruz.
print '<script>location="index.php";</script>';
exit;

?>

```

Yapılan işlem çok basit. GET methodu ile gelen değişkene ait çeviri dosyası VAR ise oturuma o dili kaydedip anasayfa'ya geri dönüyoruz. Böylece projemiz çok dilli olmuş olacaktır. Aşağıdaki index ve dosyalar.php'nin içeriklerini yukarıdaki anlatımla birleştirirseniz daha rahat alnayabilirsiniz.

index.php

```
<?php
// dili sectiriyoruz.
include("dil.php");
?>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-9" />
	<title><?=$dil\["site\_basligi"\];?> - (Lang:<?=$dil\["dil"\];?>)</title>
</head>
<body>
<h1><?=$dil\["site\_basligi"\];?></h1>
<!-- MENU -->
<a href="index.php"><?=$dil\["menu\_anasayfa"\];?></a>
<a href="dosyalar.php"><?=$dil\["menu\_dosyalar"\];?></a>
<a href="#..."><?=$dil\["menu\_linkler"\];?></a>
<!-- DIL SECME FORMU -->
<?=$dil\["\_dil\_seciniz"\];?> : 
<select onChange="window.top.location='dilsec.php?dil='+this.value;">
	<option value="tr">Türkçe</option>
	<option value="en">English</option>
	<option value="de">Deutch</option>
	<option value="es">Espanol</option>
	.
	.
	.
</select>
<!-- UYE GIRIS PANELI -->
<form action="giris.php">
	<?=$dil\["uye\_giris\_k\_adi"\];?> : <input type="text" name="kadi"><br>
	<?=$dil\["uye\_giris\_sifre"\];?> : <input type="password" name="sifre"><br>
	<input type="submit" value="<?=$dil\["uye\_giris\_buton"\];?>"><br>
</form>
.
.
.
</body>
</html>

```

dosyalar.php

```
<?php
// dili sectiriyoruz.
include("dil.php");
?>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-9" />
	<title><?=$dil\["site\_basligi"\];?> - (Lang:<?=$dil\["dil"\];?>)</title>
</head>
<body>
<h1><?=$dil\["site\_basligi"\];?> / <?=$dil\["dosyalar\_bolum\_basligi"\];?></h1>
<!-- MENU -->
<a href="index.php"><?=$dil\["menu\_anasayfa"\];?></a>
<a href="dosyalar.php"><?=$dil\["menu\_dosyalar"\];?></a>
<a href="#..."><?=$dil\["menu\_linkler"\];?></a>
<!-- DOSYA LISTESI -->
<?
// dosya listesini ureten php kodu ..
?>
<!-- DOSYA LISTESI YAZISI -->
<br><?=$dil\["dosyalar\_dosya\_listesi"\];?><br>
<!-- DOSYA LISTESI TABLOSU -->
<table border="1">
	<tr>
		<td><?=$dil\["dosyalar\_dosya\_adi"\];?></td>
		<td><?=$dil\["dosyalar\_dosya\_boyutu"\];?></td>
		<td><?=$dil\["dosyalar\_eklenme\_tarihi"\];?></td>
	</tr>
	<? 
	// dosya listesini ekrana basan php kodu ..
	?>
</table>
.
.
.
</body>
</html>

```

Hemen küçük bir uygulama da siz yazın.