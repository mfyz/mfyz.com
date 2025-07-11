---
title: "PHP'de diziler yerine nesnelerle çalışmaya alışmak"
slug: phpde-diziler-yerine-nesnelerle-calismaya-alismak
date: 2010-11-28
description: "Javascript ve jQuery'nin nesne yönelimli yapısından etkilenerek PHP'de anlık veri yapıları için diziler yerine nesneleri kullanma alışkanlığı ve bunun nasıl yapılabileceğine dair bir örnek."
url: http://mfyz.com/tr/phpde-diziler-yerine-nesnelerle-calismaya-alismak/
tags: ["PHP", "nesne yönelimli programlama", "OOP", "dizi", "nesne", "veri yapıları", "javascript", "jQuery", "kodlama alışkanlıkları"]
category: PHP
migration: {"wpId":261,"wpPostDate":"2010-11-28T10:07:54.000Z"}
lang: tr
---

Javascript, jquery ile çok uğraşmaktan dizi kavramı php'de kullandığım birşey olarak kalmaya başladı. Yani jquery'de o her şeyi nesnel yazıyor, uğraştığınız şeylerin neredeyse tamamı DOM üzerinde bir nesne oluyor. PHP'de de genellikle yazdığınız bir sınıftan ürettiğiniz nesneler var. Onun dışında anlık yaptığınız bütün işleri dizilerle yapmaya alıştık.

Belki JSON ile back-end'de uğraşıyor olmak biraz daha nesnelerle çalışmayı zorluyor çünkü encode ettiğiniz veya decode ettiğiniz her şey nesnelere dönüşüyor.

Neyse, 2 satır kod ile diziler yerine anlık yaptığınız basit işleri nesneler üzerinde yapabileceğinizi gösterebilirim.

```php
$user = (object) array(
  "name" => "Fatih",
  "surname => "YILDIZ",
  "cars" => array(
    (object) array(
      "brand" => "BMW",
      "model" => "318i",
      "year" => "2009"
    ),
    (object) array(
      "brand" => "Honda",
      "model" => "Civic",
      "year" => "2003"
    )
  )
);

```

Nesne, dizi ve nesne şeklinde karışık kullanabilirsiniz. Mesela son arabanın markasına;

```php
print $user->cars[0]->brand;

```

şeklinde ulaşabilirsiniz.