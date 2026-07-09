/* -------------------------------------------------------------
   BILINGUAL TRANSLATION DICTIONARY
   ------------------------------------------------------------- */
const translations = {
    id: {
        // Navigation
        nav_home: "Beranda",
        nav_about: "Tentang Kami",
        nav_facilities: "Fasilitas",
        nav_classes: "Kelas",
        nav_membership: "Membership",
        nav_trainers: "Pelatih",
        nav_contact: "Kontak",
        nav_cta: "Daftar Trial",
        nav_admin: "Panel Admin",
        nav_receptionist: "Kasir Resepsionis",

        
        // Hero
        hero_badge: "PUSAT KEBUGARAN KAMPUS PREMIUM",
        hero_title: "DAPATKAN <span class='text-accent-light'>TRIAL GRATIS</span><br>DAN DISKON <span class='text-accent'>MEMBERSHIP UNY</span>",
        hero_subtitle: "Gabung sekarang dan nikmati akses penuh ke area kebugaran modern berstandar atlet. Latihan optimal, aman, dan terjangkau khusus civitas akademika UNY & umum!",
        hero_btn_join: "Pesan Pelatih / Trial",
        hero_btn_explore: "Lihat Biaya Membership",
        hero_feat_1_title: "Alat Standar Atlet",
        hero_feat_1_desc: "Peralatan profesional impor",
        hero_feat_2_title: "Harga Mahasiswa",
        hero_feat_2_desc: "Hemat khusus sivitas UNY",
        hero_feat_3_title: "Pelatih Berlisensi",
        hero_feat_3_desc: "Panduan program latihan & diet",
        
        // About
        about_tag: "KENAPA MEMILIH KAMI?",
        about_title: "KENAPA MEMILIH <span class='text-accent'>FITNESS CENTER</span> FV UNY?",
        about_desc_1: "Fitness Center FV UNY menghadirkan pengalaman fitness yang lengkap dan telah dipercaya oleh civitas akademika dan masyarakat sekitar untuk mewujudkan tubuh sehat bugar.",
        about_desc_2: "Kami mengintegrasikan konsep kebugaran modern dengan lingkungan akademis, menciptakan ruang inklusif di mana mahasiswa, dosen, staf, dan masyarakat sekitar dapat berlatih demi menjaga kebugaran tubuh dan produktivitas harian.",
        about_exp_text: "Tahun Diresmikan",
        about_point_1_title: "Latihan <span class='text-accent'>Mandiri & Terbimbing</span>",
        about_point_1_desc: "Didukung peralatan lengkap berstandar atlet dan didampingi pelatih berlisensi untuk semua target kebugaran Anda.",
        about_point_2_title: "Pilihan Membership yang <span class='text-teal'>Fleksibel</span>",
        about_point_2_desc: "Nikmati tarif hemat khusus mahasiswa UNY, paket insidental harian, hingga membership bulanan tanpa kontrak yang mengikat.",
        about_point_3_title: "Fasilitas <span class='text-accent'>Premium Lengkap</span>",
        about_point_3_desc: "Loker steril berkeamanan khusus, kamar mandi shower air hangat, area full AC, air minum gratis, dan WiFi cepat.",
        
        // Facilities
        facilities_tag: "FASILITAS KAMI",
        facilities_title: "Ruang Kebugaran Berkelas Dunia",
        facilities_subtitle: "Nikmati fasilitas kebugaran premium yang menunjang segala gaya latihan Anda.",
        facility_1_title: "Strength & Weight Area",
        facility_1_desc: "Dilengkapi dengan barbel, dumbel hingga berat maksimal, bumper plate olimpiade, dan rak daya (power rack) modern.",
        facility_2_title: "Cardio Theater Zone",
        facility_2_desc: "Treadmill profesional, sepeda statis, dan elliptical trainers dengan monitor performa jantung terintegrasi.",
        facility_3_title: "Locker & Shower Room",
        facility_3_desc: "Kamar mandi bersih dengan air hangat, loker penyimpanan barang berkeamanan sidik jari, dan ruang ganti yang lega.",
        
        // Classes
        classes_tag: "PROGRAM KELAS",
        classes_title: "Variasi Kelas Kebugaran Grup",
        classes_subtitle: "Aktivitas kelompok dinamis yang seru untuk melatih kekuatan dan membakar kalori bersama pelatih.",
        class_1_title: "Cardio & HIIT Blast",
        class_2_title: "Yoga & Mind Balance",
        class_3_title: "Power Lift & Strength",
        class_4_title: "Spin & Peak Cycling",
        
        // Membership Calculator
        pricing_tag: "BIAYA MEMBERSHIP",
        pricing_title: "Harga Fleksibel Sesuai Kebutuhan",
        pricing_subtitle: "Kami menyediakan skema biaya khusus mahasiswa untuk meringankan biaya akses olahraga premium.",
        calc_title: "Keanggotaan & Biaya",
        calc_desc: "Sesuaikan jenis profil dan durasi kontrak Anda untuk melihat rincian biaya secara langsung.",
        calc_category_label: "Kategori Akses",
        calc_opt_member: "Member (Bulanan)",
        calc_opt_incidental: "Insidental (Harian)",
        calc_profile_label: "Jenis Membership",
        calc_opt_student: "UNY (Civitas)",
        calc_opt_alumni: "Alumni UNY",
        calc_opt_public: "Umum / Publik",
        calc_duration_label: "Durasi Kontrak",
        calc_month_unit: "Bulan",
        calc_student_badge: "MEMBER CIVITAS UNY",
        calc_alumni_badge: "MEMBER ALUMNI UNY",
        calc_public_badge: "MEMBER UMUM / PUBLIK",
        calc_plan_name: "Akses Penuh Gym & Loker",
        calc_period_lbl: "bulan",
        calc_period_day_lbl: "hari",
        calc_total_duration: "Total Durasi",
        calc_discount_lbl: "Total Hemat",
        calc_reg_fee: "Biaya Pendaftaran",
        calc_total_pay: "Total Pembayaran",
        calc_feat_1: "Akses gym tak terbatas (07:00 - 21:00)",
        calc_feat_2: "Fasilitas loker & ruang ganti",
        calc_feat_3: "Konsultasi awal dengan pelatih",
        calc_feat_4: "Bebas mengikuti semua program kelas",
        calc_btn_action: "Daftar Sekarang",
        
        // Trainers
        trainers_tag: "PELATIH KAMI",
        trainers_title: "Bimbingan Profesional Bersama Ahli",
        trainers_subtitle: "Pilih instruktur pribadi berlisensi kami untuk membantu target diet, penurunan berat badan, atau pembentukan otot Anda.",
        trainer_1_special: "Diet & Nutrisi Spesialis",
        trainer_2_special: "Penurunan Berat Badan & Cardio",
        trainer_3_special: "Beban & Kekuatan Spesialis",
        trainer_4_special: "Yoga & Pilates Spesialis",
        trainer_btn_book: "Lihat Profil",
        
        // Booking Wizard
        wiz_title: "Formulir Pendaftaran & Booking",
        wiz_desc: "Silakan lengkapi formulir pendaftaran berikut untuk mulai memesan akses gym, program latihan, atau pelatih kebugaran Anda.",
        wiz_step_1: "Target Program",
        wiz_step_2: "Pelatih Pilihan",
        wiz_step_3: "Data Diri",
        wiz_step_1_title: "Apa target utama yang ingin Anda capai?",
        wiz_goal_diet_title: "Diet & Berat Badan",
        wiz_goal_diet_desc: "Fokus pada rencana makan kalori defisit/surplus.",
        wiz_goal_muscle_title: "Pembentukan Otot",
        wiz_goal_muscle_desc: "Fokus pada peningkatan masa otot & latihan angkat beban.",
        wiz_goal_stamina_title: "Stamina & Kesehatan",
        wiz_goal_stamina_desc: "Fokus pada kebugaran jantung, kelenturan & mobilitas.",
        wiz_step_2_title: "Pilih pelatih pribadi Anda (Opsional)",
        wiz_recom_text: "Rekomendasi pelatih berdasarkan program Anda:",
        wiz_step_3_title: "Lengkapi informasi data diri Anda",
        form_name_lbl: "Nama Lengkap",
        form_phone_lbl: "Nomor WhatsApp (Aktif)",
        form_status_lbl: "Status Civitas",
        form_opt_student: "UNY (Mahasiswa, Tendik/Dosen)",
        form_opt_alumni: "Alumni UNY",
        form_opt_public: "Masyarakat Umum / Publik",
        form_category_lbl: "Kategori Akses",
        form_opt_member: "Member (Bulanan)",
        form_opt_incidental: "Insidental (Harian)",
        form_duration_lbl: "Durasi Kontrak",
        form_time_lbl: "Waktu Latihan Pilihan",
        form_opt_morning: "Pagi (07:00 - 11:00)",
        form_opt_afternoon: "Siang (11:00 - 15:00)",
        form_opt_evening: "Sore/Malam (15:00 - 21:00)",
        wiz_btn_prev: "Kembali",
        wiz_btn_next: "Lanjut",
        wiz_btn_submit: "Kirim & Bayar",
        wiz_trainer_none_title: "Tanpa Pelatih",
        wiz_trainer_none_desc: "Latihan Mandiri (Hanya Membership)",
        
        // Contact
        contact_tag: "KONTAK & LOKASI",
        contact_title: "Hubungi Kami / Datang Langsung",
        contact_desc: "Pintu kami selalu terbuka untuk diskusi kebugaran Anda. Silakan berkunjung ke fitness center di jam operasional resmi kami.",
        contact_loc_title: "Lokasi Fisik",
        contact_loc_desc: "Lantai 1, Dormitory Putra, Jl. Mandung, Serut, Pengasih, Kec. Wates, Kabupaten Kulon Progo, Daerah Istimewa Yogyakarta 55651",
        contact_hours_title: "Jam Operasional",
        contact_hours_desc: "Senin - Sabtu: 07:00 - 21:00 WIB (Minggu Libur)",
        contact_wa_title: "Nomor WhatsApp Admin",
        map_tooltip_sub: "Dormitory Putra Lantai 1",
        
        // Payment & Digital Card
        pay_title: "Metode Pembayaran",
        pay_subtitle: "Pilih Bank Indonesia",
        pay_instruction: "Pilih salah satu rekening Bank Indonesia berikut untuk melakukan transfer pembayaran:",
        pay_acc_no: "Nomor Rekening",
        pay_acc_name: "Nama Penerima",
        pay_total_amount: "Total Transfer",
        pay_btn_confirm: "Konfirmasi Pembayaran",
        pay_btn_cancel: "Batal",
        card_title: "Registrasi Berhasil!",
        card_subtitle: "Kartu Anggota Digital Aktif",
        card_instruction: "Silakan screenshot/simpan Kartu Digital Anda di bawah sebagai bukti pendaftaran fisik:",
        card_status_lbl: "Status",
        card_valid_lbl: "Masa Berlaku",
        card_status_paid: "ACTIVE",
        card_btn_wa: "Kirim ke WhatsApp & Selesai",
        card_btn_wa_text: "Kirim ke WhatsApp & Selesai",
        card_btn_print: "Cetak / Simpan Kartu",
        
        // Modals & Details
        class_detail_dur: "Durasi Sesi",
        class_detail_level: "Tingkat Kesulitan",
        class_detail_desc_title: "Penjelasan Program",
        class_btn_register: "Lihat Biaya & Daftar",
        trainer_detail_bio_title: "Biografi Singkat",
        trainer_detail_quota: "Kuota Sesi",
        trainer_detail_philosophy: "Filosofi",
        trainer_btn_select: "Pilih Pelatih & Booking Sesi",
        
        // Footer
        footer_brand_desc: "Mengembangkan potensi fisik mahasiswa, dosen, serta masyarakat umum di lingkungan akademis Fakultas Vokasi Universitas Negeri Yogyakarta.",
        footer_links_title: "Tautan Cepat",
        footer_campus_title: "Fakultas Vokasi UNY",
        footer_original_link: "Halaman Fitnes Asli",
        
        // Products Store
        nav_products: "Produk",
        products_tag: "PRODUK KAMI",
        products_title: "Peralatan & Suplemen Pilihan",
        products_subtitle: "Temukan produk original pendukung latihan berkualitas tinggi dengan jaminan kualitas terbaik.",
        filter_all: "Semua Produk",
        filter_lifestyle: "Lifestyle",
        filter_perlengkapan: "Perlengkapan Gym",
        filter_protein: "Protein",
        prod_btn_buy: "Beli Sekarang",
        prod_buy_title: "Pemesanan Produk",
        prod_buy_desc: "Lengkapi data pemesanan produk kebugaran pilihan Anda."
    },
    en: {
        // Navigation
        nav_home: "Home",
        nav_about: "About Us",
        nav_facilities: "Facilities",
        nav_classes: "Classes",
        nav_membership: "Membership",
        nav_trainers: "Trainers",
        nav_contact: "Contact",
        nav_cta: "Book Trial",
        nav_admin: "Admin Panel",
        nav_receptionist: "Receptionist Desk",

        
        // Hero
        hero_badge: "PREMIUM UNIVERSITY FITNESS CENTER",
        hero_title: "GET A <span class='text-accent-light'>FREE TRIAL</span><br>AND DISCOUNT ON <span class='text-accent'>UNY MEMBERSHIP</span>",
        hero_subtitle: "Join now and enjoy full access to a modern fitness area with athletic standards. Optimal, safe, and affordable training tailored for UNY civitas & the public!",
        hero_btn_join: "Book Coach / Trial",
        hero_btn_explore: "View Membership Cost",
        hero_feat_1_title: "Athlete-Standard Tools",
        hero_feat_1_desc: "Imported professional gym equipment",
        hero_feat_2_title: "Student-Friendly Rates",
        hero_feat_2_desc: "Special savings for the UNY community",
        hero_feat_3_title: "Licensed Trainers",
        hero_feat_3_desc: "Workout & diet program templates",
        
        // About
        about_tag: "WHY CHOOSE US?",
        about_title: "WHY CHOOSE <span class='text-accent'>FITNESS CENTER</span> FV UNY?",
        about_desc_1: "Fitness Center FV UNY delivers a comprehensive fitness experience trusted by the academic community and general public to achieve dynamic health.",
        about_desc_2: "We integrate modern fitness concepts with the academic environment, creating an inclusive space where students, lecturers, staff, and surrounding neighbors can exercise daily.",
        about_exp_text: "Established Year",
        about_point_1_title: "Independent & <span class='text-accent'>Guided Workouts</span>",
        about_point_1_desc: "Supported by professional athlete-standard equipment and guided by licensed trainers for all your fitness goals.",
        about_point_2_title: "Highly <span class='text-teal'>Flexible Membership</span> Options",
        about_point_2_desc: "Enjoy student-friendly discount rates, daily incidental passes, or monthly memberships with no contract obligations.",
        about_point_3_title: "Full <span class='text-accent'>Premium Facilities</span>",
        about_point_3_desc: "Secure sterilized lockers, clean hot showers, fully air-conditioned spaces, complimentary drinking water, and high-speed WiFi.",
        
        // Facilities
        facilities_tag: "OUR FACILITIES",
        facilities_title: "World Class Training Facility",
        facilities_subtitle: "Enjoy premium fitness facilities tailored to support all your workout variations.",
        facility_1_title: "Strength & Weight Area",
        facility_1_desc: "Fully equipped with barbells, dumbells up to heavy weights, olympic bumper plates, and modern power racks.",
        facility_2_title: "Cardio Theater Zone",
        facility_2_desc: "Professional treadmills, stationary bicycles, and elliptical trainers with built-in heart rate monitors.",
        facility_3_title: "Locker & Shower Room",
        facility_3_desc: "Clean shower rooms with warm water, secure fingerprint lockers, and spacious changing stalls.",
        
        // Classes
        classes_tag: "GROUP PROGRAMS",
        classes_title: "Diverse Group Fitness Classes",
        classes_subtitle: "Dynamic group workouts designed to challenge strength, boost stamina, and burn fat.",
        class_1_title: "Cardio & HIIT Blast",
        class_2_title: "Yoga & Mind Balance",
        class_3_title: "Power Lift & Strength",
        class_4_title: "Spin & Peak Cycling",
        
        // Membership Calculator
        pricing_tag: "MEMBERSHIP FEE",
        pricing_title: "Flexible Plans Made Simple",
        pricing_subtitle: "We offer discounted student pricing to make accessing premium fitness easy and affordable.",
        calc_title: "Membership Details",
        calc_desc: "Choose your profile and contract term to check the calculated price breakdown instantly.",
        calc_category_label: "Access Category",
        calc_opt_member: "Member (Monthly)",
        calc_opt_incidental: "Incidental (Daily)",
        calc_profile_label: "Membership Type",
        calc_opt_student: "UNY (Academics)",
        calc_opt_alumni: "UNY Alumni",
        calc_opt_public: "General Public",
        calc_duration_label: "Contract Term",
        calc_month_unit: "Month",
        calc_save_lbl2: "Save 15%",
        calc_save_lbl3: "Save 25%",
        calc_student_badge: "STUDENT MEMBER",
        calc_public_badge: "GENERAL PUBLIC MEMBER",
        calc_plan_name: "Full Gym & Locker Access",
        calc_period_lbl: "month",
        calc_period_day_lbl: "day",
        calc_total_duration: "Total Duration",
        calc_discount_lbl: "Total Savings",
        calc_total_pay: "Total Payment",
        calc_feat_1: "Unlimited gym access",
        calc_feat_2: "Locker & changing room usage",
        calc_feat_3: "Initial fitness consultation",
        calc_feat_4: "Access to all group class sessions",
        calc_btn_action: "Join Now",
        
        // Trainers
        trainers_tag: "OUR TRAINERS",
        trainers_title: "Professional Guidance with Experts",
        trainers_subtitle: "Choose from our certified personal coaches to help you hit weight loss, nutrition, or muscle targets.",
        trainer_1_special: "Diet & Nutrition Specialist",
        trainer_2_special: "Weight Loss & Cardio Coach",
        trainer_3_special: "Strength Specialist",
        trainer_4_special: "Yoga & Pilates Specialist",
        trainer_btn_book: "View Profile",
        
        // Booking Wizard
        wiz_title: "Registration & Booking Form",
        wiz_desc: "Please complete the registration form below to start booking gym access, workout programs, or personal trainer sessions.",
        wiz_step_1: "Program Goal",
        wiz_step_2: "Choose Coach",
        wiz_step_3: "Personal Details",
        wiz_step_1_title: "What is your main fitness target?",
        wiz_goal_diet_title: "Diet & Weight Loss",
        wiz_goal_diet_desc: "Focused on meal planning and caloric tracking.",
        wiz_goal_muscle_title: "Muscle Building",
        wiz_goal_muscle_desc: "Focused on strength, resistance, and weight lifting.",
        wiz_goal_stamina_title: "Stamina & Wellness",
        wiz_goal_stamina_desc: "Focused on endurance, cardiovascular wellness, and agility.",
        wiz_step_2_title: "Choose your personal trainer (Optional)",
        wiz_recom_text: "Recommended trainer based on your chosen program:",
        wiz_step_3_title: "Fill in your personal information",
        form_name_lbl: "Full Name",
        form_phone_lbl: "WhatsApp Number (Active)",
        form_status_lbl: "Community Status",
        form_opt_student: "UNY Student",
        form_opt_public: "General Public",
        form_category_lbl: "Access Category",
        form_opt_member: "Member (Monthly)",
        form_opt_incidental: "Incidental (Daily)",
        form_duration_lbl: "Contract Duration",
        form_time_lbl: "Preferred Training Time",
        form_opt_morning: "Morning (07:00 - 11:00)",
        form_opt_afternoon: "Afternoon (11:00 - 15:00)",
        form_opt_evening: "Evening (15:00 - 21:00)",
        wiz_btn_prev: "Back",
        wiz_btn_next: "Next",
        wiz_btn_submit: "Pay & Register",
        wiz_trainer_none_title: "No Trainer",
        wiz_trainer_none_desc: "Self-guided Training (Membership Only)",
        
        // Contact
        contact_tag: "CONTACT & LOCATION",
        contact_title: "Get in Touch / Visit Us",
        contact_desc: "Our doors are always open. Drop by during official gym hours to explore the facility and meet our team.",
        contact_loc_title: "Physical Location",
        contact_loc_desc: "Level 1, Dormitory Putra, Jl. Mandung, Serut, Pengasih, Wates District, Kulon Progo Regency, Special Region of Yogyakarta 55651",
        contact_hours_title: "Operational Hours",
        contact_hours_desc: "Monday - Saturday: 07:00 - 21:00 WIB (Sunday Closed)",
        contact_wa_title: "Admin WhatsApp Number",
        map_tooltip_sub: "Dormitory Putra Level 1",
        
        // Payment & Digital Card
        pay_title: "Payment Method",
        pay_subtitle: "Choose Indonesian Bank",
        pay_instruction: "Choose one of the following Indonesian bank accounts to transfer your payment:",
        pay_acc_no: "Account Number",
        pay_acc_name: "Account Holder",
        pay_total_amount: "Total Transfer",
        pay_btn_confirm: "Confirm Payment",
        pay_btn_cancel: "Cancel",
        card_title: "Registration Successful!",
        card_subtitle: "Digital Membership Card Active",
        card_instruction: "Please screenshot/save your Digital Card below as proof of physical registration:",
        card_status_lbl: "Status",
        card_valid_lbl: "Valid Thru",
        card_status_paid: "ACTIVE",
        card_btn_wa: "Send to WhatsApp & Finish",
        card_btn_wa_text: "Send to WhatsApp & Finish",
        card_btn_print: "Print / Save Card",
        
        // Modals & Details
        class_detail_dur: "Session Duration",
        class_detail_level: "Difficulty Level",
        class_detail_desc_title: "Program Details",
        class_btn_register: "View Cost & Register",
        trainer_detail_bio_title: "Short Biography",
        trainer_detail_quota: "Session Quota",
        trainer_detail_philosophy: "Philosophy",
        trainer_btn_select: "Choose Trainer & Book Session",
        
        // Footer
        footer_brand_desc: "Empowering students, academic staff, and community physical wellness in the environment of Vocational Faculty UNY.",
        footer_links_title: "Quick Links",
        footer_campus_title: "Vocational Faculty UNY",
        footer_original_link: "Original Gym Page",
        
        // Products Store
        nav_products: "Products",
        products_tag: "OUR PRODUCTS",
        products_title: "Curated Gear & Supplements",
        products_subtitle: "Find high-quality original products supporting your workout with best quality assurance.",
        filter_all: "All Products",
        filter_lifestyle: "Lifestyle",
        filter_perlengkapan: "Gym Gear",
        filter_protein: "Protein",
        prod_btn_buy: "Buy Now",
        prod_buy_title: "Product Ordering",
        prod_buy_desc: "Complete your fitness product booking details."
    }
};

