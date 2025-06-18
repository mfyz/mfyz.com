---
title: "PHP ile Basit HTTP Authentication"
description: "PHP'de HTTP başlıkları kullanarak basit bir kimlik doğrulama (authentication) sistemi nasıl oluşturulur? Yönetici panelleri gibi tek kullanıcılı alanlar için pratik bir çözüm ve örnek kod."
slug: php-ile-basit-http-authentication
date: 2011-10-17
url: http://mfyz.com/tr/php-ile-basit-http-authentication/
tags: ["php", "http authentication", "kimlik doğrulama", "güvenlik", "web geliştirme", "htaccess"]
category: PHP
migration: {"wpId":157,"wpPostDate":"2011-10-17T02:14:30.000Z"}
lang: tr
---

Authentication, yani kimlik dogrulama, daha anlasilir ifade ile bir sayfayi kullanicilara sinirlamak veya tek bir kullanici olan yoneticiye sinirlamak icin genelde birkac yontem izlenir, hangi web altyapisini yaziyor olursaniz olun bununla her calistiginiz projede karsilasabilirsiniz. Kullanicilar icin hazirlanmasi gereken authentication icin yapacak birsey yok, kayit, giris, cikis vs gibi seyleri yazmak zorundasiniz. Fakat yonetici gibi tek kullanici icin sinirlandirilmak istenen sayfalar icin en pratik cozum ve genelde tercih edilen cozum htaccess ile basic auth yapilmasidir, yani statik bir sifre ve belirli bir kullanici adi ile yapilan http authentication. Sunucu konfigurasyonunuza gore (belki cpanel gibi paneller yardimi ile) bir dizini veya bir sayfayi sinirlandirir ve bunun icin hic kod yazmadan halledebilirsiniz.

Ancak her zaman bu imkan elinizde olmayabilir (mesela sadece ftp erisimine sahip oldugunuz ve htaccess desteklemeyen bir hosting konfigurasyonu). Ya da authentication'u bir sekilde kodunuzda saklamak istiyor olabilirsiniz.

PHP'de sayfa header'lari ile tarayicidan authentication bilgisi isteyebiliyoruz. Bunu kullanarak http authentication yaptirabiliriz, bunun avantaji kullanici girisi icin herhangi bir arayuz yazmak zorunda kalmamamizdir. Tabi bir diger avantaji ise bu bilgi giris ekranlarini tarayicilar yonettigi icin sifre hatirlama, belki 1password gibi uygulamalar ile kimlikleri saklama gibi secenekler sunuyor ve kullaniciniz bu seceneklerden faydalanmak istiyor olabilir. Her zaman sayfa icindeki elementlerle bunu saglayamayabilirsiniz.

Son birkac projemde daha duzenli kullandigim bir kodu paylasacagim. Bu kodu tek bir dosyaya (mesela auth.php) yazip bu dosyayi tum uygulamamda include ediyorum en basta. Boylece eger birisi authenticate edilmeden ulasmaya calisirsa http auth ile karsilaniyor.

```php
$password_hash = '--MD5--SIFRE--';
function forceLogin(){
    global $password_hash;
    $loggedIn = FALSE;
    if (isset($_SERVER['PHP_AUTH_USER']) AND $_SERVER['PHP_AUTH_PW']
        AND $_SERVER['PHP_AUTH_USER'] == 'admin'
        AND md5($_SERVER['PHP_AUTH_PW']) == $password_hash) {
        
        $_SESSION['mfyz_social_auth'] = 'giris_yapildigina_dair_bir_hash';
        $loggedIn = TRUE;
    }
    if (!$loggedIn) {
        header('WWW-Authenticate: Basic realm="My Realm"');
        header('HTTP/1.0 401 Unauthorized');
        echo '<h2>Unauthorized Access!</h2>';
        echo 'To enter username and password, refresh the page.';
        exit;
    }
}
if (!(isset($_SESSION['mfyz_social_auth'])
    AND $_SESSION['mfyz_social_auth'] == 'giris_yapildigina_dair_bir_hash')) {
    forceLogin();
}

```