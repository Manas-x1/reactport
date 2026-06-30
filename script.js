// JavaScript Interactions for Manas Upadhyay's Portfolio

document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Navigation Bar Background Change on Scroll
    const nav = document.querySelector('nav');
    const updateNavBackground = () => {
        if (window.scrollY > 50) {
            nav.classList.add('bg-black/60', 'backdrop-blur-md', 'border-b', 'border-white/10');
            nav.classList.remove('bg-transparent');
        } else {
            nav.classList.add('bg-transparent');
            nav.classList.remove('bg-black/60', 'backdrop-blur-md', 'border-b', 'border-white/10');
        }
    };
    
    window.addEventListener('scroll', updateNavBackground);
    updateNavBackground(); // Run once at start

    // 3. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve once revealed to keep performance high
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 4. Reach Out Buttons Micro-interactions
    const reachOutBtns = document.querySelectorAll('button, .group');
    reachOutBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(0.97)';
            btn.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
        });
    });
});
