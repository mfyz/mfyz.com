---
title: "PHPStorm bu güne kadarki en eli yüzü düzgün PHP IDEsi"
slug: phpstorm-bu-gune-kadarki-en-eli-yuzu-duzgun-php-idesi
date: 2012-12-04
url: http://mfyz.com/tr/phpstorm-bu-gune-kadarki-en-eli-yuzu-duzgun-php-idesi/
tags: ["css","deployment","editor","git","html","ide","jetbrains","less","php","phpstorm","svn","tdd","version control"]
category: PHP
migration: {"wpId":324,"wpPostDate":"2012-12-04T11:12:18.000Z"}
lang: tr
---

![](/images/archive/tr/2012/12/PHP-Framework-Wars-How-PHPStorm-is-doing-768x337.jpg)

Çıktığından itibaren kullanmaya başladığım ve son 3 yıldır tüm web geliştirme işlerimi PHPStorm IDEsini kullanıyorum.

Java tabanlı NetBeans'i modifiye ederek bir IDE (Integrated Development Environment) yani Entegre Geliştirme Ortamı oluşturdular.

PHP'de en büyük problem entegre bir geliştirme ortamı olmaması. Yani derleyiciyle iyi konuşan, iyi bir hata yakalama, test ortamı veya kod ve yazım zekası na sahip bir editör bulmak çok kolay değil. Bunları, kullandığınız işletim sistemine uygun ayrı ayrı araçlarla sağlayabiliyorsunuz tabii ki, fakat entegre şekilde çalışmalarını sağlamak çok da kolay değil.

PHPStorm ilk çıktığında minimal bir konfigürasyon sunarak kod yazım zekası ile bazı temel yazılım geliştirme araçlarını sunuyordu fakat çok hızlı bir şekilde birçok modern web geliştirme dilini (less, sass, haml) ve birçok uygulama geliştirme çatısını destekler hale geldi. Minimal ayarlarla gelişmiş bir editörden ek farkı yok fakat aşağıda kısaca sıraladığım entegre araçları aktif hale getirildiğinde gerçekten çok güçlü bir geliştirme ortamına dönüştürebiliyorsunuz. İşte benim çok sık kullandığım ve sizin de yüksek ihtimalle işinize yarayacak bazı özellikler ve araçlar.

**Gelişmiş kod yazım zekası** sadece php'de değil php tabanlı bir web projesinde kullanabileceğiniz olası tüm kodları (html, javascript, css, xml) geliştirmek için kullanabilirsiniz. Ek olarak bu altyapılardaki tüm popüler uygulama çatılarını (framework) kod yazım zekasında kullanılabilir şekilde bulabilirsiniz.

**Eş zamanlı hata yakalama**, xdebug ile çalışan web uygulamanızı editörünüzle entegre ederek eş zamanlı uygulama analizi yapıp hata yakalayabilirsiniz.

**Versiyon kontrol sistemi entegrasyonu** ile kodunuzu subversion, git gibi depolardan indirip yönetebilirsiniz.

**Veritabanı bağlantılarınızı** sadece editörünüzden veritabanınıza erişmek için değil kodunuzda yazdığınız SQL'leri kodu yazarken çalıştırıp test edebilir, SQL geliştirirken kod yazım zekası kullanabilirsiniz.

Bunların dışında otomatik yayınlama (deployment), otomatik ftp yüklemesi, zen coding, kod template'leri vs vs gibi bir ton diğer özelliği var. 3 yılda 6 ana sürüm çıkartarak çok kararlı ve güçlü bir php geliştirme ortamı sunuyor jetbrains. Malesef paralı olan ide diğer profesyonel idelere göre çok ucuz, ilk aldığınızda 100 dolar sonasında her yıl ana sürüm güncellemelerini almak için 50 dolar ödemek zorundasınız fakat yaptığınız yatırımı kesinlikle karşılıyor.

Jetbrains PHPStorm'daki birçok aracı Ruby, Python için geliştirdikleri IDE'ler için de sunuyor. Eğer Python veya Ruby yazıyorsanız kesinlikle PyCharm ve RubyMine'a göz atmanızı tavsiye ederim.

PHPStorm'un sayfası için: [http://www.jetbrains.com/phpstorm/](http://www.jetbrains.com/phpstorm/)