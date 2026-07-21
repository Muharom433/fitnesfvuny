<template>
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-5">
    <!-- Left: Form Kasir Kunjungan -->
    <div class="xl:col-span-1 bg-white rounded-2xl border border-slate-200/80 shadow-card p-6">
      <h3 class="font-extrabold text-primary-900 text-sm mb-5">
        <i class="fa-solid fa-cash-register text-accent-500 mr-2"></i>Form Kunjungan & Member
      </h3>
      <form @submit.prevent="submitKasir" class="space-y-4">
        <!-- Nama Pengunjung -->
        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nama Pengunjung</label>
          <input v-model="form.name" required placeholder="Nama lengkap" class="input-field" />
        </div>

        <!-- Status Civitas -->
        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status Civitas</label>
          <select v-model="form.civitas" required class="input-field">
            <option value="">-- Pilih Status --</option>
            <option v-for="p in adminStore.pricing" :key="p.id" :value="p.id">
              {{ getCategoryLabel(p.id) }}
            </option>
          </select>
        </div>

        <!-- Identity Number (NIM / NIP) - CONDITIONAL -->
        <div v-if="form.civitas === 'student' || form.civitas === 'alumni'" class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nomor Identitas (NIM / NIP / NIDN)</label>
          <input v-model="form.identityNumber" required placeholder="Masukkan NIM / NIP Anda..." class="input-field" />
        </div>

        <!-- Kategori Akses -->
        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Kategori Akses</label>
          <select v-model="form.category" required class="input-field">
            <option value="">-- Pilih Kategori --</option>
            <option value="Member">Member (Bulanan)</option>
            <option value="Insidental">Insidental (Harian)</option>
          </select>
        </div>

        <!-- Durasi - CONDITIONAL (only for Member) -->
        <div v-if="form.category === 'Member'" class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Durasi</label>
          <select v-model="form.duration" required class="input-field">
            <option value="">-- Pilih Durasi --</option>
            <option value="1 Bulan">1 Bulan</option>
            <option value="3 Bulan">3 Bulan</option>
          </select>
        </div>

        <!-- Trainer Pilihan (Optional) -->
        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pelatih Pilihan (Opsional)</label>
          <select v-model="form.trainerId" class="input-field">
            <option value="">Mandiri (Tanpa Pelatih)</option>
            <option v-for="t in adminStore.trainers" :key="t.id" :value="t.id">
              {{ t.name }} (+Rp {{ t.price.toLocaleString('id-ID') }})
            </option>
          </select>
        </div>

        <!-- Kelas Pilihan (Optional) -->
        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pilih Program Kelas (Opsional)</label>
          <select v-model="form.classId" class="input-field">
            <option value="">Tanpa Kelas Tambahan</option>
            <option v-for="c in adminStore.classes" :key="c.id" :value="c.id">
              {{ c.name_id }} (+Rp {{ c.price.toLocaleString('id-ID') }})
            </option>
          </select>
        </div>

        <!-- Alat Pilihan (Optional) -->
        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pilih Paket Alat (Opsional)</label>
          <select v-model="form.equipmentId" class="input-field">
            <option value="">Standard Access (Free)</option>
            <option v-for="(e, eIdx) in adminStore.equipment" :key="e.id" :value="e.id">
              Paket Alat #{{ eIdx + 1 }}{{ e.price > 0 ? ` (+Rp ${e.price.toLocaleString('id-ID')})` : '' }}
            </option>
          </select>
        </div>

        <!-- Diskon Event / Khusus (Optional) -->
        <div v-if="availableCustomDiscounts.length > 0" class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Diskon Event / Khusus (Opsional)</label>
          <select v-model="form.selectedDiscountId" class="input-field">
            <option value="">-- Tanpa Diskon Event --</option>
            <option v-for="d in availableCustomDiscounts" :key="d.id" :value="d.id">
              {{ d.name }} (Diskon {{ d.percentage }}%)
            </option>
          </select>
        </div>

        <!-- Metode Bayar -->
        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Metode Bayar</label>
          <select v-model="form.paymentMethod" required class="input-field">
            <option value="Tunai">Tunai</option>
            <option value="Transfer Bank">Transfer Bank</option>
            <option value="QRIS">QRIS</option>
          </select>
        </div>

        <!-- Bank Select (if Transfer Bank) -->
        <div v-if="form.paymentMethod === 'Transfer Bank'" class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pilih Bank</label>
          <select v-model="form.selectedBank" required class="input-field">
            <option value="">-- Pilih Bank --</option>
            <option v-for="b in bankList" :key="b.key" :value="`${b.name} (${b.number})`">
              {{ b.name }} - {{ b.number }}
            </option>
            <option v-if="bankList.length === 0" disabled>Belum ada bank diatur admin</option>
          </select>
        </div>

        <!-- Total Pembayaran Visual Card -->
        <div class="bg-[#0b1f3c] text-white rounded-2xl p-5 text-center border border-[#0d2547] shadow-lg relative overflow-hidden">
          <div class="absolute top-0 right-0 w-24 h-24 bg-accent-500/10 rounded-full blur-xl pointer-events-none"></div>
          <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total Pembayaran</p>
          <p class="text-2xl font-black text-white mt-1.5">Rp {{ form.amount.toLocaleString('id-ID') }}</p>
        </div>

        <div class="grid grid-cols-2 gap-3 mt-2">
          <button type="submit" class="py-3 bg-accent-500 text-white font-bold text-xs rounded-xl hover:bg-accent-600 active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-1.5">
            <i class="fa-solid fa-circle-check"></i> Proses Pembayaran
          </button>
          <button type="button" @click="printLastTransaction" :disabled="!lastTransaction" class="py-3 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-1.5 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed">
            <i class="fa-solid fa-print"></i> Cetak Struk
          </button>
        </div>
      </form>
    </div>

    <!-- Right: Summary + Table Log -->
    <div class="xl:col-span-2 space-y-4">
      <!-- Stats Summary -->
      <div class="grid grid-cols-3 gap-4">
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card text-center">
          <i class="fa-solid fa-users text-accent-500 text-xl mb-1"></i>
          <p class="text-2xl font-extrabold text-primary-900">{{ recStore.todayVisitors }}</p>
          <p class="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Pengunjung Hari Ini</p>
        </div>
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card text-center">
          <i class="fa-solid fa-sack-dollar text-emerald-500 text-xl mb-1"></i>
          <p class="text-xl font-extrabold text-primary-900">Rp {{ recStore.todayRevenue.toLocaleString('id-ID') }}</p>
          <p class="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Pendapatan Hari Ini</p>
        </div>
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card text-center">
          <i class="fa-solid fa-clock text-blue-500 text-xl mb-1"></i>
          <p class="text-xl font-extrabold text-primary-900">{{ liveTime }}</p>
          <p class="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Waktu Sekarang</p>
        </div>
      </div>

      <!-- Log Kunjungan Hari Ini Card -->
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 class="font-extrabold text-primary-900 text-sm">Daftar Transaksi Kunjungan</h3>
          <div class="flex items-center gap-2">
            <span class="bg-primary-800 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              {{ todayTransactions.length }} Transaksi
            </span>
            <button @click="triggerPrintRekap" class="flex items-center gap-1.5 px-3 py-1.5 border border-primary-200 text-primary-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all">
              <i class="fa-solid fa-print"></i> Cetak Rekap
            </button>
          </div>
        </div>

        <!-- Table Kunjungan -->
        <div class="overflow-x-auto">
          <table class="w-full text-xs">
            <thead>
              <tr class="bg-slate-50 text-left">
                <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">#</th>
                <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Nama</th>
                <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Kategori</th>
                <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Durasi</th>
                <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Pelatih</th>
                <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Kelas</th>
                <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Alat</th>
                <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Harga</th>
                <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Metode</th>
                <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Waktu</th>
                <th class="px-4 py-3 text-center font-bold text-slate-500 uppercase tracking-wider sticky right-0 bg-slate-50 shadow-[-4px_0_8px_rgba(0,0,0,0.04)] z-10">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="(tx, index) in todayTransactions" :key="tx.id" class="hover:bg-slate-50/60 transition-colors">
                <td class="px-4 py-3 font-semibold text-slate-400">{{ index + 1 }}</td>
                <td class="px-4 py-3 font-bold text-primary-900">{{ tx.name }}</td>
                <td class="px-4 py-3">
                  <div class="flex flex-col gap-1">
                    <span :class="[
                      'text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase w-fit',
                      tx.category === 'Member' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                    ]">
                      {{ tx.category }}
                    </span>
                    <span v-if="tx.token" class="text-[10px] font-bold tracking-widest text-accent-600 bg-accent-50 border border-accent-200 rounded-md px-2 py-0.5 mt-0.5 w-fit flex items-center gap-1">
                      <i class="fa-solid fa-key text-[9px]"></i> {{ tx.token }}
                    </span>
                  </div>
                </td>
                <td class="px-4 py-3 text-slate-500">{{ tx.duration || '-' }}</td>
                <td class="px-4 py-3 text-slate-500 truncate max-w-[100px]">{{ tx.trainer || '-' }}</td>
                <td class="px-4 py-3 text-slate-500 truncate max-w-[100px]">{{ tx.kelas || '-' }}</td>
                <td class="px-4 py-3 text-slate-500 truncate max-w-[100px]">{{ tx.alat && tx.alat !== '-' ? tx.alat : '-' }}</td>
                <td class="px-4 py-3 font-bold text-primary-900">Rp {{ tx.amount.toLocaleString('id-ID') }}</td>
                <td class="px-4 py-3 text-slate-600 truncate max-w-[100px]">{{ tx.paymentMethod }}</td>
                <td class="px-4 py-3 text-slate-500 font-semibold whitespace-nowrap">{{ tx.date }} — {{ tx.time }}</td>
                <td class="px-4 py-3 sticky right-0 bg-white shadow-[-4px_0_8px_rgba(0,0,0,0.04)] z-10">
                  <div class="flex items-center justify-center gap-2">
                    <button v-if="tx.category === 'Member'" @click="openCardModal(tx)" class="flex items-center gap-1 text-[10px] font-bold px-2 py-1 border border-accent-500 text-accent-500 rounded-lg hover:bg-accent-50 transition-colors">
                      <i class="fa-solid fa-address-card"></i> Cetak Kartu
                    </button>
                    <button @click="recStore.removeTransaction(tx.id)" class="text-red-400 hover:text-red-600 transition-colors p-1" title="Hapus Kunjungan">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="todayTransactions.length === 0">
                <td colspan="11" class="text-center py-12 text-slate-400">
                  <i class="fa-solid fa-receipt text-3xl block mb-2 text-slate-200"></i>
                  Belum ada data transaksi kunjungan.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Membership Card Preview Modal (Interactive Popup) -->
    <div v-if="showCardModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 max-w-sm w-full">
        <div class="flex justify-between items-center mb-4">
          <h4 class="font-extrabold text-sm text-primary-900">Kartu Membership</h4>
          <button @click="showCardModal = false" class="text-slate-400 hover:text-slate-700">
            <i class="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        <!-- The Membership Card (Visual Mockup) -->
        <div id="visual-member-card" class="bg-gradient-to-tr from-[#132742] via-[#e55e0d] to-[#ffaa2b] text-white rounded-2xl p-4 shadow-xl relative border border-white/20 flex flex-col justify-between overflow-hidden" style="aspect-ratio: 85/55; width: 100%;">
          <!-- Card Decorative Shapes -->
          <div class="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
          <div class="absolute -bottom-10 -left-10 w-24 h-24 bg-black/25 rounded-full blur-lg pointer-events-none"></div>

          <!-- Card Top -->
          <div class="flex items-center justify-between pb-1.5 border-b border-white/15">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-dumbbell text-[#ffcc80] text-base animate-pulse"></i>
              <div>
                <h5 class="text-[10px] font-black tracking-widest leading-none">FITNESS CENTER</h5>
                <span class="text-[7px] font-bold text-[#ffcc80] leading-none uppercase tracking-wider">FV UNY VOKASI</span>
              </div>
            </div>
            <span class="text-[8px] bg-white/20 text-white px-2 py-0.5 rounded-full border border-white/35 uppercase tracking-widest font-black">MEMBER</span>
          </div>

          <!-- Card Content (Frosted glass area) -->
          <div class="bg-white/12 backdrop-blur-md border border-white/15 rounded-xl p-2.5 my-2 flex gap-3 items-center shadow-inner">
            <!-- Left: Avatar Photo -->
            <div class="w-11 h-11 rounded-lg bg-white/15 flex items-center justify-center border border-white/25 flex-shrink-0 text-[#ffb74d]">
              <i class="fa-solid fa-user text-xl"></i>
            </div>
            <!-- Right: Details -->
            <div class="min-w-0 space-y-0.5 text-left">
              <p class="text-xs font-black uppercase truncate text-white leading-tight tracking-wide">{{ activeCard?.name }}</p>
              <p class="text-[8px] text-[#ffe0b2] font-black uppercase tracking-wider">{{ activeCard?.civitas }}</p>
              <p v-if="activeCard?.nim" class="text-[8.5px] font-mono text-white/90 tracking-wider">ID: {{ activeCard?.nim }}</p>
              <p v-else class="text-[8.5px] font-mono text-white/90 tracking-wider">ID: MEM-{{ activeCard?.id.slice(-5) }}</p>
            </div>
          </div>

          <!-- Card Bottom -->
          <div class="flex items-end justify-between pt-1 border-t border-white/15">
            <div class="space-y-0.5 text-left">
              <p class="text-[6.5px] text-white/70 uppercase tracking-widest font-bold">Masa Berlaku</p>
              <p class="text-[9.5px] font-black text-white">{{ activeCardExpiry }}</p>
            </div>
            <!-- Dummy Barcode -->
            <div class="flex flex-col items-center">
              <div class="flex gap-0.5 h-3.5 items-center bg-white/15 px-1 rounded">
                <div v-for="w in [1,2,1,3,1,2,1,1,2,1]" :key="w" :class="['bg-white h-2.5', w === 1 ? 'w-[0.5px]' : w === 2 ? 'w-[1px]' : 'w-[2px]']"></div>
              </div>
              <span class="text-[5.5px] font-mono mt-0.5 text-white/60">UNY-GYM-{{ activeCard?.id.slice(-4) }}</span>
            </div>
          </div>
        </div>

        <button @click="triggerPrintCard" class="w-full mt-5 py-2.5 bg-accent-500 text-white font-bold text-xs rounded-xl hover:bg-accent-600 transition-colors shadow-lg shadow-accent-500/25 flex items-center justify-center gap-1.5">
          <i class="fa-solid fa-print"></i> Cetak Kartu Fisik
        </button>
      </div>
    </div>
  </div>

  <!-- Hidden Print Layout Container (Activated only on Ctrl+P or window.print()) -->
  <div id="print-container" class="print-only font-sans text-black bg-white">
    <!-- Card Print Layout -->
    <div v-if="printType === 'card' && activeCard" class="w-[85mm] h-[55mm] border border-white/20 rounded-2xl p-5 bg-gradient-to-tr from-[#132742] via-[#e55e0d] to-[#ffaa2b] text-white relative flex flex-col justify-between overflow-hidden mx-auto my-12" style="page-break-inside: avoid; aspect-ratio: 85/55; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
      <!-- Card Decorative Shapes -->
      <div class="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
      <div class="absolute -bottom-10 -left-10 w-24 h-24 bg-black/25 rounded-full blur-lg pointer-events-none"></div>

      <!-- Card Top -->
      <div class="flex items-center justify-between pb-2 border-b border-white/20">
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-dumbbell text-[#ffcc80] text-lg"></i>
          <div>
            <h5 class="text-[11px] font-extrabold tracking-widest leading-none text-white">FITNESS CENTER</h5>
            <span class="text-[8px] font-bold text-[#ffcc80] leading-none uppercase tracking-wider">FV UNY VOKASI</span>
          </div>
        </div>
        <span class="text-[8px] bg-white/25 text-white px-2 py-0.5 rounded-full border border-white/40 uppercase tracking-widest font-black">MEMBER</span>
      </div>

      <!-- Card Content (Frosted glass area) -->
      <div class="bg-white/12 border border-white/20 rounded-xl p-3 my-auto flex gap-4 items-center" style="backdrop-filter: blur(8px);">
        <!-- Left: Avatar Photo -->
        <div class="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center border border-white/30 text-[#ffb74d] text-2xl">
          <i class="fa-solid fa-user"></i>
        </div>
        <!-- Right: Details -->
        <div class="min-w-0 space-y-0.5 text-left">
          <p class="text-sm font-black uppercase truncate text-white leading-tight tracking-wide">{{ activeCard.name }}</p>
          <p class="text-[9px] text-[#ffe0b2] font-black uppercase tracking-wider">{{ activeCard.civitas }}</p>
          <p v-if="activeCard.nim" class="text-[9.5px] font-mono text-white/90 tracking-wider">ID: {{ activeCard.nim }}</p>
          <p v-else class="text-[9.5px] font-mono text-white/90 tracking-wider">ID: MEM-{{ activeCard.id.slice(-5) }}</p>
        </div>
      </div>

      <!-- Card Bottom -->
      <div class="flex items-end justify-between pt-1 border-t border-white/20">
        <div class="space-y-0.5 text-left">
          <p class="text-[7px] text-slate-300 uppercase tracking-wider font-bold">Masa Berlaku</p>
          <p class="text-[10px] font-extrabold text-white">{{ activeCardExpiry }}</p>
        </div>
        <div class="flex flex-col items-center">
          <div class="flex gap-0.5 h-4 items-center bg-white/20 px-1 rounded">
            <div v-for="w in [1,2,1,3,1,2,1,1,2,1]" :key="w" :class="['bg-white h-3', w === 1 ? 'w-[0.5px]' : w === 2 ? 'w-[1px]' : 'w-[2px]']"></div>
          </div>
          <span class="text-[6px] font-mono mt-0.5 text-white/60">UNY-GYM-{{ activeCard.id.slice(-4) }}</span>
        </div>
      </div>
    </div>

    <!-- Rekap Print Layout -->
    <div v-if="printType === 'rekap'" class="p-8 space-y-6 max-w-4xl mx-auto">
      <div class="flex items-center justify-between pb-4 border-b-2 border-slate-800">
        <div class="text-left space-y-1">
          <h2 class="text-2xl font-black tracking-wide text-slate-900 uppercase">FITNESS CENTER FV UNY</h2>
          <p class="text-xs text-slate-500 font-bold uppercase tracking-widest">SISTEM MANAJEMEN INTERNAL</p>
          <p class="text-xs text-slate-400">Kampus Wates Vokasi, Universitas Negeri Yogyakarta</p>
        </div>
        <div class="text-right text-xs text-slate-500 space-y-1">
          <p class="font-bold text-slate-800 uppercase tracking-wider">Laporan Rekap Kunjungan</p>
          <p>Tanggal: <span class="font-bold text-slate-800">{{ new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</span></p>
        </div>
      </div>

      <!-- Summary Stats Cards -->
      <div class="grid grid-cols-2 gap-6 pb-4">
        <div class="border border-slate-200 rounded-2xl p-5 text-center bg-slate-50">
          <p class="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Pengunjung Hari Ini</p>
          <p class="text-3xl font-black text-slate-950 mt-1.5">{{ recStore.todayVisitors }} Orang</p>
        </div>
        <div class="border border-slate-200 rounded-2xl p-5 text-center bg-slate-50">
          <p class="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Pendapatan Tiket</p>
          <p class="text-3xl font-black text-emerald-700 mt-1.5">Rp {{ recStore.todayRevenue.toLocaleString('id-ID') }}</p>
        </div>
      </div>

      <!-- Table Logs -->
      <div class="space-y-3">
        <h3 class="text-xs font-black text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-1">Rincian Tiket Pengunjung</h3>
        <table class="w-full text-xs text-left border-collapse">
          <thead>
            <tr class="bg-slate-100 text-slate-700 font-bold border-b-2 border-slate-400">
              <th class="py-3 px-3">No</th>
              <th class="py-3 px-3">Nama Pengunjung</th>
              <th class="py-3 px-3">Civitas</th>
              <th class="py-3 px-3">Kategori</th>
              <th class="py-3 px-3">Durasi</th>
              <th class="py-3 px-3">Fasilitas Tambahan</th>
              <th class="py-3 px-3 text-right">Harga</th>
              <th class="py-3 px-3">Bayar Via</th>
              <th class="py-3 px-3">Waktu</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 text-slate-800">
            <tr v-for="(tx, idx) in todayTransactions" :key="tx.id" class="hover:bg-slate-50/50">
              <td class="py-2.5 px-3 text-slate-400 font-semibold">{{ idx + 1 }}</td>
              <td class="py-2.5 px-3 font-bold text-slate-900">{{ tx.name }}</td>
              <td class="py-2.5 px-3 text-slate-600">{{ tx.civitas }}</td>
              <td class="py-2.5 px-3 font-bold">{{ tx.category }}</td>
              <td class="py-2.5 px-3 text-slate-500">{{ tx.duration || '-' }}</td>
              <td class="py-2.5 px-3 text-[10px] text-slate-500 leading-tight">
                <div v-if="tx.trainer && tx.trainer !== '-'">PT: {{ tx.trainer }}</div>
                <div v-if="tx.kelas && tx.kelas !== '-'">Kelas: {{ tx.kelas }}</div>
                <div v-if="tx.alat && tx.alat !== '-'">Alat: {{ tx.alat }}</div>
                <div v-if="(!tx.trainer || tx.trainer === '-') && (!tx.kelas || tx.kelas === '-') && (!tx.alat || tx.alat === '-')">-</div>
              </td>
              <td class="py-2.5 px-3 font-bold text-slate-900 text-right">Rp {{ tx.amount.toLocaleString('id-ID') }}</td>
              <td class="py-2.5 px-3 text-slate-600">{{ tx.paymentMethod }}</td>
              <td class="py-2.5 px-3 text-slate-500 font-mono">{{ tx.time }}</td>
            </tr>
            <tr v-if="todayTransactions.length === 0">
              <td colspan="9" class="text-center py-10 text-slate-400 font-medium">Tidak ada transaksi terdaftar hari ini.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Signatures -->
      <div class="pt-16 flex justify-between items-center text-xs">
        <div class="text-center w-48 space-y-12">
          <p class="font-bold uppercase tracking-wider text-slate-500">Pemeriksa (Admin)</p>
          <div class="h-[1px] bg-slate-400 w-full mx-auto"></div>
          <p class="font-medium text-slate-400">NIP. .........................</p>
        </div>
        <div class="text-center w-48 space-y-12">
          <p class="font-bold uppercase tracking-wider text-slate-500">Petugas Resepsionis</p>
          <div class="h-[1px] bg-slate-400 w-full mx-auto"></div>
          <p class="font-medium text-slate-400">FV UNY Fitness Center</p>
        </div>
      </div>
    </div>

    <!-- Individual Thermal Receipt Print Layout -->
    <div v-if="printType === 'struk' && activeStruk" class="w-[58mm] text-[10px] font-mono text-black bg-white p-2 mx-auto space-y-3" style="page-break-inside: avoid; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
      <div class="flex items-center gap-2 pb-2 border-b border-dashed border-slate-300 mb-2">
        <img src="/assets/logo.png" class="w-8 h-8 object-contain flex-shrink-0" />
        <div class="text-left leading-tight">
          <h4 class="font-bold text-[11px] tracking-wide text-primary-900">FITNESS CENTER FV UNY</h4>
          <p class="text-[8px] text-slate-500 font-semibold mt-0.5">Kampus Vokasi Wates</p>
        </div>
      </div>
      
      <div class="space-y-0.5 text-[8.5px] text-left">
        <div class="flex justify-between"><span>No. Struk:</span><span>{{ activeStruk.id.slice(-6).toUpperCase() }}</span></div>
        <div class="flex justify-between"><span>Tanggal:</span><span>{{ activeStruk.date }}</span></div>
        <div class="flex justify-between"><span>Waktu:</span><span>{{ activeStruk.time }}</span></div>
        <div class="flex justify-between"><span>Nama:</span><span class="font-bold">{{ activeStruk.name }}</span></div>
        <div class="flex justify-between"><span>Civitas:</span><span>{{ activeStruk.civitas }}</span></div>
        <div class="flex justify-between"><span>Bayar Via:</span><span>{{ activeStruk.paymentMethod }}</span></div>
      </div>
      
      <p class="text-center text-[8px] my-1">--------------------------------</p>
      
      <div class="space-y-1 text-[8.5px] text-left">
        <div class="flex justify-between font-bold">
          <span>Kategori Kunjungan:</span>
          <span>Rp {{ getBasePrice(activeStruk).toLocaleString('id-ID') }}</span>
        </div>
        <div class="pl-2 text-[8px] text-slate-700">
          <span>- {{ activeStruk.category }} {{ activeStruk.duration ? `(${activeStruk.duration})` : '' }}</span>
        </div>
        
        <!-- Add-ons -->
        <div v-if="activeStruk.trainer && activeStruk.trainer !== '-'" class="flex justify-between">
          <span>- PT: {{ activeStruk.trainer }}</span>
          <span>Rp {{ getTrainerPrice(activeStruk.trainer).toLocaleString('id-ID') }}</span>
        </div>
        <div v-if="activeStruk.kelas && activeStruk.kelas !== '-'" class="flex justify-between">
          <span>- Kelas: {{ activeStruk.kelas }}</span>
          <span>Rp {{ getClassPrice(activeStruk.kelas).toLocaleString('id-ID') }}</span>
        </div>
        <div v-if="activeStruk.alat && activeStruk.alat !== '-'" class="flex justify-between">
          <span>- Alat: {{ activeStruk.alat }}</span>
          <span>Rp {{ getEquipmentPrice(activeStruk.alat).toLocaleString('id-ID') }}</span>
        </div>
      </div>
      
      <p class="text-center text-[8px] my-1">--------------------------------</p>
      
      <div class="space-y-0.5 text-[8.5px] font-bold text-left">
        <div v-if="getDiscountAmount(activeStruk) > 0" class="flex justify-between text-red-600">
          <span>Diskon / Potongan:</span>
          <span>-Rp {{ getDiscountAmount(activeStruk).toLocaleString('id-ID') }}</span>
        </div>
        <div class="flex justify-between text-[11px] pt-1">
          <span>TOTAL BAYAR:</span>
          <span>Rp {{ activeStruk.amount.toLocaleString('id-ID') }}</span>
        </div>
      </div>
      
      <p class="text-center text-[8px] my-1">================================</p>
      
      <div class="text-center text-[8px] leading-tight space-y-0.5 pt-1 text-center">
        <p class="font-bold text-center">TERIMA KASIH</p>
        <p class="text-center">SEHAT & BUGAR BERSAMA KAMI</p>
        <p class="text-center">*** LUNAS ***</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { useReceptionistStore } from '@/stores/receptionist.store'
import { useAdminStore } from '@/stores/admin.store'
import { useToast } from '@/composables/useToast'
import { supabase } from '@/lib/supabase'
import type { KasirTransaction } from '@/types/booking'


const recStore = useReceptionistStore()
const adminStore = useAdminStore()
const toast = useToast()

const liveTime = ref('')
let timer: ReturnType<typeof setInterval>

const activeStruk = ref<KasirTransaction | null>(null)
const lastTransaction = ref<KasirTransaction | null>(null)

function triggerPrintStruk(tx: KasirTransaction) {
  activeStruk.value = tx
  printType.value = 'struk'
  setTimeout(() => {
    window.print()
  }, 100)
}

function printLastTransaction() {
  if (lastTransaction.value) {
    triggerPrintStruk(lastTransaction.value)
  }
}

function getBasePrice(tx: KasirTransaction) {
  const civitasId = getCategoryIdFromLabel(tx.civitas)
  const pricing = adminStore.pricing.find(p => p.id === civitasId)
  if (!pricing) return 0
  if (tx.category === 'Insidental') {
    return Number(pricing.incidental_fee)
  } else {
    const durKey = tx.duration === '3 Bulan' ? '3' : '1'
    return Number(pricing.membership_tariffs[durKey] ?? 0)
  }
}

function getTrainerPrice(trainerName?: string) {
  if (!trainerName || trainerName === '-') return 0
  return adminStore.trainers.find(t => t.name === trainerName)?.price || 0
}

function getClassPrice(className?: string) {
  if (!className || className === '-') return 0
  return adminStore.classes.find(c => c.name_id === className)?.price || 0
}

function getEquipmentPrice(equipName?: string) {
  if (!equipName || equipName === '-') return 0
  return adminStore.equipment.find(e => e.name_id === equipName)?.price || 0
}

function getDiscountAmount(tx: KasirTransaction) {
  const base = getBasePrice(tx)
  const PT = getTrainerPrice(tx.trainer)
  const cls = getClassPrice(tx.kelas)
  const eq = getEquipmentPrice(tx.alat)
  const subtotal = base + PT + cls + eq
  const diff = subtotal - tx.amount
  return diff > 0 ? diff : 0
}

function getCategoryIdFromLabel(label?: string) {
  if (!label) return ''
  const l = label.toLowerCase()
  if (l.includes('mahasiswa') || l === 'student') return 'student'
  if (l.includes('alumni') || l === 'alumni') return 'alumni'
  if (l.includes('umum') || l.includes('masyarakat') || l === 'public') return 'public'
  const match = adminStore.pricing.find(p => p.id.toLowerCase() === l || getCategoryLabel(p.id).toLowerCase() === l)
  return match ? match.id : label.toLowerCase().trim().replace(/\s+/g, '_')
}

const showCardModal = ref(false)
const activeCard = ref<KasirTransaction | null>(null)
const printType = ref<'card' | 'rekap' | 'struk'>('card')

const bankList = ref<{ key: string; name: string; number: string }[]>([])

const form = reactive({
  name: '',
  phone: '',
  civitas: '',
  identityNumber: '',
  category: '',
  duration: '',
  trainerId: '',
  classId: '',
  equipmentId: '',
  paymentMethod: 'Tunai',
  selectedBank: '',
  amount: 0,
  selectedDiscountId: '',
})

const discountsConfig = ref<any>(null)

const availableCustomDiscounts = computed(() => {
  if (!form.civitas || !discountsConfig.value) return []
  return discountsConfig.value[form.civitas]?.custom || []
})

// Reset selected discount when civitas changes
watch(() => form.civitas, () => {
  form.selectedDiscountId = ''
})

// Fetch all resources on mount
onMounted(() => {
  adminStore.fetchAll()
  liveTime.value = new Date().toLocaleTimeString('id-ID')
  timer = setInterval(() => {
    liveTime.value = new Date().toLocaleTimeString('id-ID')
  }, 1000)

  // Load banks list
  const stored = localStorage.getItem('fit_uny_banks')
  if (stored) {
    try {
      bankList.value = JSON.parse(stored)
    } catch {
      bankList.value = []
    }
  }

  // Load discounts list
  const storedDisc = localStorage.getItem('fit_uny_discounts')
  if (storedDisc) {
    try {
      discountsConfig.value = JSON.parse(storedDisc)
    } catch {
      discountsConfig.value = null
    }
  }
})

onUnmounted(() => clearInterval(timer))

const today = computed(() => new Date().toISOString().split('T')[0])
const todayTransactions = computed(() =>
  recStore.transactions
    .filter(t => t.type === 'visit')
    .sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time))
)

// Computed expiry date for member card
const activeCardExpiry = computed(() => {
  if (!activeCard.value) return '—'
  const dateStr = activeCard.value.date
  const parts = dateStr.split(/[-/]/)
  if (parts.length < 3) return '—'
  
  let d: Date
  if (parts[0].length === 4) {
    // YYYY-MM-DD
    d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]))
  } else {
    // DD/MM/YYYY
    d = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]))
  }
  
  if (isNaN(d.getTime())) return '—'
  
  const durationText = activeCard.value.duration || '1 Bulan'
  const months = Number(durationText.replace(/[^0-9]/g, '')) || 1
  
  d.setMonth(d.getMonth() + months)
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
})

