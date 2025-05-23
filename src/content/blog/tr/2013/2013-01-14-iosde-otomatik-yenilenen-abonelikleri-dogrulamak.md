---
title: "iOS'de otomatik yenilenen abonelikleri doğrulamak"
slug: iosde-otomatik-yenilenen-abonelikleri-dogrulamak
date: 2013-01-14
url: http://mfyz.com/tr/iosde-otomatik-yenilenen-abonelikleri-dogrulamak/
tags: ["app store","apple","in-app purchase","iOS","ipad","iphone","itunes","itunes connect","PHP","purchase","store","storekit","subscription","verification"]
category: PHP
migration: {"wpId":327,"wpPostDate":"2013-01-14T06:00:00.000Z"}
lang: tr
---

![](/images/archive/tr/2013/01/ios_subscriptions.jpg)

Baştan belirtmek zorundayım, iOS uygulamalarına otomatik yenilenen abonelikleri entegre etmek tam bir baş ağrısı. Her ödeme yönetminin zor yanları olabilir, ancak iOS uygulama mağazası üstünden yapılan otomatik tekrar eden abonelikleri yönetmek çok daha karışık bir mevzu.

Baştan başlamak gerekirse, otomatik ödeme yönetime ile yapılan abonelikler diğer tür ödemelerden farklı. "[iOS uygulama içi satış entegrasyonu ve ödemeleri doğrulamak](/ios-uygulama-ici-satis-entegrasyonu-ve-odemeleri-dogrulamak)" yazısında iOS uygulama mağazası ödemelerini entegre etmek ve ödeme türleri üzerine bir yazı yazmıştım. Otomatik tekrar eden abonelik dışındaki diğer ödeme türlerinin entegresyonunu o yazıdan inceleyebilirsiniz. Ancak bu konuda bilginiz yoksa önce o yazıdaki bilgilere ihtiyacınız olacak, önce o yazıyı incelemenizi tavsiye ederim.

Otomatik tekrar eden abonelikler sayesinde, kullanıcınızın iznini aldıktan sonra iTunes aracılığıyla, 1 haftalık, 1 aylık, 2, 3, 6 veya 12 aylık periyodlarla otomatik şekilde ödemelerini sağlayabiliyorsunuz. Bir ürün için kullanıcıyı elde tutmak açısından diğer, tek seferlik satın almalardan çok daha değerli. Kullanıcınız ödemeyi ilk sefer yaparken satın almayı yapıyor ve sonrasında servisi iTunes üstünden iptal edilene kadar ödemeler otomatik tekrarlanıyor. Siz kazancınızı Apple'dan alıyorsunuz.

İyi yanı, kullanıcınıza süper kolay ödeme seçeneği sunuyorsunuz. Tüketicinin kredi kartı, bilgi paylaşımı, ödemeyi takip etme gibi bin bir türlü endişesi olmuyor bu satın almayı yaparken. Dolayısıyla ürünü nasıl satın alacağından veya satın alırken yaşama ihtimali olan problemlerden çok ürününüzle ve neden ürününüzü almak istediğinizle ilgileniyor. Sonuçta normal yollarla kredi kartı entegrasyonu, ödeme sistemi, sipariş sistemi vs gibi dertlerden kurtuluyorsunuz, Apple sizin için herşeyi hallediyor.

Kötü yanı, bir yanda Apple'a 30% ödüyorsunuz, bir yandan da ödemelerinizin gelip gelmiyor olduğunu kullanıcı bazında veya derin analiz anlamında kendi tarafınızda tutmak istiyorsanız, yazının devamında anlatacağım sıkıntılı bir geliştirme sürecine giriyorsunuz.

