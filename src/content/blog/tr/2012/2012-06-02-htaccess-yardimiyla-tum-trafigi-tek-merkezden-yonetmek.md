---
title: "htaccess yardımıyla tüm trafiği tek merkezden yönetmek"
slug: htaccess-yardimiyla-tum-trafigi-tek-merkezden-yonetmek
date: 2012-06-02
url: http://mfyz.com/tr/htaccess-yardimiyla-tum-trafigi-tek-merkezden-yonetmek/
tags: ["apache","htaccess","mod_rewrite","route","router","Sunucu Programlama"]
category: Sunucu Programlama
migration: {"wpId":163,"wpPostDate":"2012-06-02T00:23:54.000Z"}
lang: tr
---

URL şemaları, SEO amacıyla önem taşımakta. Bunun yanı sıra, her geliştirici ürettiği uygulamanın URL şemasının anlaşılır ve güzel görünmesinı ister. Eğer bir framework kullanıyorsanız muhtemelen bunu yönetebileceğiniz bir yer, yardımcı vs vardır. Fakat kendi kodunuzu yazıyorsanız htaccess ile mod\_rewrite yardımıyla her url şema tipine göre bir rewrite kuralı yazmanız gerekecektir. Basit bir proje örneği vereceğim, diyelim ki basit bir ürün katalogu hazırlıyorsunuz, katalog anasayfasında son ürünler ve kategoriler listeleniyor. Her her ürün de bir kategoride listeleniyor. Yani kategori sayfaları ve ürün detay sayfalarınız var. Basit bir php projesi ile bu uygulamayı 3 parçaya ayırdınız, anasayfa, kategori ve ürün detay. Her parçanın kendine ait kodu var. Normalde bu parçaları birer php dosyası olarak hazırladığınızı düşünürsek her parçayı birbirine

*   anasayfa.php
*   kategori.php?kategori\_id=21
*   urun\_detay.php?urun\_id=2320

gibi linklerle bağlıyorsunuz. URL şemasını su şekilde kurgulamak istediğinizi düşünelim:

*   /
*   /kategori/21
*   /urun/2320

Bunun için klasik yöntemlere göre htaccess dosyanıza her link şeması için bir kural yazıp gerekli yönlendirmeyi yapmanız gerekir. Fakat her kural için düzenli ifade (regex) yazmak hem yorucu olabilir hem de her yeni url şeması için yeni regex hazırlamanız ve htaccess dosyanızı güncellemek durumunda kalırsınız. Eğer url şemalarınız belirli bir mantığa göre hazırlıyorsanız -ki MVC frameworkleri genelde buna benzer kurallara sahiptir- bu kuralı algoritmaya çevirmeniz çok kolay. Mesela Codeigniter kullanarak hazırladığınız aynı yapı için, anasayfa, kategori ve ürün detayı için ayrı controller ve ayrı view'lar yazmak durumunda olacaksınız. Gerçekten de olması gereken bu zaten. Ama controller'ı yazarken size bazı kurallar koyar Codeigniter. Verdiğiniz sınıf adı ve method'a URL üstünden doğrudan ulaşabilirsiniz eğer methodunuz public bir method ise. Atıyorum ürün detay controller'ının adını Urun koydunuz ve method adını da detay koydunuz. Bu methodu tetiklemek (ulasmak) için kullanacağınız url: /Urun/Detay/ekstra/parametreler şeklinde olabilir. Methodunuz içinde ekstra parametreleri yakalayabilirsiniz. Kendiniz yazarak hazırlayacağınız kod ıle url şeması böyle ikili bir kurala sahip olmak zorunda değil. Tekil bir tanımlayıcı yeterli olacaktır, ama daha karışık bir mekanizma kurarak siz de çoğul (ikili veya üçlü) bir adresleme mekanizması oluşturabilirsiniz. Tekil bir adresleme için kurallı bir mekanizma olarak şöyle bir algoritmanız olabilir: /Urun/3452/yazci-uyumlu-versiyon şeklindeki bir url'i, ilk parça controller adı, geri kalanlar da hem opsiyonel hem de controller tarafından yakalanıp işlenecek olan veri olarak düşünürseniz, ilk parçada gelen adda controller'a sahip olup olmadığınızı kontrol edebilirsiniz. Bunun için bütün controller'larınızı "Controllers" gibi bir dizinde toplu tutmanızda fayda var. Çok ilkel bir mekanizmayla controller'larınızın sınıf değil, düz php dosyaları olduklarını varsayıyorum ve böyle bir url çağırıldığında tek bir dosyadan gerekli controller'i tespit edip include ederek calıştırdığınızı düşünelim.

#### Peki bu url'ler nasıl tek merkezden geçecek?

