---
title: "PHP'de döngüler"
slug: phpde-donguler
date: 2004-12-04
url: http://mfyz.com/tr/phpde-donguler/
tags: ["döngüler","for","loop","PHP","while"]
category: PHP
migration: {"wpId":70,"wpPostDate":"2004-12-04T05:53:44.000Z"}
lang: tr
---

**Döngü Ne Demektir?** Döngüler bazı görevlerin bazı koşullar ile tekrarlanmasını sağlar. Mesela 1'den 100'e kadar ekrana sayılar yazdırmak istiyorsak 100 tane print kullanmayız. for veya while gibi döngülerle bu işlemi yapmamız çok çok daha kolaydır. Kullanım ve çalışma yapısına göre farklı döngüler vardır. Bunlar;

#### while Döngüsü

Bir koşul sağlanana kadar ya da bir koşulun sağlanmamasına kadar (while'a göre False verene kadar.) içeride belirtilen işlemlerin dönülmesini sağlar.
```
while( koşullar ){
  // işlemler
  print 'dünya dönüyor';
}

```
koşullar False olduğu zaman döngü biter. (0 = False)

#### for Döngüsü

Koşullar dışında bir koşulun başlama kriteri ve döngü ilerledikçe yapılacak değişimi de beltirmemizi sağlayan döngüdür.
```
for($i=0;$i<10;$i++){
  // işlemler
  print 'Şimdiki sayı : ' . $i;
}

```
Döngü dönerken bir sayaç tutulur. Bu sayaç değeri bu örneğe göre $i değişkeninde saklanır. $i=0 sayacımızın başlangıç değerini ifade eder. $i<10 koşulu için sayaç koşulun sağlanmasına kadar dönülecektir. $i++ ise döngü her dönüşünde sayaç değişkeninin nasıl değişeceğini ifade eder. Bu örnekte döngü her döndüğünde $i bir atrırılacaktır.

#### break

break bir döngünün bitmesini beklemeden döngüyü terketmektir.
```
for($i=0;$i<10;$i++){
  if($i==5) break;
}

```
Bu kodda döngü 0'dan 9'a kadar sayacaktır. Ancak aradaki kontrolde $i 5'e eşit olduğunda break ile döngü bitecektir.

#### continue

continue ise bir döngüde döngünün bir sonraki adıma geçmesini sağlarız.
```
for($i=0;$i<100;$i++){
  if(($i%3) != 0) continue;
  print $i;
}

```
Bu örnekte ise aradaki kontrolde, $i 3'ün katı değilse yani $i mod3 sıfıra eşit değilse döngünün bir sonraki adımına atlar. Eğer $i 3'ün katı ise devam eder ve $i'yi yazdırır. Böylece 1'den 100'e kadar 3'ün katı olan sayıları yazdırır. (tabi $i 3'den başlayıp atama işlemi $i=$i+3 yapılırsa da aynı iş yapılmış olur.)