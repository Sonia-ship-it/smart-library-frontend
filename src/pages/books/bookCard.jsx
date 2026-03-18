import React from 'react';
import { FiShoppingCart, FiEye, FiTrendingUp } from 'react-icons/fi';
import { getImgUrl } from '../../util/getImgUrl';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { motion } from 'framer-motion';

export const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="group flex flex-col h-full w-full"
    >
      {/* Hero Image Container */}
      <div className="relative w-full aspect-[3/4] rounded-[2rem] bg-amber-50/40 p-6 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:bg-amber-100/50">
        <Link to={`/books/${book._id}`} className="relative w-full h-full block">
          <img
            src={getImgUrl(book.coverImage)}
            alt={book.title}
            className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2 ease-out"
          />
        </Link>

        {/* Floating Trending Badge */}
        {book.trending && (
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-white text-[#451A03] text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-sm">
              Trending
            </span>
          </div>
        )}

        {/* Minimalist Quick View Overlay */}
        <div className="absolute inset-0 bg-[#451A03]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 pointer-events-none">
          <Link
            to={`/books/${book._id}`}
            className="pointer-events-auto w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#451A03] hover:text-white hover:bg-primary hover:scale-110 transition-all duration-300 shadow-2xl transform translate-y-4 group-hover:translate-y-0"
          >
            <FiEye size={24} />
          </Link>
        </div>
      </div>

      {/* High-End Typography & Content Area */}
      <div className="flex flex-col flex-1 pt-6 px-2">
        {/* Category & Rating Row */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">
            {book.category}
          </span>
        </div>

        {/* Title */}
        <Link to={`/books/${book._id}`}>
          <h3 className="text-2xl font-primary font-black text-[#451A03] leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {book.title}
          </h3>
        </Link>

        {/* Description Excerpt */}
        <p className="text-[#451A03]/60 text-sm font-medium line-clamp-2 mb-6 leading-relaxed">
          {book.description}
        </p>

        {/* Price & Action Row */}
        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            {book.oldPrice && book.oldPrice > book.newPrice && (
              <span className="text-sm text-[#451A03]/40 line-through font-bold mb-0.5">
                ${book.oldPrice}
              </span>
            )}
            <span className="text-3xl font-black text-[#451A03] tracking-tighter">
              ${book.newPrice}
            </span>
          </div>

          <button
            onClick={() => handleAddToCart(book)}
            className="w-14 h-14 rounded-full bg-[#451A03] text-white flex items-center justify-center hover:bg-primary hover:rotate-12 hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl shadow-[#451A03]/10"
          >
            <FiShoppingCart size={22} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};


