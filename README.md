# Laciform

Repositori ini dikembangkan dengan memperhatikan standar keamanan data, di mana seluruh kredensial sensitif (API Keys, Database Secrets) dikelola melalui variabel lingkungan (*environment variables*).

## Panduan Instalasi dan Konfigurasi

Untuk menjalankan proyek ini di lingkungan lokal, silakan ikuti langkah-langkah berikut:

### 1. Persiapan Environment Variables (.env)
Demi alasan keamanan, file `.env` yang berisi kredensial **Firebase/Firestore** tidak disertakan dalam repositori ini. 

*   **Mohon hubungi saya secara langsung** untuk mendapatkan isi variabel environment yang diperlukan.
*   Setelah mendapatkan isinya, buatlah file baru bernama `.env` di **direktori utama (root)** proyek (sejajar dengan file `package.json` dan `package-lock.json`).
*   Tempelkan data kredensial yang diberikan ke dalam file `.env` tersebut.

### 2. Instalasi Dependensi
Buka terminal di direktori proyek (disarankan melalui terminal VS Code) dan jalankan perintah berikut untuk mengunduh library yang dibutuhkan:
```bash
npm install
```
Setelah instalasi selesai dan file .env sudah siap, jalankan proyek dalam mode pengembangan:
```bash
npm run dev
```

Proyek ini telah dikonfigurasi untuk mengabaikan file .env menggunakan .gitignore. Praktik ini dilakukan untuk mencegah kebocoran kredensial akses layanan cloud (Firebase) ke ruang publik.
Jika pemohon memiliki kendala dalam menjalankan aplikasi, saya siap membantu untuk proses konfigurasi tersebut. Terima kasih...
