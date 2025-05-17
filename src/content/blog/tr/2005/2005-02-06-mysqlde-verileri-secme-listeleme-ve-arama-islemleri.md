---
title: "MySQL'de verileri seçme, listeleme ve arama işlemleri"
slug: mysqlde-verileri-secme-listeleme-ve-arama-islemleri
date: 2005-02-06
url: http://mfyz.com/tr/mysqlde-verileri-secme-listeleme-ve-arama-islemleri/
tags: ["fetch","like","limit","mysql","query","select","Sunucu Programlama"]
category: Sunucu Programlama
migration: {"wpId":76,"wpPostDate":"2005-02-06T07:36:11.000Z"}
lang: tr
---

#### Giriş

PHP'de MySQL'i nasıl kullanacağımızı daha önce görmüştük. Bu dökümanda mysql'de verileri nasıl çekip, listeleyip bu verileri iyi biçimde süzgeçleme, üzerinde arama yapma ve oluşan çıktıları nasıl işleyeceğimizden bahsedeceğim. Bu dökümanda da diğer dökümanda kullandığım örnek tabloyu kullanacağım. Hatırlatmak gerekirse "tablo" adında ve kullanici, kayit\_tarihi, eposta, ziyaret\_sayisi alanlarından oluşuyordu. Öncelikle mysql bağlantımızı oluşturup tablomuzu seçelim. Bildiğimizi varsayıp geçiyorum bu kısmı.. Veri seçmek için genel bir kalıp vardır. **SELECT <alan adı belirteci> FROM \`tablo adı\`** Bu sorguda ilk kısımda seçimden sonra dönecek olan alan adlarını belirtmemiz gerekir. Alan adlarını teker teker de belirtebilir, \* ifadesi ile hepsini de ifade edebiliriz. Daha önce testlerini de yaptığım bir sonuç vardır ki genellikle söylenen birşeydir, MySQL'de ihtiyacımız olan şeyleri kullanarak daha hızlı işletilen sorgular yazabiliriz. Mantıksal olarak da doğru birşeydir. Diyelim ki 25 alanlık ve bunlardan 10 tanesi TEXT türünde olan, üzerinde 100.000 kayıt bulunan bir tablonuz var veya yazdığınız sistem ilerde bu derece büyüyebilecek bir potansiyele sahip, böyle bir durumda sadece 1-2 alana ihtiyaç varken \* ile tüm alanları seçmeye çalışmak arasında gözle görülür hız farkı yaşanacaktır. Tüm alanları seçerek bütün bilgilerin tekrar okunmasını istemiş oluruz, örnek verdiğim tablo gibi orta büyüklükte tablolardaki işlemlerde bile performans düşüşü kaçınılmazdır. Onun için sadece kullanacağımız alanları belirtmekte fayda var. Birinci kısımdan sonra FROM ile veri çekilecek tabloyu belirtiyoruz. Bu kullanımda bütün satırlar seçilecek ve dönülecektir. WHERE kalıbını kullanarak istediğimiz, koşullarımıza uyan kayıtları seçebiliriz. **LIMIT X,Y** kalıbı ile sonuçları parçalayabiliriz. LIMIT kalıbı sorgularda en sonda kullanılır. Bu kalıpta önce (X ile ifade edilen) hangi kayıttan başlanacağı, virgül ve sonra da (Y ile ifade edilen) kaç kayıdın sorgudan etkileneceğini belirtiriz. İşlem olarak her işlemde kullanılabilir ancak genellikle kayıt listelerken kullanırız. Sonuç olarak oluşan örnek bir listeleme sorgusu şöyle olabilir :
```
SELECT kullanici, kayit\_tarihi, ziyaret\_sayisi FROM \`tablo\` WHERE ziyaret\_sayisi > 0 LIMIT 0,5

```
Bu sorguda tablo tablosundan, kullanici, kayit\_tarihi ve ziyaret\_sayisi alanlarını seçiyoruz. Koşul olarak da ziyaret\_sayisi 0'dan büyük olan kayıtları belirtiyoruz. Sonuç kümemiz ise bu listede oluşacak ilk 5 kayıdı tutuyor.

#### Kayıtları seçtik ama sıralı değil?

