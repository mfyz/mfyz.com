---
title: "Javascript ile mouse koordinatlarını buldurmak"
slug: javascript-ile-mouse-koordinatlarini-buldurmak
date: 2005-10-25
url: http://mfyz.com/tr/javascript-ile-mouse-koordinatlarini-buldurmak/
tags: ["Arayüz Programlama","ipucu","javascript","kordinatlar","mouse"]
category: Arayüz Programlama
migration: {"wpId":113,"wpPostDate":"2005-10-25T14:14:41.000Z"}
lang: tr
---

var IE = (document.all?true:false); if (!IE){ document.captureEvents(Event.MOUSEMOVE) } document.onmousemove = getMouseXY; var tempX = 0; var tempY = 0; function getMouseXY(e) { if (IE) { tempX = event.clientX + document.body.scrollLeft; tempY = event.clientY + document.body.scrollTop; } else { tempX = e.pageX; tempY = e.pageY; }; if (tempX < 0){tempX = 0;} if (tempY < 0){tempY = 0;} document.Show.MouseX.value = tempX; document.Show.MouseY.value = tempY; return true; }

 **X** 

  Bu dökümanda javascript ile sayfanızda mouse koordinatlarını tespit eden kısa bir koda değineceğim. Örneği yukarıdaki gibidir.
```
var IE = document.all ? true : false;
if (!IE) document.captureEvents( Event.MOUSEMOVE )
document.onmousemove = getMouseXY;

```
Bu kısımda browser'a göre mouse hareketini getMouseXY fonksiyonu çalıştırmaya yönlendiriyoruz.
```
var tempX = 0;
var tempY = 0;

```
Geçici mouse X, Y değerlerini saklayan değişkenler.
```
function getMouseXY(e) {

  // browser'a mouse koordinatlari yakalaniyor ve degiskenlere aktariliyor..
  if (IE) {
    tempX = event.clientX + document.body.scrollLeft;
    tempY = event.clientY + document.body.scrollTop;
  }else {
    tempX = e.pageX;
    tempY = e.pageY;
  }

  // eger negatif degerlerde ise 0 ataniyor
  if (tempX < 0){tempX = 0;}
  if (tempY < 0){tempY = 0;}

  // degerler dokumanda yazdiriliyor..
  document.Show.MouseX.value = tempX;
  document.Show.MouseY.value = tempY;

  return true;
}

```
Mouse koordinatlarını bulduran ve Show formundaki MouseX ve MouseY inputlarına değerleri yazdıran fonksiyon. Buradaki kodu, fonksiyonu kullanarak layer'lari taşıyabilir, mouse'un bazı objeler üstüne gelmesiyle değişik artaksiyonlar yapabilirsiniz. Eski sitedeki tooltip'ler bu şekilde çalışıyordu.