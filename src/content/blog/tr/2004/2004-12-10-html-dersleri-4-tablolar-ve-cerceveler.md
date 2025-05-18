---
title: "HTML Dersleri (4) : Tablolar ve çerçeveler"
slug: html-dersleri-4-tablolar-ve-cerceveler
date: 2004-12-10
url: http://mfyz.com/tr/html-dersleri-4-tablolar-ve-cerceveler/
tags: ["Arayüz Programlama","çerçeve","frame","html","iframe","table","tablo"]
category: Arayüz Programlama
migration: {"wpId":106,"wpPostDate":"2004-12-10T21:05:11.000Z"}
lang: tr
---

## Tablolar

Ana tablo etiketleri 3 tanedir, tablo tanımı, tablo satırı ve tablo hücresi.

#### table

Boş bir tabloyu ifade eder. içerisine girilen satır, sütun kuralları ile tabloyu oluşturur. Tablo hakkında genel bilgileri, ayarları içerir. Argümanları şöyle

**bgcolor** artalan rengini, **cellpadding** tablo hücrelerindeki kenar boşluklarını, **cellspacing** tablo hücrelerinin birbirleri arasındaki boşluğu, **border** tablo ve hücrelerini belirleyen çerçeveyi ayarlar.

#### tr (Table Row : Tablo Satırı)

Tabloda satırlar eklemeden sütun ekleyemezsiniz. Her sütun bulunması gereken satırın içerisinde yer alamalıdır. Satırdaki ortak özellikleri tr etiketinin parametreleri ile düzenleyebilirsiniz (örneğin, artalan rengini).

#### td (Table Data : Tablo Hücresi)

Tablodaki hücreler için tanımlanması gereken son etikettir. İçinde bulunduğu satırda bir sütunu ifade eder.

Örnek tablo yapısı;
```
<table border="1" cellpadding="5">
  <tr bgcolor="#CCCCCC">
    <td bgcolor="#FFFFFF">
      1.Sütun
    </td>
    <td>2.Sütun</td>
    <td>3.Sütun</td>
  </tr>
</table>

```
Öncelikle çerçevesi geçerli renk ve stilde 1 piksellik boş tablo tanımlanıyor. 1 satır, artalan gri olarak tanımlanıyor. 1. Sütunda artalan sadece o hücre için beyaz belirleniyor. Diğer sütunlarda ise tr etiketinde tanımlanan gri renk artalan olarak belirlenmiş oluyor. Yukarıdaki kodun çıktısı ;

1.Sütun

2.Sütun

3.Sütun

**Önemli NOT :** Her satırdaki sütun sayısı eşit olmalıdır. Eşit olmayan tabloların yapısı bozuktur.

Bir hücre kendi dengindeki hücrelerden kapsaması gereken kadar hücreyi td etiketinde [cospan ve rowspan](http://www.htmlcodetutorial.com/tables/index_famsupp_30.html) parametreleri belirtilerek ayarlanabilir.

## Çerçeveler

Çerçeveler konusunda tek önerim, iç çerçeveler dışında çerçeve tekniği kullanmamanız doğrultusunda olacaktır. İç çerçeveler sayfalarda resim gibi belirli bir alan kaplayan ve o alan içerisinde sanki tarayıcı penceresi oraya sığdırılmış gibi görüntülenir. Eğer çok kolonlu veya çok satırlı sayfalar yapmak istiyorsanız tablo yapısını kullanarak öncelikle iç çerçeveleri sığdıracağımız alanı belirler, stillerle destekli iç çerçeve ekleyerek o çerçeveler içerisinde sayfalarımızı görüntüleriz. Bu işin normal methodunda ise neredeyse aynı mantığa sahip bir yapıyla, birden çok sayfa kullanırız. kod olarak aynı hatta daha fazla alan kaplayan dosyalar hazırlamış oluruz. Bana güvenin ve sadece bunu öğrenin. Örnek kod vermek gerekirse;
```
<iframe src="menu.htm" frameborder="0" width="100%" height="200">

```