---
title: "Pear'da MDB2 ile veritabanı işlemleri"
slug: pear-da-mdb2-ile-veritabani-islemleri
date: 2008-02-17
url: http://mfyz.com/tr/pear-da-mdb2-ile-veritabani-islemleri/
tags: ["database","db","mdb2","mssql","mysql","pear","pgsql","PHP","veritabanı"]
category: PHP
migration: {"wpId":133,"wpPostDate":"2008-02-17T04:08:44.000Z"}
lang: tr
---

#### MDB2 nedir?

MDB2 pear'da eskiden DB adıyla geliştirilen ve bir süre önce gelişimi durdurulup projeyi mdb2 olarak devam ettirdikleri bir veritabanı yönetim kütüphanesidir. Aslında sırayla girdiğimiz mysql_connect, mysql_select_db, mysql_query ... gibi işlemleri biraz daha ortak yapıda kullanmamızı sağlayan, çeşitli yetenekleri olan güvenli bir kütüphane.

Normalde veritabanımıza (mysql, mssql veya pgsql farketmez) bağlanırken bağlantı kaynak değşkeni oluştururuz. Örneğin :
```php
$db = mysql_connect(...);

```
sonra da bu değişkeni kullanarak fonksiyonlarımızı işletiriz. Bu noktadan sonra veritabanı seçeriz ve sorgular üretip sonuçlarını işleriz.

MDB2'de veritabanı bağlantı cümleleri vardır. Tek hamlede hem bağlantı değişkenimizi oluşturur hem de veritabanı seçeriz.
```php
$db = MDB2::connect("bağlantı cümlesi");

```
connect yerine **factory** fonksiyonunu da kullanabilirsiniz, aynı işi görmektedir. Bağlantı cümlesi, pear dizininde MDB2'nin dizinindeki Drivers klasöründe yüklediğiniz veritabanı sürücülerine göre değişir.

Genellikle mysql için kullanacağınızdan örnek vermek gerekirse
```
mysql://kullanici:sifre@localhost/veritabanim

```
yeterince açık ama yine de üstünden geçeyim. Gördüğünüz gibi cümle bir protokol adresi gibi. Yani ftp'ye bağlanmaktan farksız :) önce protokol türünü belirtiyoruz (mysql, pgsql, sqlite vs) arada "://" işaretlemesinden sonra kullanıcı, ":" ve şifreyi belirtiyoruz. @ işaretinden sonra sunucu adresi. Sonrasında da klasör ifade eder gibi veritabanı adını veriyoruz. SQLite için ise protokoldan sonra doğrudan dosya adresini veriyorsunuz. (Daha fazla bilgi için [http://pear.php.net/manual/en/package.database.mdb2.intro-dsn.php](http://pear.php.net/manual/en/package.database.mdb2.intro-dsn.php))

Biliyorsunuz mysql mssql sqlite pgsql arasında çok fazla kural farkı yok. Yani aynı sorgularla veri ekleyebiliyor, güncelleyebiliyor, silebiliyor ve listeletebiliyoruz. Böylece aynı veritabanı yapısına sahip mysql ile çalışan bir projeyi mssql'e geçirmek çok da zor olmuyor :)

Şimdi basitçe bir sorgu işletmeyi göstereyim. MySQL'de bir sorgu işletmek için:
```php
$sorgu = mysql_query("select ...");
// veya
mysql_query("delete from ...") or die("silinemedi");

```
şeklinde kullanıyorduk. MDB2'de de çok farklı değil:
```php
$sorgu = $db->query("select ...");

```
sorgu sonucunu işlerken
```php
print 'Gösterilen kayıt sayısı: ' . mysql_num_rows($sorgu) . '<br/>';

while($bilgi = mysql_fetch_assoc($sorgu)){
  print '<b>' . $bilgi[baslik] . '</b><br/>';
}

```
şeklinde kullanırdık. İşte bu noktada MDB2 bize birçok kolaylık sağlıyor. MDB2'de sürü sepet sonuç işleme fonksiyonu var fakat biz 2 tanesini kullanacağız.
```php
$sorgu = $db->query("select no, adi, eposta from uyeler where uye_no = 5");
$uye_bilgisi = $sorgu->fetchRow();

```
Bu kodda $uye_bilgisi değikeni dizi olarak indisleri normal numara olmak üzere $uye_bilgisi[0]'da no, $uye_bilgisi[1]'da adi, $uye_bilgisi[2]'da eposta, alanlarını tutar. fetchRow fonksiyonunun parametresiyle "İşleme Türü"nü ayarlarız. Eğer ayarlamazsak, veri az önceki gibi gelecektir.
```php
$uye_bilgisi = $sorgu->fetchRow(MDB2_FETCHMODE_ASSOC);

```
olarak kullanırsak taboldaki indis adlarına göre doğrudan seçebiliriz verimizi ($uye_bilgisi[no], $uye_bilgisi[adi] $uye_bilgisi[epsta]). Bunu her seferinde yapmak yerine, veritabanı bağlantısı yaptıktan hemen sonra
```php
$db->setFetchMode(MDB2_FETCHMODE_ASSOC);

```
ile "İşleme Türü"nü tüm betik için ayarlamış oluruz. Bundan sonra ilk verdiğim örnek koda göre işleminizi kolayca yapabilirsiniz.

