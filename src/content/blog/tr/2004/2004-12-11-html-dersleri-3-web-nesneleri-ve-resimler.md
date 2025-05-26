---
title: "HTML Dersleri (3) : Web nesneleri ve resimler"
slug: html-dersleri-3-web-nesneleri-ve-resimler
date: 2004-12-11
url: http://mfyz.com/tr/html-dersleri-3-web-nesneleri-ve-resimler/
tags: ["Arayüz Programlama","html","img","nesne","object","resim"]
category: Arayüz Programlama
migration: {"wpId":105,"wpPostDate":"2004-12-11T21:41:52.000Z"}
lang: tr
---

### img (Resim)

Gif, jpeg veya png resmi görüntülemek için kullanılır.

**src** argümanı ile resmin adresi belirtilir. **border** argümanı ile köprü etiketleri içerisinde kalan resimlerde, belirtilen piksel boyutunda, geçerli köprü renginde çerçeve oluşturur. **alt** argümanı ile resim yüklenirken kapladığı alanın arkasında burada belirttiğiniz metin görüntülenir. Resim yüklenirken resim hakkında bilgi verir. Resim yüklendikten sonra yazı resmin arkasınsda kalır, yani görünmez. Web standartlarına göre img etiketi için alt argümanı zorunludur. İçi boş olsa bile kullanın.

Örneğin;

```html
<img src="http://www.google.com.tr/intl/en_com/images/logo_plain.png"
  alt="Google Logosu" border="0" />
```

Çıktı :

![](http://www.google.com.tr/intl/en_com/images/logo_plain.png)

### hr (Horizontal Rule : Çizgi)

Sayfa boyunca yatay bir çizgi belirler. Geçerli olarak 2 değerine sahip, size parametresi ile yüksekliğini belirleyebilirsiniz.

### embed

Ortam yüklemek ya da bilgi görüntülemek için eklenti nesnesi kullanır. src özelliği kullanarak nesne ekleyebilirsiniz. Mesela quicktime filmi eklemek, flash animasyonu eklemek için bu öğeyi kullanırız.

Örnek ;

```html
<embed src="baslangic.wav" hidden="true" autostart="true" volume="50" loop="false" />
```

Sayfa açıldığında otomatik olarak baslangic.wav dosyasını 1 kerelik 50% ses düzeyinde çalar.

veya

```html
<embed src="intro.mov" width="500" height="300" autoplay="true"
  controller="false" type="video/quicktime"
  pluginspage="http://www.apple.com/quicktime/" />
```

intro.mov adlı quicktime filmini kontroller olmadan 500x300 boyutunda otomarik olarak oynatır. Eğer quicktime yoksa yeni pencerede belirtilen eklenti sayfasını açar.