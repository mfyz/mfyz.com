---
title: "LESS ile Hiyerarşik ve Fonksiyonel CSS Yazmak"
description: "LESS kullanarak CSS dosyalarınızı nasıl daha hiyerarşik ve fonksiyonel bir yapıda yazabileceğinizi, değişkenler, mixin'ler gibi özelliklerden nasıl faydalanabileceğinizi ve LESS dosyalarınızı CSS'e derleme yöntemlerini öğrenin."
slug: less-ile-hiyerarsik-ve-fonksiyonel-css-yazmak
date: 2011-11-13
url: http://mfyz.com/tr/less-ile-hiyerarsik-ve-fonksiyonel-css-yazmak/
tags: ["less", "css", "css preprocessor", "frontend", "web geliştirme", "hiyerarşik css", "fonksiyonel css"]
category: Arayüz Programlama
migration: {"wpId":158,"wpPostDate":"2011-11-13T15:00:28.000Z"}
lang: tr
---

LESS bir çeşit css derleyicisi ve aslında css sytax'ı üstüne ek özelliklerin eklenmiş olduğu bir araç. Çıktığı dönemden beri bütün projelerimde less dosyaları ile çalışıyorum ve son dönemdeki birkaç uygulama sayesinde çok daha kolay kullanılabilir olmasından dolayı herkese öneriyorum.

#### Neden LESS kullanmalısınız?

Aslında LESS kullanmak için genel ve çok önemli ihtiyaç yok bana kalırsa. Fakat artık web uygulamaları eskisi gibi basit veya küçük css dosyaları ile şekillendirilen uygulamalar olmaktan çıktılar. Güçlü css seçicileri olsa bile her (grup) element için bir sınıf tanımladığınızı düşünürseniz orta ölçekli bir stil dosyası binlerce satıra ulaşması çok normal.

Dosyanızın uzunluğundan çok iç içe tanımlı grup tanımlaları arasında kaybolmak çok kolay. Dolayısıyla css dosyanızı hiyerarşik bir şekilde organize edecek bir araca sahip olmak her zaman bir artı. Sadece bu ihtiyacınızı kullandığınız gelişitirici uygulamayı degiştirerek sağlamak da mümkün.

Örneğin çok basit bir css dosyanızda
```css
ul.menu {
    margin: 0;
}
ul.menu li.item {
    margin 0;
    padding: 0;
    list-style: none;
    height: 30px;
}
ul.menu li.item a {
    display: block;
    float: left;
    height: 30px;
    width: 200px;
    padding: 5px 10px;
}
ul.menu li.item a:hover {
    color: red;
}
ul.menu li.item a span.icon {
    display: block;
    float: left;
    width: 30px;
    height: 30px;
}
ul.menu li.item a:hover span.icon {
    background: blue;
}

```
Böyle bir CSS yapısı sık sık yazdığınız bir navigasyon kodu olabilir. Böyle bir yapı, tipik hiyerarşik modele uygun bir örnek. Böyle bir yapıyı LESS ile daha anlaşılır yazmak mümkün:
```css
ul.menu {
    margin: 0;
    
    li.item {
        margin 0;
        padding: 0;
        list-style: none;
        height: 30px;
        
        a {
            display: block;
            float: left;
            height: 30px;
            width: 200px;
            padding: 5px 10px;
            
            span.icon {
                display: block;
                float: left;
                width: 30px;
                height: 30px;
            }
            
            &:hover {
                color: red;
                
                span.icon {
                    background: #efefef;
                }
            }
        }
    }
}

```
Gördüğünüz gibi herşey doğru şekilde indent edilmiş ve & gibi referanslar ile bütün css kurallarınızı hiyerarşik hale getirmeniz kolay. Böyle bir yapının sınıf isimlerinden bağımsızlaşması da işinizi kolaylaştıracaktır.

