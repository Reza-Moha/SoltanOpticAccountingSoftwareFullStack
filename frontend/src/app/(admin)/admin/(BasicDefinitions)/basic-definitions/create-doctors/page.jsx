"use client";
import Input from "@/components/Ui/Input";
import { PriceInput } from "@/components/Ui/PriceInput";
import SubmitBtn from "@/components/Ui/SubmitBtn";
import { createNewDoctorSchema } from "@/validators/admin";
import { Form, Formik } from "formik";

export default function Page() {
  const createNewDoctorHandler = async (values) => {
    try {
      console.log("Submitting values:", values);
    } catch (error) {
      const data = error?.response?.data;
      toast.error(data.message);
    }
  };

  return (
    <section>
      <Formik
        initialValues={{ fullName: "", visitPrice: "" }}
        onSubmit={createNewDoctorHandler}
        validationSchema={createNewDoctorSchema}
      >
        {({ values, setFieldValue }) => (
          <Form className="grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-2">
            <Input
              label="نام و نام خانوادگی"
              name="fullName"
              type="text"
              value={values.fullName}
              onChange={(e) => setFieldValue("fullName", e.target.value)}
            />

            <PriceInput
              label="مبلغ ویزیت"
              name="visitPrice"
              type="text"
              value={values.visitPrice}
              onChange={(e) => setFieldValue("visitPrice", e.target.value)}
            />

            <div className="md:col-span-2 lg:col-span-3">
              <SubmitBtn>ایجاد</SubmitBtn>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}
