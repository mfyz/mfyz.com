---
title: "Facebook paylaşım detaylarını kişiselleştirme"
slug: facebook-paylasim-detaylarini-kisisellestirme
date: 2010-04-20
url: http://mfyz.com/tr/facebook-paylasim-detaylarini-kisisellestirme/
tags: ["Arayüz Programlama","facebook","html","media","meta","paylaşım","share","social"]
category: Arayüz Programlama
migration: {"wpId":155,"wpPostDate":"2010-04-20T19:27:24.000Z"}
lang: tr
---

Biliyorsunuz Dünya'da Facebook kullanımında üçüncüyüz (2010 2. Çeyreğinde). Facebook kullanımı ve Türk milletinin facebook'da geçirdikleri vakit çok ve paylaşmayı seven bir millet olduğumuzdan her şeyi, sayfaları, etkinlikleri vs sürekli paylaşıyoruz. Link veriyor, video paylaşıyor, yorumlar yazıyoruz.

Şu an birçok kampanya şekillendirilirken sosyal medya entegrasyonu, sosyal medya yayılımı/dağıtımı düşünülerek tasarlanıyor. Hatta birçok kampanya sadece sosyal medya ile işler halde kurgulanıyor.

Neyse, bir web geliştiricisi olarak bir çok sayfa üretiyorsunuz, bunların paylaşılırken nasıl göründükleri, arama motoru, paylaşım botlarının sayfanızı otomatik olarak tanıdığını fakat nasıl tanıdığına belki dikkat etmiyorsunuz.

Facebook dışında metalardan görsel, video alan sosyal medya araçları var. Bu servisler aslında basit meta etiketlerindeki title, description, keywords bilgilerini kullanıyor fakat biliyorsunuz ki görsel ile desteklemek her zaman içeriğinizi daha zengin ve doğru gösterecektir. Aşağıda geniş bir örnek ile birkaç ek meta etiketi ile içeriğinizi botlara nasıl anlatacağınızı göstereceğim.

 

![](/images/archive/tr/2010/04/share.gif)

Yukarıda gördüğünüz önizleme, sayfanız paylaşıldığı zaman çıkan görsel ve metinlerdir. Facebook paylaşımları 3 parçadan oluşmaktadır. Sayfa görseli, başlığı ve açıklaması.

#### Görsel belirleme

Facebook sayfasında çıkan görsel eğer siz meta tagler ile belirlemediyseniz, sayfa içinde bulunan imajlardan otomatik olarak seçilir. Ama genellikle anlamsız imajlar ortaya çıkmaktadır. Bunu belirlemek için az sonra bir meta etiketi ile bir imaj göstereceğiz. Her sayfanız için özel bir görsel belirleyebileceğiniz gibi tüm siteyi anlatan tek bir görsel kullanarak da bu imajı belirleyebilirsiniz. Burada dikkat edeceğiniz nokta, kullanacağınız görselin boyutları arasındaki orandır. Facebook zaten sizin görselinizi resize edecektir fakat eğer belirttiğiniz görsel genişliği ile yüksekliği arasında katlarca fark varsa, yani fazla geniş veya fazla uzun görseller ise facebook bu görselleri görmezden gelecek ve resimsiz çıkacaktır. Genel bir görünüm oranı olan 4:3 veya 16:9 gibi resim formatlarını kullanabilirsiniz. Yani eni boyundan biraz daha uzun olan imajlardan bahsediyorum. Ayrıca bu imajın boyutunu kocaman bir wallpaper olarak koymayın. Zaten maksimum 100px genişlikte görüntülenecektir. Yani siz burada 200px genişlik 150px yükseklikte bir imaj hazırlayarak iyi bir oran yakalayabilirsiniz.

İkinci konu da görselinizin içeriği. Bu görselde çok fazla metin de kullanmayın, çok fazla resimsel format da. Yani burada kullanacağınız şeyin basit bir banner olduğunu düşünerek bir slogan ve bir ikon veya bir artalan fotografı üzerine bir logo da olabilir. Aşağıda örnek olarak hazırladığım bir imajı görebilirsiniz.

![](/images/archive/tr/2010/04/shareimg.jpg)

#### Eklenmesi gereken Meta etiketler

Aşağıda örnek bir kullanım göreceksiniz :

```html
<meta name="title" content="Caretta Caretta'ları koruyalım" />
<meta name="description" content="Yaklaşık 106 milyon yıldır yeryüzünde olduklarını düşünülmektedir. İnsanoğlunun yerleşme ve çoğalma kapasitesi sayesinde bugün sayıları giderek azalmaktadır. Nesli tükenme tehlikesi altında olduğu için koruma altındadır." />
<link rel="image_src" href="shareimg.jpg" />

```

title ve description'da sayfa başlığı ve sayfa özeti yer alacak, image_src'de de yaptığınız görselin adresi yer alacaktır. Bu meta etiketlere sahip bir sayfayı facebook'da paylaşmak isterseniz yukarıda verdiğim önizlemedeki gibi bir sonuç elde edersiniz.

Sadece imaj değil, sayfa içerisindeki video ve ses dosyalarını da paylaşırken belirterek friendfeed gibi servislerde taranabilmesini sağlayabilirsiniz fakat yukarıdaki kullanım genel olarak tüm sayfalarda kullanılan çözümdür.

Eğer bu konuda bilgi edinmek isterseniz veya bu konuyu daha detaylı incelemek isterseniz [Facebook Dökümantasyonundan](http://wiki.developers.facebook.com/index.php/Facebook_Share/Specifying_Meta_Tags) bilgi alabilirsiniz.

#### Paylaşım

Sayfanızın paylaşılması için facebook share butonları ekleyebilir (http://www.facebook.com/facebook-widgets/share.php) veya doğrudan kendiniz link ile http://www.facebook.com/sharer.php?u=YOUR_URL şeklinde get methodu ile sayfa adresinizi bu adresin sonuna urlencode eidp eklerseniz facebook botu sayfanızı anlık tarayabilecektir.

Ya da normal şekilde insanlar sayfa adresinizi kopyala yapıştır yaparak facebook mesajlarına, news feedlerine ekleyeceklerdir.