Evet kayıtlar bilgisayarın kontrol sırasına göre çekildi, belirli kriterlere göre bu kayırları sıralayarak çekmek isteyebiliriz. Örnek vermek gerekirse, önceki sorguda ziyaret sayısı 0'dan büyük kullanıcıları çekiyorduk ama sonuç olarak dönen kümede en çok ziyaret eden kullanıcı olmayabilir, bu sorguyu geliştirip ziyaret sayısına göre sıralatalım. Sıralama işlemi için de bir kalıp kullanıyoruz, Kullanımı, **ORDER BY <alan adı> <ASC/DESC>**. alan adı olarak tek alan adı belirtiyoruz, ondan sonra gelen kısımda ise ASC artan sırada, DESC, azalan sırada sıralamayı belirliyoruz. Bir sorguda birden fazla sıralama koşulu bulunmaz, ayrıca bu sıralama kalıbı, koşullardan sonra, LIMIT kalıbından önce yazılır. Sonuç olarak yukarıdakine göre geliştirdiğimiz sorgumuz şu şekilde olacaktır :
```
SELECT kullanici, kayit\_tarihi, ziyaret\_sayisi FROM \`tablo\`
WHERE ziyaret\_sayisi>0 ORDER BY ziyaret\_sayisi DESC LIMIT 0,5

```
Böylece en çok ziyaret eden 5 kişiyi görmüş olduk. Bu dökümanda verileri sayfa sayfa listelere parçalamadan bahsetmiyorum çünkü bu işlem sadece mysql ile yapılmıyor, daha önce yazdığım bir dökümanda bu konuda ayrıntılı hesaplamaları ve mysql listeleme işlemleri için nasıl yapıldığına değinmiştim. Verileri sayfa sayfa listeletmekle ilgili dökümana erişmek için tıklayın!

#### Verileri göstermek için işlemek

PHP'de mysql işlemlerini mysql fonksiyonları ile yapıyorduk, sorgularımızı mysql\_query fonksiyonu ile işletiyorduk Ancak bu fonksiyonu bir değişkene atama şeklinde kullanıyoruz. Örneğin :
```
$sonuc = mysql\_query("...");

```
Şeklindeki kullanımda, sorgudan çıkan sonuç kümesini $sorgu değişkeninde saklıyoruz. Bu sonuç kaynağını başka mysql fonksiyonlarına sokarak bazı şeyler elde edeceğiz : Sonuç kümesindeki kayıt sayısını mysql\_num\_rows() fonksiyonu ile öğrnebiliriz. **mysql\_fetch\_assoc()** ve **mysql\_fetch\_array()** fonkyisonları ile de sıradaki sonucu dizi şeklinde alabiliriz. Genel kullanım ile bir sorgunun çıktısını elde etmek için şu yöntem kullanılır :
```
// sql cümlesini olusturalim
$sql = "SELECT kullanici, ziyaret\_sayisi FROM tablo ORDER BY ziyaret\_sayisi DESC LIMIT 0,10";

// isletelim
$sonuc = mysql\_query($sql) or die("HATA : " . mysql\_error());

// cikan sonuc kumesi bos degilse
if( mysql\_num\_rows($sonuc) > 0 ){
  // sonuc kumesini donelim
  while( $satir = mysql\_fetch\_assoc($sonuc) ){
    // bilgileri yazdiralim
    print('kullanici = ' . $satir\["kullanici"\] . ', ');
    print('ziyaret\_sayisi = ' . $satir\["ziyaret\_sayisi"\] . '<br>');
  }
}

```
Burada sorgu cümlemizi önce $sql değişkenine atıyoruz. Bazen öyle bir gelişmiş sql yazmamız gerekiyor ki bu cümleyi döngülerle, eklemeli olarak uzun işlem ve kontrollere göre hazırlayabiliyoruz. PHP ile MySQL birlikte kullanıldığında gerçekten çok güçlü olabiliyor. $sql değişkenindeki string'i mysql\_query() fonksiyonu ile işletip $sonuc değişkenine atıyoruz sonuç kümesini. Ardından mysql\_num\_rows() fonksiyonu ile sonuç kümesinin boş olup olmadığını kontrol ediyoruz. Eğer tablo boş olsaydı sonuç kümemiz boş dönecekti, bu kontrol'e else ekleyip "Gösterilecek kayıt bulunamadı" gibi bir çıktı verdirmemiz de mümkün. Eğer sonuç kümesi boş değilse while ile satır satır bilgileri alıyoruz mysql\_fetch\_assoc fonksiyonu sayesinde. Burada atama işlemi yapıldığı için sonuç kümesindeki kayıtların hepsi bittiği zaman atama işlemi hep false değeri dönecektir. Bu yüzden while ile bu şekildeki kullanım oldukça sağlıklıdır. $satir değişkenine sorguda belirttiğimiz sıralamaya göre çıkan sonuç kümesinden sırayla kayıtlar çekilmektedir. Bu atama işleminde $satir değişkenine hangi alanları seçmişsek o alanları anahtar olarak tutan bir dizi atanır. Kullanırken de anahtar kelimelerle kolayca kullanabiliriz. Çıktıda istediğimiz şekilde bir html çıktısı oluşturabiliriz. Burada basit html çıktısı verdirdim, geliştirilerek tablo şeklinde de çıktı verdirilebilir. Çıktıların işlenişi genellikle bu şekildedir. Fazla denetimlerle ve html çıktısını iyi ayarlayarak daha opsiyonel sonuçlar elde edebilirsiniz.

