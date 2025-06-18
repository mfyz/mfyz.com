---
title: "GIMP ile Web Animasyonu Oluşturmak (GIF)"
slug: gimp-ile-web-animasyonu-olusturmak-gif
date: 2008-02-05
description: "Açık kaynak kodlu GIMP yazılımı kullanarak katmanlar halinde web için GIF animasyonları hazırlama rehberi. Sahnelerin oluşturulması, GIF optimizasyonu ve kaydetme adımları."
url: http://mfyz.com/tr/gimp-ile-web-animasyonu-olusturmak-gif/
tags: ["GIMP", "GIF", "animasyon", "web tasarımı", "grafik tasarım", "eğitim", "açık kaynak"]
category: Tasarım
migration: {"wpId":123,"wpPostDate":"2008-02-05T08:07:51.000Z"}
lang: tr
---

#### Web Animasyonu?

Hani sitelerde reklam (banner) olarak görürüz ya, birkaç sahne vardır ve belirli sürelerde geçiş efektleri veya doğrudan geçerler. İşer o animasyonlar gif animasyonlarıdır (bilmeyenler için). Gif animasyonları aslında normal statik resim dosyalarından çok da farklı değildirler, içlerinde birden fazla resim varmış gibi bir paket şeklindedirler. Hangi resmin hangi sırayla görüntüleneceği, kaç saniye ekranda kalacağı gibi bilgiler içerirler. Bu dökümanda açık kaynak kodlu resim işleme yazılımı gimp ile web animasyonları yani gif yapımını anlatacağım.

Öncelikle hazırlayacağınız animasyondaki sahneleri kafanızda belirlemeniz gerek. Belirledikten sonra tek tek resimleri çizeceksiniz. Ya da hazırlayacaksınız. Kısa bir örnek vermek gerekirse ufak bir reklam animasyon tasarlıyorsanız bir artalan ve üzerinde değişen cümleler canlanır kafanızda. Artalanı yerleştirirsiniz ve cümleleri yerleştirerek sahnelerinizi oluşturabilirsiniz.

#### Başlıyoruz

Çalışmak için boş bir imaj oluşturuyoruz.

![](/images/archive/tr/2008/02/1.gif)

Boş imajımızı sahne sahne dolduracağız. Hazır fırça ve basit bir font ile hazırladığım animasyonun ilk sahnesi şu şekilde:

![](/images/archive/tr/2008/02/2.gif)

Sahneleriniz tek katman (layer) olması gerekiyor. Onun için şu anki ilk sahnemi tek katman yapmak için katmanlardan birine sağ tıklayıp "Flattern Image"i tıklıyorum

![](/images/archive/tr/2008/02/3.gif)

böylece tek parça hale geliyor imajım. Yani tek katmana dönüşüyor buradaki gibi

![](/images/archive/tr/2008/02/4.gif)

> Burada unutmamanız gereken detay, bazı sabit kısımları kullanıyorsanız bile (mesela artalan), hazırladığınız sahnelere ait katmanların hepsinde bu kısımların var olması. Mesela artalanı en alta koyup sadece yazılar değişiyorsa, yazıları sahne sahne gibi ayarlamayın. Her sahneye ait katman da artalanı içeriyor olması gerek. Zaten az sonra gif için optimize ettiğimizde gim renk değişimlerine göre en ideal şekile sokacak resminizi.

> Not : Diğer sahneleri tek katmana çevirirken, hazırladığınız diğer sahnelerin katmanlarını gizleyin, sadece birleşecek katmanlar görünür kalsın, Bu sefer Flatter Image yerine "Merge Visible Layers"ı tıklayın. Bu sayede sadece görünür katmanlar birleşecektir. Adlandırıp sıradaki sahnenizi tasarlamaya devam edebilirsiniz.

Ardından diğer sahnelerimi de aynı teknikle hazırlıyorum.

![](/images/archive/tr/2008/02/5.gif)

3 sahnelik yani 3 katmanlık imajım oluşmuş durumda. Katmanları gösteri sırasına göre **ters** sırada sıralıyorum. Aşağıda katman adlarından sıralamayı anlayabilirsiniz.

![](/images/archive/tr/2008/02/6.gif)

İmaja sağ tıklayıp, "Filters / Animation / Optimize For Gif"i tıklayarak resimeki renk düzenini GIF'e göre azaltıyor yani optimize ediyoruz. Eğer bu işlemi yapmazsanız dosya boyutunuz zaten animasyon olduğundan fazlaca büyük olabilir. Bu işlemle renk dağılımını kullanarak bir nebze bu boyutu düşürebiliyoruz.

![](/images/archive/tr/2008/02/7.gif)

Katmanlarınıza bazı ekler gelecektir. Adlarını değiştirmeyiniz. İlk parantez içindeki rakamlar sahne gösterim sürelerini ifade etmektedir. Bu sayıları katman adlarını değiştirir gibi milisaniye cinsinden değiştiriniz (1000 ms = 1 sn demektir).

![](/images/archive/tr/2008/02/8.gif)

Animasyonunuzu önizleme yapmak istiyorsanız imajın üstüne sağ (veya menüsüne) tıklayın, "**Filters / Animation / Playback**"ı tıklayın. Çıkan pencerede Play/Stop tuşu ile oynatıp durdurabilir diğer tuşlarla navigasyonu sağlayabilirsiniz. Süre değişimini burada test edip imajımızı animasyon olarak kaydedelim.

![](/images/archive/tr/2008/02/9.gif)

Save veya CTRL+S ile dosya konumunu ve adını belirliyoruz. Dosya uzantısını ".gif" girince otomatik olarak gif ayarları karşımıza çıkacaktır.

![](/images/archive/tr/2008/02/10.gif)

gif kaydederken animasyon olduğundan "Save as Animation" türünü seçiyoruz. Çünkü katmanlarımız birer sahne.

![](/images/archive/tr/2008/02/11.gif)

Animasyon seçenekleri bir sonraki panelde beliriyor. "Loop forever"i işaretlemezseniz animasyon 1 kere oynar ve durur. Sahnelere ait süre belirtmiştik fakat bu süreleri doğrudan uzatmak için 2. parametreyi değiştirebilirsiniz.

Sonuç şöyle birşey oluyor :

![](/images/archive/tr/2008/02/sonuc.gif)