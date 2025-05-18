---
title: "PHP'de tarih karşılaştırma"
slug: phpde-tarih-karsilastirma
date: 2012-04-27
url: http://mfyz.com/tr/phpde-tarih-karsilastirma/
tags: ["date","diff","php","sql","strtotime"]
category: PHP
migration: {"wpId":162,"wpPostDate":"2012-04-27T20:22:41.000Z"}
lang: tr
---

Bir web uygulaması/sitesi geliştiriyorsanız verilerinizin eklenme, güncellenme tarihleri genelde uygulamanın işleyişinde büyük rol oynar.

Örnek bir senaryo olarak, bir günlük sitesi hazırladınız ve günlükte görünen yazılarınızın son güncellenme tarihlerine göre son güncellenen yazıları listelemek isteyebilirsiniz. Veya bir e-ticaret sitesinde ürünleri belirli günlerde yayına çıkarmak istiyorsunuz ama bütün ürünleri her gün tek tek ekleyememeceğinize göre her ürünün yayına çıkış tarihini ayarlamak isteyebilirsiniz. Bunun gibi bir çok örnek bulabilirsiniz verilerin tarihleri üzerinden işlem yapmak isteyeceğiniz.

Yani aslında tarihlerle çalışmak bu ısın her noktasında. Dolayısıyla tarih eşleştirmeleri yapmak veya iki tarih/zaman arasındaki farkı bulmak gibi birçok is yapıyor olacaksınız yukarıdaki veya benzer senaryoları kodlarken. Size bu dökümanda php ile tarih eşlestirmesi yapmayı göstereceğim.

Benzer şekilde tarih karşılaştırmasını mysql'de yapmak için yakında başka bir yazı yayınlayacağım.

Tarih karşılaştırması denince akla çok basit örnekler gelebilir, örneğin X tarihi Y'den önce mi sonra mi? gibi, bunu string karşılaştırması yaparak da yapabilirsiniz. MySQL'de sürekli gördüğünüz "Y-m-d H:i:s" formatı aslında tam olarak bu ihtiyacı karşılayabılır, Yani o tarih formatları string'e de çevrilse string karşılaştırmasında tarihsel sırayı doğru yansıtacaktır.
```
if ("2012-05-05" < "2012-05-10") print 'önce';

```
Ama tarih karşılaştırmaları her zaman böyle once/sonra karşılaştırması değil, 1 haftadan önce mi? veya son 1 aylık veriler... gibi daha karışık örneklere dönebilir. Böyle karışık tarih karşılaştırmaları eğer sihirli fonksiyonlar kullanılmazsa baş ağrısı olabilecek bir konu, çünkü tarihler arasındaki farklar sadece saat dakika saniye gibi matematiksel hesaplarla hesaplanması kısa kodlarla yapılacak bir şey değil. Tabi ki yapılabilir fakat tek satırda ya da tek fonksiyon ile bunu yapmak varken anlamsız. 1 ay öncesi demek her zaman son 30 gün demek değildir mesela. Veya Geçen hafta Pazartesi'yi hesaplamak kolay değildir.

Bu tarz karışık karşılaştırmalar için php'de her zaman kullandığım bir fonksiyon olan strtotime() fonksiyonunu tarih karşılaştırması yapmak için de kullanırım. Örnegin X tarihinin 3 günden önce olup olmadigini:
```
if (strtotime($X) < strtotime('-3 days')) print 'eski';

```
veya "3 days ago" stringini matematiksel tarih değeri yani timestamp'e çevirerek karşılastırabiliriz. Farkettiyseniz $X değişkenini de strtotime fonksiyonundan geçiriyorum çünkü o da string değeri olduğunu varsayıyorum. Strtotime fonksiyonunun güzel yanı, herhangi bir tarih formatını timestamp'e çevirebiliyor olması. Yani amerikan tarih formatı da yazsanız, bizim kullandığımız formatta da yazsanız php'nin bunu çeviriyor olması. Bundan daha değerli olarak gördüğüm, söylem olarak kullandığımız tarihleri de (2 gün önce, 1 saat sonra, geçen cumartesi, önümüzdeki pazar saat 2) gibi stringleri de doğru olarak timestamp'e çevirebiliyor olması. Bunu kullanarak istediğiniz tarih karşılaştırmasını yapabilirsiniz.

Mesela daha karışık bir örnek olarak:
```
if (strtotime('last monday 1pm') < strtotime($post_date)) print 'yayinda';

```
Bu ufak kontrolle, bütün hafta yazdığınız yazıları bir sonraki hafta pazartesi öğlen 1'de herkese görünür hale getirir. Kontrol'de su anki tarihe göre bir önceki haftanın pazartesi saat öğlen 1'in zaman değeri ile yazıların tarihlerini kıyaslıyoruz. Örnek veriyorum Bugün salı ve siz bi yazı yazdınız, o tarih değeri o haftanın pazartesisinden küçük olmadığı için yukarıdaki kodda if'in içindeki ilk tarih bir sonraki pazartesiye kadar değişmeyecektir. Bir sonraki pazartesi saat 1'de o anın tarihine dönüşeceği için bu salı günü yazdığınız yazı görünür hale gelecektir.