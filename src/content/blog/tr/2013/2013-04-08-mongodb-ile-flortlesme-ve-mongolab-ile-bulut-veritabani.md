---
title: "MongoDB ile Flörtleşme ve MongoLab ile Bulut Veritabanı"
slug: mongodb-ile-flortlesme-ve-mongolab-ile-bulut-veritabani
date: 2013-04-08
url: http://mfyz.com/tr/mongodb-ile-flortlesme-ve-mongolab-ile-bulut-veritabani/
tags: ["api","cloud","database","db","free","mongo","nosql","service","Sunucu Programlama"]
category: Sunucu Programlama
migration: {"wpId":356,"wpPostDate":"2013-04-08T15:44:21.000Z"}
lang: tr
---

![](/images/archive/tr/2013/04/mongo-db-huge-logo_0.png) NoSQL vertiabanı motorları son yıllarda çok popülerleşti, çünkü yapısız olmalarından dolayı daha kolay mimari değişiklik yapabileceğiniz veri yapıları olduğu için tercih edilmeye başladı. Ölçeklenebilirlik de klasik sql veritabanlarının sınırlı ve geleneksel kaldığı konulardı. NoSQL çıkışı kesinlikle modern bir çözüm olarak görülebilir. İnternette bir çok karşılaştırma, performans analiz yazıları bulabilirsiniz sql ve nosql veritabanları hakkında. Ancak her yere uyan mükemmel bir çözüm yok. Benim gördüğüm kadarıyla, hibrid ve akıllıca kurgulanarak dengelenmiş ve dağıtılmış sistemler en yaygın kullanımlar. Yani bazı şeyleri nosql ile daha zor ve daha çok kodlama zamanı harcayarak yapabilir, bazı şeyleri de sql ile yönetemez ve yapamazsınız. Daha teknik konulara giriyorsanız zaten bu yazıdan daha çoğuna ihtiyacınız var :) Bu yazı daha çok mongo'ya giriş ve flörtleşme dönemi hakkında. Eğer MongoDB'yi denemek istiyorsanız, mongodb sunucusunu bilgisayarınıza yüklemek zorunda değilsiniz. Kurulumu da çok zor değil fakat sadece denemek için sunucu kurulumu konfigurasyonu gibi şeylerle uğraşmak zorunda değilsiniz. Sadece istemci sürücülerini kurmanız yeterli. Bu konu hakkında mongodb dökümantasyonundaki http://docs.mongodb.org/ecosystem/drivers/php/ sayfasını inceleyebilirsiniz. MongoLab adında bağımsız bir servis sayesinde ücretsiz bir mongo veritabanı oluşturabilir ve denemelerinizi onun üstünde yapabilirsiniz. MongoLab veritabanı ve kullanıcınızı oluşturduktan sonra açık erişim izni veriyor. Dolayısıyla php'den veya herhangi diğer bir ortamdan doğrudan erişebiliyorsunuz. Tabi ki servisin amacı mongo denemek isteyen insanlara servis sunmak değil. MongoLab bulut veritabanı servisi. Veri dosyalarının saklanmasını istediğiniz alt servisi (Amazon, Rackspace, Windows Azure vs...), hatta yüzeysel de olsa bölge seçebiliyorsunuz (Amerika veya Avrupa veya uzak doğudaki bir veri merkezi şeklinde). MongoLab 500mblık bir alanı ücretsiz sağlıyor. Diğer sınırlamalarını bilmiyorum fakat ufak projeleriniz için veya deneme yapmak için ideal. Eğer uygulamanız çok veri kullanmaya başlarsa küçük, büyük paketleri veya kurumsal hizmetlerinden faydalanabilirsiniz. MongoLab ile tamamen php mongo eklentisi bağımlılığından da kurtularak doğrudan servisin basit REST apisini kullanabilir ve tek başına çalışan bir uygulama yazmanız da mümkün. Konumuz mongo iken, birkaç php-mongo interaksiyonunu denediğim bir php dosyasının kodunu doğrudan vermek istiyorum.
```
<?php
$mongo = new Mongo("mongodb://dbuser:dbpassword@\*\*\*\*\*\*.mongolab.com:45297/test\_database");
$db = $mongo->selectDB("test\_database");
$action = isset($\_GET\['action'\]) ? $\_GET\['action'\] : NULL;
?>
    <ul>
        <li><a href="?action=create\_collection&name=test\_collection\_<?=rand(1,10000);?>">Create a test collection</a></li>
        <li><a href="?action=list\_collections">List collections</a></li>
        <li><a href="?action=add\_record\_to\_nonexistent\_collection">Add record to non existent collection (it creates the collection)</a></li>
        <li><a href="?action=add\_user">Add a user</a></li>
        <li><a href="?action=find\_fatih">Find Fatih</a></li>
        <li><a href="?action=search\_user">Search user</a></li>
    </ul>
<?php
switch ($action) {
    case 'create\_collection':
        $name = isset($\_GET\['name'\]) ? $\_GET\['name'\] : 'users';
        var\_dump($db->createCollection($name, FALSE));
        exit;
        break;
    case 'list\_collections':
        $\_collections = $db->listCollections();
        print '<h3>Collecitons</h3>';
        foreach ($\_collections as $collection) {
            print $collection . '<br />';
        }
        break;
    case 'add\_user':
        $name = isset($\_GET\['name'\]) ? $\_GET\['name'\] : 'test\_user\_' . rand(1, 100000);
        $users = $db->users;
        $result = $users->insert(array(
            'username'   => $name,
            'created\_at' => date('Y-m-d H:i:s')
        ));
        print '<h3>Result:</h3>';
        var\_dump($result);
        exit;
        break;
    case 'add\_record\_to\_nonexistent\_collection':
        $collection = isset($\_GET\['name'\]) ? $\_GET\['name'\] : 'collection\_' . rand(1, 100000);
        // it creates the collection even if not exists.
        $collection\_obj = $db->$collection;
        $result = $collection\_obj->insert(array(
            'test' => 1,
            'time' => time()
        ));
        print '<h3>Result:</h3>';
        var\_dump($result);
        exit;
        break;
    case 'find\_fatih':
        $users = $db->users;
        $result = $users->findOne(array("username" => 'fatih'));
        print '<h3>Fatih?</h3>';
        var\_dump($result);
        exit;
        break;
    case 'search\_user':
        $users = $db->users;
        $result = $users->find(array("username" => array('$regex' => 'test\_')));
        print '<h3>Users:</h3>';
        foreach ($result as $\_result) {
            var\_dump($\_result);
        }
        exit;
        break;
    default:
        break;
}

```
İlk satırlarda göreceğiniz dsn'i mongolab'den edineceğiniz sunucu adresi ve portunu (tahminimce her kullanıcı için farklı olma durumu var), veritabanı kullanıcı adınız ve şifrenizi belirterek tek parça string şeklinde belirttiginiz takdirde bağlantı sağlayabileceksiniz. Mongo, küçük uygulamalarda veri düzeni zorunluluğu olmadığı için kullanması çok keyifli, fakat verinizi dökümante etmeyi unutmayın. Yoksa neyin ne olduğunu unutur veya ipin ucunu kaçırarak karmaşık bir veri yığını elde edebilirsiniz günün sonunda. MongoDB dökümantasyonunu inceleyerek indeksleme, sorgulama ve veri yönetimi nasıl yapılıyor fikir edinebilirsiniz. Ayrıca php manual'daki bazı SQL örneklerinin php ile mongo sınıfında nasıl yapıldığını gösteren bu sayfayı: [http://php.net/manual/en/mongo.sqltomongo.php](http://php.net/manual/en/mongo.sqltomongo.php) incelemekte fayda var. MongoLab servisinin adresi [https://mongolab.com](https://mongolab.com)