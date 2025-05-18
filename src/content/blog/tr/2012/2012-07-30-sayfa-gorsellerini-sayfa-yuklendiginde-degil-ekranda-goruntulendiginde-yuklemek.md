---
title: "Sayfa görsellerini sayfa yüklendiğinde değil ekranda görüntülendiğinde yüklemek"
slug: sayfa-gorsellerini-sayfa-yuklendiginde-degil-ekranda-goruntulendiginde-yuklemek
date: 2012-07-30
url: http://mfyz.com/tr/sayfa-gorsellerini-sayfa-yuklendiginde-degil-ekranda-goruntulendiginde-yuklemek/
tags: ["Arayüz Programlama","html","javascript","jquery","lazyload","media","optimization","performance","plugin","screen"]
category: Arayüz Programlama
migration: {"wpId":311,"wpPostDate":"2012-07-30T03:32:58.000Z"}
lang: tr
---

Uzun bir dönem flash'ın webdeki baskınlığının sonucu olarak ekrana sığan sayfalar tercih edilmeye başlanmıştı ama hem mobil cihazların popülerleşmesi, hem blogların şu an internette çoğunluk içeriği sağlıyor olması hem de flash'ın hayatımızdan biraz daha çıkmasıyla, uzun sayfalar tekrar günlük web gezintimizde en sık karşılaştığımız sayfalar oldu. Uzun bir sayfanız var ise ve eğer metin ağırlıklı bir içeriğe sahip değilseniz muhtemelen içeriğiniz, resimler/fotograflar barındırıyor olacaktır. Bunun yanı sıra sayfanızda üst, alt veya yan alanlarda da görüntülediğiniz yardımcı içerikler olabilir.

Örnek ile basit bir wordpress blogunu gözünüzde canlandırırsanız sayfa başlığı, alt metni ve yan navigasyonda ilgili yazılar (ve bunlara ait küçük görseller) sayfanızın altında bulunan görseller, mesela sponsor logoları, statik reklamlar, birkaç ufak ikon (sosyal medya ikonlari) vs küçük büyük bir çok görseliniz olacaktır (footer, header, sidebar).

Uzun bir sayfanın en büyük tehlikesi içinde barındırdığı medya içeriği sayısı olacaktır. Eğer medya içeriği sayınız, dosya boyutları ufak medya içerikleri dahi olsa yüklenmesi uzun zaman alacaktır. Bu konuya birçok web opimizasyonu yazısında karşılaşabilirsiniz.

Şimdi çok daha anlaşılır bir örnekle bu konuyu hızlıca kod üstünde anlatacağım.

Kısa süre önce bir facebook uygulaması hazırlarken, hazırladığım bir sayfada o kullanıcının arkadaş listesini her satırda 4 avatar görünecek şekilde bir tablo şeklinde gösteren bir sayfa hazırladım. Kendi hesabımla sayfayı açtığımda 500+ arkadaş listeleniyordu ve bu da 500 avatar'ın bir sayfada olması anlamına geliyor. Sorun tabi ki internet hızı değil. Asıl problem tarayıcılar. Tarayıcılar, Her domain için, paralel iki yüklemeye izin verir ve her imajın 100 milisaniyede yükleniyor olduğunu varsayarsak, saniyede 20 fotoğraf yükleniyor diyebiliriz. 500 fotografın yüklenmesi de 25 saniye sürecektir.

Sayfa ilk açıldığında çok garip görünmüyor ama daha sayfa yüklenmeden sayfayı aşağı kaydırdığımda ekranda daha yüklenmemiş görseller görüyor oluyorum.

Bundan daha tehlikelisi bu görseller sayfanızdaki diğer kaynakların yüklenmesini geciktiriyor ve javascript akışınızı etkiliyor. Dolayısıyla iyi bir kullanıcı deneyimi değil. Zaten teorik olarak düşündüğünüzde de ekranda görüntülenmemiş belki de hiç aşşağı kaydırılarak görüntülenmeyecek medya içeriği yüklenmeye çalışıyor ve ideal olarak bunların ekranda görüntülenmeden yüklenmemesi gerekir.

Wordpress blogu örneğindeki problem şöyle olabilir. Her girdinizin bir görseli olduğunu düşünürsek ve arşiv sayfanızda her sayfada 10 girdi gösterdiğinizi düşünürsek sayfanızdaki diğer medyaların dışında uzun bir sayfada 10 görsel (yüksek çözünürlükte olabilir) görüntülenmeye çalışması performans kaybına neden olabilir.

Bu problemi bir javascript çözümü olan lazyload ile çözebilirsiniz. jQuery eklentisi olarak bulabileceğiniz eklentinin yaptığı şey her görseli jenerik bir yer tutucusu olarak yükledikten sonra o görselin ekranda görünür alanda olup olmadığını tespit ederek gerçek kaynaktan yüklemek.

Yani sayfanız yüklendiğinde bütün görseller aynı imajı yüklüyor. Genelde bu imaj 1 piksellik tek renk (gri örneğin) ufak bir görsel oluyor. Anında yüklenip tüm imajlarda yer tutucu olarak yerleşiyor. Sayfanız yüklendikten sonra lazyload, o sayfanın pozisyonunu ve görüntülenebilir alanını hesaplıyor ve görselin o alanın içinde veya yakınında olup olmadığını hesapladıktan sonra görünen imajlari yükleyip daha kaydırma pozisyonuna göre ekranda omayan veya uzak olan imajlari yüklemiyor.

Bir javascript eventi ile sayfa kaydırma hareketinizi izleyerek imajlari gösterdiğiniz anda yüklüyor.

#### Lazyload'i sayfanıza nasıl entegre edersiniz?

Önce bir yer tutucu görseli hazırlamalısınız, bunun için transparan veya sabır bir renk 1x1 boyutunda bir gif imaj hazırlayın.

Sayfanızdaki tüm görsel adreslerini bu imajı yükleyecek şekilde ayarlayın. İmajlarin gerçek adreslerini de "data-original" özelliğine alıyorsunuz.

```
<img data-original="img/example.jpg" src="img/grey.gif">

```

Sonra jquery ve lazyload'ı sayfanıza ekledikten sonra bu imajları bir seçiciyle seçip lazyload'ı çalıştırıyoruz.

```
<script src="jquery.js" type="text/javascript"></script>
<script src="jquery.lazyload.js" type="text/javascript"></script>

$("img.lazy").lazyload();

```

Yukarıdaki kod "lazy" sınıfındaki resimleri yükleyecektir. Daha genel bir kullanım istiyorsanız sadece img etiketlerini belirterek sayfanızdaki tüm görsellerin lazyload ile yüklenmesini sağlayabilirsiniz.

Bundan sonra sayfanızdaki görseller ekranda görüntülendikleri anda yüklenecekler. Lazyload dökümantasyonunu inceleyerek tolerans ataması yapmayı (yani görselin, sayfa kaydırılırken ekranda görüntülenmeden önce yüklenmesini saglayabilir) veya görüntülenirken bir geçiş animasyonu belirleyebilirsiniz.

Proje adresi: [http://www.appelsiini.net/projects/lazyload](http://www.appelsiini.net/projects/lazyload)