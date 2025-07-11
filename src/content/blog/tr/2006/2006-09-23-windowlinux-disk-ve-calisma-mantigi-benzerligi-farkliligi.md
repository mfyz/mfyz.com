---
title: "Windows ve Linux: Disk Yönetimi, Dosya Sistemleri ve Çalışma Mantığı Karşılaştırması"
slug: windowlinux-disk-ve-calisma-mantigi-benzerligi-farkliligi
date: 2006-09-23
description: "Windows ve Linux işletim sistemlerinin disk yönetimi, dosya sistemleri (FAT, NTFS, ext2/3, ReiserFS, swap), dizin yapıları ve konfigürasyon yönetimi (Registry vs. /etc, /home) arasındaki temel farklar ve benzerlikler."
url: http://mfyz.com/tr/windowlinux-disk-ve-calisma-mantigi-benzerligi-farkliligi/
tags: ["Linux", "Windows", "işletim sistemleri", "disk yönetimi", "dosya sistemi", "FAT", "NTFS", "ext3", "ReiserFS", "swap", "fstab", "dizin yapısı", "karşılaştırma"]
category: OS
migration: {"wpId":98,"wpPostDate":"2006-09-23T21:11:10.000Z"}
lang: tr
---

Bilgisayarımızda verilerimizi Harddisk denilen aygıtlarda saklarız, RAM ise anlık işlemlerimizi yapabilmek için kullandığımız ve bu aygıttan elektirik kesildiğinde içeriği silinen bir depolama birimidir. Bilgisayarımızı çalışma ortamımız düşünürsek Ram bizim masamızın büyüklüğüdür, bizim evrak inceleme, bulma organize etme hızımız (yani el çabukluğumuz) ise işlemci gücüne bağlıdır. Harddisk ise masamızdaki çekmece veya dosya raflarımızı ifade eder, Ne kadar büyükse o kadar çok arşivleme, o kadar çok ofis gereçleri koyabiliriz değil mi?

Bilgisayardaki en geniş yazılımlar işletim sistemleridir. Birçok kod/program ve dosyadan oluşurlar, genellikle bilgisayarımızdaki (mp3, film, iso gibi arşiv dosyaları haricinde) dosyaların çoğunluğu işletim sistemine aittir. Bu dosyalar tabiki harddiskimizde barındırılır.

Her işletim sistemi kendine göre veri yönetimi yapar. Bu farklılıktan dolayı disk bölümleri ortaya çıkar, Eğer disk bölümü yoksa diski tek bölüm olarak düşünebiliriz. Bu bölümlere partition (Türkçeleşirilmiş kelimesi yok) adı verilir. Partition türlerindeki farklılık disk yüzeyine farklı methodlarla bakmalarıdır. Yani verileri saklama/okuma/yerleştirme biçimleri farklıdır.

Disk bölüm türleri genellikle farklı işletim sistemlerinin olmasından ortaya çıkmıştır. Çünkü her işletim sistemini geliştiren grup, dosya yönetimini farklı algoritmalar ile yapmakta ve işletim sistemlerinin çekirdeklerini ona göre yazmaktadır.

Bu dökümanda popüler olan windows ve linux işletim sistemlerinin kullandığı dosyalama türlerinden bahsedeceğim.

Windows işletim sistemi bildiğiniz gibi eskileri DOS ile başlayıp Windows 1,2,3, 95, NT, 98, 2000, ME, XP, Vista şeklinde devam etmektedir. Bu sürümlerin neredeyse hepsinin çekirdekleri tekrar tekrar yazılmış olmasına rağmen yönettikleri dosya sistemleri genellikle aynıdır. 2000 NT çekirdeklerine kadar FAT16, FAT32 dosya sistemleri kullanılmıştır. 32 ve 16bit yapılar bazı kıt özellikler içeriyordu, daha doğrusu zamanına göre düşünülmemiş eksiklikler. Tabiki hepsi oldukça yaygın biçimde kullanıldılar. Daha sonra NTFS denilen yeni bir dosyalama methodu kullanmaya başladı microsoft. Adından anlaşıldığı gibi NT çekirdekli işletim sistemlerinde kullanıldı bu yapı ve günümüzde de Windows işletim sistemlerinde en yaygın kullanılan dosya sistemi yapısıdır.

