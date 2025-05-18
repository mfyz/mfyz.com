---
title: "E-postalarınıza HTML imza ile daha ilgi çekici olun"
slug: e-postalariniza-html-imza-ile-daha-ilgi-cekici-olun
date: 2009-07-03
url: http://mfyz.com/tr/e-postalariniza-html-imza-ile-daha-ilgi-cekici-olun/
tags: ["Diğer","html","improvement","imza","mail","signature","thunbderbird"]
category: Diğer
migration: {"wpId":145,"wpPostDate":"2009-07-03T04:21:45.000Z"}
lang: tr
---

#### E-Postalarda imza kullanımı

Günümüzde eposta ile yazışmak artık günlük bir parçamız. Yazışmalarınızda imza kullanarak kişisel tanımınızı yapmanın yanı sıra, statünüzü (iş ve pozisyon gibi) yansıtmak, portfolyo veya blog gibi internetteki kaynaklarınızı insanlara yaymak için vereceğiniz kısa linkler ile yazışmalarınızdan daha çok verim alabilirsiniz. Hatta şu anda oldukça verimli işleyen bir reklam tekniği olarak algılanabilir bu konu.

Bu dökümanda imza kullanımınızı daha iyi, etkileşimli hale getirmek için birkaç numara yapmayı göstereceğim.

#### Etik

İmza ile link paylaşmak, kendiniz hakkında bilgi vermek bu işin güzel yanı fakat burada belirteceğiniz bilgiler konusunda dürüst olmanız, abartıdan kaçmanız gerekiyor. Yani imza'daki amaç aynen bir kartvizit'de verilmek istenen bilgiler gibidir. Yani insanlara sohbetiniz arasında verirsiniz, o anda baktıklarında sizin bir çeşit kimliğinizi, yaptığınız işi, yetkinlik durumunuzu bunun yanı sıra sizinle iletişime geçebilecekleri bilgileri verirsiniz. Yani etik olarak kartvizitinizde naısl abartı bilgi, yanlış bilgi vermezseniz imzanıda da vermemelisiniz.

İşin bir diğer tarafı da burada vereceğiniz bilginin kalabalık olmaması, öz olmasıdır. Yani 10 tane link ve 2 paragraf yazı yazmamalısınız. En fazla 2 veya 3 tane bağlantı belirtip siteniz, blogunuz veya portfolyonuzu belirtin. Bunun dışında kullandığınız diğer eposta hesapları ve telefonunuzu da belirtebilirsiniz. Ama adres gibi uzun ve her zaman işe yaramayacak bilgileri her espotanızda yaymayın. Çünkü farkında olmadan insanlara spam yapıyor olursunuz. Rahatsız etmeyecek, göz yormayacak bir içerik hazırlamaya özen gösterin.

#### İçerik, Resimler İkonlar

Hazırlayacağınız imzada az sayıda ikon ve kullandığınız bir sembol, şirketinizin logosu veya hiçbiri yoksa kişisel olur belki ama küçük bir fotografınızı ekleyebilirsiniz. Ekleyeceğiniz materyallerin hem dosya boyutlarının büyük olmamasına hem de görünür boyutlarının çok büyük olmamasına dikkat edin. Daha önce de bahsettiğim giib insanları rahatsız etmeden kendi reklamınızı yapmaya çalışıyor olacaksınız.

#### Başlayalım

İmzanızı hazırlarken html etikerleri bile bulunmayan bir html bloğu oluşturacağız. Burada kesinlikle ilkel düşünmeniz gerekiyor çünkü neredeyse tüm mail client'lar oldukça ilkel motorlarla ve spam gibi engellerden dolayı da sade kodlamada bulunmasını şart koşuyor. Bu kurallar ve öneriler hakkında daha önce birşeyler yazmıştım ([Başarılı bülten (newsletter) mesajı oluşturmanın 5 kuralı](https://tr.mfyz.com/basarili-bulten-newsletter-mesaji-olusturmanin-5-kurali/)). Bu kurallardan hatırlatmam gerekenler :

