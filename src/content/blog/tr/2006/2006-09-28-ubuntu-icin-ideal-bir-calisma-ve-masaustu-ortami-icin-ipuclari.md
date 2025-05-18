---
title: "Ubuntu için ideal bir çalışma/masaüstü ortamı için ipuçları"
slug: ubuntu-icin-ideal-bir-calisma-ve-masaustu-ortami-icin-ipuclari
date: 2006-09-28
url: http://mfyz.com/tr/ubuntu-icin-ideal-bir-calisma-ve-masaustu-ortami-icin-ipuclari/
tags: ["desktop","gnome","masaüstü","OS","ubuntu","workspace"]
category: OS
migration: {"wpId":99,"wpPostDate":"2006-09-28T21:15:23.000Z"}
lang: tr
---

Bildiğiniz gibi ubuntu yüklendiğinde gnome masaüstü ortamı ile gelmektedir. Gerekli işlemleri yaparak çok hızlıca gnome masaüstü ve yüklü durumdaki yazılımları son sürümlerine yükseltebilirsiniz. Ancak gnome masaüstü ile gelen daha doğrusu ubuntu ile yüklü gelen yazılımlar yetmeyecektir. Bu makalede kolayca günlük işlerinizi halletmeniz için gerekli yazılımları nasıl kuracağınızı, ve neleri kullanabileceğiniz hakkındaki önerilerimi sizinle paylaşacağım.

#### Araçlar

Günlük herkesin kullandığı bazı standart programlar vardır.

Bunları sıra ile kuralım :

**PDF okuyucu** olarak gnome'da size 2 program önereceğim. Birincisi gnome yani gtk için yazılmış olan evince programı, diğeri de Adobe'un resmi kendi okuyucusu olan adobe acrobat reader olacaktır. Evince programı gtk için yazıldığından acrobat'dan çok daha hızlı açılacak ve çalışacaktır. Ancak bazı noktalarda özel içerik objelerini desteklemeyebilir. Veya bazen bir pdf dosyasını txt'ye dönüştürüp kaydetmek isteyebileceksiniz. Bu gibi fonksiyonlar dışında sadece okuma işlemleriniz için evince adlı program fazlasıyla yeterli olacaktır. Bu iki yazılımı kurmak için `sudo aptitude install evince acroread` komutunu vermeniz yetecektir.

**Sıkıştırma araçları** ve rar desteğini sağlamak için file-roller programını kullanacağız. Konsoldan zip ve rar komutlarını uygulayarak da kullanabilirsiniz fakat GNOME için file-roller programı gayet pratik bir kullanım sağlayacaktır. File-Roller'i kurmanıza gerek yok çünkü Applications (Uygulamalar) / Accessories (Türkçesi Araçlar olsa gerek) menüsünde Archive Manager olarak geçer. Aynı zamanda herhangi bir dosya/dizine sağ tıkladığınızda nautlius'un menüsünde Create archive ve Extract here gibi seçeneklerin olduğunu göreceksiniz. Bunları kullanarak oldukça pratik bir şekilde sıkıştırılmış dosyalar oluşturabilirsiniz. File-Roller programına RAR desteği vermek için rar paketini kurmamız gerekir. Bunun için: `sudo aptitude install rar unrar` komutunu vermeniz gerekir. Artık Create archive sihirbazında rar göreceksiniz, aynı zamanda rar dosyalarına sağ kliklediğinizde Extract seçenekleri de görünecektir.

#### Multimedya Programları

**Mp3 ve müzikçalarlar** için önerim 2 farklı yazılım olacak Aslında önerebileceğim çok program var. Genellikle orta ölçekli de olsa geniş bir mp3 arşiviniz olduğunu düşünüyorum. Binlerce mp3'ü kolayca bulabilmek için rhythymbox veya banshee gibi bir jukebox kullanın. İkisi de birbirine çok benziyor ve systray yani köşedeki aktif programları barındıran sistem appletinde yer alıp pencere kalabalığı yapmıyorlar. İkisinde de puanlama, istatistik, arama/tarama özellikleri gibi güzel özellikler var. Rhythymbox programı ubuntu ile kurulu olarak gelecektir. Banshee'yi ise `sudo aptitude install banshee` komutu ile kurabilirsiniz.

2\. müzik çalar ise dosya/dizin taraması yaparak ulaşacağınız mp3 dosyalarını müzik kütüphanesine kayıt ettirmeden winamp benzeri basit bir program ile dinlemek amacı ile beep-media-player'ı kullanmanız olacaktır. Eski winamp (winamp-classic) arabirimli ve eski winamp skinlerini 1-1 destekleyen, basit ve tanıdık bir pencere düzeni olan mini bir program. Bunu sürükle bırak tekniği ile kolayca mp3'lerinizi çalabilirsiniz. Kurmak için: `sudo aptitude install beep-media-player`

#### Film oynatıcılar ve codecler

Bu çok geniş bir konu aslında ama özetle 3 tane player önereceğim birisi çok iyi bildiğiniz VLC, vlc paketi ile kurabilir ve her işletim sisteminde olduğu arabirim ve fonksiyonlarla kullanabilirsiniz. 2.si ubuntu ile hazır gelen TOTEM olacak, yanlız totem eğer gstreamer plug-in'lerini kurmazsanız birçok codec'i desteklemeyecektir. Sadece tamamen yasal ve gpl olan global codec'leri çalıştıracaktır. Gstreamer olarak aratıp plugin'lerin hepsini kurarak az çok yırtmış olursunuz. Son olarak tabiki ve tabiki mplayer. İmkanınız ve bilginiz var ise kesinlikle oturup bu programı derleyin, sitesinde bulunan w32codecs paketini indirip kurarsanız (deb halinde var) windows'ta çalışan tüm codec'leri izleyebilirsiniz. Ayrıca Essential-codec paketini de kurarsanız izleyemeyeceğiniz film yok diyebilirim. Tabiki real media ve mov dosyaları için ek kütüphaneler kurmak gerekebilir, bunlar için ubuntuforums'da arama yaparsanız kolayca birçok sonuca ulaşabilirsiniz.

