/**
 * AV. FATİH TURAN - MODÜLER JAVASCRIPT DOSYASI (V33.0)
 * Güncellemeler:
 * 1. Form gönderimi AJAX (fetch) yapısına çevrildi.
 * 2. Formspree sayfasına yönlendirme engellendi.
 * 3. Sayfa içi "Başarılı" mesajı aktifleştirildi.
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initNavigation();
    initChatBot();
    initSpecialDays();
    initTabs();
    initContactForm(); // AJAX destekli yeni versiyon
});


/* ============================================================
   1. TEMA MOTORU
============================================================ */
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    let savedTheme = null;
    try { savedTheme = localStorage.getItem('theme'); } catch (e) {}

    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let current = body.getAttribute('data-theme');
            let next = (current === 'dark') ? 'light' : 'dark';
            body.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) {}
            updateIcon(next);
        });
    }

    function updateIcon(theme) {
        if (!icon) return;
        icon.className = (theme === 'dark') ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
}


/* ============================================================
   2. MOBİL MENÜ KONTROLÜ
============================================================ */
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.desktop-nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', nav.classList.contains('active'));
        });
    }
}


/* ============================================================
   3. TURAN ASSISTANT (CHATBOT)
============================================================ */
function initChatBot() {
    if (window.innerWidth <= 768) return;

    const chatToggle = document.getElementById('chatToggle');
    const chatBox = document.getElementById('chatBox');
    const closeChat = document.getElementById('closeChat');
    const greeting = document.getElementById('chatGreeting');
    const chatBody = document.getElementById('chatBody');

    if (!chatToggle || !chatBox || !closeChat || !greeting || !chatBody) return;

    let hasSeenGreeting = null;
    try { hasSeenGreeting = localStorage.getItem('chatGreetingShown'); } catch(e) {}
    
    if (!hasSeenGreeting) {
        setTimeout(() => { 
            try { localStorage.setItem('chatGreetingShown', 'true'); } catch(e) {}
            if(chatBox.style.display !== 'flex') greeting.style.display = 'block'; 
        }, 2500);
        setTimeout(() => { greeting.style.display = 'none'; }, 12000);
    }

    chatToggle.addEventListener('click', () => {
        if (chatBox.style.display === 'flex') {
            chatBox.style.display = 'none';
        } else {
            chatBox.style.display = 'flex';
            greeting.style.display = 'none';
        }
    });

    closeChat.addEventListener('click', () => { chatBox.style.display = 'none'; });

    window.chatReply = function(option) {
        let userText = "", botText = "";
        if(option === 'randevu') {
            userText = "Randevu almak istiyorum.";
            botText = "Randevu talebinizi <a href='/iletisim.html' style='color:#c5a059;font-weight:bold;'>buraya tıklayarak</a> iletebilirsiniz.";
        } else if(option === 'alanlar') {
            userText = "Çalışma alanları nelerdir?";
            botText = "Detaylar için <a href='/calisma-alanlari.html' style='color:#c5a059;font-weight:bold;'>tıklayınız.</a>";
        } else if(option === 'konum') {
            userText = "Ofis nerede?";
            botText = "Ofisimiz Ankara Sincan'dadır. Randevu ile çalışmaktayız.";
        } else if(option === 'ucret') {
            userText = "Danışmanlık ücretli mi?";
            botText = "Evet, Avukatlık Kanunu gereği danışmanlık hizmetleri ücrete tabidir.";
        }

        const userDiv = document.createElement('div');
        userDiv.className = 'chat-msg user';
        userDiv.innerHTML = userText;
        chatBody.insertBefore(userDiv, chatBody.querySelector('.chat-options'));

        setTimeout(() => {
            const botDiv = document.createElement('div');
            botDiv.className = 'chat-msg bot';
            botDiv.innerHTML = botText;
            chatBody.insertBefore(botDiv, chatBody.querySelector('.chat-options'));
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 600);
    };
}


/* ============================================================
   4. ÖZEL GÜNLER
============================================================ */
function initSpecialDays() {
    const today = new Date();
    const dateKeyFixed = `${today.getMonth() + 1}-${today.getDate()}`;
    let message = "", type = "", iconClass = "";

    if (dateKeyFixed === "10-29") { message = "29 Ekim Cumhuriyet Bayramımız Kutlu Olsun! 🇹🇷"; type = "national"; iconClass = "fa-solid fa-flag"; }
    else if (dateKeyFixed === "8-30") { message = "30 Ağustos Zafer Bayramımız Kutlu Olsun! 🇹🇷"; type = "national"; iconClass = "fa-solid fa-star"; }
    
    if (message) {
        const banner = document.createElement('div');
        banner.id = 'special-banner';
        banner.className = type;
        banner.innerHTML = `<div class="container"><i class="${iconClass}" aria-hidden="true"></i> ${message}</div>`;
        document.body.insertBefore(banner, document.body.firstChild);
        banner.style.display = 'block';
    }
}


/* ============================================================
   5. SEKME (TAB) SİSTEMİ
============================================================ */
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length === 0) return;

    function activateTab(btn) {
        tabBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
            b.setAttribute('tabindex', '-1');
        });
        tabContents.forEach(c => {
            c.classList.remove('active');
            c.style.display = 'none';
        });

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        btn.setAttribute('tabindex', '0');

        const targetId = btn.getAttribute('data-tab');
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.classList.add('active');
            targetContent.style.display = 'block';
        }
        btn.focus();
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => activateTab(btn));
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const currentIndex = Array.from(tabBtns).indexOf(btn);
                const nextIndex = (e.key === 'ArrowRight') 
                    ? (currentIndex + 1) % tabBtns.length 
                    : (currentIndex - 1 + tabBtns.length) % tabBtns.length;
                activateTab(tabBtns[nextIndex]);
            }
        });
    });
}


