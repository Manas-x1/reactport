import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingDock({ isOpen, onClose }) {
    // Close on click outside
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e) => {
            const dock = document.getElementById('homeDropdown');
            const toggleBtn = document.getElementById('homeMenuBtn');
            if (dock && !dock.contains(e.target) && toggleBtn && !toggleBtn.contains(e.target)) {
                onClose();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isOpen, onClose]);

    // Menu links config
    const links = [
        { href: "/", label: "Home", icon: "home" },
        { href: "/#work", label: "3D Monoliths", icon: "view_in_ar" },
        { href: "/#alternate-content", label: "Alternate Content", icon: "auto_awesome" },
        { href: "/#video-augmentation", label: "Video Augmentation", icon: "movie" },
        { href: "/#about", label: "About", icon: "person" },
        { href: "/#contact", label: "Contact", icon: "mail" },
    ];

    const handleClickLink = (e, href) => {
        onClose();
        if (href.startsWith("/#") || href === "/") {
            e.preventDefault();
            if (href === "/") {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const targetId = href.substring(1); // e.g. "/#work" -> "#work"
            const targetElement = document.querySelector(targetId);
            
            if (window.location.pathname !== "/") {
                window.location.href = href;
            } else if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    id="homeDropdown"
                    initial={{ opacity: 0, scale: 0.8, y: "-50%", x: -20 }}
                    animate={{ opacity: 1, scale: 1, y: "-50%", x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: "-50%", x: -20 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    className="absolute left-14 top-1/2 -translate-y-1/2 z-[60] flex items-center gap-3 bg-carbon/80 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 shadow-2xl"
                >
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={(e) => handleClickLink(e, link.href)}
                            className="group relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-smoke hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
                            aria-label={link.label}
                        >
                            <span className="material-symbols-outlined !text-[20px]">{link.icon}</span>
                            <span className="absolute bottom-[-36px] left-1/2 -translate-x-1/2 bg-carbon border border-white/10 text-white text-[9px] font-ui-nav uppercase tracking-widest px-2 py-1 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium shadow-xl">
                                {link.label}
                            </span>
                        </a>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
