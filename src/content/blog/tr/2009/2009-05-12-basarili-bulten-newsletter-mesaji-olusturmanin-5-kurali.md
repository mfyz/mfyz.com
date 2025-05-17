---
title: "Başarılı bülten (newsletter) mesajı oluşturmanın 5 kuralı"
slug: basarili-bulten-newsletter-mesaji-olusturmanin-5-kurali
date: 2009-05-12
url: http://mfyz.com/tr/basarili-bulten-newsletter-mesaji-olusturmanin-5-kurali/
tags: ["Arayüz Programlama","bulten","list","mail","mailing","newsletter"]
category: Arayüz Programlama
migration: {"wpId":141,"wpPostDate":"2009-05-12T07:49:36.000Z"}
lang: tr
---

#### Bülten (Newsletter) mesajları?

Bülten (newsletter) mesajları günümüzde "bir kullanıcı kitlesine sahip site" çoğu organizasyon tarafından kullanılan ve genellikle html css ile güçlendirilerek görsellerin de kullanıldığı bir reklam/pazarlama aracı durumunda. Bu dökümanda tüm platformlara uygun (crossplatform) bülten mesajı oluşturmaya ait bazı kurallara değineceğim.

#### Posta Servileri

Şu an bu tarz organizasyonların müşteri kitlelerine daha iyi ulaşabilmeleri, segmentasyon veya bülten postalar üzeriden gelecek olan dönüşleri izleyebilme gibi verime yönelik çeşitli özelliklere sahip birçok postalama servisi bulabiliyorsunuz. Bu servisler HTML formatında mesaj gönderirken kodlarınızı yeniden değerlendirmeden geçirebiliyor veya bazı etiket/özellikleri desteklemiyorlar.

#### E-posta okuyucu program/servislerin render mekanizmaları

Postalanan bu epostalar şu an dünyada kullanılan belli başlı e-posta okuyucular tarafından kullanılıyor. Yani gönderdiğiniz e-posta tüm tarayıcı yorumlayıcı motorları tarafından kitlenize ulaşıyor. Aynı zamanda web tarayıcısı olarak kullanılan yorumlayıcıların aynısı değil, değiştirilmiş ve bazı özellikleri desteklemeyen daha ilkel yorumlayıcılar olarak karşımıza çıkıyor.

#### Problem

Burada yaptığınız şey aslında bir mesajı bir kitleye ulaştırmak. Fakat müşteriniz sizden görseli çok, genelde birkaç bağlantı bulunan bir HTML mesaj göndermenizi isteyecek. Bu noktada ilk etapta postalama servislerinin kodlarınız üzerinde yapabileceği olası değişiklikleri düşünmek gerekecek. Profesyonel destek veren postalama servislerinin çoğunda kodunuza dokunulmadan gönderilmesini sağlayabiliyorsunuz ama böyle bir faktörün bulunduğunu da bilmeniz gerekiyor. Burada asıl karşılaşacağınız problem ikinci kısımda anlattığım bir çok e-posta okuyucu program ve servis tarafından html mesajınız gösterilirken farklı çizilecek. Mesjaınızı oluştururken kullancağınız html aynı zamanda spam (istenmeyen) eposta yakalayıcı filtrelere de takılmasını sağlayabilir. Kullanıcının kendi rızası ile bile gönderiyor olsanız e-posta sağlayıcı servisiniz bunu bilmeyecek ve e-postanızın kodlamasına ve bu noktadaki kaliteye bakacaktır. Yani mesajınızı oluştururken dikkat etmeniz gereken noktalar var. Bunlardan önemli olan bazılarına değineceğim.

#### Hazırlık

E-postanızı oluşturmadan önce photoshop, illustrator veya gimp gibi çalıştığınız yazılımda parçalamanızı ve optimizasyonunuzu iyi yapın. Mesajınıza koyacağınız tüm nesneleri kendi sunucunuzda web yayını olan bir dizine koyun. Zira içerde kullanılan tüm imajları dışarıdan sağlamalısınız. Aksi taktirde giden mesaj trafiği yükselecek ve servisler için siz tehlikeli bir kaynak olma yolunda ilerlemiş olacaksınız.

#### Yasaklar

