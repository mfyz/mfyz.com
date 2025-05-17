---
title: "Bulut'da çalışan mobil simulatörler nerede kaldı?"
slug: bulutda-calisan-mobil-simulatorler-nerede-kaldi
date: 2017-04-04
url: http://mfyz.com/tr/bulutda-calisan-mobil-simulatorler-nerede-kaldi/
tags: ["bulut","Diğer","mobil","simulator","vpn"]
category: Diğer
migration: {"wpId":371,"wpPostDate":"2017-04-04T04:08:36.000Z"}
lang: tr
---

Bir süredir radikal bir değişiklikle, iPad Pro'yu ana çalışma ortamım olarak kullandım. Günlük işimin bir parçası olarak, geliştirdiğimiz mobil uygulamalarda, hem varolan hem de yeni geliştirilen özellikleri test ettim. Düzenli olarak uygulama kurup, silip, garip çevre koşullarını simule ettim. Bu koşulları, gerçek cihazlarla kurgulamak kolay ancak iş Android'de test etmeye geldiğinde, Android dünyasındaki hem donanım hem de yazılımdaki çeşitlilikden dolayı çok kolay olmuyor. Kendimi kolayca 5-6 cihazı kullanarak test yaptığımda buluyorum. ![](/images/archive/tr/2017/04/batstand.jpg) Bazen buna benzer görüntülere yaklaşıyorum :) Gerçek cihazlarda test etmek yerine, bunu bulut'da yapabileceğim servisleri araştırmaya koyuldum gecen ay. Aradığım şey basit bir sanallaştırma veya gerçek cihaz test çalıştırabilen servislerin yaptığı şeyi uzaktan masaüstü gibi bir modelde yapan bir servis oldu. Şaşırtıcı bir şekilde bunu doğru ve profesyonel yapan bir servis bulamadım. Neden bunu sağlayan bir servis yok merak ediyorum. Sadece test amacı için değil, gerçekten bir kullanıcı olarak telefonuma, başka bir işletim sistemi veya donanıma sahip cihazda çalışan bir uygulamayı kullanıp test edebilmeliyim. Mesela yeni bir Androıd uygulamasını iPhone'a stream edip deneyebilmeliyim. Şu servisleri denedim ve bu servisler hakkındaki birkaç notum;

*   AWS Device Farm - tarayıcı deneyimleri kesinlikle zayıf, çok duraksama oluyor ekran'la oynadığımda. Bir de bir cihazı hazırlayıp açması 4-5 dakika sürüyor (neden?). Zaten cihaz açmaya çalıştığımda, yarısı başarısız olup açılamıyor...
*   appetize.io - şu ana kadarki denediğim servisler içinde en iyisi, tarayıcı deneyimleri gayet başarılı, hatta mobil tarayıcılarda da çoğunlukla güzel çalışıyor ama destekledikleri cihaz sayısı çok sınırlı ve gerçek cihaz seçenekleri sadece tek tür donanım destekliyorç
*   Genymotion cloud - kapalı beta programda oldukları için deneyemedim ama masaüstü sanallaştırmaları gayet başarılı.
*   Bir diğer seçenek de, sıfırdan özel kurulum yapıp VPN veya RDP sunucuları kurmak olabilir mobil cihazlara ama jailbreak veya root etmek gerekir iOS veya Android işletim sistemini ki ideal bir senaryo değil

Umarım yakın gelecekte daha güçlü servisler bu işi çok daha kullanışlı hale getirirler bugün filimleri ve dizileri yayın akışı şeklinde izleyebildiğimiz gibi...