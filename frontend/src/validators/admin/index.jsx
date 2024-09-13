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
