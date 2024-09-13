import React from "react";

function FileInput({
  name,
  label,
  accept,
  onChange,
  id,
  className = "",
  ...props
}) {
  return (
    <div className={`file-input ${className}`}>
      <label
        htmlFor={id}
        className="flex items-center justify-center w-full h-full rounded-full cursor-pointer bg-gray-200 overflow-hidden relative"
      >
        <span className="text-sm text-gray-700">{label}</span>
        <input
          type="file"
          name={name}
          id={id}
          accept={accept}
          className={className}
          onChange={onChange}
          {...props}
        />
      </label>
    </div>
  );
}

export default FileInput;
