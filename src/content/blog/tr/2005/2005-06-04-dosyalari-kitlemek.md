---
title: "Dosyaları Kilitlemek"
slug: dosyalari-kitlemek
date: 2005-06-04
description: "PHP'de `flock()` fonksiyonu kullanarak dosya kilitleme yöntemlerini öğrenin. Web sunucularında eş zamanlı dosya erişimlerinde veri bozulmalarını önlemek için paylaşımlı ve özel kilitlerin nasıl kullanılacağı açıklanıyor."
url: http://mfyz.com/tr/dosyalari-kitlemek/
tags: ["PHP", "dosya kilitleme", "flock", "dosya işlemleri", "veri bütünlüğü", "eşzamanlılık", "Sunucu Programlama", "LOCK_EX", "LOCK_SH", "LOCK_UN"]
category: PHP
migration: {"wpId":78,"wpPostDate":"2005-06-04T06:50:07.000Z"}
lang: tr
---

#### Dosyaları kitlemek ne demektir?

Bir dosyayı kitlemek dosya üzerinde o anda başka işlemciler tarafından işlem yapılmasını engellemektir.

#### Dosyaları niye kitleyeyim?

Web sunucuları aynı anda çok fazla işlemi yapabilmeleri ile sunucu özelliğini kazanır. Bir siteye tek kullanıcı girmez. Aynı anda birden çok kullanıcı aynı işlemi yapmaya çalışıyor olabilir. Her nekadar işlemleriniz php tarafından fişek hızında ilerletilse de aynı zamanlama ile birden çok uygulama tek bir dosya üzerinde işlem yapmak isteyebilir. Bu durumlarda veri okuma / yazma sorunları doğacak ve dosyalar bozulabilecektir. Bunu engellemek için çalıştığımız dosyayı kitleriz.

#### Nasıl?

Küçük bir dosya işlemi kodu örneği göz önüne getirelim.
```php
$yazilacak_bilgi = 'dosya içerisine yazılacak şey
2. satir,
3. satir.';

// dosyayi acalim
$dosya = fopen("dosya.txt","r");

// kitleyelim
flock($dosya,2);

// yazalim
fwrite($dosya,$yazilacak_bilgi);

// kilidi acalim
flock($dosya,3);

// dosya baglantisini kapatalim
fclose($dosya);
```

`flock()` fonksiyonu ile bu işlemi yapabiliyoruz.

**flock fonksiyonunda kullanabileceğimiz parametreler şunlar :** 
1. Paylaşım, Diğer proseslerin dosyayı paylaşmalarına imkan verir. 
2. Tam, Diğer işlemlerin dosya ile işlem yapmasına engel olur . 
3. Serbest, Dosyanın 1 veya 2 olan kilidini kaldırır.

Kitlenmiş bir dosya üzerinde başka bir işlemci, daha önceki kilide öncelik tanır ve işlemi engeller.