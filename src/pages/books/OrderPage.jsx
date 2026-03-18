import React from 'react'
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi'
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { FiBox, FiClock, FiMapPin, FiPhone } from 'react-icons/fi';
import Loading from '../../components/Loading';

export const OrderPage = () => {
  const { currentUser } = useAuth();
  const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);

  if (isLoading) return <Loading />;

  if (isError) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-12 text-center">
      <h3 className="text-2xl font-primary font-bold text-[#451A03]">Error retrieving history</h3>
      <p className="text-amber-900/50 mt-2">The archives are currently unreachable.</p>
    </div>
  );

  return (
    <div className='max-w-screen-xl mx-auto px-6 py-12 lg:py-20'>
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-amber-50 rounded-2xl text-primary">
          <FiBox size={32} />
        </div>
        <div>
          <h1 className='text-3xl font-primary font-bold text-[#451A03]'>Your Literary Collection</h1>
          <p className="text-amber-900/50 font-secondary italic">A history of stories added to your library.</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className='min-h-[40vh] glass-card flex items-center justify-center text-amber-900/40 font-medium italic'>
          You haven't acquired any volumes yet.
        </div>
      ) : (
        <div className="grid gap-8">
          {orders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className='premium-card p-8 bg-white border-amber-50 overflow-hidden relative'
            >
              {/* Order Badge */}
              <div className="absolute top-0 right-0 bg-primary text-white px-6 py-2 rounded-bl-2xl font-bold text-sm shadow-lg shadow-primary/10">
                Order #{index + 1}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {/* Section 1: Basic Info */}
                <div>
                  <h3 className="text-[#451A03] font-primary font-bold mb-4 uppercase text-xs tracking-widest flex items-center gap-2">
                    <FiClock className="text-primary" /> Delivery Details
                  </h3>
                  <div className="space-y-3">
                    <p className="text-lg font-bold text-[#451A03]">{order.name}</p>
                    <div className="flex items-center gap-3 text-amber-900/60 font-medium text-sm">
                      <FiPhone className="text-primary" size={14} />
                      {order.phone}
                    </div>
                  </div>
                </div>

                {/* Section 2: Address */}
                <div>
                  <h3 className="text-[#451A03] font-primary font-bold mb-4 uppercase text-xs tracking-widest flex items-center gap-2">
                    <FiMapPin className="text-primary" /> Coordinates
                  </h3>
                  <div className="text-amber-900/70 font-medium leading-relaxed">
                    <p>{order.address.street}</p>
                    <p>{order.address.city}, {order.address.state}</p>
                    <p className="text-[#451A03] font-bold mt-1 uppercase text-xs">{order.address.country}</p>
                  </div>
                </div>

                {/* Section 3: Summary */}
                <div className="md:col-span-2 lg:col-span-1 border-t md:border-t-0 md:border-l border-amber-100/50 md:pl-12 pt-8 md:pt-0">
                  <h3 className="text-[#451A03] font-primary font-bold mb-4 uppercase text-xs tracking-widest">Investment</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-primary">${order.totalPrice}</span>
                    <span className="text-xs text-amber-900/30 font-bold">Total Satisfied</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-amber-900/30 uppercase tracking-tighter italic">Volumes in this shipment:</p>
                    <div className="flex flex-wrap gap-2">
                      {order.productIds.map((id) => (
                        <span key={id} className="text-[10px] bg-amber-50 text-amber-900/50 px-2 py-1 rounded border border-amber-100 font-mono">
                          {id.slice(-6)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-amber-50 flex items-center justify-between">
                <span className="text-[10px] font-mono text-amber-900/20 italic">Transaction Reference: {order._id}</span>
                <span className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  Preparing for shipment
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

