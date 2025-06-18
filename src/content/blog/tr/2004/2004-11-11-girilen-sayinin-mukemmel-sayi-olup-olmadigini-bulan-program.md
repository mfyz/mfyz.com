---
title: "Girilen sayının mükemmel sayı olup olmadığını bulan program"
slug: girilen-sayinin-mukemmel-sayi-olup-olmadigini-bulan-program
date: 2004-11-11
description: "QBasic'te yazılmış, girilen bir sayının mükemmel sayı (kendisi hariç pozitif bölenlerinin toplamı kendisine eşit olan sayı) olup olmadığını bulan bir program. Bu örnek, temel matematiksel algoritmaların programlamaya nasıl aktarıldığını gösterir."
url: http://mfyz.com/tr/girilen-sayinin-mukemmel-sayi-olup-olmadigini-bulan-program/
tags: ["Basic", "QBasic", "mükemmel sayı", "örnek kod", "programlama", "algoritma", "matematik"]
category: Basic
migration: {"wpId":51,"wpPostDate":"2004-11-11T08:28:41.000Z"}
lang: tr
---

```
CLS
 PRINT "GIRILEN SAYININ MUKEMMEL SAYI OLUP OLMADIGINI BULAN PROGRAM"
 F = 0
 INPUT " SAYI ="; N
 FOR I = 2 TO N
  K = N / I
  IF K = INT(K) THEN
   F = F + K
  END IF
 NEXT I
 IF F = N THEN
  PRINT " MUKEMMEL SAYI"
 ELSE
  PRINT "MUKEMMEL SAYI DEGIL"
 END IF

```

### Örnek Çıktı :

```
GIRILEN SAYININ MUKEMMEL SAYI OLUP OLMADIGINI BULAN PROGRAM
SAYI =? 50
MUKEMMEL SAYI DEGIL

```