"use client";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import Input from "@/components/Ui/Input";
import SubmitBtn from "@/components/Ui/SubmitBtn";
import BasicWrapper from "../BasicWrapper";
import { createNewRoleSchema } from "@/validators/admin";
import { createNewRole, fetchRoles } from "@/redux/slices/rolesSlice";
import { useSelector } from "react-redux";
import MultiSelect from "@/components/Ui/SelectInput";
import RolesLists from "./RoleLists";

export default function Role() {
  const dispatch = useDispatch();

  const { permissionsList } = useSelector((state) => state.permissionSlice);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const createNewRoleHandler = (values, { resetForm }) => {
    dispatch(createNewRole(values));
  };

  const permissionOptions = permissionsList.map((permission) => ({
    value: permission.id,
    label: permission.title,
  }));

  return (
    <BasicWrapper title="تعریف نقش">
      <Formik
        initialValues={{ title: "", description: "", permissions: [] }}
        onSubmit={createNewRoleHandler}
        validationSchema={createNewRoleSchema}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="mb-4">
                <Input
                  label="عنوان نقش"
                  name="title"
                  type="text"
                  bg="bg-white"
                />
              </div>

              <div className="flex items-center mb-4">
                <Field
                  name="permissions"
                  component={MultiSelect}
                  options={permissionOptions}
                />
              </div>
              <div className="mb-4">
                <Input
                  label="توضیحات"
                  name="description"
                  type="text"
                  bg="bg-white"
                />
              </div>
              <div className="row-span-1 md:col-span-4">
                <SubmitBtn>ایجاد</SubmitBtn>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <RolesLists />
    </BasicWrapper>
  );
}
