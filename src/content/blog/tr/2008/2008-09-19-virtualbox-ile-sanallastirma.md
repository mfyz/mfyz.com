---
title: "VirtualBox ile Sanallaştırma: Web Geliştiriciler İçin Pratik Bir Çözüm"
slug: virtualbox-ile-sanallastirma
date: 2008-09-19
description: "Sanallaştırma teknolojisinin faydaları ve VirtualBox'ın web geliştiriciler için (özellikle Internet Explorer testleri) ücretsiz ve açık kaynaklı bir alternatif olarak nasıl kullanılabileceği anlatılıyor. VMware ile karşılaştırmalar da içerir."
url: http://mfyz.com/tr/virtualbox-ile-sanallastirma/
tags: ["VirtualBox", "sanallaştırma", "virtualization", "VMware", "açık kaynak", "web geliştirme", "test", "Internet Explorer", "işletim sistemi", "Diğer"]
category: Diğer
migration: {"wpId":205,"wpPostDate":"2008-09-19T06:21:22.000Z"}
lang: tr
---

Bilmeyenler için [http://tr.wikipedia.org/wiki/Sanal_Makine](http://tr.wikipedia.org/wiki/Sanal_Makine) sanallaştırma eskiden sadece fantezi ürünü idi. Yani bir makine içinde başka bir makine çalıştırmanın avantajlarını ilk başta göremedik. Ama sonraları sanallaştırma ile sunucu sektöründe VirtualPrivateServer'lar ortaya çıktı ve işlerimizi kolaylaştırmaya başladı. Çoğu sunucuda da tek makine üzerinde farklı işletim sistemlerindeki sunucu yazılımları haberleştirilip kullanılmaya başlandı.

Yani mesela müşteriniz mail server olarak zamanında binlerce dolar verip exchange server lisansı almış. Şimdi yeni projesindeki sunucusunda python, php linux vs yardırıp kod yazmışsınız, bash ile sürü sepet yönetim zamazingosu üretip adama güzel bir sistem vermişsiniz. Ama müşteriniz mail sunucusundan vazgeçmiyor. İşte bu noktada xen veya vmware ya da virtualbox gibi alternatifler devreye giriyor. Linux sunucunuzun üstünde windows server sanallaştırarak exchange server'ı kurup kullanıyorsunuz. Aynen 2 makineyi haberleştirir gibi bu sanal makineleri kulanıyorsunuz. Ya da sırf fantezi olsun diye bütün sunucu işlerini ayrı ayrı sanal makinelere bölüyorsunuz. Mesela httpd bir makinede mysql bir makinede eposta bir makinede dns farklı bir makinede çalışıyormuş gibi oluyor. Elinize ne geçiyor? Belki güvenlik, yani bir açıktan dolayı bir sanal makineyi ele geçiren bir salırgan kuracağınız iyi kurallarla diğer servislere dalamıyor veya gerçek olan makineyi ele geçiremiyor.

Neyse buraya kadar hikaye anlattım size ;) Şimdi gerçeğe dönelim. Daha önce Vmware Fusion, linuxta vmware player kullanarak (bana zorla satıp kakaladıkları) lisanslı bir windowsumu sanal makineye kurarak internet explorer testlerimi ek bir makineye gerek kalmadan yapıyordum.

Tabiki vmware fusion beta olduğu için ücretsiz, vmware player da ücretsiz olduğu için rahattım. Fakat işlerimi daha özgür bir yazılım çözmeliydi. Sun zamanında innotek'i dolayısıyla virtualbox'u satın almıştı (ya da ben öyle hatırladığımı zannediyorum). Ellerine sağlık çok da kaliteli bir çözüm sunmuşlar. Virtualbox ile ie testlerimi rahatça yapabiliyorum. Açıkcası vmware-tools'dan daha başarılı bir sürücü seçeneği var. Yakın zamanda aldığım macbookpro'mu hiç yormadan 2-3 tane işletim sistemi açıp testlerimi rahatça yapabiliyorum. Bir web geliştiricisi için gerekli birşey, sizlere de öneririm.

VirtualBox hakkında sitesinden bilgi alıp indirip kullanabilirsiniz. Tabiki GPL ve crossplatform çalışması da dadundan yinmez hale getiriyor.

[http://www.virtualbox.org/](http://www.virtualbox.org/)