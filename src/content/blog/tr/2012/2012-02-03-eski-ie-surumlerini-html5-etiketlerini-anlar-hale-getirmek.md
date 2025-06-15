---
title: "Eski IE surumlerini, HTML5 etiketlerini anlar hale getirmek"
slug: eski-ie-surumlerini-html5-etiketlerini-anlar-hale-getirmek
date: 2012-02-03
description: "Eski Internet Explorer sürümlerinin (IE6, 7, 8) HTML5 etiketlerini tanıması ve doğru görüntülemesi için JavaScript ve CSS ile uygulanabilecek basit çözümler."
url: http://mfyz.com/tr/eski-ie-surumlerini-html5-etiketlerini-anlar-hale-getirmek/
tags: ["HTML5", "Internet Explorer", "IE uyumluluğu", "CSS", "JavaScript", "web geliştirme", "Arayüz Programlama"]
category: Arayüz Programlama
migration: {"wpId":299,"wpPostDate":"2012-02-03T18:04:58.000Z"}
lang: tr
---

"Yil 20XX olmuş hala IE ile uğraşıyoruz" diyeceğiz herhalde yıllar sonra da. Bu süreçte ie'ye tekmeyle de olsa html5'i en azından etiketleri tanıması için en basit çözüm olarak iki şey yapmanız gerekiyor.

Birincisi IE'nin dom ağacında html5 etiketlerine ait hiçbir initialization yok. Bunu tetiklemek için kullandığınız her html5 etiketi için en az bir tane element üretmeniz yetiyor. Sonrasında IE dökümandaki tüm elementleri dom ağacınızda tanımaya başlıyor. Bunun için:
```html
<script type="text/javascript">
	elements = "article footer header nav sidebar section".split(' ');
	for (i in elements) { document.createElement(elements[i]); }
</script>
```
Tamam etiketler tanınır hale geldi ama daha büyük problem ise IE görsel olarak bu etiketlerle ne yapacağını bilemediği için default stillerini uyguluyor. Anlam veremeyeceğiniz marginler, değişik element türleri olarak bütün etiketler birbirine girmiş oluyor arayüzde. CSS ile tüm html5 etiketlerini blok element ayarlayıp basitçe resetlemek için:
```css
section, header, nav, footer, article {
  display: block;
  padding: 0;
  margin: 0;
}
```
yapabilirsiniz. Bu sayede IEnin eski sürümleri 6,7,8 (emin değilim belki 9 da) html5i bir parça olsun tanır ve insan gibi gösterir hale gelebiliyor. Ama unutmayın daha birçok sorunu düzeltmeye çalışmak uğraşmak zorunda kalabilirsiniz.