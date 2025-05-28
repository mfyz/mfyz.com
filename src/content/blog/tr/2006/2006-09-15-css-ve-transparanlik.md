---
title: "CSS ve Transparanlık"
slug: css-ve-transparanlik
date: 2006-09-15
url: http://mfyz.com/tr/css-ve-transparanlik/
tags: ["Arayüz Programlama","css","opacity","saydamlık","transparanlık","transparent"]
category: Arayüz Programlama
migration: {"wpId":116,"wpPostDate":"2006-09-15T15:18:36.000Z"}
lang: tr
---

> CSS'de kullanacağınız transparanlık kuralları web standartlarına göre geçersizdir. Bu kurallar css dosyanızın geçersiz sayılmasına neden olacaktır. Eğer transparanlık kullanmak zorundaysanız javascript ile ayarlayarak css dosyalarınızın stabilitesini korur ve transparanlığı uygulamış olursunuz. En pratik çözüm olarak mootools'u öneriyorum.

Bazı web sayfalarında scriptler ile veya bazı nesnelerin yarı-saydam olduğunu görmüşsünüzdür. Bakınız sitedeki hata pop-upları, ipucu kutucukları (fade-in ve fade-out olması da bu methodla yapılıyor).

Bu nitelik, yani objelerin transparan olması tarayıcıların destekledikleri filtrelerdir. Modern internet tarayıcıları şu an bu niteliği barındırıyorlar. Mozilla, Firefox, Safari (KHTML motoru olduğundan Konqueror da destekler), Internet Explorer (5.5'den sonra desteklemeye başladı) ve Opera (9'dan sonra desteklemeye başladı).

Fakat tarayıcılar kendi filtre erişimlerine göre farklılık göstrerir. Fakat bazıları da ortak.

Bu nitelik tabiki CSS ile yönetiliyor ve biz de kullanırken CSS ile yapacağız. Fakat biliyorsunuz ki javascript ile css stilleri ile oynayabilirsiniz, dökümanın ilerleyen kısımlarında JavaScriptlerinizde transparanlığı yöneterek nasıl geçiş efektleri uygulayacaksınız onu göstereceğim.

CSS ile class atanmış bir objenin saydamlığını değiştirelim :
```css
.transparan {
  opacity : 0.5;
  filter : alpha( Opacity=50 );
  -moz-opacity : 0.5;
}

```
Bu kodda “transparan” sınıflı nesneler 50% saydam görünecektir. Tabiki block level elementler olması gerekir bu objelerin.

**filter : alpha( Opacity=50 );** Internet Explorer ve Opera 9+ tarayıcılarda transparanlığı sağlayacaktır.

**opacity : 0.5;** Mozilla, Firefox, Safari, Konqueror tarayıcılarında transparanlığı sağlayacaktır.

**\-moz-opacity : 0.5;** Bu gereksiz bir koddur fakat bilmeniz açısından yer veriyorum, Mozilla ve türevi tarayıcılar daha önceden böyle transparanlık sağlıyordu. Artık doğrudan “opacity” özniteliğini de destekliyor.

#### JavaScript ile nasıl?

Kodunuzda interval koyarak belirli sürede 1'er 1'er veya 5'er 5'er opacity düştüğünüzü varsayarsak
```js
document.getElementById("nesne_id").style.opacity = '0.' + deger;
document.getElementById("nesne_id").style.filter = 'alpha(Opacity=' + deger + ')';

```
nesne adreslemeleri ile obenin anlık transparanlığını değiştirebilirsiniz. Interval'in boyutuna göre nesne o hızda ya kaybolur ya da oluşur.

#### Mootools?

Transparanlığı javascript ile yapabiliyoruz fakat mootools ile tabiki hepsinden daha kolay yapılıyor :)
```js
// dogrudan transparanlık ayarlayabilir
$('nesne_id').setOpacity(0.5);

// veya geçiş efekti vererek yapabiliriz
$('nesne_id').effect('opacity').custom(0, 0.9);

```
Aynı zamanda Fx.Style ve çoğu Fx sınıfı fonksiyonlarında da rahatlıkla opacity tanımı kullanabilirsiniz.