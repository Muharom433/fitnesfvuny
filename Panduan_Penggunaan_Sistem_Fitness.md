# Panduan Penggunaan Sistem Informasi Fitness Center Vokasi UNY

Dokumen ini disusun sebagai acuan operasional bagi Administrator dan Resepsionis dalam menjalankan sistem informasi web Fitness Center Fakultas Vokasi UNY.

---

## 1. Halaman Beranda (Landing Page) & Layanan Informasi
*   **Fungsi:** Menyajikan profil gym, jam operasional, status keramaian, info membership, kelas, pelatih, fasilitas, serta kontak & peta lokasi untuk pengunjung umum.
*   **Langkah Penggunaan:**
    1.  Buka URL utama sistem web fitness untuk masuk ke halaman **Beranda**.
    2.  *Scroll* ke bawah untuk membaca informasi: **Paket Membership**, **Intensitas & Operasional**, **Program Kelas & Instruktur**, dan **Fasilitas & Peralatan**.
    3.  Gunakan tautan di bagian bawah (*footer*) untuk navigasi cepat dan melihat peta lokasi Google Maps.
    4.  Klik tombol **Login** (ikon profil gembok oranye di pojok kanan atas) untuk membuka form masuk sistem internal.

---

## 2. Halaman Login (Akses Sistem Internal)
*   **Fungsi:** Otentikasi dan pembagian hak akses (role) sebagai Administrator atau Resepsionis.
*   **Langkah Penggunaan:**
    1.  Klik ikon **Login** di Halaman Beranda.
    2.  Ketik alamat **Email** dan **Password** staf yang valid.
    3.  Klik tombol **Masuk ke Sistem** (sistem otomatis mengarahkan ke halaman panel sesuai role Anda).
    4.  Klik tombol **Kembali ke Beranda** di pojok kiri atas form jika ingin membatalkan login.

---

## 3. Modul Panel Administrator (Dashboard Admin)

### 3.1 Dashboard (Overview & Statistik)
*   **Fungsi:** Memantau indikator operasional gym secara *real-time*, grafik pendapatan bulanan, log aktivitas, dan mengelola persetujuan booking pending secara cepat.
*   **Langkah Penggunaan:**
    1.  Pantau 4 kartu indikator utama: **Total Booking**, **Booking Pending**, **Total Pelatih**, dan **Total Produk**.
    2.  Tinjau grafik batang estimasi **Pendapatan Bulanan** dalam 6 bulan terakhir.
    3.  Lihat daftar **Aktivitas Terbaru** di sebelah kanan.
    4.  Pada tabel **Booking Terbaru**, klik tombol hijau **Setujui** untuk memproses atau tombol merah **Tolak** untuk membatalkan booking yang berstatus *Pending*.

### 3.2 Registrasi & Booking
*   **Fungsi:** Melacak histori log lengkap pendaftaran kunjungan dan jadwal reservasi latihan anggota dengan filter status.
*   **Langkah Penggunaan:**
    1.  Pilih status di dropdown filter (**Pending**, **Approved**, atau **Cancelled**) untuk mencari log tertentu.
    2.  Klik tombol checklist hijau (✓) pada baris data untuk menyetujui, atau tombol silang merah (✕) untuk membatalkan booking.

### 3.3 Keuangan (Laporan Keuangan)
*   **Fungsi:** Menganalisis pendapatan, total transaksi disetujui, serta kontribusi kategori pemesanan.
*   **Langkah Penggunaan:**
    1.  Tinjau angka total estimasi pendapatan, transaksi approved, dan total seluruh transaksi pada kartu ringkasan.
    2.  Analisis diagram lingkaran (**doughnut chart**) untuk melihat perbandingan pemasukan kategori **Member** vs **Insidental**.
    3.  Tinjau daftar riwayat transaksi lengkap pada tabel transaksi di bagian bawah.

