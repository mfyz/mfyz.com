---
title: "PHP ile curl kütüphanesinin kullanımı"
slug: php-ile-curl-kutuphanesinin-kullanimi
date: 2005-07-08
url: http://mfyz.com/tr/php-ile-curl-kutuphanesinin-kullanimi/
tags: ["curl","PHP"]
category: PHP
migration: {"wpId":79,"wpPostDate":"2005-07-08T03:49:39.000Z"}
lang: tr
---

### CURL, ( **C**lient **URL** Library Functions)

PHP 4.0.2 versiyonu ile yanında çok işe yarayacak bir kütüphane getirdi. Curl kütüphanesiyle upload/download, GET/POST işlemleri, çerez ve proxy yollama işlemleri, kullanıcı, şifre onaylama sayfaları(auth.) yapılabilir. Bu makaleyi okumadan önce sunucunuzda curl yüklü olup olmadığından emin olun. Eğer yüklü değilse [http://curl.haxx.se/libcurl/php/install.html](http://curl.haxx.se/libcurl/php/install.html) adresinden nasıl yükleme & kurulum yapıldığına bakabilirsiniz. Curl oturumlarında sıkça kullanacağımız birkaç fonksiyon var. [curl\_init()]("http://php.net/curl_init") : Yeni bir curl oturumu başlatır. [curl\_setopt()]("http://php.net/curl_setopt") : Curl transferi için seçenekleri parametreler halinde kullanmaya yarar. [curl\_exec()]("http://php.net/curl_exec") : curl\_setopt() ile belirlenmiş seçenekleri işler ve transfer işlemini yapar. [curl\_close()]("http://php.net/curl_close") : Daha önceden curl\_init ile açılmış curl oturumunu kapatır. [curl\_getinfo()]("http://php.net/curl_getinfo") : Yapılan curl işlemi hakkında çeşitli bilgilere ulaşmak için kullanılır. Bu fonksiyonların hakkında daha ayrıntılı bilgiye tıklayarak (php manual) ulaşabilirsiniz. Curl ile bir sayfanın çıktısını alan örnek bir uygulama yapalım.
```
// Curl oturum baslatiliyor.
$ch = curl\_init();

// URL
curl\_setopt($ch, CURLOPT\_URL, "http://www.xhandros.net/bl/index.php");
curl\_setopt($ch, CURLOPT\_HEADER, 0);

curl\_exec($ch); // ekrana basiliyor
curl\_close($ch); // sunucu hafizasindan siliniyor

```
Bu kod URL içeriğini sayfaya basacaktır. curl\_init ile yeni bir oturum başlatıldı, setopt ile transfer seçenekleri tanımlandı, işlem yapıldı ve curl\_close ile hafızadan silindi. curl\_setopt içindeki header parametresi sayfa çıktısını almak için gerekli. Url parametresi ise çıktısı alınacak adresi temsil ediyor. curl\_init("$adres"); şeklinde yapılma imkanıda mevcut. Şimdide curl ile localde olmayan bir sunucuya POST olarak veri gönderelim.
```
$ch = curl\_init(); // oturum baslat
// POST  adresi
curl\_setopt($ch, CURLOPT\_URL,"http://www.site.com/test.php");

curl\_setopt($ch, CURLOPT\_POST, 1);
curl\_setopt($ch, CURLOPT\_POSTFIELDS,"isim=ahmet&soyad=yilmaz");

curl\_exec ($ch);
curl\_close ($ch);

```
POSTFIELDS seçeneğinde, normalde nasıl GET ile browser üzerinden veri yolluyorsak aynı şekilde yolluyoruz. Bu şekilde üyelik isteyen sitelere otomatik olarak üyelikler açılabilir. (foreach yardımıyla).çeşitli log sistemlerinde kullanılabilir. Mesela yazıp, sattığınız sistemlerin nerelerde kullanıldığını loglamak için kendi sunucunuza nerede kullanıldığına ait çeşitli bilgiler yollayabilirsiniz. curl ile sockets kütüphanesinde olduğu gibi sahte isteklerde yollamak mümkündür. Örneğin; referer bilgisini istediğimiz şekilde değiştirip istek gönderebiliriz.
```
$ch = curl\_init();
curl\_setopt($ch, CURLOPT\_URL,"http://localhost/test.php");
curl\_setopt($ch,CURLOPT\_REFERER,"ceviz.net");

curl\_exec ($ch);
curl\_close ($ch);

```
CURLOPT\_REFERER parametresini istediğimiz şekilde değiştirdik :) Bu şekilde ".htaccess" ile yapılan korumalarda aşılabiliyor. Diğer sayfada öğrendiklerimizle birkaç CURLOPT parametresi ekleyip bir dosya indirme fonksiyonu yazalım.
```
<?
/\*
- Yunus Emre Yilmaz / a.k.a yns
- http://www.ceviz.net disinda kaynak gösterilmeden kullanilamaz.
\*/

function dosya\_indir($adres,$ad)
{
    if (!extension\_loaded(curl)) {
        die("Extension yuklu  degil socket deneyebilirsin");
    }
    $ch = curl\_init("$adres");
    if (!$ch) {
        die("Curl oturumu baslatamadim..");
    }
    curl\_setopt($ch, CURLOPT\_RETURNTRANSFER, 1);
    $data = curl\_exec($ch);
    curl\_close($ch);
    // baglantiyi kapa
    $islem = fopen("$ad", "a+");
    fwrite($islem, $data);
    fclose($islem);
    if ($islem) {
        echo" Dosya basariyla yuklendi...";
    } else {
        die("Dosya yuklenemedi");
    }
}

// Örnek kullanim
// dosya\_indir('http://www.ceviz.net/yns.rar','yns.rar');
// 1. kisim yuklenecek URL , 2. kisim server'a yuklendigi zamanki dosya adi

?>

```
Şimdi gelelim sistemin nasıl işlediğine; İlk once curl'un yüklü olup olmadığına bakılıyor, eğer yüklü değilse hata mesajı veriliyor. Curl işlemi başlatıldıktan sonra CURLOPT\_RETURNTRANSFER seçeneğiyle curl\_exec()'ten dönen dener sayfaya çıktı olarak verilmez, tanımlandığı değişkende, örnekte $data tutulur. $data değişkenine adres'in bilgileri alındıktan sonra dosya yazma işlemi fonksiyonları ile sunucuda yeni dosya oluşturulur. Sonra dosya indirme işlemi tamamlanır. Eğer bu işlemi local olmayan sunucunuzda yaparsanız çok büyük dosyaları çok az bir zamanda çekebileceğinizi görebilirsiniz. Ben yaptığım testlerde saniyede 400 kb civarı çekiyordum :) İşleme curl\_Getinfo altında CURLINFO\_SPEED\_DOWNLOAD parametresi eklerseniz download hızını ölçebilirsiniz.
```
$dlhizi = curl\_getInfo($ch,"CURLINFO\_SPEED\_DOWNLOAD");

```
Tüm bu fonksiyonun yaptığını \*nix curl'u ilede yapabilirsiniz. Örneğin;
```
system("curl -o dosyaadi.rar http://www.ceviz.net/dosyaadi.rar");

```
aynı işi görecektir. Ama system, passthru gibi komutlar güvenlik nedeniyle genelde yasaklıdır. **Hazırlayan :** Yunus Emre Yılmaz (Ceviz.net)