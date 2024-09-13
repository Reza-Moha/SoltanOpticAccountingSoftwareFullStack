"use client";

import Input from "@/components/Ui/Input";
import { Form, Formik } from "formik";
import { createNewPermissionsSchema } from "@/validators/admin";
import toast from "react-hot-toast";
import SubmitBtn from "@/components/Ui/SubmitBtn";
import BasicWrapper from "../../_components/BasicWrapper";
import { createNewPermissionApi } from "@/services/admin/admin.service";

export default function CreateNewPermission() {
  const initial = {
    title: "",
    description: "",
  };

  const createNewPermissionHadnler = async (values) => {
    try {
      const data = await createNewPermissionApi(values);
      if (data.statusCode === 201) {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <BasicWrapper title="تعریف سطح دسترسی">
      <Formik
        initialValues={initial}
        onSubmit={createNewPermissionHadnler}
        enableReinitialize={true}
        validationSchema={createNewPermissionsSchema}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <>
            <Form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 grid-rows-12 md:grid-cols-3">
                <Input
                  label="عنوان سطح دسترسی"
                  name="title"
                  type="text"
                  values={values.title}
                />
                <Input
                  label="توضیحات"
                  name="description"
                  type="text"
                  values={values.description}
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
