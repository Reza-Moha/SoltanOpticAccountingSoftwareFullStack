"use client";
import { Formik } from "formik";
import { createNewEmployeeSchema } from "@/validators/admin";
import BasicWrapper from "../../_components/BasicWrapper";
import { CreateNewEmployeeForm } from "../../_components/createNewEmployee/createForm";
import { ListOfEmployee } from "../../_components/createNewEmployee/ListOfEmployee";
import { useDispatch } from "react-redux";
import { createNewEmployee } from "@/redux/slices/employee.slice";

export default function CreateNewEmployee() {
  const dispatch = useDispatch();
  const initial = {
    fullName: "",
    nationalId: "",
    phoneNumber: "",
    profileImage: "",
    gender: "",
    jobTitle: "",
    description: "",
  };

  const createNewEmployeeHandler = async (values) => {
    dispatch(createNewEmployee(values));
  };

  return (
    <>
      <BasicWrapper title="تعریف کارمندان">
        <Formik
          initialValues={initial}
          onSubmit={createNewEmployeeHandler}
          validationSchema={createNewEmployeeSchema}
        >
          {({ values, handleSubmit, setFieldValue }) => (
            <CreateNewEmployeeForm
              {...values}
              handleSubmit={handleSubmit}
              setFieldValue={setFieldValue}
            />
          )}
        </Formik>
      </BasicWrapper>
      <BasicWrapper title="لیست کارمندان">
        <ListOfEmployee />
      </BasicWrapper>
    </>
  );
}
