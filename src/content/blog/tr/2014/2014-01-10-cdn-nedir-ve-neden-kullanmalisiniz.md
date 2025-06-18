---
title: "CDN nedir ve neden kullanmalısınız?"
description: "CDN (İçerik Dağıtım Ağı) nedir, statik içerikler için neden önemlidir ve web sitenizin performansını nasıl artırır? Popüler kütüphaneler için CDN servislerini keşfedin."
slug: cdn-nedir-ve-neden-kullanmalisiniz
date: 2014-01-10
url: http://mfyz.com/tr/cdn-nedir-ve-neden-kullanmalisiniz/
tags: ["cdn", "performans", "javascript", "css", "web geliştirme", "statik içerik"]
category: 
migration: {"wpId":359,"wpPostDate":"2014-01-10T16:22:12.000Z"}
lang: tr
---

CDN: **Content Delivery Network**'ün kısaltması ve **İçerik Dağıtım Ağı** olarak Türkçe'ye çevirebilecek bir kavram. CDN'ler, statik içeriklerinizin normalde daha hızlı tarayıcıya ulaştırılması için düşünülmüş bir dağıtım yapısıdır.

## Statik içerik nedir?

Statik içerik grubuna, javascript, css, görseller, statik html dosyaları gibi, bir sunucu programlama dili ile dinamik şekilde oluşturulmayan tüm içerikleri dahil edebilirsiniz. Bir kere hazırlanıp sunucuya konduktan sonra değişmeyeceği planlanan içerikleri, farklı coğrafyalardaki veri merkezlerine dağıtarak, kullanıcılara daha hızlı iletmeyi amaçlayan içerik dağıtım ağları sadece bulut servis sağlayıcıları tarafından sağlanıyor.

Basitçe, iki tür CDN vardır, biri genel amaçlara yönelik tasarlanan, herkese açık ve dökümante edilmiş CDN'ler, diğeri de özel tasarlanmış ve genellikle kapalı kullanım için tasarlanmış olanlardır.

İkinci model, ileri aşamada yapacağınız bir geliştirme olacağı için şu an detaylarına girmeyeceğim. Size bu yazıda, özetle ilk model açıklayıp örnekleyeceğim. İlk modeli kullandığınız kütüphane bazlı projeler (örnegin jQuery, twitter bootstrap, angular, backbone...) kendi networkleri aracılığıyla sağlıyorlar veya google, microsoft gibi büyük bulut servis sağlayıcıları, birden fazla projeyi içeren herkese açık CDN servisleri sağlıyorlar.

## Nasıl çalışıyor?

Bir websitesi hazırladınız; arayüzü twitter bootstrap ile şekillendirdiniz; jQuery kullanan birkaç kütüphane ile sitenizi interaktifleştirdiniz ve fontwesome kullanarak da elementlerinize semboller ekleyerek arayüzünüzü güçlendirdiniz. Bu kütüphanelerden bazısı sadece tek bir javascript dosyası, bazısı da css ve başka formatlarda dosyalar kullanmanızı gerektiriyor. Normalde, bütün bu dosyaları geliştirme ortamınızda sitenizin asıl dosyaları ile beraber sunmanız ve öyle kullanmanız gerekiyor.

Sitenize giren kullanıcı, tarayıcıda bir sayfa bile ziyaret etse hem sayfanızı istiyor hem de bütün javascriptleri, kütüphaneleri, görselleri, css stil dosyalarını istiyor. Sayfanızı her halükarda sunmak zorundasınız ancak sayfanızda kullandığınız statik dosyaları bu CDN servislerinden adresleyerek tarayıcıların o kütüphaneleri o servislerin domainlerinden indirmesini sağlayabilirsiniz. Bu servisler bu statik dosyaları olabilecek en hızlı şekilde sunmak üzere tasarlandıkları için her zaman sizden daha iyi çalışacaklardır. Ayrıca fakrlı bir domainde oldukları için daha önce yüklenmeye başlayacaklar (parallel download) ve muhtemelen başka bir sitede kullanıcı o dosyayı daha önce indirdiği ve uzun cache periyodlarıyla kullanıcının bilgisayarında saklandıkları için de muhtemelen tekrar indirilmeden doğrudan tarayıcıya yükleneceklerdir. Sitenizde belirli bir kutuphane icin CDN kullanmak için:

```html
<script src="js/jquery-2.0.2.min.js"></script>
```

yerine

```html
<script src="http://code.jquery.com/jquery-2.0.2.min.js"></script>
```

kullanmanız yeterli olacak. Gördüğünüz gibi bu jquery'e özel tanımlanmış bir CDN adresi. Herkese açık ve birden fazla kütühane içeren ortak CDN servislerini tercih etmeniz daha iyi performans almanızı sağlayabilir.

Sonuç olarak bu servisler sadece bu amaca hizmet etmek için çalıştıkları için siz sitenizi veya bu statik içeriklerinizi ne kadar optimize ederseniz edin en iyi ihtimalle onlara yakın, çoğu zaman daha düşük bir performansta çalışacağı için CDN'leri kullanarak zaman ve performans kazanabilirsiniz.

## Peki, hangi servis?

Ufak bir araştırma ile herkese açık bir çok CDN servisi bulabilirsiniz hem de kafanızı karıştıracak miktarda. Aralarından en çok kütüphaneyi bir arada bulabileceğiniz bir tanesini tavsiye edip bitireceğim. Cloudflare'in bir çok popüler kütüphaneyi içeren herkese açık CDN servisini kullanarak büyük dağıtma ağına sahip performansından yararlanabilirsiniz.

http://cdnjs.com adresinden kullanmak istediğiniz kütüphaneyi seçip kullandığınız sürümüne ait adresini kodunuzdaki adreslemeyle değiştirebilirsiniz.