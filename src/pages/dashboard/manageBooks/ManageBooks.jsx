import React from 'react'
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../../redux/features/cart/booksApi';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiBookOpen, FiDollarSign } from 'react-icons/fi';
import Swal from 'sweetalert2';

const ManageBooks = () => {
    const navigate = useNavigate();
    const { data: books, refetch } = useFetchAllBooksQuery()
    const [deleteBook] = useDeleteBookMutation()

    const handleDeleteBook = async (id) => {
        const result = await Swal.fire({
            title: 'Expunge Volume?',
            text: "This action will permanently remove the record from the archives.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#451A03',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, expunge it!',
            background: '#FFFDFB',
            color: '#451A03'
        });

        if (result.isConfirmed) {
            try {
                await deleteBook(id).unwrap();
                Swal.fire({
                    title: 'Archived Expunged',
                    text: 'The record has been successfully removed.',
                    icon: 'success',
                    confirmButtonColor: '#D97706'
                });
                refetch();
            } catch (error) {
                console.error('Failed to delete book:', error.message);
                Swal.fire('Error', 'Restoration of archive failed.', 'error');
            }
        }
    };

    return (
        <section className="animate-in fade-in duration-700">
            <div className="premium-card bg-white overflow-hidden overflow-x-auto">
                <div className="p-8 border-b border-amber-50 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-primary font-bold text-[#451A03]">Archived Catalog</h3>
                        <p className="text-xs font-bold text-amber-900/40 uppercase tracking-widest mt-1">Manage all literary entries</p>
                    </div>
                    <div className="bg-amber-50 px-4 py-2 rounded-xl text-primary font-bold text-sm">
                        {books?.length || 0} Total Volumes
                    </div>
                </div>

                <div className="w-full">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-amber-50/30 text-[#451A03] font-primary font-bold text-xs uppercase tracking-[0.2em]">
                                <th className="px-8 py-5">#</th>
                                <th className="px-8 py-5">Manuscript</th>
                                <th className="px-8 py-5">Classification</th>
                                <th className="px-8 py-5">Valuation</th>
                                <th className="px-8 py-5 text-right">Control</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-amber-50/50">
                            {books && books.map((book, index) => (
                                <motion.tr
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    key={book._id}
                                    className="hover:bg-amber-50/20 transition-colors group"
                                >
                                    <td className="px-8 py-6 text-xs font-mono font-bold text-amber-900/30">
                                        {String(index + 1).padStart(2, '0')}
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-primary">
                                                <FiBookOpen size={18} />
                                            </div>
                                            <span className="font-bold text-[#451A03] group-hover:text-primary transition-colors">
                                                {book.title}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-900/60 text-[10px] font-black uppercase tracking-tighter">
                                            {book.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-1 font-bold text-emerald-600">
                                            <FiDollarSign size={14} />
                                            <span>{book.newPrice}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <Link
                                                to={`/dashboard/edit-book/${book._id}`}
                                                className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                                title="Modify"
                                            >
                                                <FiEdit2 size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteBook(book._id)}
                                                className="w-10 h-10 flex items-center justify-center bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                                                title="Expunge"
                                            >
                                                <FiTrash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default ManageBooks;
