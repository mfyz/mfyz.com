---
title: "Fibonacci dizisini hesaplayan program"
slug: fibonacci-dizisini-hesaplayan-program
date: 2004-11-12
description: "QBasic dilinde yazılmış, Fibonacci dizisinin istenen sayıda elemanını hesaplayan ve ekrana yazdıran bir program. Bu örnek, özyinelemeli ve iteratif algoritmaların temel bir örneğidir."
url: http://mfyz.com/tr/fibonacci-dizisini-hesaplayan-program/
tags: ["Basic", "QBasic", "fibonacci", "dizi", "örnek kod", "programlama", "algoritma", "matematik"]
category: Basic
migration: {"wpId":52,"wpPostDate":"2004-11-12T08:29:53.000Z"}
lang: tr
---

```
CLS
 PRINT "FIBONACCI DIZISININ GIRILEN SAYI KADAR ELEMANINI BULAN PROGRAM"
 INPUT "KAC TANE ELEMAN HESAPLANACAK:"; ELEMAN
 XX0 = 1
 XX1 = 1
 COU = 2

ISLEM:
 XX2 = XX1 + XX0
 COU = COU + 1
 PRINT COU; ".CI ELEMAN"; XX2
 IF COU = ELEMAN THEN END
 XX0 = XX1
 XX1 = XX2
 GOTO ISLEM

```

### Örnek Çıktı :

```
FIBONACCI DIZISININ GIRILEN SAYI KADAR ELEMANINI BULAN PROGRAM
KAC TANE ELEMAN HESAPLANACAK:? 10
3 .CI ELEMAN 2
4 .CI ELEMAN 3
5 .CI ELEMAN 5
6 .CI ELEMAN 8
7 .CI ELEMAN 13
8 .CI ELEMAN 21
9 .CI ELEMAN 34
10 .CI ELEMAN 55

```