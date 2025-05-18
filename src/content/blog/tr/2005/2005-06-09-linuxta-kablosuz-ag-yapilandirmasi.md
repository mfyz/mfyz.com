---
title: "Linux'ta kablosuz ağ yapılandırması"
slug: linuxta-kablosuz-ag-yapilandirmasi
date: 2005-06-09
url: http://mfyz.com/tr/linuxta-kablosuz-ag-yapilandirmasi/
tags: ["kablosuz ağ","OS","wireless","yapılandırma"]
category: OS
migration: {"wpId":68,"wpPostDate":"2005-06-09T16:03:26.000Z"}
lang: tr
---

Linuxta kablosuz ağ ayarları basit network konfigürasyonundan farksız aslında.. İlk önce wirelles aygıtınızın tanınıyor olması gerek. Bu kısım donanımsal birşey olduğundan sadece benim elimdeki donanımı örnek gösterip geçeceğim. Intel Pro Wirelles 2200 wlan kartım var, genel olarak bu donanım yaygın zaten wirelles araçlarında. ipw2200.sf.net adresinden güncel sürücülerini edinebilirsiniz. Bilgisayarınızın iw2200 modülünü yüklemiş olup olmadığını **lsmod** ile kontrol ediyoruz :
```
Module                  Size  Used by
...
ipw2200                66156  0
firmware\_class          9728  1 ipw2200
ieee80211              21252  1 ipw2200
ieee80211\_crypt         5832  2 ieee80211\_crypt\_wep,ieee80211
...

```
**ifconfig** ile aygıtlarımızı kontrol ediyoruz. Bende ethernet eth0 wirelles kartımı da eth1 olarak görüyor.
```
root@tux:/home/fatih # ifconfig eth1
eth1      Link encap:Ethernet  HWaddr 00:0E:35:C4:78:6E
inet addr:192.168.2.4  Bcast:192.168.2.255  Mask:255.255.255.0
inet6 addr: fe80::20e:35ff:fec4:786e/64 Scope:Link
UP BROADCAST MULTICAST  MTU:1500  Metric:1
RX packets:13680 errors:101 dropped:102 overruns:0 frame:0
TX packets:3488 errors:0 dropped:0 overruns:0 carrier:0
collisions:0 txqueuelen:1000
RX bytes:3712909 (3.5 MiB)  TX bytes:304047 (296.9 KiB)
Interrupt:18 Base address:0x6000 Memory:fe8fe000-fe8fefff

```

Normalde ip almamış şekilde olması gerekir. Eğer almışsa zaten wirelles ağındasınızdır. Şimdi çevreyi tarayalım. iwlist eth1 scan komutu ile çevredeki erişim aygıtlarını tarayalım :
```
root@tux:/home/fatih # iwlist eth1 scan
eth1      Scan completed :
Cell 01 - Address: 00:30:F1:FF:01:5C
ESSID:"MFYZ"
Protocol:IEEE 802.11bg
Mode:Master
Channel:9
Encryption key:on
Bit Rate:54 Mb/s
Extra: Rates (Mb/s): 1 2 5.5 6 9 11 12 18 22 24 36 48 54
Extra: RSSI: -57  dBm
Extra: Last beacon: 27ms ago

```
Çevrede birden fazla kablosuz ağ bulunabilir bu listede gerekli bilgileri görüyoruz zaten. Şimdi birkaç ayarlama ile erişim sağlayacağız. Gerekli olan şeyler; ESSID denilen ağ kimliği benim ağım MFYZ adıyla görünüyor. Bu ağa kaydolmak için **iwconfig eth1 essid MFYZ** ile ağ kimliğini belirttik.

Benim ağım şifreli, WEP denilen bir hexademical anahtar ile erişilebiliyor sadece. Bunu **iwconfig eth1 enc XXXXXXX** şeklinde ayarlayacağız. Eğer şifreleme yoksa bu kısmı geçin. Varsayılan olarak şifreleme kapalı kabul edilecektir.

