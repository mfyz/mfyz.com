# /translate-tr

Bu komut, mevcut İngilizce blog yazılarını Türkçe'ye çevirmek için kullanılır.

## Kullanım

```
/translate-tr [blog-post-title-or-slug]
```

**Örnek:**
```
/translate-tr crafting-useful-error-messages
/translate-tr "Crafting Useful Error Messages"
```

## Çeviri Talimatları

Claude'un bu komutu kullanırken izlemesi gereken kurallar:

### 1. Dosya Yapısı ve Lokasyon
- Çevirilen yazıyı `src/content/blog/tr/YYYY/` klasörüne yerleştir (YYYY = yazı yılı)
- Aynı dosya adını kullan: `YYYY-MM-DD-slug-name.mdx`
- Orijinal tarih ve slug'ı koru

### 2. Front Matter Kuralları
- Tüm front matter alanlarını çevir (title, description)
- `lang: "tr"` ekle
- `slug` alanını değiştirme (URL yapısı için önemli)
- Tarihi koru
- Tag'leri Türkçe'ye çevir ama teknik terimler İngilizce kalabilir

### 3. mfyz.com Türkçe Yazım Stili

#### Ton ve Ses - Fatih'in Gerçek Stili
- **Doğal konuşma üslubu**: "Yaa", "Ama meger", "ki bunları", "işte" gibi gündelik bağlaçlar kullan
- **Kişisel hikaye anlatımı**: "Benim için de öyle oldu", "Ben de geçen hafta sonu..." tarzı kişisel referanslar
- **Düşünce süreci paylaşımı**: "Düşünsene", "Hatırladığım kadarıyla", "Şaşırtıcı olan" gibi düşünce sürecini yansıtan ifadeler
- **Samimi soru tarzı**: "Ne gerek var?", "Daha ne olsun!", "O uygulama olmayın."
- **Kendi deneyimlerinden örnekler**: "Yıllar boyunca onlarca yazılım projesinde çalıştım", "Ben mesela..."

#### Dil Özellikleri - Fatih'e Özgü
- **Gündelik kısaltmalar**: "bi", "şu", "hadi", "ya da", "meger", "resmen"
- **Doğal dil akışı**: "ki" bağlacını çok kullan ("Bunların çoğunu kullanmıyordum bile!", "ki bu gerçekten...")
- **Teknik-gündelik karışımı**: Teknik terimlerle gündelik anlatımı harmanla
- **Cümle sonları**: "değil mi?", "İşte bu!", "Tam bu!", cümleler genelde doğal bitiş
- **Vurgu**: "resmen", "tam", "gerçekten", "baya", "kesinlikle" gibi doğal vurgular

#### Başlıklar ve Yapı - Fatih Tarzı
- **Soru tarzı başlıklar**: "Neden WordPress'ten Vazgeçtim?", "Peki Neden Astro'yu Seçtim?"
- **Emoji + açıklayıcı**: 🤔, 🌟, 🔥, 👍, 💻 - ama çok abartmadan
- **"İşte" ile başlayan açıklamalar**: "İşte WordPress'ten vazgeçme nedenlerim"
- **Doğrudan hitap**: "Eğer kodsuz otomasyon ile ilgileniyorsanız", "sizin için"

#### Anlatım Tarzı Örnekleri
- "Bu blogla maceram 2000'lerin başında başladı"
- "Fırlama bir istatistik!"
- "WordPress'in PHP tabanı beni sınırlıyordu"
- "Sonra bir eklenti bozuluyor, sonra güvenlik açığı..."
- "Ben dev bir editöryal ekip falan değilim ki"
- "resmen hangi birini seçeceğimi şaşırdım"
- "Bu ne mi demek?"

#### Fatih'in Yazım Stilindeki Ek Özellikler

**Türkçe Karaktersiz Yazım:**
- Eski yazılarında Türkçe karaktersiz yazıyor (bu özelliği yeni çevirilerde kullanma)
- Örnek: "birkac", "cok", "ucuz", "degil" → Modern çevirilerde düzgün Türkçe karakter kullan

**Teknik Açıklama Tarzı:**
- "Dolayısıyla" kelimesi çok kullanılır
- "Bunun dışında" ile alternatif seçenekleri sunar
- "Eğer... istiyorsanız" kalıbını sık kullanır
- "şekilde" kelimesi sık kullanılır ("bu şekilde", "farklı şekilde")

**Deneyim Aktarım Tarzı:**
- "Ben bir süredir..." ile kişisel deneyim başlatır
- "Çoğunlukla" ile genel gözlemlerini paylaşır
- "Geçen sene/yıl..." ile zamana referans verir
- "Bu konuya yabancı kişiler için..." ile okuyucuyu düşünür

**Problem-Çözüm Anlatımı:**
- Önce problemi yaşatır, sonra çözümü sunar
- "En büyük engel/problem..." ile zorluğu başlatır
- "Bunun için..." ile çözüm yolunu gösterir
- "En iyi/hızlı yol..." ile tavsiye verir

