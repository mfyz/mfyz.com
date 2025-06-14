---
title: "PHP'de verileri sayfa sayfa göstermek!"
slug: phpde-verileri-sayfa-sayfa-gostermek
date: 2004-12-20
description: "PHP'de sayfalama (pagination) tekniğini öğrenin. Bu rehber, dizilerden (array) ve MySQL veritabanı sonuçlarından gelen verileri sayfa sayfa listeleyeceğinizi gösterir."
url: http://mfyz.com/tr/phpde-verileri-sayfa-sayfa-gostermek/
tags: ["PHP", "sayfalama", "pagination", "veritabanı", "mysql", "dizi", "array", "web geliştirme", "programlama"]
category: PHP
migration: {"wpId":72,"wpPostDate":"2004-12-20T06:13:33.000Z"}
lang: tr
---

#### Opsiyonların belirlenmesi:

Sayfanın en başında ayarlamalar açıklaması ile sayfadaki değişken kavramları belirleyelim. Bunlar, sayfa başına listelenecek kayıt sayısı ve gösterimde kullanacağınız değişimleri içeren değişkenler olabilir.

```php
// sayfa basina listelenecek kayit sayisi
$liste = 10;

```

#### Kaynakların belirlenmesi:

Sayfalamak istediğimiz veri büyük ihtimalle mysql'den gelen bir sonuç kümesi olacaktır. Ancak bazen kendi oluşturduğumuz bir dizi de olabilir. İkisinde de sayfalama işlemimiz neredeyse aynı, farklı kısımları döküman boyunca ayrı ayrı belirterek inceleyeceğim zaten.

#### A) Kaynağımız çok boyutlu bir dizi ise:

Dizimizi örnek kullanım için rastgele sayılarla dolduracağım;

```php
for ( $i=0; $i < 100; $i++ ) {
  $dizi[$i][0] = rand(1,100);
  $dizi[$i][1] = rand(1,100);
  $dizi[$i][2] = rand(1,100);
}

```
100x3'lük bir matris şeklinde dizimizi 1-100 arasında rastgele sayılarla doldurmuş olduk. Şimdi bu diziyi 10'ar 10'ar sayfalatalım. Öncelikle dizinin boyutlarını biliyor olmamız için dizinin en başta belirlenmiş yani elemanlarının girilmiş olması gerekir. Ardından

```php
$kayit_sayisi = count($dizi);
```

değişkeninde kayıt sayımızı tutacağız.

#### Kaynak mysql sonuç kümesi ise:

Herhangi bir vertabanına bağlandıktan sonra bir tablodaki verileri sayfalayarak listelemeye çalışalım. Öncelikle tablodaki veri sayısını belirleyelim :

```sql
select count(herhangi_bir_alan_adi) as kayit_sayisi from tablo_adi
```

Bu sorgu çıktısını fetch edip $kayit_sayisi değişkenine atalım :

```php
$bilgi        = mysql_fetch_assoc($sorgu);
$kayit_sayisi = $bilgi["kayit_sayisi"];
```

#### Sayfa sayısının hesabı:

Şimdi kayıt sayısını, sayfanın başında belirlediğimiz sayfa başına listelenecek kayıt sayısına göre hesaplatalım.

```php
$sayfa_sayisi = floor($kayit_sayisi/$liste) + 1;
// ya da kisaca
// $sayfa_sayisi = ceil($kayit_sayisi/$liste);
// seklinde de kullanabilirsiniz.
```

Sondaki +1'in nereden çıktığını değerler verek çözebiliriz. Örneğin 5 kayıt varken 5/10 = 0.5, bunun alta yuvarlanışı 0 verir. 25 kayıt varken 25/10 = 2.5, alta yuvarlanışı 2. Bu değerlere 1 eklememiz gerekir.

#### Sayfa sayısı hatası ve çözümü:

Sayfa başına listelenecek kayıt sayısı değerinin tam katları kadar kayıt olduğunda küçük bir sorunla karşılaşıyoruz. Mesela 49 kayıt varken 5 sayfa olması gerekir. yukarıdaki hesapta da doğru olarak çıkar. Ancak 50. kayıtın da 5. sayfada bulunduğunu biliyoruz. 50 kayıt varken sayfa sayısı 6 çıkar. Bu hatayı göz ardı ederek yazdığımız scriptde 6 sayfa bulunur ve 6. sayfada hiç kayıt listelenmez. Bunu kontrol ettirerek sayfa sayısı değerinde oynamamız gerekir. Tam katı olduğunu o sayının, sayfa başına listelenecek kayıt sayısına olan modunun 0 olması ile anlarız ($kayit_sayisi%$liste=0 ise).

