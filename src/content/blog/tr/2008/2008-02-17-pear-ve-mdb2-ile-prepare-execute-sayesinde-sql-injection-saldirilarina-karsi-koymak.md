---
title: "PEAR ve MDB2 ile “Prepare & Execute” sayesinde SQL injection saldırılarına karşı koymak"
slug: pear-ve-mdb2-ile-prepare-execute-sayesinde-sql-injection-saldirilarina-karsi-koymak
date: 2008-02-17
url: http://mfyz.com/tr/pear-ve-mdb2-ile-prepare-execute-sayesinde-sql-injection-saldirilarina-karsi-koymak/
tags: ["attack","execute","injection","mdb2","pear","php","prepare","saldırı","sql injection"]
category: PHP
migration: {"wpId":134,"wpPostDate":"2008-02-17T04:34:05.000Z"}
lang: tr
---

PEAR'da MDB2 ile veritabanı işlemleri hakkında daha önce döküman yazmıştım (aynı anda yayınladım gerçi). MDB2 ile veritabanı işlemleri ile ilgili bilgi edinmek için [https://tr.mfyz.com/pear-da-mdb2-ile-veritabani-islemleri/](https://tr.mfyz.com/pear-da-mdb2-ile-veritabani-islemleri/) dökümanını okuyun. Bu dökümanda veri işleme ile ilgili kısımlardan bahsetmeyeceğim.

#### SQL injection, başımızın belası :)

SQL injextion saldırılarını çok duyuyoruz. Çok da yeni bir şey değil aslında. Fakat çok büyük sitelerde, devlet siteleri, ticari siteler vs. Dikkatsiz programcılar veya dikkatsiz programlama sonucu bu saldırılara kurban gidiyor. Her gün bir yerlerin "hack"lendiğini görüyoruz. Muazzam işler yapmaya gerek yok bu saldırıları yapmak için. Aynı şekilde bu açıkları vermemek için de muazzam önlemler almanıza gerek yok aslında. Bütün olay kullanıcın girdiği metinleri işlerken ve ekrana basarken kontrollü basmakta yatıyor bu injection, xss saldırılarının altyapıları. Sitenizde sql'inize veya htmlinize enjekte etmek istedikleri şeyleri aslında sizin tırnaklarla sınırladığınız alandan kaçarak başarıyorlar. Tabiki herşey tırnakta çözülmüyor fakat dananın kuyruğunu kopardıkları yer sizin sınırlandırdığınız noktadan kaçabilmekte :) Yani Hex kodları ile tırnak veya özel karakterler girilmeye çalışıyor, tırnaklar kullanılıyor veya ascii, htmlentity, htmlencode ile özel karakter girmeye çalışılıyor. XSS konusunda burada bahsetmeyeceğim. SQL injection için eğer pear ve mdb2 kullanmıyorsanız, kullanıcıdan gelen string türü verileriniz için mysql'de mysql\_real\_escape fonksiyonunu kullanabilirsiniz. Metinlerinizi bu fonksiyondan geçirip sqlinize sokun. Eğer MDB2 kullanıyorsanız Preapre ve Execute fonksiyon grubu ile uygulatmak istediğiniz sql cümlenizdeki değişkenleri işletmeden önce veri türüne göre güvenli hale getirebilirsiniz. Aslında tek görevi güvenlik değil bu fonksiyonların. Asıl amaç veritabanına doğru türde veri göndermek. Aynı zamanda tek sql'i tekrar tekrar yazmadan birden fazla çalıştırmanızı da sağlıyor. Güzelliklerine az sonra değineceğim :) MDB2'de bir sorguyu işletmek için
```
$sorgu = $db->query("insert into tablom (no, yazi) values (34, 'Metin degeri')");

```
query fonksiyonunu kullanıyorduk. Diyelim ki 15 tane alanınız var ve hepsini "insert" sql cümlenizde kullanıyorsunuz. query fonksiyonu ile bir sürü tırnak ve değişkeni cümleye dönüştürmek için karışık bir kod yazacaksınız. tek satır görünümünde ama 4-5 satır uzunluğunda birşey olacak :) Prepare ve execute fonksiyonlarını aşağıdaki örnekle açıklayayım.
```
$sorgu = $db->prepare("insert into tablom (no, yazi) values (?, ?)", array('integer', 'text') );
$sonuc = $sorgu->execute(array( 34, 'Yazı yazı yazı' ));

```
gördüğünüz gibi 2 satırda hallettik işimizi. $sorgu değişkenine bir sql hazırlıyoruz. Yapılan şey cümle olarak sql cümlesini sunmak, değerlerimizin yerine tırnak fln koymadan doğrudan soru işareti (?) koyuyoruz. prepare fonksiyonuna ikinci paramere olarak, dizi şeklinde veri türlerini veriyoruz. Veri türlerini string olarak elle yazıyoruz ve sorguda hangi sırada ne tür değişken olduğunu açıklıyor bu kısım aslında. Sonuçta $sorgu değişkeninde bir sql cümlesi duruyor, hangi alanlara hangi TÜR veri girileceği belirlenmiş şekilde. Amaçda bu zaten, yani alanlarımıza istemediğimiz türde veri sokmamak. Veri türleri hakkında detaylı bilgi için http://pear.php.net/manual/en/package.database.mdb2.datatypes.php adresini ziyaret edin. İkinci satırdaysa hazırlanmış sql'i işletiyoruz. Tabiki dizi olarak VERİ'lerimizi veriyoruz execute fonksiyonuna. execute fonksiyonu da $sorgu nesnesinin bir özelliği tabiki. Yani prepare olmamış bir sql execute edilemez. Hata verir. Hatta böyle bir fonksiyon yok der :) İşin güzelliğini örnekle açıklayayım :
```
$sorgu = $db->prepare("insert into tablom (no, yazi) values (?, ?)", array('integer', 'text') );
// birden fazla veriyi ayni sql ile ekleyelim
$sonuc = $sorgu->execute(array( 34, 'Yazı yazı yazı' ));
$sonuc = $sorgu->execute(array( 35, '35. yazı yazı' ));
$sonuc = $sorgu->execute(array( 36, 'Başka yazı yazı' ));
$sonuc = $sorgu->execute(array( 37, 'Yok yok başka yazı bu yazı' ));

```
söze gerek var mı? text tipi alanlara otomatik olarak sql injection için kaçmak amacıyla kullanılan özel karakterler dönüştürülüyor. Zaten text dışındaki alanlara herhangi bir string veri kaydedilemiyor. Yani herşey kontrol altında. Eğer sql cümlenize katacağınız HERHANGİ bir değişken kullanıcı kontrolüyle geliyorsa prepare & execute yöntemini kullanın. Eğer uygulamanızda basit bir sql işlemi kullanıyorsanız işinizi query ile halledebilirsiniz. Konu hakkında mdb2 manual'da ki bilgiye de göz atmanızı öneririm [http://pear.php.net/manual/en/package.database.mdb2.intro-execute.php](http://pear.php.net/manual/en/package.database.mdb2.intro-execute.php)