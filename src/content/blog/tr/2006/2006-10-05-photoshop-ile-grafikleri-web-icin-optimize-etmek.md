---
title: "Photoshop ile Grafikleri Web İçin Optimize Etme Yöntemleri"
slug: photoshop-ile-grafikleri-web-icin-optimize-etmek
date: 2006-10-05
description: "Photoshop'un 'Save for Web' özelliğiyle (Ctrl+Alt+Shift+S) JPEG, GIF ve PNG formatındaki grafikleri web için nasıl optimize edeceğinizi öğrenin. Kalite ve dosya boyutu dengesi için ipuçları."
url: http://mfyz.com/tr/photoshop-ile-grafikleri-web-icin-optimize-etmek/
tags: ["Photoshop", "web optimizasyonu", "görsel optimizasyonu", "Save for Web", "JPEG", "GIF", "PNG", "dosya boyutu küçültme", "web tasarımı", "grafik tasarımı"]
category: Tasarım
migration: {"wpId":61,"wpPostDate":"2006-10-05T08:07:07.000Z"}
lang: tr
---

Internette kullanacağımız grafiklerin boyutları her zaman için önemlidir. Grafikleri web için optimize etmeye yönelik çok fazla program var piyasada.. Bazıları çok kaliteli, fakat bunun için herhangi bir ekstra program kullanmanıza gerek yok.

Gimp kullanırken bile webde kullanacağım grafikleri photoshop ile optimize ediyordum. Photoshop'un save as web seçeneği ile çıkan pencere ile olacak bütün işimiz, Aynı zamanda bu mekanizmayı Adobe ImageReady programı ile de yapabilirsiniz. Şimdi gelelim nasıl olacağına ve detaylara.

Photoshop ile çizdiğimiz bir grafiği (örnek olarak şöyle bir çalışma yaptık) optimize etmek istiyoruz

![](/images/archive/tr/2006/10/ps_web_opt_1.jpg)

web için optimize edebilmek için **CTRL + ALT + SHIFT + S** tuş kombinasyonunu kullanıyoruz veya, File / Save for web seçeneğine tıklıyoruz. Şuna benzer bir pencere geliyor karşımıza;

![](/images/archive/tr/2006/10/ps_web_opt_2.jpg)

 

**Burada dikkat edeceğimiz noktalar şunlar:**

1\. Kayıt, iptal butonlarının (save, cancel) altındaki panel. Yukarıda Jpeg için optimzasyon detaylarını görüyorsunuz. Quality değerini oynayarak dosya boyutunu ve resim kalitesini değiştirebilirsiniz.

2\. Sol altta 100% olan checkbox bizim kalite kaybını daha rahat görebilmemiz için resime yaklaşıp uzaklaşabilmemizi sağlayacak.

![](/images/archive/tr/2006/10/ps_web_opt_3.jpg)

3\. Sol altta Dosya boyutu ve kaç saniyede yüklenebileceğini ifade eden küçük bir bilgi kısmı var. Orada kalite ayarlarını oynarken sürekli dosya boyutunu kontrol ederek optimal kalite/dosya boyutunda resmimizi kaydedebileceğimizi belirleyebileceğiz.

4\. Sol üstte TAB'lar var burada Optimized sekmesinde olduğundan emin olun. Yoksa değişimlere ait kalite ve dosya boyutu değişimlerini göremezsiniz. Ayrıca 2-up ile 2 fakrlı optimizasyonu kalite bakımından aynı pencerede karşılaştırabilirsiniz. 4-up ile 4 farklı optimizasyonu karşılaştırarak en iyisini bulabilirsiniz. 2-up en idealidir ancak bunlara ihtiyaç duymadan gözünüzle bile tek parçada halledebilirsiniz (ben öyle yapıyorum en azından :) )

Jpeg optimizasyonu zaten yukarıdaki panelde görüldüğü gibidir. Maximum, High, Medium, Low şeklindeki seçeneklerle kolayca hazır optimize ayarlarını inceleyebilirsiniz. Kurcalamanız gerekiyor öğrenmek için :)

Gif veya png optimizasyonları için bahsettiğim panel, Save Cancel ... Buton grubunun hemen altında.. işte şu kısım :

![](/images/archive/tr/2006/10/ps_web_opt_4.jpg)

Gördüğünüz gibi preset kısmındaki combobox'tan

![](/images/archive/tr/2006/10/ps_web_opt_5.jpg)

Gif şeçeneklerden birini seçtiğiniz takdirde buna benzer bir panel karşınıza gelecektir. Gif ile ilgili seçeneklerde dikkat etmeniz gereken 2 nokta var. Eğer oluşturduğunuz gif dosyasında transparan alanlar var ise Transparent seçeneği seçili olması gerekir. Aksi halde o alanlar beyaz olarak kaydedilecektir.

2\. nokta ise gif optimizasyonunu yaptığımız kısım, yani renk sayısı. Colors'daki değer yani.. Bu değeri elle de girebilirsiniz fakat o kadar ince bir optimizasyon yapmıyorsanız esgeçip menüsündeki değerleri deneyebilirsiniz. Dither olayının ne olduğunu bilmiyorum, 1-2 kb değiştirebiliyor bazen.. Oynayıp görmek gerek.. Seçtiğiniz renk sayısına ait renk skalası hemen bu panelin alt kısmında oluşacaktır. Renk sayısını ne kadar azaltırsanız resminizdeki renkler ton olarak kayıp vermeye başlayacktır. Eğer siyah-beyaz resimler export ediyorsanız Gif gerçekten mantıklı seçim olacakıtr. Fakat renk sayınız çok ise ve dökümanınız büyük boyutlarda ise mesela 300 piksel ve üzeri, o zaman jpeg ve png seöçeneklerini denemenizi tavsiye ederim.

Şimdi size birkaç sonuç göstereceğim:

![](/images/archive/tr/2006/10/ps_web_opt_6.jpg)

Burada aynı imajın farklı export ayarları ile ortaya çıkmış sonuçlarını görüyoruz. Örnekteki bu imaj çok renkli bir imaj olduğu için (aynı zamanda boyut olarak da az çok büyük bir imaj) dosya boyutu olarak gördüğünüz gibi gif'lerden daha ekonomik oluyor. Ayrıca daha kaliteli..

Küçük imajlar ile uğraşıyorsanız, mesela butonlar, ikonlar vs vs, ne kadar renkli olursa olsunlar gif ile çalışmanızın sonuçları daha küçük boyutlu dosyalar çıkaracaktır.

Bu dökümanda anlatılanlar sadece internet geliştiricilerine yönelik değil, tüm internet kullanıcılarının oldukça işine yarayacak birşeydir. Çünkü ekonomik boyutlarda imajların alış-verişi de kolay olduğu için, bir resmi eposta ile gönderiyorsanız bu optimizasyonu yaparak göndermeniz hem sizin için hem de karşı taraf için zaman tasarrufu demektir.