document.addEventListener('DOMContentLoaded', () => {
    
    // ---------------------------------------------------------
    // 1. GECE MODU MOTORU
    // ---------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    if (themeToggleBtn) {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            body.setAttribute('data-theme', currentTheme);
            updateIcon(currentTheme);
        }

        themeToggleBtn.addEventListener('click', () => {
            let theme = body.getAttribute('data-theme');
            if (theme === 'dark') {
                body.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                updateIcon('light');
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                updateIcon('dark');
            }
        });
    }

    function updateIcon(theme) {
        if (!icon) return;
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }


    // ---------------------------------------------------------
    // 2. AKILLI ÖZEL GÜN VE BAYRAM TAKVİMİ (Full Otomatik)
    // ---------------------------------------------------------
    checkSpecialDays();

    function checkSpecialDays() {
        const today = new Date();
        const month = today.getMonth() + 1; // Aylar 0-11 arasıdır, düzeltme +1
        const day = today.getDate();
        const dayOfWeek = today.getDay(); // 0 = Pazar, 1 = Pazartesi...
        const year = today.getFullYear();
        
        // Formatlar
        const dateKeyFull = `${year}-${month}-${day}`;
        const dateKeyFixed = `${month}-${day}`; 
        
        // Değişkenler
        let message = "";
        let type = ""; // national (Kırmızı), memorial (Siyah), maritime/personal (Lacivert)
        let iconClass = "";
        let isGrayscale = false;

        // --- HAREKETLİ GÜNLERİN HESAPLANMASI (Anneler & Babalar Günü) ---
        // Anneler Günü: Mayıs'ın 2. Pazarı
        const isMothersDay = (month === 5 && dayOfWeek === 0 && day > 7 && day <= 14);
        
        // Babalar Günü: Haziran'ın 3. Pazarı
        const isFathersDay = (month === 6 && dayOfWeek === 0 && day > 14 && day <= 21);


        // --- 1. YENİ EKLENEN GÜNLER ---

        // Yılbaşı
        if (dateKeyFixed === "1-1") {
            message = "Yeni Yılınız Kutlu Olsun. Sağlık, Huzur ve Adalet Dolu Bir Yıl Dileriz.";
            type = "personal"; 
            iconClass = "fa-solid fa-calendar-check";
        }
        // 8 Mart Dünya Kadınlar Günü
        else if (dateKeyFixed === "3-8") {
            message = "8 Mart Dünya Kadınlar Günü Kutlu Olsun. Eşitlik ve Adalet Dolu Bir Gelecek Dileğiyle.";
            type = "personal"; // Lacivert/Bej şık durur
            iconClass = "fa-solid fa-venus";
        }
        // 1 Mayıs Emek ve Dayanışma Günü
        else if (dateKeyFixed === "5-1") {
            message = "1 Mayıs Emek ve Dayanışma Günü Kutlu Olsun. Emeğin ve Alın Terinin Yanındayız.";
            type = "national";
            iconClass = "fa-solid fa-hand-fist";
        }
        // 24 Kasım Öğretmenler Günü
        else if (dateKeyFixed === "11-24") {
            message = "Geleceği İnşa Eden Kıymetli Öğretmenlerimizin 24 Kasım Öğretmenler Günü Kutlu Olsun.";
            type = "personal";
            iconClass = "fa-solid fa-chalkboard-user";
        }
        
        // Anneler Günü (Hassas Mesaj)
        else if (isMothersDay) {
            message = "Başta Şehit Anneleri Olmak Üzere, Hayatımıza Değer Katan Tüm Annelerimizi Saygıyla, Ebediyete İrtihal Edenleri Rahmetle Anıyoruz.";
            type = "personal";
            iconClass = "fa-solid fa-heart";
        }
        // Babalar Günü (Hassas Mesaj)
        else if (isFathersDay) {
            message = "Varlıklarıyla Güç Veren Tüm Babalarımıza Saygılarımızı Sunuyor, Aramızdan Ayrılanları Rahmetle Yad Ediyoruz.";
            type = "personal";
            iconClass = "fa-solid fa-user-tie";
        }


        // --- 2. MEVCUT MİLLİ BAYRAMLAR ---
        else if (dateKeyFixed === "10-29") {
            message = "29 Ekim Cumhuriyet Bayramımız Kutlu Olsun! 🇹🇷";
            type = "national";
            iconClass = "fa-solid fa-flag";
        }
        else if (dateKeyFixed === "8-30") {
            message = "30 Ağustos Zafer Bayramımız Kutlu Olsun! 🇹🇷";
            type = "national";
            iconClass = "fa-solid fa-star";
        }
        else if (dateKeyFixed === "4-23") {
            message = "23 Nisan Ulusal Egemenlik ve Çocuk Bayramı Kutlu Olsun! 🇹🇷";
            type = "national";
            iconClass = "fa-solid fa-child-reaching";
        }
        else if (dateKeyFixed === "5-19") {
            message = "19 Mayıs Atatürk'ü Anma, Gençlik ve Spor Bayramı Kutlu Olsun! 🇹🇷";
            type = "national";
            iconClass = "fa-solid fa-medal";
        }
        else if (dateKeyFixed === "7-15") {
            message = "15 Temmuz Demokrasi ve Milli Birlik Günü.";
            type = "national";
            iconClass = "fa-solid fa-moon";
        }
        
        // --- 3. ANMA GÜNLERİ ---
        else if (dateKeyFixed === "11-10") {
            message = "10 Kasım 193∞... Saygı, Özlem ve Minnetle Anıyoruz.";
            type = "memorial";
            iconClass = "fa-solid fa-infinity";
            isGrayscale = true; 
        }
        else if (dateKeyFixed === "3-18") {
            message = "18 Mart Çanakkale Zaferi Kutlu Olsun! 🇹🇷";
            type = "national";
            iconClass = "fa-solid fa-monument";
        }

        // --- 4. DENİZCİLİK & MESLEKİ ---
        else if (dateKeyFixed === "7-1") {
            message = "1 Temmuz Denizcilik ve Kabotaj Bayramı Kutlu Olsun! ⚓️";
            type = "maritime";
            iconClass = "fa-solid fa-anchor";
        }
        else if (dateKeyFixed === "9-27") {
            message = "Preveze Deniz Zaferi ve Deniz Kuvvetleri Günü Kutlu Olsun! ⚓️🇹🇷";
            type = "maritime";
            iconClass = "fa-solid fa-ship";
        }
        else if (dateKeyFixed === "11-18") {
            message = "Deniz Harp Okulu'nun Kuruluş Yıl Dönümü Kutlu Olsun! (1773 - ∞) ⚓️";
            type = "maritime";
            iconClass = "fa-solid fa-graduation-cap";
        }
        else if (dateKeyFixed === "4-5") {
            message = "5 Nisan Avukatlar Günü Kutlu Olsun! Adalet Mülkün Temelidir.";
            type = "maritime"; 
            iconClass = "fa-solid fa-scale-balanced";
        }
        else if (dateKeyFixed === "1-10") {
            message = "Avukatlık Mesleğindeki Yeni Yılımız Kutlu Olsun.";
            type = "personal";
            iconClass = "fa-solid fa-gavel";
        }
        else if (dateKeyFixed === "12-11") {
            message = "Bugün Av. Fatih Turan'ın Doğum Günü.";
            type = "personal";
            iconClass = "fa-solid fa-cake-candles";
        }

        // --- 5. DİNİ BAYRAMLAR (2025-2030 LİSTESİ) ---
        else {
            const religiousHolidays = [
                // 2025
                "2025-3-29", "2025-3-30", "2025-3-31", "2025-4-1",
                "2025-6-5", "2025-6-6", "2025-6-7", "2025-6-8", "2025-6-9",
                // 2026
                "2026-3-19", "2026-3-20", "2026-3-21", "2026-3-22",
                "2026-5-26", "2026-5-27", "2026-5-28", "2026-5-29", "2026-5-30",
                // 2027
                "2027-3-8", "2027-3-9", "2027-3-10", "2027-3-11",
                "2027-5-15", "2027-5-16", "2027-5-17", "2027-5-18", "2027-5-19",
                // 2028
                "2028-2-25", "2028-2-26", "2028-2-27", "2028-2-28",
                "2028-5-4", "2028-5-5", "2028-5-6", "2028-5-7", "2028-5-8",
                // 2029
                "2029-2-13", "2029-2-14", "2029-2-15", "2029-2-16",
                "2029-4-23", "2029-4-24", "2029-4-25", "2029-4-26", "2029-4-27",
                // 2030
                "2030-2-3", "2030-2-4", "2030-2-5", "2030-2-6",
                "2030-4-12", "2030-4-13", "2030-4-14", "2030-4-15", "2030-4-16"
            ];

            if (religiousHolidays.includes(dateKeyFull)) {
                message = "Bayramınız Mübarek Olsun! Sevdiklerinizle Birlikte Huzurlu Bir Bayram Dileriz. 🇹🇷";
                type = "national"; 
                iconClass = "fa-solid fa-star-and-crescent";
            }
        }

        // BANDI OLUŞTUR VE GÖSTER
        if (message) {
            const banner = document.createElement('div');
            banner.id = 'special-banner';
            banner.className = type;
            banner.innerHTML = `<div class="container"><i class="${iconClass}"></i> ${message}</div>`;
            
            document.body.insertBefore(banner, document.body.firstChild);
            banner.style.display = 'block';

            if (isGrayscale) {
                document.body.classList.add('grayscale-mode');
            }
        }
    }
});