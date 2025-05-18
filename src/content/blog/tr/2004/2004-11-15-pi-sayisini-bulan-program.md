---
title: "PI sayısını bulan program"
slug: pi-sayisini-bulan-program
date: 2004-11-15
url: http://mfyz.com/tr/pi-sayisini-bulan-program/
tags: ["Basic","örnek kod","pi"]
category: Basic
migration: {"wpId":55,"wpPostDate":"2004-11-15T08:33:47.000Z"}
lang: tr
---

```
CLS
 PRINT "PI SAYISINI BULAN PROGRAM"
 RANDOMIZE INT(TIMER / 3)
 S = 0
 N = 0

DONGU:
 X = RND
 Y = RND
 N = N + 1
 IF X * X + Y * Y > 1 THEN GOTO DONGU
 S = S + 1
 PRINT N, S, S / N * 4
 GOTO DONGU

```

Örnke çıktı yok; çünkü program kısır bir döngüden oluşuyor. Sadece gözlemek amaçlı yani... Programı çalıştırdığınızda sonsuza kadar ekrana sayılar yazdırır. Durdurmak için CTL+C'yi Kulanın.