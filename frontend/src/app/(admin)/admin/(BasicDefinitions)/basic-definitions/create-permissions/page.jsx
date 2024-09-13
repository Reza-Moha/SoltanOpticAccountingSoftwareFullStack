"use client";
import { useState, useEffect } from "react";
import Input from "@/components/Ui/Input";
import { Form, Formik } from "formik";
import { createNewPermissionsSchema } from "@/validators/admin";
import toast from "react-hot-toast";
import SubmitBtn from "@/components/Ui/SubmitBtn";
import BasicWrapper from "../../_components/BasicWrapper";
import {
  createNewPermissionApi,
  getAllPermissionApi,
} from "@/services/admin/admin.service";
import PermissionsList from "../../_components/PermissionsList";

export default function CreateNewPermission() {
  const [permissions, setPermissions] = useState([]);
  const initial = {
    title: "",
    description: "",
  };

  const fetchPermissions = async () => {
    const data = await getAllPermissionApi();
    setPermissions(data.allPermission);
  };

  const createNewPermissionHandler = async (values, { resetForm }) => {
    try {
      const data = await createNewPermissionApi(values);
      if (data.statusCode === 201) {
        toast.success(data.message);
        resetForm();
        fetchPermissions();
      }
    } catch (error) {
      toast.error(error.message);
      resetForm();
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  return (
    <BasicWrapper title="تعریف سطح دسترسی">
      <Formik
        initialValues={initial}
        onSubmit={createNewPermissionHandler}
        enableReinitialize={true}
        validationSchema={createNewPermissionsSchema}
      >
        {({ values, handleSubmit }) => (
          <>
            <Form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      <PermissionsList permissions={permissions} />
    </BasicWrapper>
  );
}
