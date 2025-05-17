---
title: "Temel JavaScript (4) - Zamanlayıcılarla çalışmak"
slug: temel-javascript-4-zamanlayicilarla-calismak
date: 2005-01-26
url: http://mfyz.com/tr/temel-javascript-4-zamanlayicilarla-calismak/
tags: ["Arayüz Programlama","interval","javascript","js","timer"]
category: Arayüz Programlama
migration: {"wpId":121,"wpPostDate":"2005-01-26T05:00:00.000Z"}
lang: tr
---

#### Zamanlayıcı da nesi?

Javascripte otomatik işler yaptırırken sürekli bişeyleri gözetlemek isteyebilir, belirli periyodlarla bişeyler yaptırmak isteyebilir ya da gecikmeli işler verebiliriz. Bunun için zamanlayıcıları kullanırız. Çoğu kullanıcıyla eşzamanlı çalışan programlama dillerinde olduğu gibi javascriptde de zamanlayıcılar kodlarda oldukça fazla biçimde kullanılır. Zamanlayıcıların kullanımı çok basittir. Bir değişkeni zamanlayıcı objesi olarak atayıp onu kontrol edebilir veya nasıl çalıştığı önemli olmayan zamanlanmış işlerde yani kontorl etmenize gerek olmayan zamanlayıcılarda objeleştirmeye gerek yoktur. Bunları kısa örneklerle açıklayalım. Basit bir yüklenme efekti yapalım.   function isle(){ obje=document.getElementById('islem\_bar'); if(obje.value.length==40){ clearTimeout(zamanlayici); alert("Bitti"); }else{ obje.value+='+'; zamanlayici=setTimeout('isle()',100); } }
```
<input type="button" value="Başla ->" onClick="isle();">
<input type="text" value="" id="islem\_bar" size="50"><br>
<script>
function isle(){
  obje = document.getElementById('islem\_bar');
  if(obje.value.length == 40){
    clearTimeout(zamanlayici);
    alert("Bitti");
  }else{
    obje.value += '+';
    zamanlayici = setTimeout('isle()',100);
  }
}
</script>

```
Aslında oldukça basit. **setTimeout** fonksiyonu çift parametreli, birincisi tırnaklar içerisinde yapılacak işi diğeri ise milisaniye cinsinden gecikmeyi belirtiyor. Yukarıda bu fonksiyon sürekli içerisinde bulunduğu fonksiyonu çağırttığı için durdurulmadığı sürece teorik olarak sonsuza kadar dönecektir. Ancak biz işlem olarak sürekli bir text inputa "+" işareti yazdırıyoruz, ve kontrol olarak da o text inputtaki karakter uzunlugunu kontrol ediyoruz. bir progress bar şekli için input'un dolması yeterli, input'un görünür karakter uzunluğunu 50 olarak ayarlamıştık. Bu sahayı 40 karakter tamamiyle doldurmaya yetiyor. Onun için inputun karakter uzunluğu 50 olduğu zaman ayarladığımız zamanlayıcı objesini **clearTimeout** fonksiyonu ile sıfırlıyoruz. Böylece bitmiş oluyor. [Temel JavaScript (5) - Küçük uygulamalar]("http://www.mfyz.com/?/dokuman/88/temel-javascript-5---kucuk-uygulamalar/") dökümanından devam edin.