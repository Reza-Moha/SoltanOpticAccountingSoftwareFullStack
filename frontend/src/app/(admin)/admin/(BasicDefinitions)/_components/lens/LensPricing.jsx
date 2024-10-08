"use client";
import { useDispatch, useSelector } from "react-redux";
import BasicWrapper from "../BasicWrapper";
import { Field, Form, Formik } from "formik";
import { pricingLensSchema } from "@/validators/admin";
import SelectInput from "@/components/Ui/SelectInput";
import SubmitBtn from "@/components/Ui/SubmitBtn";
import { useEffect, useState, useCallback } from "react";
import Input from "@/components/Ui/Input";
import Table from "@/components/Ui/Table";
import { motion } from "framer-motion";
import { toPersianDigits } from "@/utils";
import { PriceInput } from "@/components/Ui/PriceInput";
import toast from "react-hot-toast";

const CreateNewLens = () => {
  const [filteredLensList, setFilteredLensList] = useState([]);
  const [previewList, setPreviewList] = useState([]);
  const dispatch = useDispatch();
  const { lensCategories, lensList } = useSelector((state) => state.lensSlice);

  const lensCategoriesOptions = lensCategories.map(({ id, lensName }) => ({
    value: id,
    label: lensName,
  }));

  const filterLensList = useCallback(
    (categoryId) => {
      return lensList
        .filter((lens) => lens.LensCategory.id === categoryId)
        .map(({ id, lensName }) => ({ value: id, label: lensName }));
    },
    [lensList]
  );

  const addToPreview = (group, price, setFieldValue) => {
    // Check for duplicate group
    const isDuplicate = previewList.some((item) => item.group === group);
    if (isDuplicate) {
      toast.error("گروه تکراری است! لطفاً گروه جدیدی وارد کنید.");
      return; // Stop execution if duplicate found
    }

    if (group && price) {
      setPreviewList((prev) => [...prev, { group, price }]);
      setFieldValue("group", ""); // Clear group input
      setFieldValue("price", ""); // Clear price input
    }
  };

  const pricingLensHandler = (values, { resetForm }) => {
    const submissionData = {
      LensCategoryId: values.LensCategoryId,
      LensId: values.LensId,
      pricing: previewList,
    };
    console.log("Submitted values:", submissionData);
    resetForm();
    setPreviewList([]); // Clear the preview list after submission
  };

  return (
    <BasicWrapper title="قیمت گذاری عدسی">
      <Formik
        initialValues={{
          LensCategoryId: "",
          LensId: "",
          group: "",
          price: "",
        }}
        onSubmit={pricingLensHandler}
        validationSchema={pricingLensSchema}
      >
        {({ values, handleSubmit, setFieldValue }) => {
          useEffect(() => {
            if (values.LensCategoryId) {
              setFilteredLensList(filterLensList(values.LensCategoryId));
            } else {
              setFilteredLensList([]);
            }
          }, [values.LensCategoryId, filterLensList]);

          return (
            <Form onSubmit={handleSubmit} className="grid md:grid-cols-2">
              <Field
                name="LensCategoryId"
                component={SelectInput}
                options={lensCategoriesOptions}
                isMulti={false}
                placeholder="دسته بندی عدسی"
                onChange={(option) =>
                  setFieldValue("LensCategoryId", option.value)
                }
              />

              {filteredLensList.length > 0 && (
                <Field
                  name="LensId"
                  component={SelectInput}
                  options={filteredLensList}
                  isMulti={false}
                  placeholder="انتخاب عدسی"
                  onChange={(option) => setFieldValue("LensId", option.value)}
                />
              )}

              {values.LensId && (
                <>
                  <div className="col-span-1">
                    <Input
                      label="گروه عدسی"
                      name="group"
                      type="text"
                      value={values.group}
                      onChange={(e) => setFieldValue("group", e.target.value)}
                    />
                  </div>
                  <div className="col-span-1">
                    <PriceInput
                      label="قیمت"
                      name="price"
                      type="text"
                      value={values.price}
                      onChange={(e) => setFieldValue("price", e.target.value)}
                    />
                  </div>
                  <div className="col-span-2 flex items-center justify-center mb-2">
                    <button
                      type="button"
                      className="mt-4 p-2 bg-green-400 text-green-800 text-sm rounded hover:scale-105 transition-all ease-linear duration-300"
                      onClick={() =>
                        addToPreview(values.group, values.price, setFieldValue)
                      }
                    >
                      اضافه کردن
                    </button>
                  </div>
                </>
              )}

              {previewList.length > 0 && (
                <div className="md:col-span-2 p-2 border-t border-secondary-500 mx-16">
                  <h3 className="font-bold w-full text-center">
                    لیست قیمت های اضافه شده:
                  </h3>
                  <Table>
                    <Table.Header>
                      <th>ردیف</th>
                      <th>گروه عدسی</th>
                      <th>قیمت</th>
                    </Table.Header>
                    <Table.Body>
                      {previewList.map((item, index) => (
                        <motion.tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.group}</td>
                          <td>{toPersianDigits(item.price)}</td>
                        </motion.tr>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
              )}

              <div className="md:col-span-2 px-10">
                <SubmitBtn>ثبت</SubmitBtn>
              </div>
            </Form>
          );
        }}
      </Formik>
    </BasicWrapper>
  );
};

export default CreateNewLens;
