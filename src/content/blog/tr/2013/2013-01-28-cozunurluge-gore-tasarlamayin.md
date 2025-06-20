---
title: "Çözünürlüğe göre tasarlamayın"
description: "Farklı ekran çözünürlükleri ve yüksek PPI (Retina) ekranlar için tasarım yaparken çözünürlük bağımsız yaklaşımların önemi. Akışkan arayüzler, SVG, Canvas ve ikon fontları gibi teknikler ele alınıyor."
slug: cozunurluge-gore-tasarlamayin
date: 2013-01-28
url: http://mfyz.com/tr/cozunurluge-gore-tasarlamayin/
tags: ["çözünürlük bağımsız tasarım", "responsive design", "retina", "ppi", "svg", "canvas", "ikon fontları"]
category: Diğer
migration: {"wpId":332,"wpPostDate":"2013-01-28T06:00:00.000Z"}
lang: tr
---

![](/images/archive/tr/2013/01/bitmpap-vector.jpg) Geçtiğimiz hafta, iOS geliştiricilerimizden biri, varolan iPhone uygulamamızı iPad'e sadece birkaç ayarla oynadıktna sonra derleyerek çalışır hale getirdi, sonuç tabi ki götü başı dağılmış bir uygulama, ama fonksiyonel. Tabi ki iPhone ve iPad arasında deneyim tasarımı farklılıkları var fakat teknik olarak çok küçük problemler var. Uygulamanın uyumsuzluğunun 95%'i sadece görsel problemler ve bu problemler tasarımın özellikle iPhone ekran çözünürlüğüne göre yapılmış olmasında.

Mobil uygulamalar çok iyi örnekler değiller bu yazı için çünkü uygulamanın çalışacağı cihazlar belirli ve çözünürlükleri belirli, yazılan uygulamalar da çalışacakları cihazlara oldukça bağlılar.

Web'de ise durum biraz daha farklı, cihazları veya ekran çözünürlüklerini kontrol edemezsiniz, ayrıca web uyuglamalardan daha universal bir içerik türü, çok farklı cihazlar tarafından okunabilen çok daha geniş bir kitleye hitap edebildiginiz bir içerik dağıtım türü. Bu yazıda size bu farklılıkların bazı çıkış noktaları anlatacağım ve farklı bir arayüz geliştirme yaklaşımdan bahsedeceğim.

Az önce mobil uygulamalar bu problemin açık şekilde görüleceği ortamlar olmayabilir demiştim fakat Android işletim sistemi üsütnde çalışan uygulamalar bu yazıya daha yakın örnekler olabilirler çünkü piyasadaki farklı ekran çözünürlüğüne sahip cihaz sayısı oldukça yüksek, dolayısıyla web örneğine daha yakınlar.

Farklı çözünürlüklere sahip kullanıcı kitlesine üretilen klasik bir tasarım senaryosunda, kullanıcı analitikleri analizi yapılıp en çok kullanılan ekran çözünürlüğü belirlenir. Vazgeçilebilecek ekran çüzünürlüklerinden kurtulduktan sonra kabul edilebilecek minimum ve maksimum ekran çözünürlüğü tanımlandıktan sonra buna göre bir tasarım çalışması yapmak genel yaklaşımdır. Kullanıcı deneyimi tasarlandıktan sonra arayüz tasarımı yapılır ve arayüz tasarımı bittikten sonra tasarlanan asset'ler (resimler, ikonlar, butonlar, arka plan grafikleri vs) çoğu zaman arayüz geliştiricisinin ekran çözünürlüğünde test edilir ve az sonra belirteceğim deneyler yapılmaz.

#### Akışkan arayüzler

Web, kendi doğasında tarayıcıda bir metin içeriği göstermek aslında, eğer hiç birşey yapmadan bir metini html dökümanına kopyalarsanız tarayıcıda metini ekrana yayılacak şekilde göreceksiniz. Genel bir tasarım yaklaşımı olarak, metin de olsa sayfa uzunluğunu kontrol altında tutabildiğimiz için sabit genişlikte bir çerçeve içinde içeriğimizi göstermeyi tercih ediyoruz. Aslında bu çözünürlüğe göre tasarım yapmanın çıkış noktası. Çünkü arayüzün genişliğini de en çok kullanılan çözünürlüğe göre belirleyip tasarım yapıyoruz. Ama çoğu zaman, sayfanızı ne kadar basit tutarsanız o kadar uyumlu olursunuz kısmını kaçırıyoruz geliştirirken.

