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

#### Ton ve Yaklaşım
- **Samimi ve kişisel**: Okuyucuyla sohbet eder gibi yaz
- **Teknik ama sade**: Jargon kullanmadan açıkla
- **Örneklerle zenginleştir**: Somut durumlar ve anekdotlar ekle
- **Soruları dahil et**: Okuyucuyu düşündürecek sorular sor

#### Dil Kuralları
- **Teknik terimler**: İngilizce bırakılabilir (API, CDN, happy-path, responsive, frontend, backend)
- **Karma kullanım**: Hem İngilizce teknik terim hem Türkçe açıklama kullan
- **Günlük dil**: Kısaltmalar ve gündelik ifadeler kullan ("şu", "bi", "daha" gibi)
- **Hitap şekli**: "Siz" formunu kullan, okuyucuya doğrudan hitap et

#### Görsel Öğeler
- **Emoji kullanımı**: Başlıklarda ve vurgularda emoji kullan (🔍, ✍️, 🔄, 🚀, 💬, ❌, ✅)
- **Formatlar koru**: Tablolar, liste yapıları, kod blokları aynen kalsın
- **Görsel referanslar**: ImageZoom, Note gibi componentler aynen kalsın
- **Diagramlar**: Mermaid diagramlar kullanarak zenginlestirebilirsin. Bu proje mermaid kod bloklarini otomatik render eder.

#### Yapı ve Organizasyon
- **Net başlıklar**: Emoji + açıklayıcı başlık kombinasyonu
- **Kısa paragraflar**: Okunabilirlik için paragrafları böl
- **Alt başlıklar**: İçeriği mantıklı bölümlere ayır
- **Örneklerle destekle**: Tablo, kod bloğu, alıntı kullan

#### Özel Dikkat Edilmesi Gerekenler
- **Kişisel deneyim vurgusu**: "Yıllar boyunca...", "Genellikle şu... görüyorum" gibi ifadeler kullan
- **Pratik öneriler**: Somut, uygulanabilir tavsiyeler ver
- **Karşılaştırmalar**: "Bunun yerine" / "Şunu deneyin" formatları kullan
- **Sonuç odaklı**: Her bölümde net bir çıkarım veya öneri sun

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

### 6. Workflow
1. İngilizce yazıyı bul ve oku
2. Türkçe yazım stilini uygulayarak çevir
3. Front matter'ı uygun şekilde ayarla
4. `src/content/blog/tr/YYYY/` klasörüne kaydet
5. Çevirinin tamamlandığını bildir

## Önemli Notlar
- Bu bir makine çevirisi değil, **yaratıcı adaptasyon** olmalı
- mfyz.com'un mevcut Türkçe yazım tonunu yakala ve uygula
- Okuyucu deneyimini önceleyerek yaz
- Teknik kesinliği koruyarak sade ve samimi ol