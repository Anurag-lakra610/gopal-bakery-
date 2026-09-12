// ==========================================================================
// THE GOPAL'S BAKERY - INTERACTIVE SCRIPTS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // --- THUMBNAIL BADGE INTERACTION & IMAGE SWAPPER ---
    const badges = document.querySelectorAll('.thumb-badge');
    const featuredImg = document.getElementById('featured-hero-img');
    const secondaryImg = document.getElementById('secondary-hero-img');

    // Mapping for product assets (all full-ratio rectangular images)
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
        let currentIndex = totalOriginal; // Start at index of first real card
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

        // Initialize position at first real card without animation
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
            // Seamless wrap around when passing real card boundaries
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