/* -------------------------------------------------------------
   DEFAULT DATABASE (For fallback if local storage empty)
   ------------------------------------------------------------- */
const DEFAULT_PRICING = {
    student: {
        registration: 0,
        member: {
            1: 150000,
            3: 375000
        },
        incidental: 20000
    },
    alumni: {
        registration: 10000,
        member: {
            1: 150000
        },
        incidental: 35000
    },
    public: {
        registration: 10000,
        member: {
            1: 170000,
            2: 320000,
            3: 460000
        },
        incidental: 35000
    }
};

const DEFAULT_TRAINERS = [
    {
        id: "coach_budi",
        name: "Coach Budi Santoso",
        specialty_id: "trainer_1_special",
        specialty_id_val: "Diet & Nutrisi Spesialis",
        specialty_en: "Diet & Nutrition Specialist",
        quota_filled: 8,
        quota_max: 10,
        bio_id: "Budi Santoso adalah lulusan Ilmu Keolahragaan UNY dengan pengalaman lebih dari 6 tahun di bidang nutrisi dan manajemen berat badan. Memiliki sertifikasi pelatih kebugaran nasional dan ahli gizi olahraga. Ia percaya bahwa kebugaran dimulai dari apa yang kita konsumsi.",
        bio_en: "Budi Santoso is a UNY Sports Science graduate with over 6 years of experience in nutrition and weight management. Certified national fitness coach and sports nutritionist. He believes that fitness starts with what we consume.",
        photo: "assets/trainer_male.png",
        philosophy: "Sehat adalah investasi terbaik hidup Anda.",
        price: 150000
    },
    {
        id: "coach_sarah",
        name: "Coach Sarah Amalia",
        specialty_id: "trainer_2_special",
        specialty_id_val: "Penurunan Berat Badan & Cardio",
        specialty_en: "Weight Loss & Cardio Coach",
        quota_filled: 6,
        quota_max: 10,
        bio_id: "Sarah Amalia adalah spesialis latihan kardiovaskular dan penurunan berat badan wanita. Mantan atlet atletik regional dengan sertifikasi HIIT dan Fungsional Training. Ia telah mendampingi ratusan member mencapai berat badan impian mereka secara sehat.",
        bio_en: "Sarah Amalia is a cardiovascular training and female weight loss specialist. Former regional track athlete certified in HIIT and Functional Training. She has guided hundreds of members to healthy weight loss goals.",
        photo: "assets/trainer_female.png",
        philosophy: "Batasan Anda hanyalah apa yang Anda pikirkan.",
        price: 150000
    },
    {
        id: "coach_rian",
        name: "Coach Rian Wijaya",
        specialty_id: "trainer_3_special",
        specialty_id_val: "Beban & Kekuatan Spesialis",
        specialty_en: "Strength & Conditioning Specialist",
        quota_filled: 5,
        quota_max: 10,
        bio_id: "Rian Wijaya adalah pelatih kekuatan berlisensi dengan spesialisasi Powerlifting dan peningkatan performa atlet. Ia memiliki sertifikasi praktisi beban dari APKI. Sangat ahli dalam mengajarkan teknik squat, bench, dan deadlift yang aman.",
        bio_en: "Rian Wijaya is a licensed strength coach specializing in Powerlifting and athletic performance. He is a certified weight training practitioner from APKI. Highly skilled in teaching safe squat, bench, and deadlift techniques.",
        photo: "assets/trainer_male.png",
        philosophy: "Kekuatan fisik membangun kekuatan mental.",
        price: 150000
    },
    {
        id: "coach_dewi",
        name: "Coach Dewi Lestari",
        specialty_id: "trainer_4_special",
        specialty_id_val: "Yoga & Pilates Spesialis",
        specialty_en: "Yoga & Pilates Specialist",
        quota_filled: 4,
        quota_max: 10,
        bio_id: "Dewi Lestari adalah instruktur Yoga dan Pilates bersertifikat internasional (RYT-200). Berpengalaman mengajar yoga restoratif untuk rehabilitasi cedera dan perbaikan postur tubuh. Fokus pada keseimbangan fisik dan mental.",
        bio_en: "Dewi Lestari is an internationally certified Yoga and Pilates instructor (RYT-200). Experienced in teaching restorative yoga for injury rehabilitation and posture correction. Focuses on physical and mental balance.",
        photo: "assets/trainer_female.png",
        philosophy: "Bernapaslah dan biarkan tubuhmu bergerak dengan harmoni.",
        price: 150000
    }
];

const DEFAULT_CLASSES = [
    {
        id: "class_1",
        name_id: "Cardio & HIIT Blast",
        name_en: "Cardio & HIIT Blast",
        duration: "45 Menit",
        level: "Menengah - Tinggi",
        desc_id: "Cardio & High-Intensity Interval Training (HIIT) dirancang untuk menyelingi periode latihan anaerobik intensitas tinggi dengan pemulihan singkat. Ini sangat efektif membakar lemak dengan cepat, meningkatkan metabolisme tubuh, dan melatih daya tahan kardiovaskular dalam waktu singkat.",
        desc_en: "Cardio & High-Intensity Interval Training (HIIT) alternates short bursts of intense anaerobic exercise with recovery periods. Highly effective for rapid fat burn, boosting metabolism, and training cardiovascular endurance.",
        icon: "fa-fire-flame-simple",
        price: 50000
    },
    {
        id: "class_2",
        name_id: "Yoga & Mind Balance",
        name_en: "Yoga & Mind Balance",
        duration: "60 Menit",
        level: "Pemula - Menengah",
        desc_id: "Kombinasi peregangan mendalam, postur yoga (asana), teknik pernapasan (pranayama), dan meditasi untuk meningkatkan fleksibilitas tubuh, melatih otot inti, memperbaiki postur, dan sangat efektif meredakan stres akademis maupun pekerjaan.",
        desc_en: "A combination of deep stretching, yoga postures (asanas), breathing techniques (pranayama), and meditation to increase flexibility, train core muscles, improve posture, and relieve academic or work stress.",
        icon: "fa-child-reaching",
        price: 50000
    },
    {
        id: "class_3",
        name_id: "Power Lift & Strength",
        name_en: "Power Lift & Strength",
        duration: "50 Menit",
        level: "Menengah",
        desc_id: "Fokus pada penguasaan teknik dasar angkat beban seperti Squat, Bench Press, dan Deadlift secara aman dan terstruktur. Kelas ini membantu meningkatkan kepadatan tulang, membentuk massa otot, dan melatih kekuatan fungsional tubuh sehari-hari.",
        desc_en: "Focuses on mastering fundamental compound weightlifting movements like Squats, Bench Press, and Deadlifts safely and structurally. Helps increase bone density, build muscle mass, and improve daily strength.",
        icon: "fa-bolt",
        price: 50000
    },
    {
        id: "class_4",
        name_id: "Spin & Peak Cycling",
        name_en: "Spin & Peak Cycling",
        duration: "45 Menit",
        level: "Semua Tingkatan",
        desc_id: "Latihan sepeda statis dalam ruangan berenergi tinggi yang dipandu musik ritmis dan instruktur dinamis. Sangat bagus untuk membakar kalori dalam jumlah besar, melatih otot kaki dan gluteus, serta minim dampak benturan pada persendian.",
        desc_en: "An indoor cycling workout set to high-energy music and led by a dynamic instructor. Excellent for burning high calories, strengthening leg muscles, with low impact on the joints.",
        icon: "fa-bicycle",
        price: 50000
    }
];

