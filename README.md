# bekolitech

bekolitech icin hazirlanan statik web sitesi.

## Dosyalar

- `index.html`: Ana sayfa ve basvuru formu
- `styles.css`: Tasarim, responsive duzen ve animasyon stilleri
- `app.js`: GSAP animasyonlari, smooth scroll, fiyat tahmini ve form akisi
- `assets/`: Logo ve vitrin gorseli

## Deploy

Bu proje statik HTML/CSS/JS yapisindadir. Vercel'e GitHub reposu olarak import edilebilir.

Vercel ayarlari:

- Framework Preset: `Other`
- Build Command: bos birak
- Output Directory: bos birak veya `./`

## Canliya almadan once degistirilmesi gerekenler

`index.html` ve `app.js` icindeki placeholder iletisim bilgileri gercek bilgilerle degistirilmelidir:

- `hello@bekolitech.com`
- `teklif@bekolitech.com`
- `+90 555 555 55 55`
- `https://wa.me/905555555555`

Form endpointi su anda FormSubmit uzerinden ayarlanmistir:

```html
action="https://formsubmit.co/ajax/hello@bekolitech.com"
```

Gercek mail adresi netlesince bu endpoint guncellenmelidir.