Çözünürlük bağımsız olmanın en kolay yolu sabit genişlikte sayfalar yerine akışkan, yani içeriğin tarayıcının genişliğine yayıldığı arayüzler tasarlayarak yapmak. Yaygınlaşan bir yaklaşım olarak; belirli bir çözünürlük üstünde sabit genişlik, o çözünürlükten ufak çözünürlüklerde ise akışkan arayüze dönüşen sayfalar tasarlamak. Bunun tekniklerini burada başka yazıda değineceğim fakat herhalde en uygun çözüm bu. (google keyord: responsive layout)

Çünkü akışkan arayüze karşı görsel olarak üretebilinecek en karşıt tez, içeriğin çok büyük genişliklerde kötü görünmesi, tasarımı bozması veya gereksiz boşluklar oluşturması olabilir. Bunun için yüksek çözünürlüklerde içeriğinizi sabit genişlikte bir arayüzde sunabilir ve ufak çözünürlüklerde akışkan hale getirebilirsiniz.

Yine de çözünürlük bağımsız olmanın kuralı akışkan arayüzlere dönüş diyebiliriz.

#### Retina (yüksek PPI) ekranlar

![](/images/archive/tr/2013/01/ppi.jpg)

PPI, pixel per inch anlamına gelen bir kavram ve bir inç kare alandaki piksel sayısını ifade ediyor ve bu sayının yüksek olması her pikselin gözle daha az fark edilebilir yani, daha detaylı bir çizimin daha ufak bir alanda yapılması anlamına geliyor ekranda. Dolayısıyla bir yazıyı veya bir grafiği çizdirirken gözümüzle hatalarını daha zor yakalayabildiğimiz ve daha mükemmel yuvarlaklar, daha mükemmel kıvrımları çizmesi anlamına geliyor. Retina ekranların kalitesini burada detaylandırmayacağım, sadece retina ekranların çözünürlük değerlerini her geçen gün katladığını söylemem yeterli. Yani aynı görünür alanda daha yüksek çözünürlük sunarak web sitenizi aslında zoom'layarak gösteriyorlar. Dolayısıyla bu ekranlara uyumlu olmayan grafikler gözle farkedilebilecek şekilde seçilebiliyorlar.

Bu cihazlardaki arayüz materyalleri (artalanlar, ikonlar vs) @2x yani 2 kat büyütülmüş bir şekilde sunulduğu takdirde iOS uygulamalarında retina yanı daha yüksek kalitedeki versiyonları gösteriyor. Web için de bu tekniği uygulayabilirsiniz, bu konuda bir çok jQuery kütüphanesi veya css tekniği var. Fakat problem @2x olması değil, ve PPI artık eskiden yapılan CPU yarışına döndü, her geçen gün ekran üretici şirketler yeni ekran teknolojileri deniyor ve çok daha yüksek çözünürlükleri sunuyor. Yani yarın @3x veya @5x veya @10x olacak, ne zaman bilmiyoruz ama olacak. Ayrıca her ekran çözünürlüğü veya PPI değer grupları için ayrı assetler tutmak hem büyük bir iş hem de yönetmesi zor bir şey.

#### Yakınlaştırılabilir web

Hazırladığınız bir arayüz ne kadar basit olursa olsun, eğer sadece text içerik değilse bazı resimler, çizimler, kullanacaksınız. Sayfanız yakınlaştırılacaklar, istemeseniz de bu, her geçen gün daha erişilebilir ve daha çok kullanılan bir özellik. Ufak ekranlı akıllı mobil cihazda sayfanız yüklendiğinde kullanıcınız sayfayı yakınlaştırarak okumayı tercih edecektir. Bu noktada fontlarınız doğal olarak çözünürlük bağımsız olacaklar fakat kullandığınız tüm görsel elementler çözünürlük bağımlı oldukları için kalitesiz görünecekler. Teknik olarak bu yakınlaştırmanın ölçüsünü bilemezsiniz.