// Calculate price automatically when civitas, category, duration, or optional features change
const computedAmount = computed(() => {
  if (!form.civitas || !form.category) return 0

  const pricing = adminStore.pricing.find(p => p.id === form.civitas)
  if (!pricing) return 0

  let total = 0

  // 1. Base Fee
  if (form.category === 'Insidental') {
    total += Number(pricing.incidental_fee)
  } else if (form.category === 'Member') {
    total += Number(pricing.registration_fee)
    let durKey = '1'
    if (form.duration === '3 Bulan') durKey = '3'
    
    total += Number(pricing.membership_tariffs[durKey] ?? 0)
  }

  // 2. Add-on Trainer Price
  if (form.trainerId) {
    const t = adminStore.trainers.find(tr => tr.id === form.trainerId)
    if (t) total += Number(t.price)
  }

  // 3. Add-on Class Price
  if (form.classId) {
    const c = adminStore.classes.find(cl => cl.id === form.classId)
    if (c) total += Number(c.price)
  }

  // 4. Add-on Equipment Price
  if (form.equipmentId) {
    const e = adminStore.equipment.find(eq => eq.id === form.equipmentId)
    if (e) total += Number(e.price)
  }

  // 5. Apply Discounts (Base + Custom event)
  let discountPercent = 0
  const civitasKey = form.civitas

  // A. Apply base discount if configured
  if (discountsConfig.value && discountsConfig.value[civitasKey]) {
    const baseDisc = discountsConfig.value[civitasKey]
    if (form.category === 'Member') {
      discountPercent += Number(baseDisc.member || 0)
    } else if (form.category === 'Insidental') {
      discountPercent += Number(baseDisc.incidental || 0)
    }
  }

  // B. Apply custom selected event discount if selected
  if (form.selectedDiscountId && discountsConfig.value) {
    const customList = discountsConfig.value[civitasKey]?.custom || []
    const selectedDisc = customList.find((c: any) => c.id === form.selectedDiscountId)
    if (selectedDisc) {
      discountPercent += Number(selectedDisc.percentage || 0)
    }
  }

  total = total * (1 - Math.min(discountPercent, 100) / 100)
  return Math.round(total)
})

