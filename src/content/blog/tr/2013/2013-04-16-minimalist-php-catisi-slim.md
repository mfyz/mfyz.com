---
title: "Minimalist PHP Çatısı Slim"
slug: minimalist-php-catisi-slim
date: 2013-04-16
url: http://mfyz.com/tr/minimalist-php-catisi-slim/
tags: ["framework","minimal","php","slim"]
category: PHP
migration: {"wpId":354,"wpPostDate":"2013-04-16T05:00:00.000Z"}
lang: tr
---

Artık kimse bir çatı (framework) kullanmadan web uygulaması yazmıyor. Kim hammaliye işlerle boğuşarak zaman kaybetmek ister ki. Bütün çatıların odağı yapacağınız işleri kolaylaştırmaktır, daha az kod daha çok iş. Çoğunlukla da bir ton güzellikle gelirler, vertiabanı katmanları, imaj işleyiciler, dosya yöneticileri, şablon motorları vs. Basit bir web uygulaması hazırlıyor ve topu topu 3-5 farklı varış noktası olan bir uygulama yazıyorsanız, tek ihtiyacınız olan şey bir kod navigasyonudur, gerisi işinizi kolaylaştıracak kütüphanelerdir fakat bir çatının tüm elementlerini kullanmak istemeyebilirsiniz veya sadece ufak bir yardımcı kütüphane yetecek bir uygulama yazıyor olabilirsiniz. Örnegin sadece xml işleyen bir api hazırlıyorsunuz. Tek ihtiyacınız genel kod navigasyonunu halledecek bir yardımcı ve xmlinizi işleyeceğiniz bir kütüphane. Bu yazıda Slim adında minimalist bir php çatısını kısa bir örnek kod ile tanıtacağım. Slim, altı üstü, hata ayıklama, oturum yönetimi ve çok basit bir şablon mekanizmasından oluşuyor. Şablon motoru bile değil, sadece yardımcı. Aşağıdaki kodda ikinci varış noktası tanımlamasında görebilirsiniz şablon kullanımını. Çok detaya girmeye gerek yok kod zaten kendini anlatıyor :)
```
$app = new \\Slim\\Slim();
$app->get('/hello/:name', function ($name) {
    echo "Hello, $name";
});
$app->get('/books/:id', function ($id) use ($app) {
    $app->render('books.php', array('id' => $id));
});
$app->notFound(function () {
    die("We couldn't find what you looking for.");
});
$app->run();

```
Slim'e istediğiniz şablon motorunu entegre edebilirsiniz. Slim'e [http://www.slimframework.com](http://www.slimframework.com) adresinden ulaşabilirsiniz. Dökümantasyonu çok detaylı değil fakat zaten çok detaya da ihtiyacınız olmayacak.