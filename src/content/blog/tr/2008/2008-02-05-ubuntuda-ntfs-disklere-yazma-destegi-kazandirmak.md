---
title: "Ubuntu'da NTFS disklere yazma desteği kazandırmak"
slug: ubuntuda-ntfs-disklere-yazma-destegi-kazandirmak
date: 2008-02-05
url: http://mfyz.com/tr/ubuntuda-ntfs-disklere-yazma-destegi-kazandirmak/
tags: ["fstab","ntfs","ntfs-3g","OS","ubuntu"]
category: OS
migration: {"wpId":125,"wpPostDate":"2008-02-05T08:19:27.000Z"}
lang: tr
---

Bildiğiniz gibi ubuntu ile beraber gelen derlenmiş çekirdek ntfs türü disk bölümlerini sadece okunabilir bağlayabiliyorlar, ancak yazma işlemini yapabilmek için çekirdekten bağımsızlaşmış bir araç sayesinde yapabiliyoruz. Bu yazılım ntfs-3g ([http://www.ntfs-3g.org/](http://www.ntfs-3g.org/)) bu aracı ubuntu'nun paket depolarından; `sudo apt-get install ntfs-3g` komutu ile kurabilirsiniz. ntfs-3g kurulduktan sonra mount komunutunun -t parametresi yani type parametresi ile `mount -t ntfs-3g /dev/hda1 /media/yazilabilir_ntfs` şeklinde bağlayabilirsiniz. **/etc/fstab** bildiğiniz gibi sabit diskinizin bölümlerini boot'da otomatik bağlamamıza yarıyor ve burada daha önce ntfs bölümleri bağlamak için kullandığınız satırlardaki 2. sekmedeki ntfs türlerini ntfs-3g olarak düzeltirseniz, artık ntfs diskleriniz boot ile yazılabilir özellikte bağlanmış olacaktır.

> **Dikkat :** NTFS-3G'nin, daha doğrusu ntfs türü disk bölümlerinin çok ciddi baş ağrıtabilecek sorunlara yol açtığını belirteyim, Eğer diskiniz sabit değilse, yani çıkarılabilir disklerinizde ntfs kullanıyor ve ntfs-3g ile bu disklere veri yazıyorsanız, bu diskleri **KESİNLİKLE** umount etmeden ayırmayınız! umount olmamış ntfs bölümleri scandisk yapılmadan tekrar mount edilemiyor ve ilginç bir şekilde proccess bulunan bağlama oturumları da bilmediğim bir sürede timeout olup readonly moda geçiyorlar ve yazmakta oldugunuz veriler veya okumakta olduğunuz dosyalar bozulabiliyor. Başım çok ağrıdı, artık microsoft ürünü olan bir dosya bölümü de kullanmıyorum (yaşasın ext3) :)

### NTFS-3G için yararlanabileceğiniz diğer kaynaklar

[http://www.ntfs-3g.org/](http://www.ntfs-3g.org/) (Proje anasayfası, kaynak kodlar) [https://help.ubuntu.com/community/MountingWindowsPartitions/ThirdParty](https://help.ubuntu.com/community/MountingWindowsPartitions/ThirdParty)NTFS3G [http://gentoo-wiki.com/HOWTO\_NTFS\_write\_with\_ntfs-3g](http://gentoo-wiki.com/HOWTO_NTFS_write_with_ntfs-3g)