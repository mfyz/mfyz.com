---
title: "Grunt nedir? Bir web geliştiricisinin neden görev çalıştırıcısına ihtiyacı var?"
description: "Grunt, bir JavaScript görev çalıştırıcısıdır. Web geliştirme süreçlerinizde LESS/Sass derleme, kod doğrulama, imaj optimizasyonu gibi tekrarlayan görevleri nasıl otomatize edebileceğinizi öğrenin."
slug: grunt-nedir-bir-web-gelistiricisinin-neden-gorev-calistiricisina-ihtiyaci-var
date: 2014-06-26
url: http://mfyz.com/tr/grunt-nedir-bir-web-gelistiricisinin-neden-gorev-calistiricisina-ihtiyaci-var/
tags: ["grunt", "javascript", "task runner", "otomasyon", "web geliştirme", "build araçları"]
category: Arayüz Programlama
migration: {"wpId":360,"wpPostDate":"2014-06-26T19:19:29.000Z"}
lang: tr
---

#### Kısaca Grunt

![](/images/archive/tr/2014/06/grunt-logo.jpg) Grunt bir görev çalıştırıcısı. Web geliştirme sürecinde ihtiyacınız olan operasyonları otomatize etmenize yarayacak bir araç. Daha çok platforma dönüşmüş olan grunt, yüzlerce eklentiyle istediğiniz forma sokabileceğiniz bir yapılandırma aracı. Hızlıca bir örnek vereceğim. Basit bir web sitesi hazırlıyorsunuz ve stillerinizi css yerine less ile yazdınız, javascriptlerinizi cosnole.log debug satırlarıyla ve bir sürü yorum ile yazdınız. Sitenizi her yayına alacagınızda bir toparlama ve paketleme işi yapmanız gerekiyor, lessilerinizi css'lere derlemek, belki cssmin gibi ufaltma operasyonuna sokmak, imajlarınızı sıkıştırmanız, javascriptlerinizi temizleyip küçültmeniz belki birden fazla kaynağı tek dosyada birleştirmeyi isteyeceksiniz. Her değişiklik yaptığınızda bu işlemleri tekrarlamanıza imkan yok. İşte bu noktada grunt devreye giriyor.

#### Grunt ile neler yapabilirsiniz?

Sonu yok çünkü kendi eklentilerinizi yazarak node.js yeteneklerini kullanarak yapamayacağınız şey yok. Ama eklenti veritabanından erişebileceğiniz o kadar çok şey var ki.

*   Less, Scss, Sass vb... herhangi bir css derleme işinizi
*   Kod validasyonu (css, js, html)
*   Imaj optimizasyonu
*   Birden fazla javascript veya css kaynağını birleştirme
*   Css veya javascript sıkıştırma
*   Kodunuzdaki yorumları, debug için geriye kalan artıkları temizleme
*   Kaynak versiyonlama

Daha sayamadığım bir çok operasyonu grunt ile farklı kombinasyonlarda hazırlamanız mümkün.

#### Örnek

Versiyonlamayı denemek için kendime bir örnek kod hazırladım ve github'da paylaştım. Basit bir css javascript projesinde kodumu yayınlamadan önce bütün css ve javascript kaynaklarımı sıkıştırıp adlarını versiyonlamarak yayındaki tüm dosyaların en taze kodu kullanmasını sağlamak için grunt kullandım. Projeye [https://github.com/mfyz/grunt-release-boilerplate](https://github.com/mfyz/grunt-release-boilerplate) adresinden erişebilirsiniz.

Grunt hakkinda daha fazla bilgiye sitesinden erişebilirsiniz: [http://gruntjs.com/](http://gruntjs.com/)