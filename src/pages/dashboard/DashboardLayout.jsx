import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HiViewGridAdd, HiOutlineLogout, HiSearch, HiBell } from "react-icons/hi";
import { MdOutlineManageHistory, MdDashboard } from "react-icons/md";
import getBaseUrL from '../../util/baseURL';
import Img from "../../assets/fav-icon.png"

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/")
  }

  return (
    <section className="flex bg-[#FFFDFB] min-h-screen overflow-hidden font-secondary">
      {/* Sidebar */}
      <aside className="hidden sm:flex sm:flex-col w-24 lg:w-32 bg-[#451A03] border-r border-amber-900/10">
        <Link to="/" className="flex items-center justify-center py-10 group">
          <img src={Img} alt="Logo" className="w-12 h-12 grayscale brightness-200 group-hover:scale-110 transition-transform" />
        </Link>

        <nav className="flex-grow flex flex-col items-center gap-8 py-4">
          <Link
            to="/dashboard"
            className="p-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 transition-all hover:scale-105"
            title="Dashboard Overview"
          >
            <MdDashboard className="h-7 w-7" />
          </Link>

          <Link
            to="/dashboard/add-new-book"
            className="p-4 text-amber-100/40 hover:text-white hover:bg-amber-900/30 rounded-2xl transition-all"
            title="Add Library Entry"
          >
            <HiViewGridAdd className="h-7 w-7" />
          </Link>

          <Link
            to="/dashboard/manage-books"
            className="p-4 text-amber-100/40 hover:text-white hover:bg-amber-900/30 rounded-2xl transition-all"
            title="Manage Archives"
          >
            <MdOutlineManageHistory className="h-7 w-7" />
          </Link>
        </nav>

        <div className="py-10 flex flex-col items-center border-t border-amber-900/20">
          <button
            onClick={handleLogout}
            className="p-4 text-amber-100/40 hover:text-rose-400 hover:bg-rose-500/10 rounded-2xl transition-all"
            title="Secure Logout"
          >
            <HiOutlineLogout className="h-7 w-7" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-h-screen overflow-y-auto">
        {/* Header */}
        <header className="h-24 px-8 lg:px-12 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-amber-50">
          <div className="flex items-center flex-1 max-w-xl">
            <div className="relative w-full group">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-900/30 group-focus-within:text-primary transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search the archives..."
                className="w-full h-12 pl-12 pr-4 bg-amber-50/30 border border-transparent focus:border-amber-100 focus:bg-white rounded-xl outline-none transition-all font-medium text-amber-900/70"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative w-12 h-12 flex items-center justify-center text-amber-900/30 hover:text-primary hover:bg-amber-50 rounded-xl transition-all">
              <HiBell size={24} />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
            </button>

            <div className="h-10 w-[1px] bg-amber-100"></div>

            <div className="flex items-center gap-4">
              <div className="hidden lg:block text-right">
                <p className="font-primary font-bold text-[#451A03] text-sm leading-none mb-1">Caretaker Grace</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-amber-900/30">Head Librarian</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 border-2 border-amber-50 overflow-hidden shadow-sm">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150" alt="Admin" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-8 lg:p-12 space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <p className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-3">Administration</p>
              <h1 className="text-4xl font-primary font-bold text-[#451A03]">Curator's Hub</h1>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/dashboard/manage-books"
                className="btn-secondary h-12 px-6"
              >
                Catalog View
              </Link>
              <Link
                to="/dashboard/add-new-book"
                className="btn-primary h-12 px-6 shadow-lg shadow-primary/20"
              >
                + New Entry
              </Link>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  )
}

export default DashboardLayout;
