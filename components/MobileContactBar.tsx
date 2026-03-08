"use client";

import { motion } from "framer-motion";

const WhatsAppIcon = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
);

const MailIcon = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const PhoneIcon = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

export default function MobileContactBar() {
    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-t border-white/10 p-4 pb-6 flex justify-around items-center"
        >
            <a
                href="https://wa.me/919929986743?text=Hi%20Anurag,%20I%20want%20to%20discuss%20AI%20automation%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 text-teal-400 hover:text-teal-300 transition-colors"
            >
                <div className="w-10 h-10 rounded-full pearl-bg flex items-center justify-center text-black shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                    <WhatsAppIcon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono tracking-wider uppercase">WhatsApp</span>
            </a>

            <a
                href="mailto:15anuragsingh2003@gmail.com"
                className="flex flex-col items-center gap-1 text-white/80 hover:text-white transition-colors"
            >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <MailIcon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono tracking-wider uppercase">Email</span>
            </a>

            <a
                href="tel:+919929986743"
                className="flex flex-col items-center gap-1 text-white/80 hover:text-white transition-colors"
            >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <PhoneIcon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono tracking-wider uppercase">Call</span>
            </a>
        </motion.div>
    );
}
