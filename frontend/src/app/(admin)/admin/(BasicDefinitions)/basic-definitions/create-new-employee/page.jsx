"use client";

import Input from "@/components/Ui/Input";
import { Field, Form, Formik } from "formik";
import { createNewEmployeeSchema } from "@/validators/admin";
import Image from "next/image";
import toast from "react-hot-toast";
import SubmitBtn from "@/components/Ui/SubmitBtn";
import BasicWrapper from "../../_components/BasicWrapper";
import SelectInput from "@/components/Ui/SelectInput";
import { useSelector } from "react-redux";
import FileInput from "@/components/Ui/FileInput";
import { useState } from "react";
import { createNewEmployeeApi } from "@/services/admin/admin.service";

export default function CreateNewEmployee() {
  const { rolesList, isLoading } = useSelector((state) => state.rolesSlice);
  const [perviewImage, setPreviewImage] = useState("");
  const initial = {
    fullName: "",
    nationalCode: "",
    phoneNumber: "",
    profileImage: "",
    gender: "",
    jobTitle: "",
    description: "",
  };

  const genderOptions = [
    {
      value: "آقای",
      label: "آقای",
    },
    {
      value: "خانم",
      label: "خانم",
    },
  ];

  const createNewEmployeeHandler = async (values) => {
    try {
      const newEmployee = await createNewEmployeeApi(values);
      if (newEmployee.statusCode === 201) {
        toast.success(newEmployee.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    }
  };
  const rolesOptions = rolesList.map((role) => ({
    value: role.id,
    label: role.title,
  }));
  return (
    <BasicWrapper title="تعریف کارمندان">
      <Formik
        initialValues={initial}
        onSubmit={createNewEmployeeHandler}
        validationSchema={createNewEmployeeSchema}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <>
            <Form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 grid-rows-12 md:grid-cols-3">
                <div className="px-4 flex items-center">
                  <Field
                    name="gender"
                    component={SelectInput}
                    options={genderOptions}
                    isMulti={false}
                  />
                </div>
                <div className="px-4 flex items-center">
                  <Field
                    name="jobTitle"
                    component={SelectInput}
                    options={rolesOptions}
                    isMulti={false}
                    placeholder="عنوان شغلی"
                  />
                </div>
                <Input
                  label="نام و نام خانوادگی"
                  name="fullName"
                  type="text"
                  values={values.fullName}
                />
                <Input
                  label="کد ملی"
                  name="nationalCode"
                  type="text"
                  values={values.nationalCode}
                />

                <Input
                  label="شماره موبایل"
                  name="phoneNumber"
                  type="text"
                  values={values.phoneNumber}
                />
                <div>
                  <Input
                    label="توضیحات"
                    name="description"
                    type="text"
                    values={values.description}
                  />
                </div>
                <div className="relative h-28 w-28 border-[5px] border-white md:mr-7 rounded-full overflow-hidden">
                  <label
                    htmlFor="profileImage"
                    className="flex items-center justify-center w-full h-full rounded-full cursor-pointer bg-gradient-to-tl from-secondary-300 to-secondary-100 relative"
                  >
                    <FileInput
                      name="profileImage"
                      accept=".jpg,.jpeg,.png"
                      id="profileImage"
                      className="sr-only"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        console.log("Selected file:", file);
                        setFieldValue("profileImage", file);
                        setPreviewImage(URL.createObjectURL(file));
                      }}
                    />
                    {perviewImage === "" ? (
                      " عکس پروفایل"
                    ) : (
                      <div className="relative w-full h-full">
                        <Image
                          alt=""
                          src={perviewImage}
                          className="rounded-full object-cover"
                          width="112"
                          height="112"
                          priority
                        />
                      </div>
                    )}
                  </label>
                </div>
                <SubmitBtn>ایجاد</SubmitBtn>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </BasicWrapper>
  );
}
