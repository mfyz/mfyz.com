---
title: "Konsoldan, aradığımız dosyayı bulmak"
slug: konsoldan-aradigimiz-dosyayi-bulmak
date: 2006-03-18
url: http://mfyz.com/tr/konsoldan-aradigimiz-dosyayi-bulmak/
tags: ["find","konsol","OS","terminal"]
category: OS
migration: {"wpId":95,"wpPostDate":"2006-03-18T06:06:36.000Z"}
lang: tr
---

Komut : find (yol tanımı) (seçenekler)

Seçenekler :

**\-name isim** : aranılacak dosyanın ismi. **\-perm izin** : Izinleri oktal olarak belirlenmiş dosyaların aranılması. **\-links n** : linke sahip dosyalar. **\-user kullanıcı** : Belirli bir kullanıcıya ait dosyaların aranması. **\-group isim** : Belirli bir gruba dahil dosyaların aranması. **\-atime n** : n gün içinde erişilen dosyalar. **\-mtime n** : n gun içinde işlem gören dosyalar. **\-ctime n** : n gun içinde değiştirilen dosyalar. **\-print** : bulunan dosyaların ekranda görüntülenmesini sağlar.

Örnek :

Bulunduğum dizinden itibaren tüm alt-dizinlerdeki "mfyz" ile başlayan dosyaları bulmak için;
```
find . -name "mfyz*" -print
./faq/mfyz_dosyalar_index.html
./mfyz
./mfyz/mfyz_index.php
./we/mfyz.c

```
**Not 1 :** Burada arayacağım dosyada wildcard kullandığım icin * işaretini kullandım. Eğer dosyanın tam ismini biliyorsanız buna gerek yoktur.

**Not 2 :** Eğer bir aramayi root'tan ( / ) başlatirsaniz çok buyuk olasilikla bazı dosyaları okumaya izininiz olmadıgı için size bunu belirten bir uyarı mesajı verilecektir, ve bu mesajlar arasında aradığınız şey ekrana yazılsa bile bunu gözden kaçırabilirsiniz. Bu sebeple çıktıyı bir dosyaya yöneltip, daha sonra o dosyayı okumanızda fayda vardır.

Örnek :
```
find / -name gzip -print > gzip_sonuclari

```