const DEFAULT_EQUIPMENT = [
    {
        id: "strength",
        name_id: "Strength & Resistance Area",
        name_en: "Strength & Resistance Area",
        desc_id: "Fokus utama bagi para atlet maupun penggiat angkat beban. Kami menyediakan area latihan beban bebas yang luas dan aman untuk melatih kekuatan serta hipertrofi otot secara maksimal.",
        desc_en: "Main focus for athletes or weight lifters. We provide a spacious and safe free weight training area to maximize muscle strength and hypertrophy.",
        icon: "fa-weight-hanging",
        price: 20000,
        items: [
            {
                name_id: "Dumbbell Set Impor",
                name_en: "Imported Dumbbell Set",
                desc_id: "Pasangan dumbbell solid dari 2.5 kg hingga 40 kg.",
                desc_en: "Solid dumbbell pairs from 2.5 kg to 40 kg.",
                icon: "fa-dumbbell"
            },
            {
                name_id: "Olympic Barbells & Plates",
                name_en: "Olympic Barbells & Plates",
                desc_id: "Barbel standar olimpiade dengan bumper plate karet anti pantul.",
                desc_en: "Olympic standard barbells with bounce-free rubber bumper plates.",
                icon: "fa-bars"
            },
            {
                name_id: "Power Racks & Squat Stand",
                name_en: "Power Racks & Squat Stand",
                desc_id: "Dilengkapi pengaman besi kokoh untuk squat dan bench press mandiri.",
                desc_en: "Equipped with sturdy safety guards for independent squats and bench press.",
                icon: "fa-grip-lines-vertical"
            },
            {
                name_id: "Cable Crossover Machine",
                name_en: "Cable Crossover Machine",
                desc_id: "Katrol beban yang dapat disesuaikan untuk latihan isolasi seluruh tubuh.",
                desc_en: "Adjustable cable crossover pulley for full-body isolation exercises.",
                icon: "fa-arrows-to-eye"
            }
        ]
    },
    {
        id: "cardio",
        name_id: "Cardio Theater Zone",
        name_en: "Cardio Theater Zone",
        desc_id: "Latih stamina kardiovaskular Anda dengan mesin kardio canggih yang dilengkapi dengan monitor detak jantung terintegrasi untuk melacak performa pembakaran kalori secara real-time.",
        desc_en: "Train your cardiovascular stamina with advanced cardio machines equipped with integrated heart rate monitors to track calorie burn performance in real-time.",
        icon: "fa-heart-pulse",
        price: 20000,
        items: [
            {
                name_id: "Treadmill Komersial",
                name_en: "Commercial Treadmill",
                desc_id: "Peredam getaran optimal, kecepatan dan kemiringan otomatis.",
                desc_en: "Optimal vibration absorption, auto speed and incline control.",
                icon: "fa-person-running"
            },
            {
                name_id: "Sepeda Statis & Spin Bike",
                name_en: "Stationary Bike & Spin Bike",
                desc_id: "Sistem resistensi magnetik yang sunyi dan sangat presisi.",
                desc_en: "Silent and highly precise magnetic resistance system.",
                icon: "fa-bicycle"
            },
            {
                name_id: "Elliptical Trainers",
                name_en: "Elliptical Trainers",
                desc_id: "Minim dampak benturan pada persendian lutut dan pergelangan kaki.",
                desc_en: "Low impact on knee and ankle joints.",
                icon: "fa-ellipsis-vertical"
            }
        ]
    },
    {
        id: "functional",
        name_id: "Functional & Conditioning",
        name_en: "Functional & Conditioning",
        desc_id: "Peralatan dinamis untuk melatih kelincahan, daya ledak (power), fleksibilitas, dan kekuatan fungsional inti (core strength).",
        desc_en: "Dynamic equipment to train agility, power, flexibility, and functional core strength.",
        icon: "fa-bolt",
        price: 20000,
        items: [
            {
                name_id: "Medicine & Kettlebells",
                name_en: "Medicine & Kettlebells",
                desc_id: "Bahan besi cor dan karet premium untuk latihan dinamis ayunan.",
                desc_en: "Premium cast iron and rubber materials for dynamic swing workouts.",
                icon: "fa-basketball"
            },
            {
                name_id: "TRX Suspension Trainer",
                name_en: "TRX Suspension Trainer",
                desc_id: "Latihan berat badan sendiri untuk kestabilan sendi dan otot inti.",
                desc_en: "Bodyweight exercises for joint stability and core strength.",
                icon: "fa-lines-leaning"
            }
        ]
    }
];

function getBankAccounts() {
    const saved = localStorage.getItem("fit_uny_banks");
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error("Failed to parse fit_uny_banks", e);
        }
    }
    const defaultBanks = [
        { key: "bca", name: "BCA (Bank Central Asia)", number: "8023-1122-3344" },
        { key: "mandiri", name: "Bank Mandiri", number: "137-00-5566-7788" },
        { key: "bni", name: "BNI (Bank Negara Indonesia)", number: "0234-9988-77" },
        { key: "bri", name: "BRI (Bank Rakyat Indonesia)", number: "6023-01-002233-53-4" }
    ];
    localStorage.setItem("fit_uny_banks", JSON.stringify(defaultBanks));
    return defaultBanks;
}

const BANK_ACCOUNTS = new Proxy({}, {
    get(target, key) {
        const banks = getBankAccounts();
        const found = banks.find(b => b.key === key);
        return found || { name: key, number: "" };
    }
});

/* -------------------------------------------------------------
   STATE VARIABLES
   ------------------------------------------------------------- */
let currentLanguage = 'id';
let currentCategory = 'member'; // 'member' or 'incidental'
let currentProfile = 'student'; // 'student' or 'public'
let currentDuration = 1; // 1, 3, 6, 12 months
let bookingStep = 1;
let selectedGoalValue = '';
let selectedTrainerValue = 'Tanpa Pelatih';
let selectedBankKey = 'bca';

// Transient form values stored during payment flow
let clientNameGlobal = '';
let clientPhoneGlobal = '';
let clientStatusGlobal = '';
let clientCategoryGlobal = '';
let clientDurationGlobal = 1;
let clientTimeGlobal = '';
let totalPayGlobal = 0;
let registrationDateGlobal = '';
let expiryDateGlobal = '';
let memberIdGlobal = '';
let selectedClassGlobal = 'Tidak memilih';
let selectedEquipmentGlobal = 'Tidak memilih';


/* -------------------------------------------------------------
   INITIALIZATION
   ------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    // Make sure local storage is populated with defaults if missing
    initializeDatabase();

    // Scroll header styling
    window.addEventListener("scroll", () => {
        const navbar = document.getElementById("navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Mobile nav toggle
    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");
    
    mobileToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        const isOpened = navMenu.classList.contains("active");
        mobileToggle.innerHTML = isOpened 
            ? '<i class="fa-solid fa-xmark"></i>' 
            : '<i class="fa-solid fa-bars-staggered"></i>';
    });

    // Close mobile nav when clicking nav link & switch views
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (href.startsWith("#")) {
                e.preventDefault();
                navMenu.classList.remove("active");
                mobileToggle.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
                
                // Route navigation
                switchView(href);
            }
        });
    });

    // Initialize SPA Switcher based on current hash
    initViewSwitcher();

    // Add click listeners to group fitness class cards
    initClassClickHandlers();

    // Render trainers dynamically
    renderTrainers();

    // Load language preferences
    loadLanguagePreference();
    
    // Initialize form durations select dropdown
    updateFormDurations();
    if (document.getElementById("heroStatus")) {
        updateHeroDurations();
        toggleHeroDurationField();
    }
    
    // Populate dynamic addon dropdown options
    populateAddonOptions();
    
    // Hook autocomplete search lists
    if (document.getElementById("heroName")) {
        initMemberAutocomplete("heroName", (member) => {
            document.getElementById("heroName").value = member.name;
            document.getElementById("heroPhone").value = member.phone || "";
            
            const statusSelect = document.getElementById("heroStatus");
            if (statusSelect) {
                statusSelect.value = member.status;
                updateHeroDurations();
            }
            
            const catSelect = document.getElementById("heroCategory");
            if (catSelect) {
                catSelect.value = member.category;
                toggleHeroDurationField();
            }
            
            if (member.category === "Member" && member.duration) {
                const durSelect = document.getElementById("heroDuration");
                if (durSelect) {
                    const months = parseInt(member.duration);
                    if (months) durSelect.value = months;
                }
            }
            
            if (member.class) {
                const classSelect = document.getElementById("heroClass");
                if (classSelect) {
                    const classes = getClasses();
                    const clObj = classes.find(c => c.name_id === member.class);
                    if (clObj) classSelect.value = clObj.id;
                }
            }
            if (member.equipment) {
                const equipSelect = document.getElementById("heroEquipment");
                if (equipSelect) {
                    const equipment = getEquipment();
                    const eqObj = equipment.find(e => e.name_id === member.equipment);
                    if (eqObj) equipSelect.value = eqObj.id;
                }
            }
            if (member.trainer) {
                const trainerSelect = document.getElementById("heroTrainer");
                if (trainerSelect) {
                    const trainers = getTrainers();
                    const trObj = trainers.find(t => t.name === member.trainer);
                    if (trObj) trainerSelect.value = trObj.id;
                }
            }
            
            updateHeroFormPrice();
        });
    }

    if (document.getElementById("clientName")) {
        initMemberAutocomplete("clientName", (member) => {
            document.getElementById("clientName").value = member.name;
            document.getElementById("clientPhone").value = member.phone || "";
            
            const statusSelect = document.getElementById("clientStatus");
            if (statusSelect) {
                statusSelect.value = member.status;
                updateFormDurations();
            }
            
            const catSelect = document.getElementById("clientCategory");
            if (catSelect) {
                catSelect.value = member.category;
                toggleFormDurationField();
            }
            
            if (member.category === "Member" && member.duration) {
                const durSelect = document.getElementById("clientDuration");
                if (durSelect) {
                    const months = parseInt(member.duration);
                    if (months) durSelect.value = months;
                }
            }
            
            if (member.class) {
                const classSelect = document.getElementById("clientClass");
                if (classSelect) {
                    const classes = getClasses();
                    const clObj = classes.find(c => c.name_id === member.class);
                    if (clObj) classSelect.value = clObj.id;
                }
            }
            if (member.equipment) {
                const equipSelect = document.getElementById("clientEquipment");
                if (equipSelect) {
                    const equipment = getEquipment();
                    const eqObj = equipment.find(e => e.name_id === member.equipment);
                    if (eqObj) equipSelect.value = eqObj.id;
                }
            }
            
            if (member.trainer) {
                const trainers = getTrainers();
                const trObj = trainers.find(t => t.name === member.trainer);
                if (trObj) {
                    selectTrainerRadio(trObj.id, trObj.name);
                } else {
                    selectTrainerRadio("NoTrainer", "Tanpa Pelatih");
                }
            }
            
            updateWizardFormPrice();
        });
    }

    // Calculate membership values
    calculateMembership();

    // Update initial pricing previews
    updateHeroFormPrice();
    updateWizardFormPrice();

    // Render products catalog
    renderProducts();

    // Close modal when clicking on background overlay
    const modals = document.querySelectorAll(".custom-modal");
    modals.forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                const id = modal.getAttribute("id");
                if (id === "classDetailsModal") closeClassModal();
                else if (id === "trainerProfileModal") closeTrainerModal();
                else if (id === "paymentModal") closePaymentModal();
                else if (id === "amenityDetailsModal") closeAmenityModal();
                else if (id === "productPurchaseModal") closeProductPurchaseModal();
            }
        });
    });
});

/* -------------------------------------------------------------
   DATABASE SYNC & INITIALIZATION
   ------------------------------------------------------------- */
const DEFAULT_CONTACT_LINKS = {
    wa_phone: "6285158907972",
    wa_display: "+62 851-5890-7972",
    youtube: "https://www.youtube.com/@FVUNYOfficial",
    youtube_display: "@FVUNYOfficial",
    email: "fv@uny.ac.id",
    instagram: "https://www.instagram.com/fvuny.fitnesscenter",
    instagram_display: "@fvuny.fitnesscenter",
    website: "http://fv.uny.ac.id",
    website_display: "fv.uny.ac.id",
    maps_url: "https://maps.google.com/maps?q=45W7%2BPWC,+Serut,+Wates,+Kec.+Pengasih,+Kabupaten+Kulon+Progo,+Daerah+Istimewa+Yogyakarta+55652&t=&z=17&ie=UTF8&iwloc=&output=embed"
};

function loadCustomTranslations() {
    const saved = localStorage.getItem("fit_uny_translations");
    if (saved) {
        try {
            const custom = JSON.parse(saved);
            if (custom.id) Object.assign(translations.id, custom.id);
            if (custom.en) Object.assign(translations.en, custom.en);
        } catch (e) {
            console.error("Failed to load custom translations", e);
        }
    }
}

function bindDynamicContactInfo() {
    const links = JSON.parse(localStorage.getItem("fit_uny_contact_links")) || DEFAULT_CONTACT_LINKS;
    
    // Header & Page Socials
    const contactWa = document.getElementById("link_contact_wa");
    if (contactWa) {
        contactWa.href = `https://wa.me/${links.wa_phone}`;
        const textVal = contactWa.querySelector(".contact-text-value");
        if (textVal) {
            textVal.innerText = links.wa_display;
        } else {
            contactWa.innerText = links.wa_display;
        }
    }
    const contactYt = document.getElementById("link_contact_yt");
    if (contactYt) {
        contactYt.href = links.youtube;
        const textVal = contactYt.querySelector(".contact-text-value");
        if (textVal) {
            textVal.innerText = links.youtube_display;
        } else {
            contactYt.innerText = links.youtube_display;
        }
    }
    const contactEmail = document.getElementById("link_contact_email");
    if (contactEmail) {
        contactEmail.href = `mailto:${links.email}`;
        const textVal = contactEmail.querySelector(".contact-text-value");
        if (textVal) {
            textVal.innerText = links.email;
        } else {
            contactEmail.innerText = links.email;
        }
    }
    const contactIg = document.getElementById("link_contact_ig");
    if (contactIg) {
        contactIg.href = links.instagram;
        const textVal = contactIg.querySelector(".contact-text-value");
        if (textVal) {
            textVal.innerText = links.instagram_display;
        } else {
            contactIg.innerText = links.instagram_display;
        }
    }
    const contactWeb = document.getElementById("link_contact_web");
    if (contactWeb) {
        contactWeb.href = links.website;
        const textVal = contactWeb.querySelector(".contact-text-value");
        if (textVal) {
            textVal.innerText = links.website_display;
        } else {
            contactWeb.innerText = links.website_display;
        }
    }
    
    // Footer Socials
    const footerIg = document.getElementById("footer_link_ig");
    if (footerIg) {
        footerIg.href = links.instagram;
        footerIg.innerHTML = `<i class="fa-brands fa-instagram"></i> Instagram: ${links.instagram_display}`;
    }
    const footerYt = document.getElementById("footer_link_yt");
    if (footerYt) {
        footerYt.href = links.youtube;
        footerYt.innerHTML = `<i class="fa-brands fa-youtube"></i> YouTube: ${links.youtube_display}`;
    }
    const footerWa = document.getElementById("footer_link_wa");
    if (footerWa) {
        footerWa.href = `https://wa.me/${links.wa_phone}`;
        footerWa.innerHTML = `<i class="fa-brands fa-whatsapp"></i> WhatsApp: ${links.wa_display}`;
    }
    const footerEmail = document.getElementById("footer_link_email");
    if (footerEmail) {
        footerEmail.href = `mailto:${links.email}`;
        footerEmail.innerHTML = `<i class="fa-solid fa-envelope"></i> E-mail: ${links.email}`;
    }
    
    // Maps
    const mapIframe = document.getElementById("map_iframe");
    if (mapIframe) {
        mapIframe.src = links.maps_url;
    }
}

