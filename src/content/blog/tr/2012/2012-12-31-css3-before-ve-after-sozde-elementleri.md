---
title: "CSS before ve after sözde elementleri"
slug: css3-before-ve-after-sozde-elementleri
date: 2012-12-31
url: http://mfyz.com/tr/css3-before-ve-after-sozde-elementleri/
tags: ["after","Arayüz Programlama","before","css","css3","html","pseudo"]
category: Arayüz Programlama
migration: {"wpId":343,"wpPostDate":"2012-12-31T08:06:38.000Z"}
lang: tr
---

CSS2 ile gelen en faydalı özelliklerden biri de yeni sözde seçiciler, bunlardan ikisi "before" ve "after" seçicileri birçok minimal yaklaşıma olanak sağladı.

Özelliğin çıkış noktası bir elementin öncesi veya sonrasına noktalama gibi işaretçiler yerleşitrebilmekti. Yani en sade kullanımıyla:
```css
.my_quote:before {
    content: '"';
}
.my_quote:after {
    content: '"';
}

```
Bu kod ile bir alıntı yazısının başına ve sonuna çift tırnak ekleyebiliyorsunuz:

![](/images/archive/tr/2012/12/css3_pseudo_quote.png)

Kırmızı ile işaretlediğim karakterler css ile eklendi. Ya da devamı olan bir yazı basarken ekrana:
```css
.read_more_link:after {
    content: '...';
}

```
kodu ile "..." ekleyebiliyorsunuz:

![](/images/archive/tr/2012/12/css3_pseudo_more.png)

Fakat bu yeni sözde seçicileri akıllıca kullanarak bir element üretebilirsiniz. Yani bu seçici "content" özniteliği aldığı zaman dom üstünde yerleşmese de görsel olarak bir element oluşturuyor. Doğal olarak bu elementi block level yapabilir, genişlik yükseklik tanımlayabilir, posizyonlamasını istediğiniz gibi ayarlayabilirsiniz.

Çok yaygınlaşan bir kullanımla, bir elementin başına veya sonuna eklemek istediğiniz ufak simgeleri, resimleri veya işaretçileri bu sözde seçicilerle yaratabilirsiniz.

Basit örnekle size linklerinize simgeler koyabilmeyi anlatacağım. Biliyorsunuz HTML öznitelik seçicileri var css'de ve "target" özniteliği "_blank" olan bir linki diğerlerinden ayrı bir şekilde seçebilirsiniz. **a[target="_blank"]** seçicisi dış bağlantıları seçecektir.
```css
a[target="_blank"]:after {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url(/images/external_link_icon.png) no-repeat left top;
}

```
Bu kod dış baglantıyı gösteren bir a elementinin sonuna inline-block türünde bir element ekleyecek ve içeriğini boş bir şekilde ayarlayacaktır. Genişlik ve yüksekliğini 16px olarak ayarlayıp art alanını da bir simgeyi olarak ayarladığımızda linkin sonunda bu simgeyi görebileceğiz:

![](/images/archive/tr/2012/12/ext_link.png)

Bu sözde elementlerini şu tarayıcılar destekliyor:

*   Chrome 2+
*   Firefox 3.5+
*   Safari 1.3+
*   Opera 9.2+
*   IE8+ (Ufak problemlerle beraber)

Bu sözde elementlerle yarattığınız içeriğin sadece görsel amaçlarla kullanılmasi gerektiğini unutmayın, birçok erişilebilirlik okuyucusu veya tarayıcısı bu elementleri okuyamadığı için fonksiyonalitenizi bozacak içerikleri bu elementlerle kullanmamaya dikkat edin.

Bu yazıda çok yaratıcı örneklerini görmediniz fakat ne işe yaradıklarını bilmeniz ileride deney yapmanızı kolaylaştıracaktır veya karşılaştığınızda daha kolay anlamanızı sağlayacaktır.