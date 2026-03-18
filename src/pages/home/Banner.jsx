import React from 'react';
import bannerImage from '../../assets/banner.png';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay } from 'react-icons/fi';

const Banner = () => {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center pt-32 pb-20">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-200/10 rounded-full blur-[100px] -z-10 animate-float" />
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary/20 rounded-full blur-sm -z-10 animate-bounce" />

      <div className="max-w-screen-2xl mx-auto px-6 lg:px-24 flex flex-col md:flex-row-reverse justify-between items-center gap-16 lg:gap-32">
        {/* Image Section with stylized backdrop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "circOut" }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 relative flex justify-center lg:justify-end"
        >
          <div className="relative z-10 p-8 lg:p-12">
            <img
              src={bannerImage}
              alt="Brand New Books"
              className="max-h-[450px] lg:max-h-[550px] drop-shadow-[0_35px_35px_rgba(69,26,3,0.3)] group-hover:scale-105 transition-transform duration-700 animate-float"
            />
            {/* Unique Glass Backdrop */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl rounded-[4rem] -rotate-6 -z-10 border border-white/60 shadow-inner" />
          </div>

          {/* Floating Card UI Element */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute bottom-10 left-0 lg:-left-10 bg-white shadow-2xl p-4 rounded-2xl flex items-center gap-4 z-20 border border-amber-50"
          >
            <div className="size-12 bg-amber-100 rounded-xl flex items-center justify-center text-primary">
              <FiPlay fill="currentColor" />
            </div>
            <div>
              <p className="text-xs font-black text-amber-900/30 uppercase tracking-widest">Live Now</p>
              <p className="text-sm font-bold text-[#451A03]">Reading Circle: Ep. 42</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <div className="md:w-1/2 w-full text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 text-[11px] font-black tracking-[0.3em] text-primary uppercase bg-primary/10 rounded-full border border-primary/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Fresh Arrivals 2026
            </div>

            <h1 className="text-5xl lg:text-7xl font-primary font-bold text-[#451A03] leading-[1.1] mb-10">
              Indulge in a <br />
              <span className="text-gradient italic">Literary Feast</span>
            </h1>

            <p className="text-xl text-amber-900/60 font-medium leading-relaxed mb-12 max-w-xl mx-auto md:mx-0">
              Curating the finest volumes for the refined soul. Discover stories that don't just speak, but resonate with your journey.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button className="btn-primary w-full sm:w-auto h-16 px-12 group">
                <span>Start Exploring</span>
                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="btn-secondary w-full sm:w-auto h-16 px-12">
                Our Collection
              </button>
            </div>

            {/* Social Proof Stats */}
            <div className="mt-16 flex items-center justify-center md:justify-start gap-12 border-t border-amber-100/50 pt-10">
              <div>
                <p className="text-3xl font-black text-[#451A03] tracking-tighter">12K+</p>
                <p className="text-xs font-bold text-amber-900/20 uppercase tracking-widest">Manuscripts</p>
              </div>
              <div className="w-px h-10 bg-amber-100/50" />
              <div>
                <p className="text-3xl font-black text-[#451A03] tracking-tighter">8K+</p>
                <p className="text-xs font-bold text-amber-900/20 uppercase tracking-widest">Active Readers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;


