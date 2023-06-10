import Joi from "joi";
const formikValidationUsingJoi = (schema) => {
  return (values) => {
    const { error } = Joi.object(schema).validate(values, {
      abortEarly: false,
    });

    if (!error) {
      return null;
    }
    let errors = {};

    for (const detail of error.details) {
      let error = detail.path[0];

      errors[error] = detail.message
        .replaceAll('"', " ")
        .replaceAll("confirmPassword", "confirmation password");
    }
    return errors;
  };
};
export default formikValidationUsingJoi;
