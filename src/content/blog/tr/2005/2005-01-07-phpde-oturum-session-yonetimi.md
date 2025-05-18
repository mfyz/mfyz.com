---
title: "PHP'de Oturum (Session) Yönetimi"
slug: phpde-oturum-session-yonetimi
date: 2005-01-07
url: http://mfyz.com/tr/phpde-oturum-session-yonetimi/
tags: ["oturum","PHP","session"]
category: PHP
migration: {"wpId":73,"wpPostDate":"2005-01-07T06:32:35.000Z"}
lang: tr
---

#### PHP'de Oturum (Session) Yönetimi

PHP'nin olmazsa olmazı nerdeyse her php ile kodlanan sayfada bulunan oturum (session) yönetimi hakkında sizlere bilgi vereceğim. PHP'de 5 tane oturum yönetimi fonksiyonu vardır. Bu oturum yönetim fonksiyonları ve dökümantasyon bağlantıları:

*   [session\_start()](http://tr.php.net/session_start)
*   [session\_register()](http://tr.php.net/session_register)
*   [session\_is\_registered()](http://tr.php.net/session_is_registered)
*   [session\_unregister()](http://tr.php.net/session_unregister)
*   [session\_destroy()](http://tr.php.net/session_destroy)

Şimdi bunların anlatımına geçelim:

#### session\_start()

Bu fonksiyonu oturumları kullanıcağımız her sayfanın başında belirtmeliyiz. Bu fonksiyon kullanıcı ilk defa giriyorsa kullanıcı için serverda bir dosya yaratır ve kullanıma hazırlar. Eğer daha önce girmişse onu kullanmaya hazırlar sadece. Her kullanıcı için uzun bir kod üretir. Bu kod sayılardan ve harflerden oluşur.

```
session\_start();

```
Eğer php.ini dosyasında otomatik olarak oturum başlatma seçeneği aktif değilse bu işlemi yapmak zorundayız. Oturum fonksiyonları eğer bir oturum açılmamışsa (session\_start) hata verecektir. Her sayfanızın başında bu fonksiyonu çağırarak bu sorunu rahatlikla çözebilirsiniz. Öneri olarak, her sayfanızda çalıştırdığınız (include) sayfanız varsa bu sayfaya ekleyin.

#### session\_register()

Sunucuda sizin için açılmış olan dosyaya bir değer yazar. Aynı cookie gibi işler ancak dosyalar zamana göre silinmez, kullanıcı oturumunu kapatınca silinirler. Kullanıcının oturum kapatması ise, o andaki tarayıcı programının oturumu kapatması ile olur. Çoğu tarayıcı, oturumunu tüm pencereleri kapandığı zaman kapatmış olur.

```
$isim = "nazim";
session\_register("isim");

```
$isim değerini nazim olarak atayıp sonra da oturumumuza kaydettik.

Oturum değişkenleri ve değerleri cookie'ler gibi bir dizide tutulur. $\_SESSION ($HTTP\_SESSION\_VARS) dizisidir. Bu dizinin normal bir diziden hiçbir farkı yoktur. Atamaları da buna benzer bir teknik ile yapabiliriz.

```
session\_register("isim");
$\_SESSION\["isim"\] = "mfyz";

```
Önce $isim diye bir oturum bilgisi yaratıp sonra bilgiyi güncelledik.

#### session\_is\_registered()

Bir oturumun kayıtlı olup olmadığını veya bir oturum değişkeninin kaydedilip edilmediğini öğrenmemize yaran bir fonksiyondur.

```
if( session\_is\_registered("isim") ){
  echo "isim oturumu kayıtlı";
}
else{
  echo "isim oturumu kayıtlı degil";
}

```
"isim" oturumunun kayıtlı olup olmadığına bakar.

#### session\_unregister()

Kaydettiğiniz bir oturum değişkenini silmek için kullanılır.

```
session\_unregister("isim");

```
Daha önce oluşturduğumuz isim adlı oturum bilgisini siler.

#### session\_destroy()

Kayıtlı olan tüm oturum bilgilerini yok eder.

```
session\_destroy();

```
Geçerli olan tüm oturum verilerini yok eder.

Şimdi ufak bir uygulama yapalım :

#### Giriş/Çıkış İşlemi

Günümüzde neredeyse her sitede bi üyelik sistemi var (forumu veya interaktif hizmeti olmamasina rağmen), bence çoğu site için gereksiz. Basitçe bir giriş/çıkış sistemi yapalım. Bu iş için giris.php, cikis.php, index.php dosyalarimiz olacak.

```
<form action="giris.php" method="post">
  <input type="text" name="ad">
  <input type="submit" value="Giris">
</form>

```

Basit bir index sayfamız var. Burada giriş formu var. Bunu sitenizin istediğiniz köşesine koyabilirsiniz. Ziyaretçi adını girip Giris'e tıkladığı zaman giris.php dosyasına post edilecek.

```
<?php

// bilgiyi alalim
$ad = $\_POST\["ad"\];

// oturum baslatalim
session\_start();

// giris kontorl degiskeni tanimlayalim
$giris = true;

// ve degiskenleri kaydedelim
session\_register('ad');
session\_register('giris');

// giris tamamlandi, anasayfaya gonderelim
header("location:index.php");

?>

```

Şimdi ansayfamizi gelistirmemiz gerek. Giriş yapmış ziyaretçilere hitap eden kısımları küçük bir sargı ile çevreleyeceğiz.

```
<?

// oturumu baslatalim
sesion\_start();

// giris bilgilerini alalim.
$giris = $\_SESSION\["giris"\];
$ad    = $\_SESSION\["ad"\];

// giris kontorlu yapalim
// giris yapilmis ise $giris true olmali
if( $giris ){
  // giris yapilmis hosgeldin..
  print 'Hoşgeldin ' . $ad . '<br>
  <a href="cikis.php">Çıkış</a>';
}
else{
  // giris yapilmamis giris formu yazdiralim
  print '<form action="giris.php" method="post">
    <input type="text" name="ad">
    <input type="submit" value="Giris">
  </form>';
}

?>

```

İşte oldu, anasayfamız giriş kontorlu yaparak kullanıcı daha önce giriş yapmışsa tanıyor.

Çıkış dosyamız ise çok basit. oturumu öldürecek.

```
<? 

// oturumu baslatalim 
session\_start(); 

// oturumu oldurelim 
session\_destroy(); 

// ansayfaya gidelim 
header("location:index.php"); 

?>

```

Hepsi bu kadar :)

**Hazırlayan :** Nazım Akmandil