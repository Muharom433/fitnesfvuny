<template>
  <div class="min-h-screen bg-slate-50 overflow-x-hidden relative text-slate-800">
    
    <!-- VIEW 1: LANDING PAGE -->
    <Transition name="fade" mode="out-in">
      <div v-if="!showLoginForm" class="min-h-screen w-screen relative overflow-y-auto scroll-smooth bg-slate-50 text-slate-800">
        
        <!-- Hero Section (Fold 1) -->
        <div class="h-screen w-full relative flex flex-col items-center justify-center p-4 flex-shrink-0">
          <!-- Background photo -->
          <img
            src="/assets/recepsionis_putih.jpg"
            alt="Fitness Center FV UNY"
            class="absolute inset-0 w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-[3s]"
          />
          <!-- Dark overlay transitioning into light background -->
          <div class="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-900/60 to-slate-50"></div>


          <!-- Distinct Profile Login Button (Pojok Kanan Atas) -->
          <div
            @click="showLoginForm = true"
            class="fixed top-8 right-8 z-30 flex items-center justify-center bg-white text-slate-900 border-2 border-accent-500 rounded-full w-12 h-12 shadow-2xl hover:bg-slate-100 hover:scale-110 active:scale-95 hover:shadow-accent-500/20 transition-all cursor-pointer duration-300"
            title="Login Ke Sistem"
          >
            <i class="fa-solid fa-user-shield text-accent-500 text-lg"></i>
          </div>

          <!-- Landscape Branding Card (Frosted Light Glassmorphism) -->
          <div class="card-float max-w-[800px] w-full bg-white/80 border border-white/40 shadow-2xl backdrop-blur-md rounded-2xl px-8 py-7 z-10 mx-4">
            <!-- Shine sweep -->
            <div class="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div class="shine-sweep"></div>
            </div>

            <!-- Orange line -->
            <div class="anim-line w-8 h-[3px] bg-accent-500 mb-5 rounded-full"></div>

            <!-- Title -->
            <h2 class="anim-title1 text-slate-900 font-extrabold text-3xl leading-none tracking-tight mb-0.5">
              FITNESS CENTER
            </h2>
            <h2 class="anim-title2 text-accent-500 font-extrabold text-3xl leading-none tracking-tight mb-5">
              VOKASI UNY
            </h2>

            <!-- Subtitle row - Removed "SISTEM MANAJEMEN INTERNAL" -->
            <div class="anim-badge-row flex items-center gap-2 mb-6">
              <span class="w-2.5 h-2.5 rounded-full bg-accent-500 animate-pulse"></span>
              <p class="text-slate-600 text-[10px] font-extrabold uppercase tracking-[2px] ml-1">Layanan Informasi</p>
            </div>

            <!-- 4 Styled Info Cards (Membership, Intensitas, Program, Fasilitas) -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <!-- Card 1: Membership -->
              <a href="#membership-info" class="stat-card anim-stat1 bg-slate-100/60 border border-slate-200 rounded-xl px-4 py-3 text-center hover:bg-accent-500 hover:border-accent-500 hover:shadow-lg hover:shadow-accent-500/20 hover:scale-105 active:scale-95 duration-300 transition-all block group shadow-sm">
                <i class="fa-solid fa-id-card-clip text-accent-500 text-lg block mb-1.5 group-hover:text-white transition-colors duration-300"></i>
                <p class="text-slate-800 font-extrabold text-sm uppercase tracking-wide group-hover:text-white transition-colors duration-300">Membership</p>
                <p class="text-slate-500 text-[10px] font-bold mt-1 uppercase group-hover:text-white/90 transition-colors duration-300">{{ memberCount }} Member Aktif</p>
              </a>
              <!-- Card 2: Intensitas (Keramaian) -->
              <a href="#intensity-info" class="stat-card anim-stat2 bg-slate-100/60 border border-slate-200 rounded-xl px-4 py-3 text-center hover:bg-accent-500 hover:border-accent-500 hover:shadow-lg hover:shadow-accent-500/20 hover:scale-105 active:scale-95 duration-300 transition-all block group shadow-sm">
                <i class="fa-solid fa-chart-simple text-accent-500 text-lg block mb-1.5 group-hover:text-white transition-colors duration-300"></i>
                <p class="text-slate-800 font-extrabold text-sm uppercase tracking-wide group-hover:text-white transition-colors duration-300">Intensitas</p>
                <p class="text-slate-500 text-[10px] font-bold mt-1 uppercase group-hover:text-white/90 transition-colors duration-300">{{ bookingCount }} Booking</p>
              </a>
              <!-- Card 3: Program -->
              <a href="#program-info" class="stat-card anim-stat3 bg-slate-100/60 border border-slate-200 rounded-xl px-4 py-3 text-center hover:bg-accent-500 hover:border-accent-500 hover:shadow-lg hover:shadow-accent-500/20 hover:scale-105 active:scale-95 duration-300 transition-all block group shadow-sm">
                <i class="fa-solid fa-calendar-days text-accent-500 text-lg block mb-1.5 group-hover:text-white transition-colors duration-300"></i>
                <p class="text-slate-800 font-extrabold text-sm uppercase tracking-wide group-hover:text-white transition-colors duration-300">Program</p>
                <p class="text-slate-500 text-[10px] font-bold mt-1 uppercase group-hover:text-white/90 transition-colors duration-300">Kelas & PT</p>
              </a>
              <!-- Card 4: Fasilitas -->
              <a href="#facility-info" class="stat-card anim-stat4 bg-slate-100/60 border border-slate-200 rounded-xl px-4 py-3 text-center hover:bg-accent-500 hover:border-accent-500 hover:shadow-lg hover:shadow-accent-500/20 hover:scale-105 active:scale-95 duration-300 transition-all block group shadow-sm">
                <i class="fa-solid fa-dumbbell text-accent-500 text-lg block mb-1.5 group-hover:text-white transition-colors duration-300"></i>
                <p class="text-slate-800 font-extrabold text-sm uppercase tracking-wide group-hover:text-white transition-colors duration-300">Fasilitas</p>
                <p class="text-slate-500 text-[10px] font-bold mt-1 uppercase group-hover:text-white/90 transition-colors duration-300">Alat Lengkap</p>
              </a>
            </div>

            <!-- Scroll Indicator -->
            <div class="mt-8 flex flex-col items-center justify-center gap-1 opacity-70 hover:opacity-100 transition-opacity duration-300">
              <span class="text-[9px] font-bold tracking-widest text-slate-500 uppercase">Scroll untuk info detail</span>
              <i class="fa-solid fa-chevron-down text-accent-500 animate-bounce text-xs"></i>
            </div>
          </div>
        </div>

        <!-- SECTIONS CONTENT (SCROLLABLE FOLDS) -->
        <div class="w-full bg-white">
          
          <!-- SECTION 1: MEMBERSHIP (Tiers & Tariffs) -->
          <section id="membership-info" class="w-full py-20 scroll-mt-20 bg-white">
            <div class="max-w-6xl mx-auto px-6 space-y-8">
              <div class="text-center space-y-2">
                <h3 class="text-2xl font-black text-slate-800 tracking-wide uppercase hover:text-accent-500 transition-colors duration-300">Pilihan Paket Membership</h3>
                <p class="text-xs text-slate-500 font-semibold uppercase tracking-wider">Tarif pendaftaran dan iuran bulanan fitness</p>
                <div class="w-12 h-[3px] bg-accent-500 mx-auto rounded-full mt-3"></div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div v-for="p in adminStore.pricing" :key="p.id" class="bg-white border border-slate-200 rounded-2xl p-6 hover:border-accent-500/50 hover:shadow-xl hover:translate-y-[-6px] shadow-md flex flex-col justify-between transition-all duration-300 group">
                  <div class="space-y-4">
                    <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                      <h4 class="font-extrabold text-sm text-accent-600 uppercase tracking-wider">{{ p.category_name_id }}</h4>
                      <span class="text-[9px] bg-accent-500/10 text-accent-600 font-bold px-2 py-0.5 rounded border border-accent-500/20 uppercase">Tarif Khusus</span>
                    </div>

                    <div class="space-y-3">
                      <div>
                        <span class="text-[10px] text-slate-400 block font-bold uppercase">Registrasi Pertama</span>
                        <span class="text-lg font-black text-slate-800">Rp {{ p.registration_fee.toLocaleString('id-ID') }}</span>
                      </div>
                      <div>
                        <span class="text-[10px] text-slate-400 block font-bold uppercase">Insidental (Per Kedatangan)</span>
                        <span class="text-lg font-black text-slate-800">Rp {{ p.incidental_fee.toLocaleString('id-ID') }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="mt-6 pt-5 border-t border-slate-100 space-y-3 bg-slate-50 p-4 rounded-xl">
                    <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Tarif Member Bulanan:</span>
                    <div class="flex justify-between items-center text-xs text-slate-700">
                      <span>1 Bulan:</span>
                      <span class="font-bold text-slate-800">Rp {{ p.membership_tariffs['1'].toLocaleString('id-ID') }}</span>
                    </div>
                    <div class="flex justify-between items-center text-xs text-slate-700">
                      <span>3 Bulan:</span>
                      <span class="font-bold text-slate-800">Rp {{ p.membership_tariffs['3'].toLocaleString('id-ID') }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- CATEGORY DIVIDER 1 (White to Slate-50 Curve) -->
          <div class="w-full relative bg-white">
            <div class="w-full overflow-hidden leading-none -mb-1">
              <svg class="relative block w-full h-[60px] text-slate-50" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
                <path d="M0,0 C300,90 900,90 1200,0 L1200,120 L0,120 Z"></path>
              </svg>
            </div>
            <div class="absolute inset-0 flex items-center justify-center z-10 group-divider">
              <span class="bg-white border border-slate-200/80 px-4 py-2 rounded-full text-slate-400 group-hover:text-accent-500 group-hover:border-accent-500/50 group-hover:shadow-lg group-hover:shadow-accent-500/10 transition-all duration-300 cursor-pointer text-xs flex items-center gap-2 shadow-sm">
                <i class="fa-solid fa-chart-line divider-icon duration-500"></i>
                <span class="text-[9px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-accent-600 transition-colors duration-300">Intensitas &amp; Operasional</span>
              </span>
            </div>
          </div>

          <!-- SECTION 2: INTENSITAS (Keramaian & Jam Operasional) -->
          <section id="intensity-info" class="w-full py-20 scroll-mt-20 bg-slate-50">
            <div class="max-w-6xl mx-auto px-6 space-y-8">
              <div class="text-center space-y-2">
                <h3 class="text-2xl font-black text-slate-800 tracking-wide uppercase hover:text-accent-500 transition-colors duration-300">Intensitas &amp; Keramaian Latihan</h3>
                <p class="text-xs text-slate-500 font-semibold uppercase tracking-wider">Pantau keramaian dan jam aktif operasional gym</p>
                <div class="w-12 h-[3px] bg-accent-500 mx-auto rounded-full mt-3"></div>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Left: Stats & Operational Hours -->
                <div class="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 flex flex-col justify-between hover:shadow-xl hover:border-accent-500/50 hover:translate-y-[-6px] shadow-md transition-all duration-300">
                  <div class="space-y-4">
                    <h4 class="font-bold text-sm text-accent-600 uppercase tracking-wide">Jam Operasional Resmi</h4>
                    <p class="text-xs text-slate-600 leading-relaxed">
                      Fitness Center FV UNY Wates beroperasi setiap Senin hingga Sabtu untuk memfasilitasi kebugaran Anda.
                    </p>
                    <div class="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <i class="fa-solid fa-clock text-accent-500 text-2xl"></i>
                      <div>
                        <span class="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Senin - Sabtu</span>
                        <span class="text-base font-extrabold text-slate-800">07.00 – 21.00 WIB</span>
                      </div>
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div class="bg-slate-50 p-4 rounded-xl text-center border border-slate-100">
                      <span class="text-[9px] text-slate-400 font-bold block uppercase">Member Aktif Saat Ini</span>
                      <span class="text-xl font-extrabold text-accent-600">{{ memberCount }} Orang</span>
                    </div>
                    <div class="bg-slate-50 p-4 rounded-xl text-center border border-slate-100">
                      <span class="text-[9px] text-slate-400 font-bold block uppercase">Total Booking Jadwal</span>
                      <span class="text-xl font-extrabold text-accent-600">{{ bookingCount }} Transaksi</span>
                    </div>
                  </div>
                </div>

                <!-- Right: Peak Hours info -->
                <div class="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 hover:shadow-xl hover:border-accent-500/50 hover:translate-y-[-6px] shadow-md transition-all duration-300">
                  <h4 class="font-bold text-sm text-accent-600 uppercase tracking-wide">Grafik Perkiraan Jam Ramai</h4>
                  <p class="text-xs text-slate-600">Gunakan acuan ini untuk merencanakan waktu latihan yang nyaman:</p>
                  
                  <div class="space-y-3">
                    <div v-for="item in [
                      { time: '07.00 - 10.00 (Pagi)', label: 'Senggang', pct: '25%', color: 'bg-emerald-500' },
                      { time: '10.00 - 14.00 (Siang)', label: 'Sedang', pct: '50%', color: 'bg-yellow-500' },
                      { time: '14.00 - 17.00 (Sore)', label: 'Cukup Ramai', pct: '75%', color: 'bg-orange-500' },
                      { time: '17.00 - 21.00 (Malam)', label: 'Sangat Ramai (Peak Hour)', pct: '100%', color: 'bg-red-500' }
                    ]" :key="item.time" class="space-y-1">
                      <div class="flex justify-between text-xs font-semibold text-slate-700">
                        <span>{{ item.time }}</span>
                        <span class="text-slate-500 text-[11px] font-bold">{{ item.label }}</span>
                      </div>
                      <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div :class="[item.color, 'h-full rounded-full transition-all duration-1000']" :style="{ width: item.pct }"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- CATEGORY DIVIDER 2 (Slate-50 to White Curve) -->
          <div class="w-full relative bg-slate-50">
            <div class="w-full overflow-hidden leading-none -mb-1">
              <svg class="relative block w-full h-[60px] text-white" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
                <path d="M0,120 C300,30 900,30 1200,120 L1200,0 L0,0 Z"></path>
              </svg>
            </div>
            <div class="absolute inset-0 flex items-center justify-center z-10 group-divider">
              <span class="bg-white border border-slate-200/80 px-4 py-2 rounded-full text-slate-400 group-hover:text-accent-500 group-hover:border-accent-500/50 group-hover:shadow-lg group-hover:shadow-accent-500/10 transition-all duration-300 cursor-pointer text-xs flex items-center gap-2 shadow-sm">
                <i class="fa-solid fa-calendar-days divider-icon duration-500"></i>
                <span class="text-[9px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-accent-600 transition-colors duration-300">Program &amp; Instruktur</span>
              </span>
            </div>
          </div>

          <!-- SECTION 3: PROGRAM KELAS & TRAINER (Programs) -->
          <section id="program-info" class="w-full py-20 scroll-mt-20 bg-white">
            <div class="max-w-6xl mx-auto px-6 space-y-8">
              <div class="text-center space-y-2">
                <h3 class="text-2xl font-black text-slate-800 tracking-wide uppercase hover:text-accent-500 transition-colors duration-300">Program Kelas &amp; Instruktur</h3>
                <p class="text-xs text-slate-500 font-semibold uppercase tracking-wider">Pilihan kelas kebugaran terpandu dan instruktur handal</p>
                <div class="w-12 h-[3px] bg-accent-500 mx-auto rounded-full mt-3"></div>
              </div>

              <!-- Classes Grid -->
              <div class="space-y-4">
                <h4 class="font-extrabold text-sm text-slate-500 uppercase tracking-wider border-l-4 border-accent-500 pl-3">Daftar Program Kelas</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div v-for="c in adminStore.classes" :key="c.id" class="bg-white border border-slate-200 rounded-2xl p-5 hover:border-accent-500/50 hover:shadow-xl hover:translate-y-[-6px] shadow-md flex flex-col justify-between transition-all duration-300 group">
                    <div class="space-y-3">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-accent-55/80 border border-accent-100 flex items-center justify-center text-accent-500 text-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                          <i :class="['fa-solid', c.icon || 'fa-heart-pulse']"></i>
                        </div>
                        <div>
                          <h5 class="font-extrabold text-sm text-slate-800 leading-tight">{{ c.name_id }}</h5>
                          <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{{ c.duration }} | {{ c.level }}</span>
                        </div>
                      </div>
                      <p class="text-[11px] text-slate-600 leading-relaxed line-clamp-3">{{ c.desc_id }}</p>
                    </div>
                    <div class="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                      <span class="text-slate-400">Tarif Tambahan:</span>
                      <span class="font-extrabold text-accent-600">Rp {{ c.price.toLocaleString('id-ID') }}</span>
                    </div>
                  </div>
                  <div v-if="adminStore.classes.length === 0" class="col-span-full text-center py-6 text-slate-400 text-xs">
                    Belum ada kelas terdaftar.
                  </div>
                </div>
              </div>

              <!-- Personal Trainers Grid -->
              <div class="space-y-4 pt-6">
                <h4 class="font-extrabold text-sm text-slate-500 uppercase tracking-wider border-l-4 border-accent-500 pl-3">Personal Trainer Terbaik Kami</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  <div v-for="t in adminStore.trainers" :key="t.id" class="bg-white border border-slate-200 rounded-2xl p-5 text-center hover:border-accent-500/50 hover:shadow-xl hover:translate-y-[-6px] shadow-md transition-all duration-300 space-y-3 group">
                    <div class="w-16 h-16 rounded-full bg-slate-50 mx-auto flex items-center justify-center border-2 border-slate-100 text-accent-500 text-2xl group-hover:scale-110 duration-300 transition-transform">
                      <i class="fa-solid fa-user-ninja"></i>
                    </div>
                    <div>
                      <h5 class="font-extrabold text-sm text-slate-800 leading-tight">{{ t.name }}</h5>
                      <p class="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">{{ t.specialty_id_val }}</p>
                    </div>
                    <div class="pt-2 border-t border-slate-100 text-[11px]">
                      <span class="text-slate-400 block text-[9px] uppercase">Tarif Pelatih</span>
                      <span class="font-extrabold text-accent-600">Rp {{ t.price.toLocaleString('id-ID') }} / sesi</span>
                    </div>
                  </div>
                  <div v-if="adminStore.trainers.length === 0" class="col-span-full text-center py-6 text-slate-400 text-xs">
                    Belum ada trainer terdaftar.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- CATEGORY DIVIDER 3 (White to Slate-50 Curve) -->
          <div class="w-full relative bg-white">
            <div class="w-full overflow-hidden leading-none -mb-1">
              <svg class="relative block w-full h-[60px] text-slate-50" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
                <path d="M0,0 C300,90 900,90 1200,0 L1200,120 L0,120 Z"></path>
              </svg>
            </div>
            <div class="absolute inset-0 flex items-center justify-center z-10 group-divider">
              <span class="bg-white border border-slate-200/80 px-4 py-2 rounded-full text-slate-400 group-hover:text-accent-500 group-hover:border-accent-500/50 group-hover:shadow-lg group-hover:shadow-accent-500/10 transition-all duration-300 cursor-pointer text-xs flex items-center gap-2 shadow-sm">
                <i class="fa-solid fa-dumbbell divider-icon duration-500"></i>
                <span class="text-[9px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-accent-600 transition-colors duration-300">Fasilitas &amp; Peralatan</span>
              </span>
            </div>
          </div>

          <!-- SECTION 4: FASILITAS & ALAT (Facilities) -->
          <section id="facility-info" class="w-full py-20 scroll-mt-20 bg-slate-50">
            <div class="max-w-6xl mx-auto px-6 space-y-8">
              <div class="text-center space-y-2">
                <h3 class="text-2xl font-black text-slate-800 tracking-wide uppercase hover:text-accent-500 transition-colors duration-300">Fasilitas &amp; Paket Peralatan</h3>
                <p class="text-xs text-slate-500 font-semibold uppercase tracking-wider">Perangkat alat penunjang kebugaran terlengkap</p>
                <div class="w-12 h-[3px] bg-accent-500 mx-auto rounded-full mt-3"></div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div v-for="e in adminStore.equipment" :key="e.id" class="bg-white border border-slate-200 rounded-2xl p-6 hover:border-accent-500/50 hover:shadow-xl hover:translate-y-[-6px] shadow-md flex flex-col justify-between transition-all duration-300 group">
                  <div class="space-y-4">
                    <div class="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <div class="w-10 h-10 rounded-xl bg-accent-50/80 border border-accent-100 flex items-center justify-center text-accent-500 text-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                        <i :class="['fa-solid', e.icon || 'fa-dumbbell']"></i>
                      </div>
                      <div>
                        <h4 class="font-extrabold text-sm text-slate-800 leading-tight uppercase">{{ e.name_id }}</h4>
                        <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Paket Akses Tambahan</span>
                      </div>
                    </div>

                    <p class="text-xs text-slate-600 leading-relaxed">{{ e.desc_id }}</p>

                    <!-- Nested Equipment Items -->
                    <div v-if="e.items && e.items.length > 0" class="space-y-2">
                      <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Daftar Alat/Zona:</span>
                      <div class="flex flex-wrap gap-2">
                        <span v-for="item in e.items" :key="item.id" class="bg-slate-50 text-slate-700 border border-slate-200 rounded-lg px-2.5 py-1 text-[10px] font-semibold flex items-center gap-1.5 hover:border-accent-500/40 duration-300">
                          <i :class="['fa-solid text-accent-500', item.icon || 'fa-circle-dot']"></i>
                          {{ item.name_id }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                    <span class="text-slate-400">Tarif Tambahan:</span>
                    <span class="font-extrabold text-accent-600">Rp {{ e.price.toLocaleString('id-ID') }}</span>
                  </div>
                </div>
              </div>
              <div v-if="adminStore.equipment.length === 0" class="text-center py-12 text-slate-400 text-xs">
                Belum ada fasilitas/peralatan terdaftar.
              </div>
            </div>
          </section>

        </div>

        <!-- Footer -->
        <footer class="bg-white border-t border-slate-200 py-16 shadow-inner text-slate-700">
          <div class="max-w-6xl mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
              
              <!-- Column 1: Brand Info -->
              <div class="space-y-4 text-left">
                <div class="flex items-center gap-3">
                  <img src="/assets/logo.png" alt="Logo" class="w-10 h-10 object-contain" />
                  <div>
                    <h3 class="font-extrabold text-primary-900 text-base leading-tight">FITNESS CENTER</h3>
                    <p class="text-accent-500 font-bold text-xs uppercase tracking-wider">FV UNY WATES</p>
                  </div>
                </div>
                <p class="text-xs text-slate-500 leading-relaxed font-medium">
                  Fasilitas kebugaran modern di Kampus Vokasi UNY Wates. Mendukung gaya hidup sehat dan aktif bagi seluruh civitas akademika dan masyarakat umum.
                </p>
              </div>

              <!-- Column 2: Navigasi -->
              <div class="space-y-4 text-left">
                <h4 class="text-primary-900 font-bold text-xs uppercase tracking-wider">Navigasi</h4>
                <ul class="space-y-2.5 text-xs text-slate-500 font-semibold">
                  <li>
                    <a href="#membership-info" class="hover:text-accent-500 transition-colors flex items-center gap-2">
                      <i class="fa-solid fa-chevron-right text-[8px] text-slate-350"></i> Paket Membership
                    </a>
                  </li>
                  <li>
                    <a href="#intensity-info" class="hover:text-accent-500 transition-colors flex items-center gap-2">
                      <i class="fa-solid fa-chevron-right text-[8px] text-slate-350"></i> Intensitas &amp; Keramaian
                    </a>
                  </li>
                  <li>
                    <a href="#program-info" class="hover:text-accent-500 transition-colors flex items-center gap-2">
                      <i class="fa-solid fa-chevron-right text-[8px] text-slate-350"></i> Program Kelas &amp; PT
                    </a>
                  </li>
                  <li>
                    <a href="#facility-info" class="hover:text-accent-500 transition-colors flex items-center gap-2">
                      <i class="fa-solid fa-chevron-right text-[8px] text-slate-350"></i> Fasilitas Latihan
                    </a>
                  </li>
                </ul>
              </div>

              <!-- Column 3: Kontak & Lokasi -->
              <div class="space-y-4 text-left">
                <h4 class="text-primary-900 font-bold text-xs uppercase tracking-wider">Kontak &amp; Lokasi</h4>
                <ul class="space-y-3 text-xs text-slate-500 font-semibold">
                  <li class="flex items-start gap-3">
                    <span class="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 text-xs mt-0.5">
                      <i class="fa-solid fa-map-location-dot"></i>
                    </span>
                    <a href="https://maps.app.goo.gl/LGrWhwmiHJVB6VcJ6" target="_blank" rel="noopener noreferrer" class="hover:text-accent-500 transition-colors leading-tight">
                      Vokasi UNY Wates <br />
                      <span class="text-[10px] text-slate-400 font-medium">Lihat Google Maps</span>
                    </a>
                  </li>
                  <li class="flex items-center gap-3">
                    <span class="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-xs">
                      <i class="fa-regular fa-envelope"></i>
                    </span>
                    <a href="mailto:fv@uny.ac.id" class="hover:text-accent-500 transition-colors">
                      fv@uny.ac.id
                    </a>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center text-green-600 text-xs mt-0.5">
                      <i class="fa-brands fa-whatsapp"></i>
                    </span>
                    <a href="https://wa.me/6285158550034" target="_blank" rel="noopener noreferrer" class="hover:text-accent-500 transition-colors leading-tight">
                      +62 851-5855-0034 <br />
                      <span class="text-[10px] text-slate-400 font-medium">WhatsApp / Call Center</span>
                    </a>
                  </li>
                </ul>
              </div>

              <!-- Column 4: Ikuti Kami -->
              <div class="space-y-4 text-left">
                <h4 class="text-primary-900 font-bold text-xs uppercase tracking-wider">Media Sosial</h4>
                <ul class="space-y-2.5 text-xs text-slate-500 font-semibold">
                  <li class="flex items-center gap-3">
                    <span class="w-7 h-7 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600 text-xs">
                      <i class="fa-brands fa-instagram"></i>
                    </span>
                    <a href="https://www.instagram.com/fvuny.fitnesscenter?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" class="hover:text-accent-500 transition-colors">
                      @fvuny.fitnesscenter
                    </a>
                  </li>
                  <li class="flex items-center gap-3">
                    <span class="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 text-xs">
                      <i class="fa-brands fa-tiktok"></i>
                    </span>
                    <a href="https://www.tiktok.com/@fvunyofficial?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" class="hover:text-accent-500 transition-colors">
                      @fvunyofficial
                    </a>
                  </li>
                  <li class="flex items-center gap-3">
                    <span class="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center text-red-600 text-xs">
                      <i class="fa-brands fa-youtube"></i>
                    </span>
                    <a href="https://www.youtube.com/@FVUNYOfficial" target="_blank" rel="noopener noreferrer" class="hover:text-accent-500 transition-colors">
                      FV UNY Official
                    </a>
                  </li>
                </ul>
              </div>

            </div>

            <!-- Bottom copyright -->
            <div class="mt-12 pt-6 border-t border-slate-150 text-center text-xs text-slate-400 space-y-1">
              <p>© {{ new Date().getFullYear() }} FITNESS CENTER FV UNY VOKASI WATES. Hak Cipta Dilindungi.</p>
              <p class="text-[10px] text-slate-400 font-medium">Sistem Informasi Kebugaran Kampus Wates</p>
            </div>
          </div>
        </footer>

      </div>

      <!-- VIEW 2: FULL PAGE LOGIN VIEW -->
      <div v-else class="min-h-screen w-screen bg-slate-50 flex items-center justify-center relative p-6">
        <!-- Back to Beranda Button (Pojok Kiri Atas) -->
        <button
          @click="showLoginForm = false"
          class="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 bg-white text-slate-600 hover:text-slate-800 hover:bg-slate-50 text-xs font-bold rounded-xl border border-slate-200 shadow-md active:scale-[0.98] transition-all cursor-pointer"
        >
          <i class="fa-solid fa-arrow-left"></i> Kembali ke Beranda
        </button>

        <div class="w-full max-w-[420px] bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-8 space-y-6 mt-12 md:mt-0">
          <!-- Header -->
          <div class="mb-4 text-center flex flex-col items-center">
            <img src="/assets/logo.png" alt="Logo" class="w-14 h-14 object-contain mb-3" />
            <div>
              <span class="text-primary-900 font-extrabold text-base block leading-none">FITNESS CENTER</span>
              <span class="text-accent-500 font-extrabold text-sm block leading-normal mt-1">VOKASI UNY</span>
            </div>
            <h1 class="text-xl font-extrabold text-primary-900 mt-4">Selamat Datang</h1>
            <p class="text-slate-400 text-xs mt-1">Masuk ke sistem manajemen internal</p>
          </div>

          <!-- Form Card -->
          <form @submit.prevent="handleLogin" class="space-y-4" autocomplete="off">
            <!-- Email -->
            <div class="space-y-1.5">
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest" for="email">Email</label>
              <div class="relative">
                <i class="fa-regular fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Masukkan email Anda"
                  autocomplete="off"
                  class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-primary-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all"
                />
              </div>
            </div>

            <!-- Password -->
            <div class="space-y-1.5">
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest" for="password">Password</label>
              <div class="relative">
                <i class="fa-solid fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  placeholder="••••••••"
                  autocomplete="new-password"
                  class="w-full pl-10 pr-11 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-primary-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary-600 transition-colors cursor-pointer"
                >
                  <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" class="text-sm"></i>
                </button>
              </div>
            </div>

            <!-- Error message -->
            <Transition name="fade">
              <div v-if="errorMsg" class="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                <i class="fa-solid fa-circle-xmark text-red-500"></i>
                {{ errorMsg }}
              </div>
            </Transition>

            <!-- Submit -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs text-white bg-accent-500 hover:bg-accent-600 active:scale-[0.98] shadow-lg shadow-accent-500/30 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer mt-2"
            >
              <i v-if="isLoading" class="fa-solid fa-spinner animate-spin"></i>
              <i v-else class="fa-solid fa-right-to-bracket"></i>
              {{ isLoading ? 'Memproses...' : 'Masuk ke Sistem' }}
            </button>
          </form>

          <p class="text-center text-[10px] text-slate-400 mt-4">
            Akses khusus untuk Admin &amp; Resepsionis FITNESS CENTER FV UNY
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { useAdminStore } from '@/stores/admin.store'
import { useToast } from '@/composables/useToast'
import { supabase } from '@/lib/supabase'

const router = useRouter()
const auth = useAuthStore()
const adminStore = useAdminStore()
const toast = useToast()

const form = reactive({ email: '', password: '' })
const showPassword = ref(false)
const isLoading = ref(false)
const errorMsg = ref('')
const showLoginForm = ref(false)

// Real member count from Supabase bookings table
const memberCount = ref('—')
const bookingCount = ref('—')

onMounted(async () => {
  try {
    // Fetch all store configurations (pricing, classes, trainers, equipment)
    adminStore.fetchAll()

    // Count unique members from users table with role 'member'
    const { data: memberData } = await supabase
      .from('users')
      .select('name')
      .eq('role', 'member')

    if (memberData) {
      const uniqueNames = new Set(memberData.map((b: any) => b.name?.toLowerCase().trim()).filter(Boolean))
      memberCount.value = uniqueNames.size > 0 ? `${uniqueNames.size}` : '0'
    }

    // Total bookings
    const { count } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })

    bookingCount.value = count !== null ? `${count}` : '0'
  } catch {
    memberCount.value = '0'
    bookingCount.value = '0'
  }
})

