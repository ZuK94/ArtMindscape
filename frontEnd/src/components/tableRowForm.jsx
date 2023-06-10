import { Select } from "../components/common/inputs";
import { useFormik } from "formik";
import Joi from "joi";
import formikValidationUsingJoi from "../utils/formikValidationUsingJoi";
import { useEffect, useState } from "react";
import { updateUserRole } from "../services/userServices";
import { toast } from "react-toastify";

const TableRowForm = ({ user, selectOptions }) => {
  const [role, setRole] = useState(user.role);
  const [newRole, setNewRole] = useState(role);

  // Define form using Formik
  const form = useFormik({
    initialValues: {
      role: user.role,
    },
    validate: formikValidationUsingJoi({
      role: Joi.string().required(),
    }),
    async onSubmit(values) {
      handleSubmit(values);
    },
  });

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const _id = user._id;
      const roleChangeParams = { ...values, _id };
      const response = await updateUserRole(roleChangeParams);
      setRole(response.data.role);
      toast.success("User data has been updated", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch ({ response }) {
      console.error(response.data);
      toast.error("An error has occurred", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // Update new role when form value changes
  useEffect(() => {
    setNewRole(form.values.role);
  }, [form.values.role]);

  return (
    <>
      <tr>
        <td>{user.num}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{role}</td>
        <td>
          <form name="role-select" onSubmit={form.handleSubmit}>
            <div className="input-group justify-content-center">
              <Select
                small
                aria-describedby="role-select"
                name={"role-selector"}
                options={selectOptions}
                {...form.getFieldProps("role")}
              />
              <button
                className={`btn btn-sm  ${
                  role === newRole
                    ? "disabled btn-outline-secondary"
                    : "btn-outline-danger"
                }`}
                type="submit"
                id="role-select"
              >
                Save
              </button>
            </div>
          </form>
        </td>
      </tr>
    </>
  );
};

export default TableRowForm;
