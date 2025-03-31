import { celebrate, Joi } from "celebrate";

export const validateGETProducts = celebrate({
  query: {
    page: Joi.number().min(1),
    limit: Joi.number().min(1),
  },
});
