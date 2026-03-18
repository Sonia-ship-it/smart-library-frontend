import React from 'react';
import footerLogo from '../assets/footer-logo.png';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const Footer = () => {
    return (
        <footer className="bg-[#1C1917] text-amber-50/60 py-20 px-6 lg:px-24">
            <div className="max-w-screen-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                                <span className="text-white font-bold text-xl">S</span>
                            </div>
                            <span className="text-2xl font-primary font-bold tracking-tight text-white">
                                Smart<span className="text-primary">Library</span>
                            </span>
                        </div>
                        <p className="text-amber-50/40 mb-10 max-w-sm leading-relaxed font-secondary">
                            Curating the world's most exquisite collection of literary wonders. We believe every story has a soul, and every reader deserves a masterpiece.
                        </p>
                        <div className="flex items-center gap-4">
                            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, idx) => (
                                <a key={idx} href="#" className="p-3 bg-stone-800/50 text-amber-500 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 border border-stone-800 hover:border-primary/50">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-primary font-bold text-lg mb-8">Discover</h4>
                        <ul className="space-y-4 font-medium font-secondary">
                            {['Home', 'New Arrivals', 'Best Sellers', 'Specials', 'Contact'].map((link) => (
                                <li key={link}><a href="#" className="hover:text-primary transition-all duration-200 flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>{link}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Information */}
                    <div>
                        <h4 className="text-white font-primary font-bold text-lg mb-8">Information</h4>
                        <ul className="space-y-4 font-medium font-secondary">
                            {['Our Story', 'Shipping & Taste', 'Privacy Policy', 'Terms of Service', 'FAQ'].map((link) => (
                                <li key={link}><a href="#" className="hover:text-primary transition-all duration-200 flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>{link}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="lg:col-span-1">
                        <h4 className="text-white font-primary font-bold text-lg mb-8">Taste Our News</h4>
                        <p className="text-amber-50/40 mb-8 leading-relaxed font-secondary">
                            Get fresh literary updates and exclusive invitations to our seasonal events.
                        </p>
                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary/40 text-white outline-none transition-all placeholder:text-stone-600 font-secondary"
                            />
                            <button className="w-full bg-primary hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl shadow-xl shadow-primary/10 transition-all active:scale-95">
                                Subscribe Now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-stone-800/50 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium font-secondary">
                    <p className="text-amber-50/20">© 2026 SmartLibrary. Crafted with passion for readers.</p>
                    <div className="flex items-center gap-10 text-amber-50/30">
                        <a href="#" className="hover:text-primary transition-colors">Support</a>
                        <a href="#" className="hover:text-primary transition-colors">Cookies</a>
                        <a href="#" className="hover:text-primary transition-colors">Security</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};


