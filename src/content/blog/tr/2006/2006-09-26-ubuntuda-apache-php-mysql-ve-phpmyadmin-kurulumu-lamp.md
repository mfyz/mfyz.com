---
title: "Ubuntu'da Apache, Php, MySQL ve PHPMyAdmin kurulumu (LAMP)"
slug: ubuntuda-apache-php-mysql-ve-phpmyadmin-kurulumu-lamp
date: 2006-09-26
url: http://mfyz.com/tr/ubuntuda-apache-php-mysql-ve-phpmyadmin-kurulumu-lamp/
tags: ["apache","kurulum","lamp","OS","php","Sunucu Programlama","ubunt"]
category: OS
migration: {"wpId":94,"wpPostDate":"2006-09-26T03:27:12.000Z"}
lang: tr
---

Bildiğiniz gibi ubuntu debian tabanlı bir işletim sistemi ve apt denilen kesinlikle gördüğüm en mükemmel paket yöneticisi olan bir araca sahiptir. Apt denilen şey sayesinde internetteki çok fazla depodan istemeyeceğiniz kadar pakete karın ağrısız ulaşabilmenizi sağlıyor. Bu aygıtı kullanıp harikalar yaratacağız şimdi. Başlamadan önce paket bilgimizi güncelleyelim;
```
sudo aptitude update

```
İlk olarak normal web yayını yapacak olan Apache'yi kuralım;
```
sudo aptitude install apache2

```
komutu ile apache2 ve buna ilişkin paketleri kurun. Öneri olarak apache'nin varsayılan web yayın klasörünü kullanmayın, benim / dizinimde mfyz adında bütün kişisel dosyalarımı sakladığım bir merkez vardır (hatta ayrı disk bölümü şeklinde kullanırım). Bu dizin içerisinde kendime "www" adında bir dizin oluşturup burayı apache'nin ana yayın dizini olarak ayarlayacağım :
```
sudo vim /etc/apache2/sites-enabled/000-default

```
komutu ile (veya nano ile açabilirsiniz) geçerli yayınlanan domainlere ilişkin bilgilerin tutulduğu dosyayı açalım. Burada varolan yayındaki site ayarları göreceğiz, "/var/www" gördüğümüz 2 yeri değiştiriyoruz, "/mfyz/www" şeklinde ayarladıktan sonra yine önereceğim;
```
Options Indexes FollowSymLinks MultiViews

```
satırındaki **Indexes** kısmını kaldırıyoruz. Bunu yapmamızdaki amaç şudur : Apache eğer bunu yapmazsanız içerisinde index dosyası bulmadığı dizinleri basit bir yapıda listeleyecektir. Bunu kapatmak için burada bulunan "Indexes" kısmını kaldırıyoruz. Artık index olmayan bir dizine bakılmaya çalışıldığında Forbidden hatası verecektir. Dosyayı kaydedip çıkıyoruz. Web sunucusu ve modüllerine ilişkin yaptığımız her değişimde apache servisini yeniden başlatmamız gerekmektedir. Çünkü her başlangıçta o andaki ayar dosyaları hafızaya alınır ve oradan çlaışır servisler, Yeni ayarları uygulamak için :
```
sudo apache2ctl restart

```
veya
```
sudo /etc/init.d/apache2 restart

```
komutlarından birini veriyoruz (ikisi de aynı işi yapar). Şimdi bir web tarayıcısı açıp **http://localhost** yazdığımızda Forbidden hatası alıyorsak apache servisimiz sorunsuz çalışıyor demektir. Eğer /mfyz/www klasörüne bir index.html dosyası koyarsak görünmesi gerekir aynı zamanda. Şimdi php yükleyip apache ile entegre edelim: İsterseniz 4 olan yerleri 5 yaparak php5 kurabilirsiniz. Bu örnekte php4 kuracağım.
```
sudo aptitude install php4 libapache2-mod-php4 php4-gd php4-mysql

```
komutu ile php4, mod-php4, php'ye gd kütüphanesi desteği ve mysql ile entegre çalışabilmesi için php4-mysql paketlerini kurmuş oluyoruz. Kurulumdan sonra php ayarlarımızı yapmak için:
```
sudo vim /etc/php4/apache2/php.ini

```
komutu ile php.ini dosyamızı açıyoruz. Burada önerdiğim birkaç ayarı yapalım :
```
upload\_max\_filesize = 2M

```
satırını 20M şeklinde düzenleyerek en fazla 20mb upload yapılabilir hale getirelim. Bu değişim, büyük veritabanlarını phpmyadmin'e import ederken işimize yarayacak.
```
;default\_charset = "iso-8859-1"

```
satırını buluyoruz ve başındaki ; işaretini kaldırıyoruz (uncomment). Daha sonra utf-8 olarak ayarlıyoruz. **\[Extensions\]** kısmında varolan ;
```
;extension=mysql.so
;extension=gd.so

```
satırlarının başındaki ; işaretlerini kaldırdıktan sonra kaydedip çıkıyoruz. Böylece Türkçe sorunu yaşamadan en fazla 20mb upload edebilir ve mysql/gd destekli bir php desteğine sahip apache edinmiş oluyoruz. Eğer register\_globals kullanıyorsanız bunu açmanız gerekecektir. Varsayılan olarak Off ayarlı olacaktır. **Not :** Yukarıdaki ayarlar dışındakilere dokunmayın, hepsi varsayılan olarak gayet ideal ayarlanmıştır. Şimdi apache'yi yeniden başlatıp deneme yapalım.
```
vim /mfyz/www/index.php

```
komutu ile index.php oluşturalım ve içine
```
<?php phpinfo(); ?>

```
yazıp kaydedip çıkalım. Şimdi bir web tarayıcısı açıp **http://localhost** adresine girin, PHP hakkında çok detaylı bir sayfa görüyorsanız tebrikler şu an php apache sorunsuz çalışıyor. Bu sayfada başlıklara bakarak aşağıya doğru süzülün, gözünüz "mysql" ve "session" başlıklarını görüyorsa devam edebiliriz. Şimdi MySQL kuralım;
```
sudo aptitude install mysql-client-4.1 mysql-server-4.1

```
komutu ile mysql sunucumuzu ve istemcimizi kurmuş oluyoruz. Şimdi mysql root şifresi ayarını geçiyorum çünkü bunu phpmyadmin'den yapacağız. Varsayılan olarak root şifresizdir. Apache'yi tekrar başlatıyoruz tabiki. Sıra geldi phpmyadmin kurulumuna Apt ile kurmanızı önermem çünkü phpmyadmin'i sürekli güncellemeyeceğiz hatta kodda kendimize göre değişiklikler yapacağız. Otomatik kurmak isteyenler ;
```
sudo aptitude install phpmyadmin

```
Elle kurmak isteyenler: [http://www.phpmyadmin.net](http://www.phpmyadmin.net) adresine girip son sürüm paketi indirin. /mfyz/www klasörüne "pma" adında açalım (isteyen phpmyadmin olarak da adlandırabilir klasörü, ben böyle daha pratik olduğunu düşünüyorum). Şimdi ayar dosyasına dokunmadan http://localhost/pma adresine giriyoruz. PhpMyAdmin gayet normal bir şekilde açılıyor karşımıza. Şimdi hiç bi yere tıklamadan anasayfadaki "Privilages" linkine tıklıyoruz (Türkçesinde izinler olarak geçebilir). Burada MySQL kullanıcıları listelenecektir. root'a tıklayıp düzenlenme sayfasındaki şifre kısmında 2 kez girerek formu gönderin. Sayfayı yenileyin, yani http://localhost/pma adresine tekrar girmeye çalışın. Eğer erişim hatası veriyorsa root şifreniz değişmiştir. Şimdi /mfyz/www/pma/libraries dizinindeki config.default.inc.php dosyasını düzenleyerek root şifrenizi ayarlayın. Tekrar http://localhost/pma sayfasına girmeyi deneyin. Eğer giriyorsa artık apache php mysql phpymadmin'iniz sorunsuz kullanılabilir demektir. /mfyz/www klasöründe çalışabilirsiniz. MySQL veritabanı yönetimini A'dan Z'ye phpymadmin ile yapabilirsiniz, Sadece biraz kurcalayın göreceksiniz :) Not: Benzer komutlar ile debian ve debian türevi tüm işletim sistemlerinde bu dörtlüyü kolayca kurabilirsiniz.