Şimdi iwconfig ile baktığımızda eth1 aygıtının bağlanıp bağlanmadığını göreceğiz.
```
root@tux:/home/fatih # iwconfig
lo        no wireless extensions.

eth0 no wireless extensions.

eth1 unassociated ESSID:"MFYZ"
Mode:Managed Channel=0 Access Point: 00:00:00:00:00:00
Bit Rate=0 kb/s Tx-Power=20 dBm
RTS thr:off Fragment thr:off
Encryption key:1C13-A443-3D Security mode:open
Power Management:off
Link Quality:0 Signal level:0 Noise level:0
Rx invalid nwid:0 Rx invalid crypt:0 Rx invalid frag:0
Tx excessive retries:0 Invalid misc:1 Missed beacon:0

sit0 no wireless extensions.

```
Şu an bir sorun olduğunu "unassociated"den anlayabiliyoruz. (şu an salonda uzaktayım :) sorun bu). Ayarları tekrar kontrol edip şifreli ise doğru şifre girdiğimizden emin oluyoruz. Bazı aygıtlar için aygıtı durdurup tekrar başlatmak gerekebilir. Hatta aygıtlar yeniden başlarken bile sorun yaratabilir. Bilgisayarı yeniden başlatmak da bir çözüm olabilir (ki linux şenliğinde oldu :) ).

Gerekli kontrolleri yaptıktan sonra şu aşağıdaki çıktıyı almaya kadar gelmemiz gerekiyor.
```
root@tux:/home/fatih # iwconfig
lo        no wireless extensions.

eth0 no wireless extensions.

eth1 IEEE 802.11g ESSID:"MFYZ"
Mode:Managed Frequency:2.452 GHz Access Point: 00:30:F1:FF:01:5C
Bit Rate=54 Mb/s Tx-Power=20 dBm
RTS thr:off Fragment thr:off
Encryption key:1C13-A443-3D Security mode:open
Power Management:off
Link Quality=100/100 Signal level=-20 dBm Noise level=-86 dBm
Rx invalid nwid:0 Rx invalid crypt:0 Rx invalid frag:0
Tx excessive retries:0 Invalid misc:0 Missed beacon:0

sit0 no wireless extensions.

```
"IEEE 802.11g" bunu gördüğünüzde bi oh çekin; zor kısmı bitti. Şu an bi ethernet kartına kablo bağlama kısmını yaptık. Şimdi eriştiğimiz ağdan bir yer edinip bağlantıyı kuralım. dhclient eth1 komutunu girdiğinizde hemen ağı tarayıp buranın sorumlusu kim şeklinde bir istek verip router'a ulaşıp oradan bana 3 kişilik masa ayır yapacağız.
```
root@tux:/home/fatih # dhclient eth1
Internet Systems Consortium DHCP Client V3.0.1
Copyright 2004 Internet Systems Consortium.
All rights reserved.
For info, please visit http://www.isc.org/products/DHCP
sit0: unknown hardware address type 776
sit0: unknown hardware address type 776
Listening on LPF/eth1/00:0e:35:c4:78:6e
sending on   LPF/eth1/00:0e:35:c4:78:6e
Sending on   Socket/fallback
DHCPREQUEST on eth1 to 255.255.255.255 port 67
DHCPACK from 192.168.2.1
bound to 192.168.2.4 -- renewal in 66176 seconds.

```
Görüldüğü üzere 192.168.2.4 masası bize ayrıldı, yemeğe başlayalım.. :) Kontrol ediyoruz :
```
root@tux:/home/fatih # ping google.com
PING google.com (216.239.57.99) 56(84) bytes of data.
64 bytes from google.com (216.239.57.99): icmp\_seq=1 ttl=239 time=257 ms

--- google.com ping statistics ---
1 packets transmitted, 1 received, 0% packet loss, time 0ms
rtt min/avg/max/mdev = 257.848/257.848/257.848/0.000 ms

```
Valla olmuş. Hadin sömürün.. :)