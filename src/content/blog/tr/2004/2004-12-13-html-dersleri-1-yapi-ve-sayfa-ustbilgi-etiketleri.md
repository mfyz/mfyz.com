---
title: "HTML Dersleri (1) : Yapı ve sayfa üstbilgi etiketleri"
slug: html-dersleri-1-yapi-ve-sayfa-ustbilgi-etiketleri
date: 2004-12-13
description: "HTML dersleri serisinin ilk bölümü. Bu rehber, bir HTML belgesinin temel yapısını, `<!DOCTYPE>` tanımını ve `<head>` bölümünde yer alan `<title>`, `<meta>` gibi önemli sayfa üstbilgi etiketlerini açıklıyor."
url: http://mfyz.com/tr/html-dersleri-1-yapi-ve-sayfa-ustbilgi-etiketleri/
tags: ["Arayüz Programlama", "body", "html", "meta", "title", "web geliştirme", "html dersleri", "head", "doctype", "yapı"]
category: Arayüz Programlama
migration: {"wpId":103,"wpPostDate":"2004-12-13T22:26:14.000Z"}
lang: tr
---

#### Doctype (Döküman kodlama türü)

Döküman türü, tarayıcıların, kodladığınız sayfanın ne olduğunu anlamasına yardımcı olur. Doctype, web standartlarına göre (w3c) zorunludur. Yani bir sayfanın türü belirtilmek zorundadır. Bu derslerde HTML kodlama üzerine yoğunlaştığımızdan "Geleneksel html türü" bizim işimizi görecektir. İleride doctype hakkında başka bir makalede bahsedeceğim.

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
```

#### html etiketi

Tüm html kodlarının bulunması gereken blok bu bloktur.

#### head etiketi

HTML açılış etiketinden sonra sayfa bilgi etiketlerinin bulunması gereken bloktur. title, meta, style etiketlerini bu blok içerisinde yazmalıyız.

#### title etiketi (Başlık)

Tarayıcı penceresinin başlığında görüntülenen sayfa başlığını belirlemenizi sağlar.

#### meta etiketi

Sayfa bilgi değişkenlerini belirler. Sayfa hakkında birçok bilgiyi bu etiketle ayarlarız. Sayfa oluşturan programın adı, sitenin yazarı, sayfa hakkında anahtar kelimeler, sayfanın kısa tanımı, tarayıcı için özel ayarlar (sayfanın son kullanım tarihi vs) gibi çok fazla özellik ayarlanabilir. Bu ayarlamalardan bazıları;

```html
<meta http-equiv="Content-Type" content="text/html;charset=utf8">
```

Sayfanın karakter kodlamasını Türkçe olarak ayarlamamızı sağlar. UTF-8 kullanmanızı öneririm, tüm yazı karakteri ailelerini içerir.

```html
<meta http-equiv="Refresh" content="X" URL="http://">
```

Bulunulan sayfayı yönlendirir. Eğer URL="..." kısmı girilmezse bulunduğu sayfayı, yüklendikten X saniye sonra yeniden yükler. Eğer girilirse sayfa yüklendikten X saniye sonra belirtilen adrese yönlenir.

```html
<meta http-equiv="keywords" content="kelime1, kelime2, kelime3 ...">
```
Sayfanın içeriğine ait anahtar kelimeleri belirler. Arama motorlarında bu anahtr kelimelere göre sayfa incelenir.

#### body etiketi (Sayfa kodları)

Bütün sayfa içeriğini bu blok içerisine yazın. Sayfa hakkında bazı görünüm ayarlarını da bu etiketin özniteliklerini ayarlayarak belirleyebiliriz. Bunlar;

**bgcolor="RENK_KODU"** : Sayfanın artalan rengini belirler. **background="RESIM_DOSYASI_ADRESI"** : Artalan resmini belirler. **text="RENK_KODU"** : Geçerli metin rengini belirler. **link="RENK_KODU"** : Geçerli link rengini belirler. (NOT : alink, aktif linkler. vlink, ziyaret edilmiş linkler) **topmargin="X"** : Üstten kaç piksel boşluk bırakılıp sayfa içeriğinin başlayacağını belirler. (NOT : left, right, bottom ile diğerleri de belirlenebilir.)

_Bunların hepsi sayfanın stilleri ile ilgili özelliklerdir. Onun için bu öznitelikleri CSS ile ayarlamaya çalışın/alışın._

#### base etiketi

Sayfadaki linklerle ilgili geçerli çalışma tabanını belirler. href="http://" parametresi eklenerek sayfadaki bütün linklerin o site üzerinde çalıştığını belirleyebilirsiniz. target="main" parametresi ile sayfadaki bütün linklerin "main" çerçevesi içerisinde açılmasını sağlayabilirsiniz.

#### link etiketi

Dış bir dosya ile ilişki yaratır. Genel 2 özellik için kullanılır. Bunlar;

```html
<link rel="stylesheet" type="text/css" href="stil_dosyasi.css" />
```

şeklinde kullanıldığında stil.css stil dosyası ile sayfayı ilişkilendirir. Yani stil.css'deki stilleri sayfaya uygular.

```html
<link rel="shortcut icon" href="favicon.ico" />
```

Favori (bookmark) listenizde, masaüstü kısayolları gibi dosyalanmış sayfa kısayollarında sayfa hakkında simge belirlemenizi sağlar.

#### style, script ve noscript etiketleri

Sayfa için javascript kodu çalıştırabilmemizi sağlar. Günümzde javascript desteklemeyen browser programı neredeyse bulunmuyor. Ancak desteklemeyen veya desteği kapalı olan programlar için noscript etiketi kullanarak anlanılmayan kısımları geçmiş olursunuz.

> Bu sayfanın kodlarını incelemenizi öneririm. Kaynak kodu açıp sayfa yapısı etiketlerinde verdiğim değerleri gözden geçirin, Stil ve javascript tanımlarıma bakmaya çalışın. Çok daha fazla fikir verecektir.
> 