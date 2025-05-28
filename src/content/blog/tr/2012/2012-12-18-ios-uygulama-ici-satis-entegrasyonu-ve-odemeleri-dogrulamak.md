---
title: "iOS uygulama içi satış entegrasyonu ve ödemeleri doğrulamak"
slug: ios-uygulama-ici-satis-entegrasyonu-ve-odemeleri-dogrulamak
date: 2012-12-18
url: http://mfyz.com/tr/ios-uygulama-ici-satis-entegrasyonu-ve-odemeleri-dogrulamak/
tags: ["app store","apple","in-app purchase","integration","iOS","ipad","iphone","itunes","itunes connect","php","purchase","server","store","storekit","verification"]
category: PHP
migration: {"wpId":335,"wpPostDate":"2012-12-18T05:01:00.000Z"}
lang: tr
---

![](/images/archive/tr/2012/12/in-app-purchases.png) iOS uygulaması geliştirmek bu günlerde oldukça popüler. Turkiye'de de birçok oyun geliştiricisi iOS platformlara yönelmeye başladı.

Uygulamanızda geliştireceğiniz gelir modeliniz bir şekilde Apple ödeme sistemine bağlanmak zorunda çünkü Apple uygulama geliştirici kontratınıza göre uygulama üzerinde yapacağınız herhangi bir satış modelini Apple ödeme sistemi üzerinden yapmak durumundasınız. Apple uygualama içi ödeme sistemini kullanmanın avantajları ve dezavantajları var.

En büyük dezavantajı her ödemede, Apple'a 30% vermek. Bunun dışında ödemeleri doğrulamanın teknik zorlukları da var. Bunun dışında avantajları, dezavantajlarını unutturacak kadar değerli. Çünkü iOS üstünden yapılacak bir alışverişte herhangi bir ödeme bilgisi sorgusu olmayacak, kullanıcılar ödeme bilgilerini zaten sistemde tanıtmış durumda. Yani bir ödeme kabul edebilmek aslında sadece bir onaylama kutusuna indirgeniyor. Çoğu durumda tek onay sorusuna cevap vermek ve Apple kimlik şifresini doğrulamakla ödeme sağlanabiliyor.

Bir diğer avantaj da, herhangi bir ödeme yönetim sistemi, banka vs gibi bir entegrasyonla uğraşmak durumunda olmamanız.

Şimdi gelelim entegrasyona, iOS geliştirici (objective-c) tarafında gerekli entegrasyonu StoreKit denilen bir Apple arabirimi ile iOS uygulamanıza yapmanız gerekiyor. Bazi amatör programcılar veya sunucu bağımsız uygulama yazmaya çalışan geliştiriciler ya gözden kaçırıyorlar ya da gerek görmüyorlar ama aslında StoreKit'den aldığınız tüm fatura kopyalarını (receipts) Apple sunucularına göndererek doğrulamanız gerekiyor. Bunun için tavsiye edilen uygulama yapısı, bir sunucu taraflı doğrulama mekanizması oluşturmak. Bunun önemi, sunucu taraflı bir doğrulama mekanizmasını kırmanın zorluğu ve sahte ödemeleri tespit edebilmek, bir diğer önemi ise, faturaları sunucularınızda saklayarak ödemeleri kullanıcılarınız ile ilişkilendirerek kimlerin ödeme yaptıklarını, gelen faturaların doğrulanmış gerçek bir ödeme olduğunu doğrulamanız ve gerekli analitik verileri hesaplayabilmenizi sağlamasıdır.

#### Sunucuda fatura (receipt) doğrulamak

Apple, faturaları dogrulatmak için geliştiricilere bir protokol sunuyor. Özel bir adrese göndereceğiniz fatura kodunu, ödeme detaylarını alabileceğiniz şekilde cevap olarak dönen bir HTTP servisi var. Bu servise, iOS StoreKit'den aldığınız fatura kodunu gönderdiğinizde, ödeme detaylarını JSON nesnesi cevap olarak alıyorsunuz. Bunu PHP ile nasıl yapabileceğinizi anlatacağım. PHP ile HTTP isteği yapmak için CURL kullanacağım.
```php
function validate_receipt($receipt_data, $sandbox_receipt = FALSE) {
    if ($sandbox_receipt) {
        $url = "https://sandbox.itunes.apple.com/verifyReceipt/";
    }
    else {
        $url = "https://buy.itunes.apple.com/verifyReceipt";
    }
    $ch = curl_init($url);
    $data_string = json_encode(array(
        'receipt-data' => $receipt_data,
        'password'     => '<>',
    ));
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($data_string))
    );
    $output   = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if (200 != $httpCode) {
        die("Error validating App Store transaction receipt. Response HTTP code $httpCode");
    }
    $decoded = json_decode($output, TRUE);
    return $decoded;
}

```
Bu fonksiyon, uygulamamızda, faturaları doğrulamak için kullandığımız method. StoreKit'den aldığınız fatura kodunu yanı "receipt_data" parametresini doğrulayabilirsiniz.

