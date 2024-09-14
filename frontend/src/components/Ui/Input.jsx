"use client";
import React from "react";
import { useField } from "formik";

export default function Input({ label, bg, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4 font-iranSans p-2">
      <label className="block text-secondary-600 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        className={`textField__input ${bg} ${
          meta.touched && meta.error ? "border-red-500" : ""
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <p className="text-red-500 text-xs font-bold mt-2">{meta.error}</p>
      ) : null}
    </div>
  );
}
