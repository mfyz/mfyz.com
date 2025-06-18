---
title: "iOS Uygulamanızı Web Sayfanızda App Store Çubuğu ile Erişilebilir Hale Getirin"
slug: ios-uygulamanizi-web-sayfanizda-appstore-cubugu-ile-erisilebilir-hale-getirin
date: 2012-11-14
description: "Web sitenize eklenecek basit bir 'apple-itunes-app' meta etiketi ile iOS uygulamanız için Safari'de otomatik bir App Store banner'ı (Akıllı Uygulama Banner'ı) göstererek kullanıcı erişimini kolaylaştırın."
url: http://mfyz.com/tr/ios-uygulamanizi-web-sayfanizda-appstore-cubugu-ile-erisilebilir-hale-getirin/
tags: ["iOS", "App Store", "Akıllı Uygulama Bannerı", "Meta Etiketi", "Mobil Uygulama", "Safari", "Web Geliştirme", "iTunes"]
category: Diğer
migration: {"wpId":322,"wpPostDate":"2012-11-14T17:43:56.000Z"}
lang: tr
---

Eğer bir iOS mobil uygulamanız var ise web sayfanıza ekleyeceğiniz basit bir meta etiketi ile uygulamanızı sayfanıza bağlayabilir ve kullanıcılarınız mobil sayfari ile sayfanızı görüntülüyorsa AppStore banner'ı ile uygulamanıza daha kolay erişim sağlayabilirsiniz.

![](/images/archive/tr/2012/11/appstorebar.png)

Görsel şekilde müdahale edemeyeceğiniz bu bannerı basit bir meta etiketi ile oluşturmak mümkün.

```html
<meta name="apple-itunes-app" content="app-id=your_app_id">
```

iTunesConnect'den edineceğiniz nümerik uygulama kimliğini your_app_id ile değiştirerek sitenizin anasayfasına ekleyebilirsiniz. Gerisini safari hallediyor.

Ayrıca iPad gibi geniş ekranda görüntülendiğinde ayrıca uygulamanızın ekran görüntülerinin bir setini bu bar içinde görebiliyor kullanıcılarınız.