```php
if ( $kayit_sayisi % $liste == 0 ) {
  $sayfa_sayisi--;
}
```

Bunu sayfa sayısını belirlerken ters kontrol ile eklenilmesi gereken 1'i kontrol ile ekleyerek de yapabiliriz. Böylece doğru olarak sayfa sayısını hesaplamış olduk.

#### Sayfa kontrolü ve limitlerin belirlenmesi:

PHP kodumuzun en başında GET metodu ile gelen değişkenlerden "sayfa" değişkenini alacağız. Bu değişkenin içeriğinin geçerli olup olmadığını kontrol ettireceğiz;

```php
if ( !is_numeric($sayfa) || $sayfa < 1 || $sayfa > $sayfa_sayisi ) {
  $sayfa = 1;
}
```

Ters kontrol ile sayfa değişkeni ile gelebilecek hataları engellemiş olduk. Bundan sonra alt ve üst limitlerimizi oluşturacağız.

```php
$alt_limit = $sayfa * $liste;
```

Hemen değerler vererek aklımızda kurduğumuz alt limitin doğruluğunu kontrol ediyoruz : 2. sayfada isek 10 indisli kayıt'dan (yani 11. kayıttan) 19'a kadar olanların (aradaki kayıt sayısı 10'dur inanmayanlar saysin :) ) görüntülenmesini bekleriz; 2*10=20, yanlış çıktı. Dizinlerdeki 0 indisinin olması gibi bir sorundur bu ve $sayfa'yı 1 azaltma ile giderebiliriz:

```php
$alt_limit = ($sayfa - 1) * $liste;
```

işlemi ile alt limiti belirlemiş oluruz. Üst limit de bu sayıya $liste kadar değer eklenmesi ile buluruz. Ancak eğer son sayfa ise ve limitimizin altında kayıt varsa (genellikle böyle olacaktır), üst limit olarak kayıt sayısını atarız.

```php
$ust_limit = $alt_limit + $liste;
if ( $ust_limit > $kayit_sayisi ) {
  $ust_limit = $kayit_sayisi;
}
```
Bunu yapmazsak çıktı verirken döneceğimiz for içerisinde fazla satırlar yazdırılacaktır.

### Sonuçların seçilmesi ve gösterim :

#### A) Kaynağımız çok boyutlu bir dizi ise:

Dizide basit bir for döngüsü ile bunu halledeceğiz.

```php
for ( $i = $alt_limit; $i < $ust_limit; $i++ ) {
  print($dizi[$i]);
}
```

#### B) Kaynak mysql sonuç kümesi ise:

MySQL'de "limit" sayesinde belirli aralıktaki kayıtları seçebiliyorduk. Bunu kullanarak tek sql sorgusunda halletmiş olacağız.

```sql
select * from tablo_adi limit $alt_limit,$liste
```

Sorguda dikkat ettiyseniz üst limiti kullanmadık, çünkü mysql'de limit kavramının kullanımı "... limit baslangic,kac_kayit" şeklindedir. Başlangıcı hesaplamk yeterlidir. Bu sorguyu while ile fetch edip istediğiniz şekilde yazdırabilirsiniz. Eğer o andaki limit kadar kayıt yoksa var olanlar gösterilir.

#### Sayfa linklerinin gösterilmesi:

Önceki ve sonraki sayfaları sayfa ve sayfa sayısı değişkenlerine göre belirleyeceğiz. 2 küçük kontrol ile bunu halledebiliriz :

```php
if ( $sayfa > 1 && $sayfa_sayisi > 1) {
  print '<a href="?sayfa=' . ($sayfa - 1) . '">Önceki Sayfa</a>';
}

// arada o andaki sayfa ve toplam sayfa sayisini gosterelim :
print '<b>' . $sayfa . '/' . $sayfa_sayisi . '</b>';

if( $sayfa > 1 && $sayfa < $sayfa_sayisi ){
  print '<a href="?sayfa=' . ($sayfa + 1) . '">Sonraki Sayfa</a>';
}
```

Örnek çıktı:

```html
<a href="?sayfa=2">Önceki Sayfa</a> <b>4/15</b> <a href="?sayfa=4">Sonraki Sayfa</a>
```
