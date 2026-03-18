import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import getBaseUrL from '../util/baseURL';
import { motion } from "framer-motion";

export const AdminLogin = () => {
    const [message, setMessage] = useState("");
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await axios.post(`${getBaseUrL()}/api/auth/admin`, data, {
                headers: { 'Content-Type': 'application/json' }
            });
            const auth = response.data;
            if (auth.token) {
                localStorage.setItem('token', auth.token);
                alert("Admin login successful!");
                navigate("/dashboard");
                setTimeout(() => {
                    localStorage.removeItem('token');
                    alert('Token has expired! Please login again.');
                    navigate("/");
                }, 3600 * 1000);
            }
        } catch (error) {
            setMessage("Please provide a valid email and password");
            console.error(error);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center font-primary bg-amber-50/20 px-4 py-12 relative py-24'>
            {/* Background Decors */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 -z-10"></div>
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-amber-100/20 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2 -z-10"></div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className='w-full max-w-md bg-white rounded-[2.5rem] shadow-xl shadow-amber-900/5 border border-amber-50 p-8 lg:p-10 z-10'
            >
                <div className="text-center mb-8">
                    <h2 className='text-3xl font-primary font-black text-[#451A03] tracking-tight mb-2'>Control Panel</h2>
                    <p className="text-sm font-bold text-amber-900/40 uppercase tracking-widest">Administrator Access</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <input
                            {...register("username", { required: true })}
                            type="text"
                            placeholder='Admin Username'
                            className={`input-field py-4 ${errors.username ? "border-rose-500 ring-rose-500/10" : ""
                                }`}
                        />
                        {errors.username && <p className='text-rose-500 text-xs font-bold italic mt-2 px-2'>Username is required</p>}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <input
                            {...register("password", { required: true })}
                            type="password"
                            placeholder='Admin Password'
                            className={`input-field py-4 ${errors.password ? "border-rose-500 ring-rose-500/10" : ""
                                }`}
                        />
                        {errors.password && <p className='text-rose-500 text-xs font-bold italic mt-2 px-2'>Password is required</p>}
                    </motion.div>

                    {message && (
                        <motion.p
                            className='text-rose-500 text-xs font-bold italic px-2'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {message}
                        </motion.p>
                    )}

                    <motion.div
                        className='w-full pt-2'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <button
                            type='submit'
                            className='btn-primary w-full py-4 text-sm uppercase tracking-wider'
                        >
                            Login to Dashboard
                        </button>
                    </motion.div>
                </form>

                <div className="mt-8 pt-6 border-t border-amber-100/50 text-center">
                    <p className='text-xs font-medium text-[#451A03]/40'>
                        Not an administrator? <Link to="/login" className='text-primary hover:text-primary-dark font-bold underline decoration-primary/30 underline-offset-2 transition-colors'>Return to Reader Login</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};