function renderBankOptions() {
    const banks = getBankAccounts();
    
    const paymentContainer = document.getElementById("paymentBankSelectContainer");
    if (paymentContainer) {
        paymentContainer.innerHTML = "";
        banks.forEach((b, index) => {
            const isActive = index === 0 ? "active" : "";
            const words = b.name.split(" ");
            let logoText = "";
            if (words[0].toLowerCase() === "bank" && words.length > 1) {
                logoText = words[1].toUpperCase();
            } else {
                logoText = words[0].toUpperCase();
            }
            logoText = logoText.replace(/[()]/g, "");
            const displayLabel = b.name;
            paymentContainer.innerHTML += `
                <div class="bank-option-card ${isActive}" id="bank_${b.key}" onclick="selectBank('${b.key}')">
                    <span class="bank-logo-text ${b.key}">${logoText}</span>
                    <span class="bank-name-lbl">${displayLabel}</span>
                </div>
            `;
        });
    }

    const productContainer = document.getElementById("productBankSelectContainer");
    if (productContainer) {
        productContainer.innerHTML = "";
        banks.forEach((b, index) => {
            const isActive = index === 0 ? "active" : "";
            const words = b.name.split(" ");
            let logoText = "";
            if (words[0].toLowerCase() === "bank" && words.length > 1) {
                logoText = words[1].toUpperCase();
            } else {
                logoText = words[0].toUpperCase();
            }
            logoText = logoText.replace(/[()]/g, "");
            const displayLabel = b.name;
            productContainer.innerHTML += `
                <div class="bank-option-card ${isActive}" id="prodBank_${b.key}" onclick="selectProdBank('${b.key}')">
                    <span class="bank-logo-text ${b.key}">${logoText}</span>
                    <span class="bank-name-lbl">${displayLabel}</span>
                </div>
            `;
        });
    }
}

function initializeDatabase() {
    loadCustomTranslations();

    if (!localStorage.getItem("fit_uny_contact_links")) {
        localStorage.setItem("fit_uny_contact_links", JSON.stringify(DEFAULT_CONTACT_LINKS));
    }

    bindDynamicContactInfo();

    let storedPricing = localStorage.getItem("fit_uny_pricing");
    if (!storedPricing || !JSON.parse(storedPricing).student) {
        localStorage.setItem("fit_uny_pricing", JSON.stringify(DEFAULT_PRICING));
    }
    
    // Trainers Migration
    let storedTrainers = localStorage.getItem("fit_uny_trainers");
    if (!storedTrainers) {
        localStorage.setItem("fit_uny_trainers", JSON.stringify(DEFAULT_TRAINERS));
    } else {
        try {
            let trs = JSON.parse(storedTrainers);
            let updated = false;
            trs.forEach(t => {
                if (t.price === undefined) {
                    t.price = 150000;
                    updated = true;
                }
            });
            if (updated) {
                localStorage.setItem("fit_uny_trainers", JSON.stringify(trs));
            }
        } catch (e) {
            console.error("Migration trainers failed", e);
        }
    }

    if (!localStorage.getItem("fit_uny_gym_info")) {
        localStorage.setItem("fit_uny_gym_info", JSON.stringify({ established_year: "2023" }));
    }

    // Classes Migration
    let storedClasses = localStorage.getItem("fit_uny_classes");
    if (!storedClasses) {
        localStorage.setItem("fit_uny_classes", JSON.stringify(DEFAULT_CLASSES));
    } else {
        try {
            let cls = JSON.parse(storedClasses);
            let updated = false;
            cls.forEach(c => {
                if (c.price === undefined) {
                    c.price = 50000;
                    updated = true;
                }
            });
            if (updated) {
                localStorage.setItem("fit_uny_classes", JSON.stringify(cls));
            }
        } catch (e) {
            console.error("Migration classes failed", e);
        }
    }

    if (!localStorage.getItem("fit_uny_registrations")) {
        localStorage.setItem("fit_uny_registrations", JSON.stringify([]));
    }
    if (!localStorage.getItem("fit_uny_amenities")) {
        localStorage.setItem("fit_uny_amenities", JSON.stringify(DEFAULT_AMENITIES));
    }
    if (!localStorage.getItem("fit_uny_products")) {
        localStorage.setItem("fit_uny_products", JSON.stringify(DEFAULT_PRODUCTS));
    }

    // Equipment Migration
    let storedEquipment = localStorage.getItem("fit_uny_equipment");
    if (!storedEquipment) {
        localStorage.setItem("fit_uny_equipment", JSON.stringify(DEFAULT_EQUIPMENT));
    } else {
        try {
            let eqs = JSON.parse(storedEquipment);
            let updated = false;
            eqs.forEach(e => {
                if (e.price === undefined) {
                    e.price = 20000;
                    updated = true;
                }
            });
            if (updated) {
                localStorage.setItem("fit_uny_equipment", JSON.stringify(eqs));
            }
        } catch (e) {
            console.error("Migration equipment failed", e);
        }
    }

    // Apply established year from database to UI
    const gymInfo = JSON.parse(localStorage.getItem("fit_uny_gym_info"));
    const expNumEl = document.querySelector(".exp-num");
    if (expNumEl && gymInfo && gymInfo.established_year) {
        expNumEl.innerText = gymInfo.established_year;
    }

    // Render bank options dynamically
    renderBankOptions();
}

function getPricing() {
    return JSON.parse(localStorage.getItem("fit_uny_pricing")) || DEFAULT_PRICING;
}

function getTrainers() {
    return JSON.parse(localStorage.getItem("fit_uny_trainers")) || DEFAULT_TRAINERS;
}

function getClasses() {
    return JSON.parse(localStorage.getItem("fit_uny_classes")) || DEFAULT_CLASSES;
}

function getAmenities() {
    return JSON.parse(localStorage.getItem("fit_uny_amenities")) || DEFAULT_AMENITIES;
}

function getProducts() {
    return JSON.parse(localStorage.getItem("fit_uny_products")) || DEFAULT_PRODUCTS;
}

function getEquipment() {
    return JSON.parse(localStorage.getItem("fit_uny_equipment")) || DEFAULT_EQUIPMENT;
}

/* -------------------------------------------------------------
   SPA NAVIGATION VIEW SWITCHER
   ------------------------------------------------------------- */
function switchView(targetHash) {
    // Clean target hash
    if (!targetHash || targetHash === "#" || targetHash === "#home") {
        targetHash = "#home";
    }

    // Update URL hash without jumping page automatically
    history.pushState(null, null, targetHash);

    // Update navigation active states
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.classList.remove("active");
        const href = link.getAttribute("href");
        if (href === targetHash || (targetHash === "#booking" && href === "#trainers")) {
            link.classList.add("active");
        }
    });

    // Smooth scroll to the target element
    let targetId = targetHash.substring(1);
    if (targetHash === "#booking") targetId = "booking";
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
    }
}

function initViewSwitcher() {
    // Listen for hashchange events
    window.addEventListener("hashchange", () => {
        switchView(window.location.hash);
    });

    // Trigger initial view setup
    const currentHash = window.location.hash || "#home";
    switchView(currentHash);
}

/* -------------------------------------------------------------
   DYNAMIC RENDER TRAINERS
   ------------------------------------------------------------- */
function renderTrainers() {
    const trainers = getTrainers();
    
    // Render in landing page trainers-grid
    const container = document.getElementById("trainersContainer");
    if (container) {
        container.innerHTML = "";
        trainers.forEach((coach, index) => {
            const specialty = currentLanguage === 'id' ? coach.specialty_id_val : coach.specialty_en;
            const bio = currentLanguage === 'id' ? coach.bio_id : coach.bio_en;
            const quotaTxt = currentLanguage === 'id' 
                ? `Kuota: <span class="quota-val">${coach.quota_filled}/${coach.quota_max}</span>`
                : `Quota: <span class="quota-val">${coach.quota_filled}/${coach.quota_max}</span>`;
            const btnTxt = translations[currentLanguage]["trainer_btn_book"];

            container.innerHTML += `
                <div class="trainer-card" onclick="showTrainerProfile('${coach.id}')">
                    <div class="trainer-img-wrap">
                        <img src="${coach.photo}" alt="${coach.name}" class="trainer-img">
                        <div class="trainer-socials">
                            <a href="#"><i class="fa-brands fa-instagram"></i></a>
                            <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div class="trainer-info">
                        <span class="trainer-specialty">${specialty}</span>
                        <h3>${coach.name}</h3>
                        <p class="trainer-quota-badge ${coach.quota_filled >= coach.quota_max ? 'full' : ''}">
                            <i class="fa-solid fa-users"></i> ${quotaTxt}
                        </p>
                        <button class="btn btn-accent btn-sm btn-block" style="margin-top: 15px;">${btnTxt}</button>
                    </div>
                </div>
            `;
        });
    }

    // Render choices in Booking Form step 2
    const wizardContainer = document.getElementById("wizardTrainersContainer");
    if (wizardContainer) {
        wizardContainer.innerHTML = "";
        
        trainers.forEach((coach, index) => {
            const specialty = currentLanguage === 'id' ? coach.specialty_id_val : coach.specialty_en;
            
            wizardContainer.innerHTML += `
                <label class="trainer-select-card" id="lbl_${coach.id}" onclick="selectTrainerRadio('${coach.id}', '${coach.name}')">
                    <input type="radio" name="selectedTrainer" id="select_${coach.id}" value="${coach.name}" required>
                    <div class="trainer-select-visual">
                        <img src="${coach.photo}" alt="${coach.name}">
                        <div class="trainer-select-info">
                            <strong>${coach.name}</strong>
                            <span class="badge badge-accent-light">${specialty}</span>
                        </div>
                    </div>
                </label>
            `;
        });

        // Add 'No Trainer' card option at the end
        const noneTitle = translations[currentLanguage]["wiz_trainer_none_title"];
        const noneDesc = translations[currentLanguage]["wiz_trainer_none_desc"];
        wizardContainer.innerHTML += `
            <label class="trainer-select-card" id="lblNoTrainer" onclick="selectTrainerRadio('NoTrainer', 'Tanpa Pelatih')">
                <input type="radio" name="selectedTrainer" id="selectNoTrainer" value="Tanpa Pelatih">
                <div class="trainer-select-visual">
                    <div style="width: 60px; height: 60px; border-radius: 50px; display: flex; align-items: center; justify-content: center; background-color: var(--border-color); color: var(--primary); font-size: 1.5rem;">
                        <i class="fa-solid fa-dumbbell"></i>
                    </div>
                    <div class="trainer-select-info">
                        <strong>${noneTitle}</strong>
                        <span class="badge badge-accent-light">${noneDesc}</span>
                    </div>
                </div>
            </label>
        `;
    }
}

/* -------------------------------------------------------------
   BILINGUAL SYSTEM
   ------------------------------------------------------------- */
function setLanguage(lang) {
    if (lang !== 'id' && lang !== 'en') return;
    currentLanguage = lang;
    localStorage.setItem("fit_uny_lang", lang);
    
    // Toggle active classes on language buttons
    const langIdBtn = document.getElementById("langIdBtn");
    const langEnBtn = document.getElementById("langEnBtn");
    if (langIdBtn && langEnBtn) {
        langIdBtn.classList.toggle("active", lang === 'id');
        langEnBtn.classList.toggle("active", lang === 'en');
    }
    
    // Update translation tags in page elements
    const translatableElements = document.querySelectorAll("[data-translate-key]");
    translatableElements.forEach(el => {
        const key = el.getAttribute("data-translate-key");
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                el.setAttribute('placeholder', translations[lang][key]);
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });

    // Re-render trainers with translated content
    renderTrainers();

    // Re-render dynamic database content
    renderClasses();
    renderAmenities();
    renderProducts();
    
    // Recalculate calculator to apply translations
    calculateMembership();
}

function renderClasses() {
    const container = document.getElementById("classesContainer");
    if (!container) return;

    const classes = getClasses();
    container.innerHTML = "";

    classes.forEach((classObj) => {
        const name = currentLanguage === 'id' ? classObj.name_id : classObj.name_en;
        const desc = currentLanguage === 'id' ? classObj.desc_id : classObj.desc_en;
        const durationTxt = currentLanguage === 'id' ? `${classObj.duration}` : `${classObj.duration.replace("Menit", "Mins")}`;

        container.innerHTML += `
            <div class="class-card" onclick="showClassDetails('${classObj.id}')">
                <div class="class-icon"><i class="fa-solid ${classObj.icon || 'fa-fire-flame-simple'}"></i></div>
                <h3>${name}</h3>
                <p>${desc}</p>
                <span class="class-duration"><i class="fa-regular fa-clock"></i> ${durationTxt}</span>
            </div>
        `;
    });
}

function renderAmenities() {
    const container = document.getElementById("amenitiesContainer");
    if (!container) return;

    const amenities = getAmenities();
    container.innerHTML = "";

    amenities.forEach((amenity) => {
        const title = currentLanguage === 'id' ? amenity.title_id : amenity.title_en;
        const desc = currentLanguage === 'id' ? amenity.desc_id : amenity.desc_en;

        container.innerHTML += `
            <div class="amenity-card" onclick="showAmenityDetail('${amenity.key}')">
                <div class="amenity-icon"><i class="fa-solid ${amenity.icon}"></i></div>
                <div class="amenity-info">
                    <strong>${title}</strong>
                    <span>${desc}</span>
                </div>
            </div>
        `;
    });
}

function loadLanguagePreference() {
    const savedLang = localStorage.getItem("fit_uny_lang");
    if (savedLang) {
        setLanguage(savedLang);
    } else {
        setLanguage('id');
    }
}

/* -------------------------------------------------------------
   INTERACTIVE MEMBERSHIP CALCULATOR
   ------------------------------------------------------------- */
function selectCategory(category) {
    currentCategory = category;
    
    const memberBtn = document.getElementById("categoryMemberBtn");
    const incidentalBtn = document.getElementById("categoryIncidentalBtn");
    const durGroup = document.getElementById("calcDurationGroup");

    if (memberBtn && incidentalBtn) {
        memberBtn.classList.toggle("active", category === 'member');
        incidentalBtn.classList.toggle("active", category === 'incidental');
    }

    if (durGroup) {
        if (category === 'incidental') {
            durGroup.style.display = "none";
        } else {
            durGroup.style.display = "block";
        }
    }

    calculateMembership();
}

function selectProfile(profile) {
    currentProfile = profile;
    
    const studBtn = document.getElementById("profileStudent");
    const alumniBtn = document.getElementById("profileAlumni");
    const pubBtn = document.getElementById("profilePublic");

    if (studBtn && alumniBtn && pubBtn) {
        studBtn.classList.toggle("active", profile === 'student');
        alumniBtn.classList.toggle("active", profile === 'alumni');
        pubBtn.classList.toggle("active", profile === 'public');
    }
    
    // Update duration buttons visibility
    const dur2Btn = document.getElementById("dur2");
    const dur3Btn = document.getElementById("dur3");

    if (profile === 'student') {
        if (dur2Btn) dur2Btn.style.display = "none";
        if (dur3Btn) dur3Btn.style.display = "flex";
        // Reset if 2 is selected since student only has 1 and 3
        if (currentDuration === 2) {
            selectDuration(1);
        }
    } else if (profile === 'alumni') {
        if (dur2Btn) dur2Btn.style.display = "none";
        if (dur3Btn) dur3Btn.style.display = "none";
        // Reset to 1 since alumni only has 1 month
        selectDuration(1);
    } else { // public
        if (dur2Btn) dur2Btn.style.display = "flex";
        if (dur3Btn) dur3Btn.style.display = "flex";
    }
    
    calculateMembership();
}

function selectDuration(months) {
    currentDuration = months;
    
    const options = ['dur1', 'dur2', 'dur3'];
    options.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove("active");
    });
    
    const activeEl = document.getElementById(`dur${months}`);
    if (activeEl) activeEl.classList.add("active");
    
    calculateMembership();
}