### 3.4 Kelola User & Member
*   **Fungsi:** Mengatur akun pengguna internal (Admin & Resepsionis) serta mendaftarkan dan melacak masa aktif kartu anggota (Member).
*   **Langkah Penggunaan:**
    1.  **Cari User:** Ketik nama pada kotak pencarian di bagian atas tabel untuk memfilter daftar pengguna secara instan.
    2.  **Tambah User/Member Baru:** Klik tombol **Tambah User / Member** untuk mendaftarkan akun baru:
        *   Isi **Nama Lengkap**, **Email**, dan pilih **Role Akses** (Admin, Resepsionis, atau Member).
        *   *Catatan:* Pendaftaran member baru oleh Resepsionis di Kasir Kunjungan akan otomatis tercatat di sini dengan alamat email default: `— (Registrasi Kasir)`.
        *   Bila memilih Admin/Resepsionis, isi kolom **Password** (min. 6 karakter). Bila memilih Member, password dikosongkan.
        *   Klik **Simpan User**.
    3.  **Edit Akun:** Klik tombol **Edit** pada baris data untuk mengubah nama, email, role, atau memperbarui password.
    4.  **Hapus Akun:** Klik tombol **Hapus** merah jika akun/member ingin dihapus dari database.
    5.  **Pantau Sisa Masa Aktif:** Perhatikan kolom status keaktifan member untuk memantau masa berlakunya:
        *   *Aktif (Sisa X Hari):* Status normal member aktif.
        *   *⚠️ Segera Habis (H-X hari):* Sisa masa aktif kurang dari atau sama dengan 7 hari (ditandai dengan ikon peringatan kuning).
        *   *Hari Ini Berakhir:* Masa aktif tersisa hanya untuk hari ini.
        *   *Nonaktif (Masa Aktif Habis):* Masa aktif telah kedaluwarsa dan member harus registrasi ulang di kasir.

### 3.5 Kelola Pelatih (Personal Trainer)
*   **Fungsi:** Mengelola daftar nama Personal Trainer (PT) beserta spesialisasi dan tarif jasanya.
*   **Langkah Penggunaan:**
    1.  Klik tombol **Tambah Pelatih** di pojok kanan atas.
    2.  Isi **Nama Pelatih**, **Spesialisasi**, dan **Harga/Sesi (Rp)**. Klik **Simpan**.
    3.  Klik tombol **Edit** pada kartu pelatih untuk mengubah data tarif/spesialisasi.
    4.  Klik tombol **Hapus** (ikon tempat sampah merah) untuk menghapus pelatih dari daftar.

### 3.6 Kelola Kelas Grup
*   **Fungsi:** Mengelola daftar program latihan kelompok (seperti zumba, yoga, aerobic) yang ditawarkan kepada member.
*   **Langkah Penggunaan:**
    1.  Klik **Tambah Kelas** di panel kelola kelas.
    2.  Masukkan **Nama Kelas** dan **Tarif Tambahan Kelas (Rp)**. Klik **Simpan** (info durasi 45 menit, ikon, level, dan deskripsi standard otomatis terisi).
    3.  Klik **Edit** pada baris kelas untuk memodifikasi tarif/nama kelas.
    4.  Klik **Delete** untuk menghapus kelas dari daftar.

### 3.7 Kelola Alat-Alat Gym
*   **Fungsi:** Mengatur kategori zona latihan alat fitness dan rincian nama item alat di dalam kategori tersebut.
*   **Langkah Penggunaan:**
    1.  Klik **Tambah Kategori Alat** untuk membuat area/zona baru.
    2.  Isi **Nama Kategori** dan **Tarif Tambahan Kategori Alat (Rp)**.
    3.  **Simpan Otomatis (On Blur):** Klik di luar kotak input (atau tekan Tab) agar kursor keluar dari kotak (*blur*), maka perubahan nama kategori atau tarif tambahan akan tersimpan otomatis ke sistem.
    4.  **Kelola Item Alat:** Klik **Tambah Item** di dalam kategori terkait, lalu ketik nama item alat spesifik (misal: *Smith Machine*). Sistem akan otomatis menyimpan nama alat saat Anda mengklik ke area lain (*blur*).
    5.  Klik **Hapus Kategori** atau tulisan merah **Hapus** di dekat nama alat untuk menghapus data.

