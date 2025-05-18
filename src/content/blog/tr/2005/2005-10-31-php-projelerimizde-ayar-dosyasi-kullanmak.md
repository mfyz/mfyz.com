---
title: "PHP projelerimizde ayar dosyası kullanmak"
slug: php-projelerimizde-ayar-dosyasi-kullanmak
date: 2005-10-31
url: http://mfyz.com/tr/php-projelerimizde-ayar-dosyasi-kullanmak/
tags: ["ayar","brief","ini","PHP"]
category: PHP
migration: {"wpId":81,"wpPostDate":"2005-10-31T05:16:15.000Z"}
lang: tr
---

#### Neden ayar dosyası kullanayım?

Ayar dosyaları yazdığımız projedeki tüm küçük-büyük detayları ayarlayabilmemizi sağlayan basit bir değişken dosyasıdır. Mesela çok güzel bir site yaptık, haber sistemi, forum anket falan feşmekan bir ton küçük büyük bölümler yazdık. Bu bölümlere ait, görünümden tutun, sistemin çalışmasına yönelik değerleri bir dosyada tutup site üzerindeki oynamaları hızlıca, tüm kodla boğuşmadan tek merkezden yönetebiliriz. Haber sayfalarındaki son eklenen kaç haberin gösterileceği, forumdaki konu başlıklarının maksimum karakter sayısı, üye kayıdında, engellenmiş üye adlarından kontrol panelinizdeki menüye kadar çok detaylı değişkenleri bu dosylarda saklayabiliriz. MFYZ.Com'da da aşağıda gösterilene benzer yapıda gelişmiş ve oldukça büyük bir ayar dosyası bulunmaktadır. Zaten çoğu projede de bu tarz ayar dosyaları görüyoruz. Bu makalede basitçe projemize ayar dosyası tanımlama ve bunun işlenip kullanılmasını göreceğiz.

#### Nasıl yapacağız?

Bunun için 2 şeye ihtiyacımız var. Öncelikle bir ayar dosyası düzenine, Bu ayar dosyası "ayar.conf" adında ve şuna benzer bir yapıda olacak :
```
\# mysql ayarlari
host        = localhost
kullanici   = root
sifre       =
veritabani  = mfyz

# limitler
haber_limit = 5
forum_limit = 10

```
Bu yapıda basit bir dosya yazıyoruz. # işaretinden sonraki kısımlar yorum anlamına gelmekte ve yorumlanırken gözardı edilmektedir. Bu dosyayı sitemizdeki tüm php dosyalarımızın başında işleteceğimiz küçük bir kod ile yorumlatacağız. Kod şu şekilde :
```
\# ayar dosyasi baglantisi
$dosya = @fopen( "ayar.conf", "r" );

# ayarlari diziye aktarmak
while( $satir = @fgets( $dosya, 1024 ) ){
  $satir = ereg_replace("#.*$", "", $satir); // yorum satirlarini gecelim
  list ( $degisken, $deger ) = explode ('=', $satir);

  $degisken = trim ($degisken);
  $deger = trim ($deger);
  if( !empty($degisken) ){
    $ayar[$degisken] = $deger;
  }
}

# baglantiyi kapatalim
fclose($dosya);

```
Bu kodun kısa bir açıklamasını yapmak gerekirse; $dosya değişkeni ile ayar.conf dosyamızı okutuyor ve bir değişkene aktarıyoruz. while ile dosyayı satır satır dönerek $satir değişkenine o andaki satıdaki yazıyı aktarıyoruz. İlk önce satırdaki # işaretinden sonraki kısmı sildirmek için küçük bir düzenli ifade kullanıyoruz. Böylece yorumları gözardı etmiş oluyoruz. Ayar dosyasında da istediğimiz kadar açıklama yazabiliriz. Daha sonra "=" işaretine göre parçalayıp ilk kısmı $degisken değişkenine, değeri de $deger değişkenine atıyoruz. Eğer = işaretinin öncesinde bulunana kısım boş ise bir değişken ve değer belirtmediği için küçük bir kontrolle bunu da atladıktan sonra $ayar dizisine $degisken indisli $deger değerli bir satır ekletiyoruz. Sonuçta ayar dosyasındaki düzgün formdaki satırlardaki değişken ve değerler $ayar dizisine aktarılmış oluyor. Şimdi $ayar dizimize bir göz atalım:
```
Array
(
  [host] => localhost
  [kullanici] => root
  [sifre] =>
  [veritabani] => mfyz
  [haber_limit] => 5
  [forum_limit] => 10
)

```
Zaten bundan sonraki kodlarımızda ayar dosyamıza değerler ekleyip $ayar dizisi ile o değerleri edinip kodumuzu geliştireceğiz.

#### Fakat, güvenlik!

Fakat bu örnekteki bir yapıyı kullanmak biraz sakıncalı olabilir. Çünkü "ayar.conf" dosyası herkesin erişebileceği bir dizinde ise doğrudan indirilip ayar parametreleri kodunuzdaki açıkları ele verebilir. Bu dosyayı .htaccess dosyasında ulaşılamaz yapabilir, başına "." nokta koyarak gizli dosya yapabilir (apache gizli dosyaları yayınlamaz) ya da daha farklı tekniklerle ayar dosyanızı koruma altına alarak işletebilirsiniz.