---
title: "QBasic'de ekran ve grafik komutları"
slug: qbasicde-ekran-ve-grafik-komutlari
date: 2004-11-06
description: "QBasic programlama dilinde ekran yönetimi ve grafik çizimi için kullanılan PRINT, INPUT, SPACE, LOCATE gibi temel komutların kullanımı ve örnekleri. Ekranda konum belirleme ve grafik çizim teknikleri hakkında kapsamlı bir rehber."
url: http://mfyz.com/tr/qbasicde-ekran-ve-grafik-komutlari/
tags: ["Basic","QBasic","ekran","grafik","programlama","komutlar"]
category: Basic
migration: {"wpId":46,"wpPostDate":"2004-11-06T07:57:57.000Z"}
lang: tr
---

## Ekran Komutları (`PRINT`, `INPUT`, `SPACE`, `PRINT USING`, `LOCATE`, `TAB`)

#### PRINT Komutu

Ekrana herhangi birşeyler yazdırmak için kullanılır. Kullanımı;
```
PRINT "Fatih Yıldız"

```
Bir değişkeni Yazdırmak için;
```
PRINT X

```
Eğer bu komutun sonuna ; işareti koyarsanız bir sonraki ekran komutu bu komutun ekrana yazdırıldığı satırın sonundan devam eder eğer yazmazsanız bir sonraki ekran komutu bu satırın bir altından devam eder. İki veya daha fazla değeri yazdırmak için komuttan sonra değişken veya değerleri ; ile ayırark yazın. Örneğin;
```
PRINT "Sonuç : ";DEG1;"Olduğundan X :";DEG2;"dir."

```
Burada ekrana bir cümle yazılacak ve bir sonraki işlem alt satırdan devam edecektir.

#### INPUT Komutu

Bu komut ile klavyeden bilgi alınarak bir değişkene bu girilen değer aktarılır. Kullanımı;
```
INPUT "Bilgiyi Giriniz";DEG1

```
Bu kodda ekrana Bilgiyi Giriniz? cümlesi çıkıyor ve bizim bilgi girişimizi bekliyor. Eğer arada ; yerine , kullansaydınız yazdırmak istediğimiz cümlenin sonuna ? eklemeyecekti.

#### SPACE$(X) Komutu

Bu komut PRINT komutu ile birlikte kullanılır. Amacı X değeri kadar boşluk bırakmaktır. Kullanımı;
```
PRINT "A";SPACE$(10);"B"

```
Bu kodun çıktısı A 10 Tane Boşluk B olur.

#### PRINT USING Komutu

Bu kod sayıları ekrana yazdırırken basamaklamak için kullanılır. Mesela programda girilen bilgiyi ekrana , ile ayırmak istiyorsunuz. Örneğin;
```
A=123456789
PRINT USING "###.###.###",A

```
Burada # lere dokunmayacaksınız, aradaki noktalar ise sayıyı ayırınca nasıl ekrana yazacak onu belirler. Bu kodun çıktısı 123.456.789 olur. Bu kodu para bilgilerini ekrana yazdırırken kulanabiliriz.

#### LOCATE(X,Y) Komutu

Ekrana bir bilgi yazdırdığınızda veya bir bilgi istediğinizde hep satırlar aşağı iner, bu komut ile istediğiniz satır ve sütuna gidebilirsiniz. Normal bir dos ekranı 24 satır 80 sütundan oluşur. Komutun kullanımı;
```
LOCATE(10,50)

```
10.satır 50.sütuna gittik ama ekranda birşey görünmez. Biz bu komuttan sonra PRINT veya INPUT ile ekrana bilgi yazdırabilir veya bilgi isteyebiliriz. Örneğin;
```
PRINT "Başlangıç"
PRINT "2.Satır"
LOCATE(1,25)
PRINT "Burası 1.Satır"

```
Burada 1.PRINT 1.satıra Başlangıç yazdırdı. 2.PRINT 2.satıra 2.Satır yazdırdı. Eğer LOCATE kullanmasaydık 3.PRINT Burası 1.Satır yazısını 3.satıra yazdıracaktı. Amam biz LOCATE ile 1.satır 25.sütuna gittik ve 3.PRINT Burası 1.Satır yazısını 1.satıra yazdırdı.

#### TAB(X) Komutu

Bu kod PRINT komutu ile birlikte kullanılır. Bu kod ile ekrana yazdırmakta olduğumuz satırın X inci sütununa atlarız. Örneğin;
```
PRINT "A";TAB(35);"B"

```
Burada ilk olarak A yazıp aynı satırın 35. sütununa atlayıp B yazdırıyoruz.

## Grafik Komutları (SCREEN, LINE, COLOR, VIEW, PSET, CRICLE)

#### SCREEN Komutu

Ekran çözünürlüğünü ayarlamamıza yardımcı olur. Kullanımı;
```
SCREEN 14

```
Değişik değerler deneyip ilginç ekran çözünürlükleri bulabilirsiniz.

#### LINE Komutu

Ekrana belirtilen X1,Y1 değerlerinden X2,Y2 değerlerine kadar çizgi çizer. Kullanımı;
```
LINE(X1,Y1)-(X2,Y2)

```

#### COLOR X Komutu

Bu komuttan sonra ekrana yazdırılacak şeylerin istediğiniz renkte görünmesini sağlar. X değeri ile renk belirleyebilirsiniz. X değeri 1 ile 15 arasında olabilir.

#### VIEW Komutu

Ekranda X1,Y1 ile X2,Y2 ile oluşturulacak dikdörtgen alanı istenilen renkte boyar. Kullanımı;
```
VIEW PRINT (X1,Y1)-(X2,Y2),RENK

```

#### PSET Komutu

Ekranda İstenilen X,Y noktasını istenilen renkte boyar. Kullanımı;
```
PSET(X,Y),RENK

```

#### CRICLE Komutu

Ekranda istenilen X,Y merkezli istenilen yarıçapta çember-daire çizer. Kullanımı;
```
CRICLE(X,Y),RENK

```
Not: Bu döküman 15 Eylül 2006 tarihinde düzenlenmiştir.