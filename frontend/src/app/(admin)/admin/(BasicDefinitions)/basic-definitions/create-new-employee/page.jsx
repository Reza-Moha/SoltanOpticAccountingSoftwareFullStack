"use client";

import Input from "@/components/Ui/Input";
import { Field, Form, Formik } from "formik";
import { createNewEmployeeSchema } from "@/validators/admin";
import Image from "next/image";
import toast from "react-hot-toast";
import SubmitBtn from "@/components/Ui/SubmitBtn";
import BasicWrapper from "../../_components/BasicWrapper";
import SelectInput from "@/components/Ui/SelectInput";

export default function CreateNewEmployee() {
  const initial = {
    fullName: "",
    phoneNumber: "",
    profileImage: "",
    gender: "",
  };
  const genderOptions = [
    {
      id: 1,
      title: "آقای",
    },
    {
      id: 2,
      title: "خانم",
    },
  ];

  const createNewEmployeeHandler = async (values) => {};

  return (
    <BasicWrapper title="تعریف کارمندان">
      <Formik
        initialValues={initial}
        onSubmit={createNewEmployeeHandler}
        enableReinitialize={true}
        validationSchema={createNewEmployeeSchema}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <>
            <Form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 grid-rows-12 md:grid-cols-3">
                <Input
                  label="نام و نام خانوادگی"
                  name="fullName"
                  type="text"
                  values={values.fullName}
                />

                <Field
                  name="gender"
                  component={SelectInput}
                  options={genderOptions}
                />

                <Input
                  label="شماره موبایل"
                  name="phoneNumber"
                  type="text"
                  values={values.phoneNumber}
                />
                <SubmitBtn>ایجاد</SubmitBtn>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </BasicWrapper>
  );
}