*   External css kullanamazsınız
*   Kompleks ve css 3 gibi yeni öznitelikleri kullanamazsınız
*   Javascript, flash gibi şeyler kullanamazsınız
*   Artalan imajı kullanmamaya çalışın (bazı web client'lar desteklemiyor)

Bu hatırlatmalar dışında burada hazırlayacağınız html olabildiğince sade yapın. Yerleşimi table ile yapıp sadece text tipi stillemeyi inline kullanın.

Şimdi bu kurallara uygun benim kendim için hazırladığım imzam şöyle :

*   Basitçe yaptığım işten bahsedeceğim
*   Kullandığım logo/amblem/sembol'u belirteceğim
*   Komunite sitesi ve portfolyo sayfamın adresini vereceğim

Bunları basit bir tablo ile yerleştirdiğimde şu şekilde bir imza oluşturdum :

![](/images/archive/tr/2009/07/imza1.gif)

Farkettiyseniz oldukça sade, zaten buradaki amaç sizin epostanızı okuyan birisi, gönderen kişi hakkında fikir edinebilmesi için vereceğiniz şey olmalı. Tabiki bu kısımda karışık veya uzun metinler kullanarak bunu sağlayamazsınız.

Bu imzayı oluşturan html kodu şöyle :
```
<div style="border-top: 1px dotted #ccc; height: 15px; font-size: 1px;"></div>
<table border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td valign="top"><img src="mail_logo.gif" alt="Logo" width="52" height="43" border="0" /></td>
    <td width="15">&nbsp;</td>
    <td valign="top">
      <span style="font: 20px Lucida Grande, Arial; font-weight:bold;">Mehmet Fatih YILDIZ</span>
      <span style="font: 15px Lucida Grande, Arial; color:#999; margin-bottom:5px;">// UI Designer and Web Developer</span><br />
      <a style="font: 12px Lucida Grande, Arial; color:#F63; text-decoration:none; border-bottom:1px solid #06F;" href="http://mfyz.com" target="_blank">mfyz.com</a>
      <a style="font: 12px Lucida Grande, Arial; color:#666; text-decoration:none; border-bottom:1px solid #F00;" href="http://mfyz.net" target="_blank">mfyz.net (Portfolyo)</a>
    </td>
  </tr>
</table>

```
gördüğünüz gibi tüm css'ler satır içinde kullanılmış durumda. Artalan imajı yok ve yerleşim tablo ile sağlanmış. İşte bu ilkellikte olması gerekiyor.

Bu noktada hazırladığınız sayfayı body, html etiketlerinden arındırarak kaydedin. Yani mesela benim imzam için yukarıda verdiğim kodu kaydettim bir dosyaya. Bu noktaya geldiyseniz şimdi yapacağınız şey, imzada kullandığınız imajları external bir yere almak. Bu örnekte tek imaj var mail_logo.gif bu imajı kendi sitem altında bir yerlere koyup adresini değiştirdim. Yani `http://mfyz.com/mail_logo.gif` adresinde mesela. Çünkü bu düzeltmeyi yapmazsanız tüm mesajlarınızda bu dosya ekli (attach) olarak gitmeye başlayacaktır. Bu da karşı tarafı rahatsız edebilir (ben rahatsız olurum açıkcası). Tabiki ekli de gönderseniz, dış bağlatı ile de gönderseniz eposta okuyucu programlar, karşıdaki kişi kabul edene kadar sizin imajlarınızı göstermeyecektir. Bu noktada imajlarınız içinde bilgi olmamasına dikkat edin. Yani bu örnekteki gibi logo, ikon gibi materyalleri imaj olarak kullanın.

#### E-posta istemcilerinin ayarlanması

Bu dökümanda html ve css ile eposta imzanızı nasıl şekillendireceğinizi ve etkileyici hale getirebileceğinizi anlatmaya çalıştım. Thunderbird universal bir yazılım olduğu için ve html imza ayarlaması kolay olduğu için kısaca anlatacağım fakat diğer eposta okuyucularda ayarlamayı başka dökümanlarda değineceğim.

MacOSX'de Mail.app (Apple Mail) istemcisinde html imza ayarlamayla iligili yazdığım diğer dökümana ulaşmak için [buraya tıklayın](https://tr.mfyz.com/macosxde-mailapp-apple-mail-istemcisinde-html-imza-ayarlamak/).

Thunderbird'de html imza ayarlamak gerçekten oldukça kolay. Hesap bilgilerinizi ayarladıktan sonra Tools / Account Settings menüsünden ulaşabileeğiniz hesap bilgileri penceresini açın.

![](/images/archive/tr/2009/07/ayar.jpg)

Ayarlamak istediğiniz eposta hesabını seçin. Seçenekler içinden "Attach this signature" kısmını işaretleyerek alttaki alandan kaydettiğimiz html dosyasını gösterin. Artık yeni mesajlarınıza html imzanız eklenecektir.