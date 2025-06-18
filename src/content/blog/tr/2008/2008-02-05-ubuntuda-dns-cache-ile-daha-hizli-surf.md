---
title: "Ubuntu'da DNS Cache ile Daha Hızlı Surf"
slug: ubuntuda-dns-cache-ile-daha-hizli-surf
date: 2008-02-05
description: "Ubuntu ve Debian sistemlerde Dnsmasq kullanarak yerel DNS önbellekleme (cache) nasıl yapılır? Bu sayede internette gezinme hızınızı artırın. Kurulum ve yapılandırma adımları."
url: http://mfyz.com/tr/ubuntuda-dns-cache-ile-daha-hizli-surf/
tags: ["Ubuntu", "Linux", "DNS", "cache", "Dnsmasq", "internet hızı", "ağ ayarları"]
category: OS
migration: {"wpId":124,"wpPostDate":"2008-02-05T08:14:11.000Z"}
lang: tr
---

#### DNS Nedir?

DNS (Domain Name System) internet sitelerinin adları olan alan adları hakkındaki bilgileri tutar. Ve hosting yani sitelerin barınmalarından ayrı düşünülen bir yapıdır. İnternet tarayıcısı veya herhangi bir istemci (client) ile bir alan adı girdiğinizde, örneğin: tarayıcıda [http://www.google.com](http://www.google.com) ya da ftp istemcinizde ftp://ftp.deneme.com şeklinde girdiğinizde yapılan ilk işlem bu alan adının nerede barındığını bulmaktır. Bu işi eğer özel bir dns belirtmemişseniz internet servis sağlayıcınız (ISP)'dekivarsayılan DNS'lerden başlayarak internette sorgulamaya başlayacaktır. Siz adresi girdiğinizde tüm internet ağında DNS sunucular birbirlerine "www.bilmemne.com adresini tanıyor musun?" diye soracaktır. Alan adına ait bilgiler bulunduğu takdirde size adres bilgisi dönecektir. Kullandığınız program gelen adres bilgilerini (ip) işleyerek doğrudan o adrese istek gönderip işleminizi yapacaktır.

Günümüzde hattımız ne kadar hızlı olursa olsun eğer iyi bir DNS yapılandırmamız yoksa gereksiz yere saniyeler kaybedebiliriz. Bunu kaldırmak için çeşitli yöntemler geliştirilmiştir fakat en güzeli (benim bildiğim) dns cache yapmaktır. Eğer cache yapan proxy'ler kullanırsanız bunu düşünmenize gerek kalmayacaktır. Fakat cache'lerin yenileniyor olması gibi sorunlarla da karşılaşabiliyorsunuz bazen :) Sonuç olarak bu dökümanda size local ağınızda dns cache nasıl yapabileceğinizi anlatacağım.

Ubuntu üzerinden anlatacağım fakat proje sayfasına gidip dağıtımınız için olan paketi indirip kurabilir, ya da kaynak kodu derleyip az sonra anlatacağım aracı kullanabilirsiniz.

DNS Cache için Dnsmasq ([http://www.thekelleys.org.uk/dnsmasq/doc.html](http://www.thekelleys.org.uk/dnsmasq/doc.html)) aracını kullanacağız. dnsmasq'in kaynak koduna erişmek için [http://www.thekelleys.org.uk/dnsmasq/](http://www.thekelleys.org.uk/dnsmasq/) adresini ziyaret ediniz.

#### Ubuntu (ya da debian)'da

`sudo apt-get install dnsmasq` Gnome için **System -> Administration -> Networking** menüsünden ulaşacağınız ayar panelinde DNS sekmesinde 127.0.0.1 dns adresini girip en üste taşıyın. Eğer dinamik ip alıyorsanız muhtemelen bir sonraki başlangıçta (boot) bu ayar kaybolacaktır.

/etc/dhcp3/dhclient.conf dosyanızdaki `prepend domain-name-servers 127.0.0.1;` satırının başındaki "#" karakterini kaldırın ve adresi yukarıdaki gibi yapın. Bundan sonra dns sorgularında ilk önce bilgisayarınızdaki cache'e sorulacaktır.

Ağınızı tekrar başlatıp test ediyoruz. **dig** komutu ile cevap (response) sürelerini tespit edebiliriz.

İlk önce hiç girilmemiş bir adresi dig'leyelim :
```
fatih@pingu:~$ dig www.kernel.org

; <<>> DiG 9.3.2 <<>> www.kernel.org
;; global options: printcmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 6472
;; flags: qr rd ra; QUERY: 1, ANSWER: 3, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;www.kernel.org. IN A

;; ANSWER SECTION:
www.kernel.org. 451 IN CNAME zeus-pub.kernel.org.
zeus-pub.kernel.org. 451 IN A 204.152.191.37
zeus-pub.kernel.org. 451 IN A 204.152.191.5

;; Query time: 350 msec
;; SERVER: 127.0.0.1#53(127.0.0.1)
;; WHEN: Thu Feb 15 15:37:55 2007
;; MSG SIZE rcvd: 87

```
Şimdi aynı adresi tekrar dig'leyelim ve sonucu yorumlayalım :
```
fatih@pingu:~$ dig www.kernel.org

; <<>> DiG 9.3.2 <<>> www.kernel.org
;; global options: printcmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 3770
;; flags: qr rd ra; QUERY: 1, ANSWER: 3, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;www.kernel.org. IN A

;; ANSWER SECTION:
www.kernel.org. 448 IN CNAME zeus-pub.kernel.org.
zeus-pub.kernel.org. 448 IN A 204.152.191.5
zeus-pub.kernel.org. 448 IN A 204.152.191.37

;; Query time: 2 msec
;; SERVER: 127.0.0.1#53(127.0.0.1)
;; WHEN: Thu Feb 15 15:37:58 2007
;; MSG SIZE rcvd: 97

```
Bakın sondan 4. satırda query time'da dns'den gelen cevap süresini görebiliyoruz. İlk çıktıda benim kullandığım dns'in kernel.org'u bulması 350 milisaniye sürmüş, ancak ikinci sorguda ise **2 milisaniye** sürmüş.

Şimdi bu kadar işlemi saniyenin 1/3'ü için mi yapacam diyebilirsiniz fakat kernel.org benim kullandığım dns'in cache'lediği, kullandığım proxy'nin cache'leyip bana gönderdiği süredir. Yani internetteki yoğunluğu beklediğim süredir. Mesela uzakdoğudaki bir alanı bulmaya çalışırsanız bu bırakın milisaniye 5-10 saniyelere hatta bazen 30 saniyelere kadar çıkar. Ancak local dns cache yapıyorsanız bu süre neredeyse 0'a inecektir. Bu süre de işlemci gücünüze ve ne kadar çok cache'lenmiş adres olduğuna bağlıdır fakat bu süre 5-10 milisaniye üstüne çıktığı görülmemiştir :)

Bu birkaç adreste farkedilmez fakat günlük girdiğiniz sunucularda gözle görülür hız farkına rastlayacaksınız. Mesela her google.com yazdığınızda dns response süresi beklersiniz. Her seferinde istek ve cevap için vakit kaybedersiniz.

Hızlı Surfler