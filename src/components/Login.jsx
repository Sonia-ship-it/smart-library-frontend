import React from 'react'
import { Link } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
    const [message, setMessage] = useState("");
    const { loginUser, signInWithGoogle } = useAuth();
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            alert("Login successful!")
            navigate("/")
        }
        catch (error) {
            alert("Google sign in failed")
            console.log(error)
        }
    }
    const onSubmit = async (data) => {
        try {
            await loginUser(data.email, data.password);
            alert("Login successful!")
            navigate("/")
        }
        catch (error) {
            setMessage("Please provide a valid email and password")
            console.error(error)
        }
    }
    return (
        <div className='min-h-screen flex items-center justify-center font-primary bg-amber-50/20 px-4 py-12 relative py-24'>
            {/* Background Decors */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-100/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 -z-10"></div>

            <div className='w-full max-w-md bg-white rounded-[2.5rem] shadow-xl shadow-amber-900/5 border border-amber-50 p-8 lg:p-10 z-10'>
                <div className="text-center mb-8">
                    <h2 className='text-3xl font-primary font-black text-[#451A03] tracking-tight mb-2'>Welcome Back</h2>
                    <p className="text-sm font-bold text-amber-900/40 uppercase tracking-widest">Reader Authentication</p>
                </div>
                <div>
                    <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <input {...register("email", { required: true })} type="email" name="email" placeholder='Email Address' className='input-field py-4' />
                        </div>
                        <div>
                            <input {...register("password", { required: true })} type="password" name="password" placeholder='Password' className='input-field py-4' />
                        </div>
                        {
                            message && <p className='text-rose-500 text-xs font-bold italic px-2'>{message}</p>
                        }
                        <div className="pt-2">
                            <button className='btn-primary w-full py-4 text-sm uppercase tracking-wider'>Login</button>
                        </div>
                    </form>

                    <div className="mt-8 text-center space-y-4">
                        <p className='text-sm font-medium text-[#451A03]/60'>
                            New to the library? <Link to="/register" className='text-primary hover:text-primary-dark font-bold underline decoration-primary/30 underline-offset-4 transition-colors'>Create Account</Link>
                        </p>

                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-amber-100/50"></div>
                            <span className="flex-shrink-0 mx-4 text-xs font-bold text-amber-900/30 uppercase tracking-widest">Or</span>
                            <div className="flex-grow border-t border-amber-100/50"></div>
                        </div>

                        <button className='w-full btn-secondary text-sm flex items-center justify-center gap-3 py-4' onClick={handleGoogleSignIn}>
                            <FaGoogle className="text-[#451A03]" />
                            Sign in with Google
                        </button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-amber-100/50 text-center">
                        <p className='text-xs font-medium text-[#451A03]/40'>
                            Administrator? <Link to="/admin" className='text-primary hover:text-primary-dark font-bold underline decoration-primary/30 underline-offset-2 transition-colors'>Dashboard Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
