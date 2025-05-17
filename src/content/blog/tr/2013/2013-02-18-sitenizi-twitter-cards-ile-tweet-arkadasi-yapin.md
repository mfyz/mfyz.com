---
title: "Sitenizi Twitter Cards ile tweet arkadaşı yapın"
slug: sitenizi-twitter-cards-ile-tweet-arkadasi-yapin
date: 2013-02-18
url: http://mfyz.com/tr/sitenizi-twitter-cards-ile-tweet-arkadasi-yapin/
tags: ["Arayüz Programlama","cards","meta","share","twitter"]
category: Arayüz Programlama
migration: {"wpId":345,"wpPostDate":"2013-02-18T04:54:10.000Z"}
lang: tr
---

Web sayfanızı SEO taranabilirliği için meta ve belki facebook için de düzenlediniz diyelim. Amacınız sayfanızı tarayan google ve benzeri örümcekler/tarayıcıların sayfanız hakkında topladığı özet bilgisi tanımlamak. Çünkü google ve facebook sayfanızda ne çözebildiğini değil, sizin onlar için, sayfanızın ne anlama geldiğini söylemenizi istiyorlar. Bunun için de standart sayfa tanımlaması meta etiketlerine ek olarak facebook opengraph meta etiketlerini kullanarak, facebook örümceklerinin, özel olarak sayfa içeriğiniz hakkında daha detaylı bilgi almasını sağlayabiliyorsunuz. Facebook opengraph içerik (nesne) tanımlamalarını yıllar önce kullanıma sundu ve şu an bir çok popüler web sayfası bu meta etiketleri ekleyerek sayfalarının facebook'da nasıl göründüğünü bir nebze de olsa kontrol edebiliyorlar. Twitter da birkaç ay önce "Twitter Cards" adında bir grup meta tanımlaması kullanmaya başladığını yayınladı. Bunun asıl amacı, tweet'lerdeki linklerin ne anlama geldiklerini daha iyi çözebilmekti. Eğer twitter card meta etiketleriyle sayfa kimliği belirlenmiş bir sayfa url'i tweet ederseniz, o tweet genişletilebilir (expand) hale geliyor ve web sitesinde ve twitter'ın mobil uygulamalarında görüntülendiğinde tweet metni içindeki url'e ait sayfa detaylarını twitter card meta etiketleri aracılığıyla gösteriyor. Yani insanlar sayfanızı tweetlediklerinde siz twitter'a sayfanız hakkında daha detaylı bilgi sunabiliyorsunuz ve twitter bunu daha zengin içerik olarak kullanıcılarına sunuyor. Twitter card adını verdikleri bu link açıklayıcı meta etiketleri, opengraph'e benzer şekilde başlık, açıklama ve açıklayıcı görsel ile bir linki özetleyen bir bilgi sunuyor. Aşağıda twitter card destekleyen bir link paylaşılmış bir tweet'in web'de nasıl göründüğünü görebilirsiniz. ![](/images/archive/tr/2013/02/twitter-cards.jpg) Twitter card detayları tabi ki varsayılan biçimde görüntülenmiyorlar ancak kullanıcı, mobilde tweet'e dokunursa veya web'de expand butonuna basarsa twitter card detayları görüntüleniyor. Sitenizin tüm sayfalarını twitter card ile desteklemek zorunda değilsiniz. Ancak blog yazısı gibi çoğunlukla metin ağırlıklı bir içerik, video veya fotoğraf gibi bir içeriğiniz var ise bu içeriğin paylaşılma ihtimali daha yüksek olacağından bu sayfalara twitter card metaları eklemek daha anlamlı olacaktır. Zaten twitter içerikleri bu üç kategoride grupluyor ve bunu da twitter card türü olarak tanımlamanızı istiyor. Twitter Card'ınızı hazırlamak için önce içeriğinizi özetleyecek 3 elementi tanımlamanız gerekiyor.

*   İçerik tam adresi (url)
*   İçerik başlığı
*   İçerik özeti - kısa metin
*   İçerik görseli (görselin tam url'i)

Bu öğeleri hazırladıktan sonra bu sayfalarda aşağıdaki meta etiketi grubunu head etiketi içine eklemeniz, sayfanızın twitter card'a sahip olmasına yetecektir.
```
<meta name="twitter:card" content="summary"/>
<meta name="twitter:url" content="http://mfyz.com/cozunurluge-gore-tasarlamayin"/>
<meta name="twitter:title" content="Çözünürlüğe göre tasarlamayın"/>
<meta name="twitter:description" content="Geçtiğimiz hafta, iOS geliştiricilerimizden biri, varolan iPhone uygulamamızı iPad'e sadece birkaç ayarla oynadıktna sonra derleyerek çalışır hale getirdi, sonuç tabi ki götü başı dağılmış bir uygulama, ama fonksiyonel. Tabi ki..."/>
<meta name="twitter:image" content="http://mfyz.com/resimler/gunluk/bitmpap-vector.jpg"/>
<meta name="twitter:creator" content="@mfyz"/>

```
Yukarıdaki kod genel bir metin ağırlıklı içeriğe sahip sayfayı özetleyen twitter card kodu. Dökümantasyonda fotoğraf yani tekil görsel ağırlıklı bir sayfa veya video tipi medya sunumu yapan bir sayfanın nasıl bir twitter card'a sahip olması gerektiğini ve bu türlere özel etiketlerin açıklamalarını ve örneklerini görebilirsiniz. https://dev.twitter.com/docs/cards adresinden erişebileceğiniz twitter card dökümantasyonu ayrıca twitter card meta etiketlerinin tüm listesini ve gerekli detaylı açıklamalarını veriyor. [https://cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator) adresinden de hazırladığınız twitter card'i sayfanızın url'ini girerek önizlemesini görüntüleyebilirsiniz. Bu araç aynı zamanda hataları görmenizi ve sayfanızın twitter card'ında bir sorun olup olmadığınızı anlamanıza yardımcı olacaktır.