#### Teknik İçerik Sunumu
- **Basit açıklamalar**: Jargon kullanma, her şeyi sade açıkla
- **Gerçek deneyim**: "Ben", "benim deneyimimde", "şu yaygın hatayı görüyorum"
- **Pratik örnekler**: Teorik değil, gerçek kullanım senaryoları
- **Sorun-çözüm mantığı**: Önce sorunu yaşat, sonra çözümü sun

#### Paragraf ve Cümle Yapısı
- **Kısa paragraflar**: 2-4 cümle ideal
- **Doğal geçişler**: "Ama", "Sonra", "Yani" gibi bağlaçlarla (NOT: "İşte" ile cümle başlatma)
- **Liste kullanımı**: Madde madde, net açıklamalarla
- **Parantez içi yorumlar**: (hepimiz yaşadık bu durumu 😅)
- **Tire ile ara cümle YAPMA**: Fatih tire ekleyerek ara cümle kurmaz, bunun yerine parantez kullan veya cümleyi böl

#### Cümle Yapısı Örnekleri
- ❌ "Notion API'si - ki çok güçlü bir araç - otomasyonu kolaylaştırır"
- ✅ "Notion API'si otomasyonu kolaylaştırır (çok güçlü bir araç)"
- ✅ "Notion API'si çok güçlü bir araç. Otomasyonu kolaylaştırır."

#### Özel Kelime Seçimleri
- **Sık kullan**: "yani", "resmen", "baya", "tam", "kesinlikle", "şaşırtıcı olan", "meger"
- **Orta sıklıkta kullan**: "fırlama bir..." (vurgu için), "...falan" (liste sonlarında)
- **Seçici kullan**: "muhteşem" (çok sık kullanma, önemli yerlerde)
- **Kaçın/çok nadir kullan**: "hadi", "düşünsene", "işte" ile başlayan cümleler
- **Doğal ifadeler**: "ne gerek var", "daha ne olsun", "o uygulama olmayın"

#### Kaçınılması Gereken İfadeler
- ❌ "Hadi şunu yapalım" → ✅ "Şunu yapalım"
- ❌ "Düşünsene, bu ne kadar..." → ✅ "Bu ne kadar..."
- ❌ "İşte WordPress'ten vazgeçme nedenlerim" → ✅ "WordPress'ten vazgeçme nedenlerim şunlar"
- ❌ "İşte bu!" → ✅ "Tam bu!" veya "Bu kadar!"

#### Fatih'in Sık Kullandığı Kelime ve İfadeler
- **"dolayısıyla"** - sebep-sonuç ilişkilerinde
- **"bunun dışında"** - alternatif seçeneklerde
- **"eğer... istiyorsanız"** - koşullu önerilerde
- **"bu şekilde", "farklı şekilde"** - yöntem açıklamalarında
- **"ben bir süredir"** - kişisel deneyim başlatırken
- **"çoğunlukla"** - genel gözlemlerde
- **"en büyük problem/engel"** - zorluk tanımlarken
- **"bunun için"** - çözüm sunarken
- **"bu konuya yabancı kişiler için"** - açıklama yaparken

#### Fatih'in Açıklama ve Örnekleme Tarzı
- **"Şu örneği düşünün"** - örnek verirken
- **"Bu durum sadece... ile sınırlı olmayabilir"** - genişletirken
- **"Atıyorum"** - örnek verirken (gündelik)
- **"Örnekler çoğaltılabilir"** - örnekleri sonlandırırken
- **"Anlattığım bu hikaye..."** - hikayeyi toplarken
- **"Birkaç hafta önce"**, **"Geçtiğimiz hafta"** - zamansal başlangıçlar
- **"...da olabilir"** - ihtimalleri sıralarken
- **"Yani"** - basitleştirirken / açıklarken
- **"Çünkü"** - gerekçe verirken (cümle başında)

#### Fatih'in Sorular ve Okuyucu Diyalogu
- **"...değil mi?"** - onay aramak için
- **"...olabilir mi?"** - soru yöneltirken
- **"Ne olmuyor demeyin oluyor"** - karşı çıkışı önceden engelleme
- **"Tabi ki"** - doğal kabul ettiklerini belirtirken
- **"Açıkçası"** - samimi itiraf ederken
- **"Hemen anlayamadık"** - deneyim paylaşırken

#### Fatih'in Teknik Yaklaşımı ve Anlatım Stili
- **Hikaye anlatıcılığı**: Teknik konuları hikayeye döker
- **"Birkaç hafta önce ilginç bir... aldık"** - deneyim başlangıçları
- **Deneyim odaklı**: "Yaklaşık X yıldır... ekibin parçasıyım" tarzı kimlik tanımları
- **Sonuçlara odaklanma**: "Anlattığım bu hikaye... anlatıyor aslında"
- **Samimi itiraflar**: "Açıkçası ağzımız açık kaldı", "Hemen anlayamadık tabi ki"
- **Gerçekçi yaklaşım**: "Malesef çok teknik detaya girmeyeceğim"
- **İdealizmden gerçekçiliğe**: "Umarım tüm geliştiriciler böyle şaşırtıcı şekilde..."

