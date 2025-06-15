---
title: "SequelPro: MacOSX kullanıcıları için PHPMyAdmin alternatifi"
description: "MacOSX kullanıcıları için PHPMyAdmin'e alternatif, ücretsiz ve minimalist MySQL yönetim aracı Sequel Pro'nun özellikleri ve avantajları."
slug: sequelpro-macosx-kullanicilari-icin-phpmyadmin-alternatifi
date: 2013-03-30
url: http://mfyz.com/tr/sequelpro-macosx-kullanicilari-icin-phpmyadmin-alternatifi/
tags: ["sequel pro", "mysql", "veritabanı yönetimi", "macosx", "phpmyadmin alternatifi"]
category: OS
migration: {"wpId":347,"wpPostDate":"2013-03-30T17:04:53.000Z"}
lang: tr
---

MacOSX'de php geliştirme ortamı kurmak, diğer işletim sistemlerine göre çok daha kolay. MAMP ile neredeyse tek drag & drop ile apache, php, mysql üçlüsünü çalışır hale getirmek mümkün.

Eğer *AMP kullanan bir web geliştiricisi iseniz muhtemelen tüm veritabanı yönetiminizi phpmyadmin ile yapıyorsunuzdur. PHPMyAdmin kuşkusuz taşınabilir ve esnek yapısıyla istediğiniz gibi özelleştirebileceğiniz bir yönetimsel araç. Fakat bazı noktalarda bazen bir masaüstü aracının sunacağı özellikleri sunamayabiliyor.

Sequel Pro, adından paralı bir yazılım gibi bir çağrışım yapsa da ücretsiz bir yazılım. Basit ve minimalist bir arayüze sahip Sequel Pro'nun kullanımı oldukça kolay.

![](/images/archive/tr/2013/03/1.png)

Birkaç farklı türde bağlantı sağlayabiliyorsunuz veritabanı sunucunuza. Diğer mysql yönetimsel araçlarından farklı olarak ssh üzerinden bağlantı yapabilme özelliği en çok işime yarayan yanlarından biri SequelPro'nun.

Klasik veritabanı yönetimi (yeni veritabanı oluşturma, ayarlarını değiştirme, silme vs) işlemleri zaten olmazsa olmazlardan. Basitçe bağlantı yaptıktan ve veritabanı seçtikten sonra tablolarınızı listeleyebiliyor, tablo yapısını veya içeriğini basit filtreleme fonksiyonlarıyla görebiliyorsunuz.

Her sql yönetim aracı gibi SequelPro'nunda sorgu (query) editörü var. Otomatik tamamlama, çoklu query'leri tek ekranda ister tek tek ister toplu olarak çağırma gibi özellikleri var.

![](/images/archive/tr/2013/03/2.png)

SequelPro ayrıca import ve export özellikleriyle herhangi bir mysqldump çıktısını, sql dosyasını, csv dosyasını işleyip veritabanına aktarabiliyor veya tersini yaparak veritabanını bu formatlarda kaydetmenizi sağlıyor.

SequelPro'ya ilk ihtiyacım olduğunda bu özellik için kullanmaya başlamıştım. Çünkü import aracı dosya boyutları ne olursa olsun sorunsuz bir şekilde çalışıyor. PHPMyAdmin'de bir web uygulaması olduğu için büyük dosyaları import ederken php, apache ayarları gibi bir sürü şeyle uğraşmak zorunda kalmanız mümkün.

![](/images/archive/tr/2013/03/3.png)

Bir diğer ufak özellik de, yaptığınız arayüzsel işlemlerin (mesela tablo yapısıyla oynadınız) hangi SQL'leri çağırdığını görmek istiyorsanız Console (View/Show Console) ekranını açarak çağrılan tüm sorguları görebilir ve kolayca kopyalayarak şema dosyaları oluşturabilirsiniz.

![](/images/archive/tr/2013/03/4.png) Yukarıdaki özellikler oldukça standart özellikler. Yani SequelPro, diğer alternatiflerinden daha üstün özellikler sağlamıyor. Sadece MacOSX kullanıcıları için gayet iyi minimalize edilmiş native arayüzde çalışan bir araç. Eğer kalabalık arayüzlerle uğraşmak istemiyorsanız SequelPro'yu deneyebilirsiniz.

Ücretsiz olan uygulamayı [http://www.sequelpro.com](http://www.sequelpro.com) adresinden inceleyebilir ve indirebilirsiniz.