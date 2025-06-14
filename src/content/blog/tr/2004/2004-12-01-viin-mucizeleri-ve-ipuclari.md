---
title: "Vi'ın mucizeleri ve ipuçları"
slug: viin-mucizeleri-ve-ipuclari
date: 2004-12-01
description: "Linux'un güçlü metin editörü Vi (ve Vim) için kullanışlı komutlar, ipuçları ve mucizevi özellikler. Silme, arama, bul ve değiştir gibi temel ve ileri düzey komutlarla verimliliğinizi artırın."
url: http://mfyz.com/tr/viin-mucizeleri-ve-ipuclari/
tags: ["coding", "editor", "OS", "vi", "vim", "linux", "terminal", "metin editörü", "ipuçları", "programlama"]
category: OS
migration: {"wpId":64,"wpPostDate":"2004-12-01T16:17:58.000Z"}
lang: tr
---

Linux'ta VI'ı bilmeyen yoktur herhalde, vi çok fonksiyonel ve öğrenilemeyecek kadar özelliğe sahip bir editör. Programcılar için mükemmel bir araç olmakla beraber neredeyse bütün ihtiyaçları karşılıyor. Ana olarak kod renklendirme (desteklemediği dil yok galiba), satır nuamraları, autoindent... Bu dökümanda vi hakkında kendimce önemli, işinize yarayacak ipuçları ve özelliklerin kullanımını bulacaksınız!

#### VI komutlarının kullanımı

Aslında basit bir mantık içeriyor. önce sınırlarını belirtiyoruz klavyeden, sonra işletilecek komut ve ardından nesnemizi. Örnek olarak şu tuş kombinasyonu : **12dw** , aslında kursorün bulunduğu konumdan başlayarak, d yani silme işlemi, w yani ondan sonra gelen kelime sonunu ifade eder; yani kursörden itibaren 12 kelime siler.

**Bazı komutlar ve örnek kullanımları**

**d** Silme işlemi **r** Karakter değiştirme "**rx**" şeklinde kullanımda kursörün altında bulunan karakteri **x** ile değiştirir.

**w,e** w, kelime başına; e ise kelime sonuna gider.

**o,O** o 'ya basıldığında kursörün bulunduğu satırın altında yazmaya hazır boş satır açar. O'da ise kursörün bulunduğu satırın üstünde boş satır açar.

#### Dosya içinde bişeyler arama

VI komut satırına /fatih yazarsanız bütün "fatih"ler farklı renk olacaktır. Sayfa üzerinde gezinerek tam aradığınızı kolayca bulabilirsiniz.

#### Bul & Değiştir

Düzenli ifade kullanan arkadaşlar sed ve grep gibi araçlarda regex kullanmışlardır. Oradaki kullanıma çok benzeyen bir kullanımla vi'da belli bir ifadeyi bulup değiştirmek kolaylaşıyor. Birşey aratmak için vi komut satırında **/aramak_istedigimiz_sey yazıp** uyguluyorduk. Buna kısa şeyler ekleyerek bul ve değiştir işlemini yapacağız. **s/eski/yeni** ile kursörden itibaren tek değişim sağlayabilirsiniz. Kursörün bulunduğu satırın tümünde yapmak için **s/eski/yeni/g** uyguluyoruz. Eğer sınırları belli satırlar arasında uygulamak istiyorsak **#,#s/eski/yeni/g** uyguluyoruz. #,# ~ 2,5 ise 2. satırdan 5. satıra kadar demek oluyor. Tüm dosyada değişim yapmak için ise : **%s/eski/yeni/g** uyguluyoruz. Böylece kolayca bul&değiştir işlemi yapmış olduk. eski ve yeni değerleri yerine düzenli ifade girerek daha esnek arama, değiştirme işlemleri yapabilirsiniz.

#### Programcılar için bulunmaz özellik

Çoğu c, java tabanlı programlama dili kontrol yapıları (){}[] işaretleri ile doludur. autoindent yazılmış kodlarda hernekadar bu yapılar arasında dolaşmak veya birinin bitişini, diğerinin başlangıcını seçmek kolay gibi görünebilir ancak iç içe yazılmış çok yapıda bu iş autoindent yazılmış bile olsa zorlaşabiliyor. VI'da bitişini öğrenmek istediğiniz ({[ işaretlerinin üstünde iken % işaretini tuşlarsanız direk kapanışına erişebilirsiniz. Aynı işlemi bitiş karakterlerinde de uygulayarak o yapının başlangıcına erişebilirsiniz.

#### Özellikler ve kullanımları

VI'da özellikler açıp kapamak için vi komut satırında set kullanılır. "**set ozellik**" o özelliği açar, "**set ozellik!**" o özelliği kapatır.

wrap Geçerli olarak kapalı olarak açılan vi'da sözcük kaydırma özelliğini ifade eder. Bu özellik açıldığında yazılar konsolun boyutuna sığmaya çalışarak yerleşir. Ancak sayfanın yapısında değişiklik olmaz!

**nu nu** özelliği satır numaralandırmadır. Geçerli olarak kapalıdır. açıldığında her satırın başına satır numaraları eklenir.

**syntax** Bu özellik kod renklendirmenin ayarlanması içindir. VI dosya soyadlarına göre otomatik olarak açtığınız dosyaya uygun kod renklendirmesi yapar. Ancak yeni dosya yazarken veya farklı uzantılarla çalışırken (mesela php uzantılı html dosyalarında) kod renklendirme türünü değiştirmek isteyebilirsiniz. syntax özelliği parametreli kullanılır. Örneğin : set syntax=html veya set syntax=php gibi...

**autoindent** Geçerli olarak açık olan ve iç içe yazmayı kolaylaştıran bir özelliktir.

Not: Bu döküman 2 Ocak 2008 tarihinde yeniden düzenlenmiştir.