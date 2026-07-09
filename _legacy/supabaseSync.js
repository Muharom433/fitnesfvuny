// Helper file to synchronize localStorage with Supabase database dynamically
import { supabase } from './supabaseClient.js';

let isSyncingFromDB = false;

// Helper to check if a specific panel is being edited on admin page
function isPanelEditing(panelId) {
    if (typeof document === 'undefined') return false;
    const activeEl = document.activeElement;
    if (!activeEl) return false;
    const panel = document.getElementById(panelId);
    if (!panel) return false;
    const tagName = activeEl.tagName.toLowerCase();
    const isInput = tagName === 'input' || tagName === 'textarea' || tagName === 'select' || activeEl.isContentEditable;
    return isInput && panel.contains(activeEl);
}

// Helper to update localStorage only if value has changed
function setItemIfChanged(key, newValueObj) {
    const currentValueStr = localStorage.getItem(key);
    const newValueStr = JSON.stringify(newValueObj);
    
    let normalizedCurrentStr = "";
    if (currentValueStr) {
        try {
            normalizedCurrentStr = JSON.stringify(JSON.parse(currentValueStr));
        } catch (e) {
            normalizedCurrentStr = currentValueStr;
        }
    }

    if (normalizedCurrentStr !== newValueStr) {
        const temp = isSyncingFromDB;
        isSyncingFromDB = true;
        try {
            localStorage.setItem(key, newValueStr);
        } finally {
            isSyncingFromDB = temp;
        }
        return true;
    }
    return false;
}

// Expose sync function to refresh page state after DB load
window.triggerUIRefresh = function() {
    console.log("Triggering UI Refresh...");
    
    // Admin Dashboard functions
    if (typeof window.populateContentForm === 'function' && !isPanelEditing("panel_content")) {
        window.populateContentForm();
    }
    if (typeof window.loadTrainersData === 'function' && !isPanelEditing("panel_trainers")) {
        window.loadTrainersData();
        if (typeof window.renderTrainersEditor === 'function') window.renderTrainersEditor();
    }
    if (typeof window.loadClassesData === 'function' && !isPanelEditing("panel_classes")) {
        window.loadClassesData();
        if (typeof window.renderClassesEditor === 'function') window.renderClassesEditor();
    }
    if (typeof window.loadEquipmentData === 'function' && !isPanelEditing("panel_equipment")) {
        window.loadEquipmentData();
        if (typeof window.renderEquipmentEditor === 'function') window.renderEquipmentEditor();
    }
    if (typeof window.loadProductsData === 'function' && !isPanelEditing("panel_products")) {
        window.loadProductsData();
        if (typeof window.renderProductsEditor === 'function') window.renderProductsEditor();
    }
    if (typeof window.loadBanksData === 'function' && !isPanelEditing("panel_content")) {
        window.loadBanksData();
        if (typeof window.renderBanksEditor === 'function') window.renderBanksEditor();
    }
    if (typeof window.loadDashboardStats === 'function') window.loadDashboardStats();

    // Receptionist functions
    if (typeof window.syncFromAdmin === 'function') window.syncFromAdmin(false);
    if (typeof window.renderKasirLog === 'function') window.renderKasirLog();
    if (typeof window.renderBookingsLog === 'function') window.renderBookingsLog();
    if (typeof window.renderProductSalesLog === 'function') window.renderProductSalesLog();
    if (typeof window.renderReportsPanel === 'function') window.renderReportsPanel();
    if (typeof window.renderCustomCalendar === 'function') window.renderCustomCalendar();
};

// Check configuration
const isSupabaseConfigured = import.meta.env.VITE_SUPABASE_URL && 
                            import.meta.env.VITE_SUPABASE_URL !== 'https://your-project-id.supabase.co';

// Override localStorage setItem
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
    originalSetItem.apply(this, arguments);
    if (!isSyncingFromDB && isSupabaseConfigured) {
        try {
            syncToSupabase(key, JSON.parse(value));
        } catch (e) {
            console.error("Gagal melakukan sinkronisasi ke Supabase untuk key:", key, e);
        }
    }
};

// Override localStorage removeItem
const originalRemoveItem = localStorage.removeItem;
localStorage.removeItem = function(key) {
    originalRemoveItem.apply(this, arguments);
    if (!isSyncingFromDB && isSupabaseConfigured) {
        try {
            removeFromSupabase(key);
        } catch (e) {
            console.error("Gagal menghapus data dari Supabase untuk key:", key, e);
        }
    }
};