Moonit'de (çalıştığım şirketin mobil uygulaması), birkaç güncelleme önce yayına aldığımız, premium bir üyelik modeli denedik ve sonuçta otomatik yenilenen ödeme sistemini entegre etmek zorunda kaldık. Basit bir entegrasyon ile hangi üyemizin ne zaman hangi üyelik paketini alarak premium servisimizi kullanmaya başladığını kolaylıkla ölçmeye başladık. Eğer üyeliklerini iptal ederlerse, örneğin 1 aylık bir üyelik alıp 4. ayda üyeliğini iptal etmiş bir kullanıcıyı da kolaylıkla tespit edebiliyoruz bu altyapı ile. iTunes Connect web arayüzünde (Apple'in uygulama geliştirici yönetim arayüzü) aylık/günlük yapılan ödemeleri, hangi türdeki üyelik paketlerini satın aldıklarını görebiliyoruz fakat çok da detaylı değil.

Eğer daha fazlasına ihtiyacınız yoksa bu yazının geri kalanındaki serzenişler sizin için değil. Ancak eğer hangi üyenizden toplamda kaç ödeme aldınız, iTunes arayüzünden paketler arası geçiş yaptılar mı, aldığınız fatura kopyaları (receipts) onların ilk yaptığı orjinal ödeme mi yoksa otomatik ödeme mi?, üyelerinizin yüzde kaçı üyeliğini koruyor yüzde kaçı son periyodlarında iptal ediyorlar veya 1 aylık üyelik alanların yüzde kaçı ilk ayda, yüzde kaçı ikinci ayda iptal ediyorlar gibi detaylı analizler yapmak istiyorsanız her ay (veya alakalı periyodda) yenilenen fatura kopyalarını kendi sisteminizde kaydetmek ve analiz etmek zorundasınız.

Geçmişi çok eski olmasa da, daha bir yıldan önce çıkmamış olan bu abonelik sistemi hakkında çok detaylı kılavuzlar yok internette. Apple dökümantasyonu tam bir mühendis dökümantasyonu. Her ne kadar mühendis olsanız da uygulamadan, iyi test etmeden neyin ne olduğunu anlayamıyorsunuz ve Apple sizin kendi tarafınızda yapacağınız hiçbir şeyle ilgilenmiyor. Evet zorunda değil fakat sunduğu veri setini daha kullanılabilir bir şekilde sunabilirdi geliştiricilere.

Zira ilk başta teorik olarak düşündüğünüz bazı şeyler tutarlı değil veya yanlış. Apple tarafında da bilinmeyen hatalar olduğu için geliştiriciler forumlarda ortak deneyimlerini paylaşarak bir problemi ortaya çıkarıyorlar. Apple kullanıcı dostu olduğu kadar da geliştirici dostu fakat herhalde tüm Apple sisteminde en kritik noktalardan biri olan bu uygulama içi satın alma altyapısı, StoreKit, yanı uygulama tarafı stabil olsa da ödemelerin doğrulanması protokolü de bir o kadar dağınık ve karanlık. Bu yazıda bazı karanlık tarafları aydınlatmaya çalışacağım.

İşin hikaye kısmını bitirip biraz koda gireceğim ve genel birkaç noktanın üzerinde duracağım. Çünkü çok basit görünen ama geliştirmenizi çok etkileyebilecek şeylerin dökümantasyonda birkaç kelime ile irdelendiği noktalar var ve bu noktalar bana birkaç gün kaybettirdi. Onun için burada bir otomatik ödeme destekleyen abonelik yapısının sunu taraflı kodlaması konusunda yol göstermeye çalışacağım.

#### Abonelik modelini ve farklı fiyat seçeneklerini tanımlamak

