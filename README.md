# 🏢 Reservasi Aula BPS Kota Tanjungpinang

Progressive Web App (PWA) untuk sistem reservasi aula BPS Kota Tanjungpinang.

## 📱 Fitur PWA

- ✅ **Installable** - Bisa diinstall seperti aplikasi native
- ✅ **Offline Ready** - Tetap bisa dibuka meski tanpa internet
- ✅ **Responsive** - Optimal di desktop, tablet, dan mobile
- ✅ **Fast Loading** - Cache sistem untuk performa cepat
- ✅ **Auto Update** - Update otomatis saat ada versi baru

## 📁 Struktur Folder

```
Reservasi Aula/
├── index.html          # File utama aplikasi
├── manifest.json       # Konfigurasi PWA
├── sw.js              # Service Worker untuk offline
├── logo.png           # Logo dan favicon (min 512x512px)
└── README.md          # Dokumentasi ini
```

## 🚀 Setup di GitHub

### 1. Buat Repository

1. Login ke GitHub
2. Klik "New repository"
3. Nama repository: `reservasi-aula-bps` (atau sesuai keinginan)
4. Centang "Add a README file"
5. Klik "Create repository"

### 2. Upload Files

1. Klik "Add file" → "Upload files"
2. Drag & drop semua file dalam folder "Reservasi Aula":
   - `index.html`
   - `manifest.json` 
   - `sw.js`
   - `logo.png`
3. Commit changes

### 3. Aktifkan GitHub Pages

1. Masuk ke **Settings** repository
2. Scroll ke bagian **Pages**
3. Source: pilih **Deploy from a branch**
4. Branch: pilih **main** 
5. Folder: pilih **/ (root)**
6. Klik **Save**

### 4. Akses Website

Setelah beberapa menit, website bisa diakses di:
```
https://username.github.io/nama-repository/
```

## ⚙️ Konfigurasi Google Apps Script

### Update URL di index.html

1. Buka file `index.html`
2. Cari baris yang mengandung:
```javascript
const CONFIG = {
    scriptURL: 'https://script.google.com/macros/s/AKfycbyz7fv3qPu9x1m57VgTtvGozwpthlm-OvrT8fdfaaGJZkqQnHIt2Tfv4c2LYqgE6rzH/exec',
```
3. Ganti dengan URL Google Apps Script yang baru
4. Commit perubahan

### Deploy Google Apps Script

1. Buka Google Apps Script project
2. Copy kode dari file Google Apps Script yang sudah diupdate
3. **Deploy** → **New deployment**
4. Type: **Web app**
5. Execute as: **Me**
6. Who has access: **Anyone**
7. Copy URL yang dihasilkan
8. Update di `index.html`

## 🖼️ Persyaratan Logo

File `logo.png` harus memenuhi:
- **Format**: PNG dengan background transparan
- **Ukuran minimum**: 512x512 pixels
- **Ukuran ideal**: 1024x1024 pixels
- **Rasio**: Square (1:1)
- **File size**: < 500KB untuk performa optimal

## 📱 Cara Install PWA

### Di Android/Mobile:
1. Buka website di Chrome/Firefox
2. Tap menu browser (3 titik)
3. Pilih "Add to Home screen" atau "Install App"
4. Konfirmasi instalasi

### Di Desktop:
1. Buka website di Chrome/Edge
2. Lihat ikon install di address bar
3. Klik ikon install atau tombol "Install App"
4. Konfirmasi instalasi

## 🔧 Maintenance & Update

### Update Aplikasi:
1. Edit file yang diperlukan
2. Commit ke GitHub
3. GitHub Pages akan auto-deploy
4. PWA akan auto-update di user devices

### Update Cache Version:
Jika ada perubahan besar, update version di `sw.js`:
```javascript
const CACHE_NAME = 'reservasi-aula-bps-v1.0.1'; // Increment version
```

## 🌐 Custom Domain (Opsional)

Untuk menggunakan domain custom:

1. Beli domain di registrar (Niagahoster, Cloudflare, dll)
2. Di GitHub Pages settings, masukkan custom domain
3. Setup DNS records di domain provider:
   ```
   Type: CNAME
   Name: www (atau @)
   Value: username.github.io
   ```
4. Tunggu propagasi DNS (24-48 jam)

## 🛡️ Security & Best Practices

- ✅ **HTTPS**: GitHub Pages auto-enable SSL
- ✅ **CSP**: Content Security Policy sudah diset
- ✅ **Cache Strategy**: Cache-first untuk static, network-first untuk API
- ✅ **Error Handling**: Graceful offline fallbacks
- ✅ **Performance**: Optimized loading dan lazy loading

## 📊 Analytics (Opsional)

Untuk menambah Google Analytics:

1. Daftar Google Analytics
2. Dapatkan tracking code
3. Tambahkan di `<head>` section `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🐛 Troubleshooting

### PWA tidak bisa diinstall:
- Pastikan manifest.json valid
- Cek console browser untuk error
- Pastikan HTTPS aktif

### Data tidak tersimpan:
- Cek Google Apps Script URL
- Cek browser console untuk API errors
- Pastikan CORS settings correct di Apps Script

### Cache tidak update:
- Force refresh browser (Ctrl+Shift+R)
- Clear browser cache
- Update cache version di sw.js

## 📞 Support

Untuk bantuan teknis:
1. Check browser console untuk error messages
2. Verify Google Apps Script deployment
3. Test di incognito/private mode
4. Check GitHub Pages deployment status

---

**Made with ❤️ for BPS Kota Tanjungpinang**