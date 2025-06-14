---
title: "PHP ile Word ve Excel dosyaları oluşturmak"
slug: php-ile-word-ve-excel-dosyalari-olusturmak
date: 2005-10-31
description: "PHP'de COM eklentisi kullanarak Microsoft Word (.doc) ve Excel (.xls) dosyalarını dinamik olarak nasıl oluşturacağınızı öğrenin. Sunucuda Office uygulamalarıyla etkileşim kurma ve veri yazma örnekleri."
url: http://mfyz.com/tr/php-ile-word-ve-excel-dosyalari-olusturmak/
tags: ["PHP", "COM", "Microsoft Word", "Microsoft Excel", "dosya oluşturma", "Word otomasyonu", "Excel otomasyonu", "Sunucu Programlama", ".doc", ".xls", "Office otomasyonu"]
category: PHP
migration: {"wpId":82,"wpPostDate":"2005-10-31T15:23:03.000Z"}
lang: tr
---

#### Nasıl?

PHP'deki COM nesnesi sayesinde Word, Excel gibi programlarla bağlantı kurulup onları kolayca yönetebiliriz. Tabiki kullanılacak olan bu programlar çalışılan sunucuda yüklü olması gerekmektedir. İşte buna ait kısa bir kodla rahatça anlayabileceğiniz 1-2 örnek. Basitçe bir metini bir word dosyasına (.doc) kaydetmeyi aşağıdaki örnekte görelim :

```php
# Word programını çalıştırıyoruz
  $Word = new COM("Word.Application") or die("Word Başlatılamıyor!");

# işlemler
  $Word->visible = 0;
  // yazı ekliyoruz
  $Word->Documents->Add();
  // kursörün olduğu noktadan yazı yazdırmaya başlıyoruz.
  $Word->Selection->TypeText("Bu metin php tarafından dinamik olarak yazdırılmıştır.");

# kaydettiriyoruz
  $Word->SaveAs("C:Deneme.doc");
  // kapatıyoruz
  $Word->Quit();
```

"Bu metin php tarafından dinamik olarak yazdırılmıştır." yazısı içerikli bir dosya C:\\Deneme.doc konumuna kaydedilecektir.

Şimdi de Excel ile bir veriyi kaydetmeyi göreceğimiz bir bir örneğe bakalım:

```php
# Excel e bağlanmak için
  $yeni_excel = new COM("Excel.Application");

# Yeni bir çalışma kitabı yaratmak için
  $yeni_excel->Workbooks->Add();

# Çalışma kitabının class larını kullanarak yeni bir sheet oluşturmak için
  $kitap=$yeni_excel->Workbooks(1);
  $sheets=$kitap->Worksheets(1);

# Sheets içerisindeki hücreleri kullanmak için
  $hucre = $sheets->Cells(1,1); // A1 hücresini seçili duruma getirdik..
  $hucre->activate;

# Seçili hücreye yazılacak olan yazıyı ve rengini belirleyelim:
  $font=$hucre->Font;
  $font->Color=458751;
  $hucre->value= "Merhaba Dünya";   

# Çalışma kitabını kaydedelim
  $kitap->saveas("C:Deneme.xls");

# Çalışma kitabını kapatıyoruz
  $kitap->Close();
  $yeni_excel->Workbooks->Close();

# Çıkıyoruz:
  $yeni_excel->Quit();
```

Örnekler zaten yeterince açıklamalı ve basit. Kendinize kolayca uyarlayabilirsiniz. Excel örneği için forumdaki bir konudan faydalandım, soruyu soran ve kendi yanıtını bulan Sezgin Bilketay'a teşekkürler :)