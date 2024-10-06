const Joi = require("joi");
const CreateError = require("http-errors");
const { validateNationalId } = require("../../utils");

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
  title: Joi.string().trim().min(3).max(50).required().messages({
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
  id: Joi.string().trim().guid({ version: "uuidv4" }).required(),
});

const createNewRoleSchema = Joi.object({
  title: Joi.number().min(100000).max(999999).required().messages({
    "number.min": "عنوان نقش باید حداقل ۶ رقم باشد",
    "number.max": "عنوان نقش نباید بیش از ۶ رقم باشد",
    "any.required": "عنوان نقش الزامی است",
  }),
  description: Joi.string().min(3).max(100).allow("").messages({
    "string.min": "توضیحات نقش باید حداقل ۳ کاراکتر داشته باشد",
    "string.max": "توضیحات نقش نباید بیش از ۱۰۰ کاراکتر باشد",
  }),
  permissionsIds: Joi.array()
    .items(Joi.string().guid({ version: "uuidv4" }).required())
    .min(1)
    .messages({
      "array.includes": "دسترسی‌ها باید شامل UUIDهای معتبر باشند",
      "array.min": "باید حداقل یک سطح دسترسی انتخاب شده باشد",
      "any.required": "دسترسی‌ها الزامی هستند",
    }),
});

const createNewEmployeeSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required().messages({
    "string.base": "نام و نام خانوادگی باید یک رشته باشد",
    "string.min": "نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد",
    "string.max": "نام و نام خانوادگی نمی‌تواند بیش از ۵۰ کاراکتر باشد",
    "any.required": "لطفا نام و نام خانوادگی خود را وارد فرمائید",
  }),
  phoneNumber: Joi.string()
    .length(11)
    .pattern(/^[0][9][0-9]{9}$/)
    .required()
    .messages({
      "string.base": "شماره موبایل باید یک رشته باشد",
      "string.length": "شماره موبایل وارد شده معتبر نیست",
      "string.pattern.base": "شماره موبایل وارد شده معتبر نیست",
      "any.required": "لطفا شماره موبایل خود را وارد فرمائید",
    }),
  gender: Joi.string().required().messages({
    "string.base": "جنسیت باید یک رشته باشد",
    "any.required": "جنسیت را وارد کنید",
  }),
  jobTitle: Joi.string().required().messages({
    "string.base": "عنوان شغل باید یک رشته باشد",
    "any.required": "عنوان شغل را وارد کنید",
  }),
  description: Joi.string().allow("", null),
  fileUploadPath: Joi.allow(),
  filename: Joi.string()
    .regex(/(\.png|\.jpg|\.webp|\.jpeg)$/)
    .error(CreateError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
  nationalId: Joi.string()
    .length(10)
    .required()
    .custom((value, helpers) => {
      if (!validateNationalId(value)) {
        return helpers.message("کد ملی وارد شده معتبر نیست");
      }
      return value;
    })
    .messages({
      "string.base": "کد ملی باید یک رشته باشد",
      "string.length": "کد ملی باید شامل ۱۰ رقم باشد",
      "any.required": "لطفا کد ملی همکار را وارد فرمائید",
    }),
  profileImage: Joi.alternatives()
    .try(
      Joi.object({
        size: Joi.number().max(5000000).optional(),
        type: Joi.string()
          .valid("image/jpg", "image/jpeg", "image/png")
          .optional(),
      }),
      Joi.string()
    )
    .optional()
    .messages({
      "object.max": "حجم فایل نباید بیشتر از ۵ مگابایت باشد",
      "string.valid": "فرمت فایل معتبر نیست. فرمت‌های مجاز: jpg, jpeg, png",
    }),
});

const createNewDoctorsSchema = Joi.object({
  fullName: Joi.string().min(3).required().messages({
    "string.base": "لطفا نام دکتر را وارد فرمائید",
    "string.min": "نام و نام خانوادگی نباید کم‌تر از سه کارکتر باشد",
    "any.required": "لطفا نام دکتر را وارد فرمائید",
  }),
  visitPrice: Joi.string().required().messages({
    "string.base": "لطفا مبلغ ویزیت را وارد فرمائید",
    "any.required": "لطفا مبلغ ویزیت را وارد فرمائید",
  }),
  medicalSystemNumber: Joi.string(),
});
const createNewCategorySchema = Joi.object({
  lensName: Joi.string().trim().min(3).required().messages({
    "string.base": "لطفا نام دسته بندی عدسی را وارد فرمائید",
    "string.min": "دسته بندی عدسی نباید کم‌تر از سه کارکتر باشد",
    "any.required": "لطفا نام دسته بندی عدسی را وارد فرمائید",
  }),
  fileUploadPath: Joi.allow(),
  filename: Joi.string()
    .regex(/(\.png|\.jpg|\.webp|\.jpeg)$/)
    .error(CreateError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
  lensImage: Joi.alternatives()
    .try(
      Joi.object({
        size: Joi.number().max(5000000).optional(),
        type: Joi.string()
          .valid("image/jpg", "image/jpeg", "image/png")
          .optional(),
      }),
      Joi.string()
    )
    .optional()
    .messages({
      "object.max": "حجم فایل نباید بیشتر از ۵ مگابایت باشد",
      "string.valid": "فرمت فایل معتبر نیست. فرمت‌های مجاز: jpg, jpeg, png",
    }),
  typeOfLens: Joi.string().guid({ version: "uuidv4" }).required(),
});

const createNewRefractiveIndexSchema = Joi.object({
  index: Joi.number().precision(2).required().messages({
    "number.base": "مقدار وارد شده باید یک عدد باشد.",
    "number.precision": "عدد وارد شده باید حداکثر دارای دو رقم اعشار باشد.",
    "any.required": "این فیلد الزامی است.",
  }),
  characteristics: Joi.array()
    .items(
      Joi.string().min(3).required().messages({
        "string.empty": "لطفا ویژگی را وارد فرمائید",
        "string.min": "ویژگی نباید کم‌تر از سه کاراکتر باشد.",
      })
    )
    .min(1)
    .messages({
      "array.min": "حداقل باید یک ویژگی وارد شود.",
    }),
});

const createNewLensTypeSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.base": "نوع لنز باید یک رشته باشد",
    "any.required": "عنوان نوع لنز را وارد کنید",
  }),
  description: Joi.string().allow("", null),
});

module.exports = {
  updateAdminProfileSchema,
  createNewPermissionSchema,
  idSchema,
  createNewRoleSchema,
  createNewEmployeeSchema,
  createNewDoctorsSchema,
  createNewRefractiveIndexSchema,
  createNewLensTypeSchema,
};
