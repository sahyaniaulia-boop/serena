# SIRENA — The Lost Kingdom of the Ocean

Website pembelajaran Bahasa Arab bergaya RPG fantasi bawah laut. Desain utama memakai ilustrasi lokal `public/sirena-ocean.png`: ubur-ubur bercahaya, ikan, permukaan ombak, terumbu karang, reruntuhan, dan istana samudra. Karena gambar disimpan bersama proyek, visual utama tidak bergantung pada tautan gambar eksternal dan tidak berubah saat deploy.

## Fitur
- Landing page responsif dengan animasi gelembung dan ubur-ubur.
- Profil penjelajah dan progres tersimpan di LocalStorage.
- Empat keterampilan: Mufradat, Hiwar, Qira’ah, dan Kitabah.
- Enam wilayah petualangan dengan 5 soal per wilayah (30 soal).
- Sistem wilayah terkunci, XP, mutiara, dan hadiah penyelesaian.
- Pelafalan Arab melalui Web Speech API (jika suara Arab tersedia di browser) dan efek suara Web Audio API.

## Menjalankan di komputer
Proyek ini memakai Node.js bawaan tanpa dependensi eksternal.

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Build dan preview produksi
```bash
npm run build
npm run preview
```

Hasil build berada di folder `dist/`. Build menggunakan Node.js bawaan dan sudah diuji berhasil.

## Deploy ke Vercel
1. Upload seluruh isi folder proyek ke root repository GitHub. Jangan upload ZIP sebagai satu file.
2. Import repository di Vercel.
3. Framework Preset: **Other**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Install Command: `npm install` (aman, tidak ada dependency eksternal).
7. Deploy.

`vercel.json` menyediakan fallback untuk rute aplikasi. Pastikan `index.html`, `build.mjs`, `package.json`, folder `src/`, dan folder `public/` berada di root repository.

## Catatan
Progres tersimpan pada browser/perangkat yang digunakan, belum tersinkron antarperangkat. Font Google dimuat ketika online; font fallback digunakan jika offline. Gambar dunia bawah laut disimpan lokal.
