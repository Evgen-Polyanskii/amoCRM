const yup = require('yup');

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required().matches(/(^[0-9]{11}$|(^\+[0-9]{11}$))/),
});

module.exports = (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return e.inner.map(({ path, errors }) => ({ [path]: errors }));
  }
};
