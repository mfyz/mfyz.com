---
title: "Pratik ve hızlı gentoo kurlumu"
slug: pratik-ve-hizli-gentoo-kurlumu
date: 2005-02-01
url: http://mfyz.com/tr/pratik-ve-hizli-gentoo-kurlumu/
tags: ["gentoo","kurulum","nasil","OS"]
category: OS
migration: {"wpId":66,"wpPostDate":"2005-02-01T16:35:23.000Z"}
lang: tr
---

**Not :** Bu döküman gentoo 2005.1 kurulumunu anlatmaktadır. Sonraki sürümlerde birçok değişiklik yapılmış olabilir!

#### 1\. Giriş & Açıklamalar

Gentoo kurmak aslında kurulum işlemi değildir. Bir kaynağı kendinize kullanılabilir hale getirmektir. Zaten öyle olmasa idi büyük ihtimalle bir kurulum sihirbazı ile ileri ileri diyerek kurardık.. :) Gentoo kurulumu aslında 3-4 bölümden ibarettir. Öncelikle diskimizi hazırlarız partitionlarımızı hazırlar kurulumda kullanacağımız internet için network ayarları yaparız.. Hatta eski makineler için ses kartını tanıtıp kurulum sırasında müzik de dinleyebiliriz. Gentoo kurmak için ihtiyacımız olan sadece 2 dosyadır. Biri stage dosyaları diğeri de son güncel portage paketi. Gentoo live cd sadece bir live cd olarak kurulumda işimize yarayacak olan araçları barındırır. Bir knoppix cd'si ile de gentoo kurulumu yapabilir, kurarken video seyredebilirsiniz. Gerçi 15 dakkada derlenecek olan kernel 3-4 saatte derlenir o ayrı konu :) Neyse diskimizi hazırladıktan sonra dosyalarımız açar ve dosyaları açtığımız sistemegeçiş yaparak onun üzerindeki OS'un açılmasını sağlayacak olan 2 şeyi yaparız. Kernel derlemek ve lilo. Tabiki bunlarla beraber çok fazla ayarlama da yapacağız. Şimdi bu işlemleri daha ayrıntılı yapalım.

#### 2\. Öneriler

Kurulum sırasında kesinlikle bir döküman açık bulunsun, gentoo handbook'u live cd'sinde bulabilir, online olarak sitesinden takip edebilir veya bunun gibi bir dökümandan yardım almanız gerekir. Live cd'de konsola düşünce ilk işiniz **passwd** komutu ile live cd'nin geçici oturumu için root şifresini ayarlayın. tty2'yi açıp (CTRL+ALT+F2) orada da **lynx** ile handbooku açın. Ardından diğer konsollarda çalışabilirsiniz. Bir iş yapılırken ayarlama işlerini halledip zamandan kazanabilirsiniz.

#### 3\. Internet Ayarları

Elinizde gentoo live cd var ise bu kısım ile uğraşmanıza gerek yok, çünkü gentoo live cd'de gerekli bütün dosyalar geliyor. Ancak yardım veya araştırma için internetinizin olması her zaman faydalı olacaktır. Eğer gentoo livecd'deki kernel modülleri arasında ethernet kartınızınki varsa otomatik olarak yüklenip tanınacaktır. Ancak sadece tanınması yetmez, aynı zamanda bir ağ kablosu ile bağlı olmanız gerekir. **net-setup** komutu ile ayarlarını halledebilirsiniz. Ayarlama bitince **ping 216.239.39.99** ile google'ı direk ip ile pinglemeyi deneyin.
```
mfyz@tux ~ $ ping google.com
PING google.com (216.239.37.99) 56(84) bytes of data.
64 bytes from google.com (216.239.37.99): icmp\_seq=1 ttl=244 time=198 ms
64 bytes from google.com (216.239.37.99): icmp\_seq=2 ttl=244 time=198 ms
64 bytes from google.com (216.239.37.99): icmp\_seq=3 ttl=244 time=197 ms
64 bytes from google.com (216.239.37.99): icmp\_seq=4 ttl=244 time=203 ms

--- google.com ping statistics ---
5 packets transmitted, 4 received, 20% packet loss, time 4003ms
rtt min/avg/max/mdev = 197.568/199.478/203.709/2.506 ms

```
Buna benzer bir çıktı alacaksınız eğer internette bir yer edinememişseniz "64 bytes from google.com ..." şeklindeki satırlar gelmeyecektir.. Ethernet ayarınızı gözden geçirerek tekrar deneyin. Eğer pingliyorsa bir de ping google.com'u deneyin. eğer pinglemiyorsa dns'leriniz yanlıştır net-setup komutunda belirttiğiniz dns'leri değiştirin. Eğer sorun yoksa network ayarları bitti, bir sonraki kısımdan devam ediniz...

