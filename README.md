# SIRENA — The Lost Kingdom of the Ocean

Game pembelajaran Bahasa Arab bertema fantasi laut dalam. Dibangun dengan React, Vite, Tailwind CSS, Framer Motion, dan Lucide React.

## Fitur

- Intro dan pembuatan profil pemain (nama + 3 avatar).
- Peta petualangan enam wilayah dengan sistem progression lock.
- Lima tantangan per wilayah (30 soal total) yang mencakup Mufradat, Hiwar, Qira'ah, Kitabah, Nahwu, dan Sharaf dasar.
- Jawaban salah dapat dicoba kembali; jawaban benar memberi XP dan mutiara.
- Penjelasan singkat untuk setiap jawaban benar.
- Pembacaan teks Arab menggunakan Speech Synthesis browser jika suara Arab tersedia di perangkat.
- Efek audio sintetis Web Audio API dan tombol mute.
- Progres otomatis tersimpan di LocalStorage.
- Responsive untuk desktop, tablet, dan ponsel.

## Menjalankan lokal

Persyaratan: Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Buka URL lokal yang ditampilkan Vite (biasanya `http://localhost:5173`).

## Uji build produksi

```bash
npm run build
npm run preview
```

Output produksi dibuat ke folder `dist/`.

## Deploy ke Vercel

1. Upload seluruh isi folder proyek ini ke root repository GitHub (pastikan `package.json` dan `index.html` berada di root repository).
2. Di Vercel, pilih **Add New → Project**, lalu import repository tersebut.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Install Command: `npm install`.
7. Klik **Deploy**.

`vercel.json` sudah menyertakan rewrite SPA ke `index.html`.

## Struktur proyek

```text
sirena/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── .gitignore
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── data.js
    └── style.css
```

## Catatan

- Progres disimpan lokal di browser/perangkat yang digunakan, bukan tersinkron antarperangkat.
- Audio pelafalan menggunakan fitur Speech Synthesis browser. Ketersediaan suara Arab bergantung pada browser dan sistem operasi; fitur ini tidak memengaruhi kuis.
- Google Fonts dimuat dari Google Fonts saat perangkat online. Font fallback tetap disediakan.
