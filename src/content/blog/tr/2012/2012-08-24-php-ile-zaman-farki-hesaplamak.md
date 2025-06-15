---
title: "PHP ile Zaman Farkı Hesaplamak"
slug: php-ile-zaman-farki-hesaplamak
date: 2012-08-24
description: "PHP'de DateTime sınıfı ve date_diff fonksiyonu kullanılarak iki tarih arasındaki zaman farkının (yıl, ay, gün, saat, dakika) nasıl hesaplanacağı ve 'X gün önce' gibi formatlarda nasıl gösterileceği anlatılıyor."
url: http://mfyz.com/tr/php-ile-zaman-farki-hesaplamak/
tags: ["PHP", "DateTime", "date_diff", "Zaman Farkı", "Tarih İşlemleri", "Programlama", "Web Geliştirme"]
category: PHP
migration: {"wpId":316,"wpPostDate":"2012-08-24T01:14:40.000Z"}
lang: tr
---

Daha önce php'de iki tarihi karşılaştırmayı anlatmıştım [/phpde-tarih-karsilastirma](/phpde-tarih-karsilastirma), ancak iki tarih arasındaki ay, gün, yıl farkını kullanmanız gerektiğinde, php'nin tarih-zaman sınıfını kullanarak iki tarih arasındaki zaman farkını istediğiniz periyodda hesaplatabilirsiniz.

Bu yönetmle hesaplayacağınız tarih farkının iki genel kullanımı vardır. Birincisi hesaplamalarınızda iki tarih arasındaki geçen zamana göre yaptığınız bir kuralınız vardır. Mesela bir blog yazınızın 1 aydan önce yazıldığını denetlemek ve buna göre "Bilgiler geçerliliğini yitirmiş olabilir" gibi bir not göstermek istiyorsunuz. Bunun için şu an ile yazının yazılma tarihi arasında 1 ay olup olmadığını sorgulayabilirsiniz.

Bu hesaplama aslında basit bir matematiksel bir hesap gibi görünse de aslında ay uzunluğu, artık yıl hesabı gibi nedenlerden dolayı ve her zaman 1 ay = 30 gün olmaması nedeniyle biraz daha karışık olabiliyor. Dolayısıyla anlattığım yöntem gibi hazır yöntemleri kullanarak bu hesaplamaları doğru şekilde yapabilirsiniz.

Şimdi basit bir kod ile örnekleyeceğim.

```php
$now = new DateTime();
$created = new DateTime($_entry['created_at']);
$diff = date_diff($now, $created);
$days = $diff->format('%d');
$hours = $diff->format('%h');
$mins = $diff->format('%i');

$diffStr = NULL;
if ($days > 0) {
  $diffStr .= $days . ' gün';
}
if ($hours > 0) {
  $diffStr .= ' ' . $hours . ' saat';
}
if ($mins > 0) {
  $diffStr .= ' ' . $mins . ' dakika';
}

print $diffStr;

```

Yukarıdaki kodda $diffStr değişkeni, yazınızın kaç dakika, saat, gün önce eklendiğini gösterecektir. Eğer isterseniz ayı, yılı da ekleyerek herhangi bir tarih formatını "3 gün 8 saat 3 dakika önce" şeklinde bir metine çevirebilirsiniz.