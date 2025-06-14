---
title: "HTML Dersleri (6) : Sonsöz ve öneriler"
slug: html-dersleri-6-sonsoz-ve-oneriler
date: 2004-12-08
description: "HTML öğrenme serisinin son bölümü. Bu yazıda HTML'nin neden önemli olduğu, geleceği ve standartlara uygun, temiz kod yazmak için ipuçları ve öneriler yer alıyor."
url: http://mfyz.com/tr/html-dersleri-6-sonsoz-ve-oneriler/
tags: ["Arayüz Programlama", "html", "web geliştirme", "web tasarımı", "standartlar", "ipuçları", "sonsöz"]
category: Arayüz Programlama
migration: {"wpId":108,"wpPostDate":"2004-12-08T19:21:50.000Z"}
lang: tr
---

HTML, bence her programcının bilmesi gereken bir dildir. Basit yapısı ile öğrenmesi pek de zor değil zaten. Böylesine basit bir işaretleme diline entegre edilmiş betik dilleri, html'in ve kendisinin yetenekleri ile mükemmel bir yapı oluşturur. Örneğin PHP, JPS, ASP gibi diller döyle diller olup çıktıların html gibi oldukça özgür bir ortamda veren dillerdir. Bunu dışında bir programcının yaptığı programları tanıtması için küçük çaplı bir web sitesi hazırlaması gerekir.

HTML geleceğin teknolojilerine karşın yapısal olarak değişmeyecek dillerden birisidir. ister mobil teknoloji ister iletişim teknolojilerinde HTML ile hazırlanabilecek çok şey vardır. HTML bir iletişim teknolojisidir. Bu açıdan vazgeçilmez bir araçtır.

#### HTML dili hakkında ipuçlar ve uyarılar

1\. HTML etiketlerinin çoğu açılış ve kapanış etiketleri şeklindedir. Bir işaretleme dili olduğu için işaretlenen kısımların bir başı ve sonu vardır. Bunları etiketlerimizin açılış ve kapanışları ile belirleriz. Bu açıdan kesinlikle açılan bir etiket kapatılmalıdır. Kapatılmayan etiketler sonsuza kadar işaretlenmiş olur. mesela sayfanızda bir yerde <b> etiketi kullanır ve bir yerde kapatmazsanız. sayfanızın o işaret başlangıcından sonuna kadar koyu metin türünde işaretlendiğini göreceksiniz.

2\. Etiketlerde parametrelere değer verirken kesinlikle çift tırnak kullanın. Eğer parametreler içerisinde tek tırnak kullanmanız gerekirse parametrede tek tırnak, içerisinde de çift tırnak kullanın.

3\. Eğer sayfanızda bir html işareti kullanacaksanız (mesela çift tırnak veya html etiketleri için başlangıç karakteri yani sola doğru ok işareti.. vb), bu karakterlerin ascii'ye göre html encode edilmiş değerlerini kullanın. Bu değerleri şöyle açabiliriz; "&" işareti + "#" işareti + "o karakterin ASCII değeri" + ";" işareti Örneğin tire karakteri (-) = &#150; (kırmızı olan tire karakterinin ASCII değeridir.)

**NOT :** Klavye karakterlerinin ASCII değerlerini /ascii-karakter-kodlari/ dökümanında bulabilirsiniz. (Ayrıca bakınız : http://www.asciitable.com)

4\. HTML'de tabloları arayüz çizdirmek için kullanmayın, arayüzlerinizi css ile çizdirin. Tablolar "Tablosal Veriler" içindir (Mesela hesap cetveli).

5\. Standartlara uygun kod yazın. Eğer standartlara uymuyorsanız tüm tarayıcıların kodunuzu aynı okumasını bekleyemezsiniz. Önce standartlara uygun kod yazın, sonra taaryıcı inceliklerine bakın. Ayrıca standartlara uygun koda sahip siteler her zaman daha iyidir.