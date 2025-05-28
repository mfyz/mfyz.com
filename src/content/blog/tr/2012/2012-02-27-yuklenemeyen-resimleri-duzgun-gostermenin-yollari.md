---
title: "Yüklenemeyen resimleri düzgün göstermenin yolları"
slug: yuklenemeyen-resimleri-duzgun-gostermenin-yollari
date: 2012-02-27
url: http://mfyz.com/tr/yuklenemeyen-resimleri-duzgun-gostermenin-yollari/
tags: ["Arayüz Programlama","fallback","image","javascript","jquery"]
category: Arayüz Programlama
migration: {"wpId":161,"wpPostDate":"2012-02-27T12:54:46.000Z"}
lang: tr
---

Bir web sayfasındaki yüklenmeyen resimleri çoğu zaman doğru yönetilmediği için bozuk resim olarak görüyoruz hatta bazen de tasarımın kaymasını, arayüzde bozukluklar olabiliyor.

Örnek bir senaryo: bir makele yazdınız ve internette başka bir sitedeki resimi kullandınız, 1 ay sonra resim o siteden kaldırıldığı zaman, veya site kapandığı zaman sizin sitenizdeki yazıda resimler bozuk görünecektir. Tabi ki bunun tek cözümü resimleri bulmaya çalışmak, ya da o şekilde bırakmak isteyebilirsiniz. Fakat siz bu değişiklikleri yapana kadar, sitenizde bozuk resim (yuklenemeyen) olarak görünecek.

Bir resim yükleyemediğinizde yapabileceğiniz birkaç şey var, birincisi yüklenmemiş resimleri ortadan kaldırabilirsiniz, ama resimler içerikle çok ilişkili ise, mesela yazınızda ekran görüntüsünden bahsediyorsanız ve oratada bir ekran görüntusü yoksa resmin bozuk görünmesinden daha büyük bir yanlış anlaşılma ile karşılaşabilirsiniz. Resmi kaldırabilir veya jenerik bir "yuklenemis resim" imaji gösterebilirsiniz.

Eğer kaldırmak istiyorsanız img etiketi içindeki onerror özelliğinde resminizi kaldırabilirsiniz.

Not: Sayfanızda jQuery kullanıldığını varsayıyorum.
```html
<img src=""..."" alt="""" />
```
Böylece resminiz yüklenmede başarısız olursa ortadan kaldırılacaktır.

Eğer jenerik bir resime çevirmek istiyorsanız:
```html
<img src=""..."" alt="""" />
```
Bu örnekler sadece tek imaj için yazılmış örnekler,

Eğer tüm sayfanıza etki edecek daha jenerik bir uygulama yapmak için;
```js
$(function(){
  $('img').bind('error', function(){
    //$(this).remove();
    // or
    $(this).attr('src', 'basarisiz.png');
  });
});

```
Ancak böyle bir uygulamada sitenizdeki tüm imajlar etkileneceği için tasarımınızı şekillendiren imajların bundan etkilenmesini istemeyebilirsiniz. Bunu yapmak için de jquery seçicisini kısıtlandırabilirsiniz: "img.hatadaKaldir" veya ".yazi img"