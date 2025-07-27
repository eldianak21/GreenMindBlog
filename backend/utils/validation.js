const { body, validationResult } = require('express-validator');

// Common validation rules
const registerValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
  ];
};

const loginValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ];
};

const postValidationRules = () => {
  return [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('excerpt').notEmpty().withMessage('Excerpt is required')
  ];
};

const commentValidationRules = () => {
  return [
    body('content').notEmpty().withMessage('Comment content is required')
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  registerValidationRules,
  loginValidationRules,
  postValidationRules,
  commentValidationRules,
  validate
};