function calculateMembership() {
    const pricing = getPricing();
    const formatNumber = (num) => num.toLocaleString('id-ID');
    
    const monthlyPriceEl = document.getElementById("monthlyPrice");
    const totalPaymentValEl = document.getElementById("totalPaymentVal");
    const discountRow = document.getElementById("discountRow");
    const badge = document.getElementById("resultProfileBadge");
    const totalDurationVal = document.getElementById("totalDurationVal");
    
    const regFeeRow = document.getElementById("calcRegFeeRow");
    const regFeeValEl = document.getElementById("calcRegFeeVal");

    const plan = pricing[currentProfile] || DEFAULT_PRICING[currentProfile];
    
    if (badge) {
        let badgeKey = "calc_student_badge";
        if (currentProfile === 'alumni') badgeKey = "calc_alumni_badge";
        else if (currentProfile === 'public') badgeKey = "calc_public_badge";
        
        badge.setAttribute("data-translate-key", badgeKey);
        badge.innerText = translations[currentLanguage][badgeKey];
    }

    const calcAddons = document.getElementById("calcAddonsGroup");

    if (currentCategory === 'incidental') {
        const rate = plan.incidental;
        
        if (monthlyPriceEl) monthlyPriceEl.innerText = formatNumber(rate);
        if (totalPaymentValEl) totalPaymentValEl.innerText = "Rp " + formatNumber(rate);
        if (totalDurationVal) totalDurationVal.innerText = `1 ${translations[currentLanguage]["calc_period_day_lbl"]}`;
        if (discountRow) discountRow.style.display = "none";
        if (regFeeRow) regFeeRow.style.display = "none";
        if (calcAddons) calcAddons.style.display = "none";
        
        // Expose price unit
        const pricePeriodEl = document.querySelector(".price-period");
        if (pricePeriodEl) pricePeriodEl.innerHTML = `/ ${translations[currentLanguage]["calc_period_day_lbl"]}`;
    } else {
        if (calcAddons) calcAddons.style.display = "block";

        const baseMemberPrice = plan.member[currentDuration] || (plan.member[1] * currentDuration);
        const registrationFee = plan.registration || 0;
        
        // Add-on values
        const trainers = getTrainers();
        const classes = getClasses();
        const equipment = getEquipment();

        const selectedTrainerId = document.getElementById("calcTrainer")?.value || "Tidak memilih";
        const selectedClassId = document.getElementById("calcClass")?.value || "Tidak memilih";
        const selectedEquipmentId = document.getElementById("calcEquipment")?.value || "Tidak memilih";

        const trainerObj = trainers.find(t => t.id === selectedTrainerId);
        const classObj = classes.find(c => c.id === selectedClassId);
        const equipObj = equipment.find(e => e.id === selectedEquipmentId);

        const trainerPrice = trainerObj ? (trainerObj.price || 0) : 0;
        const classPrice = classObj ? (classObj.price || 0) : 0;
        const equipPrice = equipObj ? (equipObj.price || 0) : 0;

        const addonsMonthlyPrice = trainerPrice + classPrice + equipPrice;
        const addonsTotalPrice = addonsMonthlyPrice * currentDuration;

        const singleMonthPrice = plan.member[1];
        const totalSaved = (singleMonthPrice * currentDuration) - baseMemberPrice;
        
        const totalPayment = baseMemberPrice + addonsTotalPrice + registrationFee;
        const monthlyPrice = totalPayment / currentDuration;
        
        if (monthlyPriceEl) monthlyPriceEl.innerText = formatNumber(Math.round(monthlyPrice));
        if (totalPaymentValEl) totalPaymentValEl.innerText = "Rp " + formatNumber(totalPayment);
        if (totalDurationVal) totalDurationVal.innerText = `${currentDuration} ${translations[currentLanguage]["calc_month_unit"]}`;
        
        // Registration fee row
        if (regFeeRow && regFeeValEl) {
            if (registrationFee > 0) {
                regFeeRow.style.display = "flex";
                regFeeValEl.innerText = "Rp " + formatNumber(registrationFee);
            } else {
                regFeeRow.style.display = "none";
            }
        }
        
        // Discount row
        if (discountRow) {
            if (totalSaved > 0) {
                discountRow.style.display = "flex";
                document.getElementById("totalSaveVal").innerText = "-Rp " + formatNumber(totalSaved);
            } else {
                discountRow.style.display = "none";
            }
        }

        const pricePeriodEl = document.querySelector(".price-period");
        if (pricePeriodEl) pricePeriodEl.innerHTML = `/ <span data-translate-key="calc_period_lbl">${translations[currentLanguage]["calc_period_lbl"]}</span>`;
    }
}

/* -------------------------------------------------------------
   GROUP CLASSES DETAIL INTERACTION
   ------------------------------------------------------------- */
function initClassClickHandlers() {
    const classCards = document.querySelectorAll(".classes-grid .class-card");
    classCards.forEach((card, index) => {
        card.addEventListener("click", () => {
            showClassDetails(`class_${index + 1}`);
        });
    });
}

