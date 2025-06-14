---
title: "Girilen dizideki en büyük elemanı bulan program"
slug: girilen-dizideki-en-buyuk-elemani-bulan-program
date: 2004-11-14
description: "QBasic dilinde, kullanıcı tarafından girilen bir sayı dizisindeki en büyük elemanı bulan basit bir program. Bu örnek, dizilerle çalışma ve karşılaştırma algoritmaları için temel bir örnektir."
url: http://mfyz.com/tr/girilen-dizideki-en-buyuk-elemani-bulan-program/
tags: ["Basic", "QBasic", "dizi", "örnek kod", "programlama", "algoritma", "en büyük eleman"]
category: Basic
migration: {"wpId":54,"wpPostDate":"2004-11-14T08:32:59.000Z"}
lang: tr
---

```
CLS
 PRINT "GIRILEN DIZIDEKI EN BUYUK ELEMANI BULAN PROGRAM"
 INPUT "DIZININ BOYUTU = "; N
 DIM X(N)
 FOR I = 1 TO N
  INPUT X(I)
 NEXT I
 EB = X(1)
 FOR I = 1 TO N
  IF EB < X(I) THEN EB = X(I)
 NEXT I
 PRINT "DIZININ EN BUYUK ELEMANI = "; EB

```

### Örnek Çıktı :

```
GIRILEN DIZIDEKI EN BUYUK ELEMANI BULAN PROGRAM
DIZININ BOYUTU = ? 4
? 4
? 9
? 1
? 6
DIZININ EN BUYUK ELEMANI = 9

```