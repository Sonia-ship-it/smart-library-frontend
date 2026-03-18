import React from 'react';

const InputField = ({ label, name, type = 'text', register, placeholder, ...rest }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-bold text-[#451A03] mb-2 uppercase tracking-widest">{label}</label>
      <input
        type={type}
        {...register(name, { required: true })}
        {...rest}
        className="input-field"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
