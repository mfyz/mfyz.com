---
title: "Mootools ile ipucu açıklamaları (tooltip)"
slug: mootools-ile-ipucu-aciklamalari-tooltip
date: 2008-02-06
url: http://mfyz.com/tr/mootools-ile-ipucu-aciklamalari-tooltip/
tags: ["Arayüz Programlama","ipucu","mootools","tooltip"]
category: Arayüz Programlama
migration: {"wpId":127,"wpPostDate":"2008-02-06T00:24:47.000Z"}
lang: tr
---

#### İpucu Açıklaması?

mfyz.com'da oldukça fazla gördüğünüz açıklama kutucukları var. Bir nesnenin (resim, buton, yazı, bağlantı) üzerine geldiğinizde açıklama olarak görünen ve fare imlecini takip eden kutulardan bahsediyorum.

Önceki versiyonlarda bu açıklama kutuları hem daha farklı idi hem de kendi yazdığım bir ufak kütüphaneyi kullanıyordu. Ancak kütüphane her ne kadar tüm tarayıcılarda çalışma destekli (crossbrowser) olsa da problemler yaşıyordum kodlarken. Aynı şekilde sadece ipucu eklemek için bile html'i oldukça kirletiyordum.

v0.7 ile mootools çatısı (framework) üzerinde çalışmaya başladım. Bu süreçte mootools'daki birçok eklentiyi kullandım. Bunlardan birisi de ipucu eklentisi. Tips.js olarak geçiyor.

Mootools'un Tips.js dökümantasyonuna erişmek için: http://docs.mootools.net/Plugins/Tips.js

Bu dökümanda bu ipucu kutucularının yapımı, ayarlanması ve stille desteklenmesini anlatacağım.

#### Nasıl çalışıyor?

Eski kütüphaneyi (ipucu) hatırlayanlar bilir, bir nesneye ipucu eklemek için ona onMouseOver ve Out gibi olaylarına tanımladığımız fonksiyonlarla ve parametrelerle bu işi yapabiliriz. Fakat mootools'da css adresilerindeki elemanları seçebilme özelliği var. Aslında tips kütüphanesinin yaptığı iş, verilen adreslerdeki tüm elemanlara MouseOver ve MouseOut olayları eklemek. Bu olaylarına atanan fonksiyonlarla da bu kutucukları fare imlecine göre göstermek. Ama bunu oldukça pratik bir şekilde yapıyor.

İpucu eklemek istediğimiz nesneleri "ipucu" adında bir sınıfta toplayalım, Yani css sınıfı olarak "ipucu" sınıfı ekleyelim.

Örneğin :

```
<a href="http://www.mfyz.com" target="_blank">www.mfyz.com</a>

```
olan nesneyi

```
<a href="http://www.mfyz.com" target="_blank" class="ipucu" title="MFYZ.Com">www.mfyz.com</a>

```

şeklinde ipucu sınıfına dahil edip "<b>title</b>" argümanı olarak bir açıklama ekledik. Hatta bu açıklama içerisinde html etiketleri bile kullanabiliriz. (Tırnak kurallarına uygun olduğu sürece sorun çıkarmaz)

```
<a href="http://www.mfyz.com" target="_blank" class="ipucu"
   title="<b>MFYZ.Com</b> <br>Yeni pencerede açılır">www.mfyz.com</a>

```

Bu işlemi sadece bağlantılarda değil tüm html nesnelerinde uygulayabiliriz. Resimler, butonlar, yazılar vs.

Şimdi mootools Tips kütüphanesiyle ipucu tanımlayalım. (Bu tanımları mootools'u include ettikten sonrak bir javascript dosyanızda veya html dosyanızdaki bir javascript bloğuna koyarak yapın.)

```
var Ipuclari = new Tips( $('.ipucu') );

```

new Tips tanımı içerisinde ilk parametre (zorunlu) ipucu uygulanacak nesneleri belirliyor. Mootools'un nesne seçicilerini kullanarak CSS adresine göre yani .ipucu belirteci ile ipucu sınıfındaki tüm nesneleri gösteriyoruz.

```
var Ipuclari = new Tips($('.ipucu'), {
  showDelay: 400,
  hideDelay: 400
});

```

ikinci parametre ile de bir ayar dizesi (nesne olarak) belirtiyoruz. Parametreler hakkında detaylı bilgiyi [dökümantasyonundan]("http://docs.mootools.net/Plugins/Tips.js") edinebilirsiniz.

Ya da geçiş efekti uygulatarak gösterip-gizlemek isterseniz :

```
var Ipuclari = new Tips($('.ipucu'), {
  initialize:function(){
    this.fx = new Fx.Style(this.toolTip, 'opacity', {duration: 500, wait: false}).set(0);
  },
  onShow: function(toolTip) {
    this.fx.start(1);
  },
  onHide: function(toolTip) {
    this.fx.start(0);
  }
});

```

Bu kod ile 500 milisaniyede transparanlıkla gösterebilir veya gizleyebilirsiniz.

#### Peki nasıl görünecek, görünümünü nasıl değiştireceğim?

Tabiki css ile yapacağız. Ayar parametrelerinden **className** parametresi ile ipucu için çizdirilen html nesnelerinin sınıf adlarının başlangıcını değiştirebilirsiniz. Eğer değer vermezseniz varsayılan olarak bu sınıfların adlarının başlangıcı "tool" olacaktır.

Bu sitede kullandığım stile göre örnek vermek istiyorum, ben className kullanmadım. Yani varsayılan olarak "tool" ile başlıyor.

```
.tool-tip {
  background-color: black;
  padding: 5px 8px;
  z-index: 10000;
}

.tool-text, .tool-text * {
  font-size: 11px;
  color: white;
}

.tool-title {
  display: none;
}

```

Bu stilde değiştirmeye çalışılan html kodu aslında şöyle, yani Tips eklentisi html'e şu kısmı sonradan dinamik olarak ekleyip ekranda gösteriyor.

```
<div style="position: absolute; top: 96px; left: 810px; visibility: hidden; opacity: 0;" class="tool-tip">
  <div>
    <div class="tool-title">
      <span>
        http://www.mfyz.com
      </span>
    </div>
    <div class="tool-text">
      <span>
        <b>MFYZ.Com</b> <br>
        Yeni pencerede açılır
      </span>
    </div>
  </div>
</div>

```

Ben link url'sini görüntülemek istemiyorum. tips eklentisi otomatik olarak ekliyor url'yi. Gizlemek için css'de display: none; yaptım. En dıştaki tool-tip çerçevesinin stillerini kutu olarak düşünürsek ayarlıyorum. Yazı için de tool-text sınıflı nesneyi düzenliyoruz.

Eğer className'e fatih değerini verseydik css sınıf adları fatih-tip, fatih-text, fatih-title gibi olacaktı. Bu tanımı farklı sınıflara farklı className ile yaparak farklı stillerde ipuçlarını aynı sayfada gösterebilirsiniz.

Tam örnek için http://demos.mootools.net/Tips adresindeki demoyu inceleyebilirsiniz.