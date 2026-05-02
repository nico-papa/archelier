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
