import { validateNationalCode } from "@/utils";
import * as Yup from "yup";

export const updateAdminProfileSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد")
    .max(50, "نام و نام خانوادگی نمی‌تواند بیش از ۵۰ کاراکتر باشد")
    .required("لطفا نام و نام خانوادگی خود را وارد فرمائید"),
  phoneNumber: Yup.string()
    .min(11, "شماره موبایل وارد شده معتبر نیست")
    .max(11, "شماره موبایل وارد شده معتبر نیست")
    .matches(/^[0][9][0-9][0-9]{8,8}$/, "شماره موبایل وارد شده معتبر نیست")
    .required("لطفا شماره موبایل خود را وارد فرمائید"),
  profileImage: Yup.mixed()
    .nullable()
    .test(
      "fileSize",
      "حجم فایل نباید بیشتر از ۵ مگابایت باشد",
      (value) => !value || (value && value.size <= 5000000)
    )
    .test(
      "fileFormat",
      "فرمت فایل معتبر نیست. فرمت‌های مجاز: jpg, jpeg, png",
      (value) =>
        !value || ["image/jpg", "image/jpeg", "image/png"].includes(value?.type)
    ),
});

export const createNewEmployeeSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد")
    .max(50, "نام و نام خانوادگی نمی‌تواند بیش از ۵۰ کاراکتر باشد")
    .required("لطفا نام و نام خانوادگی خود را وارد فرمائید"),
  phoneNumber: Yup.string()
    .min(11, "شماره موبایل وارد شده معتبر نیست")
    .max(11, "شماره موبایل وارد شده معتبر نیست")
    .matches(/^[0][9][0-9][0-9]{8,8}$/, "شماره موبایل وارد شده معتبر نیست")
    .required("لطفا شماره موبایل خود را وارد فرمائید"),
  gender: Yup.string().required("جنسیت را وارد کنید"),
  jobTitle: Yup.string().required("عنوان شغل را وارد کنید"),
  description: Yup.string(),
  nationalCode: Yup.string()
    .required("لطفا کد ملی همکار را وارد فرمائید")
    .matches(/^\d{10}$/, "کد ملی باید شامل ۱۰ رقم باشد")
    .test(
      "validateNationalCode",
      "کد ملی وارد شده معتبر نیست",
      validateNationalCode
    ),

  profileImage: Yup.mixed()
    .nullable()
    .test(
      "fileSize",
      "حجم فایل نباید بیشتر از ۵ مگابایت باشد",
      (value) => !value || (value && value.size <= 5000000)
    )
    .test(
      "fileFormat",
      "فرمت فایل معتبر نیست. فرمت‌های مجاز: jpg, jpeg, png",
      (value) =>
        !value || ["image/jpg", "image/jpeg", "image/png"].includes(value?.type)
    ),
});

export const createNewPermissionsSchema = Yup.object().shape({
  title: Yup.string()
    .required("لطفا عنوان دسترسی را وارد فرمائید")
    .min(3, "عنوان نباید کم تر از سه کارکتر باشد"),
  description: Yup.string().required("لطفا توضیحات سطح دسترسی را وارد فرمائید"),
});

export const createNewRoleSchema = Yup.object().shape({
  title: Yup.string()
    .required("لطفا عنوان دسترسی را وارد فرمائید")
    .min(3, "عنوان نباید کم‌تر از سه کارکتر باشد"),
  description: Yup.string()
    .required("لطفا توضیحات دسترسی را وارد فرمائید")
    .min(3, "توضیحات نباید کم‌تر از سه کارکتر باشد"),
  permissions: Yup.array()
    .of(Yup.string().uuid("شناسه سطح دسترسی باید یک UUID معتبر باشد"))
    .required("لطفا توضیحات سطح دسترسی را وارد فرمائید")
    .min(1, "حداقل یک سطح دسترسی باید انتخاب شود"),
});
