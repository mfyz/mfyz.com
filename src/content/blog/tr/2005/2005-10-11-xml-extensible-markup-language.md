---
title: "XML (Extensible Markup Language)"
slug: xml-extensible-markup-language
date: 2005-10-11
url: http://mfyz.com/tr/xml-extensible-markup-language/
tags: ["nedir","Programlama","xml"]
category: Programlama
migration: {"wpId":111,"wpPostDate":"2005-10-11T03:37:16.000Z"}
lang: tr
---

#### XML Nedir?

XML (Extensible Markup Language) verinin platform ve donanım bağımsız olarak taşıma ve saklama işini yapan bir işaretleme dilidir. Platform ve donanımdan bağımsızdan kastımızı biraz açmamız gerekirse şunları söyleyebiliriz.

*   İki ayrı platform üzerinde geliştirilmiş yazılımların konuşması için en etkili yoldur. Mesela .NET platformu ile J2EE platformunda geliştirilmiş iki yazılımın ortak veri kullanıp bir birlerine bilgi akışını XML ile yapmak mümkündür.
*   İki ayrı donamın içinde de mümkün olmaktadır. İki ayrı telefon hattının telefon tuşları ile bilgi topladığını düşünelim. Toplayan bu bilgilerin uygulamaya iletilmesinin en etkili yolu yine XML kullanmak olacaktır. Çağrı merkezlerindeki tuşlar ile girilen bilgilerin sorgulanıp cevap dönmesi işlemlerinin hepsinde akış XML formatındaki veri ile gerçekleştirilmektedir.
*   Aynı şekilde çok büyük bir firmanın topladığı bilgiler olduğunu düşünelim. ve bu bilgilerini veritabanlarında tutuyor olsunlar. Başka firmaların bu bilgiyi kullanma taleplerine en iyi cevap bilgiyi bir web servisi ile XML olarak sunmak olacaktır. Çünkü veritabanına doğrudan erişim yapmalarını istemeyeceklerdir.

Bu konuda bir çok örnek verilebilir fakat bu kadarının konuyu anlamaya yardımcı olacağını düşünüyorum.

#### XML ile HTML Arasında Ne Fark Vardır?

Başta da söylediğim gibi XML verinin taşıma ve saklama işini yapar. Fakat HTML verinin görünümü ile ilgili düzenlemeleri yapmamıza olanak sağlayacaktır. Mesela bir yazının italik mi, kalın mı, font değeri gibi bilgileri HTML'i kullanarak ayarlayabiliriz fakat verini türünün ne olduğu bilgisini HTML ile belirleyemeyiz. XML ise kullanıcının kendi oluşturduğu etiketlerle verinin biçimi koruyarak onu istediği sisteme ve uygulamaya kolayca taşıyabilmektedir. Aralarındaki en önemli fark HTML'de belirli olarak etiketlerin olması fakat XML'de etiketleri kullanıcının belirliyor olmasıdır.

Burada iki ayrı işaretleme diline ait bir örnek vermek gerekirse;

1\. Örnek: HTML
```
<html>
  <head>
    <title> HTML </title>
  </head>
  <body>
    <h1>Başlık</h1>
  </body>
</html>

```
2\. Örnek: XML
```
<uye>
	<adi>Yahya</adi>
	<soyadi>ÖZTÜRK</soyadi>
	<email>yahyaozturk@verivizyon.com</email>
	<ozellikler>
		<boy>177</boy>
		<kilo>75</kilo>
	</ozellikler>
</uye>

```
İlk örnekte metinimizin görünümünü ayarladık. Ne nerede çıkacak nasıl olacak diye. İşte bunu HTML kullanarak yaptık fakat ikinci örnekte verimizin görünümünden çok biçimi ile ilgiledik.

### XML Dokümanı

XML dokümanları ilişkisel veritabanlarından farklı olarak hiyerarşik bir yapısı vardır. Bu yapı kendine has kuralları da beraberinde getirmektedir. Şimdi örnek bir XML dokümanı oluşturalım ve buradaki birimleri teker teker tanıyalım.
```
<Uyeler>
  <Uye uye_id=”1”>
    <adi>Yahya</adi>
    <soyadi>ÖZTÜRK</soyadi>
    <email>yahyaozturk@verivizyon.com</email>
    <yetkiDerece>1</yetkiDerece>
  </Uye>
  <Uye uye_id=”2”>
    <adi>Volkan</adi>
    <soyadi>VERİM</soyadi>
    <email>volkanverim@verivizyon.com</email>
    <yetkiDerece>1</yetkiDerece>
  </Uye>
  <Uye uye_id=”3”>
    <adi>Yaşar</adi>
    <soyadi>GÖZÜDELİ</soyadi>
    <email>ygozudeli@verivizyon.com</email>
    <yetkiDerece>1</yetkiDerece>
  </Uye>
</Uyeler>

```
**<?xml version="1.0" encoding="ISO-8859-9" ?>** bu satır başlangıç etiketidir ve kapanış etiketi yoktur. Üç adet özniteliği vardır ve “version” özniteliği verilmek zorundadır. “version” özniteliği XML dosyasının versiyonunu belirtir ve bu bilgi dokümanı parse(okuma) edecek uygulama için gereklidir. “encoding” özniteliği doküman içerisindeki dil seçeneğini belirtmek için kullanılır. Ben burada Türkçe dil setini kullandım.

**<Uyeler> </Uyeler>** etiketi ise kök (root) etikettir ve XLM dokümanın da en az bir tane bulunmak zorundadır. Bu etiket diğer bütün etiketleri içerisine almak zorundadır.

**<Uye uye_id="..."> </Uye>** etiketi çocuk (child) etiket olarak isimlendirilir ve element olarakta bilinir. Buradaki uye_id bir özniteliktir ve öznitelik değerleri “” arasında verilmek zorundadır.

**Genel kuralları belirtmek gerekirse;**

*   *   *   XML dokümanında her alan bir etiket çifti arasında belirtilir ve açılan her etiket kapatılmak zorundadır.
        *   Etiketler büyük küçük harf (case sensitivity) duyarlıdır.
        *   Bir element içerisinde başka bir element açılmış ise o element kapanmadan diğeri kapatılamaz, yani hiyerarşi bozulamaz.
        *   XML'de boşluk karakteri (white space) göz önüne alınır.
        *   <, >, ", ', & bu karakterler XML içerisinde kullanılamaz. Bunların yarine sırasıyla < yerine **&lt;**, > yerine **&gt;**, " yerine **"**, ' yerine **&apos;**, & yerine **&amp;** kullanılmalıdır.
        *   Doküman içerisinde en az bir element olmalıdır.

Tüm bu kurallara uyarak oluşturulmuş dokümanlara iyi yapılanmış anlamında, “well-formed” adı verilir.

**XML hakkında daha detaylı bilgi için :**

› [http://www.softwareag.com/turkiye/XML_Kutuphanesi/](http://www.softwareag.com/turkiye/XML_Kutuphanesi/) › [http://www.w3.org/XML/](http://www.w3.org/XML/) › [http://www.w3schools.com/xml/](http://www.w3schools.com/xml/) › [http://xml.silmaril.ie/](http://xml.silmaril.ie/)

kaynaklarını kurcalamanızı tavsiye ederim.

**Hazırlayan :** Yahya ÖZTÜRK **Kaynak :** Verivizyon