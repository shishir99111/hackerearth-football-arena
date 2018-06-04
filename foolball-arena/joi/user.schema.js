const Joi = require('joi');

// client access array schema
const clientAccessObjectSchema = Joi.object({
  client_id: Joi.number().required(),
  name: Joi.string().required(),
}).required();

const clientAccessArraySchema = Joi.array().items(clientAccessObjectSchema).min(1).unique()
  .required();

// menu array schema
const menuObjectSchema = Joi.object({
  menu_id: Joi.number().required(),
  permission: Joi.string().valid(['R', 'W', 'M', 'C']).required(),
}).required();

const menuArraySchema = Joi.array().items(menuObjectSchema).min(1).unique()
  .required();

const roleObjectSchema = Joi.object({
  role_id: Joi.number().required(),
  name: Joi.string().required(),
}).required();
const roleArraySchema = Joi.array().items(roleObjectSchema).min(1).unique()
  .required();

// user schema
const userSchema = Joi.object().keys({
  user_id: Joi.number().optional().allow(null),
  full_name: Joi.string().min(2).required(),
  client_id: Joi.number().required(),
  client_name: Joi.string().required(),
  email: Joi.string().email().optional(),
  language_id: Joi.number().optional().allow(null),
  language_name: Joi.string().required(),
  mobile_country_code: Joi.number().integer().optional().allow(null),
  mobile_number: Joi.string().optional().allow(null),
  roles: Joi.alternatives().try(roleArraySchema, roleObjectSchema).required(),
  role_type_id: Joi.number().optional().allow(null),
  client_access: Joi.alternatives().try(clientAccessArraySchema, clientAccessObjectSchema).required(),
  menu_access: Joi.alternatives().try(menuArraySchema, menuObjectSchema).required(),
  is_active: Joi.boolean().required(),
});

const passwordChangeSchema = Joi.object().keys({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

module.exports = { userSchema, passwordChangeSchema };