Windows işletim sistemi malesef sadece kendi geliştirdikleri dosyalama sistemi yapılarında çalışmaktadır. Bir windows işletim sistemi kurabilmek/kullanabilmek için FAT16, FAT32 veya NTFS dosya sistemi ile formatlanmış bir bölüme ihtiyacınız var.

Windows işletim sistemi genel olarak Root kabul ettiği partition'da Windows, Program files ve birkaç dosya ile çalışabilmektedir. Genellikle ayarları registry denilen şifrelenmiş bir konfigürasyon yönetim sisteminde taşır ve yedekleyip ayarlarınızı taşımak biraz güçtür. Tabiki özel yazılımlarla bunlar da yapılabilir. Windows işletim sisteminde çalışan bir yazılıma ait konfigürasyon, çalışması için gerekli şeyler'e ait kollar çok çeşitli yerlerde bulunabilir, Profil dosyaları, temporary dizinleri, ayar dosyaları ve registry kayıtları...

Sisteme ilişkin ayarların nerede saklandığı konusunda geniş bilgi sahibi değilim fakat bazı HEX içerikli dosyalarda taşındığını biliyorum. Bu yüzden konfigürasyonlarınızı taşımak biraz zordur ve farklı yerlerde olduğu için yönetimi biraz karmaşık olabilir.

Linux çekirdekli işletim sistemleri 1991 yılından beri geliştirilen ve her gün yeni donanım/yazılım tekniklerini katarak ilerleyen tek bir çekirdek kullanırlar. Linux dediğimiz şey işte bu çekirdeğin adıdır. Sıfırdan yazılmadığı için her sürümünde bir öncekinden daha çok donanım tanır ve bir öncekinden daha çok tekniği barındırır. Disk bölüm türlerinin farklı algoritmalarla çalıştığını söylemiştim. İşte bu algoritmalar her gün linux çekirdeğinde iyileştirilip eklendiği için, linux çekirdeği ile şu an bilinen neredeyse tüm partition türlerinde dosya okuyup yazabilirsiniz.

Linux çekirdekli işletim sistemleri aynı çekirdeğe sahip olduklarından genellikle benzer mantıklarla çalışırlar. Hareket mekanizmaları benzer olduğundan bir dağıtımdan başka birine geçerken çok zorluk çekmeyiz. Tabiki deneyerek hangisinin bize tam uygun olduğunu bulabiliriz.

Bir linux işletim sistemi diskimizde 2 farklı disk bölümü ister. Teorik olarak tek disk bölümü ile de çalışabilir. Dosya sistemi türü olarak aslında linux çekirdeğimizin derlenmiş halinde okuma/yazmayı sorunsuz yapan tüm dosya sistemi türleri yükleyip çalıştırabilmemizi sağlar. Bu türler arasında FAT16, FAT32 ve NTFS de vardır. Fakat sağlıklı çalışabilmek için daha hızlı ve stabil dosyalama methodları ile çalışan dosya sistemi türlerini kullanmak daha sağlam bir işletim sistemi sağlayacaktır. Linux işletim sistemlerinde genellikle ext2, ext3 veya reiserfs kullanılır. Sistemin çalışma dizini olarak kullanması için bir tane “/” (yani kök dizin) bağlayabileceğimiz ext2, ext3 veya reiserfs oluşturmamız gerekir. 2. disk bölümü olarak Fiziksel ram'imizin üstünde (2 katını geçmeyecek şekilde) bir disk alanı oluşturup swap (linux-swap diye de geçebilir) dosya sistemi türü olan bir bölüm oluşturmamız gerekir.

Birinci bölüm hem sistemin hem de kullanıcıların masaüstünde kullanacakları yazılımların çalışma dizinleri olacaktır. İkinci bölüm ise fiziksel ram'imizi kullanılan verilere göre yöneten bir disk bölümü olması için oluştururuz. Bu bölüm, fiziksel ram'imiz dolsa bile bilgisayarımızı sanki hiçbirşey yokmuş gibi kullanabilmemizi sağlar. Böyle olduğu için swap'i iyi ayarlanmış bir linux işletim sistemini kitlemek hayli zordur. (Normalde fiziksel ram dolduğunda bilgisayar çakılır. Çünkü elimiz ne kadar hızlı olsa da masamızda iğne parçası kadar alan kalmışsa ne evrak düzenleyebilir ne de ofis araçlarımızı kullanabiliriz değil mi? :) )

