"use client";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import BasicWrapper from "../BasicWrapper";
import { Form, Formik } from "formik";
import { createNewLensCategoriesSchema } from "@/validators/admin";
import { ImageInput } from "@/components/Ui/ImageInput";
import {
  createNewLensCategoires,
  fetchAllLensCategories,
} from "@/redux/slices/lensSlice";
import Input from "@/components/Ui/Input";
import SubmitBtn from "@/components/Ui/SubmitBtn";

export default function LensCategories() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllLensCategories());
  }, []);

  const createNewLensCategoriesHandler = (values, { resetForm }) => {
    console.log(values);

    dispatch(createNewLensCategoires(values));
    resetForm();
  };
  return (
    <BasicWrapper title="تعریف دسته بندی عدسی">
      <Formik
        initialValues={{ lensName: "", lensImage: "" }}
        onSubmit={createNewLensCategoriesHandler}
        validationSchema={createNewLensCategoriesSchema}
      >
        {({ handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid">
              <Input
                label="عنوان دسته بندی عدسی"
                name="lensName"
                type="text"
                bg="bg-white"
              />
              <ImageInput
                setFieldValue={setFieldValue}
                name="lensImage"
                prevTitle="عکس دسته بندی"
              />
              <SubmitBtn>ایجاد</SubmitBtn>
            </div>
          </Form>
        )}
      </Formik>
    </BasicWrapper>
  );
}
