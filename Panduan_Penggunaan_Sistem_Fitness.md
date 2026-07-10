# PANDUAN LANGKAH PENGGUNAAN SISTEM MANAJEMEN INTERNAL
## FITNESS CENTER VOKASI UNY

Dokumen ini berisi panduan lengkap penggunaan situs web **Fitness Center Fakultas Vokasi UNY** untuk peran **Administrator (Admin)** dan **Resepsionis (Receptionist)**. Panduan ini menjelaskan alur operasional, kegunaan, serta fungsi dari setiap fitur dari awal masuk sistem hingga pembuatan laporan, tanpa melakukan perubahan apa pun pada kode sumber aplikasi.

---

## DAFTAR ISI
1. [Akses Masuk Sistem (Login)](#1-akses-masuk-sistem-login)
2. [Modul Peran Administrator (Admin)](#2-modul-peran-administrator-admin)
   - [2.1. Dashboard (Overview & Statistik)](#21-dashboard-overview--statistik)
   - [2.2. Registrasi & Booking](#22-registrasi--booking)
   - [2.3. Laporan Keuangan](#23-laporan-keuangan)
   - [2.4. Kelola User & Member](#24-kelola-user--member)
   - [2.5. Kelola Pelatih (Trainers)](#25-kelola-pelatih-trainers)
   - [2.6. Kelola Kelas Grup (Classes)](#26-kelola-kelas-grup-classes)
   - [2.7. Kelola Alat-Alat Gym (Equipment)](#27-kelola-alat-alat-gym-equipment)
   - [2.8. Kelola Produk (Products)](#28-kelola-produk-products)
   - [2.9. Pengaturan Diskon Khusus & Event](#29-pengaturan-diskon-khusus--event)
   - [2.10. Biaya Gym & Metode Pembayaran (Info Biaya)](#210-biaya-gym--metode-pembayaran-info-biaya)
3. [Modul Peran Resepsionis (Receptionist)](#3-modul-peran-resepsionis-receptionist)
   - [3.1. Kasir Kunjungan Harian & Member Baru](#31-kasir-kunjungan-harian--member-baru)
   - [3.2. Booking & Jadwal Latihan](#32-booking--jadwal-latihan)
   - [3.3. Kasir Penjualan Produk](#33-kasir-penjualan-produk)
   - [3.4. Kas & Laporan Keuangan Harian](#34-kas--laporan-keuangan-harian)
4. [Manfaat dan Nilai Tambah Fitur Sistem](#4-manfaat-dan-nilai-tambah-fitur-sistem)

---

## 1. AKSES MASUK SISTEM (LOGIN)

Halaman login berfungsi sebagai gerbang keamanan utama untuk membedakan hak akses dan fungsi kerja antara Admin dan Resepsionis.

### Langkah-langkah Penggunaan:
1. Buka halaman utama website. Pengguna akan diarahkan ke form masuk sistem.
2. Pada panel sebelah kiri, Anda dapat melihat statistik real-time mengenai:
   - **Member Aktif**: Jumlah anggota terdaftar berstatus aktif.
   - **Total Booking**: Jumlah transaksi booking yang telah dibuat di sistem.
   - **Jam Operasional**: Menampilkan info jam operasional fitness (07.00 - 21.00 WIB).
3. Di panel sebelah kanan (Form Login):
   - Masukkan **Email** resmi yang terdaftar (contoh: `admin@fitnesuny.ac.id` atau email staf resepsionis).
   - Masukkan **Password**. Anda dapat menekan ikon **Mata (Show/Hide Password)** untuk menampilkan atau menyembunyikan kata sandi saat mengetik demi akurasi.
4. Klik tombol **"Masuk ke Sistem"**.
5. Sistem akan memvalidasi data menggunakan basis data Supabase:
   - Jika login sebagai **Admin**, sistem secara otomatis mengalihkan Anda ke panel **Dashboard Admin**.
   - Jika login sebagai **Resepsionis**, sistem secara otomatis mengalihkan Anda ke panel **Kasir Kunjungan Resepsionis**.
   - Jika email/password tidak sesuai, pesan error akan ditampilkan dan tombol dinonaktifkan sementara untuk memproses autentikasi.

---

## 2. MODUL PERAN ADMINISTRATOR (ADMIN)

Peran Admin memiliki kendali penuh atas konfigurasi harga, diskon, data fasilitas (alat, kelas, pelatih, produk), pengelolaan akun staf, dan persetujuan (approval) pemesanan yang diajukan.

### 2.1. Dashboard (Overview & Statistik)
Halaman awal setelah login Admin yang menampilkan rangkuman kondisi operasional gym secara umum.
- **Fungsi / Kegunaan**: Memantau aktivitas harian secara cepat, melihat statistik umum, tren omzet, dan melakukan verifikasi pendaftaran.
- **Langkah Penggunaan**:
  1. Lihat deretan kartu statistik di bagian atas untuk memantau: *Total Booking*, *Booking Pending*, *Total Pelatih*, dan *Total Produk*.
  2. Perhatikan **Grafik Pendapatan Bulanan** di sebelah kiri (didukung oleh *Chart.js*) untuk melihat estimasi penghasilan 6 bulan terakhir.
  3. Lihat daftar **Aktivitas Terbaru** di sebelah kanan yang merekam log pendaftaran teranyar.
  4. Pada tabel **Booking Terbaru (Pending)**, Admin dapat langsung memproses permohonan booking yang masuk dengan mengklik tombol:
     - **Setujui** (warna hijau): Untuk mengesahkan status booking menjadi `Approved`.
     - **Tolak** (warna merah): Untuk membatalkan booking tersebut (`Cancelled`).

### 2.2. Registrasi & Booking
Panel yang memuat log komprehensif seluruh transaksi pendaftaran member dan penjadwalan latihan.
- **Fungsi / Kegunaan**: Menyortir, melacak histori pendaftaran, serta menyetujui atau menolak pendaftaran.
- **Langkah Penggunaan**:
  1. Gunakan dropdown **Filter Status** di sudut kanan atas untuk menyaring data berdasarkan kategori: `Semua Status`, `Pending`, `Approved`, atau `Cancelled`.
  2. Informasi detail yang ditampilkan pada tabel meliputi: nama pengunjung, tipe civitas, kategori keanggotaan (Member/Insidental), harga yang diestimasi, waktu latihan terpilih, dan status saat ini.
  3. Untuk entri yang berstatus `Pending`, tekan tombol **Centang (✓)** untuk menyetujui secara instan atau tombol **Silang (✕)** untuk menolak pemesanan.

### 2.3. Laporan Keuangan
Visualisasi data pendapatan khusus dari transaksi yang telah disetujui (Approved).
- **Fungsi / Kegunaan**: Mengetahui laba bersih gym secara transparan, serta melihat kontribusi pemasukan per kategori akses.
- **Langkah Penggunaan**:
  1. Perhatikan tiga kartu ringkasan keuangan di bagian atas: *Total Estimasi Pendapatan* (akumulasi Rp dari transaksi approved), *Jumlah Booking Approved*, dan *Total Transaksi* (seluruh log).
  2. Gunakan diagram lingkaran (**Doughnut Chart**) di tengah untuk menganalisis porsi kontribusi pemasukan antara kategori keanggotaan **Member (Bulanan)** dan **Insidental (Harian)**.
  3. Periksa tabel **Transaksi Approved** untuk detail pembukuan meliputi nama pembayar, kategori, jumlah nominal uang, dan tanggal transaksi dilakukan.

### 2.4. Kelola User & Member
Panel utama dalam mengelola hak akses akun internal (Admin, Resepsionis) serta melacak pendaftaran member luar.
- **Fungsi / Kegunaan**: Menambah akun karyawan baru, memperbarui password staf, mengedit informasi member, atau menghapus pengguna yang sudah tidak aktif.
- **Langkah Penggunaan**:
  1. **Mencari Pengguna**: Ketik nama atau email pada bilah pencarian *"Cari nama..."* untuk penyaringan cepat.
  2. **Tambah User/Member Baru**: 
     - Klik tombol **"Tambah User / Member"** di pojok kanan atas.
     - Di jendela pop-up modal, masukkan *Nama Lengkap*, *Email*, dan pilih *Role Akses* (`Admin`, `Receptionist`, atau `Member`).
     - Jika memilih role Admin atau Resepsionis, masukkan *Password* akun (minimal 6 karakter).
     - Klik **"Simpan User"**.
  3. **Edit User/Member**: 
     - Klik tombol **"Edit"** pada baris pengguna yang ingin diperbarui.
     - Ubah data yang diperlukan. Jika tidak ingin mengganti password untuk akun staf, kosongkan input password.
     - Klik **"Simpan User"**.
  4. **Hapus User/Member**:
     - Klik tombol **"Hapus"** (warna merah) pada pengguna terpilih.
     - Konfirmasi dialog peringatan browser dengan mengklik *OK* untuk menghapus permanen dari basis data.
  *Catatan Khusus*: Anggota yang didaftarkan langsung oleh Resepsionis di mesin Kasir akan otomatis muncul di tabel ini dengan tanda `— (Registrasi Kasir)` pada kolom email untuk memudahkan integrasi data.

### 2.5. Kelola Pelatih (Trainers)
Fasilitas pengaturan instruktur kebugaran pribadi (Personal Trainer).
- **Fungsi / Kegunaan**: Mengisi katalog pelatih gym beserta penetapan tarif tambahan per sesi latihan.
- **Langkah Penggunaan**:
  1. **Tambah Pelatih**:
     - Klik tombol **"Tambah Pelatih"**.
     - Isi *Nama Pelatih*, *Spesialisasi* (contoh: Diet & Nutrisi, Strength Coach), dan nominal *Harga per Sesi* (Rp).
     - Klik **"Simpan"**. Sistem otomatis membuat ID unik, deskripsi profil dalam dua bahasa (ID & EN), serta menerapkan foto profil default.
  2. **Edit Pelatih**:
     - Klik **"Edit"** pada kartu pelatih terkait.
     - Perbarui informasi nama, spesialisasi, atau tarif per sesi latihan. Klik **"Simpan"**.
  3. **Hapus Pelatih**:
     - Klik tombol **"Hapus"** (ikon sampah) pada kartu pelatih terkait, lalu konfirmasi penghapusan.

### 2.6. Kelola Kelas Grup (Classes)
Manajemen pilihan kelas berkelompok (seperti Yoga, Zumba, Pilates).
- **Fungsi / Kegunaan**: Menyediakan program kelas tambahan bersubsidi bagi para anggota dengan tarif yang terstandar.
- **Langkah Penggunaan**:
  1. Lihat daftar kelas yang aktif pada tabel.
  2. **Tambah Kelas**:
     - Klik tombol **"Add New"** pada tabel CRUD.
     - Input *Nama Kelas* dan *Tarif Tambahan Kelas (Rp)*.
     - Klik **"Simpan"**. Sistem secara otomatis menentukan deskripsi kelas, menetapkan durasi default (45 menit), dan level akses (Semua Level).
  3. **Edit Kelas**: Klik tombol **"Edit"** pada baris kelas, perbarui nama atau tarif tambahan kelas, lalu klik **"Simpan"**.
  4. **Hapus Kelas**: Klik tombol **"Delete"** pada kelas pilihan, lalu konfirmasi penghapusan.

### 2.7. Kelola Alat-Alat Gym (Equipment)
Fitur penyusunan inventaris alat gym berdasarkan pembagian zona/kategori alat kebugaran.
- **Fungsi / Kegunaan**: Menyusun klasifikasi jenis peralatan gym serta mengenakan biaya tambahan opsional jika pengunjung memilih paket akses alat premium.
- **Langkah Penggunaan**:
  1. **Tambah Kategori Alat**: Klik **"Tambah Kategori Alat"** di pojok kanan atas. Sistem membuat grup baru (contoh: "Kategori Baru") dengan tarif dasar.
  2. **Edit Kategori**: Klik langsung kotak input pada *Nama Kategori* atau *Tarif Tambahan Kategori Alat (Rp)*. Klik di luar area input (atau tekan tab/blur) untuk menyimpan perubahan ke basis data secara otomatis (*auto-save on blur*).
  3. **Kelola Item Alat Individu**:
     - Di dalam setiap kotak kategori, klik tombol **"+ Tambah Item"** untuk mendaftarkan nama alat spesifik (contoh: Treadmill, Smith Machine, Leg Press).
     - Klik langsung pada input *Nama Alat* untuk mengganti namanya, lalu klik di luar input untuk menyimpan perubahan.
     - Klik tombol **"Hapus"** kecil di samping nama alat jika ingin menghapus item tersebut.
  4. **Hapus Kategori**: Klik tombol merah **"Hapus Kategori"** di sudut kanan atas kotak kategori untuk menghapus satu blok kelompok alat beserta seluruh item di dalamnya secara permanen.

### 2.8. Kelola Produk (Products)
Manajemen logistik penjualan item konsumsi sehat, minuman dingin, merchandise, dan aksesoris gym.
- **Fungsi / Kegunaan**: Menyediakan stok barang yang dapat dibeli oleh pengunjung melalui Kasir Resepsionis.
- **Langkah Penggunaan**:
  1. **Tambah Produk**:
     - Klik tombol **"Add New"** pada panel produk.
     - Isi kode **ID Unik** (jika dikosongkan, sistem akan mengenerate otomatis).
     - Masukkan *Nama Produk*, *Harga Jual*, *Harga Asli* (opsional, untuk tampilan diskon harga coret), pilih *Kategori* (`Suplemen`, `Merchandise`, `Aksesoris`, atau `Minuman`), dan cantumkan *URL Gambar* produk jika ada.
     - Klik **"Simpan"**.
  2. **Edit Produk**: Klik **"Edit"** pada baris produk terpilih, perbarui harga atau kategori, lalu klik **"Simpan"**.
  3. **Hapus Produk**: Klik **"Delete"** pada produk terpilih dan konfirmasi.

### 2.9. Pengaturan Diskon Khusus & Event
Konfigurasi persentase pemotongan harga (diskon) harian dan manajemen event promo temporal.
- **Fungsi / Kegunaan**: Memberikan keringanan biaya khusus bagi civitas akademika UNY, alumni, maupun menyelenggarakan event promosi musiman (seperti Promo Kemerdekaan, Diskon Dies Natalis).
- **Langkah Penggunaan**:
  1. **Mengatur Diskon Dasar**:
     - Pada masing-masing kartu civitas (UNY, Alumni, Umum, dll.), masukkan angka persentase diskon (0-100) pada field:
       * *Diskon Member Dasar (%)*
       * *Diskon Insidental Dasar (%)*
  2. **Membuat Diskon Event / Khusus (Custom)**:
     - Di bagian bawah kartu civitas terkait, masukkan *Nama Event/Promo* (contoh: "Promo Mahasiswa Baru") dan *Nilai Diskon (%)*.
     - Klik tombol **"+ Tambah"**. Event tersebut akan masuk ke daftar promo khusus civitas tersebut.
     - Untuk menghapus promo event, klik ikon **Tempat Sampah** di samping nama event.
  3. **Menambah Kategori Civitas Baru**:
     - Klik tombol **"Tambah Kategori"** di kanan atas.
     - Masukkan *Nama Kategori* baru (contoh: "Kemitraan", "VIP") beserta penetapan tarif biaya awal registrasi member, tarif harian insidental, tarif member 1 bulan, dan tarif member 3 bulan.
     - Klik **"Simpan Kategori"**.
  4. **Menyimpan Konfigurasi**: Klik tombol **"Simpan Konfigurasi Diskon"** di bagian paling bawah untuk mengaktifkan potongan harga pada sistem transaksi kasir.

### 2.10. Biaya Gym & Metode Pembayaran (Info Biaya)
Panel pusat dalam menentukan tarif dasar layanan kebugaran serta rekening tujuan transfer pembayaran.
- **Fungsi / Kegunaan**: Menentukan struktur harga pokok dari semua layanan gym berdasarkan status pendaftar, dan menyediakan pilihan bank transfer untuk pembayaran non-tunai.
- **Langkah Penggunaan**:
  #### Tab 1: Biaya Gym
  1. Tekan tab **"Biaya Gym"**.
  2. Di layar akan muncul daftar biaya dasar masing-masing civitas.
  3. Ubah nominal tarif pada input:
     - *Pendaftaran Member (Rp)* (Biaya registrasi kartu pertama kali).
     - *Member 1 Bulan (Rp)* dan *Member 3 Bulan (Rp)*.
     - *Insidental Harian (Rp)* (Biaya masuk satu kali datang bagi non-member).
  4. Anda juga dapat menambahkan kategori civitas baru pada form dasbor di bawahnya atau menghapus kategori dengan menekan tombol **"Hapus Kategori"**.
  5. Klik tombol **"Simpan Biaya & Tarif"** untuk memperbarui harga pokok layanan di database.
  
  #### Tab 2: Metode Pembayaran
  1. Tekan tab **"Metode Pembayaran"**.
  2. Klik tombol **"Tambah Bank"** untuk menambahkan jalur pembayaran transfer baru.
  3. Isi data pada kolom:
     - *Key Identitas* (tulis huruf kecil tanpa spasi, contoh: `bni`, `gopay`).
     - *Nama Bank / Layanan* (contoh: `Bank Negara Indonesia`, `QRIS DANA`).
     - *Nomor Rekening / Akun* (contoh nomor rekening resmi gym).
  4. Klik **"Simpan Metode Pembayaran"** untuk mempublikasikannya ke pilihan kasir.
  5. Bila ingin menghapus bank, klik tombol **"Hapus"** pada baris bank terkait, lalu simpan ulang.

---

## 3. MODUL PERAN RESEPSIONIS (RECEPTIONIST)

Peran Resepsionis berfokus pada layanan langsung di meja depan (front desk), seperti mencatat kedatangan pengunjung, memproses pembayaran kasir, menjadwalkan kelas/latihan, dan melayani penjualan produk eceran.

### 3.1. Kasir Kunjungan Harian & Member Baru
Layanan utama front-desk untuk menyambut dan meregistrasikan tamu yang datang langsung ke lokasi.
- **Fungsi / Kegunaan**: Mencatat kunjungan harian, mendaftarkan member baru, menghitung otomatis biaya transaksi beserta potongan diskon, cetak kuitansi rekap, dan cetak kartu membership fisik.
- **Langkah Penggunaan**:
  1. **Mengisi Form Kunjungan**:
     - Input **Nama Pengunjung**.
     - Pilih **Status Civitas** pendaftar (opsi bersumber dari kategori biaya yang diatur Admin).
     - *Khusus mahasiswa/alumni UNY*: Isi kolom **Nomor Identitas (NIM/NIP/NIDN)** yang muncul secara kondisional untuk validasi kartu.
     - Pilih **Kategori Akses**:
       * *Member*: Untuk langganan jangka panjang (1 Bulan / 3 Bulan).
       * *Insidental*: Untuk kunjungan harian (tamu non-member).
     - Pilih **Pelatih Pilihan**, **Program Kelas**, dan **Paket Alat** (jika pengunjung memilih layanan tambahan/add-on).
     - Jika ada event diskon khusus yang sedang aktif untuk kategori civitas tersebut, pilih promo pada dropdown **Diskon Event / Khusus**.
     - Pilih **Metode Bayar**: `Tunai`, `QRIS`, atau `Transfer Bank`. Jika memilih Transfer Bank, pilih bank tujuan transfer pada dropdown yang muncul.
  2. **Periksa Total Pembayaran**: Panel biru di bawah form akan menampilkan total tagihan secara instan. Sistem secara otomatis menghitung:
     $$\text{Total} = (\text{Tarif Dasar Kategori} + \text{Tarif Pelatih} + \text{Tarif Kelas} + \text{Tarif Alat}) \times (100\% - \text{Total Persentase Diskon})$$
  3. **Menyimpan Kunjungan**: Klik **"Catat Kunjungan"**. Transaksi akan otomatis masuk ke tabel *Log Kunjungan Hari Ini* di sisi kanan.
  4. **Cetak Rekap Harian**: Klik **"Cetak Rekap"** di atas tabel log kunjungan untuk membuka jendela cetak browser guna mencetak laporan tiket kasir hari ini.
  5. **Cetak Kartu Member Digital**:
     - Untuk pengunjung berstatus **Member**, akan muncul tombol **"Cetak Kartu"** di kolom aksi tabel log.
     - Klik tombol **"Cetak Kartu"** untuk memunculkan pratinjau kartu anggota eksklusif. Kartu memuat nama, status civitas, NIM/ID, masa berlaku (diaktifkan otomatis sesuai durasi paket), barcode tiruan, dan logo resmi UNY.
     - Klik tombol **"Cetak Kartu Fisik"** di bawah pratinjau untuk mencetak kartu menggunakan printer ID card.
  6. **Menghapus Transaksi**: Jika resepsionis melakukan kesalahan input data pengunjung, klik ikon **Tempat Sampah** merah pada baris transaksi log untuk menghapusnya dari rekap harian lokal.

### 3.2. Booking & Jadwal Latihan
Panel manajemen penjadwalan latihan untuk mengatur lalu lintas kapasitas kunjungan gym agar kondusif.
- **Fungsi / Kegunaan**: Memesan jadwal hari dan slot waktu latihan untuk member aktif maupun tamu umum agar tidak melebihi kapasitas operasional.
- **Langkah Penggunaan**:
  1. **Pilih Kategori Booking**: Tentukan apakah pendaftar merupakan `Member Terdaftar` (sudah memiliki paket langganan) atau kategori `Masyarakat Umum/Harian`.
     - *Jika Member*: Pilih nama member dari dropdown daftar member aktif yang telah terdaftar melalui sistem kasir. Informasi civitas dan sisa durasi paket akan terisi otomatis.
     - *Jika Umum/Harian*: Tuliskan nama secara manual dan pilih status civitas.
  2. **Pilih Tanggal Latihan**:
     - Klik kolom *Tanggal Latihan*. Kalender interaktif eksklusif akan muncul.
     - Pilih hari latihan yang diinginkan.
     - *Validasi Sistem*: Hari Minggu tidak dapat diklik (berwarna buram) karena pusat kebugaran UNY libur pada hari Minggu. Pesan peringatan *"Hari Minggu Fitness Center FV UNY Tutup"* akan muncul jika dipaksa.
  3. **Pilih Waktu Latihan (Slot Waktu)**:
     - Pilih slot waktu latihan: *Pagi (07.00 - 11.00)*, *Siang (11.00 - 15.00)*, *Sore (15.00 - 18:00)*, atau *Malam (18:00 - 21:00)*.
     - *Validasi Sistem*: Jika slot waktu pada tanggal tersebut sudah dipesan penuh oleh anggota lain, sistem akan memberi tanda `— [SUDAH DIBOOKING]` dan menonaktifkan pilihan tersebut guna mencegah bentrokan jadwal (*double booking*).
  4. **Fasilitas Tambahan (Opsional)**: Pilih *Pelatih*, *Kelas Grup*, atau *Kategori Alat* tambahan jika ingin disertakan dalam sesi latihan tersebut.
  5. **Simpan Booking**:
     - Klik **"Simpan Jadwal Booking"**. Jadwal baru akan ditambahkan ke tabel *Daftar Booking Jadwal* di sebelah kanan.
     - Jika ingin mengubah jadwal yang sudah ada, klik tombol **"Edit"** pada baris tabel, sesuaikan tanggal atau jam baru pada form kiri, lalu klik **"Simpan Perubahan"**.
     - Jika batal berlatih, klik tombol **"Hapus"**.
  6. **Cetak Laporan Penjadwalan**: Klik tombol **"Cetak Laporan Booking"** di atas tabel daftar booking untuk mengunduh atau mencetak hardcopy agenda latihan mingguan/bulanan.

### 3.3. Kasir Penjualan Produk
Transaksi penjualan retail/eceran untuk barang siap saji yang ada di area lobi gym.
- **Fungsi / Kegunaan**: Melayani pembelian produk seperti minuman isotonic, susu whey protein shaker, kaos jersey merchandise, atau sarung tangan gym tanpa mencampurnya dengan biaya kunjungan utama.
- **Langkah Penggunaan**:
  1. Pilih item pada dropdown **Pilih Produk**. Daftar produk beserta harga satuannya terhubung langsung dengan inventaris produk yang dikelola Admin.
  2. Harga satuan akan muncul otomatis di bawahnya.
  3. Masukkan **Jumlah** barang yang dibeli (Qty). Total Pembayaran otomatis terhitung.
  4. Tentukan **Metode Bayar** (Tunai, QRIS, atau Transfer Bank).
  5. Klik tombol **"Proses Penjualan"**.
  6. Riwayat penjualan akan langsung tercatat dan masuk ke tabel **Log Penjualan Produk** di sisi kanan untuk pencatatan stok dan kasir masuk.

### 3.4. Kas & Laporan Keuangan Harian
Halaman pemantauan omzet harian khusus untuk petugas kasir resepsionis.
- **Fungsi / Kegunaan**: Membantu resepsionis melaporkan setoran uang kas fisik harian kepada pimpinan, memantau total omzet produk, dan memvisualisasikan tren grafik omzet.
- **Langkah Penggunaan**:
  1. Amati empat buah kartu ringkasan keuangan di bagian atas:
     - *Pemasukan Tiket/Member*: Total omzet dari loket pendaftaran masuk gym.
     - *Pemasukan Produk*: Total omzet dari penjualan suplemen, minuman, & merchandise.
     - *Total Pendapatan*: Penggabungan nominal uang masuk dari tiket dan produk.
     - *Produk Terjual*: Jumlah total barang eceran yang telah laku hari ini.
  2. Perhatikan dua diagram analisis di bagian tengah:
     - **Grafik Batang (Bar Chart)**: Menampilkan perbandingan pemasukan harian antara Registrasi Member, Penjualan Produk, dan Kunjungan Insidental selama 7 hari terakhir.
     - **Grafik Garis (Line Chart)**: Menunjukkan laju akumulasi pertumbuhan kas (kumulatif pendapatan) dari hari ke hari secara dinamis.
  3. Di bagian paling bawah, resepsionis dapat memantau kembali lembar pembukuan terpisah secara detail lewat tabel **Pemasukan Registrasi** di sebelah kiri dan tabel **Pemasukan Produk** di sebelah kanan.

---

## 4. MANFAAT DAN NILAI TAMBAH FITUR SISTEM

Situs web Fitness Center Vokasi UNY dirancang menggunakan arsitektur modern yang memberikan manfaat langsung bagi efisiensi bisnis pusat kebugaran:

1. **Sinkronisasi Realtime Supabase (Supabase Realtime Sync)**:
   Setiap kali ada perubahan data yang dilakukan oleh Admin (seperti mengubah tarif gym, menambah diskon baru, memperbarui jadwal kelas, dll.), data tersebut akan langsung ter-update di layar Resepsionis pada detik yang sama secara otomatis tanpa harus memuat ulang halaman (*tanpa reload/refresh*).
2. **Keamanan Data Lokal (LocalStorage Backup)**:
   Sistem kasir harian resepsionis dilengkapi dengan sistem penyimpanan cadangan lokal (*local storage backup*). Apabila terjadi gangguan koneksi internet mendadak, data transaksi kasir hari ini tidak akan hilang dari memori browser resepsionis.
3. **Validasi Anti Bentrok Jadwal (Double-Booking Validation)**:
   Mencegah penumpukan kuota latihan pada jam-jam sibuk dengan menonaktifkan slot waktu yang telah penuh secara otomatis di kalender booking.
4. **Kalkulator Biaya Otomatis (Auto Pricing Calculator)**:
   Mempercepat proses pelayanan di meja kasir karena sistem secara otomatis mendeteksi potongan diskon civitas, diskon event, dan biaya add-on fasilitas tambahan dalam hitungan milidetik secara tepat.
5. **Integrasi Mesin Cetak (Print Layout Integrations)**:
   Sistem telah dirancang ramah cetak. Layout struk rekap harian, agenda booking, dan kartu member fisik akan otomatis disesuaikan ukurannya (fit-to-page) ketika dihubungkan ke printer standar maupun printer kartu ID Card khusus.

---
*Laporan panduan penggunaan ini disusun secara lengkap dan akurat berdasarkan struktur sistem yang ada tanpa mengubah komponen kode program.*
