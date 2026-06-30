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

    // 2. Dynamic Navigation Bar Theme on Scroll & Intersection
    const nav = document.querySelector('nav');
    const homeMenuBtn = document.getElementById('homeMenuBtn');
    const reachOutNavBtn = document.getElementById('reachOutNavBtn');
    const sections = document.querySelectorAll('section, header, footer');

    const updateNavTheme = () => {
        if (!nav) return;

        // 1. Transparent Nav at the top of the page
        if (window.scrollY < 50) {
            nav.className = "fixed top-0 left-0 w-full z-50 bg-transparent border-b border-transparent transition-all duration-500";
            if (homeMenuBtn) {
                homeMenuBtn.classList.remove('text-ink');
                homeMenuBtn.classList.add('text-paper');
            }
            if (reachOutNavBtn) {
                reachOutNavBtn.classList.remove('bg-ink', 'text-paper');
                reachOutNavBtn.classList.add('bg-paper', 'text-ink');
            }
            return;
        }

        // 2. Scrolled state: Detect active section under the nav bar (around y = 80px)
        let currentSection = null;
        const navHeight = 80;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= navHeight && rect.bottom >= navHeight) {
                currentSection = section;
            }
        });

        if (currentSection) {
            const isLight = currentSection.classList.contains('bg-paper') || currentSection.classList.contains('bg-white');

            if (isLight) {
                // Scrolled over Light Section: White translucent nav with dark text/elements
                nav.className = "fixed top-0 left-0 w-full z-50 bg-white/20 backdrop-blur-md border-b border-black/10 transition-all duration-500";
                if (homeMenuBtn) {
                    homeMenuBtn.classList.remove('text-paper');
                    homeMenuBtn.classList.add('text-ink');
                }
                if (reachOutNavBtn) {
                    reachOutNavBtn.classList.remove('bg-paper', 'text-ink');
                    reachOutNavBtn.classList.add('bg-ink', 'text-paper');
                }
            } else {
                // Scrolled over Dark Section: Black translucent nav with light text/elements
                nav.className = "fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-white/10 transition-all duration-500";
                if (homeMenuBtn) {
                    homeMenuBtn.classList.remove('text-ink');
                    homeMenuBtn.classList.add('text-paper');
                }
                if (reachOutNavBtn) {
                    reachOutNavBtn.classList.remove('bg-ink', 'text-paper');
                    reachOutNavBtn.classList.add('bg-paper', 'text-ink');
                }
            }
        }
    };

    window.addEventListener('scroll', updateNavTheme);
    updateNavTheme(); // Run once at start

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
    const openBtns = [document.getElementById('collaborateBtn')];
    const contactForm = document.getElementById('contactForm');

    const openModal = () => {
        if (!modal) return;
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
        if (!modal) return;
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
    // 6. Home Menu Dropdown Logic
    const homeDropdown = document.getElementById('homeDropdown');

    if (homeMenuBtn && homeDropdown) {
        const toggleDropdown = (show) => {
            if (show) {
                homeDropdown.classList.remove('pointer-events-none', 'opacity-0', '-translate-y-4');
                homeDropdown.classList.add('opacity-100', 'translate-y-0');
            } else {
                homeDropdown.classList.remove('opacity-100', 'translate-y-0');
                homeDropdown.classList.add('pointer-events-none', 'opacity-0', '-translate-y-4');
            }
        };

        homeMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = !homeDropdown.classList.contains('opacity-0');
            toggleDropdown(!isOpen);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!homeDropdown.contains(e.target) && e.target !== homeMenuBtn) {
                toggleDropdown(false);
            }
        });

        // Close menu when clicking a link inside it
        homeDropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggleDropdown(false);
            });
        });
    }

    // 7. Reach Out Navigation Button Smooth Scroll
    if (reachOutNavBtn) {
        reachOutNavBtn.addEventListener('click', (e) => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                e.preventDefault();
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // 8. Scroll to Top Button Logic
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                scrollTopBtn.classList.add('opacity-100');
            } else {
                scrollTopBtn.classList.remove('opacity-100');
                scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 9. Open contact modal automatically if URL hash is #contact
    const checkHashAndOpenContact = () => {
        if (window.location.hash === '#contact') {
            setTimeout(openModal, 600); // Delay to let scroll finish
        }
    };
    checkHashAndOpenContact();
    window.addEventListener('hashchange', checkHashAndOpenContact);
});

