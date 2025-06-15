---
title: "JavaScript ile Daha Şık Uyarı Kutuları (Fancy Alert)"
slug: javascript-alert-fancy
date: 2012-09-20
description: "Standart JavaScript alert() fonksiyonunun kısıtlamalarına alternatif olarak, jQuery ve Fancybox eklentisi kullanarak nasıl daha zengin içerikli, HTML destekli ve özelleştirilebilir uyarı (alert) kutuları oluşturulabileceği anlatılıyor."
url: http://mfyz.com/tr/javascript-alert-fancy/
tags: ["JavaScript", "jQuery", "Fancybox", "Alert Kutusu", "Modal Pencere", "Lightbox", "Kullanıcı Arayüzü", "Web Geliştirme", "Plugin"]
category: Arayüz Programlama
migration: {"wpId":317,"wpPostDate":"2012-09-20T01:35:45.000Z"}
lang: tr
---

Javascript alert'in tarayıcılara göre farklı pencere şekillerinde çizdirildiğini biliyorsunuz. Sadece farklı pencere şekilleri değil aynı zamanda içinde sistem fontu kullanılması, pencere başlığına veya onay tuşunda yazan yazıya müdahale edilememesi veya sayfanın çalışmasını durdurması gibi engelleri olduğunu zaten biliyorsunuz.

Şimdi gelelim çok basit bir kullanımıyla
```js
alert('Mesajınız başarıyla iletildi. En kısa sürede cevaplamaya çalışacağım.');
```
şeklinde ürettiğiniz onay/hata/mesaj kutusunu

![](/images/archive/tr/2012/09/jsalert.gif)

çok benzer kullanımla
```js
alertf('<h3>Mesajiniz başarıyla iletildi.</h3>\nEn kısa sürede cevaplamaya çalışacağım.\nBu sırada <a href=""/blog"">blogumu</a> inceleyebilirsiniz.');
```
şeklinde kullanabileceğiniz daha zengin içeriğe sahip bir kutuya çevirmeye.

![](/images/archive/tr/2012/09/jsalertf.gif)

#### Gereksinimler

Projenizde jQuery kullandığınızı varsayıyorum. jQuery ile kullanabileceğiniz hatta belki halihazırda kullanmakta olduğunuz lightbox kütüphanesi olan fancybox'u kullanarak basit bir javascript alert fonksiyonu hazırlayacağız. fancybox yerine kendi lightbox kütüphanenizi veya jquery dışında kullandığınız framework'ü de kullanabilirsiniz. Aşağıda kodu doğrudan vererek açıklayacağım.
```js
function alertf(html){
    if (arguments[1]) closehref = arguments[1];
    else closehref = 'javascript:$.fancybox.close();';
    contentHTML  = '<div style="text-align:center; font-size: 18px; min-width: 200px; margin: 20px 40px;">'+ html +'</div>';
    contentHTML += '<div style="text-align:center;"><a href="' + closehref + '" class="button">Tamam</a></div>';
    $.fancybox({
        content: contentHTML
    });
}

```
Hem alert fonksiyonuna yakın olması hem de "alert fancy" yani süslü/havalı mesaj kutusu anlamına geldiği için de "alerf" adında bir fonksiyon yazarak, zorunlu tek parametre tanımlayacağız. Zorunlu olan tek ve ilk parametre mesajınızın içeriği olacaktır. Bu parametre HTML de olabilir düz metin de olabilir.

Her lightbox kütüphanesinin, bir şekilde sadece javascript çağrısı yapılarak bir kullanımı vardır. fancybox'un bu şekildeki kullanımı için, basitçe $.fancybox fonksiyonu çağrılıp içeriği "content" parametresiyle belirtiyoruz.
```js
$.fancybox({
    content:"Merhaba dostlar"
});

```
alertf fonksiyonunda aslında basitçe içinde mesaj ve buton olan bir lightbox kutusu çizdiriyoruz. "button" sınıfıyla da link olarak tanımlanan elementi buton görüntüsüne çeviriyoruz. Bunun için herhangi bir css buton stili yeterli olacaktır. Mesaji çevreleyen div'i, stillerini, butonu temsil eden linki ve onu çevreleyen div'i ve stillerini javascript fonksiyonumuzda string olarak kodluyoruz. Sonrasında zaten fancybox ile ekrana çizdirmek kalıyor.

Fonksiyonun ilk satırlarında dikkatinizi çekeceği üzere, basit bir kontrolle, bu fonksiyon cağırıldığında ikinci bir parametre belirlenip belirlenmediğini kontrol ediyoruz. Bunun nedeni ise, tek buton olan "Tamam" butonuna basıldığında yapılacak aksiyonu değişitebilme kabiliyeti eklemek. Bir çok noktada ihtiyacınız olabilecek olan bu özellik, bir mesaj kutusu çizdirdiğinizde butona basıldığında başka bir sayfaya yönlendirme veya kutuyu kapatmak yerine başka bir javascript cağrısı yapmak gibi şeyler yapmanızı sağlayacak. Bunu da alertf fonksiyonunun ikinci parametresini kullanarak yapabileceksiniz.

Örneğin
```js
alertf('<h3>Mesajiniz başarıyla iletildi.</h3>', 'tesekkurler.html');

```
kullanımı, "Tamam" butonuna basıldığında kullanıcıyı tesekkurler.html sayfasına yönlendirecektir.

Bu methodla normal alert fonksiyonu yerine alertf fonksiyonunu kullanarak çok daha zengin bir mesaj kutusu çizdirebilirsiniz. Bu noktadan sonra projenizdeki tüm alert çağrılarınızda fonksiyon adına f eklemeniz, javascript kutularını havalı hale getirmeye yeterli olacaktır.