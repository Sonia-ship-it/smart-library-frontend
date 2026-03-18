import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi'
import { motion } from 'framer-motion'
import { FiHome, FiUser, FiPhone, FiMapPin, FiCheckCircle } from 'react-icons/fi'
import Loading from '../../components/Loading'

export const CheckOut = () => {
    const cartItems = useSelector(state => state.cart.cartItems)
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2)
    const [isChecked, setIsChecked] = useState(false)
    const { currentUser } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            address: {
                street: data.address,
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode,
            },
            phone: parseInt(data.phone, 10),
            productIds: cartItems.map(item => item?._id),
            totalPrice: parseFloat(totalPrice),
        }
        try {
            await createOrder(newOrder).unwrap();
            Swal.fire({
                title: "Order Secured!",
                text: "Your literary treasures are being prepared.",
                icon: "success",
                confirmButtonColor: "#D97706",
                confirmButtonText: "View My Orders"
            })
            navigate("/orders");
        }
        catch (error) {
            console.error("Error placing order", error)
            Swal.fire({
                title: "Wait a moment",
                text: "We couldn't finalize your order. Please check your connection.",
                icon: "error"
            })
        }
    }

    if (isLoading) return <Loading />

    return (
        <div className="min-h-screen py-12 px-6 lg:px-24">
            <div className="max-w-screen-xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Summary */}
                    <div className="lg:col-span-4 order-2 lg:order-1">
                        <div className="glass-card p-8 sticky top-32">
                            <h2 className="text-2xl font-primary font-bold text-[#451A03] mb-8">Purchase Summary</h2>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-amber-900/60 font-medium italic">
                                    <span>Volumes:</span>
                                    <span>{cartItems.length} items</span>
                                </div>
                                <div className="pt-4 border-t border-amber-100 flex justify-between items-center">
                                    <span className="text-lg font-bold text-[#451A03]">Total to Savor</span>
                                    <span className="text-3xl font-bold text-primary">${totalPrice}</span>
                                </div>
                            </div>

                            <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100 mb-8">
                                <div className="flex items-center gap-3 text-primary mb-2">
                                    <FiCheckCircle size={20} />
                                    <span className="font-bold text-sm uppercase tracking-wider">Cash on Delivery</span>
                                </div>
                                <p className="text-xs text-amber-900/50 leading-relaxed font-medium">
                                    Payment will be gracefully accepted upon the arrival of your package.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:col-span-8 order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="premium-card p-8 lg:p-12"
                        >
                            <h2 className="text-3xl font-primary font-bold text-[#451A03] mb-2">Checkout Details</h2>
                            <p className="text-amber-900/50 mb-12 font-medium">Please provide your coordinates for safe delivery.</p>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-[#451A03] flex items-center gap-2">
                                            <FiUser className="text-primary" /> Full Name
                                        </label>
                                        <input
                                            {...register("name", { required: true })}
                                            type="text"
                                            className="input-field"
                                            placeholder="Theodore J. Reader"
                                        />
                                        {errors.name && <p className="text-rose-500 text-xs mt-1 italic">Name is essential for the scroll.</p>}
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-[#451A03] flex items-center gap-2 text-stone-400">
                                            <FiCheckCircle /> Email Address (Verified)
                                        </label>
                                        <input
                                            type="text"
                                            className="input-field opacity-60 cursor-not-allowed bg-stone-100"
                                            disabled
                                            defaultValue={currentUser?.email}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#451A03] flex items-center gap-2">
                                            <FiPhone className="text-primary" /> Phone Number
                                        </label>
                                        <input
                                            {...register("phone", { required: true })}
                                            type="tel"
                                            className="input-field"
                                            placeholder="+1 234 567 890"
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-[#451A03] flex items-center gap-2">
                                            <FiMapPin className="text-primary" /> Delivery Address
                                        </label>
                                        <input
                                            {...register("address", { required: true })}
                                            type="text"
                                            className="input-field"
                                            placeholder="Street, Building, Apartment"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#451A03] flex items-center gap-2">
                                            <FiHome className="text-primary" /> City
                                        </label>
                                        <input
                                            {...register("city", { required: true })}
                                            type="text"
                                            className="input-field"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#451A03]">Country</label>
                                        <input
                                            {...register("country", { required: true })}
                                            type="text"
                                            className="input-field"
                                            placeholder="Country"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#451A03]">State / Province</label>
                                        <input
                                            {...register("state", { required: true })}
                                            type="text"
                                            className="input-field"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#451A03]">Zipcode</label>
                                        <input
                                            {...register("zipcode", { required: true })}
                                            type="text"
                                            className="input-field"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative">
                                            <input
                                                onChange={(e) => setIsChecked(e.target.checked)}
                                                type="checkbox"
                                                className="peer sr-only"
                                            />
                                            <div className="w-6 h-6 border-2 border-amber-200 rounded-lg group-hover:border-primary transition-colors peer-checked:bg-primary peer-checked:border-primary"></div>
                                            <FiCheckCircle className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity" size={16} />
                                        </div>
                                        <span className="text-sm text-amber-900/60 font-medium">
                                            I agree to the <Link className='text-primary hover:underline font-bold'>Terms</Link> and <Link className='text-primary hover:underline font-bold'>Shipping Policy</Link>.
                                        </span>
                                    </label>
                                </div>

                                <div className="pt-8">
                                    <button
                                        type='submit'
                                        disabled={!isChecked}
                                        className={`btn-primary w-full h-16 text-lg uppercase tracking-widest shadow-xl transition-all ${!isChecked ? 'opacity-50 grayscale cursor-not-allowed shadow-none' : 'shadow-primary/20 transform hover:-translate-y-1'}`}
                                    >
                                        Seal the Order
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

