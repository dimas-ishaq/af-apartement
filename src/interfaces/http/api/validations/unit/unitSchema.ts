import Joi from "joi";

export const unitSchema = Joi.object({
    buildingId: Joi.string().required().messages({
        'string.base': 'ID bangunan harus berupa string.',
        'any.required': 'ID bangunan wajib diisi.',
    }),
    name: Joi.string().required()
        .pattern(/^[a-zA-Z0-9\s]+$/)
        .min(3)
        .required()
        .messages({
            'string.pattern.base': 'Nama hanya boleh mengandung huruf, angka dan spasi.',
            'string.min': 'Nama harus memiliki minimal 3 karakter.',
            'any.required': 'Nama wajib diisi.',
        }),
    status:Joi.string().required().messages({
        'string.base': 'Status harus berupa string.',
        'any.required': 'Status wajib diisi.',
    })
})

export const updateUnitSchema = Joi.object({
    buildingId:Joi.string().messages({
        'string.base': 'ID bangunan harus berupa string.',
    }),
    name:Joi.string()
        .pattern(/^[a-zA-Z0-9\s]+$/)
        .min(3)
        .messages({
            'string.pattern.base': 'Nama hanya boleh mengandung huruf, angka dan spasi.',
            'string.min': 'Nama harus memiliki minimal 3 karakter.',
        }),
    status:Joi.string().messages({
        'string.base': 'Status harus berupa string.',
    })
})

export const findUnitByName = Joi.object({
    name:Joi.string().required().messages({
        'string.base': 'Nama harus berupa string.',
        'any.required': 'Nama wajib diisi.',
    })
})