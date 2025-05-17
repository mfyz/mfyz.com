---
title: "Konsolda joker karakterlerin kullanımı"
slug: konsolda-joker-karakterlerin-kullanimi
date: 2004-12-02
url: http://mfyz.com/tr/konsolda-joker-karakterlerin-kullanimi/
tags: ["joker","konsol","OS","terminal"]
category: OS
migration: {"wpId":65,"wpPostDate":"2004-12-02T16:31:41.000Z"}
lang: tr
---

Konsolda çok dosya ile çalışırken joker karakterleri kullanarak daha spesifik tanımlar yapabiliriz. Mesela binlerce dosya olan bir klasörde ulaşmak istediğimiz dosya gurubunu joker karakterlerle daha rahat ifade edebiliriz. Ya da dosyaları guruplamak için kullanabiliriz. Bu konuda kısa bir örnek uygulama söylemek gerekirse çok çeşitli dosyanın olduğu büyük bir klasörde dosyaları alfabetik ayıklama işlemi joker karakterler kullanmadan veya herhangi bir GUI program kullanarak halletmek oldukça zorlayıcı olacaktır. Gelelim joker karakterlere ve kullanımlarına; \* Bir veya daha fazla karakteri ifade eder. tty\* -> tty ile başlayan tüm dosyalar dosya0\*.x\* -> dosya0 ile başlayan, uzantısının ilk harfi x olan tüm dosyalar ? Tek bir karakteri ifade eder. program.? -> program ile başlayan ve uzantısı tek karakter olan tüm dosyalar. \[ \] Parantezin içerisinde kalan karakterler veya aralığı ifade eder. dosya\[0-9\] -> dosya0, dosya1, dosya2 ... dosya9 sozluk\_\[a-z\].txt -> sozluk\_a.txt, sozluk\_b.txt ... sozluk\_z.txt Aşağıda bu konuda örnek kullanım bulacaksınız.
```
$ ls
01t  02t  03t  04t    ayse  faik   fatma   mehmet
01x  02x  03x  ahmet  emre  fatih  mahmut

$ ls 0\*
01t 01x 02t 02x 03t 03x 04t

$ ls 0?t
01t 02t 03t 04t

$ ls 0\[0-2\]?
01t 01x 02t 02x

$ ls \*met
ahmet mehmet

```