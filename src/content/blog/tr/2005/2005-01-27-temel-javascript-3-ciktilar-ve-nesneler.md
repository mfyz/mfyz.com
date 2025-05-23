---
title: "Temel Javascript (3) - Çıktılar ve Nesneler"
slug: temel-javascript-3-ciktilar-ve-nesneler
date: 2005-01-27
url: http://mfyz.com/tr/temel-javascript-3-ciktilar-ve-nesneler/
tags: ["Arayüz Programlama","date","javascript","js","matematik","math","string","tarih"]
category: Arayüz Programlama
migration: {"wpId":120,"wpPostDate":"2005-01-27T05:00:00.000Z"}
lang: tr
---

## Web Programcıları İçin Temel JavaScript Bilgisi

* * *

#### Birşey Yazdırmak?

Javascript'de ekrana (sayfaya) birşey yazdırmak için document.write(); kullanılır. document.write(degisken_adi); veya document.write("Yazilacaklar"); seklinde kullanilir.

#### Hata Çıktısı, PopUp Açmak?

Eğer bir hata çıktısı vermek istiyorsak genelde **alert();** fonksiyonu ile popup mesaj gösterebiliriz.
```
alert(degisken_adi);
// veya
alert("Hata Yaptınız!");

```
şeklinde kulanılır.

#### Nesneler

Javascript'de nesneler üzerinde çalıştığımız elemanlar veya değerlerdir. Mesela bir form elemanını kodlarımızda adresleyerek nesne şeklinde kullanırız, ya da yaptığımız matematiksel işlemlerde değişkenlerimizi bazı nesne kullanırız. Javascriptte fonksiyonlar kadar nesne özellikleri ile de çalışılır. Zaten çoğu nesne, fonksiyon şeklindedir. Sadece kulalnımı farklıdır. Bunlara ayrıntılı olarak bakalım :

**String nesnesi**
```
string.bold()                string'i  etiketi içine alır.
string.charAt(x)             string'deki x indeksli karakteri verir.
string.fontsize(buyukluk)    string'i   etiketleri içine alır.
string.indexOf('aranan',x)   string'de x indeksli karakterden baslayarak 'aranan'
yazısını arar. x girilmezse en baştan arama yapar.
İlk bulunan noktanın indeksi döner eğer bulunamazsa -1 döner.
string.italics()             string'i  etiketi içine alır.
string.split('ayrac')        string'i 'ayrac' ayracı ile diziye parçalar.
string.substring(x1,x2)      string'de x1 ile x2. indeks arasinda kalan parcayi verir.
string.toLowerCase()         string'i küçük harfe çevirir.
Aynı özelliğin tersi ise toUpperCase()'dir.

```
Örnek Kullanım :
```
var ad;
ad='Fatih';
document.write(ad.indexOf('ti')) // çıktı 2 olacaktır.
document.write(ad.toLowerCase()) // çıktı 'fatih' ..
...

```
**Date nesnesi**
```
getTime()     1 ocak 1970 00:00:00 tarihinden bu yana geçen saniyeyi verir.
getYear()     İçinde bulunulan yıldan 1900'ün farkını sayısal verir.
getMonth()    0-11 arasında ay indeksi verir.
getDate()     1-31 arasında gün indeksi verir.
getDay()      0-6 arasında haftanın günü indeksi verir.
getHours()    0-23 arasında saat
getMinutes()  0-59 dakika
getSeconds()  0-59 saniye

```
Örnek Kullanım :
```
var zaman;
zaman=new Date;
var gunler=new Array('Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi');
document.write('Bugün '+gunler[zaman.getDay()]+', saat '+zaman.getHours()+':'+zaman.getMinutes());
// örnek çıktı : "Bugün Çarşamba, saat 15:39" şeklinde olacaktır.

```
**Math nesnesi**
```
Math.abs(x)     x'in mutlak değeri
Math.acos(x)    arccos(x) değeri
Math.asin(x)    arcsin(x)   "
Math.atan(x)    arctan(x)   "
Math.cos(x)     cos(x)      "
Math.sin(x)     sin(x)      "
Math.tan(x)     tan(x)      "
Math.PI         Pi sayısını verir
Math.exp(x)     e'nin x'inci kuvveti
Math.floor(x)   x'in küsüratını bir alt tamsayıya yuvarlar
Math.log(x)     log(x) değeri
Math.max(x,y)   x ve y arasında büyük olanı verir.
Math.min(x,y)   x ve y arasında küçük olanı verir.
Math.pow(x,y)   x'in y-inci kuvveti
Math.random()   0-1 arasında rastgele kesirli sayı üretir.
Math.round(x)   x'in değerini hangi tamsayıya yakınsa ona yuvarlar
Math.sqrt(x)    x'in karekökünü verir.

```
Örnek Kullanım :
```
var sonuc,x;
// f(x)=(x^tan(9x))+15/x fonksiyonu için f(5)'i hesaplatalım.
x=5;
sonuc=Math.pow(x,Math.tan(5*x))+(15/x);
document.write(sonuc);
// sonuc 8 olacaktır.

```
 

[Temel JavaScript (4) - Zamanlayıcılarla çalışmak](/temel-javascript-4-zamanlayicilarla-calismak) dökümanından devam edin.