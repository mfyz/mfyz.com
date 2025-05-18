---
title: "PHP'de gelen isteğin Ajax çağrısı olup olmadığını tespit etmek"
slug: phpde-gelen-istegin-ajax-cagrisi-olup-olmadigini-tespit-etmek
date: 2009-10-19
url: http://mfyz.com/tr/phpde-gelen-istegin-ajax-cagrisi-olup-olmadigini-tespit-etmek/
tags: ["ajax","http","php","request","server","variables","xml"]
category: PHP
migration: {"wpId":151,"wpPostDate":"2009-10-19T01:29:10.000Z"}
lang: tr
---

Her yerde ajax kullanımından geçilmez oldu. Ajax, hem kolaylıklarından hem de RIA'in (Rich Internet Applications) temeli olduğundan popülerliği gitgide artıyor. Karşımıza her yerde çıkıyor ve artık jquery gibi frameworkler sayesinde ajax çağrıları yapmak için tek satırda 5-10 karakterlik bir javascript kodu bile yeterli oluyor.

Bir php kodunda genelde çıktı verirken normal html etiketleri kullanıp tüm sayfayı tasarlıyoruz fakat genelde bu sayfalar bir verit yapısının görüntüleri (view) oluyor ve aynı çıktıyı javascript ile alıp basmak, hatta bazen ajax ile dışarıya bile vermek gerekebiliyor.

Artık az sonra bahsedeceğim method ile, dosyaları tasarlarken 2 türlü kullanımı için tasarlayacaksınız. Yani hem normal erişim ile hem de o sayfayı ajax ile kullanabilecek şekilde düşüneceksiniz. Burada ajax çağrısı olduğunu yakalamak için genel bir teknik olarak get methodu ile bir değişken gönderip onu izleyebilirsiniz. Mesela kayit.php?ajax=1

Bu, işin ilkel noktası. Ajax çağrısı olup olmadığını yakalamak için artık sunucu ortam değişkenleri arasında **$\_SERVER\["HTTP\_X\_REQUESTED\_WITH"\]** değişkeni ile çağrı türünde değer xmlhttprequest ise yapan client'in kullandığı protokolu alabiliyorsunuz. Genellikle içindeki değer "xmlhttprequest" oluyor zaten. Yani bir çağrının ajax olup olmadığını bu şekilde kolayca kontrol edebilirsiniz.

Ufak şekilde örneklemek gerekirse:
```
$kisiler = array('Fatih', 'Ahmet', 'Mehmet', 'Zeynep');
// ekrana basalim
print "<ul>";
foreach( $kisiler as $kisi ){
    print "<li>$kisi</li>";
}
print "</ul>";

```
Bu kodda isimleri liste çıktısı alırsınız. Eğer javascript ile bu veriye erişmek istersek ajax çağrısı ile bu sayfayı çağırabiliriz ama işlenmiş html kodundan o isimleri almak zor olur. Ya da sadece belirli bir kısmını almak isteyebiliriz. Bunun için basitçe:
```
$kisiler = array('Fatih', 'Ahmet', 'Mehmet', 'Zeynep');
// ajax cagrisi ise json donelim
if( $\_SERVER\[HTTP\_X\_REQUESTED\_WITH\] ){
    die( json\_encode($kisiler) );
}
// ekrana basalim
print "<ul>";
foreach( $kisiler as $kisi ){
    print "<li>$kisi</li>";
}
print "</ul>";

```
Bu kod eğer normal istek yapılırsa
```
<ul><li>Fatih</li><li>Ahmet</li><li>Mehmet</li><li>Zeynep</li></ul>

```
çıktısı; ajax ile istek yapıldığı zaman:
```
\["Fatih","Ahmet","Mehmet","Zeynep"\]
```
çıktısı verecektir.

Bu şekilde gelen çağrılardan ajax olanlarına sadece kisiler dizisini jsona çevirip sayfayı durduruyoruz. Javascript ile gelen json'u kolayca işleyebilirsiniz.

Burada json'a çevirip javascriptde işlemek zorunda değilsiniz. Ajax ile aldıktan sonra içeriği basmak istediğiniz yere uygun html kodu da üretebilirsiniz bu noktada.