LESS'in diğer birkaç özelliği gercekten alışkanlık yapmaya yeterli. Eğer bir arayüz tasarımcısıysanız genelde matematiksel veya mimari modellere, gridlerle calışıyor olmalısınız. Aynı şeyler tipografi kuralları için de geçerli. Görsel her öğe bir şekilde birbirleriyle çok doğru orantılılar. Font boyutları, renkler vs.

Mesela font boyutunuz 16px iken satır aralığınız bunun 1.5 katı, padding'leriniz 1.5 katı belki koyduğunuz arayüz kuralına göre de kenarlıklarınız 0.2 katı olabilir veya ürettiğiniz grid arayüzünde bir grid genişliğini tanımlayıp sidebarınızı 2 kolon, ana içerik alanınızı 10 kolon olarak ayarlamış olabilirsiniz. Bunları düz CSS'de hesaplayıp tanımlamak durumundasınız.

Kuralların bu kadar net belirlenebildiği bir ortamda CSS'de statik renk kodlarına, sürekli hesaplama yaparak font boyutu, padding, margin, border radius hesaplamak zorunda kalıyor olabilirsiniz. LESS size bu matematiği LESS dosyanız içinde yapmanızı sağlıyor. Bir rengi belli bir contrast değeriyle daha açık veya daha koyu bir renge dönüştürebilir, matematiksel değerleri formülasyona sokabilir veya başka sınıfları kendi sınıfınıza dahil edebilirsiniz.

Örnek vermek gerekirse siteniz için genel bir oran ve başlangıç rakamı belirleyebilirsiniz, veya 3-4 renkten oluşan bir renk paletiniz var olabilir. Düz CSS'de her varyasyonu hesaplayarak yazmak zorunda kalabilirisiniz:
```css
div.user {
    width: 400px;
    height: 100px;
    font-size: 18px;
    line-height: 27px;
    color: #f00;
    padding: 10px;
    margin: 5px; /* normal ic genisligin yarisi */
    background: #ccc;
    border-radius: 5px; /* normal ic genisligin yarisi */
}
div.user span.info {
    color: #f66; /* acik kirmizi */
    font-size: 12px /* normal font boyutunun 2/3'u */
}
div.user div.avatar {
    width: 300px; /* user sinifinin 3/4 boyutu */
    height: 75px; /* user sinifinin 3/4 boyutu */
    border: 1px /* ic genisligin 1/10'u */
}

```
Yorumlarda kurallari yazmaya çalıştım ve normalde bir arayüz tasarımcısı böyle arayüzler geliştirirken bu tarz kurallara sahiptir, en büyük örnegini Apple arayüzlerinde görebilirsiniz. Mimari bir ürün gibidir.

Böyle kurallarla donatılmış bir arayüzün css'lerini yazarken her değeri hesaplamak zorunda kalabilirsiniz fakat LESS ile bu işlemlerin hepsini matematiksel olarak hesaplatmanız mümkün. Yukarıdaki örnek çok küçük bir örnek ama büyük bir css dosyasını düşünürseniz başa çıkılamaz bir iş haline gelebilir. Ayrıca kuralları matematiksel yazmanın ikinci avantajı, bütün parametreleri birkaç değişken ile yönetip değiştirebilme olanağına sahip olmanızdır. Yukarıdaki örneğin LESS ile yazılmış hali:
```css
@fontSize: 18px;
@mainColor: #f00;
@padding: 10px;
@width: 400px;
@height: 100px;
div.user {
    width: @width;
    height: @height;
    font-size: @font-size;
    line-height: @font-size * 1.5; /* font boyutunun 1.5 kati */
    color: #mainColor;
    padding: @padding;
    margin: @padding / 2; /* normal ic genisligin yarisi */
    background: #ccc;
    border-radius: @padding / 2;
    
    span.info {
        color: lighten(@mainColor, 10%); /* orjinal renging %10 acik rengi */
        font-size: @fontSize * 2 / 3
    }
    
    div.avatar {
        width: @width * 3 / 4;    /* user sinifinin 3/4 boyutu */
        height: @height * 3 / 4;  /* user sinifinin 3/4 boyutu */
        border: @padding / 10     /* ic genisligin 1/10'u */
    }
}

```
Bu özellikleri çok kullanabilirsiniz fakat daha hiyerarşik bir yapıda ortak kullanılan parçaları gruplamak isteyebilirsiniz hatta bazı grupları parametrik olarak değiştirebilmeyi isteyebilirsiniz.

