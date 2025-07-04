---
title: "Web sayfalarinda yapabileceginiz basit birkac guvenlik onlemi"
description: "Web siteleri için temel güvenlik önlemleri: HTTPS/SSL kullanımı, eklenti riskleri ve kullanıcı verilerini koruma yöntemleri üzerine basit ipuçları."
slug: web-sayfalarinda-yapabileceginiz-basit-birkac-guvenlik-onlemi
date: 2013-04-14
url: http://mfyz.com/tr/web-sayfalarinda-yapabileceginiz-basit-birkac-guvenlik-onlemi/
tags: ["web güvenliği", "https", "ssl", "veri güvenliği", "güvenlik açıkları"]
category: 
migration: {"wpId":357,"wpPostDate":"2013-04-14T22:58:43.000Z"}
lang: tr
---

Basit bir site hazirladiniz, uyelik, kayit, giris, cikis gibi ana seyleri de yazdiniz.

Kullaniciniz bir starbucks'a oturuyor ve wifi'nin keyfini cikardigini dusunrken sitenizde giris yapiyor. Kafede oturan baska bir arkadas da wifi'daki aktiviteyi tariyor ayni network'e bagli olduklari icin. Ozel bir gayret gostermeden kullanicinizin eposta adresi ve sifresini belki istemeden otomatik bir yazilimla yakaliyor.

Kullanicilarin genellikle ayni sifreler kullandigini goz onunde bulundurursak hacker arkadas eposta adresi ve sifreyi birkac sosyal networkde deneyerek kullanicinizin diger sitelerdeki uyeliklerini ele geciriyor.

Bu senaryo o kadar cok olan bir senaryo ki, akliniza gelebilecek tum paylasimli hatta ozel aglarda bile oluyor. Tabi ki yapabileceginiz basit onlemler var.

Bunlarin basinda domaininizi https yani SSL protokolu ustunden sunmak. Hatta http protokolunu zorunlu olarak https'e de yonlendirebilirsiniz bunu engellemek icin. Buyuk olcude trafiginizi gizleyecek ve genel bir guvenlik katmani olusturacaktir bu.

Bunun disinda, sitenize kurdugunuz eklentiler, sosyal medya butonlari, wordpress eklentileri gibi bir ton seyden dolayi aslinda sadece kullanici seviyesinde degil disa bagimli oldugunuz servislerden de zayif duruma dusuyorsunuz. Cunku kullandiginiz bir eklentinin hacklenmesi sizi de avlanabilir hale getiriyor. Veya kullanicinin bilgisayarinda tarayicisina yerlesmis bir eklenti de kullanici girdilerini trafigi kontrol ederek yakalayabilir.

SSL protokolu sunma ihtimaliniz olmasa bile, tek tarafli donusum yaptiginiz kullanici girdilerini kodlayarak sunucunuza iletebilirsiniz. Mesela acik, okunabilir sifreler yerine formunuzu post etmeden once md5 donusumunu yaparak gonderin. Tabi ki bunlar mukemmel onlemler degil fakat kullaniciniz ile sunucu arasindaki trafigi ne kadar gizleyebilir veya dokunulmaz hale getirirseniz, baskalarinin ayni istekleri tekrarlayabilmelerini veya degistirerek sisteminize kullaniciniz adina ulasmasini engelleyebilirsiniz.

Bu konuda daha spesifik yazilar yazmaya calisacagim ilerleyen aylarda.