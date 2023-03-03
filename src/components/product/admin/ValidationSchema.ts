import Joi from 'joi'

const inputCreateProduct = {
  body: {
    title: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    weight: Joi.number().required(),
    description: Joi.string().required(),
  },
}

export { inputCreateProduct }
