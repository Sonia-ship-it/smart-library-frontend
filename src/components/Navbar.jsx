import React, { useState, useEffect } from 'react';
import avatarImg from '../assets/avatar.png';
import { Link } from 'react-router-dom';
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi";
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [IsDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "CheckOut", href: "/checkout" }
  ];

  const { currentUser, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  const cartItems = useSelector(state => state.cart.cartItems);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 lg:px-24 ${scrolled ? 'py-4' : 'py-8'}`}>
      <nav className={`max-w-screen-2xl mx-auto flex justify-between items-center px-8 py-4 rounded-[2rem] transition-all duration-500 ${scrolled ? 'glass-card bg-white/80 shadow-2xl border-white/50' : 'bg-transparent border-transparent'}`}>
        {/* Left side: Logo & Search */}
        <div className="flex items-center gap-12 flex-1">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-12 w-12 primary-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-500 group-hover:scale-110">
              <span className="text-white font-bold text-2xl tracking-tighter">SL</span>
            </div>
            <span className="hidden lg:block text-2xl font-primary font-bold tracking-tight text-[#451A03]">
              Smart<span className="text-primary italic">Library</span>
            </span>
          </Link>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <IoSearchOutline className="text-amber-900/40 size-5" />
            </div>
            <input
              type="text"
              placeholder="Search chronicles..."
              className="w-full bg-white/40 border border-white/60 backdrop-blur-sm px-14 py-3 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all outline-none text-sm font-semibold text-amber-900 placeholder:text-amber-900/40"
            />
          </div>
        </div>

        {/* Right side: Actions */}
        <div className="flex items-center gap-3 md:gap-8">
          <div className="relative">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!IsDropdownOpen)}
                  className="flex items-center group"
                >
                  <img
                    src={avatarImg || (currentUser.photoURL)}
                    alt="avatar"
                    className="size-11 rounded-2xl border-2 border-primary/10 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all object-cover"
                  />
                </button>

                <AnimatePresence>
                  {IsDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-64 glass-card p-4 shadow-3xl border-white/60"
                    >
                      <div className="pb-4 border-b border-amber-50 mb-4 px-2">
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Authenticated</p>
                        <p className="text-sm font-bold truncate text-[#451A03]">{currentUser.email}</p>
                      </div>
                      <ul className="space-y-1.5">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              to={item.href}
                              className="block px-4 py-3 text-sm font-bold text-amber-900/60 hover:bg-primary/5 hover:text-primary rounded-xl transition-all"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                        <li className="pt-2">
                          <button
                            className="w-full text-left px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="p-3 hover:bg-white/50 rounded-2xl transition-all group">
                <HiOutlineUser className="size-6 text-amber-900/60 group-hover:text-primary transition-colors" />
              </Link>
            )}
          </div>

          <button className="hidden sm:flex p-3 hover:bg-white/50 rounded-2xl transition-all relative group">
            <HiOutlineHeart className="size-6 text-amber-900/60 group-hover:text-rose-500 transition-colors" />
            <span className="absolute top-3 right-3 size-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>

          <Link
            to="/cart"
            className="flex items-center gap-3 bg-[#451A03] hover:bg-[#2D1102] text-white pl-5 pr-2 py-2 rounded-2xl shadow-xl shadow-amber-900/20 hover:shadow-amber-900/40 active:scale-95 transition-all group"
          >
            <span className="font-black text-sm uppercase tracking-widest hidden md:block">Collection</span>
            <div className="bg-primary size-10 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform">
              <HiOutlineShoppingCart className="size-5" />
            </div>
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white size-6 flex items-center justify-center rounded-full text-[10px] font-black border-2 border-white animate-bounce-short">
                {cartItems.length}
              </span>
            )}
          </Link>

          <button className="md:hidden p-3 hover:bg-white/50 rounded-2xl transition-all">
            <HiOutlineBars3CenterLeft className="size-6 text-amber-900/60" />
          </button>
        </div>
      </nav>
    </header>
  );
};


