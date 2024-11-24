import Joi from "joi"

export const userSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z\s]+$/)
    .min(3)
    .required()
    .messages({
      'string.pattern.base': 'Nama hanya boleh mengandung huruf dan spasi.',
      'string.min': 'Nama harus memiliki minimal 3 karakter.',
      'any.required': 'Nama wajib diisi.',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Format email tidak valid.',
      'any.required': 'Field email wajib diisi.',
    }),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9!@#$&*?]{3,30}$'))
    .required()
    .messages({
      'string.pattern.base': 'Password hanya boleh mengandung huruf, angka dan karakter dengan panjang 6-16 karakter.',
      'any.required': 'Field password wajib diisi.',
    }),
  no_telephone: Joi.string()
    .pattern(new RegExp('^[0-9]{12}$'))
    .messages({
      'string.pattern.base': 'Nomor telepon harus terdiri dari 12 digit angka.',
    }),
  tanggal_lahir: Joi.date()
    .messages({
      'date.base': 'Tanggal lahir harus berupa tanggal yang valid.',
    }),
  profile_picture: Joi.string().messages({
    'string.base': 'URL gambar profil harus berupa string.',
  }),
})

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Format email tidak valid.',
      'any.required': 'Field email wajib diisi.',
    }),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9!@#$&*?]{3,30}$'))
    .required()
    .messages({
      'string.pattern.base': 'Password hanya boleh mengandung huruf, angka dan karakter dengan panjang 6-16 karakter.',
      'any.required': 'Field password wajib diisi.',
    }),
});
