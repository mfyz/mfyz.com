---
title: "Button elementlerinin formu submit etmesini durdurmak"
slug: button-elementlerinin-formu-submit-etmesini-durdurmak
date: 2010-07-27
url: http://mfyz.com/tr/button-elementlerinin-formu-submit-etmesini-durdurmak/
tags: ["Arayüz Programlama","button","form","jquery","submit"]
category: Arayüz Programlama
migration: {"wpId":252,"wpPostDate":"2010-07-27T14:37:04.000Z"}
lang: tr
---

Html'deki button tagleri form elementler içinde kullanılan bir element. Kapanabilen ve içine span, img gibi elementler koyarak css ile butonları şekillendirmenizi kolaylaştırdığı için tercih edilebiliyor. Fakat eğer type'ını button olarak ayarlamazsanız default değeri olan submit şeklinde hareket edip, tıklandığında formu submit ediyor.

```js
$('form button').each(function(){
  if( !$(this).attr('type') ){
    $(this).attr('type', 'button');
  }
});

```

ile type'ı belirlenmemiş tüm button elementlerine button type'ını atayabilirsiniz. Sonuç olarak artık butonlar fromlarınızı submit etmeyecektir.