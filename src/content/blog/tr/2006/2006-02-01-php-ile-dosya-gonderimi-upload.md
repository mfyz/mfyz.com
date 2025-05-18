---
title: "PHP ile dosya gönderimi (upload)"
slug: php-ile-dosya-gonderimi-upload
date: 2006-02-01
url: http://mfyz.com/tr/php-ile-dosya-gonderimi-upload/
tags: ["PHP","upload"]
category: PHP
migration: {"wpId":86,"wpPostDate":"2006-02-01T06:06:11.000Z"}
lang: tr
---

Php ile dosya gönderimi işlemleri oldukça kolaydır. Burada dosya gönderiminin nasıl yapılabileceği hakkında bilgi vermeye çalışacağım. Gönderilen dosyaları veritabanında saklamak vs gibi işlemlere değinmeyeceğim. Öncelikle formumuzu tanımlarken enctype="multipart/form-data" yüklemini eklemeniz gerektiğini hatırlatmak istiyorum. Örnek bir dosya gönderme formu aşağıdaki gibi olabilir.
```
<form action="yukle.php" method="post" enctype="multipart/form-data">
  Gönderilecek dosya: <input name="dosya_yukle" type="file">
  <input type="submit" value="Gönder">
</form>

```
Dosya Gönderimi desteği için sunucunun ayarlarında aşağıda belirtilen ayarları gözden geçirmeyi unutmayın. ( phpinfo(); ile görebilirsiniz )
```
file_uploads          Dosya gönderimi izni. "Açık"/"On" konumunda olmalıdır.
upload_max_filesize   Sunucu ayarındaki maximum dosya boyutu izni.
                      Varsayılanı 2M sanırım.
upload_tmp_dir        Gönderilen dosyaların tutulacağı geçici dizin. 
                      Eğer "no value" ise işletim sisteminizin sağladığı
                      geçici klasörü kullanır.
post_max_size         Aslında post ile gönderilebilecek en yüksek veri
                      boyutunu belirtir ama dolaylı olarak
                      dosya gönderimini de etkiler.

```
PHP, gönderilen dosyaları php.ini deki ayarlar doğrultusunda geçici klasöre geçici bir isimle kaydeder ve gerekli bilgileri $_FILES adlı özel bir değişkende aşağıdaki şekilde kaydeder. ( PHP'nin 4.1.0 sürümü öncesi $_FILES değişkeni yerine $HTTP_POST_FILES kullanılıyordu )

Örneğimizdeki form yoluyla herhangi bir dosya gönderildiğinde yukle.php dosyamızda $_FILES değişkeninin içeriği aşağıdaki gibi olacaktır.
```
$_FILES['dosya_yukle']['name']       Gönderilen dosyanın orjinal adı.
$_FILES['dosya_yukle']['type']       Eğer tarayıcı tarafından sağlanmışsa dosyanın mime türü. ( örneğin: image/gif )
$_FILES['dosya_yukle']['size']       Byte cinsinden gönderilen dosyanın boyutu.
$_FILES['dosya_yukle']['tmp_name']   Sunucudaki geçici dosyanın adı.
$_FILES['dosya_yukle']['error']      İşlemle ilgili hata kodu. Bu PHP 4.2.0 ve sonrasında eklenmiştir.

```
Burada dosya_yukle olarak geçen ismi biz formda atamış olduk. Yukarıdaki örnekte ilgili alana ne isim verilmişse o isimle kaydedilecektir. Bu sayede birden fazla dosyayı tek seferde gönderebilirsiniz.

'error' parametresinin alabileceği değerler hakkında;
```
0   Yükleme işleminde herhangi bir hata ile karşılaşılmadığı anlamına gelir.
1   php.ini de belirtilmiş olan upload_max_filesize ayarını aşan boyutta bir dosya gönderilmeye çalışılıyor.
2   Formdaki MAX_FILE_SIZE alanının değerini aşan bir dosya. Bunu aşağıda tekrar ele alacağım.
3   Dosya gönderimi tam olarak tamamlanamadı. Yarım kalan dosya iptal edilir.
4   Dosya yüklenemedi.
6   Geçici dosya bulunamıyor. ( PHP 4.3.10 ve PHP 5.0.3. sürümlerinde eklendi. )
7   Sürücüye yazılamıyor ( PHP 5.1.0 de eklendi. )

```
Ayrıca PHP 4.3.0. sürümünden sonra aşağıdaki gibi hata sabitleride tanımlanmıştır.
```
0 = UPLOAD_ERR_OK
1 = UPLOAD_ERR_INI_SIZE
2 = UPLOAD_ERR_FORM_SIZE
3 = UPLOAD_ERR_PARTIAL
4 = UPLOAD_ERR_NO_FILE
6 = UPLOAD_ERR_NO_TMP_DIR
7 = UPLOAD_ERR_CANT_WRITE

```
Eğer kullanıcının tarayıcısı bir şekilde bize ['type'] alanını sağlamıyorsa; bunu mime_content_type() fonksiyonunu kullanarak bulabiliriz. Ancak bildiğim kadarıyla bu fonksiyon sadece Linux ortamında çalışacaktır.

**Hata 2 :** Eğer istersek formumuzda
```
<input name="MAX_FILE_SIZE" type="hidden" value="30000" />
```
şeklinde bir alan daha tanımlayarak kullanabiliriz. Avantajı, dosya daha sunucuya gönderilmeden önce boyut kontrolünden geçirildiği ve işleme buna göre devam edildiğinden boyutu limiti aşacak olan dosya sunucuya gönderilmeden önce işlem iptal edilmiş olur. Ayrıca, herhangi bir ayarı tamamiyle kullanıcının denetimindeki bir ortama göndererek ondan gizlemeye çalışmak mantıklı olmayacağından tavsiye edilmez. Çünkü hidden özelliği sadece html ile ilgili bir durumdur. Kullanıcı, "gizli olsa dahi" bu değeri değiştirebilir. Eğer herhangi bir şekilde dosya boyutu kontrolü yapmak istiyorsak bunun yanısıra php içerisinde ['size'] değişkeniyle gelen değeri kontrol ederek yapabiliriz ki bu şekilde daha güvenli olacaktır.

Sanırım artık bir örnek ile sonlandırmalıyım. Yukarıdaki formumuza basit bir php programı entegre edeyim.
```
<?php
// sayfanin ilk açilisinda herhangi bir islem yapmamak için böyle bir degisken
// varmi diye bakiyoruz
   if( isset($_FILES['dosya_yukle']) ){
     // error degerinin 0 olmadigi tüm durumlar hatalidir.
     // Buradan faydalanarak eger hata varsa ekrana basiyoruz yok ise isleme geçiyoruz.
        if( $_FILES['dosya_yukle']['error'] ){
          echo 'Bir hata olustu ve dosyaniz alinamadi.';
        }else{
          copy($_FILES['dosya_yukle']['tmp_name'],'./upload/'.
               $_FILES['dosya_yukle']['name']);
          echo '<h4>Dosyaniz alindi.</h4> Alinan dosya bilgileri <br/>Isim:'.
               $_FILES['dosya_yukle']['name'].'<br/>';
          echo 'Boyut: '.($_FILES['dosya_yukle']['size']/1024).' KB<br>';
          echo 'Türü : '.($_FILES['dosya_yukle']['type'].'<hr>';
         } // if
    } // if
?>
<form action="yukle.php" method="post" enctype="multipart/form-data">
  Gönderilecek dosya: <input name="dosya_yukle" type="file">
  <input type="submit" value="Gönder">
</form>

```
Tabi bu kod sadece örnek olduğu için fazlaca karışmasını istemedim. dosya türü yada boyutu sınaması yapabilirdik oluşan hataya göre farklı ve tam olarak hatanın ne olduğunu anlatan mesajlar verebilirdik, yada copy fonksiyonu görevini yerine getiremezse (yazma izinleri ?) bu durumda yine hata mesajı verdirebilirdik.

Kaynaklar; [http://tr.php.net/manual/en/function.mime-content-type.php](http://tr.php.net/manual/en/function.mime-content-type.php) [http://tr.php.net/manual/en/features.file-upload.php](http://tr.php.net/manual/en/features.file-upload.php) [http://tr.php.net/manual/en/features.file-upload.errors.php](http://tr.php.net/manual/en/features.file-upload.errors.php)

**Hazırlayan :** Orhan KURNAZ