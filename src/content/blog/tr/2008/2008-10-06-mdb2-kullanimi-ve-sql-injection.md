---
title: "MDB2 Kullanımı ve SQL Injection"
slug: mdb2-kullanimi-ve-sql-injection
date: 2008-10-06
url: http://mfyz.com/tr/mdb2-kullanimi-ve-sql-injection/
tags: ["injection","mdb2","pear","PHP","sql"]
category: PHP
migration: {"wpId":139,"wpPostDate":"2008-10-06T11:06:42.000Z"}
lang: tr
---

#### MDB2 Nedir?

MDB2 ilk başta DB olarak başlayan sonra MDB olan ve en son MDB2 ismine dönüşen PEAR'ın veritabanı yönetim paketlerinden birisidir. Oldukça fazla türde veritabanı sürücüsü (driver) bulunduğu için, projenizde bu kütüphaneyi kullanıp fakrlı veritabanı yapılarını aynı kodda rahatça kullanabilmenizi sağlar. Ayrıca "prepare & execute" gibi yapılarla hem sql sorgularınızı daha anlaşılır yapar, hem de injection gibi saldırılar için veri türü kontrollerini otomatik yapar. Sonuç olarak güvenlik, daha taşınabilir kod, kolaylık gibi özelliklerinden dolayı tercih edilmesi gereklidir diye düşünüyorum. Genel olarak PHP'nin PDO'suna benzeyen bir yapısı var (özellikler bakımından).

#### Örneklerle Genel Kullanımı

PEAR'ı sisteminize kurmanız gerekiyor. Ya da PEAR'ı kendi projenize gömerek de kullanabilirsiniz. http://pear.php.net/package/MDB2 adresinden MDB2'yi indirebilirsiniz. PEAR dizininizi include\_path'a tanıtırsanız şu şekilde sayfa başında MDB2'yi çalıştırabilirsiniz :
```
require\_once('MDB2.php');
```

#### Bağlantı

MDB2'yi bağlamak çok kolay. Bağlantı fonksiyonunda DSN (Data Source Name) denilen bir cümle ile veritabanı türü, kullanıcı, şifresi, sunucu, port, veritabanı adını bir url olarak veriyorsunuz. Yani fonksiyona 100 tane parametre girmek zorunda kalmıyorsunuz. Aşağıdaki örnekten rahatça anlayacaksınız zaten DSN'nin nasıl birşey olduğunu :
```
$db = MDB2::connect("mysql://kullanici:sifre@localhost/veritabani");
if(PEAR::isError($db)){
  die( 'Veritabani baglantisi yapilamadi!   
' . $db->getMessage() );
}

```
gördüğünüz gibi bir web sitesi url'si tanımlamak gibi. Daha doğrusu ftp erişimi yapmak gibi. protokol türü + "://" + kullanıcı + ":" + şifre + "@" + sunucu (+":port") + "/" veritabanı Yani siz aynı veritabanı yapısını oluşturduğunuz sürece projenizi ileride mysql:// yerine pgsql:// yazarak kolayca çevirebileceksiniz. Neyse, bağlantı kısmı işin başlangıcı. Asıl sık sık kullanacağımız olan şey sorgu işletmek, sonuçları işlemek vs.

#### Sorgu işletmek

```
// sorguyu isletirken query fonksiyonunu kullanıyoruz
$sorgu = $db->query("select \* from haberler");

// numRows ile donen sonuc kumesinin boyutunu alabiliriz
if( $sorgu->numRows() > 0 ){

  // fetchAll ile tum sonucları çok boyutlu dizi olarak alabiliriz
  // veya while ile donerek fetchRow() fonksiyonu yardimi ile
  // kayitlari sirayla tek tek aldirabiliriz.
  $sonuclar = $sorgu->fetchAll();

  // sorgu kaynagini kaldiriyoruz. Eger bu islemi yapmazsak
  // sunucu yukunu agirlastirabiliriz
  $sorgu->free();

  // sonuclari normal dizi islemleri ile isleyebiliriz
  foreach($sonuclar as $sonuc){
    print $sonuc\[baslik\] . '  
';
  }
}

```
Örnekte tüm detayları açıkladım :) Eğer çok boyutlu sonuçlarla çalışıyorsanız fetchAll ile halletmenizi öneririm işlerinizi. Eğer tek boyutlu sonuç bekliyorsanız fetchRow işinizi görecektir.

#### Injection için güzellikler

