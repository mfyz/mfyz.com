---
title: "PHP ile grafiksel sayaç uygulaması"
slug: php-ile-grafiksel-sayac-uygulamasi
date: 2005-01-07
url: http://mfyz.com/tr/php-ile-grafiksel-sayac-uygulamasi/
tags: ["NULL","PHP"]
category: PHP
migration: {"wpId":74,"wpPostDate":"2005-01-07T06:56:28.000Z"}
lang: tr
---

Bu makalede sizlerle bir sayaç uygulamasını nasıl yazabileceğimizi göreceğiz.Hepinizin bildiği (yada tahmin ettiği) gibi bir sayaç yazmak çok da zahmet gerektiren bir iş değildir. Burada sayaç tekniği olarak istediğiniz methodu alabilirsiniz. İster mysql'den alacağınız sayaç değeriniz ile oynar ve ekrana yazdırır, ister basit txt dosyaları ile oluşturduğunuz sayaç sisteminizi yazdırabilir ister kullanıcı bazında cookie tabanlı yapıyı. Burada scripti zorlamamak için cookie tabanlı kullanıcı bazında çalışan bir sistemde sayaç yazdıracağız. Yapmamız gereken şey genel anlamda şöyle olacaktır:

*   Sayfamız ziyaretçiyi karşılar ve ona daha önce sayfamızı ziyaret ettiğine dair bir bilgi yani cookie gönderilip-gönderilmediğini kontrol eder.
*   Eğer ziyaretçimiz daha önce de aynı sayfaya girmişse, zaten onda mevcut bulunan (daha önce kaç kez girdiğini gösteren) cookie değeri alınır ve bu değer 1 arttırarak tekrar ziyaretçimize yollanır.
*   İlk defa giriyorsa değişkenin degeri NULL yani 0 atanacak, 1 artırılıp cookie olarak atılacaktır.

Böylece her girişinde değer bir artacağı için, onun sayfamızı kaç kez ziyaret ettiğini görmemiz mümkün olacaktır. Yukarıdaki yönergeleri izlediğimiz taktirde basit bir sayaç oluşturabiliriz. Tabi sayacı sadece cookie yöntemini kullanarak yapmak zorunda değiliz! Kullanıcı bilgilerini, oluşturduğumuz bir veritabanında depolayabileceğimiz gibi harici bir "txt" dosyasında da saklamamız mümkündür. Session fonksiyonlarını kullanarak da bir sayaç oluşturabiliriz. Ama en sağlık yöntem cookie kullanmaktır Eğer, bir çok yerde sayaç kullanacaksak; o zaman daha organize ve müdahaleye yönelik sayaçlar oluşturabilmek adına, biraz önce saydığım yöntemleri (veritabanı ve dosyalama yöntemlerini) kullanabiliriz. Gelelim bizim hazırlayacağımız sayaca; biz de yukarıda sırladığımız yönergeleri izleyerek bir sayaç oluşturacağız. Fakat hazırlayacağımız sayaç basit olmayacak. Sayacımızı bu basitlikten kurtarmak için değerleri, bir "grafik (resim)" kullanarak yansıtacağız. Grafik sayaç oluşturma konusuna birazdan geçeceğiz, ama bundan önce bu grafikleri oluşturmamız ve isimlendirmemiz gerekiyor. Siz istediğiniz grafik biçimini kullanabilirsiniz. Fakat ziyaretçiye geri dönüşümü "sayılarla" sağlayacağımızı düşünürsek (ki bir sayaçtan bahsediyoruz), grafiği oluşturduğumuz resim(ler)in rakamlardan oluşması bizim için en mantıklı seçim olacaktır. Bu örnek için benim hazırladığım grafikler şu şekilde;

![](/images/archive/tr/2005/01/Screen-Shot-2017-09-14-at-2.24.48-AM.png)

Göründüğü gibi her resim bir rakamı temsil ediyor. Rakamları temsil eden grafiklerimizi de hazırladıktan sonra artık kodlamaya geçebiliriz. Yapmamız gerekenleri kabaca sıralamıştık, bunun yanında yapacağımız tek işlem cookie den her defasında gelen rakamları okuyarak, bunların hazırladığımız grafiklerdeki karşılığını ekrana yazdırmak olacak. Örneğin ziyaretçimiz sitemizi daha önce "749" defa girmiş olsun. Biz bu ifadeyi karşılaştırma yapabilmek için "7", "4", "9" şeklinde ayırmamız gerekiyor. Parçalama fonksiyonu kulanarak bunu yapabiliriz. Unutmadan grafiklerin adları "<rakam>.gif" şeklinde, böylece kolayca istediğimiz rakamı basabileceğiz.
```
$deger = 749;

// integer degiskeni stringe donusturelim
settype( $deger, "string" );

// string parcalari
print($deger\[0\]); // 7
print($deger\[1\]); // 4
print($deger\[2\]); // 9

$sayac = $\_COOKIE\["ziyaret"\]; // cookie'den degerimizi aliyoruz.

// eger daha once hic girilmemis ise otomatik olarak $sayac NULL degeri alacaktir.
$sayac++; // sayacimizi artirdik. (NULL ise 0'dır, 1 artar ve 1 olur sonucta)

// cookie olarak atalim.
setcookie( "ziyaret" , $sayac , (time()+(365\*24\*60\*60)) );

```
"(time()+365\*24\*60\*60)" ifadesi, gönderdiğimiz cookienin 1 yıl süreyle saklanacağını belirtir. Eğer $\_COOKIE\["ziyaret"\] adında bir değişken zaten var ise, mevcut değeri daha önceki ziyaret sayısı olacaktır. Eğer yoksa değeri NULL olduğundan 1 artırıldığında son değer 1 olacaktır. $sayac değişkenini 1 artırıp tekrar cookie atarak sayacımızı güncellemiş olduk. sıra geldi ekrana yazdırma işinde.
```
// integer degiskeni stringe donusturelim
settype($sayac,"string");

// diziyi dönüyoruz
for( $i=0 ; $i<strlen($sayac) ; $i++ ){
  print '<img src=""resimler/sayac/'" /> ';
}

```
Kodu toparlamak gerekirse;
```
<?

// cookie'den degerimizi aliyoruz.
$sayac = $\_COOKIE\["ziyaret"\];

// eger daha once hic girilmemis ise otomatik olarak $sayac NULL degeri alacaktir.
$sayac++;
// sayacimizi artirdik. (NULL ise 0'dır, 1 artar ve 1 olur sonucta)

// cookie olarak atalim.
setcookie( "ziyaret" , $sayac , (time()+(365\*24\*60\*60)) );

// integer degiskeni stringe donusturelim
settype($sayac,"string");

// oluşan diziyi dönüyoruz
for( $i=0 ; $i<strlen($sayac) ; $i++ ){
  // her karakteri sırayla yazdırıyoruz.
  print '<img src=""resimler/sayac/'" /> ';
}

?>

```
Örnek çıktı: ![](/images/archive/tr/2005/01/Screen-Shot-2017-09-14-at-2.24.59-AM.png) **Hazırlayan:** Sezgin Bilketay