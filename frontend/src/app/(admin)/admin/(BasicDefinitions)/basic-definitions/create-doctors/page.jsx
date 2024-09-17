import Input from "@/components/Ui/Input";
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
    <section className="bg-green-100">
      <Formik
        initialValues={{ fullName: "", visitPrice: "" }}
        onSubmit={createNewDoctorHandler}
        validationSchema={createNewDoctorSchema}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <Form>
            <Input
              label="نام و نام خانوادگی"
              name="fullName"
              type="text"
              value={values.fullName}
              onChange={(e) => setFieldValue("fullName", e.target.value)}
            />
            <Input
              label="مبلغ ویزیت"
              name="visitPrice"
              type="text"
              value={values.visitPrice}
              onChange={(e) => setFieldValue("visitPrice", e.target.value)}
            />
            <SubmitBtn>ایجاد</SubmitBtn>
          </Form>
        )}
      </Formik>
    </section>
  );
}