#### 4\. Diskin Hazırlanması

Disk için yapılması gereken tek şey daha önceden gentoo kurmak için boş bir alan ayırmış olmak veya bazı disklerin alanını kullanmak olacaktır. Şimdi **dmesg | grep hd** yazarak o anda bağlanmış olan disklerin adları ve aygıtlarını görelim. Diskinizin markasına göre yüklemek için alan ayırdığınız diskin ne olduğunu öğrenmemiz gerek, ben burada hda olarak varsayıp devam edeceğim. Diskte en az 2 alan yaratacağız biri / diğeri de swap olacak. **cfdisk /dev/hda** komutu ile cfdisk programını çalıştırıyoruz. cfdisk programı oldukça basit yapıdadır. Altta opsiyonlar ve yukarıda da o disktaki partition'ları belirten bir tablodan oluşur. Daha önceden boş alan ayırmış isek free space olarak geçen kısımlara gelerek yeni partition'lar yaratacağız. Eğer boş alan yoksa bir bölümü silip oraya kurmamız gerek. **Dikkat : Sildiğiniz bölümdeki bütün bilgiler gidecektir.** free space olan kısımı seçtiğimzde alttaki menüden new'i seçiyoruz (sağ sol ok tuşları ile). Önce küçük olan bölümden başlayacağız yani swap'dan. Günümüzdeki ram'lere göre 250-500mb'lık bir swap yetecekir. Size (in MB): yazan kısıma 500 girerek devam ediyoruz. Begining ardından da Primary seçerek swap bölümü oluştumuş oluyoruz. free space'e gelip geri kalanı ile de aynı opsiyonları belirterek /'u da oluşturmuş olduk. Şimdi / için yaptığımız son bölümü seçip bootable olarak işaretliyoruz. Write diyip sonra yes diyerek Diske yazıyoruz değişiklikleri.. swap ve / için yapılan bölümlerin adlarını bir yere not alıyoruz (anlatırken hda1 swap, hda2 / olarak anlatacağım). Quit ile çıkıyoruz. Disk'te partitionları yaptık şimdi bu partitionlaru formatlayacağız. **mke2fs -j /dev/hda2** ile /'u ext3 olarak formatladık. **mkswap /dev/hda1** ardından da **swapon /dev/hda1** komutları ile swap formatlayıp swap yaptırdık. **mount /dev/hda2 /mnt/gentoo** ile /'u çalışmak için /mnt/gentoo'ya bağladık. **cd /mnt/gentoo** ile /mnt/gentoo'ya giriyoruz. **mkdir boot** ve **mkdir proc** ile boot, proc dizinlerini yaratalım. Ardından **mount -t proc none proc** ile özel aygıtımızı bağlayalım. Diskle ilgili işlemlerimiz bitti. Artık kurulum paketerini diske açabiliriz.

#### 5\. Kurulum Paketlerinin Diske Açılması