Uygulamanızı geliştirirken abonelik paketlerinizi, farklı fiyatlarla farklı periyodlarda tasarladınız diyelim. Mesela paralı üyelikle bir hizmeti web sitenizden sunuyorsunuz. Üyelik paketlerinizi ufak indirimlerle 1 yıllık, 6 aylık, 3 aylık ve 1 aylık olarak ayarladınız (bunlar Apple'in sunduğu periyodlar, daha uzun veya özel bir periyodda üyelik belirleyemiyorsunuz fakat sadece, haftalık, aylık ve yıllık gibi bu seçeneklerden oluşturabileceğiniz üyelik modelleri geliştirebilirsiniz).

Üyelik paketlerinizi farklı ürünler olarak iTunes connect'de tanımlamanız gerekiyor. Burada önemli nokta ürün kodlarını (bundle id) ilişkili biçimde tanımlamanız. Diyelim ki uyelik1, uyelik3, uyelik6 ve uyelik12 şeklinde tanımladınız ürün kodlarınızı. iTunes ile haberleştiğiniz bütün arabirimlerden ürün kodlarını şu şekilde alacaksınız: "com.gelistirici_kimlik_adiniz.uyelik6" burada com kısmı sabit, sonraki kısım geliştirici adınız (bizimki "moonit") sonra da ürün kodunuzu gelecek.

iOS uygulamanızda bir UIView ekleyip ilgili bir view kodlayıp StoreKit entegrasyonunu yapmanız gerekiyor. Aşağıda üstünde çalıştığım uygulamadaki üyelik satın alma ekranını görebilirsiniz.

![](/images/archive/tr/2013/01/pay_premium.jpg)

Bu butonlarla ilgili aksiyonlara da StoreKit'i entegre etmeniz gerekiyor. StoreKit ile ödemenin iptal edildiğini veya tamamlandığını yakalayabilirsiniz. Ödeme tamamlandığında fatura kodu alacaksınız, bu kodlanmış uzun bir string olacak. Bu string'i, ödeme ile ilgili detayları alabilmek için doğrulama protokolü ile doğrulamanız gerekiyor. Bu noktada sunucu taraflı entegrasyon yapacaksınız. Bu kısımda gerekli olan entegrasyon diğer ürün türleriyle aynı. Bu kodunda daha detaylı bilgiyi "[iOS uygulama içi satış entegrasyonu ve ödemeleri doğrulamak](/ios-uygulama-ici-satis-entegrasyonu-ve-odemeleri-dogrulamak)" yazısından takip edebilirsiniz. Bu yazıdaki entegrasyonu yaptıktan sonra buradan devam edebilirsiniz.

#### Abonelik doğrulama, normal doğrulamayla neredeyse aynı

Doğrulama sunucularından gelen cevap, abonelik türündeki ürünler için bazı farklılıklar gösteriyor. Cevap (json) nesnesinde "receipt"a ek olarak "latest_receipt_info" adında bir nesne daha alacaksınız. Kullanıcının yaptığı ilk ödemenin doğrulama sonucunda bu iki nesne (receipt ve last_receipt_info nesneleri) denk olacaktır. Apple, kullanıcıdan yeni ödeme aldığı zaman, bu doğrulamayı yaptığınızda "latest_receipt_info" nesnesiyle size yeni bir fatura kopyası vermeye başlayacaktır. Bu yeni fatura kopyası tekrar eden aboneliğin yeni dönemine ait ödeme anlamına gelir ve yeni döneme ait detayları içerecektir.

Ayrıca bu fatura kopyalarında expires_date, expires_date_formatted ve expires_date_formatted_pst adında ek alanlar göreceksiniz, bunlar satın alınan abonelik periyodunun bitimini gösterecektir. Şurada örnek fatura kopyasını görebilirsiniz:
```
{
   "receipt":{
      "expires_date_formatted":"2012-12-12 00:15:05 Etc\/GMT",
      "original_purchase_date_pst":"2012-09-11 16:15:06 America\/Los_Angeles",
      "unique_identifier":"cd1995d3e5e354678d4c2e1b8ee96b",
      "original_transaction_id":"45134563485",
      "expires_date":"1355271305612",
      "app_item_id":"462345637",
      "transaction_id":"4500023456385",
      "quantity":"1",
      "expires_date_formatted_pst":"2012-12-11 16:15:05 America\/Los_Angeles",
      "product_id":"com.moonit.moonit.premium3",
      "bvrs":"1.6",
      "web_order_line_item_id":"45002345422477",
      "original_purchase_date_ms":"134723435406809",
      "version_external_identifier":"881234583",
      "bid":"com.moonit.moonit",
      "purchase_date_ms":"1347405305612",
      "purchase_date":"2012-09-11 23:15:05 Etc\/GMT",
      "purchase_date_pst":"2012-09-11 16:15:05 America\/Los_Angeles",
      "original_purchase_date":"2012-09-11 23:15:06 Etc\/GMT",
      "item_id":"5471234234"
   },
   "latest_receipt_info":{
      "original_purchase_date_pst":"2012-09-11 16:15:06 America\/Los_Angeles",
      "unique_identifier":"cd1995dae576afe567567afec67fd4c2e1b8ee96b",
      "original_transaction_id":"450234343485",
      "expires_date":"1355271305000",
      "app_item_id":"469123454637",
      "transaction_id":"452345345",
      "quantity":"1",
      "product_id":"com.moonit.moonit.premium3",
      "bvrs":"1.6",
      "bid":"com.moonit.moonit",
      "web_order_line_item_id":"4234567642477",
      "original_purchase_date_ms":"1347405306000",
      "expires_date_formatted":"2012-12-12 00:15:05 Etc\/GMT",
      "purchase_date":"2012-09-11 23:15:05 Etc\/GMT",
      "purchase_date_ms":"1347405305000",
      "expires_date_formatted_pst":"2012-12-11 16:15:05 America\/Los_Angeles",
      "purchase_date_pst":"2012-09-11 16:15:05 America\/Los_Angeles",
      "original_purchase_date":"2012-09-11 23:15:06 Etc\/GMT",
      "item_id":"54223456743624"
   },
   "status":0,
   "latest_receipt":"<<< KODLANMIS FATURA VERISI >>>"
}

```
Her abonelik periyodu bitiminde eğer kullanıcınız aboneliğini iptal etmediyse (abonelik iptalini de sadece iTunes üstünden yapabilirler), bu dizide yeni bir fatura alacaksınız. Bunun için bu dogrulamayı her periyod bitiminde tekrarlamanız gerekiyor. Bunun için en doğru yol, bir cron scripti hazırlayıp bunu günlük olarak çalıştırıp her gün, periyodun sonuna gelmiş, geçerli faturaları doğrulatmalı ve latest_receipt_info yeni bir receipt alıp almadığınızı kontrol etmeniz gerekir.

Bu noktada bir faturayı veya ödemeyi tekil olarak tespit etme probleminiz olacak, çünkü yukarıdaki json'da cevabındaki verilerin neredeyse hepsi iTunes ile ilgili veriler, hangisinin ne anlama geldiklerini çok kolayca anlayamayabiliriz. Daha önce transaction_id'nin tekil olmadığını, bir ödeme için birden farklı transaction_id'ye sahip fatura kopyası alabileceğinizi söylemiştim diğer yazıda. Burada da durum aynı. Onun için bir ödemeyi (finanasal açıdan bir fatura kopyasının gerçek bir ödemeyi ifade edip etmediğini) tespit etmek için transaction_id'yi kullanmayacağız. Siz doğrulama sonucunda aldığınız her fatura kopyasını yine de veritabanınızda saklamayı unutmayın, geçerli olmasalar bile saklamanızı tavsiye ediyorum. En azından bu problemi ne sıklıkta yaşadığınızı farkedebilirsiniz.

Abonelik türündeki bu ödemeleri tekil olarak tespit etmek için fatura kopyalarında gelen expires_at tarihi original_transaction_id ile beraber kullanacağız. Kullanıcınız bir abonelik satın aldığı zaman orijinal bir ödeme gerçekleştirir ve aboneliklerini iptal edene kadar ne kadar ödeme yapmış olurlarsa olsun original_transaction_id hep aynı kalacaktır. Zaten ilk ödemeden sonrasındaki ödemeler otomatik ödeme olacaktır.

#### Aboneliğin iptal edildiğini nasıl tespit edeceksiniz?

Hazırladığınız cron scripti her gün 1 kere çalışıyor diyelim. Veritabanınızdaki faturaların expires_date'ine birkaç gün tolerans ekleyerek abonelik periyodu bitmeden birkaç gün önce dogrulamaya başlayabilirsiniz, Apple çoğu zaman yeni periyoda ait ödemeyi otomatik olarak periyod bitiminden bir veya birkaç gün önce işleme alacaktır. Bu durumda size de yeni fatura kopyası vermesi muhtemel.

Yukarıda söylediğim "latest_receipt_info" tutarlı şekilde bu adı almıyor. Eğer kullanıcınız aboneliğini iptal ettirmişse bu faturayı doğruladığınızda, doğrulama cevabının status kodu 21006 olacaktır. Bu durumda aynı nesne doğrulama cevabında "latest_receipt_info" yerine "latest_expired_receipt_info" adıyla yer alacaktır. Zamanı dolmuş (expired) bir fatura kopyasının anlamı, üyeniz, son dönemde aboneliğini iptal etmiş demektir. Bu durumu yakaladığınızda sunduğunuz hizmetin, son dönemin bitiş tarihinde sona erecek şekilde ayarlamanız gerekir. Burada üyeliği hemen iptal etmemeniz ve hizmeti hemen durdurmamanız gerektiğini unutmayın. Çünkü faturayı doğruladığınızda kullanıcı aboneliğini iptal ettirmiş ancak son döneme ait ödeme yapıldığı için, kullanıcının servisini dönem sonuna kadar devam ettirmeniz gerekir.

\## Yazdığınız doğrulama scriptini test etmek

Yazdığınız abonelik doğrulama scriptini test etmeniz için bir üyelik periyodunun bittigi dönemi taklit etmeniz gerekiyor. Gerçek abonelik dönemlerini taklit edebilmeniz için Apple size bir yol sunuyor. Uygulamanızı geliştirirken zaten sandbox kullanıcılarını kullanarak satın alma yapmak zorundasınız. Apple, sandbox ödemelerin periyodlarını çok hızlı şekilde sona erdiriyor. Yani aldığınız 1 aylık abonelik 5 dakikada sona eriyor ve yeni periyoda geçiyor. İşte normalde tanımladığınız abonelik periyodlarının zamanlama açısından Sandbox'daki karşılıkları:
```
1 hafta     3 dakika
1 ay        5 dakika
2 ay        10 dakika
3 ay        15 dakika
6 ay        30 dakika
1 yıl       1 saat

```
Dolayısıyla abonelikleri bu kısa sürelerde doğrulama scriptiniz ile test edebilirsiniz. Burada bilmeniz gereken bir detay nokta var. Apple dökümantasyonunda tek cümlede belirtmiş ancak az sonra söyleyeceğim şeyin problemini yaşayana kadar bunu farketmiyorsunuz.

Biliyorsunuz ki sandbox'da gerçek bir apple id ile satın alma yapamıyorsunuz. Bunun için iTunesConnect'den oluşturabileceğiniz sandbox test user'lari kullanmak zorundasınız. Abonelik türünde ödemeleri test ederken yeni bir sandbox kullanıcısıyla ilk ödemeyi yaptınız diyelim. Örnegin 1 aylık bir paketi aldınız. Apple bu ödemeyi 6 kere tekrar edecektir. Dolayısıyla 6 ay sürdürülmüş ve 6. ayda iptal edilmiş bir üyelik sürecini taklit edecek Apple. Fakat bu sadece ilk satın almada geçerli oluyor. Yani her sandbox kullanıcısının ilk abonelik satın alması 6 kere tekrar edecektir. Bundan sonraki satın almalar tek seferlik olup Apple bunları yenilemeyecektir.

Dolayısıyla uzun bir test süreciniz olacaksa -ki olacaktır, çünkü her durumu test etmek çok kolay değil- her seferde taze bir sandbox kullanıcısı oluşturup o yeni kullanıcıyla abonelik satın almalarını test etmenizi tavsiye ederim.

Şimdilik otomatik yenilenen aboneliklerle ilgili belirteceklerin bu kadar. Şuradan otomatik yenilenen aboneliklere ait apple dokümantasyon sayfasını inceleyebilirsiniz: [http://developer.apple.com/library/ios/#documentation/NetworkingInternet/Conceptual/StoreKitGuide/RenewableSubscriptions/RenewableSubscriptions.html](http://developer.apple.com/library/ios/#documentation/NetworkingInternet/Conceptual/StoreKitGuide/RenewableSubscriptions/RenewableSubscriptions.html)