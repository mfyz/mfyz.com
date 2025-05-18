---
title: "PHP'de Pratikçe Sorgu Cümlesi Oluşturmak"
slug: phpde-pratikce-sorgu-cumlesi-olusturmak
date: 2009-08-25
url: http://mfyz.com/tr/phpde-pratikce-sorgu-cumlesi-olusturmak/
tags: ["injection","php","pratik","query","sql"]
category: PHP
migration: {"wpId":146,"wpPostDate":"2009-08-25T18:25:53.000Z"}
lang: tr
---

Daha önce SQL injection ve MDB2 hakkında birşeyler [yazmıştım](https://tr.mfyz.com/mdb2-kullanimi-ve-sql-injection).

Bu döküman birkaç konuda size yardımcı olacak, pratikleştirecek sorunlar :

*   Çok alan (4-5+) kullanırken sorgu cümlesi oluşturmak zor
*   Gözden kaçırıp alanları kontrol etmek bazen mümkün olmuyor.
*   Yukarıdaki 2 maddeyi yapmak için satırlarca duplicate kod yazmak gerekebiliyor

Kısaca 3-4 adımda kocaman bir sorgu cümlesini oluşturacağız. Genel olarak bu dökümandaki sorun insert ve update türü sorgularda çıkan kargaşayı kolaylaştıracaktır. Zira select sorguları hem çok veri içermiyor hem de özel cümleler olabiliyor.

Bu methodolojide doğal olarak bir otomatizasyon var. Bunun için verinin düzenli olması gerekiyor. Bu noktada genelde bir dizi içinde verilerin tutulduğunu düşünelim.

```
$data = array(
'ref_code' => $_GET[ref],
'phone'    => $_GET[tel],
'text'     => $_GET[yorum],
'date'     => date('Y-m-d H:i:s'),
'ip'       => $_SERVER[REMOTE_ADDR]
);

```

Verinin anahtarları veritabanındaki alan adları ile aynı olmalı. Zaten bu veri dizisini oluştururken gerekli sql injection kontrolleri yapılıp kolayca kurtulabilinir fakat her değerde bir ton fonksiyon çağırmaya gerek yok. Kısaca :

```
$data = array_map('mysql_real_escape_string', $data);
```

kullanımıyla tüm diziye mysql_real_escape_string() uygulayabiliriz.

Sonra zaten cümleyi oluşturmak için genel method olan sprintf ile alanları ve değerleri basacağız. Ancak işin güzelliği burada bu alanlar ve değerler kısımlarını bir sürü döngü ile çözmeyeceğiz.

```
$sql = sprintf('INSERT INTO comments (%s) VALUES ("%s")',
implode(", ", array_keys($data)),
implode('", "', array_values($data))
);
```

Gördüğünüz gibi array_keys ve array_values ile hızlıca alanlar ve değerleri alıp implode ile aralarına virgül ve tırnak ekleyebiliriz. Burada dikkat edeceğimiz şey implode sadece değerlerin aralarına tırnak ve virgül ekleyecektir. En dışda kalan tırnakları sprintf içinde tanımlayacağız.

Sonuç olarak bu noktada $sql değişkeninde, değerler ve alanlar giydirilmiş, aşağıdaki gibi bir sql cümlesi elde etmiş olacağız.

```
INSERT INTO comments (ref_code, phone, text, date, ip) VALUES ("google", "1234567", "aisdfyisodaf qewrewrewqr 232fsfdsd", "2009-08-25 16:08:34", "127.0.0.1")
```

Bu cümleyi de mysql_query($sql) ile çalıştırıp sonucu işlemede bitiyor olay.