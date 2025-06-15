---
title: "Arayüzsüz tarayıcıları, web ve tarayıcı otomasyonu"
description: "Arayüzsüz (headless) tarayıcılar nedir ve web otomasyonunda nasıl kullanılır? Programatik testler, ekran görüntüsü alma ve arayüz akışlarını otomatikleştirme konularını keşfedin."
slug: arayuzsuz-tarayicilari-web-tarayici-otomasyonu
date: 2018-03-13
url: https://mfyz.com/tr/?p=1431
tags: ["headless browser", "tarayıcı otomasyonu", "yazılım testi", "web geliştirme", "otomasyon"]
category: Arayüz Programlama
migration: {"wpId":1431,"wpPostDate":"2018-03-13T10:00:42.000Z"}
lang: tr
---

![](/images/archive/tr/2018/03/bot-icon-2883144_1280-150x150.png)Size tarayici otomasyonu hakkinda ufak bir bilgi verecegim. Tarayici denince akla web sitelerinde gezmemizi saglayan ekranda, html gosteren bir uygulama geliyor. Cogu tarayici kendine has bir motorla calisiyor arka planda ve ekranimizda sitelerle etkilesime girmemizi sagliyor. Ama aslinda tarayicinin yaptigi is ekranda goruntuleme yapmadan da gizlice yapilabiliyor. Sadece bu isi yapan tarayicilar da mevcut gunumuzde. Bunlara kafasiz (headless'dan cevirme, yani arayuzu olmayan) tarayici deniyor. Genel tuketicini icin anlami olmayan bu konu, programalama ve urun gelistirici kitle tarafindan cok anlamli bir sekilde kullanilabilir durumda.

Ozellikle programatik test ve otomasyon yapma konusunda kafasiz tarayicilari kullanarak bir akisi isletebilirsiniz. Mesela;

*   http://orneksite.com adresini yukle,
*   Sayfa kodlarinin yuklenmesi ve calistirilmasi tamamlandiginda,
*   “Isim” adli alana “Fatih” yazisini gir,
*   “Gonder” adli butona tikla,
*   5 saniye bekle
*   Ekran goruntusu alip kaydet

gibi bir akisi isletebilirsiniz. Ozellikle arayuz testi ve arayuz akislarini tarayici otomasyonu yapmak gelistirme surecinde cok faydali olabilir.

Sadece ekran goruntusu alma islemi icin bile kafasiz tarayicilari kullanan sirketler var. Ekran goruntusu ustunden bile gelistirme surecinizde 100 sayfalik bir web sitesinde hangi sayfalarda bozukluklar oldugunu otomatik olarak tespit edebilirsiniz. Cok yaygin bir ornek olarak, her gelistirme versiyonunda ekran goruntusu alip bir onceki surumle programatik renk karsilastirmasi yapip her sumude sayfalarin yuzde olarak ne kadar degistigini takip edebilirsiniz mesela. Boylece basit bir css hatasi bile yapsaniz nereleri bozdugunuzu kolayca tespit edebilirsiniz.

## Kullanabilecegim arayuzsuz tarayici var mi?

Kafasiz tarayicilardan en bilinenleri Phantom adinda nodejs ile yonetilebilen bir tarayici, Chrome headless adinda chromium projesini baz alan iki projeye bakabilirsiniz.

[https://github.com/dhamaniasad/HeadlessBrowsers](https://github.com/dhamaniasad/HeadlessBrowsers) burada gunumuzdeki tum kafasiz tarayicilari listelemisler.