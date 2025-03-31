import { celebrate, Joi } from "celebrate";

export const validateGETProducts = celebrate({
  query: {
    page: Joi.number().min(1),
    limit: Joi.number().min(1),
  },
});

export const validateGETProduct = celebrate({
  params: {
    id: Joi.string().required(),
  },
});

export const validatePOSTProduct = celebrate({
  body: {
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    sku: Joi.string().required(),
    stock_status: Joi.string().valid("in_stock", "out_of_stock").required(),
  },
});

export const validatePUTProduct = celebrate({
  params: {
    id: Joi.string().required(),
  },
  body: {
    name: Joi.string(),
    description: Joi.string(),
    category: Joi.string(),
    price: Joi.number(),
    sku: Joi.string(),
    stock_status: Joi.string().valid("in_stock", "out_of_stock"),
  },
});

export const validateDELETEProduct = celebrate({
  params: {
    id: Joi.string().required(),
  },
});
