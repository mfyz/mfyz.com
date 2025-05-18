---
title: "Wordpress blogunuzun RSS kaynağına girdi görselleri eklemek"
slug: wordpress-blogunuzun-rss-kaynagina-girdi-gorselleri-eklemek
date: 2012-08-06
url: http://mfyz.com/tr/wordpress-blogunuzun-rss-kaynagina-girdi-gorselleri-eklemek/
tags: ["feed","PHP","rss","theme","thumbnail","wordpress","wp"]
category: PHP
migration: {"wpId":313,"wpPostDate":"2012-08-06T00:57:46.000Z"}
lang: tr
---

Wordpress'in ön tanımlı gelen temlarındaki rss kaynaklarında sadece girdi detayları bulunur. Eğer sayfalarınızda girdilerinizi listelerken görsel olarak girdinize eklenen birincil imajı kullanıyorsanız (bir çok tema bu şekilde girdi görseli tanımlaması yapmaktadır), rsslerinize girdilerin birincil görselini (varsa) eklemek oldukça kolay olacaktır.

Wordpress'in kanca mimarisi sayesinde tema klasörünüzdeki fonksiyon tanımlamaları yapılan dosyaya ekleyeceğiniz bir fonksiyonu, rss girdileri işlenirken çağırtabilirsiniz. Bu sayede rss çıktısında gösterilecek girdileri manipule ederek rss çıktılarına girdi görsellerini ekleyebiliriz.

Bunun için, tema klasörünüzde (muhtemelen var olan) functions.php'ye

```
function add_thumbnails_to_rss($content, $sec = false, $third = false, $fourth = false) {
    $post_id = get_the_ID();

    $args = array(
        'post_type'      => 'attachment',
        'post_mime_type' => 'image',
        'numberposts'    => 1,
        'post_parent'    => $post_id
    );
    $attachments = get_children($args);

    $attachment_code = "";
    if( $attachments ){
        foreach($attachments as $attachment){
            $attachment_code .= '

'. wp_get_attachment_image( $attachment->ID, 'medium' ) .'

';
        }
    }

    // adding attachments to entry body
    return $attachment_code . $content;
}

add_filter('the_excerpt_rss', 'add_thumbnails_to_rss');
add_filter('the_content_rss', 'add_thumbnails_to_rss');

```

kodunu ekleyelim. Rss girdilerini manipule edecek bir fonksiyon tanımladıktan sonra iki rss'i oluşturan methodların kancalarını kullanarak tanımladığımız fonksiyonu çağırtıyoruz. Wordpress, fonksiyona, manipule edilecek girdiye ait bazı bilgileri parametre olarak gönderiyor. İlk parametre, işimize yarıyacak tek parametre aslında. Basitçe; girdiye ait eklentileri sorgulayıp eğer girdi görseli varsa, ilk parametreyle aldığımız girdi içeriğine html kodu olarak ekliyor ve fonksiyon cevabı olarak geri dönüyoruz. Wordpress gerisini hallediyor zaten.

Yukarıda kodun son 2 satırında gördüğünüz rss kaynakları, yorumlar ve girdilere ait rss'ler. İsterseniz sadece girdilere ait rss kaynağına (the_content_rss) thumbnail eklemeyi tercih edebilirsiniz.