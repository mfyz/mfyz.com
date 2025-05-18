---
title: "Sitemize RSS export mekanizması kuralım"
slug: sitemize-rss-export-mekanizmasi-kuralim
date: 2006-08-22
url: http://mfyz.com/tr/sitemize-rss-export-mekanizmasi-kuralim/
tags: ["export","rss","rss export","Sunucu Programlama","xml"]
category: Sunucu Programlama
migration: {"wpId":92,"wpPostDate":"2006-08-22T04:39:56.000Z"}
lang: tr
---

#### Sitemize neden RSS hizmeti koymalıyız, Ne işimize yarar?

RSS günümüz teknolojileri arasında en yaygın takip standardı haline geldi. Şu an insanlar RSS okuyucu programları veya web uygulamalarına takip ettikleri siteler/forumlar/haber kaynaklarına ilişkin kayıtları tek standart'da okumak için ekliyor ve her gün binlerce insan bu sistem sayesinde birçok siteye girmeden tek merkezden çoğu haberi takip edip çoğu gelişmeden haberdar olabiliyor.
```
header('Content-type: text/xml');

```
kodunu basıyoruz sayfanın çıktı basılmamış bir kısmına.

Şimdi size 2 kayıtlık bir XML çıktısı örneği verip açıklayayım:
```
<?xml version="1.0" encoding="iso-8859-9"?>
<rss version="2.0">
  <channel>
    <title>MFYZ.Com Etkinlik Takvimi</title>
    <link>http://www.mfyz.com/?takvim</link>
    <description>Etkinlik Takvimi</description>
    <language>en-us</language>
    <generator>MFYZ.Com RSS Exporter v0.1</generator>
    <managingEditor>Mehmet Fatih YILDIZ</managingEditor>
    <item>
      <title>MFYZ v0.6 Test Sürüşü</title>
      <link>http://www.mfyz.com/?takvim</link>
      <pubDate>Sat, 29 Jul 2006 21:00:00 GMT</pubDate>
      <description><![CDATA[ Bu etkinlige ait aciklama ]]></description>
    </item>
    <item>
      <title>Linux Şenliği 4.Gün</title>
      <link>http://www.mfyz.com/?takvim</link>
      <pubDate>Sat, 13 May 2006 21:00:00 GMT</pubDate>
      <description><![CDATA[ HTML etiketleri kullanabilirsiniz. RSS okuyucunuzun yorumlamasýna göre gosterilecektir. ]]></description>
    </item>
  </channel>
</rss>

```
Bu gördüğünüz kod RSS işlem sayfanız tarafından çıktısı yapılmış TÜM RSS örneğini ifade ediyor.
```
<item>
  <title>MFYZ v0.6 Test Sürüşü</title>
  <link>http://www.mfyz.com/?takvim</link>
  <pubDate>Sat, 29 Jul 2006 21:00:00 GMT</pubDate>
  <description><![CDATA[ Bu etkinlige ait aciklama ]]></description>
</item>

```
kod bloğu ise sizin for veya while gibi bir döngü mekanizması ile kayıtlarınızı dönüp çıktısını alacağınız kısımdır. Bunun dışında kalan kısımlar (öncesindeki kısım ve sonrasindaki kısım) sizin statik basacağınız bölümdür.

Burada dikkat edilmesi gereken nokta pubDate olarak çıktı vereceğiniz tarih yukarıda gödrüğünüz formatta olmak zorundadır.

Bu tarih formatını "Y-m-d H:i:s" formatındaki genel kullanımdan bu formata;
```
gmdate( 'D, d M Y H:i:s', $tarihinize_ait_degisken ) . " GMT"

```
ile oluşturabilirsiniz.

2.önemli konu ise kod olarak basacağınız diğer string'ler yani title ve description etiketlerinin içerisine ekleri ile basmanızdır. Tahmin edeceğiniz gibi link etiketinde ise bu gönderinize ait url/link olacak. RSS çıktısı basan işlemler bundan ibaret.

Ben dinamik gönderileri basarken tüm kayıtlarımı RSS'e yazdırmıyorum. RSS okuyucular genelde yeni eklenen kayıtları saptayıp onları kullanıcıya gösterir. Bu yüzden sitenizde RSS export edeceğiniz kayıt kümesinin güncellenme yoğunluğuna bağlı olarak maksimum 50-100 kayıt bastırın. Çünkü eğer büyük boyutta bir RSS çıktınız olursa, hem kullanıcılar tarafından bunun güncellenmesi zor/uzun olacaktır. Hemde gereksiz kayıtları her seferinde boşuna transfer ettirmiş olursunuz.