Diske 2 paket açacağımızdan bahsetmiştim, stage ve portage. Bunları gentoo livecd'de stages ve snapshots dizinlerinde bulabilirsiniz. Stage 3 kurmanızı öneririm. Burada stage3'ten anlatacağım. stage 1 ve 2 için gentoo handbook'tan bilgi alabilirsiniz. Stage'i seçerken en önemli unsur işlemci türünüzdür. İşlemci türünüzü doğru seçtikten sonra;
```
tar -xvjpf /mnt/cdrom/stages/stage3-\*.tar.bz2 -C /mnt/gentoo
```
komutu ile stage'i;
```
tar -xvjpf /mnt/cdrom/snapshots/portage-\*.tar.bz2 -C /mnt/gentoo/usr
```
komutu ile de portage'i açalım.

#### 6\. Ayarlar ve Asıl Sisteme Geçiş

/etc/make.conf'u nano ile açın (nano /etc/make.conf). CFLAGS'da "-march=işlemci türü" şeklinde belirtin (CFLAGS="-march=i686"), kaydedip çıkın. Şimdi dosyalarını açtığımız sisteme geçiş yapacağız;
```
chroot /mnt/gentoo /bin/bash
env-update
source /etc/profile

```
Komut dizisi ile asıl çalışacağımız sisteme geçiş yaptık.

#### 7\. Çekirdek (Kernel) Ayarları & Derlenmesi

**ln -sf /usr/share/zoneinfo/Turkey /etc/localtime** ile zaman dilimini ayarlayalım. **emerge gentoo-dev-sources** ile kernel kaynak kodunu kuralım. **emerge genkernel** ile genkernel aracını kuralım. **genkernel all** komutu ile kernel ayarı sonra da derlenmesini sağlayalım. Derleme uzun sürecektir. Bittiğinde /boot dizinini inceliyoruz kernel\* ve initrd\* şeklinde iki dosya bulunması gerek. Şu anda bunlar çok anlamsız gelebilir ancak sistemin kurulumunu başarıyla tamamlayabilmek için bunları görmezden gelin sadece yazıp işletin. İleride anlayacağınız bol zamanınınz olacak :)

#### 8\. Sistemin Ayarlanması

Dosya sistemini bağlamayı yapacağız öncelikle.. Diyelimki başka bir partition'da windows partition'larınız var. hda3'de de tek windows partiton olduğunu varsayalım. Dosya sistemleri boot edilirken dizinlere bağlanır bunun bilgileri ise /etc/fstab dosyasında barınrılır. nano /etc/fstab ile fstab'ı açıyoruz.
```
\# fs                 mountpoint type      opts           dump/pass
#-----------------------------------------------------------------
/dev/hda2            /          ext3      noatime           0 1
/dev/hda3            /windoze   vfat      noatime,umask=0   0 0
/dev/hda1            none       swap      sw                0 0
#-----------------------------------------------------------------
/dev/cdroms/cdrom0   /cdrom     iso9660   noauto,users      0 0
/dev/fd0             /floppy    auto      noauto,users      0 0
#-----------------------------------------------------------------
none                 /proc      proc      defaults          0 0
none                 /dev/shm   tmpfs     defaults          0 0

```
Bu yapıya benzer biçimde disk yapınızı oluşturun. Kaydedip çıkın. Ağ bilgilerini ayarlamamız gerekiyor. Kısa işlemlerle bunu da yapıyoruz;
```
echo benim\_bilgisayarim > /etc/hostname
echo mfyz.com > /etc/dnsdomainname
rc-update add domainname default

```
/etc/conf.d/net dosyasını açıyoruz. iface\_eth0 satırında statik veya dinamik olmasına göre ayarlarını yapıyoruz. DHCP için yani dinamik ip için iface\_eth0="dhcp" satırını aktif hale getiriyor, statik için de iface\_eth0="192.168.1.10 broadcast 192.168.0.255 netmask 255.255.255.0" şeklinde ayarlıyoruz. Diğer ethernet kartlarını da bu şekilde ayarlıyoruz. **rc-update add net.eth0 deafult** ile başlangıçta aktifleştiriyoruz ethernet ayarlarını.. /etc/rc.conf dosyası ile de sistem ayarları yapıyoruz. Konsolda Türkçe klavye kullanmak için keymap="trq" yapmanız yeterli diğer ayarları da kendinize göre değiştirebilirsiniz.

