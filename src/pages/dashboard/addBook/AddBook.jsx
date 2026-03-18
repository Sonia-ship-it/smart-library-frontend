import React, { useState } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../redux/features/cart/booksApi';
import Swal from 'sweetalert2';
import { FiCloudLightning, FiFileText, FiTag, FiTrendingUp, FiDollarSign, FiImage } from 'react-icons/fi';

const AddBook = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imageFile, setimageFile] = useState(null);
  const [addBook, { isLoading, isError }] = useAddBookMutation()
  const [imageFileName, setimageFileName] = useState('')

  const onSubmit = async (data) => {
    const newBookData = {
      ...data,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: imageFileName
    }
    try {
      await addBook(newBookData).unwrap();
      Swal.fire({
        title: "Volume Archived",
        text: "The new entry has been successfully added to the library archives.",
        icon: "success",
        confirmButtonColor: "#D97706",
        background: "#FFFDFB",
        color: "#451A03"
      });
      reset();
      setimageFileName('')
      setimageFile(null);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Archive Error",
        text: "Failed to upload the latest volume. Please check your connection.",
        icon: "error",
        confirmButtonColor: "#D97706"
      });
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimageFile(file);
      setimageFileName(file.name);
    }
  }

  return (
    <div className="max-w-3xl mx-auto premium-card p-10 bg-white">
      <div className="flex items-center gap-4 mb-10 border-b border-amber-50 pb-6">
        <div className="p-3 bg-amber-50 text-primary rounded-xl">
          <FiFileText size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-primary font-bold text-[#451A03]">New Archive Entry</h2>
          <p className="text-amber-900/40 text-xs font-bold uppercase tracking-widest">Document a new volume for the collection</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InputField
            label="Manuscript Title"
            name="title"
            placeholder="e.g. The Great Gatsby"
            register={register}
          />

          <SelectField
            label="Genre Classification"
            name="category"
            options={[
              { value: '', label: 'Select Category' },
              { value: 'business', label: 'Business' },
              { value: 'technology', label: 'Technology' },
              { value: 'fiction', label: 'Fiction' },
              { value: 'horror', label: 'Horror' },
              { value: 'adventure', label: 'Adventure' },
            ]}
            register={register}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold text-[#451A03] mb-2 uppercase tracking-widest flex items-center gap-2">
            <FiTag className="text-primary" /> Synopsis
          </label>
          <textarea
            {...register('description', { required: true })}
            className="input-field min-h-[150px] py-4"
            placeholder="Provide a detailed overview of the work..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <InputField
            label="Original Value"
            name="oldPrice"
            type="number"
            placeholder="0.00"
            register={register}
          />

          <InputField
            label="Current Listing"
            name="newPrice"
            type="number"
            placeholder="0.00"
            register={register}
          />

          <div className="flex flex-col justify-center">
            <label className="inline-flex items-center cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  {...register('trending')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-amber-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </div>
              <span className="ml-3 text-sm font-bold text-[#451A03] group-hover:text-primary transition-colors flex items-center gap-2 uppercase tracking-widest">
                <FiTrendingUp /> Trending
              </span>
            </label>
          </div>
        </div>

        <div className="p-8 border-2 border-dashed border-amber-100 rounded-2xl bg-amber-50/30">
          <label className="block text-sm font-bold text-[#451A03] mb-4 uppercase tracking-widest flex items-center gap-2 text-center justify-center">
            <FiImage className="text-primary" /> Cover Art Manifest
          </label>
          <div className="flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="cover-upload"
            />
            <label
              htmlFor="cover-upload"
              className="btn-secondary h-12 px-8 cursor-pointer flex items-center gap-2"
            >
              <FiCloudLightning /> Choose Image File
            </label>
            {imageFileName && (
              <p className="mt-4 text-xs font-mono text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Selected: {imageFileName}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full h-14 text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Archiving...
            </div>
          ) : (
            <>Archiving New Volume</>
          )}
        </button>
      </form>
    </div>
  )
}

export default AddBook
