// ==========================================================================
// THE GOPAL'S BAKERY - INTERACTIVE SCRIPTS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // --- THUMBNAIL BADGE INTERACTION & IMAGE SWAPPER ---
    const badges = document.querySelectorAll('.thumb-badge');
    const featuredImg = document.getElementById('featured-hero-img');
    const secondaryImg = document.getElementById('secondary-hero-img');

    // Mapping for product assets
    const productMap = {
        'cake-main': {
            main: 'assets/hero-card-cake.jpg',
            secondary: 'assets/hero-card-cookies.jpg'
        },
        'cookies-main': {
            main: 'assets/hero-card-cookies.jpg',
            secondary: 'assets/badge-cake.png'
        },
        'pink-main': {
            main: 'assets/badge-pink-cake.png',
            secondary: 'assets/badge-cookies.png'
        }
    };

    badges.forEach(badge => {
        badge.addEventListener('click', () => {
            // Remove active class from all badges
            badges.forEach(b => b.classList.remove('active'));
            // Add active class to clicked badge
            badge.classList.add('active');

            const targetKey = badge.getAttribute('data-target');
            if (productMap[targetKey]) {
                // Fade out main image slightly
                featuredImg.style.opacity = '0.3';
                featuredImg.style.transform = 'scale(0.96)';

                setTimeout(() => {
                    featuredImg.src = productMap[targetKey].main;
                    secondaryImg.src = productMap[targetKey].secondary;
                    featuredImg.style.opacity = '1';
                    featuredImg.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });

    // --- ACTIVE NAVBAR LINK HANDLER ---
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // --- MOBILE MENU TOGGLE ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });
    }

});
