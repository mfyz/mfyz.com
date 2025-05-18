---
title: "Web geliştiricileri ve müşterilerin takıntıları - Bölüm 1"
slug: web-gelistiricileri-ve-musterilerin-takintilari-bolum-1
date: 2010-08-06
url: http://mfyz.com/tr/web-gelistiricileri-ve-musterilerin-takintilari-bolum-1/
tags: ["Hayat","iş yönetimi","müşteri","takıntı","validate","validation"]
category: Hayat
migration: {"wpId":253,"wpPostDate":"2010-08-06T21:54:55.000Z"}
lang: tr
---

Freelance çalışmalarımda da, tam zamanlı içinde bulunduğum projelerde de gördüğüm bir detaydan bahsedeceğim.

Ürettiğiniz kodun kalitesini belirleyecek bazı şeyler vardır. Bunlardan birisi de kodun standartlara uygun olmasıdır. Sadece bu kurallara ne kadar bağlısınız veya nerelerde kuralları bilinçli aşıyorsunuz buna biraz değineceğim.

Yazdığınız kodu bir validatior'den geçirdiğinizde karşılacağınız 2 konu vardır. warning'ler ve error'lar. Hataları düzeltmek zorundasınız, bu sizin göreviniz. Fakat daha üretim sürecinde optimizasyonu sokmamak için hangi kuralların dışına çıktığınızı ve ne gibi sonuçlara yol açacağını bilmeniz gerekir. Html için örnek veriyorum img etiketinin alt attribute'unu girmemeniz evet bir hatadır ama tarayıcınızın o arayüzü çizmesini engelleyecek bir faktör değildir.

Benzer konu da css-hack'ler üzerine var. Yani bir arayüzü crossplatform yapmak için türlü türlü css hack'ler javascript ile müdahaleler yaparız fakat bunların dengesini iyi kurmak gerekiyor.

Şimdi size uç bir örnek vereceğim. Buradaki takıntılara sahipseniz işiniz zor, bunlardan kurtulmaya çalışın. Aynısının müşteri modeli de vardır.

Bir kod hazırladınız ve "bitti" diyerek müşterinizin karşısına çıktınız. Kodunuzun validation'una dikkat ettiniz veya etmediniz. Müşteriniz bu konuya o kadar dikkat ediyor ki size hemen xhtml, css ve website optimizer'lardan fln aldığı çıktıları atıyor. Bütün hataları gideriyorsunuz. Hatta ie uyumluluğu için yazdığınız css hack'leri parçalayıp validaiton'a takılmayacak şekle getiriyorsunuz. Belki bunun için css ayarlamalarını javascript, jquery gibi bir yöntemle yapmaya başlıyorsunuz. imajlarınızı optimize ediyor ve css sprite'lar yapıyorsunuz.

Fakat daha fazla detayda optimizasyon isteyen müşterileriniz olacaktır. Bu detayların yaptığınız projenin teknik detaylarına göre bazılarının yapılabilir bazılarının yapılamaz olduğunu açıklama çalışın.

Benzer şekilde bu aşamaları müşterinizle en başta konuşmak da iyi bir başlangıç olabilir. Hatta bu konuyu proje zamanlamanıza (takviminize) ve bütçenize de yansıtmalısınız.