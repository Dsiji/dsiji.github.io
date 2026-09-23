# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- `data/portfolio.json` — data portofolio dipindah dari HTML ke JSON agar mudah ditambah tanpa menyentuh `index.html`
- Renderer portofolio di `js/main.js` (fetch + render kartu dari JSON)
- 4 proyek baru: Throne Media, Rinet Physiotherapy, Halozy AC Services, Heart to Earth (data hasil scraping + screenshot 1200×750)
- WhatsApp kontak kedua & ketiga di section Kontak (`628114117001`, `6281228698815`)
- `CHANGELOG.md`

### Changed

- Section Stack diperbarui sesuai tech nyata di 11 portofolio: React, TypeScript, Next.js, Vite, Laravel, Tailwind CSS, PostgreSQL, Docker, Cloudflare, Midtrans (hapus Node.js, tambah Next.js/Laravel/Tailwind)
- Kartu portofolio di `index.html` diganti container kosong `#portfolioGrid` yang diisi dari JSON

### Notes

- `fetch` JSON tidak jalan via `file://` — preview lokal pakai `python3 -m http.server`, di GitHub Pages normal.
