---
title: "Tüm önyüz PHPTAL'e taşındı"
slug: tum-onyuz-phptale-tasindi
date: 2011-07-27
url: http://mfyz.com/tr/tum-onyuz-phptale-tasindi/
tags: ["front-end","mfyz.com","mvc","phptal","views"]
category: mfyz.com
migration: {"wpId":276,"wpPostDate":"2011-07-27T04:17:59.000Z"}
lang: tr
---

Bir ay oncesinde siteyi duzeltme calismalarina girmistim biliyorsunuz, su an yapilan sey varolan koddan PEAR'i cikarip basit bir MVC yapisina sokmak. Baslangic olarak yaptigim sey tum on yuzu viewlara donusturup bir yandan controllerlar icin altyapi hazirlamakti ve son deployment ile bitirdim bu kismi. Su an tum site PHPTAL template yapisiyla PHPTAL motoru ustunde render ediliyor. Tabi ki gorsel hicbir farklilik yok kullanici acisindan fakat cok daha kolay yonetilebilir hale gelmis durumda onyuz.

Sirada eski modulleri kontrollere cevirmek var. Tabi bunu yaparken muhtemelen modellerimi de olusturmaya baslayacagim yavastan. Cunku kontroller duzgun bir dizin yapisina kavustuktan sonra modelleri duzeltmem adma etmem gerekecek. Tabi son asamada da veritabani manipulasyonu var, ki modeller bittikten sonra bunu yapmak cok kolaylasacak.

Sonuc olarak phptal template motorunu incelemenizi tavsiye ederim. Kesinlikle valid xhtml sintaksi yazmaya zorluyor programciyi, aksi halde sadece hata ciktilari alirsiniz. Sonda ortaya cikan htmller ise php kodu bulunmayan, tertemiz xml dokumanlari oluyor.

[http://phptal.org/](http://phptal.org/)