// Fetch all data from Supabase and mirror to localStorage
export async function syncFromSupabase(forceRefresh = false) {
    if (!isSupabaseConfigured) {
        console.warn("Supabase belum terkonfigurasi. Berjalan dalam mode lokal offline.");
        window.triggerUIRefresh();
        return;
    }

    try {
        isSyncingFromDB = true;
        console.log("Memulai sinkronisasi data dari Supabase cloud...");
        let hasAnyChange = false;

        // 1. Fetch Pricing
        const { data: pricingRows, error: pricingErr } = await supabase.from('pricing').select('*');
        if (!pricingErr && pricingRows && pricingRows.length > 0) {
            const pricingObj = {};
            pricingRows.forEach(row => {
                pricingObj[row.id] = {
                    registration: Number(row.registration_fee),
                    member: row.membership_tariffs,
                    incidental: Number(row.incidental_fee)
                };
            });
            if (setItemIfChanged("fit_uny_pricing", pricingObj)) {
                hasAnyChange = true;
            }
        }

        // 2. Fetch Trainers
        const { data: trainers, error: trainersErr } = await supabase
            .from('trainers')
            .select('*')
            .order('created_at', { ascending: true });
        if (!trainersErr && trainers) {
            if (setItemIfChanged("fit_uny_trainers", trainers)) {
                hasAnyChange = true;
            }
        }

        // 3. Fetch Classes
        const { data: classes, error: classesErr } = await supabase
            .from('classes')
            .select('*')
            .order('created_at', { ascending: true });
        if (!classesErr && classes) {
            if (setItemIfChanged("fit_uny_classes", classes)) {
                hasAnyChange = true;
            }
        }

        // 4. Fetch Products
        const { data: products, error: productsErr } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: true });
        if (!productsErr && products) {
            if (setItemIfChanged("fit_uny_products", products)) {
                hasAnyChange = true;
            }
        }

        // 5. Fetch Equipment
        const { data: equipCats, error: equipCatsErr } = await supabase
            .from('equipment')
            .select('*')
            .order('created_at', { ascending: true });
        const { data: equipItems, error: equipItemsErr } = await supabase
            .from('equipment_items')
            .select('*')
            .order('created_at', { ascending: true });
        if (!equipCatsErr && !equipItemsErr && equipCats && equipItems) {
            const localEquip = equipCats.map(cat => ({
                id: cat.id,
                name_id: cat.name_id,
                name_en: cat.name_en,
                desc_id: cat.desc_id,
                desc_en: cat.desc_en,
                icon: cat.icon,
                price: Number(cat.price),
                items: equipItems.filter(it => it.parent_id === cat.id).map(it => ({
                    name_id: it.name_id,
                    name_en: it.name_en,
                    desc_id: it.desc_id,
                    desc_en: it.desc_en,
                    icon: it.icon
                }))
            }));
            if (setItemIfChanged("fit_uny_equipment", localEquip)) {
                hasAnyChange = true;
            }
        }

        // 6. Fetch Bookings (relational fallback to match local fields)
        const { data: dbBookings, error: bookingsErr } = await supabase
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: true });
        if (!bookingsErr && dbBookings) {
            const localBookings = dbBookings.map(b => ({
                name: b.name,
                date: b.preferred_time.split("T")[0],
                day: b.preferred_time, // fallback to time
                time: b.preferred_time.includes("T") ? b.preferred_time.split("T")[1] : "08:00",
                trainer: b.trainer_id || "Mandiri (Tanpa Pelatih)",
                kelas: b.class_id || "Tanpa Kelas",
                alat: b.equipment_id || "Tanpa Alat",
                status: b.status
            }));
            if (setItemIfChanged("fit_uny_bookings", localBookings)) {
                hasAnyChange = true;
            }
        }

        // 7. Fetch miscellaneous settings from app_settings
        const { data: appSettings, error: appSettingsErr } = await supabase.from('app_settings').select('*');
        if (!appSettingsErr && appSettings) {
            appSettings.forEach(setting => {
                if (setItemIfChanged(setting.key, setting.value)) {
                    hasAnyChange = true;
                }
            });
        }

        console.log("Sinkronisasi data dari Supabase selesai.");
        if (hasAnyChange || forceRefresh) {
            console.log("Perubahan terdeteksi atau penyegaran paksa aktif. Memperbarui UI...");
            window.triggerUIRefresh();
        } else {
            console.log("Tidak ada perubahan data.");
        }
    } catch (e) {
        console.error("Gagal melakukan sinkronisasi data awal:", e);
        window.triggerUIRefresh(); // fallback to local storage
    } finally {
        isSyncingFromDB = false;
    }
}

