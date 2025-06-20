---
title: "Baya Ucuz Sanal Sunucu Sağlayıcı: Scaleway"
description: "Kişisel web sitelerini barındırmak için Digital Ocean'da yaşanan performans sorunları ve daha ucuz bir alternatif olan ARM tabanlı Scaleway sanal sunucu sağlayıcısına geçiş deneyimi."
slug: baya-ucuz-sanal-sunucu-saglayici-scaleway
date: 2017-09-15
url: http://mfyz.com/tr/?p=1187
tags: ["scaleway", "vps", "sanal sunucu", "hosting", "digital ocean", "arm mimarisi"]
category: OS
migration: {"wpId":1187,"wpPostDate":"2017-09-15T04:55:08.000Z"}
lang: tr
---

![](/images/archive/tr/2017/09/C9sskUYW0AA6hPj-278x300.jpg)

Bir süredir [mfyz.com](http://mfyz.com) ve birkaç kişisel sitemi host ettiğim Digital Ocean sunucumla ilgili performans problemleri yaşıyordum. Digital Ocean'da 2 vCpu ve 2gb ram'li bir sanal sunucu kullanıyorum ve bana masrafı aylık $10 idi. Bunun dışında aylık $3'a da 30gb ekstra disk alanı satın alıyorum. Açıkçası, aylık $13, bir kisisel sunucu barındırmak için gerçekten çok ucuz. Bu sunucu, birkaç kisisel siteyi host etmek dışında ufak tefek yazılım deneyimi yapabildiğim, arada sırada proxy ve vpn amacı ile de kullandığım bir kaynak oldu yıllardır benim için.

Bu basit sunucu üstüne kurduğum New Relic, Datadog, Pingdom gibi monitör servisleriyle, kisisel olarak kullandığım bir Slack hesabına bağlayarak raporlar aldığım ufak bir kurlumum var. Bir süredir işlemci kullanımı ve hafıza kullanımı konusunda uyarılar almaya başladım. Çoğunluğu, eşimin kişisel bloglarına gelen trafiğin yükselmesinden kaynaklanıyor ama trafik değişimine baktığımda, ufak da olsa sahip olduğum sunucu gücüne göre bu problemleri yaşamamam gerektiğini düşünüyorum. En azından arada servis duraksamasına yol açacak bir neden bulamıyorum.

#### Yeni ucuz'un ucuzu servisler

Geçtiğimiz birkaç haftadır, ucuz, ssd'li kişisel sunucu arayışına girdim tekrar. Biraz araştırma sonunda yeni birçok şirketin Digital Ocean gibi ucuz seviyelerde sunmaya başladığını farkettim. Bunların içinde Amazon Web Servisleri gibi büyük şirketler de, ufak girişimler de var. Aralarında Scaleway adında, Fransız bir girişim dikkatimi çekti. Scaleway bütün donanım ağını Raspberry Pi gibi ARM tabanlı işlemci mimarisi üzerine kurulu, ufak sunucu donanımları üstüne kuruyor ve hem ilk kurulum, hem de bakım maliyetini oldukça düşürmüş oluyor. Her ne kadar ARM tabanlı donanım ile sunucu barındırma'ya yabancı olsam da, fikir ilgimi çekti. Ayrıca aylık harcadığım tutara, elimdeki sunucudan 4-5 kat daha güçlü bir sunucu barındırabiliyorum. Scaleway kesinlikle aylık $5'a SSD'li VPS marketinde iddiali bir oyuncu. En azından fiyat bakımından.

Kafamda kalan ana soru işareti şu oldu: “bu ufak yerli girişim ne kadar tutarlı ve güvenilir?”. Doğal olarak ortada, ufak bir girişime güvenme gibi bir risk var, ancak yıllardır bir sunucuyu ayağa kaldırma ve sunucular arasında taşınma işinde pratikleştiğim için benim için bu risk, ufak bir risk idi.

2,5 hafta önce bu riski göze alıp Digital Ocean'daki sunucumu Scaleway'de yeniden oluşturup kurulumu tamamladım birkaç saatte. İlk kurduğum sunucu, Digital Ocean'da kullandığımın 2 katu güçte ve daha önce ödediğimin yarısı masrafta bana. 2,5 haftadır herhangi bir problem veya performans tıkanıklığı yaşamadım Scaleway ile.

Scaleway sunucu mimari türleri, fiyatlarını, şu adresten görebilirsiniz: [https://www.scaleway.com/pricing/](https://www.scaleway.com/pricing/)