function showClassDetails(classId) {
    const classes = getClasses();
    const classObj = classes.find(c => c.id === classId) || DEFAULT_CLASSES[0];
    
    const modal = document.getElementById("classDetailsModal");
    const nameEl = document.getElementById("classDetailName");
    const durEl = document.getElementById("classDetailDuration");
    const lvlEl = document.getElementById("classDetailLevel");
    const descEl = document.getElementById("classDetailDesc");

    if (modal && nameEl && durEl && lvlEl && descEl) {
        nameEl.innerText = classObj.name_id; // Default fallback or use dynamic lang
        if (currentLanguage === 'en') {
            nameEl.innerText = classObj.name_en;
            durEl.innerText = classObj.duration.replace("Menit", "Mins");
            lvlEl.innerText = classObj.level.replace("Menengah", "Intermediate").replace("Tinggi", "High").replace("Pemula", "Beginner").replace("Semua Tingkatan", "All Levels");
            descEl.innerText = classObj.desc_en;
        } else {
            nameEl.innerText = classObj.name_id;
            durEl.innerText = classObj.duration;
            lvlEl.innerText = classObj.level;
            descEl.innerText = classObj.desc_id;
        }
        
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeClassModal() {
    const modal = document.getElementById("classDetailsModal");
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }
}

/* -------------------------------------------------------------
   TRAINER DETAIL BIO & PROFILE INTERACTION
   ------------------------------------------------------------- */
function showTrainerProfile(trainerId) {
    const trainers = getTrainers();
    const coach = trainers.find(t => t.id === trainerId);
    if (!coach) return;

    const modal = document.getElementById("trainerProfileModal");
    const specialtyEl = document.getElementById("trainerDetailSpecialty");
    const nameEl = document.getElementById("trainerDetailName");
    const imgEl = document.getElementById("trainerDetailImg");
    const bioEl = document.getElementById("trainerDetailBio");
    const quotaEl = document.getElementById("trainerDetailQuota");
    const philosophyEl = document.getElementById("trainerDetailPhilosophy");

    if (modal) {
        specialtyEl.innerText = currentLanguage === 'id' ? coach.specialty_id_val : coach.specialty_en;
        nameEl.innerText = coach.name;
        imgEl.src = coach.photo;
        bioEl.innerText = currentLanguage === 'id' ? coach.bio_id : coach.bio_en;
        quotaEl.innerText = currentLanguage === 'id'
            ? `${coach.quota_filled} / ${coach.quota_max} Sesi Terisi`
            : `${coach.quota_filled} / ${coach.quota_max} Sessions Filled`;
        philosophyEl.innerText = `"${coach.philosophy}"`;

        // Store selected trainer context for booking action inside modal
        modal.setAttribute("data-active-coach-id", coach.id);
        modal.setAttribute("data-active-coach-name", coach.name);

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeTrainerModal() {
    const modal = document.getElementById("trainerProfileModal");
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }
}

function selectTrainerFromModal() {
    const modal = document.getElementById("trainerProfileModal");
    if (!modal) return;

    const coachId = modal.getAttribute("data-active-coach-id");
    const coachName = modal.getAttribute("data-active-coach-name");

    // Select the radio option in form step 2
    preselectTrainer(coachId, coachName);
    
    // Close modal
    closeTrainerModal();
}

/* -------------------------------------------------------------
   TRAINER BOOKING WIZARD LOGIC
   ------------------------------------------------------------- */
function preselectTrainer(trainerKey, coachName) {
    // Route to Booking section view
    switchView("#booking");

    // Click radio in step 2
    selectTrainerRadio(trainerKey, coachName);

    // Auto navigate to Step 2
    nextStep(2);
}

function selectTrainerRadio(trainerKey, coachName) {
    selectedTrainerValue = coachName;

    // Reset border borders
    const selectCards = document.querySelectorAll("#wizardTrainersContainer .trainer-select-card");
    selectCards.forEach(card => {
        const vis = card.querySelector(".trainer-select-visual");
        if (vis) vis.style.borderColor = "#e5e7eb";
    });

    // Highlight selected card
    const targetId = trainerKey === 'NoTrainer' ? 'lblNoTrainer' : `lbl_${trainerKey}`;
    const targetCard = document.getElementById(targetId);
    if (targetCard) {
        const vis = targetCard.querySelector(".trainer-select-visual");
        if (vis) vis.style.borderColor = "var(--accent)";
        
        // Find input radio and check it
        const radio = targetCard.querySelector("input[type='radio']");
        if (radio) radio.checked = true;
    }

    // Enable step 2 next button
    const step2Next = document.getElementById("btnStep2Next");
    if (step2Next) step2Next.disabled = false;
}

function selectGoal(goalType) {
    const radioDiet = document.getElementById("goalDiet");
    const radioMuscle = document.getElementById("goalMuscle");
    const radioStamina = document.getElementById("goalStamina");
    
    if (goalType === 'diet') {
        radioDiet.checked = true;
        selectedGoalValue = currentLanguage === 'id' ? "Diet & Berat Badan" : "Diet & Weight Loss";
    } else if (goalType === 'muscle') {
        radioMuscle.checked = true;
        selectedGoalValue = currentLanguage === 'id' ? "Pembentukan Otot" : "Muscle Building";
    } else if (goalType === 'stamina') {
        radioStamina.checked = true;
        selectedGoalValue = currentLanguage === 'id' ? "Stamina & Kesehatan" : "Stamina & Health";
    }

    // Goal visual borders update
    const goalCards = document.querySelectorAll(".goal-card");
    goalCards.forEach(c => {
        const vis = c.querySelector(".goal-visual-select");
        if (vis) vis.style.borderColor = "#e5e7eb";
    });

    const activeCard = document.getElementById(`goal${goalType.charAt(0).toUpperCase() + goalType.slice(1)}`).nextElementSibling;
    if (activeCard) activeCard.style.borderColor = "var(--accent)";
    
    // Enable Next button
    document.getElementById("btnStep1Next").disabled = false;

    // Smart Trainer recommendation
    const recText = document.getElementById("trainerRecommendation");
    if (goalType === 'diet') {
        recText.innerText = currentLanguage === 'id' 
            ? "Rekomendasi pelatih: Coach Budi Santoso (Nutrisi & Diet)"
            : "Recommended Coach: Coach Budi Santoso (Nutrition & Diet)";
        
        // Autoselect Coach Budi
        selectTrainerRadio('coach_budi', 'Coach Budi Santoso');
    } else if (goalType === 'stamina') {
        recText.innerText = currentLanguage === 'id' 
            ? "Rekomendasi pelatih: Coach Sarah Amalia (Cardio & Stamina) atau Coach Dewi Lestari (Yoga & Pilates)"
            : "Recommended Coach: Coach Sarah Amalia or Coach Dewi Lestari";
        
        // Autoselect Coach Sarah
        selectTrainerRadio('coach_sarah', 'Coach Sarah Amalia');
    } else if (goalType === 'muscle') {
        recText.innerText = currentLanguage === 'id'
            ? "Rekomendasi pelatih: Coach Rian Wijaya (Beban & Kekuatan)"
            : "Recommended Coach: Coach Rian Wijaya (Strength & Weight)";
        
        // Autoselect Coach Rian
        selectTrainerRadio('coach_rian', 'Coach Rian Wijaya');
    } else {
        recText.innerText = currentLanguage === 'id'
            ? "Anda bebas memilih pelatih pilihan Anda:"
            : "You are free to choose your preferred trainer:";
    }
}

function toggleFormDurationField() {
    const categorySelect = document.getElementById("clientCategory");
    const durationGroup = document.getElementById("formDurationGroup");

    if (categorySelect && durationGroup) {
        if (categorySelect.value === "Insidental") {
            durationGroup.style.display = "none";
        } else {
            durationGroup.style.display = "block";
        }
    }
}

function updateFormDurations() {
    const statusSelect = document.getElementById("clientStatus");
    const durationSelect = document.getElementById("clientDuration");
    if (!statusSelect || !durationSelect) return;

    const status = statusSelect.value;
    durationSelect.innerHTML = "";

    if (status === "UNY (Mahasiswa, Tendik/Dosen)") {
        durationSelect.innerHTML = `
            <option value="1">1 Bulan</option>
            <option value="3">3 Bulan</option>
        `;
    } else if (status === "Alumni UNY") {
        durationSelect.innerHTML = `
            <option value="1">1 Bulan</option>
        `;
    } else { // Umum / Publik
        durationSelect.innerHTML = `
            <option value="1">1 Bulan</option>
            <option value="2">2 Bulan</option>
            <option value="3">3 Bulan</option>
        `;
    }
}

function nextStep(step) {
    if (step < 1 || step > 3) return;
    bookingStep = step;
    
    // Hide all steps
    document.getElementById("wizardStep1").classList.remove("active");
    document.getElementById("wizardStep2").classList.remove("active");
    document.getElementById("wizardStep3").classList.remove("active");
    
    // Show active step
    document.getElementById(`wizardStep${step}`).classList.add("active");
    
    // Update step indicators
    const ind1 = document.getElementById("stepIndicator1");
    const ind2 = document.getElementById("stepIndicator2");
    const ind3 = document.getElementById("stepIndicator3");
    
    ind1.classList.remove("active", "completed");
    ind2.classList.remove("active", "completed");
    ind3.classList.remove("active", "completed");
    
    if (step === 1) {
        ind1.classList.add("active");
    } else if (step === 2) {
        ind1.classList.add("completed");
        ind2.classList.add("active");
    } else if (step === 3) {
        ind1.classList.add("completed");
        ind2.classList.add("completed");
        ind3.classList.add("active");
    }
}

function prevStep(step) {
    nextStep(step);
}

function toggleHeroDurationField() {
    const categorySelect = document.getElementById("heroCategory");
    const durationGroup = document.getElementById("heroDurationGroup");

    if (categorySelect && durationGroup) {
        if (categorySelect.value === "Insidental") {
            durationGroup.style.display = "none";
        } else {
            durationGroup.style.display = "block";
        }
    }
}

function updateHeroDurations() {
    const statusSelect = document.getElementById("heroStatus");
    const durationSelect = document.getElementById("heroDuration");
    if (!statusSelect || !durationSelect) return;

    const status = statusSelect.value;
    durationSelect.innerHTML = "";

    if (status === "UNY (Mahasiswa, Tendik/Dosen)") {
        durationSelect.innerHTML = `
            <option value="1">1 Bulan</option>
            <option value="3">3 Bulan</option>
        `;
    } else if (status === "Alumni UNY") {
        durationSelect.innerHTML = `
            <option value="1">1 Bulan</option>
        `;
    } else { // Umum / Publik
        durationSelect.innerHTML = `
            <option value="1">1 Bulan</option>
            <option value="2">2 Bulan</option>
            <option value="3">3 Bulan</option>
        `;
    }
}

function getHeroFormPrice() {
    const statusSelect = document.getElementById("heroStatus");
    const categorySelect = document.getElementById("heroCategory");
    const durationSelect = document.getElementById("heroDuration");
    
    if (!statusSelect || !categorySelect) return 0;
    
    const status = statusSelect.value;
    const category = categorySelect.value;
    
    const pricing = getPricing();
    let profileKey = 'public';
    if (status === "UNY (Mahasiswa, Tendik/Dosen)") {
        profileKey = 'student';
    } else if (status === "Alumni UNY") {
        profileKey = 'alumni';
    }
    
    const plan = pricing[profileKey] || DEFAULT_PRICING[profileKey];
    
    let basePrice = 0;
    let durationMonths = 1;
    
    if (category === "Insidental") {
        basePrice = plan.incidental;
    } else {
        durationMonths = parseInt(durationSelect?.value || "1");
        const memberPrice = plan.member[durationMonths] || (plan.member[1] * durationMonths);
        const regFee = plan.registration || 0;
        basePrice = memberPrice + regFee;
    }
    
    // Add-ons
    let addonsPrice = 0;
    if (category !== "Insidental") {
        const trainerId = document.getElementById("heroTrainer")?.value || "Tidak memilih";
        const classId = document.getElementById("heroClass")?.value || "Tidak memilih";
        const equipId = document.getElementById("heroEquipment")?.value || "Tidak memilih";
        
        const trainers = getTrainers();
        const classes = getClasses();
        const equipment = getEquipment();
        
        const trainerObj = trainers.find(t => t.id === trainerId);
        const classObj = classes.find(c => c.id === classId);
        const equipObj = equipment.find(e => e.id === equipId);
        
        const tPrice = trainerObj ? (trainerObj.price || 0) : 0;
        const cPrice = classObj ? (classObj.price || 0) : 0;
        const ePrice = equipObj ? (equipObj.price || 0) : 0;
        
        addonsPrice = (tPrice + cPrice + ePrice) * durationMonths;
    }
    
    return basePrice + addonsPrice;
}

function updateHeroFormPrice() {
    const total = getHeroFormPrice();
    const previewEl = document.getElementById("heroPricePreview");
    if (previewEl) {
        previewEl.innerText = `Estimasi Biaya: Rp ${total.toLocaleString('id-ID')}`;
    }
}

function getWizardFormPrice() {
    const statusSelect = document.getElementById("clientStatus");
    const categorySelect = document.getElementById("clientCategory");
    const durationSelect = document.getElementById("clientDuration");
    
    if (!statusSelect || !categorySelect) return 0;
    
    const status = statusSelect.value;
    const category = categorySelect.value;
    
    const pricing = getPricing();
    let profileKey = 'public';
    if (status === "UNY (Mahasiswa, Tendik/Dosen)") {
        profileKey = 'student';
    } else if (status === "Alumni UNY") {
        profileKey = 'alumni';
    }
    
    const plan = pricing[profileKey] || DEFAULT_PRICING[profileKey];
    
    let basePrice = 0;
    let durationMonths = 1;
    
    if (category === "Insidental") {
        basePrice = plan.incidental;
    } else {
        durationMonths = parseInt(durationSelect?.value || "1");
        const memberPrice = plan.member[durationMonths] || (plan.member[1] * durationMonths);
        const regFee = plan.registration || 0;
        basePrice = memberPrice + regFee;
    }
    
    // Add-ons
    let addonsPrice = 0;
    if (category !== "Insidental") {
        const trainers = getTrainers();
        const classes = getClasses();
        const equipment = getEquipment();
        
        const trainerObj = trainers.find(t => t.name === selectedTrainerValue);
        const classId = document.getElementById("clientClass")?.value || "Tidak memilih";
        const equipId = document.getElementById("clientEquipment")?.value || "Tidak memilih";
        
        const classObj = classes.find(c => c.id === classId);
        const equipObj = equipment.find(e => e.id === equipId);
        
        const tPrice = trainerObj ? (trainerObj.price || 0) : 0;
        const cPrice = classObj ? (classObj.price || 0) : 0;
        const ePrice = equipObj ? (equipObj.price || 0) : 0;
        
        addonsPrice = (tPrice + cPrice + ePrice) * durationMonths;
    }
    
    return basePrice + addonsPrice;
}

function updateWizardFormPrice() {
    const total = getWizardFormPrice();
    const previewEl = document.getElementById("wizardPricePreview");
    if (previewEl) {
        previewEl.innerText = `Estimasi Biaya: Rp ${total.toLocaleString('id-ID')}`;
    }
}


function initMemberAutocomplete(inputId, fillCallback) {
    const inputEl = document.getElementById(inputId);
    if (!inputEl) return;

    let suggContainer = inputEl.parentNode.querySelector(".autocomplete-suggestions");
    if (!suggContainer) {
        suggContainer = document.createElement("div");
        suggContainer.className = "autocomplete-suggestions";
        suggContainer.style.display = "none";
        inputEl.parentNode.appendChild(suggContainer);
    }

    const positionSuggestions = () => {
        suggContainer.style.left = `${inputEl.offsetLeft}px`;
        suggContainer.style.top = `${inputEl.offsetTop + inputEl.offsetHeight}px`;
        suggContainer.style.width = `${inputEl.offsetWidth}px`;
    };

    inputEl.addEventListener("input", () => {
        const query = inputEl.value.trim().toLowerCase();
        suggContainer.innerHTML = "";
        
        if (query.length < 2) {
            suggContainer.style.display = "none";
            return;
        }

        const regs = JSON.parse(localStorage.getItem("fit_uny_registrations")) || [];
        const uniqueMembersMap = new Map();
        regs.forEach(r => {
            if (r.name) {
                uniqueMembersMap.set(r.name.toLowerCase(), r);
            }
        });

        const matches = [];
        uniqueMembersMap.forEach((member, nameKey) => {
            if (nameKey.includes(query) || (member.phone && member.phone.includes(query))) {
                matches.push(member);
            }
        });

        if (matches.length === 0) {
            suggContainer.style.display = "none";
            return;
        }

        matches.slice(0, 5).forEach(member => {
            const div = document.createElement("div");
            div.className = "autocomplete-suggestion";
            div.innerHTML = `
                <span><strong>${member.name}</strong></span>
                <span class="suggest-sub">${member.phone} (${member.category})</span>
            `;
            div.addEventListener("click", () => {
                fillCallback(member);
                suggContainer.style.display = "none";
            });
            suggContainer.appendChild(div);
        });

        positionSuggestions();
        suggContainer.style.display = "block";
    });

    document.addEventListener("click", (e) => {
        if (e.target !== inputEl && e.target !== suggContainer && !suggContainer.contains(e.target)) {
            suggContainer.style.display = "none";
        }
    });

    window.addEventListener("resize", () => {
        if (suggContainer.style.display === "block") {
            positionSuggestions();
        }
    });
}

function populateAddonOptions() {
    const trainers = getTrainers();
    const classes = getClasses();
    const equipment = getEquipment();

    const formatNumber = (num) => num.toLocaleString('id-ID');

    const generateOptions = (items, type, showPrice = true) => {
        let html = `<option value="Tidak memilih">${type === 'trainer' ? 'Tanpa Pelatih' : 'Tanpa/Tidak memilih'} (Rp 0)</option>`;
        items.forEach(item => {
            const name = type === 'trainer' 
                ? item.name 
                : (currentLanguage === 'id' ? item.name_id : item.name_en);
            const priceText = showPrice ? ` (+Rp ${formatNumber(item.price || 0)}/bln)` : "";
            html += `<option value="${item.id}">${name}${priceText}</option>`;
        });
        return html;
    };

    const heroTrainer = document.getElementById("heroTrainer");
    if (heroTrainer) heroTrainer.innerHTML = generateOptions(trainers, 'trainer');
    const heroClass = document.getElementById("heroClass");
    if (heroClass) heroClass.innerHTML = generateOptions(classes, 'class');
    const heroEquipment = document.getElementById("heroEquipment");
    if (heroEquipment) heroEquipment.innerHTML = generateOptions(equipment, 'equipment');

    const clientClass = document.getElementById("clientClass");
    if (clientClass) clientClass.innerHTML = generateOptions(classes, 'class');
    const clientEquipment = document.getElementById("clientEquipment");
    if (clientEquipment) clientEquipment.innerHTML = generateOptions(equipment, 'equipment');

    const calcTrainer = document.getElementById("calcTrainer");
    if (calcTrainer) calcTrainer.innerHTML = generateOptions(trainers, 'trainer');
    const calcClass = document.getElementById("calcClass");
    if (calcClass) calcClass.innerHTML = generateOptions(classes, 'class');
    const calcEquipment = document.getElementById("calcEquipment");
    if (calcEquipment) calcEquipment.innerHTML = generateOptions(equipment, 'equipment');
}

function handleHeroFormSubmit(event) {
    event.preventDefault();
    
    clientNameGlobal = document.getElementById("heroName").value;
    clientPhoneGlobal = document.getElementById("heroPhone").value;
    clientStatusGlobal = document.getElementById("heroStatus").value;
    clientCategoryGlobal = document.getElementById("heroCategory").value;
    clientTimeGlobal = document.getElementById("heroTime").value;

    const trainerSelect = document.getElementById("heroTrainer");
    const classSelect = document.getElementById("heroClass");
    const equipmentSelect = document.getElementById("heroEquipment");

    if (trainerSelect && trainerSelect.value !== "Tidak memilih") {
        const trainers = getTrainers();
        const coach = trainers.find(t => t.id === trainerSelect.value);
        selectedTrainerValue = coach ? coach.name : "Tanpa Pelatih";
    } else {
        selectedTrainerValue = "Tanpa Pelatih";
    }

    selectedClassGlobal = "Tidak memilih";
    selectedEquipmentGlobal = "Tidak memilih";
    
    if (clientCategoryGlobal !== "Insidental") {
        if (classSelect && classSelect.value !== "Tidak memilih") {
            const classes = getClasses();
            const clObj = classes.find(c => c.id === classSelect.value);
            selectedClassGlobal = clObj ? clObj.name_id : "Tidak memilih";
        }
        if (equipmentSelect && equipmentSelect.value !== "Tidak memilih") {
            const equipment = getEquipment();
            const eqObj = equipment.find(e => e.id === equipmentSelect.value);
            selectedEquipmentGlobal = eqObj ? eqObj.name_id : "Tidak memilih";
        }
        clientDurationGlobal = parseInt(document.getElementById("heroDuration").value);
    } else {
        clientDurationGlobal = 1;
    }

    totalPayGlobal = getHeroFormPrice();

    const today = new Date();
    registrationDateGlobal = today.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    
    const expiry = new Date();
    if (clientCategoryGlobal === "Insidental") {
        expiry.setDate(today.getDate() + 1);
    } else {
        expiry.setMonth(today.getMonth() + clientDurationGlobal);
    }
    expiryDateGlobal = expiry.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    memberIdGlobal = `FVUNY-2023-${randomSuffix}`;

    const totalPayText = "Rp " + totalPayGlobal.toLocaleString('id-ID');
    document.getElementById("payTotalAmountVal").innerText = totalPayText;

    document.getElementById("paymentBankSection").style.display = "block";
    document.getElementById("paymentCardSection").style.display = "none";

    const banks = getBankAccounts();
    if (banks.length > 0) {
        selectBank(banks[0].key);
    }

    document.getElementById("paymentModal").classList.add("active");
    document.body.style.overflow = "hidden";
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    clientNameGlobal = document.getElementById("clientName").value;
    clientPhoneGlobal = document.getElementById("clientPhone").value;
    clientStatusGlobal = document.getElementById("clientStatus").value;
    clientCategoryGlobal = document.getElementById("clientCategory").value;
    clientTimeGlobal = document.getElementById("clientTime").value;

    selectedClassGlobal = "Tidak memilih";
    selectedEquipmentGlobal = "Tidak memilih";
    
    if (clientCategoryGlobal !== "Insidental") {
        const classSelect = document.getElementById("clientClass");
        if (classSelect && classSelect.value !== "Tidak memilih") {
            const classes = getClasses();
            const clObj = classes.find(c => c.id === classSelect.value);
            selectedClassGlobal = clObj ? clObj.name_id : "Tidak memilih";
        }
        const equipSelect = document.getElementById("clientEquipment");
        if (equipSelect && equipSelect.value !== "Tidak memilih") {
            const equipment = getEquipment();
            const eqObj = equipment.find(e => e.id === equipSelect.value);
            selectedEquipmentGlobal = eqObj ? eqObj.name_id : "Tidak memilih";
        }
        clientDurationGlobal = parseInt(document.getElementById("clientDuration").value);
    } else {
        clientDurationGlobal = 1;
    }

    totalPayGlobal = getWizardFormPrice();

    const today = new Date();
    registrationDateGlobal = today.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    
    const expiry = new Date();
    if (clientCategoryGlobal === "Insidental") {
        expiry.setDate(today.getDate() + 1);
    } else {
        expiry.setMonth(today.getMonth() + clientDurationGlobal);
    }
    expiryDateGlobal = expiry.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    memberIdGlobal = `FVUNY-2023-${randomSuffix}`;

    const totalPayText = "Rp " + totalPayGlobal.toLocaleString('id-ID');
    document.getElementById("payTotalAmountVal").innerText = totalPayText;

    document.getElementById("paymentBankSection").style.display = "block";
    document.getElementById("paymentCardSection").style.display = "none";

    const banks = getBankAccounts();
    if (banks.length > 0) {
        selectBank(banks[0].key);
    }

    document.getElementById("paymentModal").classList.add("active");
    document.body.style.overflow = "hidden";
}

function selectBank(bankKey) {
    selectedBankKey = bankKey;
    
    const banks = getBankAccounts();
    banks.forEach(b => {
        const card = document.getElementById(`bank_${b.key}`);
        if (card) card.classList.remove("active");
    });

    const activeCard = document.getElementById(`bank_${bankKey}`);
    if (activeCard) activeCard.classList.add("active");

    const bankDetails = BANK_ACCOUNTS[bankKey];
    document.getElementById("bankAccNo").innerText = bankDetails ? bankDetails.number : "";
}

function copyText(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert(currentLanguage === 'id' ? "Nomor rekening berhasil disalin!" : "Account number copied to clipboard!");
    });
}

function processPayment() {
    const regs = JSON.parse(localStorage.getItem("fit_uny_registrations")) || [];
    const newReg = {
        memberId: memberIdGlobal,
        name: clientNameGlobal,
        phone: clientPhoneGlobal,
        status: clientStatusGlobal,
        category: clientCategoryGlobal,
        duration: clientCategoryGlobal === "Insidental" ? "1 Hari" : `${clientDurationGlobal} Bulan`,
        trainer: selectedTrainerValue,
        class: selectedClassGlobal,
        equipment: selectedEquipmentGlobal,
        time: clientTimeGlobal,
        price: totalPayGlobal,
        bank: BANK_ACCOUNTS[selectedBankKey].name,
        date: registrationDateGlobal,
        expiry: expiryDateGlobal,
        paymentStatus: "Approved"
    };
    regs.push(newReg);
    localStorage.setItem("fit_uny_registrations", JSON.stringify(regs));

    document.getElementById("cardMemberId").innerText = memberIdGlobal;
    document.getElementById("cardMemberName").innerText = clientNameGlobal;
    document.getElementById("cardMemberStatus").innerText = clientStatusGlobal;
    document.getElementById("cardMemberExpiry").innerText = expiryDateGlobal;

    document.getElementById("paymentBankSection").style.display = "none";
    document.getElementById("paymentCardSection").style.display = "block";
}