Şimdi size önce anlatmam gereken kısma geldik, bütün trafiği tek dosyaya yönlendirmek. İşte bunun için htaccess'a oldukça genel bir kod koyuyoruz:
```
RewriteCond %{REQUEST\_FILENAME} !-f
RewriteCond %{REQUEST\_FILENAME} !-d
RewriteRule ^(.\*)$ index.php?path=$1 \[L,QSA\]

```
Yukarıdaki kod sitenize gelen tüm istekleri index.php dosyasına yönlendirir. Örnek olarak: http://example.com/ http://example.com/kategori/123 http://example.com/urun/8765 gibi istekleri index.php?path=/kategori/123 şeklinde tek parametre olarak index.php dosyasına iletilecektir. Ama yukaridaki kod teknik olarak eğer url'de geçerli bir dizin adresi veya dosya adresi yoksa istekleri index.php'ye yönlendirecektir. Yani "kategori" adında bir dizininiz varsa istek index.php'ye gitmez. Bunda da bir detay daha var. Eğer "kategori" adında bir dizininiz var ve url /kategori/sdjfhsdkfjshd ise bu URL'de aranan dosya orada olmadığı için istek yine index.php dosyasına aktarılır. Burada ilk problemin çözümü için, controller adlarınız projenizin kök dizininde varolmayan bir klasör adı olmalıdır. İkinci problem ise, siz kullanmıyor olsanız bile herhangi bir dizin içinde bulunamayan istek index.php dosyasına yönlenecek ve siz bunu kontrol etmek zorunda kalırsınız. Olmayan dosyalara yapılan istekler web'in doğasında olan bir şeydir. En basit örneği, sitenizi tarayan botlar (google bot etc...) sitenize robots.txt, favicon.ico, sitemap.xml veya crossdomain.xml gibi sorgular yapacaktır. Olmadığı için 404 hatası almaları gerekir yaptıkları şeyi doğru yapmak için. Bunun yanı sıra siz de bu gereksiz istekleri işlemenize gerek kalmazsınız. Bunun için, yani ikinci problemi çözmek için, projenizin asset dizinlerini (stiller, js, resimler, imges, files etc...) bu url ayrıştırma mekanizmasından ayırmak isteyebilirsiniz. Aşağıdaki satırları yukaridaki kodun üstüne yerleştirmeniz yeterli.
```
RewriteCond %{REQUEST\_URI}  !^/resimler.\* \[NC\]
RewriteCond %{REQUEST\_URI}  !^/proje.\* \[NC\]

```
Böylece bu dizinler ve altındaki isteklere dokunulmayacaktır. Ama yine de kök dizindeki her spesifik isteği ya htaccess'da ya da index.php dosyanızda işlemeniz gerekmektedir.

#### index.php istekleri nasıl ayrıştıracak?

Artık sitenize gelen tüm istekler index.php'nin elinin altında. "path" parametresini "/" karakterine göre parçalayarak ilk parçayı controller adı olarak rezerve edebilirsiniz. Dizinin geri kalan elemanlarını global bir dizide tutarak controller'larinizin içinde yakalayabilirsiniz. Unutmayın hala $\_GET dizisiyle soru işareti ve sonrasında kullanacağınız GET parametrelerini yakalayabilirsiniz. Yani /urun/67845?ref=facebook\_campaign gibi bir url hala doğru şekilde calışacaktır. Çok ilkel bir yapıda controller adını "Controllers" dizininde öyle bir dosya olup olmadığını kontrol ederek ve eğer dosya varsa o an include ederek basit bir yapı kurabilirsiniz.

#### Size biraz daha farklı bir yapı sunacağım şimdi

mfyz.com'un kodu çok eski sürümlerde Türkçe idi, sonrasında ilkel bir modüler yapıya evrimleşti, sonrasında dil değiştirdi, sonrasında ilkel bir MVC modeline evrimleşti, ve şu an oldukça gelişmiş bir MVC modeline sahip. Kod 95% İngilizce, çünkü hala Türkçe yazılmış ve refactor edilmeyi bekleyen eski kodlar duruyor hala derinlerde :) Neyse, bu örneği çoklu dile sahip bir projede çalışma ihtimali için veriyorum. Kod, controller'lar ve method adlarınız hep ingilizce (veya başka bir dilde) olmak zorunda olabilir veya ölyle olmasını isteyebilirsiniz. Böyle bir durumda Türkçe bir domain altında yoresel-organik-sabun.com/product/detail/1231231 gibi bir url şemasından çok yoresel-organik-sabun.com/urun/1231231 gibi bir URL tercih edersiniz değil mi? Şimdi bunun için kuralsal bir yaklaşımdan çok bir yol haritasının yolu gösterdiği bir mekanizmayı anlatacağım. Bu mekanizmanin bir diğer avantajı da aynı controller ve method'lara birden fazla farklı url şemaları oluşturabilmenizdir. Yani örneğin bir iletişim formuna sahipsiniz ve example.com/contact ve example.com/callus gibi iki url hatta aynı zamanda example.com/iletisim gibi farklı dildeki adresleri oluşturabilirsiniz. Sonra otomatik dil değişimi yapıp yapmamak sizin controller'da yaptığınız hünerli kodlara kalmış. Bir yol haritası oluşturmak aslında bu url şemalarını htaccess'da her şema için ayrı ayrı kural yazmaya benziyor, ama çok daha dinamik olabilir ve düzenli ifade yerine basit dizilerde tutulabilir. İlkel bir yol haritası dizisi yazacağım yukaridaki örnek proje için.
```
$router = array(
  'kategori' => array('controller'=>'kategori', 'method'=>'index'),
  'ürün' => array('controller'=>'ürün', 'method'=>'detail'),
  'urundetay' => array('controller'=>'ürün', 'method'=>'detail'),
)

```
Gördüğünüz gibi ürün için iki farklı adresleme kullanabilirsiniz. Daha dinamik bir yol haritasını veritabanınızda saklayabilir hatta otomatik güncelleyebilirsiniz. Bunun en güzel örneği kullanıcı adı ile adresleme yapabilmektir. Yani example.com/mfyz ve example.com/mfyz/links gibi kullanıcınıza domain.com/kullanici\_adi gibi bir sayfa adresleyebilmenizdir. Gelen isteğinizi, sitenizin ana yol haritası kontrollerinizi yaptıktan sonra, eğer istekte bulunulan adres yol haritanızda bir yeri işaret etmiyorsa kullanıcı dizininizde aratarak adresin bir kullanıcı profili veya kullanıcı sayfasını işaret ettiğini yakalatabilirsiniz.