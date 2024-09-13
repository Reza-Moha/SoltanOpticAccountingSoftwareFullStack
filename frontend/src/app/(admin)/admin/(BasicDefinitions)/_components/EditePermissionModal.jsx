import { Formik, Form } from "formik";
import Input from "@/components/Ui/Input";
import SubmitBtn from "@/components/Ui/SubmitBtn";
import Modal from "@/components/Ui/Modal";
import { createNewPermissionsSchema } from "@/validators/admin";
import { updatePermissionApi } from "@/services/admin/admin.service";
import toast from "react-hot-toast";

export default function EditPermissionModal({
  permission,
  show,
  onClose,
  fetchPermissions,
}) {
  const handleUpdatePermission = async (values) => {
    try {
      const data = await updatePermissionApi(permission.id, values);
      if (data.statusCode === 200) {
        toast.success(data.message);
        onClose();
        fetchPermissions();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal title="ویرایش سطح دسترسی" onClose={onClose} show={show}>
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
