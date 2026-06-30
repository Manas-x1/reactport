import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactModal({ isOpen, onClose }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'success', 'error'

    // Reset status when modal opens
    useEffect(() => {
        if (isOpen) {
            setStatus('idle');
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');

        fetch('https://formsubmit.co/ajax/manasx1upadhyay@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                _subject: `Portfolio Inquiry: ${subject}`,
                message
            })
        })
        .then(response => {
            if (response.ok) {
                setStatus('success');
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                throw new Error('Failed to send');
            }
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            setStatus('error');
            setTimeout(() => {
                setStatus('idle');
            }, 3000);
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] modal-overlay flex items-center justify-center px-element-md py-element-md"
                >
                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 320, damping: 24 }}
                        className="bg-carbon w-full max-w-[1100px] h-auto max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row border border-white/5 shadow-2xl"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-element-md right-element-md z-[110] text-ash hover:text-white transition-colors duration-300 cursor-pointer focus:outline-none"
                            aria-label="Close modal"
                        >
                            <span className="material-symbols-outlined scale-150">close</span>
                        </button>

                        {/* Left: Text/Editorial Content */}
                        <div className="w-full md:w-2/5 p-element-lg md:p-card-pad flex flex-col justify-between border-b md:border-b-0 md:border-r border-ash/20 bg-surface-container-lowest">
                            <div className="space-y-element-md">
                                <h2 className="font-heading-lg text-heading-lg text-white uppercase leading-[1.15] tracking-tight">
                                    LET'S <br /> TALK
                                </h2>
                                <p className="font-body-lg text-ash max-w-xs">
                                    Whether you're looking for a collaboration, a project commission, or just a quiet conversation about design.
                                </p>
                            </div>
                            <div className="mt-element-md md:mt-24 space-y-micro">
                                <p className="text-ui-nav uppercase text-pewter tracking-widest">General Inquiries</p>
                                <p className="font-body-md text-white">manasx1upadhyay@gmail.com</p>
                            </div>
                        </div>

                        {/* Right: Form Content */}
                        <div className="w-full md:w-3/5 p-element-lg md:p-card-pad bg-carbon flex flex-col">
                            <form onSubmit={handleSubmit} className="space-y-element-md flex-grow">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-element-md">
                                    <div className="group relative">
                                        <label className="block text-ui-nav uppercase text-ash group-focus-within:text-white transition-colors mb-micro" htmlFor="name">Name</label>
                                        <input
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-transparent border-t-0 border-x-0 border-b border-ash focus:border-white focus:ring-0 text-white font-body-md py-4 px-0 transition-all placeholder-ash/50 focus:outline-none"
                                            id="name"
                                            placeholder="John Doe"
                                            type="text"
                                        />
                                    </div>
                                    <div className="group relative">
                                        <label className="block text-ui-nav uppercase text-ash group-focus-within:text-white transition-colors mb-micro" htmlFor="email">Email</label>
                                        <input
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-transparent border-t-0 border-x-0 border-b border-ash focus:border-white focus:ring-0 text-white font-body-md py-4 px-0 transition-all placeholder-ash/50 focus:outline-none"
                                            id="email"
                                            placeholder="hello@domain.com"
                                            type="email"
                                        />
                                    </div>
                                </div>
                                <div className="group relative pt-micro">
                                    <label className="block text-ui-nav uppercase text-ash group-focus-within:text-white transition-colors mb-micro" htmlFor="subject">Subject</label>
                                    <input
                                        required
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="w-full bg-transparent border-t-0 border-x-0 border-b border-ash focus:border-white focus:ring-0 text-white font-body-md py-4 px-0 transition-all placeholder-ash/50 focus:outline-none"
                                        id="subject"
                                        placeholder="Inquiry about new project"
                                        type="text"
                                    />
                                </div>
                                <div className="group relative pt-micro">
                                    <label className="block text-ui-nav uppercase text-ash group-focus-within:text-white transition-colors mb-micro" htmlFor="message">Message</label>
                                    <textarea
                                        required
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full bg-transparent border-t-0 border-x-0 border-b border-ash focus:border-white focus:ring-0 text-white font-body-md py-4 px-0 transition-all placeholder-ash/50 resize-none focus:outline-none"
                                        id="message"
                                        placeholder="Share your vision..."
                                        rows="4"
                                    />
                                </div>
                                <div className="pt-element-md flex flex-col md:flex-row md:items-center justify-between gap-component-int">
                                    <p className="text-micro text-pewter max-w-[240px]">
                                        By submitting this form, you agree to our privacy policy regarding data handling.
                                    </p>
                                    <button
                                        disabled={status === 'sending' || status === 'success'}
                                        className="bg-white text-ink px-12 py-5 rounded-full font-ui-nav text-[12px] font-normal uppercase tracking-widest hover:bg-pewter hover:text-white transition-all duration-500 transform active:scale-95 flex items-center justify-center gap-2 group cursor-pointer focus:outline-none"
                                        type="submit"
                                    >
                                        {status === 'idle' && (
                                            <>
                                                Send Message
                                                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                            </>
                                        )}
                                        {status === 'sending' && (
                                            <>
                                                Sending...
                                                <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                                            </>
                                        )}
                                        {status === 'success' && (
                                            <>
                                                Message Sent
                                                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                            </>
                                        )}
                                        {status === 'error' && (
                                            <>
                                                Failed to Send
                                                <span className="material-symbols-outlined text-[18px]">error</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