Windows'ta disk bölümleri Bilgisayarım'da C, D, E gibi adlarla bağlanır. Biz ana disk bölümünü sistem için, diğer disk bölümlerini ise kişisel amaçlar için kullanırız. Başka bir diski sistem dosyalarının bazı parçaları için kullanma şansımız yoktur.

Linux'ta ise disk bölümleri /etc/fstab dosyasında belirtilen kurallara ilişkin olarak “/” yani kök dizin içerisindeki HERHANGİ bir dizin olarak bağlayabiliriz. İstersek yüzlerce disk üzerine sistemin her ayrı parçasını yayarak çalıştırabiliriz.

Linux dizin yapısında bazı yerleşmiş dizinler vardır. Bunlardan birkaçını ele almak gerekirse;

/etc dizini bütün sistem ve kurulu olan yazılımların ayarlarının saklandığı dizindir. Bu dizin içerisinde konigürasyon dosyaları dışında dosya bulunmamaktadır. Bu dizini yedekleyip sisteminizi yeniden kurup dizini geri aldığınızda sisteminizi donanım ayarlarına kadar eskisi gibi olacaktır (yüklü yazılımların olup/olmaması ile ilgili problemleri geçiyorum, zaten yüklenmemişse /etc'de ayar dosyasının kalmış olması bir sorun yaratmayacaktır).

Sistemdeki tüm geçici dosyalar /tmp veya /var/tmp dizini altına oluşturulur. Sistem her açılışında bu dizin temizlenir.

/bin, /sbin, /usr/bin, /usr/sbin dizinleri ise sistemde kullanılabilecek TÜM yazılımlara ait çalıştırma scriptlerini içerir. sbin sadece dizinleri yöneticilerin çalıştırabileceği yazılımları içerir.

/home dizini ise kullanıcıların ev dizinleridir. Yüklü olan bir yazılımın aslında yapabildiğimiz tüm ayarları ev dizinimizdeki gizli klasörler altında DOSYA olarak saklanmaktadır (registry gibi bir mekanizma ile sistemin diğer noktalarında saklanmaz). Ev dizinimizdeki ayarını yedeklemek istediğimiz programa ait gizli dizini yedekleyip tekrar yerine koyduğumuzda, program ayarlardan tutun, pencere dekorasyonu ve görünüme kadar herşeyi aynı biçimde açılacaktır. Ayrıca hiçbir kullanıcı ev dizini üstünde bir dizine erişemez. İzinleri açılmadıkça diğer dizinlere veya dosyalara zarar vermesi olanaksızdır. Bilgisayarın yöneticisi dışında bu dosya/dizinlere başka biri dokunamaz. Böylece sistem ayarları, donanım ve servis ayarlarına normal bir kullanıcı erişemez. Bu yüzden linux çekirdekli ve *NIX işletim sistemlerinde virüs veya spyware gibi yazılımlara raslamak çok zordur.

Bilgisayarınızda birden fazla linux çekirdekli işletim sistemi kullanırken /home dizininizi AYNI disk bölümü belirterek tüm linux işletim sistemlerinizde aynı ayarlarda kullanıcılar kullanabilirsiniz. Altyapısı farklı, görüntüye kadar aynı masaüstlerine sahip kullanıcılarla bilgisayarınızı kullanabilirsiniz. Bunun bazı alanlarda çok faydasını görebiliriz. Mesela windows'ta da linux'ta da hatta macosx'inizde bile aynı yazılımı kullanarak (mesela thunderbird) epostalarınızı okuyor olabilirsiniz. Bütün hepsinde aynı mailbox'lara sahip olmasını sağlayabilirsiniz. Böylece hangisi olursa olsun farketmez, açtığınızda aynı epostaları ve ayarları kullanarak eposta arşivinizi koruyabilirsiniz. Buna benzer çok örnek verilebilir...