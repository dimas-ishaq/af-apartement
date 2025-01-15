import Joi from "joi";

export const buildingSchema = Joi.object({
  categoryId: Joi.string().required().messages({
    'string.base': 'ID kategori harus berupa string.',
    'any.required': 'ID kategori wajib diisi.',
  }),
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .min(3)
    .required()
    .messages({
      'string.pattern.base': 'Nama hanya boleh mengandung huruf dan spasi.',
      'string.min': 'Nama harus memiliki minimal 3 karakter.',
      'any.required': 'Nama wajib diisi.',
    }),
})

export const updateBuildingSchema = Joi.object({
  categoryId: Joi.string().messages({
    'string.base': 'ID kategori harus berupa string.',
  }),
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .min(3)
    .messages({
      'string.pattern.base': 'Nama hanya boleh mengandung huruf dan spasi.',
      'string.min': 'Nama harus memiliki minimal 3 karakter.',
  })
})