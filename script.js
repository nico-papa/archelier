gsap.registerPlugin(ScrollTrigger);

// Header background change on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Initial Hero Animations
const tl = gsap.timeline();
tl.to('.hero-title, .hero-subtitle', {
    y: 0,
    opacity: 1,
    duration: 1.2,
    stagger: 0.2,
    ease: "power3.out",
    delay: 0.5
});

// Scroll Reveal Animations
gsap.utils.toArray('.reveal-text').forEach(elem => {
    // Skip hero elements as they intersect immediately
    if (elem.classList.contains('hero-title') || elem.classList.contains('hero-subtitle')) return;
    
    gsap.to(elem, {
        scrollTrigger: {
            trigger: elem,
            start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    });
});

gsap.utils.toArray('.reveal-image').forEach(elem => {
    gsap.to(elem, {
        scrollTrigger: {
            trigger: elem,
            start: "top 80%",
        },
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        duration: 1.5,
        ease: "power4.inOut"
    });
});

// Demo Video Modal
(function () {
    const trigger = document.getElementById('demoTrigger');
    const modal = document.getElementById('videoModal');
    if (!trigger || !modal) return;

    const video = document.getElementById('demoVideo');
    const closeBtn = modal.querySelector('.video-modal-close');
    const backdrop = modal.querySelector('.video-modal-backdrop');

    function openModal() {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (video) {
            try { video.currentTime = 0; } catch (_) {}
            video.muted = false;
            const p = video.play();
            if (p && typeof p.catch === 'function') {
                // 音ありで autoplay 失敗したらミュートで再生 → ユーザーが手動で音量調整
                p.catch(() => {
                    video.muted = true;
                    video.play().catch(() => {});
                });
            }
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (video) video.pause();
    }

    trigger.addEventListener('click', openModal);
    trigger.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal();
        }
    });
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
})();
