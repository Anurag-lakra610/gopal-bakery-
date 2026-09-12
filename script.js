// ==========================================================================
// THE GOPAL'S BAKERY - FULL INTERACTIVE SCRIPTS & BUTTON HANDLERS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- TOAST NOTIFICATION HELPER ---
    function showToast(message) {
        let toast = document.getElementById('gopal-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'gopal-toast';
            toast.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                background-color: #5C0612;
                color: #FFFFFF;
                padding: 16px 28px;
                border-radius: 30px;
                font-family: 'Sniglet', cursive, sans-serif;
                font-size: 1rem;
                box-shadow: 0 10px 30px rgba(92, 6, 18, 0.4);
                z-index: 9999;
                display: flex;
                align-items: center;
                gap: 12px;
                transition: all 0.4s ease;
                opacity: 0;
                transform: translateY(20px);
                border: 2px solid #EAA00D;
            `;
            document.body.appendChild(toast);
        }

        toast.innerHTML = `<span>🍰</span> ${message}`;
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
        }, 3200);
    }
    
    // --- THUMBNAIL BADGE INTERACTION & IMAGE SWAPPER ---
    const badges = document.querySelectorAll('.thumb-badge');
    const featuredImg = document.getElementById('featured-hero-img');
    const secondaryImg = document.getElementById('secondary-hero-img');

    const productMap = {
        'cake-main': {
            main: 'assets/hero-card-cake.jpg',
            secondary: 'assets/hero-card-cookies.jpg'
        },
        'cookies-main': {
            main: 'assets/hero-card-cookies.jpg',
            secondary: 'assets/hero-pink-cake-large.jpg'
        },
        'pink-main': {
            main: 'assets/hero-pink-cake-large.jpg',
            secondary: 'assets/hero-card-cookies.jpg'
        }
    };

    badges.forEach(badge => {
        badge.addEventListener('click', () => {
            badges.forEach(b => b.classList.remove('active'));
            badge.classList.add('active');

            const targetKey = badge.getAttribute('data-target');
            if (productMap[targetKey]) {
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

    // --- SMOOTH SCROLLING FOR ALL ANCHOR LINKS (#) & NAV CLOSE ---
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
    const navMenu = document.getElementById('nav-menu');
    const mobileToggle = document.getElementById('mobile-toggle');

    allAnchorLinks.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Close mobile navigation drawer if open
                    if (navMenu && navMenu.classList.contains('mobile-active')) {
                        navMenu.classList.remove('mobile-active');
                        if (mobileToggle) {
                            const icon = mobileToggle.querySelector('i');
                            if (icon) {
                                icon.classList.add('fa-bars');
                                icon.classList.remove('fa-xmark');
                            }
                        }
                    }
                }
            }
        });
    });

    // --- MOBILE MENU TOGGLE ---
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

    // --- SEARCH BUTTON INTERACTION ---
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const query = prompt("What delicious treat are you looking for? (e.g., Chocolate Cake, Cookies, Pastries)");
            if (query && query.trim() !== "") {
                showToast(`Searching for "${query.trim()}"... Check our products section!`);
                const productsSec = document.getElementById('products');
                if (productsSec) {
                    productsSec.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    // --- BUTTON ORDER / CLICK FEEDBACK HANDLERS ---
    const actionButtons = document.querySelectorAll('.btn-card-add, .btn-hero-primary, .btn-feature-gold, .btn-pastry-gold, .btn-community-gold, .btn-cta-gold');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const text = btn.innerText || "Order";
            showToast(`Opening ${text}... Freshly baked happiness is on its way!`);
        });
    });

    // --- SECTION 2 CAROUSEL SLIDER CONTROLS & PROGRESS BAR ---
    const track = document.getElementById('carousel-track');
    const btnPrev = document.getElementById('slide-prev');
    const btnNext = document.getElementById('slide-next');
    const progressFill = document.getElementById('progress-fill');

    if (track && btnPrev && btnNext && progressFill) {
        const scrollAmount = 330;

        btnNext.addEventListener('click', () => {
            const maxScrollLeft = track.scrollWidth - track.clientWidth;
            if (track.scrollLeft >= maxScrollLeft - 15) {
                track.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });

        btnPrev.addEventListener('click', () => {
            const maxScrollLeft = track.scrollWidth - track.clientWidth;
            if (track.scrollLeft <= 15) {
                track.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        });

        const updateProgress = () => {
            const maxScrollLeft = track.scrollWidth - track.clientWidth;
            if (maxScrollLeft > 0) {
                const scrollRatio = track.scrollLeft / maxScrollLeft;
                const minWidthPercent = 25;
                const fillPercent = minWidthPercent + (scrollRatio * (100 - minWidthPercent));
                progressFill.style.width = `${fillPercent}%`;
            } else {
                progressFill.style.width = '100%';
            }
        };

        track.addEventListener('scroll', updateProgress);
        window.addEventListener('resize', updateProgress);
        updateProgress();
    }

    // --- SECTION 8: SEAMLESS INFINITE LOOP TESTIMONIALS SLIDER ---
    const tTrack = document.getElementById('testimonials-track');
    const tPrevBtn = document.getElementById('t-prev-btn');
    const tNextBtn = document.getElementById('t-next-btn');

    if (tTrack && tPrevBtn && tNextBtn) {
        const originalCards = Array.from(tTrack.children);
        const totalOriginal = originalCards.length;

        // Clone cards to append to end
        originalCards.forEach(card => {
            const cloneEnd = card.cloneNode(true);
            cloneEnd.classList.add('clone-end');
            tTrack.appendChild(cloneEnd);
        });

        // Clone cards to prepend to start
        originalCards.slice().reverse().forEach(card => {
            const cloneStart = card.cloneNode(true);
            cloneStart.classList.add('clone-start');
            tTrack.insertBefore(cloneStart, tTrack.firstChild);
        });

        const allCards = Array.from(tTrack.children);
        let currentIndex = totalOriginal;
        let isTransitioning = false;

        function calculateOffset(index) {
            const cardWidth = allCards[0].offsetWidth;
            const gap = 36;
            const viewportWidth = window.innerWidth;
            return (viewportWidth - cardWidth) / 2 - index * (cardWidth + gap);
        }

        function setSliderPosition(index, animate = true) {
            if (!animate) {
                tTrack.style.transition = 'none';
            } else {
                tTrack.style.transition = 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)';
            }
            const offset = calculateOffset(index);
            tTrack.style.transform = `translateX(${offset}px)`;
        }

        setSliderPosition(currentIndex, false);

        tNextBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex++;
            setSliderPosition(currentIndex, true);
        });

        tPrevBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex--;
            setSliderPosition(currentIndex, true);
        });

        tTrack.addEventListener('transitionend', () => {
            isTransitioning = false;
            if (currentIndex >= totalOriginal * 2) {
                currentIndex = totalOriginal;
                setSliderPosition(currentIndex, false);
            } else if (currentIndex < totalOriginal) {
                currentIndex = totalOriginal * 2 - 1;
                setSliderPosition(currentIndex, false);
            }
        });

        window.addEventListener('resize', () => {
            setSliderPosition(currentIndex, false);
        });
    }

});
