import React from "react";
import Select from "react-select";
import { ErrorMessage } from "formik";

const SelectInput = ({ field, form, options, ...props }) => {
  const handleChange = (selectedOptions) => {
    // Pass only the values (UUIDs) to Formik
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    form.setFieldValue(field.name, selectedValues);
  };

  return (
    <div className="w-full flex flex-col">
      <Select
        {...field}
        {...props}
        isMulti
        value={options.filter((option) => field.value.includes(option.value))}
        onChange={handleChange}
        options={options}
        className="w-full h-12"
        classNamePrefix="react-select"
      />
      <ErrorMessage
        name={field.name}
        component="p"
        className="text-red-500 text-xs font-bold mt-2"
      />
    </div>
  );
};

export default SelectInput;
