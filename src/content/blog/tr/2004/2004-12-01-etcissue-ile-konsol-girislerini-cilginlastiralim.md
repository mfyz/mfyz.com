---
title: "/etc/issue ile konsol girişlerini çılgınlaştıralım!"
slug: etcissue-ile-konsol-girislerini-cilginlastiralim
date: 2004-12-01
url: http://mfyz.com/tr/etcissue-ile-konsol-girislerini-cilginlastiralim/
tags: ["giris","issue","konsol","linux","login","OS"]
category: OS
migration: {"wpId":63,"wpPostDate":"2004-12-01T05:46:29.000Z"}
lang: tr
---

Konsollarda kullanıcı giriş alanı gelmeden önce **/etc/issue** dosyasından bazı kurallara göre çıktı yaratılır. Salt metin olarak da çıktı verebileceğimiz gibi bu çıktıyı özelleştirebiliriz. Normalde;
```
login:
```
şeklinde görünen kısmı;
```
Mehmet Fatih YILDIZ'in bilgisayarina ho$geldiniz!
Bugun : 01.12.2004 12:00
Cekirdek : Linux-2.6.7-r12
Makine Adi : mfyz
login :

```
şekline getirebilirsiniz. Statik çıktısını almak istediğiniz şeyleri öncelikle girin; daha sonra kuralları ekleyeceğiz. Bunlar o andaki tarih, bulunan konsol aygıtı, çekirdeğin versiyonu veya adı, makine adı gibi ayrıntılı kurallar ekleyebileceğiz; aşağıdaki kuralları tersbölü (backslash)(\\) ile kullanın;
```
d     O andaki tarih                              Örnek : 01.12.2004
t     Zaman
u     Login olmuş kullanıcı sayısı
o     Makinenin ifade ettiği domain adı
n     Makinenin adı (hostname olarak geçer)
m     Makinenin işlemci mimarisi                  Örnek : i486
s     Sistem adı
r     Çekirdek numarası                           Örnek : 2.6.7
v     İşletim sisteminin versiyonu
l     Bulunulan konsol aygıtı                     Örnek : tty1

```

> Öneri : ASCII teknikleri kullanarak Konsol giriş başlıklarınızı daha düzenli hale getirebilirsiniz. Mesela çoğu dağıtım için "ascii art" logolar, maskotlar veya sloganlar geliştirilmiştir. ([http://www.asciiartfarts.com/linux.html](http://www.asciiartfarts.com/linux.html))