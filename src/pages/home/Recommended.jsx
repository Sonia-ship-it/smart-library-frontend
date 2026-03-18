import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { BookCard } from '../books/bookCard';
import { useFetchAllBooksQuery } from '../../redux/features/cart/booksApi';
import { motion } from 'framer-motion';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

export const Recommended = () => {
  const [swiperRef, setSwiperRef] = useState(null);
  const { data: books = [] } = useFetchAllBooksQuery();

  // Slice some books for recommendations
  const recommendedBooks = books.slice(12, 22);

  return (
    <section className="py-24 px-6 lg:px-24 bg-amber-50/20">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl lg:text-5xl font-primary font-bold text-[#451A03] mb-4">
            Curated for <span className="text-primary italic">Your Soul</span>
          </h2>
          <p className="text-amber-900/40 font-bold uppercase tracking-[0.3em] text-xs">
            Hand-picked masterpieces based on your palette
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
            {recommendedBooks.map((book, index) => (
              <SwiperSlide key={index}>
                <div className="h-full pb-10 group-hover/swiper:opacity-40 group-hover/swiper:scale-[0.98] hover:!opacity-100 hover:!scale-100 transition-all duration-500">
                  <BookCard book={book} />
                </div>
              </SwiperSlide>
            ))}
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


