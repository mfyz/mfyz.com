---
title: "Linuxta dosya parçalamak"
slug: linuxta-dosya-parcalamak
date: 2004-11-09
url: http://mfyz.com/tr/linuxta-dosya-parcalamak/
tags: ["ayırmak","bölmek","dosya parçalamak","konsol","linux","OS","split"]
category: OS
migration: {"wpId":62,"wpPostDate":"2004-11-09T05:32:19.000Z"}
lang: tr
---

#### Neden Dosyaları Parçalayayım Ki?

İnternette hızlı bant genişlikleri kullansak da hala dosyaları taşırken ufaltmak zorunda kalabiliyoruz. Aşırı büyük bir dosyayı (CD-DVD boyutunda mesela) parçalayarak ufak zaman dilimleriyle yükleme işlemi yapıp yüklenmeme riskini azaltırız mesela. Ya da paylaşım siteleri, eposta hizmeti veren servisler limitler uygulayabiliyorlar. En basitinden başka bir örnek de elinizdeki FAT türü dosya sisteme double layer dvd isosu kaydedemezsiniz. Çünkü 4.0GB'dan fazla boyutludur ve FAT dosya sistemleri 4.0GB üzeri dosya kaydedemez. Dosyanızı taşımak için parçalayabilir başka bir dosya sisteminde tekrar birleştirerek işinizi halletmiş olursunuz. Bazen de disketlerden çok az büyük dosyalarla çalışıyor olabilirsiniz (Tabi hala disketle çalışmak zorunda iseniz). Mesela bir proje dosyası 10 mb tuttu, bunu sıkıştırarak 2 MB'a indirdiniz ancak bunun için bir cd yazmaya değmez. Disetlere sığacak kadar da küçük değil. İşte böyle zamanlarda dosyaları diketlerin alacağı boyutlara bölerek çalışabiliriz. Örnekler çoğaltılabilir, bu gibi durumlarda dosyalarınızı parçalayabilirisiniz.

#### Linux'ta Dosyaları Parçalamak!

Dosyaları 2 biçimde parçalıyabiliyoruz. Birincisi dosyaları satır sayısına göre, diğeri de boyutuna göre. Dosyaları satır sayısına göre parçalarken -l parametresini, boyuta göre de -b parametresini kullanıyoruz.
```
mfyz@tux \_ $ ls -l
total 4836
-rwxrwxrwx  1 mfyz users 4939244 Sep 28 15:20 dosya.wav

mfyz@tux \_ $ split -b 1400000 dosya.wav parca\_

mfyz@tux \_ $ ls -l
total 9680
-rwxrwxrwx 1 mfyz users 4939244 Sep 28 15:20 dosya.wav
-rw-r--r-- 1 mfyz users 1400000 Nov 9 19:02 parca\_aa
-rw-r--r-- 1 mfyz users 1400000 Nov 9 19:02 parca\_ab
-rw-r--r-- 1 mfyz users 1400000 Nov 9 19:02 parca\_ac
-rw-r--r-- 1 mfyz users 739244 Nov 9 19:02 parca\_ad

```
İlk önce dizinimizdeki dosyaları listeledik. Burada çalışmak için bir binary (dosya.wav) var. Şimdi ilk olarak dosya.wav dosyasını satır sayısına göre parçalayacağız.split -b 140000 dosya.wav parca\_ komutu ile parçaladık. Bu komutta 100 değeri parçalardaki satır sayısı yani dosya.wav'ın kaç byte'da bir parça oluşturacağını belirledik. dosya.wav parçalanacak dosyayı, parca\_ da parçaların anahtar kelimesini belirtiyor. Komut uygulandığında oluşan parçalar anahtar kelime + aa,ab,ac,ad....ba,bb,bc... şeklinde isimler alır. Gördüğünüz gibi listeleme sonucunda başlangıçtaki dosya sayısında epey fazla dosya var.

#### Dosyaları Birleştirmek

Dosyaları birleştirirken cat komutu ile parçaları teker teker birbiri ardına ekliyoruz. Yukarıdaki örnekte dosya.txt'nin parçalarını birleştirirken sırayla cat dosya\_parca\_ag >> dosya\_parca\_af ardından, cat dosya\_parca\_af >> dosya\_parca\_ae... komutlarını aa parçasına kadar uygulayarak dosya.txt'yi dosya\_parca\_aa dosyasında oluşturmuş yani birleştirmiş olduk. Bu uzun işlemi yapmak yerine şu pratik yolu tercih ediniz (Zira sadece mantığını anlamamız için üstteki detayı verdim :) ).
```
for i in \`ls parca\_\*\`; do cat $i >> dosya.wav; done
```
(Bu güzel detayı belirttiği için Eren Turkay arkadaşıma teşekkür ederim.)