#### Listeleme ve gösterme sistemlerinin basit mantığı

Aslında hiçbir farkı yoktur az önce yaptığımız işlemden, listelerken sadece kayıt numaraları, başlıkları ve gerekli alt bilgileri (okunma sayıları vs vs) çekiliyor. Listede link olarak bir sayfaya kayıt numaraları gönderiliyor. siz o başlığa tıkladığınızda ise o sayfaya gitmiş oluyorsunuz. Sayfa da da yapılan şey o kayıt no'ya ait kayıdı seçmek, bütün bilgileri çeker ve başlık, okunma sayısı gibi ayrıtıları verdikten sonra sistemle ilgili asıl işi yapan kodlar çalıştırılır. Yani döküman ise dökümanın içeriğini basar, forum ise forumda yazılanları işler.. Bu tarz sistemler basitlikten gelerek geliştirilir. Zaten herşey de öyle değil midir? :)

#### Basit olarak seçme/listeleme işlemlerinde benzerliği kullanmak ve birşeyler aramak

Bu işlemlerde WHERE kalıbının bir özelliği olan LIKE'ı kullanacağız. WHERE'da belirttiğimiz koşullarda basit operatörleri kulanarak büyük, küçük, eşit, eşit değil koşullarını tanımlayabiliyorduk.. LIKE ile bir değere benzerliği de aratabiliyoruz. LIKE basit olarak 2 joker karakterden oluşur \_ (alt çizgi karakteri) ile tek bir karakteri % (yüzde karakteri) ile bir ve birden çok karakteri ifade edebilirsiniz. Mesela kullanıcılardan a harfi ile başlayanları seçmek istiyorsak;
```
SELECT kullanici, kayit\_tarihi FROM tablo WHERE kullanici LIKE 'a%' ORDER BY kayit\_tarihi

```
Farklı şekilde; sadece Ocak 2005'de kayıt olmuş kullanıcıları görmek için;
```
SELECT kullanici, kayit\_tarihi FROM tablo WHERE kayit\_tarihi LIKE '2005-01%'

```
Siteyi 10-20 arasında ziyaret etmiş olan kullanıcılları görmek için de;
```
SELECT kullanici, ziyaret\_sayisi FROM tablo WHERE ziyaret\_sayisi LIKE '1\_'

```
sorguları örnek olarak verilebilir... MySQL'in kendi dökümantasyonunu veya mysqlferaks'daki gibi bir dökümantasyonu uygulama yaparak öğrenip sonra bu altyapıyı kullanmanızı öneririm. Çünkü güçlü bir sql ve güçlü bir php işlemesi ile çok hızlı ve çok sağlam veritabanları yönetebilirsiniz. Bu konuda her zaman hayret ettiğim bir site vardır. Spymac.com bu sitedeki online kullanıcı sayısı ve yaptıkları işlemleri düşünürsek oldukça sağlam bir altyapı gerekiyor, ki bu altyapının da php ve mysql ile kurulduğunu görünce mysql ve php'nin yapabilecekleri karşısında hayret etmeden duramıyorsunuz. Bol sorgulu kodlar.. :)