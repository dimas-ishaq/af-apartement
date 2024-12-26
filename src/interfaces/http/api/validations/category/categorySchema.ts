import Joi from "joi";

export const categorySchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .min(3)
    .required()
    .messages({
      'string.pattern.base': 'Nama hanya boleh mengandung huruf, angka dan spasi.',
      'string.min': 'Nama harus memiliki minimal 3 karakter.',
      'any.required': 'Nama wajib diisi.',
    }),
  image: Joi.string().required().messages({
    'string.base': 'Image harus berupa string.',
    'any.required': 'Image wajib diisi.',
  })
})

export const updateCategorySchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .min(3)
    .messages({
      'string.pattern.base': 'Nama hanya boleh mengandung huruf, angka dan spasi.',
      'string.min': 'Nama harus memiliki minimal 3 karakter.',
    }),
  image: Joi.string().messages({
    'string.base': 'Image harus berupa string.',
  }),
})