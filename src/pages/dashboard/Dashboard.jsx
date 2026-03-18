import React, { useEffect, useState } from 'react'
import getBaseUrL from '../../util/baseURL';
import { MdOutlineTrendingUp, MdLibraryBooks, MdShoppingCart, MdAttachMoney } from 'react-icons/md';
import Loading from '../../components/Loading';
import RevenueChart from './RevenueChart';
import axios from 'axios';
import { motion } from 'framer-motion';

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getBaseUrL()}/api/admin`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          }
        })
        setData(response.data);
      }
      catch (error) {
        console.error("Error fetching admin data: ", error);
      }
      finally { setLoading(false) }
    }
    fetchData();
  }, [])

  if (loading) return <Loading />

  const stats = [
    { label: 'Total Books', value: data?.totalBooks, icon: MdLibraryBooks, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'Total Sales', value: `$${data?.totalSales}`, icon: MdAttachMoney, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Trending', value: data?.trendingBooks, icon: MdOutlineTrendingUp, color: 'text-rose-600', bg: 'bg-rose-100' },
    { label: 'Total Orders', value: data?.totalOrders, icon: MdShoppingCart, color: 'text-blue-600', bg: 'bg-blue-100' },
  ]

  return (
    <div className="space-y-10">
      {/* Stat Cards */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            key={index}
            className="premium-card p-6 flex items-center gap-6"
          >
            <div className={`w-16 h-16 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-lg`}>
              <stat.icon size={32} />
            </div>
            <div>
              <p className="text-amber-900/40 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-primary font-bold text-[#451A03]">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Main Analytics Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8 premium-card p-8"
        >
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-amber-50">
            <h2 className="text-xl font-primary font-bold text-[#451A03]">Monthly Revenue Flow</h2>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-primary rounded-full"></span>
              <span className="text-xs font-bold text-amber-900/40 uppercase tracking-wider">Projected Growth</span>
            </div>
          </div>
          <div className="h-[400px]">
            <RevenueChart />
          </div>
        </motion.div>

        {/* Recent Activity / Top Readers */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 premium-card p-8"
        >
          <h2 className="text-xl font-primary font-bold text-[#451A03] mb-8 pb-4 border-b border-amber-50">Top Curators</h2>
          <ul className="space-y-6">
            {[
              { name: 'Marcus Aurelius', count: 12, img: 'https://randomuser.me/api/portraits/men/32.jpg' },
              { name: 'Sophia Loren', count: 9, img: 'https://randomuser.me/api/portraits/women/44.jpg' },
              { name: 'Jean-Luc Picard', count: 8, img: 'https://randomuser.me/api/portraits/men/22.jpg' },
              { name: 'Elizabeth Bennet', count: 7, img: 'https://randomuser.me/api/portraits/women/21.jpg' },
              { name: 'Sherlock Holmes', count: 5, img: 'https://randomuser.me/api/portraits/men/45.jpg' },
            ].map((user, i) => (
              <li key={i} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-amber-100 border-2 border-amber-50 overflow-hidden shadow-sm group-hover:scale-110 transition-transform">
                  <img src={user.img} alt={user.name} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-[#451A03]">{user.name}</p>
                  <p className="text-[10px] text-amber-900/40 uppercase font-black">{user.count} Volumes Acquired</p>
                </div>
                <div className="text-primary font-bold text-lg">#{i + 1}</div>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* Footer Attribution */}
      <div className="text-center pt-8 opacity-20 hover:opacity-100 transition-opacity">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#451A03]">
          SmartLibrary Management System v2.0 &bull; Powered by Antigravity AI
        </p>
      </div>
    </div>
  )
}

