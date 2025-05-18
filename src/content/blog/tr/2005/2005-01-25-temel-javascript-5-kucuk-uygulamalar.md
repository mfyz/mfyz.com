---
title: "Temel JavaScript (5) - Küçük uygulamalar"
slug: temel-javascript-5-kucuk-uygulamalar
date: 2005-01-25
url: http://mfyz.com/tr/temel-javascript-5-kucuk-uygulamalar/
tags: ["Arayüz Programlama","example","javascript","js","örnek"]
category: Arayüz Programlama
migration: {"wpId":122,"wpPostDate":"2005-01-25T05:00:00.000Z"}
lang: tr
---

Bu kadar teorik bilgi yeterli olacaktır. Tabiki sadece buradaki bilgilerle yetinmeyecek araştıracaksınız. Özellikle de javascript referans sitelerini iyi kullanmanızı öneririm. Bir onje özelliğinin hangi browser'ların hangi versiyonlarından itibaren desteklenmeye başladıklarını da bu referanslardan öğrenebilirsiniz. Çok obje, çok özellik bulunduğu için burada bununla ilgili açıklama yapmıyorum. Her nesneyi ve bunların oluşturdukları objelerin özelliklerini kullananrak oldukça dinamik sayfalar yazabilirsiniz. Şimdi biraz uygulama yapalım..

#### 1\. Eposta kontrolü

Sayfamızda kullandığımız iletişim formu gibi yapılar için için e-posta kontrolü yapalım. Bir eposta'yı kontrol etmenin en basit tekniği içerisinde @ ve . işaretleri aramaktır. Daha gelişmiş aramaları düzenli ifadeler ile yapabiliriz. Javascript'de de düzenli ifade kullnımı vardır. Burada basit olan tekniğe göre bişeyler yapacağım.
```
<input type="text" id="eposta">
<input type="button" value="Kontrol Et" onClick="kontrol();">
<script>
 function kontrol(){
   var obj=document.getElementById('eposta');
   if(obj.value.length < 6){
     // eposta adresi 6 karakterden az olamaz
     alert('E-posta adresiniz 6 karakterden az olamaz!');
   }else if(obj.value.indexOf('@')==-1){
     // eposta içerisinde @ işareti yok hata verelim.
     alert('E-Posta adresini doğru giriniz!');
     return false;
   }else if(obj.value.indexOf('.')==-1){
     // eposta içerisinde . işareti yok hata verelim.
     alert('E-Posta adresini doğru giriniz!');
     return false;
   }else{
     // doğru
     alert('Adres doğru');
   }
 }
</script>

```

#### 2\. Basit Rollover efekti

Bütün rollover efektlerinde üstüne geldiğiniz nesne kendini yöneterek değişimi sağlar. Mesela bir butonun üstüne gelince kabarması aslında tamamiyle gözümüzün bir geçiş olayında efektmiş gibi algılamasından kaynaklanır. Bu tarz bütün sayfalarda aslında sadece 2 grafik kullanılır. İlki üstünde olmadığınız zamanki kabarmamış buton diğeri ise kabarmış halidir. Üstine geldiğimizde kendi etiketini yöneterek src parametresinin değerini kabarmış olanın url'i ile değiştirmesi ile o grafiğin sayfadaki görünümü değişir. Boyutları aynı olduğu için sayfada gördüğümüz tek fark grafikler arasındaki görünüm farkıdır. Fark ne kadar az ise o kadar küçük değişimler vardır. Bu küçük değişimler iyi ayarlandığında efektler oluşur. Şimdi 2 basit grafik ile bir rollover efektir yapalım :

Grafikler şöyle olsun :

![Yazı](/images/archive/tr/2005/01/yazi-1.gif) 1.gif

![Yazı](/images/archive/tr/2005/01/yazi_over-1.gif) 2.gif

Bu grafiklerin imaj boyutları aynı. Sayfa yüklendiğinde 1.gif yüklenecek biz imaj'ın onMouseOver ve Out olaylarında kendisinin src'lerini kontrol etmesini sağlayacağız.
```
<img src="1.gif" border="0" onMouseOver="this.src='2.gif';" onMouseOut="this.src='1.gif';">

```

#### 3\. Basit bir oyun yazalım

Bu oyun casino'larda bol bulunan şu 3 şeyi aynı tutturduğumuzda kazandığımız şey (adını ben de bilmiyorum :) ). Bunun için öncelikle 3 tane imaj basıp altına bir buton koymalıyız. Buton bir fonksiyonu çağırmalı ve oyunu ilerletmeli. Sonra farklı olan şeyleri (sayı veya herhangi birşey olabilir) sayısını belirlemeliyiz. Ben bu oyunda 4 tane yapacağım. İşte seçtiğim 4 farklı grafik.

![](/images/archive/tr/2005/01/1.gif)![](/images/archive/tr/2005/01/2.gif)![](/images/archive/tr/2005/01/3.gif)![](/images/archive/tr/2005/01/4.gif)
```
<img src="0.gif" border="1" id="r1">
<img src="0.gif" border="1" id="r2">
<img src="0.gif" border="1" id="r3">
<input type="button" value=" Salla " onClick="oyna()">

<script>
var resimler = new Array('','1.gif','2.gif','3.gif','4.gif');
function oyna(){
  oynat(10,0);
  setTimeout('oyun\_kontrol()',2000);
}

function oyun\_kontrol(){
  if((document.getElementById('r1').src == document.getElementById('r2').src) &&
      document.getElementById('r1').src == document.getElementById('r3').src){
      // üçüde aynı
      alert(' $$$ KAZANDINNN $$$ ');
    }else{
      alert('Kaybettin!');
    }
}

function oynat(ivme,i){
  ivme = ivme + (ivme/3);
  dondur();
  if(i == 12){
    clearInterval(zamanlayici);
  }else{
    zamanlayici=setTimeout('oynat('+ivme+','+(i+1)+')',ivme);
  }
}

function dondur(){
  //rastgele 3 sayi cekelim 1-4 arasında
  s1 = Math.floor(Math.random()\*4)+1;
  document.getElementById('r1').src = resimler\[s1\];
  s2 = Math.floor(Math.random()\*4)+1;
  document.getElementById('r2').src = resimler\[s2\];
  s3 = Math.floor(Math.random()\*4)+1;
  document.getElementById('r3').src = resimler\[s3\];
}
</script>

```
Temel Javascript Bilgisi şimdilik bu kadar. İleride gelişmiş javascript örneklerine dair dökümanlar bulacaksınız.