import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getImgUrl } from '../../util/getImgUrl'
import { useDispatch } from 'react-redux'
import { removeFromCart, clearCart } from '../../redux/features/cart/cartSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi'

export const CartPage = () => {
  const cartItems = useSelector(state => state.cart.cartItems)
  const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2)
  const dispatch = useDispatch()

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product))
  }

  const clearFromCart = () => {
    dispatch(clearCart())
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12 lg:py-20">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side: Items */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-amber-100">
            <div>
              <h1 className="text-3xl font-primary font-bold text-[#451A03]">Shopping Basket</h1>
              <p className="text-amber-900/50 mt-1 font-secondary">{cartItems.length} items reserved for you</p>
            </div>
            {cartItems.length > 0 && (
              <button
                onClick={() => clearFromCart()}
                className="flex items-center gap-2 text-rose-500 hover:text-rose-600 font-bold text-sm uppercase tracking-wider transition-colors"
              >
                <FiTrash2 /> Clear All
              </button>
            )}
          </div>

          <div className="space-y-6">
            <AnimatePresence mode='popLayout'>
              {cartItems.length > 0 ? (
                cartItems.map((product) => (
                  <motion.div
                    key={product?._id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className="premium-card p-5 group flex items-center gap-6"
                  >
                    <div className="h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-amber-50/30 border border-amber-50">
                      <img
                        alt={product?.title}
                        src={`${getImgUrl(product.coverImage)}`}
                        className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <h3 className="text-lg sm:text-xl font-primary font-bold text-[#451A03] group-hover:text-primary transition-colors">
                          <Link to={`/books/${product?._id}`}>{product?.title}</Link>
                        </h3>
                        <p className="text-xl font-bold text-primary">${product?.newPrice}</p>
                      </div>
                      <p className="text-sm text-amber-900/40 font-medium capitalize mb-4">
                        Category: <span className="text-amber-900/60">{product?.category}</span>
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-4 text-sm font-bold text-[#451A03]/40">
                          <span>Qty: 1</span>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(product)}
                          className="text-amber-900/30 hover:text-rose-500 transition-colors font-bold uppercase text-[10px] tracking-widest border border-amber-100 hover:border-rose-100 px-3 py-1.5 rounded-lg"
                        >
                          Remove Item
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 glass-card bg-amber-50/5"
                >
                  <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiShoppingBag className="text-amber-200" size={32} />
                  </div>
                  <h3 className="text-2xl font-primary font-bold text-[#451A03] mb-3 text-center">Your basket is empty</h3>
                  <p className="text-amber-900/40 mb-8 max-w-xs mx-auto text-center">Looks like you haven't added any stories yet. Discover your next favorite read in our collection.</p>
                  <Link to="/" className="btn-primary inline-flex">Explore Books</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Summary */}
        {cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:w-[400px]"
          >
            <div className="glass-card p-8 sticky top-32 bg-amber-50/10 border-amber-100/50">
              <h2 className="text-2xl font-primary font-bold text-[#451A03] mb-8">Order Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-amber-900/60 font-medium">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between text-amber-900/60 font-medium">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="pt-4 border-t border-amber-100 flex justify-between items-center">
                  <span className="text-lg font-bold text-[#451A03]">Estimated Total</span>
                  <span className="text-3xl font-bold text-primary">${totalPrice}</span>
                </div>
              </div>

              <p className="text-xs text-amber-900/30 mb-8 leading-relaxed font-medium">
                Shipping and taxes are calculated at the final step of checkout. Securely processed by our partners.
              </p>

              <div className="space-y-4">
                <Link
                  to="/checkout"
                  className="btn-primary w-full h-14 text-lg shadow-xl shadow-primary/20"
                >
                  Proceed to Checkout <FiArrowRight />
                </Link>
                <Link
                  to="/"
                  className="btn-secondary w-full h-14"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

