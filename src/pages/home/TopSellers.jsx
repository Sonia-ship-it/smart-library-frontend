import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { BookCard } from '../books/bookCard';
import { useFetchAllBooksQuery } from '../../redux/features/cart/booksApi';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronRight, FiChevronLeft, FiFilter } from 'react-icons/fi';

const categories = ["All Genres", "Business", "Fiction", "Horror", "Adventure"];

export const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Genres");
  const [swiperRef, setSwiperRef] = useState(null);
  const { data: books = [] } = useFetchAllBooksQuery();

  const filteredBooks = selectedCategory === "All Genres"
    ? books
    : books.filter(book => book.category === selectedCategory.toLowerCase());

  return (
    <section className="relative py-32 px-6 lg:px-24 overflow-hidden bg-white/40">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-100/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 -z-10"></div>

      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 px-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-[2px] w-12 bg-primary rounded-full"></span>
              <span className="text-primary font-black text-xs uppercase tracking-[0.5em]">The Archives</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-primary font-bold text-[#451A03] mb-8 leading-tight">
              Trending <span className="text-gradient italic">Manuscripts</span>
            </h2>
            <p className="text-amber-900/50 text-xl font-medium italic border-l-4 border-amber-100 pl-6 py-2">
              Discover the most sought-after volumes within our collection.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-[#451A03]/30 flex items-center gap-3">
              <FiFilter className="text-primary" /> Filter by Genre
            </span>
            <div className="relative group min-w-[280px]">
              <select
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white border-2 border-amber-50/50 text-[#451A03] text-sm font-bold rounded-2xl pl-8 pr-12 py-5 focus:ring-8 focus:ring-primary/5 focus:border-primary transition-all outline-none cursor-pointer hover:border-primary/30 shadow-2xl shadow-amber-900/5 appearance-none w-full"
              >
                {categories.map((category, index) => (
                  <option value={category} key={index} className="py-2">{category}</option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary group-hover:scale-110 transition-transform">
                <FiChevronRight size={24} className="rotate-90" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative group/swiper px-2"
        >
          <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={1}
            spaceBetween={30}
            grabCursor={true}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
              1280: { slidesPerView: 4, spaceBetween: 40 }
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[Pagination, Navigation]}
            className="w-full !pb-24 pt-10"
          >
            <AnimatePresence mode='popLayout'>
              {filteredBooks.map((book, index) => (
                <SwiperSlide key={book._id || index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="h-full pb-10 group-hover/swiper:opacity-40 group-hover/swiper:scale-[0.98] hover:!opacity-100 hover:!scale-100 transition-all duration-500"
                  >
                    <BookCard book={book} />
                  </motion.div>
                </SwiperSlide>
              ))}
            </AnimatePresence>
          </Swiper>

          {/* External Free-Floating Navigation Arrows controlled via exact React state ref */}
          <button
            onClick={() => swiperRef?.slidePrev()}
            className="absolute top-[35%] -left-4 xl:-left-12 z-50 w-14 h-14 bg-white/95 backdrop-blur-md shadow-2xl border-[1.5px] border-amber-100/60 rounded-full flex items-center justify-center text-[#451A03] hover:bg-primary hover:text-white hover:border-primary/50 transition-all duration-300 transform hover:scale-110 active:scale-95"
          >
            <FiChevronLeft size={28} />
          </button>
          <button
            onClick={() => swiperRef?.slideNext()}
            className="absolute top-[35%] -right-4 xl:-right-12 z-50 w-14 h-14 bg-white/95 backdrop-blur-md shadow-2xl border-[1.5px] border-amber-100/60 rounded-full flex items-center justify-center text-[#451A03] hover:bg-primary hover:text-white hover:border-primary/50 transition-all duration-300 transform hover:scale-110 active:scale-95"
          >
            <FiChevronRight size={28} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};



