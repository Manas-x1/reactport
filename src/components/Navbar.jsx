import React, { useState, useEffect } from 'react';
import FloatingDock from './FloatingDock';

export default function Navbar() {
    const [theme, setTheme] = useState('transparent'); // 'transparent', 'light', 'dark'
    const [isDockOpen, setIsDockOpen] = useState(false);

    useEffect(() => {
        const updateNavTheme = () => {
            if (window.scrollY < 50) {
                setTheme('transparent');
                return;
            }

            const sections = document.querySelectorAll('section, header, footer');
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
                setTheme(isLight ? 'light' : 'dark');
            }
        };

        window.addEventListener('scroll', updateNavTheme);
        updateNavTheme(); // Run once at mount

        return () => window.removeEventListener('scroll', updateNavTheme);
    }, []);

    const scrollToContact = (e) => {
        if (window.location.pathname !== "/") {
            window.location.href = "/#contact";
            return;
        }
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            e.preventDefault();
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Determine classes based on theme state
    let navClass = "fixed top-0 left-0 w-full z-50 bg-transparent border-b border-transparent transition-all duration-500";
    let homeBtnClass = "text-paper hover:text-primary transition-colors flex items-center justify-center cursor-pointer select-none focus:outline-none";
    let reachBtnClass = "bg-paper text-ink px-element-md py-3 rounded-full font-ui-nav text-ui-nav uppercase tracking-widest scale-100 hover:scale-95 transition-all duration-500 text-center select-none cursor-pointer";

    if (theme === 'light') {
        navClass = "fixed top-0 left-0 w-full z-50 bg-white/20 backdrop-blur-md border-b border-black/10 transition-all duration-500";
        homeBtnClass = "text-ink hover:text-primary transition-colors flex items-center justify-center cursor-pointer select-none focus:outline-none";
        reachBtnClass = "bg-ink text-paper px-element-md py-3 rounded-full font-ui-nav text-ui-nav uppercase tracking-widest scale-100 hover:scale-95 transition-all duration-500 text-center select-none cursor-pointer";
    } else if (theme === 'dark') {
        navClass = "fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-white/10 transition-all duration-500";
        homeBtnClass = "text-paper hover:text-primary transition-colors flex items-center justify-center cursor-pointer select-none focus:outline-none";
        reachBtnClass = "bg-paper text-ink px-element-md py-3 rounded-full font-ui-nav text-ui-nav uppercase tracking-widest scale-100 hover:scale-95 transition-all duration-500 text-center select-none cursor-pointer";
    }

    return (
        <nav className={navClass}>
            <div className="max-w-[1440px] mx-auto w-full flex justify-between items-center px-element-lg py-4 relative">
                <div className="flex items-center gap-nav-gap relative">
                    <button 
                        id="homeMenuBtn"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsDockOpen(!isDockOpen);
                        }}
                        className={homeBtnClass}
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-outlined !text-[32px]">home</span>
                    </button>
                    
                    <FloatingDock isOpen={isDockOpen} onClose={() => setIsDockOpen(false)} />
                </div>
                <button 
                    id="reachOutNavBtn"
                    onClick={scrollToContact}
                    className={reachBtnClass}
                >
                    Reach out
                </button>
            </div>
        </nav>
    );
}