Bu durum sadece bir mobil cihazda senaryosuyla sınırlı olmayabilir. Web sayfanız bir sunumda düşük çözünürlüklü bir projektorde açılan bir web sayfası olabilir ve sunumu yapan kişi çözümü sayfanızı yakınlaştırmakta bulacaktır. Masaüstü tarayıcılarında CMD ve "+" kısayolunu kullanarak veya menüden metin boyutunu yükseltecek veya tam tersi ufaltacaktır (pc'lerde kontrol tuşu ile yapılıyor). Bu olduğunda da sonuç aynı olacak, metinler düzgün, görsel grafikler pikselleşmiş görünecektir.

Sonuçta söylemeye çalıştığım şey, web doğası gereği çok kontrol altında tutamadığınız bir ortam, yakınlaştırılmasını, "kim öyle kullanır ki" olarak düşünmeyin, sayfanızın görme/okuma engelli/problemli kullanıcılarınız tarafından yakınlaştırılarak okunulacağı, belki ekran okuyucuları ile okunacağını da göz önünde bulundurmalısınız. (olmuyor demeyin oluyor: http://mfyz.com/ilginc-bir-geri-bildirim-hikayesi)

#### Bitmap yerine vektör grafikler

Teorik olarak çözüm bitmap görseller yerine vektör veya kurallarla belirlenmiş görsel tasarıma yönelmek. Vektör grafikler, web sayfalarında çeşitli biçimlerde uygulanabiliyor. İki en yaygın kullanımı svg ve canvas. Modern tarayıcıların hepsi svg ve canvas desteklerini her geçen gün detaylandırıyorlar.

Ayrıca basit renk geçişleri, basit kutu ve metin gölgeleri gibi efektleri bitmap grafikler yerine CSS3'e taşıyabilirsiniz. Bu CSS3 özellikleri neredeyse tüm tarayıcılar tarafından desteklenmeye başladı. Hatta eğer hem tasarım yapan hem de arayüz kodlayan bir geliştiriciyseniz tüm arayüz tasarımınızı bu yaklaşımla geliştirebilirsiniz. Şu an CSS3 efektleri ile çok şaşırtıcı şeyler yapılabiliyor. (bazı CSS3 HTML5 deneyler: http://hakim.se/experiments)

SVG: scalable vector graphics anlamına gelen ve kaynak koduna baktığınızda XML olan fakat tarayıcıda veya görüntülendikleri yerde çizdirilen ve aslında web uyumlu vektör grafikler. Eğer profesyonel ikon veya arayüz kitleri kullanıyorsanız bir çoğu SVG türünde de sunuyorlar dosyalarını. Bitmap formatlar (jpeg, png, gif vs...) yerine bu assetleri kullanabilirsiniz. Hatta SVG sadece statik görseller değil hareket eden animasyonlar oluşturmanızı da sağlıyor. Bazı tarayıcılar bunu da destekliyor. SVG dosyaları aynı zamanda boyut olarak bitmaplerden çok cok daha ufak boyutta oluyorlar çoğu zaman. Birçok vektör grafik uygulaması (adobe illustrator vs) varolan vektör grafiklerinizi svg olarak doğrudan kaydetmenizi de sağlıyorlar.

Canvas grafikler de SVG'ye çok benziyorlar. Tarayıcıda çizdiriliyor ve ekrana vektörler olarak kalıyorlar. Dolayısıyla yeniden boyutlandıklarında kalitelerini koruyorlar. Daha çok javascript ile oluşturulan canvas görseller genellikle animasyonlarda da kullanılıyor. 3 boyutlu çizime de olanak sağlayan canvas daha fazla kodlama bilgisi gerektiriyor. [Buradan]("http://net.tutsplus.com/articles/web-roundups/21-ridiculously-impressive-html5-canvas-experiments/") ve [şuradan]("http://www.canvasdemos.com/top-100/") örnekleri inceleyebilirsiniz. Canvas ile yazılmış bir çok oyun da görebilirsiniz.

#### Web font olarak ikonlar

CSS ikonlar son bir yılda yaygınlaşan kullanım oldular. İkon tasarımcıları, piktogram simgeleri font olarak sunmaya başladı. Web font olarak kullanabileceğiniz bir çok ücretsiz ve paralı ikon kütüphanesi bulabilirsiniz. Web fontlar şaşırtıcı bir biçimde (http://mfyz.com/font-face-kullanmak-oldukca-guvenli) birçok tarayıcı tarafından destekleniyor (eskilerinde bile). Dolayısıyla standart bir uygulamada bulacağınız bir çok ikonu bu kütüpahenelerle bulabiliyorsunuz. Fontawesome'a göz atmanızı tavsiye ederim: http://fortawesome.github.com/Font-Awesome/