---
title: "1'den Girilen sayıya kadar olan tamsayıların toplamını bulan program"
slug: 1den-girilen-sayiya-kadar-olan-tamsayilarin-toplamini-bulan-program
date: 2004-11-10
description: "QBasic'te yazılmış, 1'den kullanıcı tarafından girilen sayıya kadar olan tüm tamsayıların toplamını hesaplayan basit bir program. Bu örnek, döngü ve toplama işlemlerini temel düzeyde gösterir."
url: http://mfyz.com/tr/1den-girilen-sayiya-kadar-olan-tamsayilarin-toplamini-bulan-program/
tags: ["Basic", "QBasic", "örnek kod", "programlama", "algoritma", "matematik", "toplama"]
category: Basic
migration: {"wpId":50,"wpPostDate":"2004-11-10T08:27:02.000Z"}
lang: tr
---

```
CLS
 PRINT "1DEN GIRILEN SAYINA KADAR OLAN TAMSAYILARIN TOPLAMINI BULAN PROGRAM"
 INPUT "HANGI SAYIYA KADAR = ", N
 I = 0
 T = 0

ISLEM:
 I = I + 1
 T = T + I
 IF I = N THEN
  PRINT "TOPLAM =", T
  END
 END IF
 GOTO ISLEM

```

### Örnek Çıktı :

```
1DEN GIRILEN SAYINA KADAR OLAN TAMSAYILARIN TOPLAMINI BULNA PROGRAM
HANGI SAYIYA KADAR = 15
TOPLAM = 120

```