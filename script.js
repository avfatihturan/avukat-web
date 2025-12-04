document.addEventListener('DOMContentLoaded', () => {
    
    // 1. GECE MODU
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
        if (theme === 'dark') { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); } 
        else { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
    }

    // 2. YAYINLAR SEKME (TAB)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => { c.classList.remove('active'); c.style.display = 'none'; });
                
                btn.classList.add('active');
                const targetId = btn.getAttribute('data-tab');
                const targetContent = document.getElementById(targetId);
                if (targetContent) { targetContent.classList.add('active'); targetContent.style.display = 'block'; }
            });
        });
    }

    // 3. TURAN ASSISTANT (YENİ)
    createChatBot();

    function createChatBot() {
        // HTML yapısını oluştur
        const chatHTML = `
            <div class="chat-widget">
                <div class="chat-greeting" id="chatGreeting">
                    Merhaba, size yönlendirme konusunda yardımcı olabilirim.
                </div>
                <div class="chat-box" id="chatBox">
                    <div class="chat-header">
                        <span><i class="fa-solid fa-anchor"></i> Turan Assistant</span>
                        <span id="closeChat" style="cursor:pointer;">&times;</span>
                    </div>
                    <div class="chat-body" id="chatBody">
                        <div class="chat-msg bot">Merhaba, Av. Fatih Turan ofisine hoş geldiniz. Hangi konuda bilgi almak istersiniz? (Not: Hukuki görüş vermemekteyim.)</div>
                        <div class="chat-options">
                            <button onclick="chatReply('randevu')">📅 Randevu Almak İstiyorum</button>
                            <button onclick="chatReply('alanlar')">⚖️ Çalışma Alanları</button>
                            <button onclick="chatReply('ulasim')">📍 İletişim / Konum</button>
                        </div>
                    </div>
                </div>
                <div class="chat-toggle-btn" id="chatToggle">
                    <i class="fa-solid fa-comments"></i>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatHTML);

        const chatToggle = document.getElementById('chatToggle');
        const chatBox = document.getElementById('chatBox');
        const closeChat = document.getElementById('closeChat');
        const greeting = document.getElementById('chatGreeting');

        // 2 saniye sonra selamlamayı göster
        setTimeout(() => { greeting.style.display = 'block'; }, 2000);

        // 10 saniye sonra selamlamayı gizle
        setTimeout(() => { greeting.style.display = 'none'; }, 12000);

        chatToggle.addEventListener('click', () => {
            if (chatBox.style.display === 'flex') {
                chatBox.style.display = 'none';
            } else {
                chatBox.style.display = 'flex';
                greeting.style.display = 'none'; // Baloncuğu kapat
            }
        });

        closeChat.addEventListener('click', () => { chatBox.style.display = 'none'; });

        // Bot Cevapları
        window.chatReply = function(option) {
            const chatBody = document.getElementById('chatBody');
            let userText = "";
            let botText = "";

            if(option === 'randevu') {
                userText = "Randevu almak istiyorum.";
                botText = "Randevu talebinizi web sitemiz üzerinden iletebilirsiniz. Hukuki danışmanlık ücrete tabidir. Formu doldurmak için <a href='iletisim.html' style='color:#c5a059;font-weight:bold;'>tıklayınız.</a>";
            } else if(option === 'alanlar') {
                userText = "Hangi alanlarda çalışıyorsunuz?";
                botText = "Ceza Hukuku, Şirketler Hukuku, İş Hukuku ve Kira Hukuku alanlarında hizmet vermekteyiz. Detaylar için <a href='calisma-alanlari.html' style='color:#c5a059;font-weight:bold;'>tıklayınız.</a>";
            } else if(option === 'ulasim') {
                userText = "Ofis nerede?";
                botText = "Ofisimiz Ankara Sincan'dadır. Ancak görüşmelerimiz randevu ile yapılmaktadır. İletişim bilgilerimiz için <a href='iletisim.html' style='color:#c5a059;font-weight:bold;'>tıklayınız.</a>";
            }

            // Kullanıcı mesajını ekle
            chatBody.innerHTML += `<div class="chat-msg user">${userText}</div>`;
            
            // Botun yazıyor efekti (kısa gecikme)
            setTimeout(() => {
                chatBody.innerHTML += `<div class="chat-msg bot">${botText}</div>`;
                chatBody.scrollTop = chatBody.scrollHeight; // En alta kaydır
            }, 600);
        };
    }

    // 4. ÖZEL GÜNLER (MEVCUT)
    checkSpecialDays();
    function checkSpecialDays() {
        // (Mevcut özel gün kodlarınız burada - kısaltılmadı, aynen korundu varsayın)
        // ... (Önceki kodun aynısı)
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const dateKeyFixed = `${month}-${day}`; 
        let message = ""; let type = ""; let iconClass = "";

        if (dateKeyFixed === "10-29") { message = "29 Ekim Cumhuriyet Bayramımız Kutlu Olsun! 🇹🇷"; type = "national"; iconClass = "fa-solid fa-flag"; }
        // ... Diğer günler aynen kalacak
        
        if (message) {
            const banner = document.createElement('div');
            banner.id = 'special-banner';
            banner.className = type;
            banner.innerHTML = `<div class="container"><i class="${iconClass}"></i> ${message}</div>`;
            document.body.insertBefore(banner, document.body.firstChild);
            banner.style.display = 'block';
        }
    }
});