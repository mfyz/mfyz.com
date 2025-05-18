---
title: "PHP+MySQL sistemler için üye giriş-çıkış-kayıt"
slug: phpmysql-sistemler-icin-uye-giris-cikis-kayit
date: 2006-08-20
url: http://mfyz.com/tr/phpmysql-sistemler-icin-uye-giris-cikis-kayit/
tags: ["login","logout","mysql","PHP","session"]
category: PHP
migration: {"wpId":90,"wpPostDate":"2006-08-20T04:20:11.000Z"}
lang: tr
---

#### Neden bahsediyorum ? :)

Artık neredeyse her sitede olan üyelik, bazı web uygulamaları için vazgeçilmez oldu. Çünkü üyelere ait özelleştirilmiş siteler her zaman daha popülerleşti. Bunu bir gerekli yanı da sistem güvenliği ve hizmet takibi. Mesela yaptığınız projede yapılacak saldırılarda 1-1 KİŞİ tespiti yapabilmenizi sağlayan mekanizma da aslında üye takibidir. Bazı projelerde ise hizmetinizi sınırlamak istediğiniz insanlar olabilir. Üye statü'leri izinleri veya kayıta kapalı (veya davetli) üyelikler ile hizmetinizi hedef kitlene sınırlayabilirsiniz. Neyse üyeliğin yararlarını geçelim. Buraya öğrenmeye geldik :)

#### Neye ihtiyacımız var?

Tabiki bir veritabanına, mysql kullandığımızı varsayarak kod örnekleyeceğim. Ama postgresql fln kullanan arkadaşlar da var ise bu dökümandaki algoritmayı izleyerek kolayca kendileri de kod yazabilirler. Aşağıda veritabanında kullanacağımız üye tablosuna ait veri yapısını import ederek kolayca oluşturabileceğiniz SQL sorgusunu koyuyorum, bu sorgudan hangi alanlar ve özelliklerinin neler olduğunu da kolayca görebilirsiniz.

```
CREATE TABLE \`uyeler\` (
\`no\` int(10) NOT NULL auto\_increment,
\`kadi\` varchar(50) NOT NULL default '',
\`sifre\` varchar(100) NOT NULL default '',
\`izin\` varchar(20) NOT NULL default '',
\`adi\` varchar(100) default NULL,
\`eposta\` varchar(255) default NULL,
PRIMARY KEY  (\`no\`)
) ENGINE=MyISAM AUTO\_INCREMENT=1 ;

```

gördüğünüz gibi basitçe 6 alanım var, burada no, izin, adi ve eposta alanları sistemin düzgün çalışması için şart olan alanlar değiller fakat üyeniz hakkında küçük bir bilgi tutmanızı sağlar. Eğer isterseniz buradaki alan sayınızı artırarak yeni üye detayları ekleyebilirsiniz. Mesela MSN adresi, web sitesi, ev adresi, cep telefonu, kimlik bilgileri mesleği falan fişman.

Şimdilik kayıtlı bir kullanıcının giriş yapmasını vae sayfalarda kullanının giriş yapıp yapmadığını yani oturumunu kontrol etmeyi göstereceğim. Bildiğiniz gibi kayıt işlemi basitçe bir formdan mysql'e veri kaydetme işlemi.. Buna dökümanın sonunda değineceğim.

#### Giriş işlemi

Giriş işlemini yapcağımız bir form hazırlayın. Kullanıcı adı ve şifre giriş alanları olacak olan 2 input'luk bir form. “kadi” ve “sifre” gibi pratik alan adları belirlerseniz işiniz kolaylaşır. Bu formu giris.php diye bir işlem sayfanıza post methodu ile göndereceğiz. Şuna benzer bir form olacaktır:

```
<form name="giris" action="giris.php" method="post">
 <table cellpadding="8" cellspacing="0" align="center">
   <tr>
     <td width="100">Kullanıcı Adı</td>
     <td><input type="text" name="kadi"></td>
   </tr>
   <tr>
     <td width="100">Şifre</td>
     <td><input type="password" name="sifre"></td>
   </tr>
   <tr>
     <td colspan="2" align="right">
       <input type="submit" value="Giriş">
     </td>
   </tr>
 </table>
</form>

```

Giriş işlemi sayfamızın (giris.php) koduna bakacak olursak:

```
<?php
# mysql baglantisi, sesion\_start yapilmis varsayiyoruz
# bilgiler
  $kadi  = $\_POST\["kadi"\];
  $sifre = $\_POST\["sifre"\];
# kullanici bilgisi alalim
  $sorgu = mysql\_query("select sifre from uyeler where kadi = '".$kadi."'");
  if( mysql\_num\_rows($sorgu) != 1 ){
    print '<script>alert("Kullanıcı bulunamadı!");history.back(-1);</script>';
    exit;
  }else{
    # veriyi alıyoruz
      $bilgi = mysql\_fetch\_assoc($sorgu);
  }
# sifre eslestirmesi
  if( md5( trim($sifre) ) != $bilgi\["sifre"\] ){
    print '<script>alert("Yanlış şifre girdiniz!");history.back(-1);</script>';
    exit;
  }
# başarılı giriş yapıldı
# oturuma kaydedip anasayfaya gidelim
  $\_SESSION\["giris"\] = md5( "kullanic\_oturum\_" . md5( $bilgi\["sifre"\] ) . "\_ds785667f5e67w423yjgty" );
  $\_SESSION\["kadi"\]  = $kadi;
?>
<script>
  alert("Başarıyla giriş yaptınız! Şimdi anasayfaya yönlendiriliyorsunuz.");
  window.top.location = './';
</script>

```

