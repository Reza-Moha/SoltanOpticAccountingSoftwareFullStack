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

const createNewPermissionSchema = Joi.object({
  title: Joi.string().min(3).max(50).required().messages({
    "string.empty": "عنوان نمی‌تواند خالی باشد",
    "string.min": "عنوان باید حداقل ۳ کاراکتر داشته باشد",
    "string.max": "عنوان نباید بیش از ۵۰ کاراکتر باشد",
    "any.required": "عنوان الزامی است",
  }),
  description: Joi.string().min(5).max(255).required().messages({
    "string.empty": "توضیحات نمی‌تواند خالی باشد",
    "string.min": "توضیحات باید حداقل 5 کاراکتر داشته باشد",
    "string.max": "توضیحات نباید بیش از ۲۵۵ کاراکتر باشد",
    "any.required": "توضیحات الزامی است",
  }),
});

const idSchema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }).required(),
});
const createNewRoleSchema = Joi.object({
  title: Joi.string().min(3).max(30).required().messages({
    "string.empty": "عنوان نقش نمی‌تواند خالی باشد",
    "string.min": "عنوان نقش باید حداقل ۳ کاراکتر داشته باشد",
    "string.max": "عنوان نقش نباید بیش از ۳۰ کاراکتر باشد",
    "any.required": "عنوان نقش الزامی است",
  }),
  description: Joi.string().min(3).max(100).allow("").messages({
    "string.min": "توضیحات نقش باید حداقل ۳ کاراکتر داشته باشد",
    "string.max": "توضیحات نقش نباید بیش از ۱۰۰ کاراکتر باشد",
  }),
  permissions: Joi.array()
    .items(Joi.string().guid({ version: "uuidv4" }).required())
    .min(1)
    .messages({
      "array.includes": "دسترسی‌ها باید شامل UUIDهای معتبر باشند",
      "array.min": "باید حداقل یک سطح دسترسی انتخاب شده باشد",
      "any.required": "دسترسی‌ها الزامی هستند",
    }),
});

module.exports = {
  updateAdminProfileSchema,
  createNewPermissionSchema,
  idSchema,
  createNewRoleSchema,
};
