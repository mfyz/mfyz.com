---
title: "Girilen iki sayının OBEB'ini bulan program"
slug: girilen-iki-sayinin-obebini-bulan-program
date: 2004-11-08
url: http://mfyz.com/tr/girilen-iki-sayinin-obebini-bulan-program/
tags: ["Basic","obeb","örnek kod"]
category: Basic
migration: {"wpId":48,"wpPostDate":"2004-11-08T08:22:49.000Z"}
lang: tr
---

```
CLS
 PRINT "GIRILEN IKI SAYININ OBEBINI BULAN PROGRAM"
 INPUT "BIRINCI SAYI = ", N
 INPUT "IKINCI SAYI = ", M
 IF N < M THEN
  YEDEK = N
  N = M
  M = YEDEK
 END IF

KALANBUL:
 C = N - INT(N / M) * M
 IF C = 0 THEN
  PRINT "OBEB = ", M
  END
 END IF
 N = M
 M = C
 GOTO KALANBUL

```

### Örnek Çıktı:

```
GIRILEN IKI SAYININ OBEBINI BULAN PROGRAM
BIRINCI SAYI = 126
IKINCI SAYI = 34
OBEB = 2

```