gördüğünüz gibi kontrol kısmında çok karmaşık bir kod yok. MySQL'den kullanıcıya ait veri alıyoruz. Eğer gelen kayıt kümesinin boyutu 1 değilse üye adı yok demektir. Hata veriyoruz. Eğer 1 ise kayıt kümesini $bilgi dizisine alıyoruz. Alt kısımda da girilen şifrenin md5'ini veritabanındaki string ile karşılaştırıyoruz. Çünkü veritabanında şifrelerimizi md5'leyip saklıyoruz. Çünkü birisi veritabanımızı araklarsa md5'i çözemesin diye. Üye bilgilerinin güvenliğini sağlamış oluyoruz.

En altta ise giriş kontrolü için oturuma 2 değişken attım birisi şifre ile oluşturulmuş karışık bir cümlenin md5'li hali. Bunu giriş kontrolünde oturumda olup olmadığını kontrol etmek için kullanacağız. Sadece kullanıcı adı kullanmamamın nedeni ise sunucu yönetimindeki birinin oturumları oynayıp giriş yapmış kullanıcı hakkını değiştirememesi için oldukça basit bir engel o kadar. İsterseniz daha karmaşık kriptografik anahtarlar da oluşturabilirsiniz. Bu sitede sadece anahtar tutulur mesela. Oturum bilgileri veritabanında saklanır.. Bu tarz gelişmiş şeyler için de beyin fırtınası yapıp güzel şeyler yazabilirsiniz.

Şimdi giriş yapıldıktan sonra anasayfa'ya yönlendirildi üye, peki biz sayfalarımızda oturumu gezen misafirin üye olup olmadığını nasıl anlayacağız?

#### Üye kontrolü, üye oturumu yönetimi

Benim site geliştirme yoluma göre ilk önce sitenin statik sayfasını hazırlayıp parçalardık hatırlarsanız. Ve her işlem/modül dosyamızın başında mysql.php veya ayar.php gibi bir include edilen dosyamız vardır. İşte buna giris\_kontrol.php diye bir dosya daha ekleyin. Yani; üye'lere ait bilgileri alacağınız sayfalarda (üye kontrolü, üye alanları fln) giris\_kontrol.php diye bir php include ettirin. Her sayfanıza. giris\_kontrol.php dosyamızın kodunu verip açıklayayım :

```
<?php
# uye oturum degiskenleri
  $giris\_yapilmis = false;
  $uye = false;
# kontrol ederek bilgileri dogrulayalim
  if( !empty($\_SESSION\["giris"\]) && !empty($\_SESSION\["kadi"\]) ){
  
    # kulanici bilgisini alalim
      $sorgu = mysql\_query("select \* from uyeler where kadi='".$\_SESSION\["kadi"\]."'");
      if( mysql\_num\_rows($sorgu) == 1 ){
      
        $uye = mysql\_fetch\_assoc($sorgu);
        # anahtar kontrol
          if( $\_SESSION\["giris"\]  ==  md5( "kullanic\_oturum\_" . md5( $uye\["sifre"\] ) . "\_ds785667f5e67w423yjgty" ) ){
            $giris\_yapilmis = true;
          }else{
            # giris yanlis. $uye'yi silelim
            $uye = false;
          }
      }
  }
?>

```

Tabiki bu sayfadan önce mysql ve ayar dosyanızın fln include edildiğini ve session\_start yapılmış olduğunu düşünüyoruz çünkü bu sayfayı her sayfanın başında include ediyoruz.

Oturumdaki **kadi** değişkeni boş değilse veritabanından bilgileri alıyoruz. Eğer kullanıcı yoksa oturum açılmıyor zaten. Eğer şifre ile oluşturulan karışık cümlenin md5'i oturumdaki giris degişkeninin içeriğine eşitse bizim mantıksal koyduğumuz anahtar da doğrudur. Şimdi “giris\_yapilmis” değişkenini true yapıyoruz ve $uye dizisine mysql sonuç kümesini atıyoruz. Neden bunu yapıyoruz çünkü, sayfalarımızda doğrudan $giris\_yapilmis'i if yapılarımızda giriş yapılmış yapılmamış olduğunu hızlıca alabileceğiz. Mesela üyelere özel bir sayfanız var ise bu sayfanın başında;

```
if( !$giris\_yapilmis ){
  print 'Bu sayfa üyelere özeldir! Lütfen giriş yapın!';
  exit;
}

```

diyerek giriş yapmamış kullanıcıların o sayfaya erişimini engelleyebilirsiniz. Eğer üyeye ait bilgilere ihtiyacınız var ise zaten doğrudan $uye dizisinden alabilirsiniz. Mesela giriş formunun yerine Hoşgeldin X dedirtmek için ile X yerine kullanıcı adını basabilirsiniz.

#### Kayıt işlemi

Kayıt işleminin mysql'e veri kaydetmek dışında bir kısmı olmadığından örneklemeye gerek duymuyorum. Sadece şifreyi veritabanına md5 fonksiyonundan geçirip kaydediyoruz. Onun dışındaki kontroller ve veri kayıdını yapamayacağınızı düşünmüyorum.