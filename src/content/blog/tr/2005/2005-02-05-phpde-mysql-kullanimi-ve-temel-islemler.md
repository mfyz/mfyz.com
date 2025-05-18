---
title: "PHP'de MySQL kullanımı ve temel işlemler"
slug: phpde-mysql-kullanimi-ve-temel-islemler
date: 2005-02-05
url: http://mfyz.com/tr/phpde-mysql-kullanimi-ve-temel-islemler/
tags: ["kullanim","mysql","Sunucu Programlama","temel işlemler"]
category: Sunucu Programlama
migration: {"wpId":75,"wpPostDate":"2005-02-05T07:28:14.000Z"}
lang: tr
---

#### Giriş

MySQL, sql tabanlı bir dil olduğundan yönetimi tamamen kendine özgü cümlecikler ile olur. Bu cümlecikler o kadar esnektir ki aynen konuşma dilinde emirler vermek gibidir. Sadece bazı kurallara sahiptir. Bu dökümanda mysql'de bu yapılabilecek ana işlemler hakkındaki sql cümleleri oluşturmayı, php ile mysql'i nasıl kullanacağımızı, bağlantı sağlayacağımızı ve temel işlemler için gerekli sql cümle yapılarını göreceğiz.

#### MySQL sunucusu ile bağlantı sağlamak.

Her protokolde olduğu gibi mysql'de de öncelikle bir bağlantı sağlayıp bu iletişim protokolü üzerinden işlemler yapacağız. MySQL'i komut satırından kullananlar bilir ki, mysql client'da sifremizi girdikten sonra ilk iş olarak bir tablo seçer ve sonrasında da yazdığımız güçlü sql sorgulara bakarız. Temel olarak bağlanıp bir veritabanı seçmemiz gerekiyor sorgularımızı işletmek için. PHP'yi mysql destekli derlemişseniz mysql extension'ı yüklenmiş demektir. Eğer yüklü ise mysql fonksiyonlarını işletebiliriz. MySQL fonksiyonları hakkında daha ayrıntılı bilgiyi php dökümantasyonundan alabilirsiniz.

MySQL'e bağlanabilmek için 3 kritere sahip olmamız gerekir. Birincisi bağlanacağımız host'dur. Üzerinde çalıştığımız bilgisayar olduğundna dolayı genellikle localhosttur. İkinci parametre kullanıcı, son parametre de bu kullanıcının şifresidir. İster php'den ister başka bir client'dan bağlanmaya çalışın; ancak bu bilgiler doğrultusunda bir mysql bağlantısı edinebilirsiniz. PHP'de bağlantı işlemini mysql\_connect() fonksiyonu yapıyor. Bu fonksyiona sırasıyla host, k.adi, şifre parametrelerini belirtmemiz gerekiyor. Örnek bir bağlantı sayfası :

```
// ayarlar
$host      = "localhost";
$kullanici = "root";
$sifre     = "";

// baglanti
$baglanti = mysql\_connect( $host, $kullanici, $sifre ) or die("HATA : " . mysql\_error());

```

Görüldüğü gibi önce bağnatı ayarlarımızı yaptık, ardından bu değişkenleri kullanarak $baglanti adlı değişkene bir mysql bağlantısı atadık. or die kalıbı her komutta kullanabileceğimiz bir kalıptır. or die'dan önceki fonksiyonda işletim hatası olursa die()'da belirttiğimiz ifade ekrana basılır ve script çalışması durdurulur. mysql\_error() fonksiyonu ise bir önceki mysql işleminde oluşan hatayı verir. Şimdi bu bağlantıyı kullanarak bir veritabanı seçeceğiz. Çünkü sorguları çalıştırabilmek için öncelikle bir bağlantı sağlamış ve bir veritabanı üzerinde bulunuyor olmamız gerek. Veritabanı seçimini de **mysql\_select\_db()** fonksiyonu ile yapacağız.

```
// veritabani secimi
mysql\_select\_db( 'veritabanim', $baglanti ) or die("HATA : " . mysql\_error());

```

Böylece "veritabanim" adlı veritabanını seçtik. Artık sorgularımızı bu veritabanı üzerinde işletebiliriz. Sorguları işletmek için ise **mysql\_query()** foksiyonunu kullanacağız. Bu fonksiyon tek parametre ile çalışıyor. Daha önce yapılmış bağlantıyı ve seçilmiş veritabanını kullanıyor. Bu tek parametre de işleteceğimiz sql sorgusunu içeren stringdir. Şimdi temel mysql işlemlerinde kullandığımız sql sorgularını görelim..

#### Temel mysql işlemleri nelerdir?

