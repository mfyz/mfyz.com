---
title: "PHP'de MSSQL Bağlantısı ve Kullanımı"
slug: phpde-mssql-baglantisi-ve-kullanimi
date: 2005-10-07
url: http://mfyz.com/tr/phpde-mssql-baglantisi-ve-kullanimi/
tags: ["mssql","PHP"]
category: PHP
migration: {"wpId":80,"wpPostDate":"2005-10-07T04:15:19.000Z"}
lang: tr
---

#### Method

MSSQL'e bağlanıp işlem yapabilmek için php'de kullanabileceğimiz 2 farklı teknik var. İlki mysql kütüphanesine çok benzeyen mssql kütüphanesi, diğeri ise ODBC kullanarak. mssql kütüphanesi ile mysql kütüphanesi arasında hiçbir fark yok, sadece mysql yerine mssql yazıp bütün işlerinizi yapıyorsunuz. Diğer teknik ise ODBC kullanarak bağlanmak.

#### Neden ODBC?

Çünkü odbc Microsoft'un kendi bağlantı protokoludür. Sunucu üzerinde kurulan küçük bir program ile mssql sunucunuza odbc üzerinden rahatlıkla erişebiliriz. PHP'de mssql'in kendi kütüphanesindense bu kütüphaneyi kullanmanızı öneririm. Bazı veritabanlarında Türkçe tablo adları, alan adları kullanılabiliyor. Bu tarz veritabanlarında php'deki mssql kütüphanesi sorun çıkarıyor malesef. ODBC kullanarak kolayca bu problemleri aşabiliriz.

#### Neler Gerek?

PHP'de Windows sunucuda odbc kütüphanesi için herhangi bir ekstra extension kurulu olması gerekmiyor, ancak \*nix tabanlı (unix, linux, macos) sunucularda ise [http://www.unixodbc.org/](http://www.unixodbc.org/) sayfalasına bakılması gerekebilir. Açıkcası linux sunucu üzerinde çalıştırmayı denemedim, tavsiye de etmem.

#### Nasıl Olacak Bu İş?

Şimdi mysql'deki bağlantı yapısına yakın bir yapı kullanacağız.
```
$baglanti = odbc\_connect('DRIVER={SQL Server};SERVER=host;DATABASE=veritabani','kadi','sifre');

```
$baglanti değişkenine $baglanti = mysql\_connect'de atadağımız gibi bir bağlantı kaynağı atıyoruz. Ancak bu fonksiyonda CONN String olarak tanımlanan cümlecik ile veritabanını doğrudan bildiriyoruz. Geriye SQL'leri işletmek kalıyor.
```
// sorguyu isletelim
$sorgu = odbc\_exec($baglanti,"select \* from tablo");

// verileri alip isleyelim
while( $bilgi = odbc\_fetch\_array($sorgu) ){
  print\_r($bilgi);
}

```
İşte bu kadar kolay. Genel olarak fonksiyonlar aynı, başına mysql yerine odbc geliyor o kadar. Sorguarımızı ise odbc\_exec($baglanti\_degiskeni,"sorgu"); şeklinde veriyoruz. Geri kalan kısımları mysql'de bildiğiniz tekniklerle halledebiliyoruz. ODBC fonksiyonları bazı fonksiyonlarda aynı bazılarında da oldukça farklı. [http://php.net/odbc](http://php.net/odbc) adresinden php'nin odbc fonksiyonları hakkında bilgi edinebilir.