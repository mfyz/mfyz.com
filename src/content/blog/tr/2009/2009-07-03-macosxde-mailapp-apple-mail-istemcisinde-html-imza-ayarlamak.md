---
title: "MacOSX'de Mail.app (Apple Mail) istemcisinde html imza ayarlamak"
description: "MacOSX'teki Mail.app (Apple Mail) uygulamasında HTML e-posta imzası ayarlamak için adım adım bir rehber. Safari kullanarak webarchive oluşturma ve Mail.app ayarları."
slug: macosxde-mailapp-apple-mail-istemcisinde-html-imza-ayarlamak
date: 2009-07-03
url: http://mfyz.com/tr/macosxde-mailapp-apple-mail-istemcisinde-html-imza-ayarlamak/
tags: ["mail.app", "html imza", "macosx", "apple mail", "e-posta ayarları"]
category: OS
migration: {"wpId":144,"wpPostDate":"2009-07-03T04:21:01.000Z"}
lang: tr
---

#### Neden HTML İmza Kullanmalısınız

HTML imza kullanarak gönderdiğiniz mesajlardaki imzalarınıza etkileşim ve referans katabilirsiniz. Ünvanınız ve insanları yönlendirebileceğiniz blog, portfolyo gibi sayfalarınıza bağlantı verebilir, ikonlar veya logonuzu kullanarak daha görsel bir imza oluşturabilirsiniz. Bu dökümana başlamadan önce bu konuda daha önce neden ve nasıl yapacağınızı anlattığım "[E-postalarınıza HTML imza ile daha ilgi çekici olun](/e-postalariniza-html-imza-ile-daha-ilgi-cekici-olun/)" dökümanını okuyun.

#### Adım adım

Şimdi size hazırladığınız html imzanızı Apple Mail (mail.app) uygulamasına koymayı göstereceğim. Aşağıdaki adımları izleyin.

![](/images/archive/tr/2009/07/mailapp_1.jpg)

Hazırladığınız imzayı tek html dosyası olarak kaydetmiştik. Bu dosyayı Safari'de açın. Burası önemli, bu dosyayı safaride açmalısınız çünkü web archive olarak kaydedeceğiz.

![](/images/archive/tr/2009/07/mailapp_2.jpg) File menüsünden Save As kısayolu ile Farklı kaydetme dialog kutunusu açıyoruz

![](/images/archive/tr/2009/07/mailapp_3.gif) herhangi bir isimle kaydedebilirsiniz.

![](/images/archive/tr/2009/07/mailapp_4.gif)

Mail.app'a bu dosyayı göstereceğiz. Diğer html dosyası ile şimdilik işimiz bitti.

![](/images/archive/tr/2009/07/mailapp_5.jpg)

Şimdi mail uygulamasını açın. Uygulama özelliklerine Uygulama menüsündeki Preferences seçeneğinden ulaşabilirsiniz.

![](/images/archive/tr/2009/07/mailapp_6.gif)

Üstteki tablardan Signatures sekmesine tıklayın

![](/images/archive/tr/2009/07/mailapp_7.jpg)

Yeni bir imza oluşturun. Yukarıdaki ekran görüntüsünde Signature #4 ismiyle oluştuğunu göreceksiniz. Otomatik olarak o an açık olan macosx kullanıcısının adı ve epostasından bir imza oluşacaktır. O içeriği değiştirmenize gerek yok, zaten yeni bir imza oluşturarak bir yerlerde yeni bir webarchive dosyası oluşturmuş olduk. Şimdi o dosyayı bulup bizim hazırladığımız imza ile değiştireceğiz.

Şimdi Finder ile ev dizininize gidin. Benim kullanıcım mfyz olduğu için sistemdeki yeri /Users/mfyz/ dizini olacaktır. Buradan da Library/Mail/Signatures dizinine gidin. Sistemin ana dizinindeki Library klasöründe dolaşmamaya dikkat edin. Bu Mail/Signatures dizini sizin ev dizininizdeki Library içinde olması gerekiyor.

![](/images/archive/tr/2009/07/mailapp_8.jpg) Burada anlamsız birsürü dosya görebilirsiniz. Bunlar mail uygulamasının sizin preferences panelinden oluşturduğunuz imzalarıdır. Şimdi buradaki dosyaları teker teker açıp sizin son oluşturduğunuz imzayı bulun. Zaten orada tek imzanız varsa tek dosya olacaktır. En son oluşturduğunuz imzanın dosyasını bulduğunuzda o dosya adını kopyalayıp masaüstümüze kaydettiğimiz imza webarchive dosyasının adı olarak ayarlayın. Sonra masaüstünüzdeki dosyayı son açtığımız Library/Mail/Signatures dizinine sürükleyin.

![](/images/archive/tr/2009/07/mailapp_9.jpg) Dosyayı değiştirin. Böylece son oluşturduğumuz imza yerine kendi hazırladığımız html imzayı koymuş olduk. Şimdi Mail uygulamasını kapatıp tekrar açın. Tekrar Preferences/Sigrantures paneline gidin.

![](/images/archive/tr/2009/07/mailapp_10.jpg) Son oluşturduğumuz imzanın içinin değiştiğini göreceksiniz. İmajların yüklenmiyor olmasına takılmayın, çünkü imajlar dış bir siteden çekiliyor. Eğer imzamızı dış bağlantılarla çalışır hale getirmeseydik yani varolan bir imajdan çekiyor olsaydık bile safari webarchive'i kaydederken imajları da o dosya içine koyacağından burada problem çıkarmaz ve öyle kullanabilirdik fakat gönderdiğimiz mesajlar o imajlar eklenerek gönderileceğinden gereksiz bir dosya transferi meydana gelecekti.

Yeni oluşturduğumuz bu imzanın adını değiştirin.

![](/images/archive/tr/2009/07/mailapp_11.jpg)

Sonra sol tarafta görünen e-posta hesaplarından hangisine ayarlamak istiyorsanız onun üstüne sürükleyip bırakın. O hesap içinde görünmeye başlayacaktır. Şimdi o hesabın imzalarına tıklayın. Alt kısımda o hesap için varsayılan imzayı ayarlayabileceğiniz bir seçenek göreceksiniz. Oradan son yaptığınız bu imzayı seçin.

![](/images/archive/tr/2009/07/mailapp_12.gif) Artık yeni mesaj yazarken otomatik olarak yeni oluşturduğumuz imaj eklenecektir.

![](/images/archive/tr/2009/07/mailapp_13.jpg)