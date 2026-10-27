# 📖 Panduan Mengubah Isi Undangan Digital

Seluruh teks, foto, musik, rekening, dan jadwal telah ditandai secara jelas di dalam kode dengan tanda `✏️ [UBAH ...]`.

---

## 🎵 1. Mengubah Lagu / Musik Latar

Buka berkas **[app.js](file:///d:/udangan%20putih/app.js)**, di bagian paling atas:

```javascript
const WEDDING_CONFIG = {
  // Masukkan file audio mp3 Anda (misal: 'assets/music/lagu_pernikahan.mp3')
  // atau link URL mp3 langsung online.
  musicUrl: 'assets/music/lagu_pernikahan.mp3',
  ...
};
```
> *Catatan: Letakkan file `.mp3` Anda di dalam folder `assets/music/`.*

---

## ⏳ 2. Mengubah Tanggal Hitung Mundur (Countdown)

Buka berkas **[app.js](file:///d:/udangan%20putih/app.js)** pada bagian:

```javascript
weddingDate: '2025-12-28T10:00:00+07:00', // Format: Tahun-Bulan-Tanggal Jam:Menit:Detik
```

---

## 🖼️ 3. Mengubah Foto-Foto

Semua foto disimpan di dalam folder **`assets/images/`**. Anda cukup mengganti file gambar dengan nama yang sama, atau mengganti nilai `src="..."` di **[index.html](file:///d:/udangan%20putih/index.html)**:

| Lokasi Foto | Tanda di `index.html` | File Bawaan |
| :--- | :--- | :--- |
| **Foto Sampul Pembuka** | `<!-- ✏️ [UBAH FOTO] Foto Sampul Depan -->` | `assets/images/hero_couple.jpg` |
| **Foto Utama Hero** | `<!-- ✏️ [UBAH FOTO] Foto Utama Pasangan (HERO) -->` | `assets/images/hero_couple.jpg` |
| **Foto Mempelai Wanita** | `<!-- ✏️ [UBAH FOTO] Foto Mempelai Wanita -->` | `assets/images/bride_adiba.jpg` |
| **Foto Mempelai Pria** | `<!-- ✏️ [UBAH FOTO] Foto Mempelai Pria -->` | `assets/images/groom_habib.jpg` |
| **Foto Love Story** | `<!-- ✏️ [UBAH FOTO] Foto Kisah Cinta (LOVE STORY) -->` | `assets/images/love_story.jpg` |
| **Galeri Foto 1-4** | `<!-- ✏️ [UBAH FOTO GALERI 1 - 4] -->` | `assets/images/gallery_1.jpg` dst |

---

## ✍️ 4. Mengubah Teks & Data di `index.html`

Cari tanda `✏️ [UBAH ...]` di berkas **[index.html](file:///d:/udangan%20putih/index.html)**:

1. **Nama Mempelai**: Cari `✏️ [UBAH TEKS] Nama Pasangan Utama`
2. **Orang Tua & Gelar**: Cari `✏️ [UBAH TEKS] Nama Lengkap & Gelar` & `Nama Orang Tua`
3. **Akad & Resepsi**: Cari `✏️ [UBAH DETAIL AKAD NIKAH]` & `✏️ [UBAH DETAIL RESEPSI]`
4. **Google Maps**: Cari `✏️ [UBAH PETA GOOGLE MAPS]` (ganti `src` iframe & link `href`)
5. **No. Rekening & E-Wallet**: Cari `✏️ [UBAH REKENING BANK BCA]` & `✏️ [UBAH E-WALLET DANA]`
6. **Alamat Kado Fisik**: Cari `✏️ [UBAH PENGIRIMAN KADO FISIK]`
7. **Ucapan Terima Kasih**: Cari `✏️ [UBAH TEKS] Kalimat Doa & Syukur` & `Nama Keluarga Besar`
