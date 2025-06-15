---
title: "QBasic'de kontrol yapıları ve döngüler"
slug: qbasicde-kontrol-yapilari-ve-donguler
date: 2004-11-07
description: "QBasic programlama dilinde karar yapıları ve döngülerin kullanımı. IF-THEN-ELSE, SELECT CASE gibi kontrol yapıları ile FOR, DO WHILE, DO UNTIL gibi döngü yapılarının örneklerle açıklanması."
url: http://mfyz.com/tr/qbasicde-kontrol-yapilari-ve-donguler/
tags: ["Basic","QBasic","do","döngü","if","kontrol yapıları","while","programlama","algoritma"]
category: Basic
migration: {"wpId":47,"wpPostDate":"2004-11-07T08:16:10.000Z"}
lang: tr
---

## Kontrol Yapıları

#### `IF ... THEN ... END IF` Komut Kümesi

Bir koşul sağlanması halinde belirtilen bazı işlemler kümesinin gerçekleştirilmesini sağlar. Kullanımı;
```
IF A=B THEN
  'Yapılacak İşler
END IF

```
A, B'ye eşitse belirtilen işleri yapar. Eğer yapılacak işlemleriniz tek ise bu komutu;
```
IF A=B THEN 'Yapılacak İşlem

```
şeklinde de kullanabilirsiniz.

#### `IF ... THEN ... ELSE .... END IF` Komut Kümesi

Bir koşul sağlandığında bir işleri sağlanmadığında diger işlemleri gerçekleştirir. Kullanımı;
```
IF A=B THEN 
  'Koşul Doğruysa Yapılacak İşlemler 
ELSE 
  'Koşul Doğru Değilse Yapılacak İşlemler 
END IF

```
A, B'ye eşitse bazı işlemleri değilse belirtilen başka işlemleri yapar. Aynı şekilde yapılacak işlemler her iki tarafta da tek ise bunu tek satırda yani;
```
IF A=B THEN  'Doğruysa Yapılacak İşlem 
ELSE  'Yanlışsa Yapılacak İşlem

```
şeklinde de kullanabiliriz.

#### `IF ... THEN ... ELSE IF ... THEN ... ELSE IF ... END IF` Komut Kümesi

Bir koşul sağlanırsa belirtilen işlemler yapılır ve devam edilir. Eğer değilse bir sonraki koşul sorgulanır. Bir sonraki koşul da bu koşul gibi çalışır yani doğruysa işlemler yapılır değilse bir sonraki koşula geçilir. Kullanımı;
```
IF A=B THEN 
  'İşlemler 
ELSE IF B=C THEN 
  'İşlemler 
ELSE IF X=Y THEN 
  'İşlemler ... 
END IF

```
Burada A, B'ye eşitse 1. işlemler yapılır ve programa devam edilir. Diğer koşullar sorgulanıp işleme konmaz. Eğer koşul yanlışsa 2. koşul sorgulanır; ve böyle tüm koşullar sorgulanıp işleme konulur.

## Döngüler

#### `FOR` Döngüsü

Bu döngü ile bir başlangıç sayısından son sayıya kadar belirlenen artış veya azalışa göre sayılıp aradaki işlemler yapılır. Kullanımı;
```
FOR X=1 TO 5 STEP 1 
  A=A+X 
NEXT X 

```
Burada X bizim döngüde sayısını sürekli artırdığımız veya azalttığımız değişken oluyor. 1 başlangıç sayımız ve 5 de son sayımız olacaktır. STEP ile belirlediğimiz de değişkenimizin her dönüşte ne kadar ve nasıl değişceğini belirlememizi sağlar. Mesela 0'dan -10'a kadar 1 er 1er geriye doğru sayacaksak FOR X=0 TO -10 STEP -1 dememiz yeterlidir. Eğer STEP'i belirtmezsek bunu +1 olarak algılayacaktır(FOR X=1 TO 10 gibi).

#### `DO WHILE` Döngüsü

Bu döngü ile bir koşul sağlanana kadar işlemleri döndürebiliriz. Kullanımı;
```
DO 
  'İşlemler 
WHILE(A=B)

```
A, B'ye eşit olana kadar belirtilen işlemlerin yapılmasını sağlar.

Not : Bu döküman 15 Eylül 2006 tarihinde tekrar düzenlenmiştir.