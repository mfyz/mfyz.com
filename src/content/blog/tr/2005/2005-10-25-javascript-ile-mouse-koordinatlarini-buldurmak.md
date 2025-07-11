---
title: "Javascript ile mouse koordinatlarını buldurmak"
slug: javascript-ile-mouse-koordinatlarini-buldurmak
date: 2005-10-25
description: "JavaScript kullanarak web sayfasında fare (mouse) imlecinin X ve Y koordinatlarını nasıl tespit edeceğinizi öğrenin. Tarayıcı uyumluluğunu da dikkate alan pratik bir kod örneği."
url: http://mfyz.com/tr/javascript-ile-mouse-koordinatlarini-buldurmak/
tags: ["JavaScript", "mouse koordinatları", "fare hareketleri", "DOM", "event handling", "clientX", "pageY", "arayüz programlama", "web geliştirme", "ipucu"]
category: Arayüz Programlama
migration: {"wpId":113,"wpPostDate":"2005-10-25T14:14:41.000Z"}
lang: tr
---

Bu dökümanda javascript ile sayfanızda mouse koordinatlarını tespit eden kısa bir koda değineceğim. Örneği yukarıdaki gibidir.

```js
var IE = document.all ? true : false;
if (!IE) document.captureEvents( Event.MOUSEMOVE )
document.onmousemove = getMouseXY;
```

Bu kısımda browser'a göre mouse hareketini getMouseXY fonksiyonu çalıştırmaya yönlendiriyoruz.

```js
var tempX = 0;
var tempY = 0;
```

Geçici mouse X, Y değerlerini saklayan değişkenler.

```js
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

Mouse koordinatlarını bulduran ve Show formundaki MouseX ve MouseY inputlarına değerleri yazdıran fonksiyon.

Buradaki kodu, fonksiyonu kullanarak layer'lari taşıyabilir, mouse'un bazı objeler üstüne gelmesiyle değişik artaksiyonlar yapabilirsiniz.

Eski sitedeki tooltip'ler bu şekilde çalışıyordu.