/* ============================================================
   6. İLETİŞİM FORMU (AJAX GÖNDERİM & VALIDASYON) - Madde 36
============================================================ */
function initContactForm() {
    const contactForm = document.getElementById('contactForm'); // HTML'deki ID ile eşleşmeli
    
    if (!contactForm) return;

    const emailInput = contactForm.querySelector('input[name="email"]');
    const emailError = document.getElementById('emailError');
    const successBox = document.getElementById('form-success');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    // E-posta Validasyon Fonksiyonu
    function validateEmailField() {
        if (!emailInput || !emailError) return true;
        
        const value = emailInput.value.trim();
        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        let message = "";

        if (!value) message = "Lütfen e-posta adresinizi giriniz.";
        else if (!emailRegex.test(value)) message = "Geçerli bir e-posta adresi giriniz.";

        if (message) {
            emailError.textContent = message;
            emailError.classList.add('active');
            emailInput.setAttribute('aria-invalid', 'true');
            return false;
        } else {
            emailError.textContent = "";
            emailError.classList.remove('active');
            emailInput.removeAttribute('aria-invalid');
            return true;
        }
    }

    // Canlı Kontrol
    if (emailInput) {
        emailInput.addEventListener('blur', validateEmailField);
        emailInput.addEventListener('input', () => {
            if (emailError && emailError.classList.contains('active')) validateEmailField();
        });
    }

    // Form Gönderimi (AJAX)
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Sayfa yenilenmesini engelle

        // 1. Validasyon Kontrolü
        if (!validateEmailField()) {
            emailInput.focus();
            return;
        }

        // 2. Butonu Pasife Al (Çift tıklamayı önle)
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = "Gönderiliyor...";

        // 3. Veriyi Gönder (Fetch)
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // BAŞARILI
                contactForm.reset(); // Formu temizle
                if (successBox) {
                    successBox.style.display = 'block';
                    // Başarı mesajına odaklan (Erişilebilirlik)
                    successBox.setAttribute('tabindex', '-1');
                    successBox.focus();
                }
            } else {
                // SUNUCU HATASI
                alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
            }
        } catch (error) {
            // BAĞLANTI HATASI
            alert("Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol ediniz.");
        } finally {
            // Butonu eski haline getir
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}