En sevdiğim kısmı ise sizi verilerinizin türünü kontrol etme işini üstünüzden alması. Bunun için iki yol var. Birincisi query kullanarak quote yapmak. Yani Türkçesi, yukarıdaki methodu kullanarak sorgu işletmek, ama işletirken de değişkenleri tek tek bir fonksiyondan geçirmek. Örnekle anlatırsam :
```
// elimizde $ad, $ziyaret\_sayisi degiskenleri olsun

$sorgu = $db->query('insert into uyeler (ad, ziyaret) values ('. $db->quote($ad, 'text') .', '. $db->quote($ziyaret\_sayisi, 'integer') .')');

```
görüldüğü gibi sql içinde herhangi bir tırnak kullanmadan doğrudan quote() fonksiyonunu kullandım. ilk parametrede veri ikinci parametrede de veri türünü belirtiyorsunuz. Eğer text ise sql injection önlemlerini alıyor. integer ise zaten sayısallaştırıp kaydediyor. Ancak yine de sqliniz oldukça karışık görünüyor. Yani baksanıza bir sürü tırnak ile SQL cümlesini oluşturan string'den kaçmak için uğraştık. Ayrıca sürekli $db->quote(...) gibi bir fonksiyon çağırmak, elinizde 20 tane alan varsa sıkıcı bir işe dönüşecektir. Bunun için prepare & execute yapısını kullanacağız.

#### Prepare & Execute

quote kullanımından biraz daha uzun. Ancak eğer sorgunuzda kullanıcıdan gelebilecek bir veri kullanıyorsanız KESİNLİKLE bu yapıyı kullanmanızı öneririm. Yani sonuçta gözünüzden kaçabiliyor bazen değişkenlerinizi izlemek ve kontrol etmek. Bu kullanıma alışırsanız farkında olmadan vereceğiniz açık sayısı en az inecektir. Gelelim kullanıma, bunu da örnekleyerek anlatacağım :
```
// prepare ile ilk parametrede sorgunuzu yazıyorsunuz. Değişken olan her yere tırnak fln koymadan sadece soru işareti koyuyorsunuz. prepare fonksiyonunun ikinci parametresinde de dizi olarak sırasıyla o soru işaretlerinin veri türlerini belirtiyorsunuz.
$sorgu = $db->prepare("select \* from uyeler where adi like ?", array('text'));

// execute ile dizi şeklinde soru işaretlerine sırasıyla gelecek verinizi veriyorsunuz.
$sonuc = $sorgu->execute("fatih");

// evreka, $sonuc degiskeni bir sonuc kumesine dönüyor. Sonra klasik işlemleri yapıyorsunuz
if($sonuc->numRows() < 1) die("sonuc bulunamadi"); $uyeler = $sonuc->fetchAll();
// ...

```
Bu örnekte tek değişken gösterdiğim için pek anlaşılmamış olabilir. Ancak alttaki örnekte prepare & execute yapısının önemini kavrayacaksınız.
```
// elimizde çok değişken olsun

$sorgu = $db->prepare("insert into uyeler (no, adi, eposta, yorum\_sayisi, uyelik\_tarihi, aktif, www) values (?, ?, ?, ?, now(), ?, ?)", array('integer', 'text', 'text', 'integer', 'integer', 'text'));
// verilerinizi bir diziye koyuyorsunuz, tabiki soru işaretleri hangi sırada ise o sırada koyuyorsunuz
$veri = array($no, $adi, $eposta, $yorum, $aktif, $www);
// basitçe sorgunuzu işletiyorsunuz
if( !$sorgu->execute($veri) ) die("sql çalışmadı");

// işte olayın güzelliği şurada :
// mesela aynı sqlinizi bir daha işletmek istiyorsunuz.
// bunun için $sorgu olan object değişkenini tekrar tekrar kullanabilirsiniz
$sorgu->execute(array(5, 'başka üye', 'deneme@deneme.com', 10, 1, "http://www.deneme.com"));

// hatta eğer sisteminizi daha efektif hale getirmek isterseniz
// bütün SQL'lerinizi fonksiyonlara çevirin. Mesela :
function uye\_kaydet($veri){
  // sql hazirlaniyor
  $sorgu = $GLOBALS\[db\]->prepare("insert into uyeler (no, adi, eposta, yorum\_sayisi, uyelik\_tarihi, aktif, www) values (?, ?, ?, ?, now(), ?, ?)", array('integer', 'text', 'text', 'integer', 'integer', 'text'));

  // gelen veri isletiliyor
  if( $sorgu->execute($veri) ) return true;
  else return false;
}

```
Son kısımda bahsettiğim detayı umarım anlayabilmişsinizdir. Çünkü bu şekilde uygulama geliştirdiğiniz zaman, uygulamanız daha esnek, daha rahat müdahale edilebilir ve daha rahat geliştirilebilir hale gelecektir. Siz üye kayıt sayfasını daha sadeleştirmiş olacak, eğer gerekirse üye veritabanında yapacağınız bir değişiklik için gidip üye kayıt sayfasının içinde HTML, PHP karışık kodun içinde aramak yerine doğrudan fonksiyonunuzdaki sql'i güncelleyerek daha hızlı çalışacaksınız. Bu noktada iş gruplarına ait fonksiyonları sınıflandırırsanız zaten Nesne Tabanlı Programlama (OOP)'ya adım atmış olacaksınız :)