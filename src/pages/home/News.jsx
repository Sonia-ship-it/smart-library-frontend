import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import New from '../../util/news.js'
import { Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export const News = () => {
  return (
    <section className='max-w-screen-2xl mx-auto px-6 lg:px-24 py-32'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
      >
        <div className="max-w-xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-6 w-1 primary-gradient rounded-full"></span>
            <span className="text-primary font-black text-xs uppercase tracking-widest">The Courier</span>
          </div>
          <h2 className='text-5xl lg:text-6xl font-primary font-bold text-[#451A03] mb-6'>Library Journal</h2>
          <p className='text-amber-900/40 text-lg font-medium'>
            Stay updated with the latest chapters from our community and the global literary scene.
          </p>
        </div>
      </motion.div>

      <Swiper
        slidesPerView={1}
        spaceBetween={40}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false
        }}
        loop={true}
        breakpoints={{
          1024: { slidesPerView: 2, spaceBetween: 50 },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper !pb-24"
      >
        {New.map((item, index) => (
          <SwiperSlide key={index}>
            <div className='group relative bg-white rounded-[2.5rem] p-8 lg:p-10 flex flex-col sm:flex-row gap-10 items-center h-full border border-amber-50/50 hover:border-primary/20 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden'>

              <div className='flex-1 z-10'>
                <div className='flex items-center gap-2 mb-4'>
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-primary/5 px-3 py-1 rounded-full">Editorial</span>
                </div>
                <Link to='/'>
                  <h3 className='text-2xl font-primary font-bold text-[#451A03] group-hover:text-primary transition-colors mb-6 leading-tight line-clamp-2'>
                    {item.title}
                  </h3>
                </Link>

                <p className='text-amber-900/60 font-medium text-sm leading-relaxed line-clamp-3 mb-8 italic'>
                  "{item.description}"
                </p>

                <div className='flex items-center justify-between'>
                  <Link to="/" className="text-[#451A03] font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all">
                    Read Exposition <FiArrowUpRight className="text-primary text-lg" />
                  </Link>
                </div>
              </div>

              <div className='shrink-0 w-full sm:w-56 h-56 relative overflow-hidden rounded-[2rem] shadow-2xl'>
                <img src={item.image} alt={item.title} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000' />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

