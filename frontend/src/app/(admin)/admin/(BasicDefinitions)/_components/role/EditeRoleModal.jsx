import { Formik, Form, Field } from "formik";
import Input from "@/components/Ui/Input";
import SubmitBtn from "@/components/Ui/SubmitBtn";
import Modal from "@/components/Ui/Modal";
import { useDispatch } from "react-redux";
import { fetchRoles, updateRole } from "@/redux/slices/rolesSlice";
import { createNewPermissionsSchema } from "@/validators/admin";
import SelectInput from "@/components/Ui/SelectInput";
import { useSelector } from "react-redux";

export default function EditRoleModal({ Role, show, onClose }) {
  const dispatch = useDispatch();
  const handleUpdateRole = (values) => {
    dispatch(updateRole({ id: Role.roleId, values }));
    onClose();
  };
  const { permissionsList } = useSelector((state) => state.permissionSlice);

  const permissionOptions = permissionsList.map((permission) => ({
    value: permission.permissionId,
    label: permission.title,
  }));
  return (
    <Modal title="ویرایش نقش" onClose={onClose} show={show}>
      <Formik
        initialValues={{
          title: Role?.title,
          description: Role?.description,
          permissionsIds: Role?.permissions || [],
        }}
        onSubmit={handleUpdateRole}
        validationSchema={createNewPermissionsSchema}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Input label="عنوان" name="title" />
            <div className="flex items-center mb-4 px-3">
              <Field
                name="permissionsIds"
                component={SelectInput}
                options={permissionOptions}
                isMulti
              />
            </div>
            <Input label="توضیحات" name="description" />
            <SubmitBtn>ذخیره</SubmitBtn>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
