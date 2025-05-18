---
title: "Faktöriyel hesaplayan program"
slug: faktoriyel-hesaplayan-program
date: 2004-11-13
url: http://mfyz.com/tr/faktoriyel-hesaplayan-program/
tags: ["Basic","faktöriyel","örnek kod"]
category: Basic
migration: {"wpId":53,"wpPostDate":"2004-11-13T08:31:35.000Z"}
lang: tr
---

```
CLS
 PRINT "GIRILEN SAYININ FAKTORIYELINI HESAPLAYAN PROGRAM"
 INPUT "SAYI = ", N
 I = 0
 T = 1

ISLEM:
 I = I + 1
 T = T * I
 IF I = N THEN
  PRINT N, " FAKTORIYEL = ", T
  END
 END IF
 GOTO ISLEM

```

### Örnek Çıktı :

```
GIRILEN SAYININ FAKTORIYELINI HESAPLAYAN PROGRAM
SAYI = 6
6 FAKTORIYEL = 720

```