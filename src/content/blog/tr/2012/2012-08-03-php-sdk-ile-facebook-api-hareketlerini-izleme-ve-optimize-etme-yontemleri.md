---
title: "PHP SDK ile Facebook API hareketlerini izleme ve optimize etme yöntemleri"
slug: php-sdk-ile-facebook-api-hareketlerini-izleme-ve-optimize-etme-yontemleri
date: 2012-08-03
description: "Facebook PHP SDK kullanılarak yapılan API çağrılarının nasıl izleneceği ve optimize edileceği anlatılıyor. API çağrı sürelerini ve sayılarını takip ederek performansı artırma ve FQL ile sorgu birleştirme gibi optimizasyon yöntemleri sunuluyor."
url: http://mfyz.com/tr/php-sdk-ile-facebook-api-hareketlerini-izleme-ve-optimize-etme-yontemleri/
tags: ["Facebook API", "PHP SDK", "API Optimizasyonu", "Performans İzleme", "FQL", "Facebook Geliştirme", "PHP", "API Çağrıları"]
category: PHP
migration: {"wpId":312,"wpPostDate":"2012-08-03T03:41:17.000Z"}
lang: tr
---

Eger php tabanlı bir facebook uygulamanız varsa facebook'u sadece kimlik doğrulama dışında kullanıyor olabilirsiniz. Çok basit bir uygulamada bile en azından düzenli yaptığınız facebook api çağrıları vardır. Basit bir örnek ile, kimlik doğrulama sonrası arkadaş listesini ekrana basan ve seçtiğiniz arkadaşınızın doğum tarihini kullanarak bir hesaplama yapan bir uygulamanız var diyelim (mesela: doğum günü takvimi uygulaması). Biliyorsunuz ki arkadaşlarınızın doğum tarihi bilgisini ancak ek bir izin ile sorgulayabilirsiniz. Dolayısıyla kullanıcınız, bir arkadaşını seçtiğinde, seçilen facebook kullanıcısı detaylarını sorgulamadan önce, uygulamanızı kullanan kullanıcıdan o izni alıp almadığınızı kontrol etmeniz gerekir.

Uygulamanızı gerekli kontrolleri yaparak hata vermeyecek şekilde hazırladınız diyelim. Performans problemleri yaşıyorsanız, önce performans probleminizin nereden kaynaklandığını tespit etmeniz gerekir. Gerekli veritabanı ve php kod optimizasyonu yapmanıza rağmen hala performans problemleri yaşıyorsanız problem yüksek ihtimalle sunucunuz ile facebook sunucuları arasındaki iletişimin uzun sürmesidir. Bunun da en büyük kaynağı facebook sdk'sının kaç çağrı yaptığı, bunların toplamda ne kadar zaman aldığı olacaktır ve bu konuda bir fikriniz yok diyelim.

Bu noktada ufak bir değişiklikle sunucunuz ile facebook sunucuları arasındaki trafiği monitöre edebilirsiniz. Bu gözlem, aslında her cağrıda yapmak zorunda olmadığınız ama bilmeden yapıyor olduğunuz veya geçici şekillerde ön bellekte saklayabileceğiniz bilgileri, kontrolleri gösterecektir size.

Şimdi ufak bir değişiklikle trafiği yakalayalım. Bunun için base_facebook.php dosyasında olan api methodunu:

```php
public function api(/* polymorphic */) {
	$args = func_get_args();
	if (is_array($args[0])) {
		return $this->_restserver($args[0]);
	} else {
		return call_user_func_array(array($this, '_graph'), $args);
	}
}

```

aşağıdaki şekilde güncelliyoruz:

```php
$facebookApiCalls = array();
public function api( /* polymorphic */)
{
	$args = func_get_args();

	$time_start = microtime(true);

	if (is_array($args[0])) {
		$result = $this->_restserver($args[0]);
	} else {
		$result = call_user_func_array(array($this, '_graph'), $args);
	}

	$time_end = microtime(true);
	$time_elapsed = $time_end - $time_start;
	$time_elapsed *= 1000; //convert to millisecs

	if (isset($GLOBALS['facebookApiCalls'])) $GLOBALS['facebookApiCalls'][] = array(
		'duration' => $time_elapsed,
		'args' => $args,
	);
	return $result;
}
```

Yukarıdaki kodda yaptığımız değişiklik basitçe api methodu her cağrılışında, facebook sunucularına yapılan http isteğinin ne kadar sürdüğünü ölçüp global bir dizide toplamak. Bu şekilde sayfanızın sonunda ekrana $facebookApiCalls dizisini bir tablo şeklinde veya basitçe var_dump alarak kaç çağrı yapıldığını, yapılan cağrıların her sayfada tekrar edip etmediğini gözlemleyip eğer yapılabiliyorsa ön bellekte veya oturum değişkenlerinde tutularak sorgu tasarrufu yapılıp yapılamayacağına karar verebilirsiniz. Eğer sorgularınız çok zaman alıyorsa sunucu trafiğinizde optimizasyonlara gidebilirsiniz.

Bir çok amatör programcı, sdk methodlarını veya bilindik open graph methodlarını kullanarak sorgu yapıyor ve çoklu işlem yaparken ayrı ayrı sorgu yapıyorlar. Aslında facebook veri yapısını biraz anladıktan sonra FQL yazarak birden fazla sorguyu tek sorguda toplayıp önbellekleyebilir ve bu sayede çok büyük bir optimizasyon sağlayabilirsiniz.

Yukarıdaki doğum günü takvimi örneği için yapılabilecek optimizasyon senaryosu şöyle olabilir: uygulama, "arkadaşların doğum tarihi" iznini her halukarda gerektiriyorsa ilk sayfa açılışında kontrol edilerek kullanıcının bu izni vermesine zorlanabilir, bu sayede her arkadaş seçiminde ayrı ayrı kontrol yapılmak zorunda kalınmaz. İkinci bir optimizasyon, arkadaş listesinin önbelleklenmesi olabilir. Hatta doğum günleri de arkadaş listesiyle sorgulanarak tek oturumda sadece tek istek ile uygulamanızı çalıştırmış olursunuz.

Bu optimizasyonlar sadece uygulama hızı için değil, sunucu trafiğinizi azaltmak için de düşünmeniz gereken optimizasyonlardır.