---
title: "6 yüzlü bir zarın atılması deneyinin simülasyonu"
slug: 6-yuzlu-bir-zarin-atilmasi-deneyinin-simulasyonu
date: 2004-11-20
description: "QBasic dilinde, 6 yüzlü bir zarın belirli sayıda atılmasını simüle eden ve her bir yüzün kaç kez geldiğini sayan bir program. Bu örnek, rastgele sayı üretimi ve istatistiksel simülasyonların temellerini gösterir."
url: http://mfyz.com/tr/6-yuzlu-bir-zarin-atilmasi-deneyinin-simulasyonu/
tags: ["Basic", "QBasic", "örnek kod", "simulasyon", "zar", "programlama", "algoritma", "istatistik", "olasılık", "rastgele sayı"]
category: Basic
migration: {"wpId":57,"wpPostDate":"2004-11-20T08:36:29.000Z"}
lang: tr
---

```
CLS
PRINT "6 YUZLU BIR ZARIN ATILMASI VE USTE GELEN NOKTA SAYISININ"
PRINT "GOZLEMI DENEYINDE SONUCLARIN GOZLENMESI"
INPUT "ZARIN ATILMA SAYISI = ", N
Z1 = 0
Z2 = 0
Z3 = 0
Z4 = 0
Z5 = 0
Z6 = 0
FOR I = 1 TO N
X = INT(6 * RND) + 1
IF X = 1 THEN Z1 = Z1 + 1
IF X = 2 THEN Z2 = Z2 + 1
IF X = 3 THEN Z3 = Z3 + 1
IF X = 4 THEN Z4 = Z4 + 1
IF X = 5 THEN Z5 = Z5 + 1
IF X = 6 THEN Z6 = Z6 + 1
COLOR 15
PRINT I, ". ATISTA ", X, " GELDI."
NEXT I
PRINT
COLOR 12
PRINT "1 SAYISI ", Z1; " DEFA GELDI"
PRINT "2 SAYISI ", Z2; " DEFA GELDI"
PRINT "3 SAYISI ", Z3; " DEFA GELDI"
PRINT "4 SAYISI ", Z4; " DEFA GELDI"
PRINT "5 SAYISI ", Z5; " DEFA GELDI"
PRINT "6 SAYISI ", Z6; " DEFA GELDI"

```

### Örnek Çıktı :

```
6 YUZLU BIR ZARIN ATILMASI VE USTE GELEN NOKTA SAYISININ
GOZLEMI DENEYINDE SONUCLARIN GOZLENMESI
ZARIN ATILMA SAYISI = 8
1 . ATISTA 5 GELDI.
2 . ATISTA 4 GELDI.
3 . ATISTA 4 GELDI.
4 . ATISTA 2 GELDI.
5 . ATISTA 2 GELDI.
6 . ATISTA 5 GELDI.
7 . ATISTA 1 GELDI.
8 . ATISTA 5 GELDI.

1 SAYISI 1 DEFA GELDI
2 SAYISI 2 DEFA GELDI
3 SAYISI 0 DEFA GELDI
4 SAYISI 2 DEFA GELDI
5 SAYISI 3 DEFA GELDI
6 SAYISI 0 DEFA GELDI

```