function sendToWhatsAppAdmin() {
    const textMsg = `Halo Admin FITNESS CENTER FV UNY, saya telah berhasil melakukan pendaftaran dan pembayaran berikut:

- Nama Lengkap: ${clientNameGlobal}
- Nomor Member ID: ${memberIdGlobal}
- WhatsApp: ${clientPhoneGlobal}
- Status Civitas: ${clientStatusGlobal}
- Kategori Akses: ${clientCategoryGlobal} (${clientCategoryGlobal === 'Insidental' ? '1 Hari' : clientDurationGlobal + ' Bulan'})
- Pelatih Pilihan: ${selectedTrainerValue}
- Program Kelas: ${selectedClassGlobal}
- Kategori Alat: ${selectedEquipmentGlobal}
- Jadwal Latihan: ${clientTimeGlobal}
- Pembayaran via: ${BANK_ACCOUNTS[selectedBankKey].name}
- Total Transfer: Rp ${totalPayGlobal.toLocaleString('id-ID')}
- Masa Berlaku Kartu: ${expiryDateGlobal}

Mohon verifikasi kartu anggota digital saya. Terima kasih!`;

    const encodedText = encodeURIComponent(textMsg);
    const links = JSON.parse(localStorage.getItem("fit_uny_contact_links")) || DEFAULT_CONTACT_LINKS;
    const waPhone = links.wa_phone || "6285158907972";
    const waUrl = `https://wa.me/${waPhone}?text=${encodedText}`;

    closePaymentModal();

    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm) {
        bookingForm.reset();
    }
    const heroBookingForm = document.getElementById("heroBookingForm");
    if (heroBookingForm) {
        heroBookingForm.reset();
    }
    
    const step1Next = document.getElementById("btnStep1Next");
    if (step1Next) step1Next.disabled = true;
    const step2Next = document.getElementById("btnStep2Next");
    if (step2Next) step2Next.disabled = true;
    
    toggleFormDurationField();
    toggleHeroDurationField();
    
    updateHeroFormPrice();
    updateWizardFormPrice();
    
    nextStep(1);

    window.open(waUrl, "_blank");
}

function closePaymentModal() {
    document.getElementById("paymentModal").classList.remove("active");
    document.body.style.overflow = "";
}

function printCard() {
    window.print();
}

const DEFAULT_AMENITIES = [
    {
        key: "ac",
        title_id: "Air Conditioner (AC)",
        title_en: "Air Conditioner (AC)",
        desc_id: "Suhu ruangan sejuk & segar dengan pendingin udara di setiap sudut ruangan, memastikan kenyamanan maksimal Anda saat melakukan latihan intensitas tinggi sekalipun.",
        desc_en: "Cool & fresh room temperature with air conditioning in every corner of the room, ensuring your maximum comfort even during high-intensity training.",
        icon: "fa-snowflake",
        is_orderable: false,
        order_text_id: "",
        order_text_en: "",
        wa_template_id: "",
        wa_template_en: ""
    },
    {
        key: "air_minum",
        title_id: "Air Minum Gratis",
        title_en: "Free Drinking Water",
        desc_id: "Layanan air mineral gratis dari dispenser higienis, serta tersedia kopi hangat dan teh secara cuma-cuma untuk menjaga hidrasi dan menambah fokus latihan Anda.",
        desc_en: "Complimentary mineral water from hygienic dispensers, with hot coffee and tea available for free to keep you hydrated and focused during your workout.",
        icon: "fa-mug-hot",
        is_orderable: true,
        order_text_id: "Pesan Kopi / Teh Hangat",
        order_text_en: "Order Hot Coffee / Tea",
        wa_template_id: "Halo Admin, saya ingin memesan Kopi/Teh hangat di area Fitness Center FV UNY.",
        wa_template_en: "Hello Admin, I would like to order hot coffee/tea at the Fitness Center FV UNY area."
    },
    {
        key: "aplikasi",
        title_id: "Aplikasi Mobile",
        title_en: "Mobile Application",
        desc_id: "Aplikasi mobile resmi Fitness Center untuk mempermudah presensi harian menggunakan QR code scan, memantau riwayat pembayaran, serta mencatat kemajuan progres latihan fisik Anda.",
        desc_en: "Official Fitness Center mobile application to simplify daily attendance via QR code scan, monitor payment history, and track your physical workout progress.",
        icon: "fa-mobile-screen-button",
        is_orderable: false,
        order_text_id: "",
        order_text_en: "",
        wa_template_id: "",
        wa_template_en: ""
    },
    {
        key: "handuk",
        title_id: "Handuk Bersih",
        title_en: "Clean Towels",
        desc_id: "Fasilitas peminjaman handuk olahraga steril harian secara gratis untuk menjaga kebersihan Anda selama berlatih. Silakan ambil di meja resepsionis dengan menunjukkan ID Member.",
        desc_en: "Complimentary clean and sterile daily gym towels to keep you clean while training. Please request at the reception desk by showing your Member ID.",
        icon: "fa-soap",
        is_orderable: true,
        order_text_id: "Pinjam Handuk Olahraga",
        order_text_en: "Borrow Gym Towel",
        wa_template_id: "Halo Admin, saya ingin memesan/meminjam handuk olahraga bersih untuk sesi latihan saya hari ini.",
        wa_template_en: "Hello Admin, I would like to order/borrow a clean gym towel for my workout session today."
    },
    {
        key: "kamar_mandi",
        title_id: "Kamar Mandi & Shower",
        title_en: "Bathroom & Shower",
        desc_id: "Kamar mandi bersih terpisah untuk pria dan wanita yang dilengkapi shower air panas/hangat untuk memberikan kesegaran instan bagi tubuh Anda selepas melakukan latihan keras.",
        desc_en: "Separate clean bathrooms for men and women equipped with hot showers to provide instant freshness for your body after a hard training session.",
        icon: "fa-shower",
        is_orderable: false,
        order_text_id: "",
        order_text_en: "",
        wa_template_id: "",
        wa_template_en: ""
    },
    {
        key: "loker",
        title_id: "Loker Barang",
        title_en: "Locker Room",
        desc_id: "Loker penyimpanan barang berkeamanan khusus untuk menjaga keamanan tas, sepatu, dan barang berharga bawaan Anda agar Anda dapat fokus berlatih dengan tenang.",
        desc_en: "Secure locker storage to keep your bags, shoes, and valuable belongings safe so you can focus on training with peace of mind.",
        icon: "fa-key",
        is_orderable: true,
        order_text_id: "Sewa/Booking Loker Khusus",
        order_text_en: "Rent/Book Special Locker",
        wa_template_id: "Halo Admin, saya ingin memesan/menyewa loker penyimpanan khusus barang di Fitness Center FV UNY.",
        wa_template_en: "Hello Admin, I would like to order/rent a special storage locker at Fitness Center FV UNY."
    },
    {
        key: "pt",
        title_id: "Personal Trainer (PT)",
        title_en: "Personal Trainer (PT)",
        desc_id: "Dapatkan bimbingan intensif dari instruktur pribadi bersertifikasi resmi untuk merancang program kebugaran terarah, teknik angkat beban yang benar, serta konsultasi nutrisi harian.",
        desc_en: "Get intensive guidance from certified personal trainers to design targeted fitness programs, correct weightlifting techniques, and daily nutritional consultations.",
        icon: "fa-user-check",
        is_orderable: true,
        order_text_id: "Pilih & Booking Pelatih",
        order_text_en: "Choose & Book Trainer",
        wa_template_id: "",
        wa_template_en: "",
        is_pt_redirect: true
    },
    {
        key: "wifi",
        title_id: "WiFi Cepat Gratis",
        title_en: "Free High-Speed WiFi",
        desc_id: "Akses internet nirkabel berkecepatan tinggi gratis di seluruh area fitness center agar Anda tetap terhubung untuk memutar musik latihan favorit atau melihat panduan latihan online.",
        desc_en: "Free high-speed wireless internet access throughout the fitness center area so you can stay connected to play your favorite workout music or view online exercise guides.",
        icon: "fa-wifi",
        is_orderable: false,
        order_text_id: "",
        order_text_en: "",
        wa_template_id: "",
        wa_template_en: ""
    }
];

/* -------------------------------------------------------------
   PRODUCTS STORE CATALOG DATA
   ------------------------------------------------------------- */
const DEFAULT_PRODUCTS = [
    {
        id: "prod_shaker",
        name_id: "Shaker Whey Protein Botol Minum PURO, 400ml",
        name_en: "Puro Whey Protein Shaker Bottle, 400ml",
        price: 39000,
        original_price: null,
        image: "assets/shaker_puro.png",
        category: "perlengkapan"
    },
    {
        id: "prod_handuk",
        name_id: "Handuk Terry Palmer 40x75 cm Cocok untuk Keringat",
        name_en: "Terry Palmer Hand Towel 40x75 cm for Sweat",
        price: 39900,
        original_price: null,
        image: "assets/handuk_terry.png",
        category: "lifestyle"
    },
    {
        id: "prod_fitbar",
        name_id: "Fitbar Protein Chocolate 12x25gr",
        name_en: "Fitbar Protein Chocolate 12x25gr",
        price: 115100,
        original_price: null,
        image: "assets/fitbar_chocolate.png",
        category: "protein"
    },
    {
        id: "prod_gloves",
        name_id: "Sarung Tangan untuk Gym, Nyaman dan Anti Slip untuk Pria & Wanita",
        name_en: "Anti-Slip Gym Gloves for Men & Women",
        price: 58000,
        original_price: null,
        image: "assets/sarung_tangan.png",
        category: "perlengkapan"
    },
    {
        id: "prod_tumbler",
        name_id: "Cuculemon Tumbler Kapasitas Besar dengan Bahan Stainless Steel",
        name_en: "Cuculemon Stainless Steel Large Capacity Tumbler",
        price: 69000,
        original_price: 150000,
        image: "assets/cuculemon_tumbler.png",
        category: "lifestyle"
    }
];

/* -------------------------------------------------------------
   AMENITIES LOGIC
   ------------------------------------------------------------- */
function showAmenityDetail(key) {
    const amenities = getAmenities();
    const detail = amenities.find(a => a.key === key);
    if (!detail) return;

    const modal = document.getElementById("amenityDetailsModal");
    const iconEl = document.getElementById("amenityModalIcon");
    const nameEl = document.getElementById("amenityModalName");
    const descEl = document.getElementById("amenityModalDesc");
    const actionContainer = document.getElementById("amenityModalActionContainer");

    if (!modal) return;

    // Set content
    iconEl.innerHTML = `<i class="fa-solid ${detail.icon}"></i>`;
    nameEl.innerText = currentLanguage === 'id' ? detail.title_id : detail.title_en;
    descEl.innerText = currentLanguage === 'id' ? detail.desc_id : detail.desc_en;

    // Action button
    actionContainer.innerHTML = "";
    if (detail.is_orderable) {
        const btnText = currentLanguage === 'id' ? detail.order_text_id : detail.order_text_en;
        if (detail.is_pt_redirect) {
            actionContainer.innerHTML = `
                <button class="btn btn-accent btn-block" onclick="closeAmenityModal(); preselectTrainer('NoTrainer', 'Tanpa Pelatih');">${btnText}</button>
            `;
        } else {
            const template = currentLanguage === 'id' ? detail.wa_template_id : detail.wa_template_en;
            const waUrl = `https://wa.me/6285158907972?text=${encodeURIComponent(template)}`;
            actionContainer.innerHTML = `
                <a href="${waUrl}" target="_blank" class="btn btn-accent btn-block" onclick="closeAmenityModal()">${btnText} <i class="fa-brands fa-whatsapp"></i></a>
            `;
        }
    }
    
    // Add close button
    const closeBtnText = currentLanguage === 'id' ? "Tutup" : "Close";
    actionContainer.innerHTML += `
        <button class="btn btn-outline btn-block" style="color: var(--text-gray); border-color: var(--border-color);" onclick="closeAmenityModal()">${closeBtnText}</button>
    `;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeAmenityModal() {
    const modal = document.getElementById("amenityDetailsModal");
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }
}

/* -------------------------------------------------------------
   PRODUCTS CATALOG LOGIC
   ------------------------------------------------------------- */
let currentProductFilter = 'all';

function filterProducts(category) {
    currentProductFilter = category;
    
    // Toggle active filter button
    const filterBtns = document.querySelectorAll(".products-filter .filter-btn");
    filterBtns.forEach(btn => btn.classList.remove("active"));

    const btnIdMap = {
        all: "btnFilterAll",
        lifestyle: "btnFilterLifestyle",
        perlengkapan: "btnFilterPerlengkapan",
        protein: "btnFilterProtein"
    };
    
    const activeBtn = document.getElementById(btnIdMap[category]);
    if (activeBtn) activeBtn.classList.add("active");

    renderProducts();
}

function renderProducts() {
    const container = document.getElementById("productsContainer");
    if (!container) return;

    container.innerHTML = "";
    
    const products = getProducts();
    const filteredProducts = currentProductFilter === 'all' 
        ? products 
        : products.filter(p => p.category === currentProductFilter);

    if (filteredProducts.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-gray); padding: 40px 0;">No products found in this category.</div>`;
        return;
    }

    filteredProducts.forEach(product => {
        const prodName = currentLanguage === 'id' ? product.name_id : product.name_en;
        const formattedPrice = "Rp " + product.price.toLocaleString('id-ID');
        
        let oldPriceHtml = "";
        let discountBadgeHtml = "";
        if (product.original_price) {
            const formattedOld = "Rp " + product.original_price.toLocaleString('id-ID');
            oldPriceHtml = `<span class="price-old">${formattedOld}</span>`;
            const discountPct = Math.round(((product.original_price - product.price) / product.original_price) * 100);
            discountBadgeHtml = `<span class="product-discount-badge">-${discountPct}%</span>`;
        }

        const buyText = translations[currentLanguage]["prod_btn_buy"] || "Beli Sekarang";

        container.innerHTML += `
            <div class="product-card" onclick="openProductPurchase('${product.id}')">
                <div class="product-img-wrap">
                    ${discountBadgeHtml}
                    <img src="${product.image}" alt="${prodName}" class="product-img">
                </div>
                <div class="product-info">
                    <h3>${prodName}</h3>
                    <div class="product-price-row">
                        <span class="price">${formattedPrice}</span>
                        ${oldPriceHtml}
                    </div>
                    <button class="btn btn-accent btn-sm btn-block">${buyText} <i class="fa-solid fa-cart-shopping"></i></button>
                </div>
            </div>
        `;
    });
}

/* -------------------------------------------------------------
   PRODUCT PURCHASE WIZARD FLOW
   ------------------------------------------------------------- */
let currentSelectedProduct = null;
let productQtyVal = 1;
let productTotalPayVal = 0;
let productBankKeySelected = 'bca';
let prodBuyerNameVal = "";
let prodBuyerPhoneVal = "";
let prodDeliveryVal = "Ambil di Gym";
let productInvoiceIdGlobal = "";
let productDateGlobal = "";