// Upload changes to Supabase
async function syncToSupabase(key, value) {
    if (!isSupabaseConfigured) return;

    console.log(`Mengunggah pembaruan untuk key: ${key} ke Supabase...`);

    // 1. Mapped tables
    if (key === "fit_uny_pricing") {
        for (const [id, val] of Object.entries(value)) {
            await supabase.from('pricing').upsert({
                id: id,
                category_name_id: id === 'student' ? 'Mahasiswa / Civitas UNY' : id === 'alumni' ? 'Alumni UNY' : 'Masyarakat Umum',
                category_name_en: id === 'student' ? 'UNY Students & Civitas' : id === 'alumni' ? 'UNY Alumni' : 'General Public',
                registration_fee: val.registration,
                incidental_fee: val.incidental,
                membership_tariffs: val.member
            });
        }
    } 
    else if (key === "fit_uny_trainers") {
        await supabase.from('trainers').delete().neq('id', 'force_clear_all');
        if (value.length > 0) {
            await supabase.from('trainers').insert(value);
        }
    } 
    else if (key === "fit_uny_classes") {
        await supabase.from('classes').delete().neq('id', 'force_clear_all');
        if (value.length > 0) {
            await supabase.from('classes').insert(value);
        }
    } 
    else if (key === "fit_uny_products") {
        await supabase.from('products').delete().neq('id', 'force_clear_all');
        if (value.length > 0) {
            await supabase.from('products').insert(value);
        }
    } 
    else if (key === "fit_uny_equipment") {
        for (const cat of value) {
            await supabase.from('equipment').upsert({
                id: cat.id,
                name_id: cat.name_id,
                name_en: cat.name_en,
                desc_id: cat.desc_id,
                desc_en: cat.desc_en,
                icon: cat.icon,
                price: cat.price
            });
            // Reset items in category
            await supabase.from('equipment_items').delete().eq('parent_id', cat.id);
            if (cat.items && cat.items.length > 0) {
                const dbItems = cat.items.map(it => ({
                    parent_id: cat.id,
                    name_id: it.name_id,
                    name_en: it.name_en,
                    desc_id: it.desc_id || "",
                    desc_en: it.desc_en || "",
                    icon: it.icon
                }));
                await supabase.from('equipment_items').insert(dbItems);
            }
        }
    } 
    else if (key === "fit_uny_bookings") {
        // Sync local calendar bookings to Supabase bookings table
        await supabase.from('bookings').delete().neq('name', 'force_clear_all');
        if (value.length > 0) {
            const trainers = JSON.parse(localStorage.getItem("fit_uny_trainers")) || [];
            const classes = JSON.parse(localStorage.getItem("fit_uny_classes")) || [];
            const equipment = JSON.parse(localStorage.getItem("fit_uny_equipment")) || [];

            const dbBookings = value.map(b => {
                // Determine duration
                let duration = null;
                if (b.kelas && b.kelas !== "Tanpa Kelas") duration = "Kelas";
                
                // Format preferred time
                const timePart = b.time || "08:00";
                const datePart = b.date || new Date().toISOString().split("T")[0];
                
                // Resolve references securely
                let resolvedTrainerId = null;
                if (b.trainer && b.trainer !== "Mandiri (Tanpa Pelatih)") {
                    const found = trainers.find(t => t.id === b.trainer || t.name === b.trainer);
                    resolvedTrainerId = found ? found.id : null;
                }

                let resolvedClassId = null;
                if (b.kelas && b.kelas !== "Tanpa Kelas") {
                    const found = classes.find(c => c.id === b.kelas || c.name_id === b.kelas);
                    resolvedClassId = found ? found.id : null;
                }

                let resolvedEquipId = null;
                if (b.alat && b.alat !== "Tanpa Alat") {
                    const found = equipment.find(e => e.id === b.alat || e.name_id === b.alat);
                    resolvedEquipId = found ? found.id : null;
                }

                return {
                    name: b.name,
                    phone: b.phone || "0851-0000-0000",
                    status_civitas: b.civitas || "Umum",
                    category: b.kelas ? "Kelas" : "Gym Only",
                    duration: duration,
                    preferred_time: `${datePart}T${timePart}`,
                    estimated_price: 20000,
                    status: b.status || "Approved",
                    trainer_id: resolvedTrainerId,
                    class_id: resolvedClassId,
                    equipment_id: resolvedEquipId
                };
            });
            await supabase.from('bookings').insert(dbBookings);
        }
    } 
    // 2. Generic table for other variables
    else {
        await supabase.from('app_settings').upsert({
            key: key,
            value: value,
            updated_at: new Date().toISOString()
        });
    }
}

// Remove changes from Supabase
async function removeFromSupabase(key) {
    if (!isSupabaseConfigured) return;

    if (key === "fit_uny_trainers") {
        await supabase.from('trainers').delete().neq('id', 'force_clear_all');
    } else if (key === "fit_uny_classes") {
        await supabase.from('classes').delete().neq('id', 'force_clear_all');
    } else if (key === "fit_uny_products") {
        await supabase.from('products').delete().neq('id', 'force_clear_all');
    } else if (key === "fit_uny_bookings") {
        await supabase.from('bookings').delete().neq('name', 'force_clear_all');
    } else {
        await supabase.from('app_settings').delete().eq('key', key);
    }
}

// Start polling loop for real-time synchronization
let syncIntervalId = null;

export function startSyncPolling(intervalMs = 10000) {
    if (syncIntervalId) clearInterval(syncIntervalId);
    syncIntervalId = setInterval(async () => {
        if (document.visibilityState === 'visible') {
            console.log("Polling: Menyelaraskan dengan database Supabase...");
            await syncFromSupabase(false);
        }
    }, intervalMs);
}

export function stopSyncPolling() {
    if (syncIntervalId) {
        clearInterval(syncIntervalId);
        syncIntervalId = null;
    }
}

// Initialize synchronization on load
document.addEventListener("DOMContentLoaded", () => {
    // Run initial sync after DOM loads, forcing refresh to align UI
    syncFromSupabase(true);
    // Start polling every 10 seconds
    startSyncPolling(10000);
});
