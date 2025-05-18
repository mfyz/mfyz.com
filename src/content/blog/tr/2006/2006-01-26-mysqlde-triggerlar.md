---
title: "MySQL'de Triggerlar"
slug: mysqlde-triggerlar
date: 2006-01-26
url: http://mfyz.com/tr/mysqlde-triggerlar/
tags: ["PHP","triggers"]
category: PHP
migration: {"wpId":83,"wpPostDate":"2006-01-26T05:31:15.000Z"}
lang: tr
---

#### Triggerlar ne işe yarar ?

Bir veritabanına veri girmeden önce veya girdikten sonra güncelleme yaptıktan sonra yanı sorgularla anlatmak gerekirse INSERT, UPDATE, DELETE, BEFORE, AFTER gibi deyimleri kullanabiliyoruz.

Şimdi olayı bir de örnek üzerinden inceleyelim :
```
CREATE TABLE diger(witkey varchar(50)); CREATE TABLE test(veri varchar(50));
/\* asil ornek asagida basliyor. Yukarıdaki örnek tablo olusturmak icin. \*/
DELIMETER | CREATE TRIGGER \`test\_bx\` AFTER INSERT on test FOR EACH ROW BEGIN INSERT INTO diger SET witkey = new.veri; END; |

```
Şimdi yukarıdaki işlemleri inceleyelim:

İlk satırımızda Diger adında bir tablo oluşturduk ve içerisinde varchar türünde witkey adında bir column yerleştirdik. İkinci satırımızda test adında bir tablo oluşturduk ve içerisine gene varchar türünde veri adında bir column yerleştirdik. Ardından Syntax Problemleri olmaması ıcın Diger sorgumuzu delimeter tanımlayarak bunların içerisinde yazdık. CREATE TRIGGER ile trigger'imizi oluşturduk ardından veritabanımızın adını yazdıktan sonra \`veritabaniadi\`+\`\_\`+\`kısaltmamız\` şeklinde yazdıktan sonra AFTER INSERT yani INSERT yapıldıktan sonra tabi bu nerede ? on test, test adlı beritabanı üzerinde ardından FOR EACH ROW BEGIN diyerek bunun ıcerısınde gerekli şartımız sağlandıktan sonra olacak işlemin neler yapmasını istiyorsak onları yazacağız.

INSERT INTO seklınde o gelen verinin aynısını diger tablosunda witkey column içerisine yazdıracagız. Bunun için SET witkey = new.veri; ile işlemimizi bitiriyoruz. burada witkey = veri\`ye yeni girilen degeri yazdırıyoruz.

END; ile de Şartımızın sonuclanması dogrultusunda yaptıgımız işlemi sonlandırıyoruz ve DELIMETERi de kapatıyoruz. Artık herhangi bir şekilde test adlı tablodaki veri column'una girdigimiz veri otomatik olarak witkey column'una da geçicektir.

Unutmadan, Bu işlemler sadece 5.0.2 sürüm ve üzerinde çalışıyor.

**Hazırlayan :** Onur Yerlikaya