Apple, uygulamanızın geliştiririci sürümlerinde (iOS Simulator'da veya XCode'dan doğrudan cihazınıza derlediğiniz sürümlerde), ödemeleri test edebilmek için Sandbox modunda yani test modunda çalışıyor, dolayısıyla sadece Sandbox kullanıcıları ile ödeme yapabiliyorsunuz. Sandbox Apple kimliği oluşturmak için iTunes Connect arayüzünü kullanmanız gerekiyor. Diyelim ki test kullanıcısıyla ödeme yaptınız, bu ödemeyi test sunucularında yani Sandbox sunucularında doğrulamanız gerekiyor. Bunu da, fonksiyonun ikinci parametresiyle belirtebilirsiniz.

Fonksiyon oldukça açık bir şekilde biz POST veri seti oluşturup Apple dogurlama sunucularına gönderiyor. Tabi ki uygulamanıza ait şifrenizi de burada belirtmeniz gerek. Bunu da iTunesConnect'den alabilirsiniz. Fonksiyon gelen cevabın HTTP cevap kodunun 200 olması isteğinize ait bir cevap olduğu anlamına gelir. Bu durumda cevap olarak bir json nesnesi alacaksınız. JSON nesneniz şöyle birşey olmalı:
```json
{
   "receipt":{
      "original_purchase_date_pst":"2012-12-11 19:39:22 America\/Los_Angeles",
      "unique_identifier":"130f26a2d4f02b6ec66a44e6d0d1054a0c67b31d",
      "original_transaction_id":"900010202504325481451",
      "bvrs":"2.0",
      "app_item_id":"469944437",
      "transaction_id":"2390034200035752112451",
      "quantity":"1",
      "unique_vendor_identifier":"A6CF45BAC2347-E21D-4827-D14D52A43240",
      "product_id":"com.moonit.moonit.starpower800",
      "item_id":"5756897490",
      "version_external_identifier":"11723464",
      "bid":"com.moonit.moonit",
      "purchase_date_ms":"1355283562408",
      "purchase_date":"2012-12-12 03:39:22 Etc\/GMT",
      "purchase_date_pst":"2012-12-11 19:39:22 America\/Los_Angeles",
      "original_purchase_date":"2012-12-12 03:39:22 Etc\/GMT",
      "original_purchase_date_ms":"1355283562408"
   },
   "status":0
}

```
Burada kontrol etmeniz gereken ilk şey "status" parametresi. Bu kod "0" (sifir) ise faturanız gerçek bir faturadır. Eğer 0 dışında birşey ise bir sayısal değer alacaksınız ve işte bu kodlar:
```
21000   Doğrulama sunucusu gönderilen json nesnesini okuyamadı.
21002   "receipt-data" parametresindeki veri bozuk.
21003   Fatura doğrulanamadı.
21004   Faturadaki şifre ile uygulama geliştirici şifreniz uyuşmuyor.
21005   Doğrulama sunucusu ulaşılamıyor.
21006   Geçerli ödeme fakat abonelik sonlanmış.
21007   Bu bir test faturası ancak asıl sunucuya gönderildi.
21008   Bu gerçek bir fatura ancak test sunucusuna gönderildi.

```
Yukarıdaki JSON nesnesine geri dönersek, teoride her ödeme için tekil bir transaction_id alacağınızı düşünürsünüz fakat transaction_id her isteğe karşılık yapılan operasyon numarası anlamına geliyor ve bazı durumlarda, tek gerçek ödeme için birden fazla fatura cevabı alabilirsiniz ve her biri farklı transaction_id'ye sahip olacaktır. Bu durumda analitiklerinizde original_transaction_id'yi kullanarak birden fazla fatura kayıdının tekil olarak kaç tane ödemeye ait olduğunu anlayabilirsiniz.

Yukarıdaki JSON'da ayrıca satın alınan ürün kimliğini, satın almanın yapıldığı uygulama surumunu ödeme yapılma tarihi gibi bir çok ek bilgi alacaksınız. Bu doğrulama nesnesini veritabanınızda ham şekilde şaklamak ileride gününüzü kurtarabilir. Ayrıca fatura kodunu da ham bir şekilde saklayabilir ve ileride tekrar doğrulayabilirsiniz.