Bazı şeyleri kullanmayı kendinize yasaklayın. Çünkü çoğu okuyucuda zaten çalışmayacaktır. Biliyorum elinizi kolunuzu bağlayacaktır fakat malesef durum böyle.

*   Artalan (background) imajı kullanmayın (CSS veya html etiketiyle)
*   Javascript yazmayın
*   Flash kullanmayın
*   Dışarıdan CSS tanımlamayın (satır içi css kullanın)

#### 1\. Boyut

Mesajı boyutu da trafiği artırmanın dışında ideal bir mesajdan daha uzun bir içeriğe sahip olmamalı. Biliyorsunuz ki mesajınızı şekillendirmek için html etiketleri css tanımları kullanacağız. Bu tanımlar mesajın boyutunu artıracaktır. İmajlarınız için de durum aynı. Boyutu büyük olan imajlar, aynı anda mesajınızı açacak belki binlerce kullanıcı için yüklenmesi zor olan imajlar haline gelebilecektir. Bunun için mesjaınızın 20kb'ı imajlarınızın da 80kb'ı yani toplamda tüm mesajınızın 100kb'ı geçmemesine özen gösterin.

#### 2\. Standart ve Temiz Kod

E-posta okuyucular tarafından yorumlanacak kodun standart olması crossplatform bir ürün çıkarmanız için gerekli ilk kural. Bu kurala ne kadar özen gösterirseniz o kadar az sorun yaşarsınız. Zaten şu an internette standart kod yazmanın önemini vurgulayan birçok yazı bulabilirsiniz. Yadığınız e-posta'yı bir sunucuda host edip w3c standartlık kontrol sayfasından standartlara uygun olup olmadığını kontrol edebilirsiniz. Birçok web geliştirici dreamweaver veya frontpage gibi editorler kullanıyorlar. Bu tarz yazılımlar birçok yardımcı betik, stilleme farklı yaklaşım kullanırlar. Bundan dolayı da kodunuzda çok fazla artık oluşur. Tabiki yorumlamada burada kullanılan yenilikçi yaklaşımların bazıları takılır. Bundan dolayı kodunuzu elle, sade yazın.

#### 3\. İlkel Yapı

HTML mesajınızda birçok resim olacaktır. Bu resimleri doğru yerleştirmek için aklınıza gelen ilk yol ne oluyor? Tabiki css ile pozisyonlamayı düşünüyorsunuz ama yapmayın. CSS'i sadece basit kurallar için kullanın (yazıların boyut, font, rengi vs). Pozisyonlamayı eski mantığa göre tablolarla yapın. Ayrıca tablo kullanırken 3-4 derinliği geçmemeye dikkat edin. Ayrıca cellpadding ve cellspacing kullanmayın (Gmail desteklemiyor). 600px genişliğini aşmamaya çalışın. Bu genişlik neredeyse tüm kullanıcılar için görülebilir alanınızı rahatlıkla takip edebilmelerini sağlayacaktır. HTML mesajınızda DTD tanımı ve <html> ve body etiketleri kullanın fakat içine meta tanımı, css, javascript import tanımları yerleştirmeyin, çalışmayacaktır. Mesajınızıda form ve form elementleri kullamayın bazı servisler formları süzgeçten geçiriyor (örnek Hotmail) Paragraf yerine <br> kullanın.

#### 4\. Türkçe ve ASCII dışı karakterler

ASCII dışı tüm karakterleri html entity olarak kullanın mesela © yerine &copy; Bununla ilgili dosyalar bölümündeki [https://tr.mfyz.com/ascii-karakter-kodlari/](https://tr.mfyz.com/ascii-karakter-kodlari/) dönüşüm tablosunu kullanabilirsiniz.

#### 5\. Metin sürümü (Plain text version)

E-postanızın içine multipart olarak text versiyonunu da ekleyin. Mesjaınızı düz metin olarak linklerden bağımsızlaştırarak metin sürümünü ekleyin. Bu kurallara dikkat ettiğiniz sürece e-posta bültenleriniz daha düzgün ve her okuyucuda aynı görünecektir. Tabiki yazdığınız mesajı bir deneme grubu oluşturarak her gönderimde test ediniz. Son olarak aşağıdaki tabloda hangi e-posta okuyucunun neyi destekleyip desteklemediğini görebilirsiniz.

#### ![](/images/archive/tr/2009/05/email-html-coding-support-table.png)