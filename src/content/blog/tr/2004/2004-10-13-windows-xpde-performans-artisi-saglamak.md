---
title: "Windows XP'de performans artışı sağlamak"
slug: windows-xpde-performans-artisi-saglamak
date: 2004-10-13
url: http://mfyz.com/tr/windows-xpde-performans-artisi-saglamak/
tags: ["OS","performans","windows","xp"]
category: OS
migration: {"wpId":100,"wpPostDate":"2004-10-13T04:33:21.000Z"}
lang: tr
---

Her windows versiyonundaki gibi windows xp'de de bazı kayıt defteri oynamaları ile işletim sisteminizin performansını bir nebze artırabilirsiniz.

#### Nedir şu Kayıt Defteri (Registry) dedikleri?

Kayıt defteri, windows'ta bulunan neredeyse her türlü ayar bilgisinin tutulduğu, binlerce kayıt içeren bir bilgi deposudur. Bilgisayarınızda prgramların pencerelerinin yeri, sistemi son açtığınız tarih, en son hangi işlemleri yapmışsınız, photosopta en son hangi 5 dökümanı açmışsınız... (aşırı fazla çoğaltılabilir) gibi ayarların saklandığı bu kayıt, bir program tarafından yönetilir. İşte bu programa Kayıt Defteri, İng : Regedit denir. Çok basit olan bu program windowsun içerisinde saklıdır.

Kayıt defteri programını açmak için;

![](/images/archive/tr/2004/10/1.gif)

Başlat » Çalıştır yolunun izleyerek "Çalıştır" penceresiniz açalım.

![](/images/archive/tr/2004/10/2.gif)

"regedit" yazıp OK diyelim. Böylece Kayıt Defterini açmış olacağız.

Şimdi geçelim az ama öz olan şu değişikliklere

#### Kullanımı geçmiş DLL'ler...

Bir programı açtığınızda o program sistemin ön belleğine kullanacağı DLL dosyalarını yükler. Program kapatıldığında o DLL dosyaları silinmez. Çünkü aynı oturum boyunca o program bir daha kullanılacak olursa daha hızlı yüklemek ve daha hızlı çalışmak içindir. Ancak 10-15 program açmaya kalktığınızda sistemin önbelleği daha önce açtığınız ve kullanmadığınız programların DLL dosyaları bir de üstüne o anda açık olan programların DLL dosyaları ile dolmuş olacaktır. Böylece bilgisayarda çalışırken gözden kaçmayacak bir performans düşüşü olacaktır. Kayıt defterinde yapacağımız küçük bir değişiklik ile programlar kapanırken kullandığı DLL dosyalarını otomatik olarak sildireceğiz. Bunu yaptıktan sonra sistem uzun süre açık kalsa bile çok yorulmayacaktır. Ancak programlar her açılışta çok kısa bir süre de olsa geç açılacaktır. İşte bu noktada sizin için bir programı çabuk açmak mı? yoksa sistemi daha uzun süre mi kullanmak? soruları arasında bir seçimle karşılaşacaksınız. Herneyse kayıt defterinde "HKEY_LOCAL_MACHINESOFTWAREMicrosoftWindowsCurrentVersionExplorer" adresine gidin.

![](/images/archive/tr/2004/10/3.gif)

Boş bir alanda sağ tıklayarak Yeni » Dize Değeri yoluna tıklayarak yeni bir dize yaratın. Adını "AlwaysUnloadDLL" koyun.

![](/images/archive/tr/2004/10/4.gif)

Daha sonra bu değere iki kez tıklayarak değerini 1 olarak girin. Bilgisayarınızı yeniden başlattığınızda bu ayar uygulanmaya başlanacaktır. 3-5 saatlik bir çalışma sırasında bu ayarın farkına umarım varacaksınız.

#### Yanıt vermeyen uygulamalara balyoz darbesi!

Windowsta bir program yanıt vermediği zaman ekrana bir pencere çıkar ve Sonlandır butonu olan ve 20 saniye geri sayan bir trackbar çıkar. Sonlandır dediğinizde program kapanır. Siz Sonlandır demesenizde program artık sadece ölü bir ağırlıktır, Yüksek ihtimal ikinci pencerede kapatacaksınız :) İşte bu olayı otomatikleştirmek ve size sormadan yanıt vermeyen programları öldürmek için; "HKEY_CURRENT_USERControl PanelDesktop" adresine gidin. Listenin üst kısımlarında bulunan "AutoEndTasks" adlı anahtarı açın ve değerini 1 yapın.

![](/images/archive/tr/2004/10/5.gif)

Bundan sonra o Sonlandır penceresini görmeyeceksiniz.

#### Sonlandır penceresinin çıkmasını bile beklemeyin!

Bir önceki ayarı yapmış olsanız bile bilgisayar programların sonlandırılma görevini verene kadar belli bir süre programın yanıt vermesini bekler yani bozuk bir oyunun setup'ında bir yerde takılıyorsa biz bu oyunun bozuk olduğunu o takıldığı yerde bayaaa bi bekledikten sonra anlarız :)) İşte bu anlama süremiz windowsta da bu olaya denk gelen şey geçerli olarak 20 saniyedir. Bu süreyi kısaltmak için; "HKEY_LOCAL_MACHINESYSTEMControlSet001Control" adresine gidin.

![](/images/archive/tr/2004/10/6.gif)

"WaitToKillServiceTimeout" adlı anahtarın değeri 20000 iken siz bunu 4000 yapın böylece programların suxlayıp suxlamadıklarını 20 saniye yerine 4 saniyede algılatıp otomatikmen öldürtmüş olacağız. Ancak bundan sonra açılırken veya birşeyler yapmaya kalktığınızda kendiliğinden kapanmış gibi görünen olaylar yaşayabilirsiniz.

#### Menülerin açılması için beklememek

Başlat menüsünde programların içinde program grupları arasında dolaşırken bir grubun üstüne geldiğinizde açılması için 0,4 saniye beklemeniz gerekir. Bu bekleme süresini 0 yaparak menüleri açarken zbank zbank diye açılmasını sağlayabilirsiniz. Bunun için; "HKEY_CURRENT_USERControl PanelDesktop" adresine gidin.

![](/images/archive/tr/2004/10/7.gif)

Listeden "MenuShowDelay" anahtarının değeri 400 iken 0 yapın. Bilgisayarınızı yeniden başlattığınızda Programlardaki grupları hızlıca açıp kapatabilirsiniz.