### 3.8 Kelola Produk
*   **Fungsi:** Mengatur katalog inventaris produk fisik (suplemen, minuman, merchandise, aksesoris) yang dijual di kasir gym.
*   **Langkah Penggunaan:**
    1.  Klik **Tambah Produk** di panel kelola produk.
    2.  Isi **Nama Produk**, **Harga (Rp)**, **Harga Asli (Rp, opsional)**, dan pilih **Kategori** produk. Klik **Simpan**.
    3.  Klik **Edit** pada baris data untuk memperbarui harga/nama produk.
    4.  Klik **Delete** jika produk tidak lagi dijual.

### 3.9 Pengaturan Diskon Khusus & Event
*   **Fungsi:** Mengatur persentase diskon dasar member/insidental serta membuat diskon promo event bertarget berdasarkan kategori civitas (Mahasiswa, Alumni, Umum).
*   **Langkah Penggunaan:**
    1.  Ketik persentase baru pada kolom **Diskon Member Dasar (%)** atau **Diskon Insidental Dasar (%)** pada kotak civitas terkait.
    2.  **Tambah Diskon Event:** Di kolom promo di bawah kategori civitas, ketik nama promo (misal: *Promo HUT UNY*) dan isi persen diskonnya, lalu klik **+ Tambah**.
    3.  Klik **Simpan Konfigurasi Diskon** di bagian bawah halaman untuk menerapkan seluruh diskon ke sistem kasir.
    4.  **Tambah Kategori Civitas Baru:** Klik **Tambah Kategori** di pojok kanan atas, isi nama kategori civitas dan tarif registrasinya, lalu simpan.

### 3.10 Biaya Gym & Metode Pembayaran
*   **Fungsi:** Mengonfigurasi harga dasar pendaftaran gym dan daftar nomor rekening bank resmi untuk transfer pembayaran.
*   **Langkah Penggunaan:**
    1.  **Tab Biaya Gym:** Ubah nominal pendaftaran member, iuran bulanan (1 bulan / 3 bulan), dan tarif insidental harian pada masing-masing kategori civitas. Klik **Simpan Biaya & Tarif**.
    2.  **Tab Metode Pembayaran:** Klik **Tambah Bank**, masukkan Key Identitas (misal: `bca`), Nama Bank (misal: `BCA`), dan Nomor Rekening. Klik **Simpan Metode Pembayaran**. Hapus rekening lama via tombol **Hapus** di kanan atas kotak bank.

---

## 4. Modul Panel Kasir Resepsionis

### 4.1 Kasir Kunjungan (Kunjungan Harian & Registrasi Member)
*   **Fungsi:** Melayani pembayaran kunjungan langsung harian (Insidental) atau pendaftaran paket Member bulanan, mencetak struk thermal, kartu anggota, dan rekap harian.
*   **Langkah Penggunaan:**
    1.  **Isi Data Pengunjung:** Isi **Nama Pengunjung** dan pilih **Status Civitas**.
    2.  **Input Nomor Identitas:** Jika memilih civitas *Student* (Mahasiswa) atau *Alumni*, sistem secara wajib akan menampilkan kolom **Nomor Identitas (NIM/NIP/NIDN)** yang harus Anda isi.
    3.  **Pilih Akses & Layanan:** 
        *   Tentukan Kategori Akses: **Member (Bulanan)** (pilih durasi 1 / 3 bulan) atau **Insidental (Harian)**.
        *   Pilih layanan tambahan opsional jika ada: **Pelatih Pilihan**, **Program Kelas**, **Paket Alat**, dan **Diskon Event / Khusus**.
    4.  **Proses Transaksi:** Pilih **Metode Bayar** (Tunai, Transfer Bank - pilih bank tujuan, atau QRIS) lalu klik tombol **Proses Pembayaran** (total bayar terhitung otomatis pada kartu hitam).
    5.  **Cetak Struk Thermal:** Klik tombol **Cetak Struk** untuk mencetak bukti pembayaran kertas kasir thermal ukuran lebar **58mm** untuk transaksi terakhir.
    6.  **Cetak Kartu Member CR80:** Pada tabel log di sebelah kanan (khusus kategori Member), klik tombol **Cetak Kartu**. Di jendela pratinjau kartu anggota yang menampilkan dimensi **CR80 (85mm x 55mm)**, klik **Cetak Kartu Fisik**.
    7.  **Cetak Rekap Harian:** Klik tombol **Cetak Rekap** di atas tabel transaksi sebelah kanan untuk mencetak laporan rekapitulasi seluruh transaksi kunjungan hari ini.

