const formikFileValidation = ({ allowedFileExtensions }) => {
  return (values) => {
    const files = Object.entries(values);

    let errors = {};
    files &&
      files.forEach(([key, value]) => {
        const fileExtension = value.split(".").pop().toLowerCase();
        if (!allowedFileExtensions.includes(fileExtension)) {
          errors[
            key
          ] = `You must upload an image file of  ${allowedFileExtensions.join(
            ", "
          )} type.`;
        }
        if (!value) {
          errors = {};
        }
      });
    return errors;
  };
};
export default formikFileValidation;
