// GECE MODU VE MOBİL MENÜ KONTROLÜ

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggleBtn.querySelector('i');

    // 1. Daha önce seçilen bir mod var mı kontrol et
    const currentTheme = localStorage.getItem('theme');

    // Eğer varsa o modu uygula
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        updateIcon(currentTheme);
    }

    // 2. Butona tıklanınca modu değiştir
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = body.getAttribute('data-theme');

            if (theme === 'dark') {
                // Gündüze geç
                body.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                updateIcon('light');
            } else {
                // Geceye geç
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                updateIcon('dark');
            }
        });
    }

    // İkonu değiştiren fonksiyon
    function updateIcon(theme) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun'); // Gece modundaysak Güneş göster
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon'); // Gündüz modundaysak Ay göster
        }
    }
});