#### Grafik yazılımları

Bütün işlerinizi yapabileceğiniz 2 yazılım gimp ve gthumb ubuntu ile yüklü olarak gelecektir. Gimp ve gthumb'u iyi kullanırsanız gerçekten her işinizi çok kolayca göreceksiniz bundan eminim. Ancak alışkanlıklardan vazgeçemediğimiz veya çok janjan görmeye alışık olduğumuzdan birkaç programdan bahsedeceğim yine de. Vektör grafikler çizip düzenlemek için inkscape ve sodipodi paketlerini kurarak bu iki yazılımı kullanabilirsiniz. Aynı zamanda Xara da artık extreme edition ile linux'a destek veriyor. xaraxt paketini aradığınızda göreceksiniz :) F-Spot ve google picasa'nın sitesinden ubuntu için olan paketi indirerek kurabileceğiniz Picasa2 ise foto albümlerinizi rahatlıkla yönetmenizi sağlayacaklardır.

#### İnternet işleri :)

İnternette genellikle yazışma yazılımları, eposta ve haber okuyucuları ile ilgileniriz. Sırayla ; MSN, Yahoo, AIM, Jabber.. vs vs bi sürü protokol destekliyor; GAIM işinizi çok rahat görecektir. Haber (RSS) okuyucu için; Liferea, Blam da gayet hoş ve sade bir arabirim ile son derece kolay yönetmenizi sağlayacak. E-Posta için Thunderbird ve Evolution programını öneririm. Surf için Firefox ve Opera'yı kullanabilirsiniz.

Wirelless aygıtınız var ise gnome için network-manager-gnome paketi ile kuracağınız Network manager, systray'ınıza yerleşecek ve 1 tık ile kolayca menzilinizdeki wirelless ağlarını tarayabilecek ve 1 tık daha yaparak kolayca o ağlara bağlanabileceksiniz. Son derece kullanışlı bir zamazingo, kesinlikle önerilir.

Ayrıca Gmail kullanıcısı iseniz gmail-notify paketi ile systray'ınıza gmail mail uyarılarını ekleyebilirsiniz. Bu yazılım da gerçekten hoşuma giden panel amcasıdır..

#### Program/web geliştirme için yazılımlar :

Birçoğunuzun en çok merak ettiği kısım olduğuna eminim :) Ben kod yazarken bir kde programı olan quanta'yı ve bazen de bluefish'i kullanıyorum. Hızlı kod editlemek için ise mousepad denilen son derece ilkel metin editörünü kullanıyorum. Bazen hızlıca bir HTML arabirimi oluşturmam gerektiği zaman (ki bu program dreamweaver'a alternatif gösterilir linux için, WYSIWYG HTML Editörüdür) Nvu programını kullanırım. Aynı zamanda Screem'i de öneririm.. Bu programları adlarına göre synaptic'de aratarak bulabilir ve kurabilirsiniz. CSS yazarken ise "cssed" paketi ile kurabileceğiniz basit CSSEd programını kullanıyorum bazen.

#### Son birkaç gerekli şey :

Sisteminizde flash player ve microsoft font'ları olmadığı için desteklemeyecektir. `sudo aptitude install flashplayer-nonfree` komutu ile flash'i; `sudo aptitude install msttfcorefonts` komutu ile de microsoft destekli fontları (Arial, Tahoma, Times New Roman... vs) kurabilirsiniz.

Eğer bulma şansınız var ise crossoveroffice programını (paralıdır, ve lisansı farklıdır) kurarak Windows'ta kullandığınız Dreamweaver ve Photoshop gibi programları sorunsuz kullanabilirsiniz. (Not : Eski sürümlerini destekliyor, DW MX, PS7 gibi, Yenilerinde sorun çıakrabiliyor...)

Eğer gnome masaüstünde neler kullanabilirim, ne gibi programlar var var benim işime neler yarar diye merak ediyorsanız (ki biliyorum ediyorsunuz), size önerim, açın synaptic paket yöneticinizi ve orada kategori kategori programlar sıralanmıştır. Oradan açıklamalarını okuyarak gnome gtk destekli olanlardan hoşunuza giden, merak ettiğinizi kurarak deneyin. Denemeden size cevap vereceğini düşünmeyin. Aynı şekilde yazılımları keşfetmek için en iyi yerler forumlardır, bknz : [www.ubuntuforums.org](http://www.ubuntuforums.org)

Son olarak bunu kesinlikle yapın, http://www.gnomefiles.org/ sitesine girin ve kategori kategori gnome için yazılmış programları gezin, açıklamalarını okuyun ve ekran görüntülerine bakıp ana sayfalarını gezinin. Hoşunuza giden programı synaptic ile aratıp bulup, kurun ve deneyin. Unutmayın ben de oradaki tüm programları deneyerek şu andaki çalışma ortamıma kavuştum :) Bulduğunuz bir şeyden daha iyisini bulamayacağınızı araştırmadan bilemezsiniz.