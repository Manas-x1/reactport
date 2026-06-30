import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import WorkMonoliths from '../components/WorkMonoliths';
import AlternateContent from '../components/AlternateContent';
import VideoAugmentation from '../components/VideoAugmentation';
import About from '../components/About';
import ContactModal from '../components/ContactModal';
import ScrollToTop from '../components/ScrollToTop';

export default function Home() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    useEffect(() => {
        // Intersection Observer for scroll reveal animations
        const revealElements = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
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

        // Auto-open contact modal on load/navigation if URL hash is #contact
        if (window.location.hash === '#contact') {
            // Slight timeout to let DOM render
            setTimeout(() => setIsContactOpen(true), 300);
        }

        const handleHashChange = () => {
            if (window.location.hash === '#contact') {
                setIsContactOpen(true);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            revealObserver.disconnect();
        };
    }, []);

    return (
        <div className="w-full">
            <Hero />
            <WorkMonoliths />
            <AlternateContent />
            <VideoAugmentation />
            <About />

            {/* 5. Call to Action */}
            <section className="bg-ink py-offset-lg px-element-lg overflow-hidden relative" id="contact">
                <div className="max-w-[1440px] mx-auto text-center reveal">
                    <button 
                        onClick={() => setIsContactOpen(true)}
                        id="collaborateBtn" 
                        className="block w-full group relative focus:outline-none cursor-pointer"
                    >
                        <h2 className="font-hero text-[80px] md:text-[152px] leading-none text-paper uppercase group-hover:text-ash transition-colors duration-500 text-center">
                            LET'S<br />COLLABORATE
                        </h2>
                        <div className="mt-element-md inline-flex items-center gap-micro group-hover:opacity-100 opacity-50 transition-opacity">
                            <span className="font-ui-nav text-ui-nav text-paper uppercase tracking-widest">Get in Touch</span>
                            <span className="material-symbols-outlined text-paper" data-weight="fill">arrow_outward</span>
                        </div>
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-surface-container-lowest relative overflow-hidden w-full flex flex-col items-center justify-center pt-section-v pb-element-lg px-element-lg border-t border-ash/20">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                    <img 
                        alt="MU Large Logo Background" 
                        className="w-[80vw] object-contain" 
                        src="https://lh3.googleusercontent.com/aida/AP1WRLvBF1zfsW2s5kunNtrgHaSWlvsSkQfM7mik98qFWIg_MN1pFWrdioZawK5E0P2dJWrkHeNGWq5LNwFrGGDV0APWR4Wn9Ku7f79kFZNw5jnBGmq_eATdJ04QnmAGBcz5SsZqZeZsNtke3phpdHWOwZevSFFV5C2y5Enyqh-mNF_2zQw3hBTupzSIjJgEimeYc8HUTlhUfSTynbbJWtqSKAmAwULGgseHvO4xniFA2UoweEzgP-N-paHIw_fY" 
                    />
                </div>
                <div className="relative z-10 w-full max-w-[1440px] flex flex-col md:flex-row justify-between items-center gap-element-md">
                    <div className="font-body-md text-body-md text-ash uppercase">
                        © 2026 MANAS UPADHYAY. ALL RIGHTS RESERVED.
                    </div>
                    <div className="flex gap-element-md">
                        <a className="font-body-md text-body-md text-ash hover:text-on-surface transition-all" href="#">Instagram</a>
                        <a className="font-body-md text-body-md text-ash hover:text-on-surface transition-all" href="#">LinkedIn</a>
                        <a className="font-body-md text-body-md text-ash hover:text-on-surface transition-all" href="#">Twitter</a>
                        <a className="font-body-md text-body-md text-ash hover:text-on-surface transition-all" href="#">Dribbble</a>
                    </div>
                </div>
            </footer>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
            <ScrollToTop />
        </div>
    );
}