// Watch amount update
watch(computedAmount, (newVal) => {
  form.amount = newVal
})

async function submitKasir() {
  const now = new Date()
  
  // Resolve trainer, class, equipment labels
  const selectedTrainer = adminStore.trainers.find(t => t.id === form.trainerId)?.name || ''
  const selectedClass = adminStore.classes.find(c => c.id === form.classId)?.name_id || ''
  const equipIdx = adminStore.equipment.findIndex(e => e.id === form.equipmentId)
  const selectedEquipment = equipIdx >= 0 ? `Paket Alat #${equipIdx + 1}` : ''

  const finalMethod = form.paymentMethod === 'Transfer Bank' && form.selectedBank
    ? `Transfer Bank - ${form.selectedBank}`
    : form.paymentMethod

  const tx: KasirTransaction = {
    id: Date.now().toString(),
    date: now.toISOString().split('T')[0],
    time: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    name: form.name,
    phone: form.phone || '-',
    civitas: getCategoryLabel(form.civitas),
    category: form.category,
    duration: form.category === 'Member' ? form.duration : '',
    trainer: selectedTrainer,
    kelas: selectedClass,
    alat: selectedEquipment,
    nim: (form.civitas === 'student' || form.civitas === 'alumni') ? form.identityNumber : '',
    amount: form.amount,
    paymentMethod: finalMethod,
    status: 'Lunas',
    type: 'visit',
  }

  // Token Membership generation for Member category
  let generatedToken = ''
  if (form.category === 'Member') {
    let isUnique = false
    let attempts = 0
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    
    while (!isUnique && attempts < 10) {
      let result = ''
      for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      const { data } = await supabase
        .from('member_tokens')
        .select('id')
        .eq('token', result)
        .maybeSingle()
      
      if (!data) {
        generatedToken = result
        isUnique = true
      }
      attempts++
    }

    if (!generatedToken) {
      generatedToken = crypto.randomUUID().replace(/-/g, '').substring(0, 5).toUpperCase()
    }

    tx.token = generatedToken
    
    const months = form.duration === '3 Bulan' ? 3 : 1
    const expiry = new Date()
    expiry.setMonth(expiry.getMonth() + months)

    try {
      const { error } = await supabase.from('member_tokens').insert({
        token: generatedToken,
        name: form.name,
        email: null,
        phone: form.phone || '-',
        status_civitas: form.civitas || 'public',
        duration: form.duration || '1 Bulan',
        registration_date: now.toISOString().split('T')[0],
        expiry_date: expiry.toISOString().split('T')[0],
        visit_count: 0,
        visits_log: []
      })
      if (error) throw error
    } catch (dbErr) {
      console.error('Gagal menyimpan token ke database:', dbErr)
    }
  }

  recStore.addTransaction(tx)
  lastTransaction.value = tx
  
  if (generatedToken) {
    toast.success(`Kunjungan & Pendaftaran Member ${form.name} berhasil dicatat! Token Baru: ${generatedToken}`)
  } else {
    toast.success(`Kunjungan ${form.name} berhasil dicatat!`)
  }
  
  // Reset form
  Object.assign(form, {
    name: '',
    phone: '',
    civitas: '',
    identityNumber: '',
    category: '',
    duration: '',
    trainerId: '',
    classId: '',
    equipmentId: '',
    paymentMethod: 'Tunai',
    selectedBank: '',
    amount: 0,
    selectedDiscountId: '',
  })
}

function getCategoryLabel(id?: string) {
  if (!id) return ''
  if (id === 'student') return 'UNY (Mahasiswa, Tendik/Dosen)'
  if (id === 'alumni') return 'Alumni UNY'
  if (id === 'public') return 'Masyarakat Umum'
  return id.replace(/_/g, ' ').toUpperCase()
}

function openCardModal(tx: KasirTransaction) {
  activeCard.value = tx
  showCardModal.value = true
}

function triggerPrintCard() {
  printType.value = 'card'
  setTimeout(() => {
    window.print()
  }, 100)
}

function triggerPrintRekap() {
  printType.value = 'rekap'
  setTimeout(() => {
    window.print()
  }, 100)
}
</script>


