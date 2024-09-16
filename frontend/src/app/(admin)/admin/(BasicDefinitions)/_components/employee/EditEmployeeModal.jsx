import { Formik, Form } from "formik";
import Input from "@/components/Ui/Input";
import SubmitBtn from "@/components/Ui/SubmitBtn";
import Modal from "@/components/Ui/Modal";
import { useDispatch } from "react-redux";
import { createNewPermissionsSchema } from "@/validators/admin";

export default function EditEmployeeModal({ employee, show, onClose }) {
  const dispatch = useDispatch();

  const handleUpdateEmployee = (values) => {
    dispatch(update({ id: permission.id, values }));
    onClose();
  };

  return (
    <Modal title="ویرایش همکار" onClose={onClose} show={show}>
      <Formik
        initialValues={{
          title: permission.title,
          description: permission.description,
        }}
        onSubmit={handleUpdatePermission}
        validationSchema={createNewPermissionsSchema}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Input label="عنوان" name="title" />
            <Input label="توضیحات" name="description" />
            <SubmitBtn>ذخیره</SubmitBtn>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
