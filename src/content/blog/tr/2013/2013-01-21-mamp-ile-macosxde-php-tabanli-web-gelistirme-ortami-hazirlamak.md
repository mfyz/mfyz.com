---
title: "MAMP ile MacOSX'de PHP tabanlı web geliştirme ortamı hazırlamak"
description: "MacOSX üzerinde PHP ile web geliştirme yapmak için MAMP kullanarak Apache, MySQL ve PHP ortamını nasıl hızlıca kurabileceğinizi öğrenin. MAMP ve MAMP PRO'nun özelliklerine ve ipuçlarına değiniliyor."
slug: mamp-ile-macosxde-php-tabanli-web-gelistirme-ortami-hazirlamak
date: 2013-01-21
url: http://mfyz.com/tr/mamp-ile-macosxde-php-tabanli-web-gelistirme-ortami-hazirlamak/
tags: ["mamp", "macosx", "php", "apache", "mysql", "web geliştirme"]
category: PHP
migration: {"wpId":342,"wpPostDate":"2013-01-21T06:00:00.000Z"}
lang: tr
---

MacOSX üzerinde php ile geliştirme yapmak istiyorsanız ilk yapmanız gereken şey geliştirme ortamınızı hazırlamak olacaktır.

MacOSX üzerinde halihazırda kurulu bir apache ve php sürümü bulunuyor zaten. Bunları basitçe aktif hale getirebilir ve geri kalan ayarları elle yapmak isteyebilirsiniz fakat macosx ile yüklü gelen php, apache sürümü ve eklentileri, standart ihtiyaçlara bile cevap veremeyebilir. Basit bir wordpress kurulumu bile gd, zip, iconv ve benzeri php eklentilerine ihtiyaç duyacaktır. Dolayısıyla bir noktada php kurulu php sürümünü güncellemeye ihtiyaç duyabilirsiniz. Apache için de durum aynı. Ayrıca sadece eklentiler değil, mysql gibi birkaç sunucu uygulaması da kurmak zorunda kalacaksınız. Bunları tek yerden başlatıp durdurabilmek için de başka araçlar bulmanız veya geliştirmeniz de gerekebilir.

Varolan apache ve php kurlumunu kullanmak dışında en hızlı kurlumu, MAMP (MacOSX Apache MySQL PHP) ile yapabilirsiniz. Bir çok genel eklentiyle beraber universal olarak derlenmiş ve paketlenmiş bir uygulama diyebiliriz MAMP için. MAMP ile birkaç dakika içinde standart bir web geliştirme ortamını ayağa kaldırabilirsiniz.

http://www.mamp.info/ adresinden indirebileceğiniz MAMP, basit bir şekilde kurulabiliyor. Applications klasörünüzde MAMP adında bir klasör içinde herşeyi toplu bir şekilde bulabileceğiniz MAMP, birçok ayar dosyasını da barındırıyor. Dolayısıyla Web root dizininizi kolayca değiştirebilir, php.ini veya my.cnf'i modifiye ederek istediğiniz eklentileri aktifleştirebilir pasifleştirebilirsiniz.

http://www.mamp.info/en/mamp/index.html adresinden MAMP ile beraber gelen tüm kütüphane / eklenti ve sunucu yazılımlarının listesini görebilirsiniz. MAMP'in standart sürümü ücretsiz ve basit bir yönetim arayüzü sunuyor.

![](/images/archive/tr/2013/01/6058742604_e29d36e1d4_z.jpg) Eğer vhost, dns, email sunucusu ayarlarınızı görsel bir arayüzde yönetmek istiyorsanız tek seferlik satın alabileceğiniz bir lisans ile MAMP PRO yani sadece yönetimsel arayüz uygulaması satın alarak varolan MAMP kurulumunuzu kolayca yönetebilirsiniz.

![](/images/archive/tr/2013/01/6058222333_ce2b01cf87_b.jpg) Birkaç ipucu vermem gerekirse, MAMP PRO'da çok göz önünde olmasa da "File > Edit Template > ..." menüsünden php.ini, my.cnf, httpd.conf gibi ayar dosyalarınıza hangi dizinde olduklarını çözmeye gerek kalmadan ulaşabilirsiniz.

Web root klasörünüzü (kullanıyorsanız) Dropbox'unuzda bir dizini belirterek tüm web geliştirme dosyalarınızı ve projelerinizi dropbox'da tutarak anlık yedekleme sağlayabilirsiniz.