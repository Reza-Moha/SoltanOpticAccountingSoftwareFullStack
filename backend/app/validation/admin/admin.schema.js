const Joi = require("joi");
const CreateError = require("http-errors");
const updateAdminProfileSchema = Joi.object({
  phoneNumber: Joi.string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .required()
    .messages({
      "string.length": "شماره موبایل باید ۱۱ رقم باشد",
      "string.pattern.base": "شماره موبایل وارد شده صحیح نمی‌باشد",
      "any.required": "لطفا شماره موبایل خود را وارد فرمائید",
    }),

  fullName: Joi.string().min(5).max(30).required().messages({
    "string.min": "نام و نام خانوادگی باید حداقل ۵ کاراکتر باشد",
    "string.max": "نام و نام خانوادگی نمی‌تواند بیش از ۳۰ کاراکتر باشد",
    "any.required": "لطفا نام و نام خانوادگی خود را وارد فرمائید",
  }),
  fileUploadPath: Joi.allow(),
  filename: Joi.string()
    .regex(/(\.png|\.jpg|\.webp|\.jpeg)$/)
    .error(CreateError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
});

module.exports = {
  updateAdminProfileSchema,
};
