---
title: "OpenGraph'e giriş"
slug: opengraphe-giris
date: 2012-07-21
url: http://mfyz.com/tr/opengraphe-giris/
tags: ["api","content","Diğer","facebook","graph","og","opengraph","share","social"]
category: Diğer
migration: {"wpId":309,"wpPostDate":"2012-07-21T20:25:34.000Z"}
lang: tr
---

### OpenGraph nedir?

OpenGraph Facebook'un APIsi için oluşturduğu yeni bir API (Application Programming Interface: Uygulama geliştirme arayüzü) yapısıdır. Proje, genel bir yapıda hazırlandığı için belki standartlaşma ihtimali de var fakat şu an için sadece Facebook kullanıyor.

### Neden OpenGraph?

Şu an için zaten sadece Facebook ile kullanabileceğiniz opengraph yapısı, aslında bir uygulama ortamı için özelleştirilebilir esnek bir api yapısı. Yani Facebook'un klasik RESTful API'sinde Facebook'daki bilgiye ulaşabiliyor ve yönetbiliyordunuz. Bunlar hala mevcut ama Facebook'un veri yapısı için tasarlanmış methodlar olduğu için facebook ortamındaki bir facebook uygulaması bu api kanalını kullanamıyordu. Yani Facebook veri yapısına bağımlıydı.

OpenGraph'ın çıkış noktası, internetteki herşeyi içerik olarak özetlemek. Yani adresi belli olan herşey bir içerik olarak kabul ediliyor. Bunu ise linkler ile adresliyor Facebook; mantıklı bir yaklaşım aynı zamanda. Yani her url'in bir içeriği sunduğu düşünülüyor, daha spesifik olarak bu içerikleri istediğiniz kadar parametre ile detaylandırabiliyorsunuz. Bu tanımlamaları yapaken html/xhtml içeriğinizde opengraph ön ekli parametreler kullanarak yapabiliyorsunuz. Facebook'un genel opengraph parametreleri sayfa yani içerik hakkında genel bir bilgi içeriyor.

Bunlardan birkaçı; [code=text] og:title sayfa başlığı og:description sayfa tanımı og:image sayfayı temsil eden görsel og:media sayfa, bir medya sunuyorsa onun doğrudan adresi (video, ses vb) [/code]

Bu etiketleri sayfanıza eklediğinizde, biri sayfanızın adresini facebook'da paylaştığı zaman o sayfaya ait içeriği temsil edecek görsel, medya içeriği, içerik tanımı gibi detayları facebook yakalayabiliyor.

![](/images/archive/tr/2012/07/og-feed-story.gif)

Opengraph'ın asıl esnekliğini görebileceğiniz şey, içeriğinizi gerçekten tanımlayacak özel değerleri kendi oluşturacağınız etiketlerle belirleyebilmeniz. Bu yapı aslında sadece facebook için değil genel bir web yaklaşımı için tasarlanmış bir şey. Yani google da opengraph etiketlerini tarayarak sayfanız hakkında özel bir indeks oluşturabilir.

Örnegin bir araba modelinin detay sayfasını tanımlarken, sadece sayfa başlığı, açıklaması veya arabanın görseli o sayfadaki içerik hakkında yeterli bilgi vermeyebilir. Özel olarak arabanın üretim yılı, markası, yolcu kapasitesi, rengi gibi değerleri de belirleyebilirsiniz.

OpenGraph'ın çıkış amacı, Facebook kullanıcılarının aktivitelerini daha detaylı ve özel bir şekilde göstermek istemesi. Facebook ilk "like" butonunu genelleştirdi ve şu anda web'de bir çok sayfada like butonunu kullanıyor herkes. Eğer bir sayfayı beğenirseniz kullanıcı profilinizde "Mehmet, XYZ sayfasını beğendi" şeklinde görünüyor. Ama OpenGraph ile hedeflenen şey, bu kullanıcı aktivitelerini uygulama geliştiricilerine iyi bir yapı ile sunmak. Şu an bir uygulamayı kullandığınızda o uygulama, uygulama içinde yaptığınız aktiviteyi daha detaylı şekilde "Mehmet Ortakoy'de fotoğraf çekti" veya "Mehmet BMW M3 ve 4 diğer araba modeliyle test sürüşü yaptı" gibi çok daha detaylı bir kullanıcı aktivitesi yayınlayabiliyorsunuz.

![](/images/archive/tr/2012/07/grouped-stories.gif)

Bunun için Facebook geliştirici arayüzlerinde önce OpenGraph nesnenizi tanımlamanız gerekiyor. OpenGraph'da her nesne bir web adresi demek ve bu web adreslerini o içeriği sağlayan sayfalar olarak düşünün. Bir diğer parça da "aktivite" tanımı. Yukarıdaki araba örneğinde, "araba" bir nesne, ve sayfamız bir araba detay sayfası, kullanıcı aktivitesi de "test sürüşü yapmak". OpenGraph ile aktivite, nesne tanımı yapıp kullanıcı aktivitesi yayınlamakla ilgili başka bir yazı hazırlayacağım fakat burada açıklayabilmek için daha detaylı bir örnek vermem gerekiyordu.

### Neden Facebook uygulamanızı OpenGraph'a geçirmelisiniz?

Şu an halihazırda bir Facebook uygulamanız var olabilir. Uygulamada yapılan aktiviteye ilgili bir içeriği veya aktiviteyi kullanıcının profilinde paylaşıyor olabilirsiniz. Muhtemelen paylaşımda bulunduğunuz içerik genel bir durum güncellemesi gibi görünüyor, genel bir link ile başlık, açıklama ve görsel içeriyor.