### 4. İçerik Uyarlaması
- **Kültürel adaptasyon**: Türkiye'deki geliştiriciler için uyarlama yap
- **Yerel örnekler**: Mümkünse Türkçe örnekler ver
- **Link'leri koru**: Harici link'ler aynen kalsın
- **Kod örnekleri**: Değiştirilmez, yorum satırları Türkçe'ye çevrilebilir

### 5. Kalite Kontrol
- **Akıcılık testi**: Yüksek sesle okuduğunda doğal gelmeli
- **Teknik doğruluk**: Çeviri sırasında teknik anlam kaybı olmamalı  
- **Tutarlılık**: Aynı terimleri aynı şekilde çevir
- **Özgünlük**: Kelimesi kelimesine çeviri değil, anlamsal uyarlama

### 6. Çeviri Örnekleri - Fatih Stiline Dönüştürme

#### İngilizce → Türkçe Adaptasyon Örnekleri

**❌ Yanlış (Formal/Robot Çeviri):**
> "In this article, we will explore the concepts of error handling in modern web applications."

**✅ Doğru (Fatih Stili):**
> "Yıllar boyunca onlarca web projesinde çalıştım ve sürekli aynı hatayı görüyorum: güzel tasarlanmış arayüzler, bir şey ters gittiğinde aniden şifreli çıkmaz sokaklara dönüşüyor."

**❌ Yanlış:**
> "Error messages are important components of user experience design."

**✅ Doğru:**
> "Hata mesajları denince çoğumuz "ağ, bunlar da var" der geçeriz ama şaşırtıcı olan, bu küçük detayların kullanıcı deneyimini ne kadar etkilediği."

**❌ Yanlış:**
> "When implementing a new feature, developers should consider..."

**✅ Doğru:**
> "Yeni bir özellik kodlarken genellikle şunu görüyorum: happy-path'i mükemmelleştiriyoruz ama hata durumlarını unutuyoruz. Ben mesela şu yaklaşımı kullanıyorum..."

#### Başlık Dönüştürme Örnekleri

**İngilizce:** "Getting Started with API Integration"
**Fatih Stili:** "API Entegrasyonuna İlk Adımlar 🚀"

**İngilizce:** "Common Mistakes in Error Handling"
**Fatih Stili:** "Hata Yönetiminde Sürekli Yaptığımız Hatalar 🤔"

**İngilizce:** "Why Choose Framework X?"
**Fatih Stili:** "Peki Neden Framework X'i Seçtim? 🌟"

#### Teknik Açıklama Dönüştürme

**❌ Formal:**
> "This function performs validation on the input parameters and returns a boolean value indicating success or failure."

**✅ Fatih Stili:**
> "Bu fonksiyon şu işi yapıyor: gelen verileri kontrol ediyor ve "tamam" ya da "problem var" diyor. Basit ama işe yarıyor."

#### Kişisel Deneyim Ekleme Tekniği

**İngilizce:** "Error messages should be clear and helpful."

**Fatih Stili:** "Düzenli kullandığım bir uygulamada hata yaptığınızda 'GEÇERSİZ GİRİŞ - TEKRAR DENEYİN' yazan bir hata mesajı var. Her gördüğümde bilgisayarımın bana bağırdığını hissediyorum. O uygulama olmayın."

### 7. Workflow
1. İngilizce yazıyı dikkatli oku ve ana fikrini yakala
2. Fatih'in yazım stilini uygulayarak **adaptasyon** yap (çeviri değil!)
3. Kişisel deneyim ve hikaye örnekleri ekle
4. Gündelik dil ve doğal ifadeler kullan
5. Front matter'ı uygun şekilde ayarla
6. `src/content/blog/tr/YYYY/` klasörüne kaydet
7. Çevirinin tamamlandığını bildir

### 8. Kalite Kontrol Checklist

Çeviri bittiğinde şunları kontrol et:

- [ ] "Ben", "benim deneyimimde" gibi kişisel referanslar var mı?
- [ ] "işte", "yani", "resmen" gibi doğal bağlaçlar kullanıldı mı?
- [ ] Teknik terimler gündelik dille açıklandı mı?
- [ ] Sorular ve samimi hitaplar var mı?
- [ ] Paragraflar kısa ve okunakli mi?
- [ ] Fatih'in gerçek sesini yansıtıyor mu?

## Önemli Notlar
- Bu bir makine çevirisi değil, **Fatih'in sesinde yeniden yazma** olmalı
- Sadece bilgiyi değil, tonu ve kişiliği de aktar
- İngilizce yazıyı Fatih yazmış gibi Türkçe'ye dönüştür
- Okuyucu "ah bu tam Fatih'in yazdığı gibi" demeli