#### 9\. Önyükleyiciyi Ayarlayalım

Önyükleyici için lilo'yu anlatacağım, basit ve kolaydır. Grub'da kullanabilirsiniz. emerge lilo ile lilo'yu kuruyoruz. /etc/lilo.conf dosyasını açarak aşağıdaki ayarları yapalım;
```
boot=/dev/hda
prompt
timeout=30 # 3 saniye
default=gentoo
vga=788 # 800x600 framebuffer 788, 1024x768 framebuffer için 791, 1280x1024 için 794

image=/boot/kernel-2.6.7-r12
label=gentoo
read-only
root=/dev/ram0
append="init=/linuxrc real\_root=/dev/hda2"
initrd=/boot/initrd-2.6.7-r12

other=/dev/hda3
label=windows

```
Şeklindeki ayarda kernel-2.6.7-r12 ve initrd-2.6.7-r12 dediğim dosyalar kernel derledikten sonra /boot dizininde kontrol ettiğimiz kernel ve initrd dosyasıdır. Bu dosyayı ayarladıktan sonra kaydedip çıkıyoruz. ve lilo komutunu veriyoruz Bir uyarı ve Added gentoo\* Added windows demesi gerekiyor. Böylece önyükleyiciyi de kurmuş olduk. **Güncelleme :** GRUB kurmanızı tavsiye ederim. Lilo çok geride kaldı!

#### 10\. Sistem Araçlarının Kurulması ve Son

Hotplug bilgisayarınıza taktığımız donanımı eşzamanlı tanıyan bir araçtır. Olmazsa olmaz **emerge hotplug** ile hotplug'ı kuralım **rc-update add hotplug default** ile geçerli seviyede çalıştırılmasını sağlayalım. Syslog'da sistem loglarını tutan bir araçtır. Sisteminizde bir arıza olduğunda veya bir sorun yaşadığınızda loglar her zaman imdaat'ınıza koşar bu açıdan bunu da kurmanız şiddetle önerilir. **emerge syslog-ng** ile syslog'u kuralım **rc-update add syslog-ng default** ile geçerli seviyede çalıştırılmasını sağlayalım. Gerekli araçları kurduktan sonra sistemden çıkmadan önce root şifresini ayarlayıp, bir kullanıcı ekleyelim. passwd komutu ile root şifresini ayarlayın. **useradd mfyz -G wheel,users -m -s /bin/bash** ile de mfyz kullanıcımızı ekliyoruz. passwd mfyz ile mfyz kullanıcısının şifresini ayarlayalım. root'un seri konsola erişebilmesi için : **echo "tts/0" >> /etc/securetty** komutun veriyoruz. Ve sistemi terk edip ilk bootumuzu yapıyoruz...
```
exit
cd /
umount /mnt/gentoo /mnt/gentoo/proc
reboot

```
Gentoo'nun düzgünce konsola düşmemesi veya lilo konfigürasyonundan dolayı sistemin açılmaması durumunda live cd veya knoppix ile açıp, /dev/hda2'yi bir yere bağlayıp sisteme geçiş yapabilir, lilo'yu tekrar ayarlayabilir, kernel eksiklerini giderebilir, gentoo'nun boot'daki sorunlarını giderebilirsiniz. Sistem sorunsuz boot ettikten sonra yapmanız gereken X ortamı ve kde/gnome gibi bir masaüstü yöneticisini kurmak olacaktır. Bir programı kurmak için yapmanız gereken tek şey emerge komutunu kullanmak olmalıdır. **emerge xfree, emerge mozilla-firefox-bin, emerge gnome** Sorunsuz derlemeler...