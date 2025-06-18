---
title: "Ya hep ya hiç : www kullanın veya kullanmayın"
description: "Web sitelerinde www olan veya olmayan alan adı kullanımının tutarlılığının önemi. Oturum, çerez ve cross-domain sorunlarını önlemek için PHP ile yönlendirme çözümleri."
slug: ya-hep-ya-hic-www-kullanin-veya-kullanmayin
date: 2009-11-20
url: http://mfyz.com/tr/ya-hep-ya-hic-www-kullanin-veya-kullanmayin/
tags: ["www yönlendirme", "alan adı", "seo", "php", "web geliştirme"]
category: Sunucu Programlama
migration: {"wpId":152,"wpPostDate":"2009-11-20T20:35:31.000Z"}
lang: tr
---

Günümüzde ajax, flash derken client side crossdomain istekler geziyor. Bunun gibi teknolojileri kullanan uygulamalarda sık karşılaştığımız bir sorun var. Mesela flash içinde, javascript dosyalarında veya php yönlendirmelerinde bir sürü yerde yönlendirme kullanıyoruz ve aslında farkında olmadığımız bir kullanımdan dolayı oturum, istek cevaplarının gelmemesi gibi hatalar alıyoruz. Farkında olmadığımız şey şu :

Siz uygulamanızı yazıyorsunuz, flash'da actionscript yazan arkadaş veya siz http://www.mfyz.com/kaydet.php gibi bir adrese çağrı yapıyor. Veya bir işlem sonucunda http://www.mfyz.com/tesekkur.php adresine yönlendiriyor. Diyelim ki uygulamanızda oturuma birşeyler kaydettiniz, cookie yazdınız vs, ve kullanıcı http://www.mfyz.com yerine http://mfyz.com adresinden girdiği zaman sizin uygulamanızda kaydedilen oturum veya cookie'ler mfyz.com domaini için yazılıyor. Sonra uygulama içindeki yönlendirme www.mfyz.com altında bir dosyaya yönleniyor. Sonuç olarak oradaki kontrollerde "www.mfyz.com" altındaki çerezler ve oturumda değişkenler arandığı için uygulamanız hiç oturum açılmamış gibi çalışıyor.

Bir başka sorun da flash ve ajax istekler için eğer domain uyuşmaz ise tarayıcıların bu istekleri kabul etmeyeceğidir. Ajax'ta DOM hataları alırsınız (eğer firebug kullnıyorsanız görürsünüz), eğer flash'tan istek yaparsanız cevap alamazsınız çünkü flash önce o domain altındaki crossdomain.xml dosyasından sizin o domaine erişiminiz olup olmadığını denetler. Eğer bu tanımı yapmadıysanız uygulamanız çalışmaz. Aslında www.mfyz.com ile mfyz.com aynı domain ve siteler olmasına rağmen xss gibi güvenlik nedenleri için tarayıcılar tarafından engellenmektedir.

Çözüm, giren kullanıcınızı tek yerde gezdirmektir. Yani önce sitenizi www'lu mu yoksa www'suz mu kullanacağınıza karar verip gelen ziyaretçiyi eğer www'lu ise veya www'suz ise doğru olan yere yönlendirmektir. Ziyaretçi açısından birşey değişmez, hatta hissetmez bile, ama siz uygulama geliştirirken belki haftalarca hatanın kaynağını çözemeyeceğiniz bir problemle uğraşıyor olabilirsiniz.

PHP ile bu yönlendirmeyi yapmak için aşağıdaki kodu kullanabilirsiniz.

```php
// subdomain redirection
if( substr($_SERVER[HTTP_HOST], 0, 3) != 'www' ){
    die('<script type="text/javascript" charset="utf-8"> window.top.location = "http://www.mfyz.com'. $_SERVER[REQUEST_URI] .'"; </script>');
}

```

Bu kod http://mfyz.com şeklinde gelen kullanıcıyı http://www.mfyz.com altındaki gideceği yere yönlendirir. Yani site her zaman www'lu çalışır. Bunun tersini yani www'suz çalışmak istiyorsanız (mfyz.com'da olduğu gibi) aşağıdaki versiyonu kullanabilirsiniz.

```php
// subdomain redirection
if( substr($_SERVER[HTTP_HOST], 0, 3) == 'www' ){
    die('<script type="text/javascript" charset="utf-8"> window.top.location = "http://mfyz.com'. $_SERVER[REQUEST_URI] .'"; </script>');
}

```

Bu teknik aynı zamanda domain'in markalaşması konusunda da psikolojik açıdan bir alışkanlık oluşturma konusundaki ince bir detaydır.