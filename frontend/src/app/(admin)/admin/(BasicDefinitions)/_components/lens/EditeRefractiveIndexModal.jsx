import { Formik, Form, Field } from "formik";
import Input from "@/components/Ui/Input";
import SubmitBtn from "@/components/Ui/SubmitBtn";
import Modal from "@/components/Ui/Modal";
import { useDispatch } from "react-redux";
import { fetchRoles, updateRole } from "@/redux/slices/rolesSlice";
import {
  createNewPermissionsSchema,
  createNewRoleSchema,
} from "@/validators/admin";
import SelectInput from "@/components/Ui/SelectInput";
import { useSelector } from "react-redux";
import { object } from "yup";
import { updateRefractiveindex } from "@/redux/slices/lensSlice";

export default function EditeRefractiveIndexModal({
  RefractiveIndex,
  show,
  onClose,
}) {
  const dispatch = useDispatch();
  const handleUpdateRefractiveIndex = (values) => {
    dispatch(updateRefractiveindex({ id: RefractiveIndex.id, values }));
    onClose();
  };

  return (
    <Modal title="ویرایش ضریب شکست" onClose={onClose} show={show}>
      <Formik
        initialValues={{
          index: RefractiveIndex?.index,
          characteristics:
            RefractiveIndex.characteristics.map((item) => item) || [],
        }}
        onSubmit={handleUpdateRole}
        validationSchema={createNewRoleSchema}
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
                defaultValue={userPermissions}
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