function openProductPurchase(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    currentSelectedProduct = product;
    productQtyVal = 1;
    productTotalPayVal = product.price;

    // Load static product info in modal
    document.getElementById("purchaseProductImg").src = product.image;
    document.getElementById("purchaseProductName").innerText = currentLanguage === 'id' ? product.name_id : product.name_en;
    document.getElementById("purchaseProductPrice").innerText = "Rp " + product.price.toLocaleString('id-ID');
    document.getElementById("purchaseProductCategory").innerText = currentLanguage === 'id' ? "Detail Pemesanan" : "Order Details";

    // Reset inputs
    document.getElementById("prodBuyerName").value = "";
    document.getElementById("prodBuyerPhone").value = "";
    document.getElementById("prodQty").value = 1;
    document.getElementById("prodDelivery").value = "Ambil di Gym";

    // Set steps display
    document.getElementById("productStep1Section").style.display = "block";
    document.getElementById("productStep2Section").style.display = "none";
    document.getElementById("productStep3Section").style.display = "none";

    // Open Modal
    document.getElementById("productPurchaseModal").classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeProductPurchaseModal() {
    document.getElementById("productPurchaseModal").classList.remove("active");
    document.body.style.overflow = "";
    currentSelectedProduct = null;
}

function updateProductTotalPay() {
    if (!currentSelectedProduct) return;
    
    const qtyInput = document.getElementById("prodQty");
    let qty = parseInt(qtyInput.value) || 1;
    if (qty < 1) {
        qty = 1;
        qtyInput.value = 1;
    }
    productQtyVal = qty;
    productTotalPayVal = currentSelectedProduct.price * qty;

    // Update Step 1 Form preview total
    document.getElementById("purchaseProductPrice").innerText = "Rp " + productTotalPayVal.toLocaleString('id-ID');
}

function handleProductFormSubmit(e) {
    e.preventDefault();
    if (!currentSelectedProduct) return;

    prodBuyerNameVal = document.getElementById("prodBuyerName").value;
    prodBuyerPhoneVal = document.getElementById("prodBuyerPhone").value;
    prodDeliveryVal = document.getElementById("prodDelivery").value;

    // Load values into Step 2 Bank Total
    document.getElementById("prodPayTotalAmountVal").innerText = "Rp " + productTotalPayVal.toLocaleString('id-ID');

    // Switch step view
    document.getElementById("productStep1Section").style.display = "none";
    document.getElementById("productStep2Section").style.display = "block";
    
    // Choose default BCA bank
    selectProdBank('bca');
}

function selectProdBank(bankKey) {
    productBankKeySelected = bankKey;

    const banks = getBankAccounts();
    banks.forEach(b => {
        const card = document.getElementById(`prodBank_${b.key}`);
        if (card) card.classList.remove("active");
    });

    const activeCard = document.getElementById(`prodBank_${bankKey}`);
    if (activeCard) activeCard.classList.add("active");

    const bankDetails = BANK_ACCOUNTS[bankKey];
    document.getElementById("prodBankAccNo").innerText = bankDetails ? bankDetails.number : "";
}

function prevProductStep(step) {
    if (step === 1) {
        document.getElementById("productStep2Section").style.display = "none";
        document.getElementById("productStep1Section").style.display = "block";
        updateProductTotalPay();
    }
}

function processProductPayment() {
    if (!currentSelectedProduct) return;

    // Generate random invoice ID
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    productInvoiceIdGlobal = `FVUNY-PROD-${randomSuffix}`;

    const today = new Date();
    productDateGlobal = today.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

    // Save product purchase transaction to localStorage
    const sales = JSON.parse(localStorage.getItem("fit_uny_product_sales")) || [];
    const newSale = {
        invoiceId: productInvoiceIdGlobal,
        buyerName: prodBuyerNameVal,
        buyerPhone: prodBuyerPhoneVal,
        productName: currentLanguage === 'id' ? currentSelectedProduct.name_id : currentSelectedProduct.name_en,
        qty: productQtyVal,
        delivery: prodDeliveryVal,
        price: productTotalPayVal,
        bank: BANK_ACCOUNTS[productBankKeySelected].name,
        date: productDateGlobal
    };
    sales.push(newSale);
    localStorage.setItem("fit_uny_product_sales", JSON.stringify(sales));

    // Populate Step 3 invoice elements
    document.getElementById("invoiceIdVal").innerText = productInvoiceIdGlobal;
    document.getElementById("invoiceBuyerName").innerText = prodBuyerNameVal;
    document.getElementById("invoiceProdName").innerText = currentLanguage === 'id' ? currentSelectedProduct.name_id : currentSelectedProduct.name_en;
    document.getElementById("invoiceProdQty").innerText = `${productQtyVal} Pcs (${prodDeliveryVal})`;
    document.getElementById("invoiceTotalPay").innerText = "Rp " + productTotalPayVal.toLocaleString('id-ID');
    document.getElementById("invoiceDateVal").innerText = productDateGlobal;

    // Switch step view
    document.getElementById("productStep2Section").style.display = "none";
    document.getElementById("productStep3Section").style.display = "block";
}

function sendProductToWhatsAppAdmin() {
    if (!currentSelectedProduct) return;

    const prodNameText = currentLanguage === 'id' ? currentSelectedProduct.name_id : currentSelectedProduct.name_en;

    const textMsg = `Halo Admin FITNESS CENTER FV UNY, saya telah melakukan pembelian produk berikut:

- Nama Pembeli: ${prodBuyerNameVal}
- WhatsApp: ${prodBuyerPhoneVal}
- Produk: ${prodNameText}
- Jumlah (Qty): ${productQtyVal} Pcs
- Metode Pengambilan: ${prodDeliveryVal}
- Pembayaran via: ${BANK_ACCOUNTS[productBankKeySelected].name}
- Total Transfer: Rp ${productTotalPayVal.toLocaleString('id-ID')}
- Invoice ID: ${productInvoiceIdGlobal}
- Tanggal Transaksi: ${productDateGlobal}

Mohon verifikasi pembayaran dan proses pesanan saya. Terima kasih!`;

    const links = JSON.parse(localStorage.getItem("fit_uny_contact_links")) || DEFAULT_CONTACT_LINKS;
    const waPhone = links.wa_phone || "6285158907972";
    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(textMsg)}`;

    closeProductPurchaseModal();
    window.open(waUrl, "_blank");
}

// Expose functions globally to window for HTML inline event handlers
window.setLanguage = setLanguage;
window.selectCategory = selectCategory;
window.selectProfile = selectProfile;
window.selectDuration = selectDuration;
window.showTrainerProfile = showTrainerProfile;
window.selectTrainerFromModal = selectTrainerFromModal;
window.selectGoal = selectGoal;
window.updateFormDurations = updateFormDurations;
window.toggleFormDurationField = toggleFormDurationField;
window.updateHeroDurations = updateHeroDurations;
window.toggleHeroDurationField = toggleHeroDurationField;
window.handleHeroFormSubmit = handleHeroFormSubmit;
window.nextStep = nextStep;
window.prevStep = prevStep;
window.handleFormSubmit = handleFormSubmit;
window.selectBank = selectBank;
window.copyText = copyText;
window.processPayment = processPayment;
window.sendToWhatsAppAdmin = sendToWhatsAppAdmin;
window.closePaymentModal = closePaymentModal;
window.printCard = printCard;
window.showAmenityDetail = showAmenityDetail;
window.closeAmenityModal = closeAmenityModal;
window.filterProducts = filterProducts;
window.openProductPurchase = openProductPurchase;
window.closeProductPurchaseModal = closeProductPurchaseModal;
window.updateProductTotalPay = updateProductTotalPay;
window.handleProductFormSubmit = handleProductFormSubmit;
window.selectProdBank = selectProdBank;
window.prevProductStep = prevProductStep;
window.processProductPayment = processProductPayment;
window.sendProductToWhatsAppAdmin = sendProductToWhatsAppAdmin;
window.closeClassModal = closeClassModal;
window.closeTrainerModal = closeTrainerModal;
window.getHeroFormPrice = getHeroFormPrice;
window.updateHeroFormPrice = updateHeroFormPrice;
window.getWizardFormPrice = getWizardFormPrice;
window.updateWizardFormPrice = updateWizardFormPrice;
window.renderBankOptions = renderBankOptions;
window.initMemberAutocomplete = initMemberAutocomplete;
window.populateAddonOptions = populateAddonOptions;
window.calculateMembership = calculateMembership;

// Collapsible Form and Chatbot Widget Implementations
function toggleHeroForm() {
    const card = document.querySelector(".hero-form-card");
    if (card) {
        card.classList.toggle("collapsed");
    }
}

function toggleChatbot() {
    const panel = document.getElementById("chatbotPanel");
    if (panel) {
        panel.classList.toggle("active");
    }
}

function handleChatbotReply(option) {
    const messagesContainer = document.getElementById("chatbotMessages");
    if (!messagesContainer) return;
    
    let userText = "";
    let botText = "";
    
    const links = JSON.parse(localStorage.getItem("fit_uny_contact_links")) || DEFAULT_CONTACT_LINKS;
    const waPhone = links.wa_phone || "6285158907972";
    const waDisplay = links.wa_display || "+62 851-5890-7972";
    const pricing = getPricing();
    
    if (currentLanguage === 'id') {
        const address = translations.id.contact_loc_desc || "Lantai 1, Dormitory Putra, Jl. Mandung, Serut, Pengasih, Kec. Wates, Kabupaten Kulon Progo, Daerah Istimewa Yogyakarta 55651";
        const hours = translations.id.contact_hours_desc || "Senin - Sabtu: 07:00 - 21:00 WIB (Minggu Libur)";
        switch (option) {
            case 'lokasi':
                userText = "📍 Lokasi Gym";
                botText = `📍 <strong>Lokasi FITNESS CENTER FV UNY:</strong><br>${address}<br>(Dekat Kampus Vokasi UNY Wates)`;
                break;
            case 'biaya':
                userText = "💰 Biaya Member";
                botText = `💰 <strong>Biaya Membership:</strong><br>• <strong>Mahasiswa/Civitas UNY:</strong> Rp ${pricing.student.member[1].toLocaleString('id-ID')}/bulan (Insidental: Rp ${pricing.student.incidental.toLocaleString('id-ID')}/hari)<br>• <strong>Alumni UNY:</strong> Rp ${pricing.alumni.member[1].toLocaleString('id-ID')}/bulan (Insidental: Rp ${pricing.alumni.incidental.toLocaleString('id-ID')}/hari)<br>• <strong>Masyarakat Umum:</strong> Mulai Rp ${pricing.public.member[1].toLocaleString('id-ID')}/bulan (Insidental: Rp ${pricing.public.incidental.toLocaleString('id-ID')}/hari)<br><br>Silakan cek rincian biaya di halaman Membership untuk menghitung diskon & total pembayaran langsung!`;
                break;
            case 'fasilitas':
                userText = "🏋️ Fasilitas";
                botText = "🏋️ <strong>Fasilitas Premium Kami:</strong><br>• Strength & Free Weight Area (impor standar atlet)<br>• Cardio Zone (Treadmill & Sepeda Statis profesional)<br>• Loker steril & Kamar mandi shower air hangat<br>• AC, Air minum gratis, kopi/teh gratis, & WiFi cepat";
                break;
            case 'kontak':
                userText = "📞 Kontak Admin";
                botText = `📞 <strong>Hubungi Admin WhatsApp:</strong><br><a href='https://wa.me/${waPhone}' target='_blank' style='color: var(--accent); font-weight: 700;'>${waDisplay} (Klik di sini)</a><br><br>Jam Operasional:<br>${hours}`;
                break;
            default:
                return;
        }
    } else {
        const address = translations.en.contact_loc_desc || "Level 1, Dormitory Putra, Jl. Mandung, Serut, Pengasih, Wates District, Kulon Progo Regency, Special Region of Yogyakarta 55651";
        const hours = translations.en.contact_hours_desc || "Monday - Saturday: 07:00 - 21:00 WIB (Sunday Closed)";
        switch (option) {
            case 'lokasi':
                userText = "📍 Gym Location";
                botText = `📍 <strong>FITNESS CENTER FV UNY Location:</strong><br>${address}<br>(Near UNY Vokasi Wates Campus)`;
                break;
            case 'biaya':
                userText = "💰 Membership Fees";
                botText = `💰 <strong>Membership Fees:</strong><br>• <strong>UNY Students/Staff:</strong> IDR ${pricing.student.member[1].toLocaleString('id-ID')}/month (Daily: IDR ${pricing.student.incidental.toLocaleString('id-ID')}/day)<br>• <strong>UNY Alumni:</strong> IDR ${pricing.alumni.member[1].toLocaleString('id-ID')}/month (Daily: IDR ${pricing.alumni.incidental.toLocaleString('id-ID')}/day)<br>• <strong>General Public:</strong> From IDR ${pricing.public.member[1].toLocaleString('id-ID')}/month (Daily: IDR ${pricing.public.incidental.toLocaleString('id-ID')}/day)<br><br>Please check the membership details on our Membership page to get discount details!`;
                break;
            case 'fasilitas':
                userText = "🏋️ Facilities";
                botText = "🏋️ <strong>Our Premium Facilities:</strong><br>• Strength & Free Weight Area (athlete-standard imports)<br>• Cardio Zone (professional Treadmills & Bikes)<br>• Secure lockers & Hot shower changing rooms<br>• AC, Free water/coffee/tea, & High-speed WiFi";
                break;
            case 'kontak':
                userText = "📞 Contact Admin";
                botText = `📞 <strong>Contact WhatsApp Admin:</strong><br><a href='https://wa.me/${waPhone}' target='_blank' style='color: var(--accent); font-weight: 700;'>${waDisplay} (Click here)</a><br><br>Operational Hours:<br>${hours}`;
                break;
            default:
                return;
        }
    }

    const userBubble = document.createElement("div");
    userBubble.className = "chat-bubble user-message";
    userBubble.innerText = userText;
    messagesContainer.appendChild(userBubble);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    const buttons = document.querySelectorAll(".quick-reply-btn");
    buttons.forEach(btn => btn.disabled = true);
    
    setTimeout(() => {
        const botBubble = document.createElement("div");
        botBubble.className = "chat-bubble bot-message";
        botBubble.innerHTML = botText;
        messagesContainer.appendChild(botBubble);
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        buttons.forEach(btn => btn.disabled = false);
    }, 600);
}

window.toggleHeroForm = toggleHeroForm;
window.toggleChatbot = toggleChatbot;
window.renderClasses = renderClasses;
window.renderAmenities = renderAmenities;
window.getClasses = getClasses;
window.getAmenities = getAmenities;
window.getProducts = getProducts;
window.getEquipment = getEquipment;
window.handleChatbotReply = handleChatbotReply;

// Scroll Reveal & Active Observation Logic
document.addEventListener("DOMContentLoaded", () => {
    // Select elements to reveal
    const selectors = [
        ".hero-feat-card",
        ".about-visual",
        ".about-content",
        ".about-point",
        ".facility-card",
        ".class-card",
        ".pricing-card",
        ".product-card",
        ".section-header",
        ".amenities-section-title",
        ".amenity-item-card",
        ".testimonial-card",
        ".faq-item",
        "footer .footer-links-group",
        "footer .footer-brand"
    ];

    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add("reveal-on-scroll");
            
            // Add directional or scale reveals depending on type
            if (selector === ".about-visual") {
                el.classList.add("reveal-left");
            } else if (selector === ".about-content" || selector === ".about-point") {
                el.classList.add("reveal-right");
            } else if (
                selector === ".class-card" ||
                selector === ".facility-card" ||
                selector === ".pricing-card" ||
                selector === ".product-card" ||
                selector === ".testimonial-card" ||
                selector === ".hero-feat-card" ||
                selector === ".amenity-item-card"
            ) {
                el.classList.add("reveal-scale");
            }

            // Add staggered delay to adjacent elements
            const staggerIdx = index % 4;
            if (staggerIdx > 0) {
                el.classList.add(`delay-${staggerIdx * 100}`);
            }
        });
    });

    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px"
    });

    document.querySelectorAll(".reveal-on-scroll").forEach(el => observer.observe(el));
});