Facebook kullanıcı adına paylaştığınız bu içerikleri kısa, uzun, gruplanmış veya topluluğu özetleyecek şekilde şekillendiremez çünkü her girdiyi gruplayacak veya birbiriyle ilişkisini ortaya koyacak bir bağ yok. OpenGraph burada devreye giriyor ve Facebook, nesneler, aktiviteler veya aynı aktiviteyi yapan birden fazla arkadaşınızı tek haber olarak gösterebiliyor.

Yukarıdaki örneği devam ettirsem, benim dışımda 2 arkadaşınız daha "test sürüsü" yapmışsa facebook benim aktivitemi ve değer 2 arkadaşınızın aktivitesini size "Mehmet ve 2 arkadaşınız daha test sürüsü yaptı" olarak gösterebiliyor. Hatta eğer aktiviteniz anlık değil zaman alan bir aktivite ise bunu daha önceden tanımlanmış olan bir OpenGraph özelliği olan eylem uzunluğu ile belirtebiliyorsunuz. Örnegin Facebook, şu an halen devam eden ve aynı nesneyi (yani içeriği) kullanarak aynı eylemde buluan arkadaşlarınızı tek hikayede gösterebiliyor "Mehmet ve Betül şu an Indiana Jones izliyor" (eylem: izlemek, icerik/nesne: Indiana Jones). Gurplama, sadece birden fazla arkadaşınızın aynı eylemı yapması şeklinde olmak zorunda değil. Bir arkadaşınızın aynı türde eylemi farklı nesneler (içerikler) ile yapması da düşünülebilir. Bir önceki ekran görüntüsündeki gruplanmış hikaye, benim Songza uygulamasını kullanarak Johannes Brahms playlistini dinlememi gösteriyor. Fakat songza bu haberi bu şekilde kendisi gruplamıyor. Songza'da her dinlediğim şarkı için Songza OpenGraph ile hangi şarkıyı dinlediğimi facebook'a gönderiyor. Bu içerikler aynı türde içerikler olduğu için bu şekilde tek hikaye olarak görünmeye başlıyor. Bu içerikleri tek seferde dinlemiş olmak zorunda da değilim. Gerekli gruplamayı facebook yapıyor. Biz sadece içeriklerin türleri, birbirleri ile ilişkilerini bildiriyoruz facebook'a. Ekran görüntüsünde görebileceğiniz gibi bu playlist'i tek seferde dinlememe göre değil aynı zamanda bir tarih aralığındaki (ekran görüntüsündeki hikayenin alt kısmında Jul 10 - July 16 şeklinde 6 günlük bir zaman dilimi için) benzer aktivitemi gruplayarak göstreiyor Facebook.

Yukarıdaki faydalar Facebook ortamı için olan faydalar olarak görünebilir fakat, bu hikayelerin göründükleri yerler farkettiğinizden çok daha fazla. Normalde klasik paylaşımda bulunan uygulamanız, kullanıcının profilinde bir içerik paylaştığında o hikaye sadece o kullanıcının profilinde ve o kullanıcının arkadaşlarının ana haber akışında görünüyor. Çoğu zaman ana haber akışı sayfasında (news feed) görünemiyor çünkü yorum yapılan, otomatik olmayan gönderilmiş güncellemeler sizin hikayenizi önem sırasında gerilere itiyor ve çoğu zaman görünmez hale getiriyor.

Eğer OpenGraph'de bir hikaye yayınlarsanız hikayeniz, kullanıcı profilinde gruplanıyor, eğer 5 hikayeden fazla gönderim yapmışsanız bir kutu ile uygulama adınız ve kullanıcı aktivitesi görünümü değiştirilebilir bir şekilde kullanıcı profilinde görüntüleniyor.

![](/images/archive/tr/2012/07/badges.gif)

Yukarıda, foursquare'de son 1 ayda kazandığım rozetleri gruplanmış bir şekilde görebiliyoruz. Bu gruplamayı yine facebook yapıyor. Facebook'un geliştirici panelinde, uygulama ayarlarında OpenGraph sekmesinde bu kutuları yani gruplanacak içerik/hikaye türlerini, gruplandıkları zaman ne şekilde gösterileceğini detaylı bir şekilde ayarlayabiliyorsunuz.

Bunun dışında facebook'a bildirilen her hikaye ayrı bir şekilde anlık olarak facebook anasayfasında (news feed) sağ tarafta olan "Ticker" alanında anlık olarak görünüyor ve arkadaşınız haber akışını okuyor olmak durumunda da değil. Bunun dışında eğer birden fazla arkadaşınız aynı aktiviteyi yapıyorsa o hikaye daha üst önem sıralarına çıkıyor. Yani içeriğiniz veya aksiyonunuz birden fazla kişinin yapmasıyla daha önemli hale geliyor.

OpenGraph'ın hikayelere tıklanarak içeriklere (yani sayfanıza) ziyareti arttırdığı bir gerçek. Bu konuda TechCrunch'da veya diğer teknoloji bloglarında spotify'ın ve pinterest'in OpenGraph ile ziyaret ve etkileşim oranlarını katladığını okuyabilirsiniz. Bu iki örnek şu an iki OpenGraph başarı hikayesi olarak verilebilir.

**Hazırlayan:** Mehmet Fatih YILDIZ