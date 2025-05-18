---
title: "MySQL'de Procedure Analyse ile optimizasyon analizi"
slug: mysqlde-procedure-analyse-ile-optimizasyon-analizi
date: 2009-09-09
url: http://mfyz.com/tr/mysqlde-procedure-analyse-ile-optimizasyon-analizi/
tags: ["analyse","mysql","optimisation","optimizasyon","procedure","sql","Sunucu Programlama"]
category: Sunucu Programlama
migration: {"wpId":149,"wpPostDate":"2009-09-09T04:40:53.000Z"}
lang: tr
---

MySQL'de büyük veri taşıyacak tablolar ürettiğinizde bazen indeksleri doğru seçemeyebiliyor, alan türlerini iyi belirleyemiyoruz. Gözden kaçan şeyler olabiliyor veya bilmediğimiz alan türleri ile çalışıyor olabiliriz.

Veri boyutu büyüdükçe sistemdeki sorgu süreleri büyüyebiliyor. Hatta bu optimizasyonu iyi yapmazsanız aslında 1 saniyeyi geçmeyecek sorgular için dakikalar harcayabilir, kodunuz zaman aşımına uğrayabilir (timeout).

Optimizasyon konusunda çeşitli teknikler var tabiki. Bu dökümanda basitçe tek sorgu ile mysql'in yapı analizi çıktısı almayı ve oradaki önerileri değerlendirmeyi anlatacağım.

Bir tablonun yapısını öğrenmek için

```
DESCRIBE \`forum\`

```

sql kodunu kullanarak tablo yapısını öğrenebiliriz. Çıktı olarak her alanın adını, türünü, null olup olmadığı, indeks türü gibi değerler döner. Kaç alanınız var ise o kadar satır çıktı alırsınız.

MySQL'deki Procedure Anlayse fonksiyonu ile bu alanların bazı betimsel istatistiklerini ve önerilen türünü öğrenebilirsiniz. Bunun için de

```
SELECT * FROM \`forum\` PROCEDURE ANALYSE ();

```

kodunu çalıştırmanız yeterlidir. Bu kod çıktı olarak kaç tane alanınız var ise o kadar kayıt dönecektir. Bu kayıtlar şu bilgilere sahip olur :

```
Field_name                 Alanın adı
Min_value                  Tablodaki değerler içinde kayıtlı olan minimum değer
Max_value                  Tablodaki değerler içinde kayıtlı olan maksimum değer
Min_length                 Veri boyutu olarak en küçük boyut
Max_length                 Veri boyutu olarak en büyük boyut
Empties_or_zeros           Boş (null) veya 0 değerine sahip satır varsa sayısı
Nulls                      Null yani boş içeriğe sahip satır sayısı
Avg_value_or_avg_length    Aldığı değerlerin ortalaması (nümerik alanlar için)
Std                        Değerlerin standart sapması
Optimal_fieldtype          Burada mysql'in bu alan için size önerdiği veri türü olur 

```

Burada dikkat edeceğiniz şey, alan boyutlarının alt ve üst değerleri. Yani mesela siz varchar(200) lük bir alan ürettiniz. Ve tablonuz verilerle doldu, bu analize bakınca o alan için Min_length 10 Max da 50 diyorsa sizin alan boyutunuzu 70-80 gibi bir boyuta düşürmeniz daha az bellek harcamasını sağlar. Yani 200 olarak düşündüğünüz alan uygulamada, yani gerçekte o boyuta ulaşmamış ve daha ufak kalmış.

Benzer konu nümerik alanlar için de geçerli. Yani sizin teorik/ideal olarak düşündüğünüz veri boyutu bazen büyük gelebilir. Bu noktada alan türü ve boyutunu değiştirerek select gibi sorguları daha hızlı hale getirebilirsiniz.

Index atama konusunda da bu geçerli, eğer select'lerde çok kullandığınız ve where kalıplarına sürekli soktuğunuz bir alanınızın standart sapması ufak ise (yani birbirinden çok farklı değerler almıyorsa - ama tekil ise) o alana bir indeks atayarak sorgu işletim zamanını oldukça kısaltabilirisiniz.

Burada bir güzel şey de, mesela sadece gruplama amacı ile bir alanı varchar(30) yapıp içine "anket", "forum", "dokuman" gibi 3 değer atıyorsunuz. Tabiki projeyi tasarlarken bunun farkında olmazsınız ve "Ya burada her türlü şeyi tanımlarım" diye düşünürken projeye bu üçü dışında başka şey gelmediğini farkettiğinizde bu analiz çıktısında zaten mysql size veri türünü ENUM("anket", "forum", "dokuman") olarak ayarlamanızı önerecektir.

Bu çıktıyı sadece optimizasyon değil, log tuttuğunuz bazı tablolardaki basit istatistiksel çıkarımlarla veri hakkında fikir edinmek için de kullanabilirsiniz. Zira ortalama, standart sapmaya veriyor olması o verinin dağılımı konusunda size oldukça fazla fikir verebilir.