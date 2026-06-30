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

    // 5. Contact Modal Logic (Open/Close & Mailto)
    const modal = document.getElementById('contactModal');
    const modalContainer = document.getElementById('modalContainer');
    const closeBtn = document.getElementById('closeModal');
    const openBtns = [document.getElementById('reachOutNavBtn'), document.getElementById('collaborateBtn')];
    const contactForm = document.getElementById('contactForm');

    const openModal = () => {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scroll
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.classList.add('opacity-100');
            modalContainer.classList.remove('translate-y-8', 'opacity-0');
            modalContainer.classList.add('translate-y-0', 'opacity-100');
        }, 50);
    };

    const closeModal = () => {
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0');
        modalContainer.classList.remove('translate-y-0', 'opacity-100');
        modalContainer.classList.add('translate-y-8', 'opacity-0');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scroll
        }, 300);
    };

    // Attach open listeners
    openBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        }
    });

    // Attach close listener
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close on click outside modal container
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close on escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Form Submit Handler (AJAX via FormSubmit.co)
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Visual feedback on button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `Sending... <span class="material-symbols-outlined text-[18px] animate-spin">sync</span>`;
            submitBtn.classList.add('bg-amber-500', 'text-black');
            submitBtn.classList.remove('bg-white', 'text-ink');

            // Send via FormSubmit AJAX API
            fetch('https://formsubmit.co/ajax/manasx1upadhyay@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    _subject: `Portfolio Inquiry: ${subject}`,
                    message: message,
                    _captcha: 'false' // Disables the captcha redirection step
                })
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                submitBtn.innerHTML = `Message Sent <span class="material-symbols-outlined text-[18px]">done</span>`;
                submitBtn.classList.remove('bg-amber-500');
                submitBtn.classList.add('bg-emerald-500', 'text-white');

                // If first time, notify user to check activation email
                const firstTimeNotice = data.message && data.message.includes('Activation');
                if (firstTimeNotice) {
                    alert('Almost there! Please check your email inbox (manasx1upadhyay@gmail.com) to activate FormSubmit for this form.');
                }

                setTimeout(() => {
                    closeModal();
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalContent;
                        submitBtn.classList.remove('bg-emerald-500', 'text-white');
                        submitBtn.classList.add('bg-white', 'text-ink');
                    }, 500);
                }, 2000);
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                submitBtn.innerHTML = `Failed to Send <span class="material-symbols-outlined text-[18px]">error</span>`;
                submitBtn.classList.remove('bg-amber-500');
                submitBtn.classList.add('bg-red-500', 'text-white');
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalContent;
                    submitBtn.classList.remove('bg-red-500', 'text-white');
                    submitBtn.classList.add('bg-white', 'text-ink');
                }, 3000);
            });
        });
    }
});

