---
title: "Gimp'de yumuşak köşeli kutucuklar yapmak"
slug: gimpde-yumusak-koseli-kutucuklar-yapmak
date: 2005-02-06
url: http://mfyz.com/tr/gimpde-yumusak-koseli-kutucuklar-yapmak/
tags: ["gimp","howto","kutu","nasil","Tasarım","yumuşak köşe"]
category: Tasarım
migration: {"wpId":59,"wpPostDate":"2005-02-06T08:53:22.000Z"}
lang: tr
---

#### Yumuşak köşeli kutucuk nasıl bişeydir, ne işe yarar?

Bu sitede gördüğünüz çoğu şey yumuşak köşelere sahip kutucuklar ile görüntülenmekte, bunun dışında butonlar ve üst menüde gördüğünüz tab şeklindeki menü de yumuşak köşelere sahip. Yumuşak köşeden kastım, dikdörtgen gibi sert köşeler yerine yuvarlatılmış dönüşlere sahip köşeli şekildir. Bu dökümanda basit bir dikdörtgeni çeşitli yöntemlerle yumuşatıp köşelerini kuvarlatmayı göreceğiz.

Öncelikle boş bir çalışma belgesinde bir dikdörtgen seçim yapıp içerisini istediğimiz dolgu rengi ile dolduruyoruz.

![](/images/archive/tr/2005/02/gmp_ykk_1.png)

Ardından seçimi kaldırıp bütün bunları tek bir katmanda topluyoruz.

![](/images/archive/tr/2005/02/gmp_ykk_2.png)

Bu katmanı seçip resimde iken sağ tıklıyoruz, **Filter / Blur / Gaussian Blur (IIR)**'a tıklayıp kendi ayar panelini açıyoruz.

![](/images/archive/tr/2005/02/gmp_ykk_3.png)

Burada yukarıdaki gibi, 10,10 değerleri verip ok diyoruz, imajdaki çizdiğimiz sert hatlı kutucuk bulanacaktır.

![](/images/archive/tr/2005/02/gmp_ykk_4.png)

Şimdi bu bulanık hattı sertleştirelim, Resimde sağ tıklayıp, **Layer / Colors / Levels**'a tıklayıp levels penceresini açalım.

![](/images/archive/tr/2005/02/gmp_ykk_5.png)

Yukardaki resimde görüldüğü gibi üst kısımdaki iki tuvarlak içerisine alınmış oku birbirine yaklaştırdığımızda uygulanacak olan katmandaki değişim hemen görülebilir şekilde sertleşmeye başlayacaktır. Resimin yumuşaklığını bozmamak için onları fazla yaklaştırmıyoruz. Biraz oynayarak uygun noktaları resime göre zaten bulabilirsiniz. Benim yaptığım yumuşaklık ayarı sonucu aşağıdaki gibi olacaktır.

![](/images/archive/tr/2005/02/gmp_ykk_6.png)

Araç penceresinden ![](/images/archive/tr/2005/02/gmp_ykk_icon.png) ikonuna tıklayıp renge göre seç aracını seçelim. Resimde beyaz kısımlardan herhangi bir yere tıkladığımızda o renge ait belirli toleransa göre olan renklerin kapladığı kısımlar seçilecektir. Bu toleransı ne kadar düşürürsek seçim o kadar sert ama artık renk o kadar az oalcaktır. Araç ayarları panelinden bu toleransı ayarlayabilirsiniz. Burada kendinize ve o anda çalıştığınız resime göre bir denge bulmanız gerekir.

![](/images/archive/tr/2005/02/gmp_ykk_7.png)

Seçimi temizleyelim ve katmanı yeni adla kaydedip yeni bir artalan katmanı oluşturalım.

![](/images/archive/tr/2005/02/gmp_ykk_8.png)

![](/images/archive/tr/2005/02/gmp_ykk_9.png)

Artalanı beyaz yaptığımzda daha önce elde ettiğimiz şekillerden birin elde ediyoruz ancak, bu sefer farklı katmanda.. :)

Böylece yuvarlak hatlı bir kutucuk elde ettik, bunun farklı renklerdeki kombinasyonlarını, üzerine eklenecek ikonları ve farklı boyutlarını düşünürsek oldukça fazla alanda kullanabiliriz. İşte çok küçük değişimle birşeye benzettiğim versiyonu :

![](/images/archive/tr/2005/02/gmp_ykk_10.png)