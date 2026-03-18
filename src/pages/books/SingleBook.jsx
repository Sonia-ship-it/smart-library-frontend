import React from 'react'
import { useFetchBookByIdQuery } from '../../redux/features/cart/booksApi'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getImgUrl } from '../../util/getImgUrl';
import { FiShoppingCart, FiCalendar, FiUser, FiTag } from 'react-icons/fi';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { motion } from 'framer-motion';
import Loading from '../../components/Loading';

export const SingleBook = () => {
    const { id } = useParams();
    const { data: book, isLoading, error } = useFetchBookByIdQuery(id)
    const dispatch = useDispatch()

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    if (isLoading) return <Loading />;

    if (error) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-12 text-center">
            <div className="text-rose-500 text-6xl mb-4 font-bold">500</div>
            <h3 className="text-2xl font-primary font-bold text-[#451A03]">Failed to load story</h3>
            <p className="text-amber-900/50 mt-2">The manuscript seems to be missing from our shelves.</p>
        </div>
    );

    if (!book) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-12 text-center">
            <div className="text-amber-200 text-6xl mb-4 font-bold">404</div>
            <h3 className="text-2xl font-primary font-bold text-[#451A03]">Book not found</h3>
            <p className="text-amber-900/50 mt-2">This specific tale hasn't been written yet.</p>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='max-w-screen-2xl mx-auto px-6 lg:px-24 py-16'
        >
            <div className='glass-card p-8 lg:p-12 flex flex-col lg:flex-row gap-16 items-start'>
                {/* Book Cover */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className='w-full lg:w-[450px] shrink-0 bg-amber-50/20 rounded-3xl p-8 flex justify-center shadow-inner'
                >
                    <img
                        src={getImgUrl(book.coverImage)}
                        alt={book.title}
                        className='w-full max-w-[320px] rounded-lg shadow-[20px_20px_60px_-15px_rgba(69,26,3,0.3)] animate-float'
                    />
                </motion.div>

                {/* Details Section */}
                <div className='flex-1 flex flex-col h-full'>
                    <div className="mb-8">
                        <Link to="/" className="text-primary font-bold text-sm uppercase tracking-widest hover:translate-x-1 transition-transform inline-flex items-center gap-2 mb-6 cursor-pointer">
                            ← Back to Collection
                        </Link>
                        <h1 className='text-4xl lg:text-5xl font-primary font-bold text-[#451A03] leading-tight mb-4'>
                            {book.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-amber-900/60 font-medium">
                            <div className="flex items-center gap-2"><FiUser className="text-primary" /> {book.author || 'Renowned Author'}</div>
                            <div className="flex items-center gap-2"><FiCalendar className="text-primary" /> {new Date(book.createdAt).toLocaleDateString()}</div>
                            <div className="flex items-center gap-2 capitalize"><FiTag className="text-primary" /> {book.category}</div>
                        </div>
                    </div>

                    <div className="mb-10 p-6 bg-amber-50/30 rounded-2xl border border-amber-100/50">
                        <h4 className="text-[#451A03] font-primary font-bold mb-3">Synopsis</h4>
                        <p className='text-amber-900/70 text-lg leading-relaxed font-secondary whitespace-pre-line'>
                            {book.description}
                        </p>
                    </div>

                    <div className='mt-auto flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-amber-100 pt-10'>
                        <div className="flex flex-col">
                            <span className="text-amber-900/40 text-sm font-bold uppercase tracking-widest mb-1">Price to Savor</span>
                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-bold text-primary">${book.newPrice}</span>
                                {book.oldPrice && <span className="text-lg text-amber-900/20 line-through font-medium">${book.oldPrice}</span>}
                            </div>
                        </div>

                        <button
                            onClick={() => handleAddToCart(book)}
                            className='btn-primary w-full sm:w-auto h-16 px-12 group hover:gap-3 transition-all'
                        >
                            <FiShoppingCart className='size-6 group-hover:rotate-12 transition-transform' />
                            <span className="text-lg">Add to Collection</span>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

