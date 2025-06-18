---
title: "N'nin M'li kombinasyonunu bulan program"
slug: nnin-mli-kombinasyonunu-bulan-program
date: 2004-11-16
description: "QBasic dilinde yazılmış, N'nin M'li kombinasyonunu (C(n, m)) hesaplayan bir program. Bu örnek, faktöriyel hesaplamalarını kullanarak kombinatorik bir problemi çözer."
url: http://mfyz.com/tr/nnin-mli-kombinasyonunu-bulan-program/
tags: ["Basic", "QBasic", "kombinasyon", "örnek kod", "programlama", "algoritma", "matematik", "faktöriyel"]
category: Basic
migration: {"wpId":56,"wpPostDate":"2004-11-16T08:34:48.000Z"}
lang: tr
---

```
CLS
 PRINT "N'NIN M'LI KOMBINASYONUNU BULAN PROGRAM"
 INPUT "N = ", N
 INPUT "M = ", M
 IF M > N THEN
  COLOR 15
  PRINT "COZUM YOK"
  END
 END IF
 IF M = N THEN
  COLOR 14
  PRINT "N'NIN M'LI KOMBINASYONU = 1"
  END
 END IF
 I = 0
 S = 1

HESAP:
 I = I + 1
 S = S * I
 IF I = N THEN
  COLOR 15
  PRINT "N FAKTORIYEL = ", S
  GOTO HESAP1
 END IF
 GOTO HESAP

HESAP1:
 K = 0
 L = 1

A1:
 K = K + 1
 L = L * K
 IF K = M THEN
  COLOR 14
  PRINT "M FAKTORIYEL = ", L
  GOTO A5
 END IF
 GOTO A1

A5:
 H = 0
 F = 1

A2:
 H = H + 1
 F = F * H
 IF H = (N - M) THEN
  COLOR 15
  PRINT "N-M FAKTORIYEL = ", S
  GOTO A8
 END IF
 GOTO A2

A8:
 W = S / (L * F)
 COLOR 14
 PRINT "N'NIN M'LI KOMBINASYONU = ", W
 END

```

### Örnek Çıktı :

```
N'NIN M'LI KOMBINASYONUNU BULAN PROGRAM
N = 10
M = 6
N FAKTORIYEL = 3628800
M FAKTORIYEL = 720
N-M FAKTORIYEL = 3628800
N'NIN M'LI KOMBINASYONU = 210

```