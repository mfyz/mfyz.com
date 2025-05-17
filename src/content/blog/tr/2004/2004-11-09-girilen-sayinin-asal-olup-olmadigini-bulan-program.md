---
title: "Girilen sayının asal olup olmadığını bulan program"
slug: girilen-sayinin-asal-olup-olmadigini-bulan-program
date: 2004-11-09
url: http://mfyz.com/tr/girilen-sayinin-asal-olup-olmadigini-bulan-program/
tags: ["asal sayı","Basic","örnek kod"]
category: Basic
migration: {"wpId":49,"wpPostDate":"2004-11-09T08:25:09.000Z"}
lang: tr
---

```
CLS
 PRINT "GIRILEN SAYININ ASAL OLUP OLMADIGINI BULAN PROGRAM"
 INPUT "SAYI = ", N
 IF N < 1 THEN
  PRINT "ASAL DEGIL"
  END
 END IF
 IF N = 1 THEN
  PRINT "ASAL DEGIL"
  END
 END IF
 IF N = 2 THEN
  PRINT "ASAL"
  END
 END IF
 A = 1

ISLEM:
 A = A + 1
 IF (INT(N / A)) \* A = N THEN
  PRINT "ASAL DEGIL"
  END
 END IF
 IF A = (N - 1) THEN
  PRINT "ASAL"
  END
 END IF
 GOTO ISLEM

```

### Örnek Çıktı :

```
GIRILEN SAYININ ASAL OLUP OLMADIGINI BULAN PROGRAM
SAYI = 15
ASAL DEGIL

```