Örneğin bir kutu modeli ürettiniz, kenarları köşeli, içindeki h1 başlığını şekillendirdiniz ve bu kutu modelinin farklı boyutlarını ve renklerini üretiyorsunuz sürekli. Genel kutu modelinizde kullandığınız tipografik tanımlamaları, kenar boşluğu kurallarını tekrar tekrar yazmak istemiyorsunuz.

Ya da CSS3 kurallarının farklı tarayiıcılarla çalışması için yazmanız gereken 4 farklı kuralı farklı değerlerle sürekli tekrarlamak yerine fonksiyon şeklinde tanımlayıp LESS'e ürettirebilirsiniz.

Bunu açıklamak için CSS örnegi yazacağım son olarak.
```css
.kutu_gri_buyuk {
    padding: 20px;
    border: 2px solid #666;
    font: 12px Georgia;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;    
    border-radius: 5px;
}
.kutu_gri_buyuk h1 {
    font-size: 18px;
}
.kutu_gri_kucuk {
    padding: 10px;
    border: 1px solid #666;
    font: 11px Georgia;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;    
    border-radius: 3px;
}
.kutu_gri_kucuk h1 {
    font-size: 15px;
}
.kutu_mavi_buyuk {
    padding: 20px;
    border: 2px solid #00f;
    font: 12px Georgia;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;    
    border-radius: 5px;
}
.kutu_mavi_buyuk h1 {
    font-size: 18px;
}
.kutu_mavi_kucuk {
    padding: 10px;
    border: 1px solid #00f;
    font: 11px Georgia;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;    
    border-radius: 3px;
}
.kutu_mavi_kucuk h1 {
    font-size: 15px;
}

```
Bu ornegin LESS ile hazirlayabileceginiz versiyonu.
```less
.borderRadius(@radius: 5px){
    -webkit-border-radius: @radius;
    -moz-border-radius: @radius;    
    border-radius: @radius;
}
.kutu(@fontSize: 12px, @headerFontSize: 18px, 
    @borderSize: 2px, @borderColor: #666, 
    @padding: 20px, @radius: 5px){
    
    padding: @padding;
    border: @borderSize solid @borderColor;
    font: @fontSize Georgia;
    .borderRadius(@radius);
    
    h1 {
        font-size: @headerFontSize;
    }
}
.kutu_gri_buyuk  { .kutu(12px, 18px, 2px, #666, 20px, 5px); }
.kutu_gri_kucuk  { .kutu(11px, 15px, 1px, #666, 10px, 3px); }
.kutu_mavi_buyuk { .kutu(12px, 18px, 2px, #00f, 20px, 5px); }
.kutu_mavi_kucuk { .kutu(11px, 15px, 1px, #00f, 10px, 3px); }

```
Bu örnek yukarıdaki CSS'i üretecektir. Gördüğünüz gibi borderRadius tanımlarını da bir fonsiyon olarak tanımlayıp kullandım. Bunu yapmadan doğrudan kutu tanımlaması içinde de kullanabilirdim. Fakat uygulamanız içindeki tüm border radius kullanımınızı bu fonksiyon üzerinden ürettirebilirsiniz.

Son olarak, yazdığınız LESS dosyalarınızı css'e render ettirmenin bir çok yolu olduğunu unutmayın. Bunun için kullanıcının tarayıcısında javascript ile derletebilir, php veya diğer sunucu taraflı kütüphanelerle sunucunuzda derletip css'leri sunabilir veya LESS.app gibi uygulamalarla masaustünüzde yazarken eş zamanlı olarak css'lere derletip kullanabilirsiniz.