Bütün verdiğim bu örneği tüketilebilir bir ürünün tek seferlik satın alma işlemini doğrulamak üzerine verdim. Uygulamanıza satın alma entegre ederken önce ürünlerinizi oluşturmanız gerekiyor, ürünlerinizi tanımlarken birkaç farklı ürün türünden biri olarak belirtmeniz gerekiyor:

*   Tüketilebilir ürün: Kullanıcılar ürünü tekrar tekrar alabilir. Örnegin: Bir oyunda satın alınabilecek bir kaynak (Ürün: "500 Altın", oyunda altınlarınız bittikçe tekrar tekrar alabilirsiniz veya ihtiyacınız yoksa bile istediğiniz kadar alıp stok yapabilirsiniz)
*   Tüketilemez ürün: Bu ürünler bir kere satın alındığında tekrar satın alınamaz. Örnegin: Herhangi bir uygulamada bir özellik, yine oyun üstünden örnek gererek devam edecek olursam bir özelliği aktifleştirmek (Ürün: "Ekstra güçlü kılıç", bu kılıcı bir kere satın alırsınız ve artık sizindir, tekrar almanıza gerek yoktur).
*   Tekrarlanamaz abonelik.
*   Otomatik tekrar eden abonelik. Son iki ürün türü açıkça abonelikler için. Aralarındaki tek fark, otomatik tekrar eden abonelik türü, her abonelik periyodu bittiğinde kullanıcıdan otomatik olarak ödemenin işlendiği ve aboneliğin iptal edilene kadar tekrarlandığı bir anobelik türüdür. Tekrar etmeyen abonelik türü ise seçilen periyod için ödemenin yapıldığı ve periyod bittiğinde ödemenin tekrarlanmadığı bir ödeme türüdür.

Apple geliştirici şartlarına göre eğer sürekliliği olan bir servis sunuyor ve bu servis için bir ücretlendirme yapıyorsanız bunu abonelik olarak ürünlere dönüştürmeniz gerekiyor. Sadece sürdürülen bir servis değilse, tüketilebilir veya tüketilemez ürün türleri tanımlamanız gerekiyor.

Abonelik türündeki ödemelerin, faturalarının doğrulanması, yukarıdaki methodla aynı şekilde yapılan fakat Apple sunucularından gelen doğrulama verisinde ek olarak abonelikle ilgili bilgilerin de olduğu biraz daha derin bir konu, onu başka bir yazıda ele alacağım.

iTunesConnect'de oluşturduğunuz her ürünü bir uygulama sürümü ile onaylanması için ibraz etmek (submit) zorundasınız. Yayında olan bir uygulamaya, yeni bir sürüm kodlamadan ürün ekleyemiyorsunuz. Ancak eklenmiş ürünlerin fiyatlarını ve diğer detaylarını yayındayken güncelleyebiliyorsunuz. Eğer ürün türleriniz yukarıdaki kurallara uymuyorsa Apple hem ürünlerinizi hem de uygulamanızı red ediyor. Eğer ürün türlerinde ve yapılma tarzında bir problem yoksa uygulamanız kabul edilip yayınlanıyor. Yeni bir gelir modelini sunarken Apple'a bağlısınız malesef, bu oldukça can sıkıcı ancak uygulamanız onaylandıktan sonra süreç oldukça sorunsuz işliyor. Eğer uygulamanıza ilk defa bir ödeme (ürün) ekliyorsanız red edilebileceğinizi de göz önünde bulundurun ve ürün türlerinizi Apple tanımlamaları çerçevesi içinde belilrlemeye çalışın.

Satışlarınızı iTunesConnect arayüzünde yüzeysel bir şekilde, günlük ve aylık raporlar şeklinde takip edebiliyorsunuz ve hangi ülkelerden satış yapılmışsa o ülkenin döviz bilgisiyle görebiliyorsunuz. Birkaç ürüne sahipseniz ve büyük bir odakla bu ürünler üstünde çalışıyorsanız her türlü detaylı analitiğe ihtiyacınız olabilir. Bu durumda iTunesConnect analitik raporlarından daha fazlasına ihtiyaç duyacaksınız ve sonuçta kendi sunucunuzda fatura ve ödeme takibi sistemini Apple kurallarına göre entegre etmeniz gerekecek. Bunun için de her ödemeyi doğrulamak, kendi sunucularınızda saklamak ve alabildiğiniz tüm verileri incelemelisiniz.

Umarım bu konuda biraz daha az sancı çekmenizi sağlayacak bir yazı toparlamışımdır.