Genellikle 2 tür veri çekeriz, tek satırlık sonuçlar veya listeler. Mesela yukarıdaki sql cümlesi bize tek kayıt döner yani 5 nolu üyenin bilgilerini. Bunun için doğrudan fetchRow() kullanarak bilgileri aldık. Çok satırlı bir sql sorgusu işletiyor olsaydık :
```php
$sorgu = $db->query("select no, adi, eposta from uyeler");  // tum uyeler
while( $uye_bilgisi = $sorgu->fetchRow() ){
  print $uye_bilgisi[adi];
}

```
şeklinde fetchRow()'u while içinde değişkene atama olayı olarak tanımlayacaktık. Böylece kayıtlar bittiğinde atama gerçekleşmeyecek ve döngü duracaktı. Fakat bu noktada kolaylık olsun diye tüm kayıtları çok boyutlu diziye doğrudan almak için **fetchAll()** fonksiyonunu kullanıyoruz.
```php
$sorgu = $db->query("select no, adi, eposta from uyeler");  // tum uyeler
$tum_uyeler = $sorgu->fetchAll(); // tüm üyeleri çok boyutlu dizi olarak aldık.

// istersek count($tum_uyeler) ile üye sayısını alabiliriz.

// dönmemiz gerekiyorsa
foreach( $tum_uyeler as $uye ){
  print $uye[adi];
}

```
Tabi $tum_uyeler dizisi bizim listeledigimiz sql sonucunu dizi olarak donuyor bize. Dizi boyutu da kayıt sayısı yani üye sayısını veriyor count($tum_uyeler) ile. Aynı işlemi **$sorgu->numRows()** ile de yapabilirdik. Zira while ile kullanıyorsak dizi boyutu diye birşey olmayacak ve **numRows**'u kullanacağız.

Bu iki yol da neredeyse aynı. while, foreach veya verinizin dizi olarak olup olmaması alışkanlıklarınız ve programlama anlayışınız ile ilgili birşey.

Daha da hızlı dizi olarak almak istiyorsanız
```php
$uyeler = $db->queryAll("select * from uyeler");

```
size tüm üyleri çok boyutlu dizi olarak $uyeler değişkenine atayacaktır. query + fetchAll işleminin kısaltılmışıdır :)

#### Ek olarak

**$sorgu->numCols()** ile sorgudan kaç tane kolon çıktığını öğrenebilirsiniz. Aynı zamanda **$sorgu->fethcCol()** ile verinizi kolon kolon alabilirsiniz de (nerede kullanacağınızı bilmiyorum ama işe yarayabilir).

**$sorgu->getColumnNames()** ile işlenen kolonları dizi olarak alırsınız. İşleme sırasıyla yerleşecektir dizide. Sorgudan hangi kolonların döndüğünü bilmediğiniz sorgularda kolonları meta olarak basabilmek için kullanabilirsiniz bu fonksiyonu.

**$sorgu->seek(5)** ile sorguları dönerken 5 kayıt atlamanızı sağlar (ilginç).

**$db->lastInsertID()** ile son "insert into uyeler (...) values (...)" tipi, veri kayıt sql sorgunuzda eklenen kayıt için, auto_increment olan kolona atanan numarasını döner.

#### Hata yakalamak

Sorgunuzu çalıştırırken birçok nedenden dolayı çalışmayabilir.
```php
$sorgu = $db->query("...");

if(PEAR::isError($sorgu)) {
  die('Sorgu çalıştırılamadı. Hata mesajı : ' . $sorgu->getMessage());
}

```
kullanımı; PEAR:isError($sorgu) $sorgu degişkeni ile tanımlanan veritabanı sorgu nesnesinde hata varsa, aynı nesnedeki **getMessage()** fonksiyonu ile hata mesajını iletir.

[http://pear.php.net/manual/en/package.database.mdb2.php](http://pear.php.net/manual/en/package.database.mdb2.php) adresinden mdb2 manual'ına ulaşabilirsiniz.