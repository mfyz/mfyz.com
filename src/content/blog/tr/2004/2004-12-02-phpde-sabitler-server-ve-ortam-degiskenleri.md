---
title: "PHP'de sabitler, server ve ortam değişkenleri"
slug: phpde-sabitler-server-ve-ortam-degiskenleri
date: 2004-12-02
description: "PHP'de kullanılan özel sabitler, süper global değişkenler ve sunucu ortam değişkenleri hakkında bir rehber. `__FILE__`, `__LINE__`, `$_SERVER`, `$_COOKIE` gibi değişkenlerin ne işe yaradığını ve betik içinde nasıl kullanıldığını öğrenin."
url: http://mfyz.com/tr/phpde-sabitler-server-ve-ortam-degiskenleri/
tags: ["PHP", "sabitler", "değişkenler", "$_SERVER", "$_COOKIE", "$_GET", "$_POST", "süper global", "web geliştirme", "programlama", "__FILE__", "__LINE__"]
category: PHP
migration: {"wpId":43,"wpPostDate":"2004-12-02T23:10:06.000Z"}
lang: tr
---

#### PHP Dışından Değişken Nasıl Gelir?

PHP'de işlerimizi çok kolaylaştıran bazı özel değişkenler vardır. Bu özel değişkenler olmasa php'de yapılabilecekler çok sınırlandırılırdı. Mesela bir çerez kontrolü yaparken $_COOKIE dizisini kullanırız. Ya da bir betik dosyamızda hata kontrolü yaparken dosya ismini değişimlere rağmen koruyabileceğimiz değişkenler, kodun hangi satırında hata olduğunu tutan başka bir değişken vardır.

Şimdi bu değişkenleri; sabitler, php değişkenleri ve sunucu değişkenleri olarak üçe ayıracağız.

#### Sabitler

```
__FILE__      O esnada icra edilen scriptin bulunduğu php'nin dosya adıdır.
__LINE__      İcra edilen scriptte o andaki satır numarasını verir.
PHP_VERSION   Kullanılan php scriptinin adını içerir.
E_ERROR       Düzeltilmesi mümkün olan bir hatayı bildirir.
E_WARNING     Scriptin icra edilmesi için gerekli olan hatayı bildirir.
E_PARSE       Scriptteki yazım hatasını bildirir.

```

$ gibi degişken işareti almadan doğrudan kullanılır. Örneğin:

```php
if( $hata ){
  print __FILE__ . " dosyasında, " .
  __LINE__ . " satırında hata var!";
}

```

#### Sunucu Değişkenleri

```
SERVER_NAME            Server'ın adını içerir.
QUERY_STRING           Sayfaya erişmek için kullanılan sorgu stringini içerir.
HTTP_ACCEPT_CHARSET    O andaki talebe ait karakter kümesini içerir.
HTTP_ACCEPT_LANGUAGE   Dil hakkındaki bilgiyi içerir.
HTTP_REFERER           Web tarayıcı tarafından gönderilen referans adresi içerir.
HTTP_USER_AGENT        Sayfayı görüntülemek için kullanılan web tarayıcı hakkında bilgi içerir.
REMOTE_ADDR            Kullanıcının IP numarasını içerir.

```

Sunucu değişkenlerini bir ortam değişkeni olan $_SERVER dizisinin indisleri olarak düşünürsek örnek olarak şu şekilde kullanacağız:

```php
print 'Merhaba arkadaşım, ip adresin: ' . $_SERVER["REMOTE_ADDR"] .
' ve tarayıcı bilgilerin: ' . $_SERVER["HTT_USER_AGENT"];

```

#### Ortam Değişkenleri

```
$_COOKIE    Cookie değişkenlerini tutan bir dizidir.
$_SESSION   Oturuma ait değişkenleri saklayan dizidir. Tarayıcı kapandığında sıfırlanır.
$_GET       Get methodu ile gelen değişkenleri tutan dizidir.
$_POST      Post methodu ile gelen değişkenleri tutan dizdir.
$_FILES     Post methodu ile gönderilen dosyaların temporary yollarını tutan dizidir.
$_SERVER    Server değişkenlerini kullanmamızı yarayan dizidir.

```

Ortam değişkenleri ise tahmin ettiğiniz gibi doğrudan değişken olarak kullanabilirsiniz.

Bu değişkenleri çok çeşitli scriptlerde görmek mümkün. Dediğim gibi bu değişkenleri kullanamamak php'nin olanaklarını çok fazla biçimde kısıtlamak hatta neredeyse php'yi kullanılmaz hale getirmektir. Çünkü php gibi dinamik bir dil kullanmadaki ana amaçlardan biri, kullanıcının hareketlerine tepki veren uygulamalar yazmaktır. Kullanıcı tepkisini ise bu değişkenler yardımı ile belirleriz.