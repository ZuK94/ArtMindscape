export const Input = ({ name, type, label, onChange, error, ...rest }) => {
  return (
    <>
      <div className={type === "file" ? null : "form-floating"}>
        {/* Input element */}
        <input
          {...rest}
          name={name}
          type={type}
          className={["form-control", error && "is-invalid"]
            .filter(Boolean)
            .join(" ")}
          id={name}
          placeholder={label}
          onChange={onChange}
        />

        {/* Label */}
        <label htmlFor={name}>{label}</label>

        {/* Error message */}
        {error && <span style={{ color: "red" }}>{error}</span>}
      </div>
    </>
  );
};

export const Select = ({
  name,
  label,
  options,
  error,
  floating,
  small,
  ...rest
}) => {
  return (
    <>
      <div className={floating && "form-floating"}>
        {/* Select element */}
        <select
          {...rest}
          className={`form-select ${small && "form-select-sm"}`}
          aria-label="Default select"
          name={name}
          id={name}
        >
          {/* Selected option */}
          {rest.selected && (
            <option defaultValue={rest.selected.value} key={"selected"}>
              {rest.selected.label}
            </option>
          )}

          {/* Options */}
          {options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Label */}
        {label && <label htmlFor={name}>{label}</label>}

        {/* Error message */}
        {error && <span style={{ color: "red" }}>{error}</span>}
      </div>
    </>
  );
};

export const Switch = ({ name, label, ...rest }) => {
  return (
    <>
      <div className="form-check form-switch">
        {/* Switch input */}
        <input
          {...rest}
          className="form-check-input"
          type="checkbox"
          role="switch"
          id={name}
        />

        {/* Label */}
        <label className="form-check-label" htmlFor={name}>
          {label}
        </label>
      </div>
    </>
  );
};

export const Textarea = ({ name, label, error, rows, ...rest }) => {
  return (
    <>
      <div className="form-floating">
        {/* Textarea element */}
        <textarea
          {...rest}
          name={name}
          className={["form-control", error && "is-invalid"]
            .filter(Boolean)
            .join(" ")}
          id={name}
          placeholder={label}
          rows={rows}
        ></textarea>

        {/* Label */}
        <label htmlFor={name}>{label}</label>

        {/* Error message */}
        {error && <span style={{ color: "red" }}>{error}</span>}
      </div>
    </>
  );
};

export const FileInput = ({ name, error, buttonText, ...rest }) => {
  return (
    <>
      <div className="input-group">
        {/* File input */}
        <input
          {...rest}
          name={name}
          type="file"
          className="form-control"
          id={`${name}-upload-input`}
          aria-describedby={`${name}-upload-input-addon`}
          aria-label="Upload"
        />

        {/* Upload button */}
        <button
          className={`btn upload-btn btn-outline-secondary ${
            !rest.value && "disabled"
          } `}
          type="submit"
          id={`${name}-upload-input-addon`}
        >
          {buttonText}
        </button>
      </div>

      {/* Error message */}
      {error && <span style={{ color: "red" }}>{error}</span>}
    </>
  );
};

const inputs = { Input, Select, Textarea, Switch, FileInput };
export default inputs;
