import Joi from "joi";

export const priceCategorySchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .min(3)
    .required()
    .messages({
      'string.pattern.base': 'Nama hanya boleh mengandung huruf, angka dan spasi.',
      'string.min': 'Nama harus memiliki minimal 3 karakter.',
      'any.required': 'Nama wajib diisi.',
    }),
})