MySQL'de temel (ve genel) olarak yaptığımız işlemler bir tabloya veri eklemek, bu verileri çekmek, güncellemek ve silmektir. Bu işlemler için ayrı ayrı sql yapıları kullanacağız. Bazı işler daha sistem kurulurken kullanılır. Mesela bir veritabanı yaratmak, ya da yeni tablo oluşturmak.. Bu işlemleri sistemlerde her zaman yapılan işler arasına alamayız.. Onun için bu işlemleri bilgisayarınızda sistemi geliştirirken yaparız. Bunları phpMyAdmin programı ([http://www.phpmyadmin.net]("http://www.phpmyadmin.net")) ile yapmanızı öneririm. Basit bir arabirimi ve Türkçe desteği var. phpMyAdmin ile başlangıç işlerini hatta rutin işleri yapacak olan sorguları da yazarken/geliştirirken bile kullanabilirsiniz. Aşağıda bazı anlatımlar göreceksiniz, bu anlatımları tablo adlı bir tablo üzerinde yapacağım. Basitçe tabloda; kullanici, kayit\_tarihi, eposta ve ziyaret\_sayisi alanları var olsun. Birlikte çalışmak için şu sql'i çalıştırıp siz de deneme tablosu oluşturabilirsiniz :

```
CREATE TABLE \`tablo\` (
  \`kullanici\` VARCHAR( 20 ) ,
  \`kayit\_tarihi\` DATETIME,
  \`eposta\` VARCHAR( 255 ) ,
  \`ziyaret\_sayisi\` INT( 12 )
);

```

Şimdi rutin işleri yapan sorgularımızı geliştirip, nasıl işleneceğini görelim.

#### Veri eklemek

Veri eklemek için kullanacağımız sql cümlesi yapısı şöyledir :

```
INSERT INTO \`tablo\` ( \`kullanici\` , \`kayit\_tarihi\` , \`eposta\` , \`ziyaret\_sayisi\` )
VALUES ('fatih', NOW( ) , 'eposta@adresi.com', '0');

```

Yapı olarak, önce INSERT INTO 'tablo adı' ile başlar burada hangi tabloya veri ekleme işlemi yapılacağı belirtilir. Bu kısımdan sonra parantez içerisinde hangi sıra ile veri alanları için verilerin belirtilmesi gerekiyorsa o sırada alanlar yazılması gerekiyor. Boş bırakılması durumunda geçerli sırada veri girilecektir. Bu kısımdan sonra VALUE kalıbı ve tekrar parantez içerisinde az önce belirtilmiş sırada gerekli veri türlerine göre verilerin belirtilmesi gerekir. Bizim sorgumuzda veriler, meta'ları değerlere eşleyerek göstemek gerekirse;

```
kullanici      = 'fatih'
kayit\_tarihi   = < verinin eklendiği andaki tarih >
eposta         = 'eposta@adresim.com'
ziyaret\_sayisi = 0

```
şeklinde ekleniyor.

Sorguda görüldüğü gibi o andaki zamanı belirtmek için **NOW()** şeklindeki mysql fonksiyonunu kullandım. MySQL o kadar esnek bir sorgulama dilidir ki, üzerinde çok fazla kalıp, çok fazla tenkin ve çok fazla fonksiyon vardır. Bu fonksiyonlar hakkındaki bilgiyi mysql'in kendi dökümantasyonunda veya mysqlfreaks'da bulabilirsiniz.

#### Veri silmek

SQL sorguları genelde bazı kalıplardan oluşur. Belirli bir sorguyu filtrelemek için WHERE kalıbını kullanırız. Aynı if gibidir. Belirli bir sorgudan etkilenecek olan kayıtlardan bazılarını seçeriz. Mesela silmek için kullandığımız sorguda ilk başta tüm tablo etkilenir; ama biz belirli kayıtları/kayıdı silebilmek için o kayıt hakkında bazı referanslar verip tüm tabloyu o veri çıkana kadar filtrelemiş oluruz. AND kalıbı ekleyerek birden fazla koşulda filtreleme yapılabilir. Tablomuzda birden fazla aynı kullanıcı adına sahip veri olmayacağı için kullanıcı adlı alan bizim için iyi bir referans olabilir. Silmek için DELETE FROM 'tablo adı' kalıbını kulalnırız. Bu kullanımda tüm tablo etkilenir ve tablo boşaltılmış olur. WHERE kalıbını sorgumuza ekleyerek bir veya daha fazla belirli kayıdı sileceğiz. Örnek olarak az önce eklediğimiz kayıdı silelim..

```
DELETE FROM \`tablo\` WHERE kullanici = 'fatih'

```

Bu sorgu ile tek satır (fatih kullanıcısına ait) silinmiş olacaktır.

#### Veri güncellemek

Veri güncellemek de silmek gibidir. Yani süzgeçlenerek kayıtlar ifade edilir. Süzgeçlenmediği takdirde tüm tablo etkilenecektir. SQL yapısı UPDATE 'tablo adı' SET şeklindedir. Az önceki verinin silinmemiş olduğunu varsayarak güncelleyelim.

```
UPDATE \`tablo\` SET ziyaret\_sayisi = ziyaret\_sayisi + 1 WHERE kullanici = 'fatih'

```

Bu sorguda fatih kullanıcısının ziyaret\_sayisi değerini 1 artırmış oluyoruz. MySQL'de alan adlarını böyle kullanabiliriz, bunun için önce değeri tablodan çekip sonra php ile artırıp buraya girmeye gerek yoktur. MySQL'de bu tarz operatörlerde mevcuttur. Ayrıca güncelleyeceğimiz alan tek olmayabilir, böyle durumlarda aralarına virgül koyarak belirtebiliriz.

Veri çekmek ve veri listelemek oldukça ayrıntılı ve uzun olduğu için bu yapıyı ayrı dökümanda ele alacağım!