async function handleLogin() {
  errorMsg.value = ''
  isLoading.value = true

  const result = await auth.login(form.email, form.password)

  if (!result.ok) {
    errorMsg.value = result.message
    isLoading.value = false
    return
  }

  toast.success(`Selamat datang, ${auth.currentUser?.name ?? ''}!`)

  if (auth.role === 'admin') {
    router.push({ name: 'admin' })
  } else if (auth.role === 'receptionist') {
    router.push({ name: 'resepsionis' })
  } else {
    errorMsg.value = 'Akun Anda tidak memiliki akses ke sistem ini. Hubungi administrator.'
    await auth.logout()
  }

  isLoading.value = false
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-6px); }

/* ===== Shine sweep ===== */
.shine-sweep {
  position: absolute;
  top: 0;
  left: -150%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
  transform: skewX(-25deg);
  animation: shine 7s infinite ease-in-out;
}
@keyframes shine {
  0%   { left: -150%; }
  40%  { left: 120%; }
  100% { left: 120%; }
}

/* ===== Card gentle float animation ===== */
.card-float {
  animation: cardFloat 4s ease-in-out infinite;
}
@keyframes cardFloat {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-6px); }
}

/* ===== Entrance animations (staggered) ===== */
.anim-badge {
  animation: fadeSlideDown 0.7s cubic-bezier(0.16,1,0.3,1) both;
}
.anim-line {
  animation: fadeSlideUp 0.6s 0.15s cubic-bezier(0.16,1,0.3,1) both;
}
.anim-title1 {
  animation: fadeSlideUp 0.7s 0.25s cubic-bezier(0.16,1,0.3,1) both;
}
.anim-title2 {
  animation: fadeSlideUp 0.7s 0.38s cubic-bezier(0.16,1,0.3,1) both;
}
.anim-badge-row {
  animation: fadeSlideUp 0.6s 0.5s cubic-bezier(0.16,1,0.3,1) both;
}
.anim-stat1 {
  animation: fadeSlideUp 0.55s 0.62s cubic-bezier(0.16,1,0.3,1) both;
}
.anim-stat2 {
  animation: fadeSlideUp 0.55s 0.72s cubic-bezier(0.16,1,0.3,1) both;
}
.anim-stat3 {
  animation: fadeSlideUp 0.55s 0.82s cubic-bezier(0.16,1,0.3,1) both;
}

@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeSlideDown {
  from { opacity: 0; transform: translateY(-16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ===== Stat card hover lift ===== */
.stat-card {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

/* ===== Category divider hover animation ===== */
.group-divider:hover .divider-icon {
  transform: rotate(360deg) scale(1.25);
  color: var(--color-accent-500);
}
.divider-icon {
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s ease;
}
</style>
