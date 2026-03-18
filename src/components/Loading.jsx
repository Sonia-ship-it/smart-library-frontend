import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
    return (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-[#FFFDFB] z-50">
            <div className="relative">
                {/* Animated Rings */}
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="h-28 w-28 rounded-full border-4 border-t-primary border-r-amber-100 border-b-amber-50 border-l-amber-100 shadow-2xl shadow-amber-900/5"
                />

                {/* Central Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center shadow-lg transform rotate-12">
                        <span className="text-white font-bold text-2xl">S</span>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-10 flex flex-col items-center"
            >
                <h3 className="text-2xl font-primary font-bold text-[#451A03] tracking-tight">
                    SmartLibrary
                </h3>
                <p className="text-amber-700/60 font-medium mt-2 animate-pulse tracking-wide">
                    Brewing your stories...
                </p>
            </motion.div>

            {/* Progress Bar */}
            <div className="mt-10 w-56 h-1.5 bg-amber-50 rounded-full overflow-hidden shadow-inner">
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="h-full w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
                />
            </div>
        </div>
    );
};

export default Loading;

