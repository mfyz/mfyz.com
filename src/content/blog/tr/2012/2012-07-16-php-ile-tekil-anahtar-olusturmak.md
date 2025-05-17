---
title: "PHP ile tekil anahtar oluşturmak"
slug: php-ile-tekil-anahtar-olusturmak
date: 2012-07-16
url: http://mfyz.com/tr/php-ile-tekil-anahtar-olusturmak/
tags: ["code","db","generate","hash","key","mysql","php"]
category: PHP
migration: {"wpId":308,"wpPostDate":"2012-07-16T11:48:14.000Z"}
lang: tr
---

Türkçesini çok bulamadığım hash kelimesini anahtar olarak kullanacağım. Burada aslında bahsettiğim anahtar herhangi bir veri grubunuza atadığınız, sayısal olmayan kimliklerden bahsediyorum. Yani rasgele üretilmiş belirli bir uzunlukta olan kimlikleri her yerde kullanıyoruz. Neden sayısal bir kimlik kullanmak yerine bu anahtarlara ihtiyaç duyacağınızı en açık şekilde şöyle anlatabilirim. Mesela tahmin ederek erişilmesini istemeyeceğiniz ama şifre veya kullanıcı girişi gibi herhangi bir sınırlama koyamayacağınız bir sayfanız var, örnek veriyorum yapılacak işler listesi veritabanı oluşturuyorsunuz ve her kayıt bir yapılacak iş listesi. Veritabanında sayısal bir kimliğe yani numaraya sahip bu kayıtlar. Hazırladığınız bir php sayfası da liste numarasına göre yapılacak iş listesinin detayını ekrana döküyor. Eğer liste\_detay.php?no=145 gibi basit bir şekilde tutarsanız url'i oynayarak başkalarının listelerine erişebilir, sadece erişmek değil sistemdeki tüm listeleri basit bir script ile tahmin edebilir veya tarayıp kaydedebiliriz. Böyle bir durumda listelerinizi sadece sayısal değil, tahmin edilemeyecek bir anahtar ile (örneğin: t34de6gx) tanımlamak istiyorsunuz. Bu noktada rastgele bir anahtar üretebilirsiniz, bunu yapmak çok zor değil. PHP'deki rasgele sayı üretme fonksiyonunu kullanarak ve bir karakter dizisinden rastgele elemanlar çekerek bir kelime üretebilirsiniz. Bunu daha pratik bir şekilde tek satırda bile yapabilirsiniz:
```
$anahtar = substr(str\_shuffle('abcdefghklmnoprstuvyzqxw1234567890'), 0, 6);
```
Bu satır size 6 karakterlik bir kelime üretecektir. Basitçe str\_shuffle fonksiyonu ile özel karakter içermeyen ve rakamlarında dahil olduğu bir alfabeyi karıştırıyor ve başındaki ilk 6 karakteri alıyoruz. Şimdi bu, işin basit kısmı. Eğer veritabanındaki bir veri set için bu anahtarı oluşturuyorsanız üretilen anahtarın veri setinde daha önce kullanılıp kullanılmadığını test etmek zorundasınız. Sonuçta tekil bir anahtar oluşturuyorsunuz. Bu arada veri setiniz mysql veya bir sql veritabanında olmak zorunda değil, bir xml, csv veya txt dosyasında saklı olan bir set için de benzer şeyi uygulayabilirsiniz. Veritabanındaki veriyi test ederek bir anahtar oluşturmanın en kısa ve basit kodu şöyle:
```
do {
    $anahtar = substr(str\_shuffle('abcdefghklmnoprstuvyzqxw1234567890'), 0, 6);

    $query = mysql\_query("SELECT no FROM listeler 
        WHERE anahtar LIKE '" . $anahtar . "'");
} while (mysql\_num\_rows($query) > 0);

print $anahtar;

```
Bu kod, veritabanında olmayan bir anahtar üretmenizi sağlayacaktır. Sonra verinizi hazırlayıp tablonuza yeni kayıdınızı ekleyebilirsiniz.