### 4.2 Booking & Jadwal
*   **Fungsi:** Membuat reservasi jadwal latihan pengunjung (agar kuota harian gym terkontrol) dan melacak status keterisian slot waktu.
*   **Langkah Penggunaan:**
    1.  **Pilih Pengunjung:** Tentukan Kategori Booking: **Member Terdaftar** (pilih nama dari dropdown member) atau **Masyarakat Umum (Insidental)** (ketik nama & civitas manual).
    2.  **Pilih Tanggal (Libur Otomatis):** Klik kolom Tanggal Latihan, pilih tanggal pada kalender. *Hari Minggu akan terkunci secara otomatis (tidak bisa diklik) karena gym libur*.
    3.  **Pilih Slot Waktu (Pencegahan Double Booking):** Pilih slot jam latihan. Jika slot waktu di tanggal tersebut sudah penuh dipesan orang lain, sistem akan memblokir pilihan dengan status `[SUDAH DIBOOKING]` agar tidak terjadi pemesanan ganda.
    4.  **Simpan Reservasi:** Pilih layanan tambahan (Pelatih, Kelas, Alat) dan Metode Pembayaran, lalu klik **Simpan Jadwal Booking**.
    5.  **Cetak Laporan Booking:** Klik tombol **Cetak Laporan Booking** di kanan atas tabel log untuk mencetak rangkuman daftar seluruh jadwal latihan terdaftar.

### 4.3 Kasir Produk
*   **Fungsi:** Melayani transaksi penjualan produk fisik (suplemen, minuman, dll) secara langsung.
*   **Langkah Penggunaan:**
    1.  **Pilih Produk:** Pilih nama produk pada menu dropdown. *Harga satuan produk akan terisi secara otomatis dan terkunci* (tidak bisa diedit manual).
    2.  **Input Jumlah (Qty):** Masukkan kuantitas produk yang dibeli.
    3.  **Metode Pembayaran:** Pilih Metode Bayar (Tunai, QRIS, atau Transfer Bank).
    4.  **Proses & Cetak Struk:** Klik **Proses Penjualan** (transaksi masuk ke tabel Log Penjualan), kemudian klik **Cetak Struk** untuk mencetak struk thermal ukuran **58mm**.
    5.  **Batal Transaksi:** Klik ikon **Hapus** (tempat sampah merah) pada tabel Log Penjualan sebelah kanan jika ingin membatalkan/menghapus transaksi produk yang salah input.

### 4.4 Kas & Laporan Rekapan
*   **Fungsi:** Menyajikan visualisasi kas harian, tren pendapatan, dan rincian transaksi kasir.
*   **Langkah Penggunaan:**
    1.  **Pantau Kas Masuk:** Cek total saldo masuk pada 4 kartu ringkasan keuangan: **Pemasukan Member/Insidental**, **Pemasukan Produk**, **Total Pendapatan**, dan **Produk Terjual**.
    2.  **Analisis Grafik Ganda:** Tinjau visualisasi **Bar Chart** (pendapatan per periode) dan **Line Chart** (tren kumulatif pendapatan) untuk menganalisis perkembangan keuangan gym.
    3.  **Periksa Detail Transaksi Terpisah:** Tinjau tabel **Pemasukan Registrasi** di sebelah kiri (untuk tiket/member) dan tabel **Pemasukan Produk** di sebelah kanan (untuk penjualan barang) untuk pencocokan berkas transaksi fisik.
