import { type FocusEvent, Fragment, type ReactNode, useState } from "react";

interface TextFieldProps {
  title?: string;
  titleClassName?: string;
  inputType?: "input" | "password";
  useForm?: boolean;
  showLabel?: boolean;
  className?: string;
  rows?: number;
  textarea?: boolean;
  value?: any;
  id?: string;
  name: string;
  error?: any;
  touched?: any;
  placeholder?: string;
  titleDescription?: string;
  onChange?: any;
  disabled?: boolean;
  type?: string;
  iconsearch?: boolean;
  titleElement?: ReactNode;
  step?: string;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  loading?: boolean;
  required?: boolean;
}

const TextField = ({
  loading = false,
  titleClassName = "",
  onBlur,
  onInput,
  disabled = loading || false,
  titleDescription = "",
  title,
  inputType = "input",
  useForm = true,
  showLabel = true,
  className = "",
  rows = 5,
  textarea = false,
  name = "",
  error = "",
  touched = false,
  placeholder = "",
  iconsearch = false,
  titleElement,
  value,
  required = false,
  /* onBlur, */ ...props
}: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Fragment>
      <div className="relative">
        <label htmlFor={name} className={showLabel ? "font-light" : "hidden"}>
          <div className="flex justify-between">
            <label
              htmlFor={name}
              className={showLabel ? "text-color-blue font-light" : "hidden"}
            >
              <h4 className={`line-clamp-1 ${titleClassName}`}>
                {title}{" "}
                {titleDescription !== "" && (
                  <span className="text-gray-main font-light">
                    {titleDescription}
                  </span>
                )}
                {required && <span className="text-red-main font-bold">*</span>}
              </h4>
            </label>
            {titleElement && titleElement}
          </div>
        </label>
        {textarea ? (
          <textarea
            id={name}
            className={`h-full ${className} disabled:input_disabled ${
              touched
                ? error
                  ? "input_error"
                  : useForm
                  ? "input_success"
                  : "input_default"
                : "input_default"
            } ${textarea ? "" : "!h-10"}`}
            disabled={disabled}
            rows={rows}
            cols={50}
            autoComplete="off"
            value={value}
            {...props}
          />
        ) : inputType === "input" ? (
          <div className="relative w-full">
            {iconsearch && (
              <i className="fa-solid fa-magnifying-glass absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 z-10 pointer-events-none"></i>
            )}
            <input
              value={loading ? "กำลังดึงข้อมูล..." : value}
              onInput={onInput}
              id={name}
              onBlur={onBlur}
              className={
                `${loading && "!text-zinc-400"} ` +
                (className
                  ? `input_default ${className}`
                  : `${
                      touched
                        ? error
                          ? "input_error "
                          : useForm
                          ? "input_success !border-green-main"
                          : "input_default"
                        : `input_default ${iconsearch && "pl-10"}`
                    } 
                    ${iconsearch ? "pl-10" : "pl-3"} 
                    ${
                      disabled
                        ? !error
                          ? "input_disabled"
                          : "input_disabled !border-red-500 text-red-500"
                        : ""
                    } ${textarea ? "" : "!h-10"}`)
              }
              autoComplete="off"
              placeholder={placeholder}
              {...props}
              disabled={disabled || loading}
            />
          </div>
        ) : inputType === "password" ? (
          <div className="flex items-center">
            <input
              id={name}
              /* onBlur={onBlur} */ type={`${
                showPassword ? "text" : "password"
              }`}
              className={`${className} ${
                touched
                  ? error
                    ? "input-border-is-invalid"
                    : useForm
                    ? "input-border-is-valid"
                    : "field-input"
                  : "field-input"
              }`}
              autoComplete="off"
            />
            <i
              className={`-ml-7 mt-1 fill-current text-gray-400 text-md z-10 cursor-pointer ${
                showPassword ? "far fa-eye" : "far fa-eye-slash"
              }`}
              onClick={() =>
                setShowPassword((prevShowPassword) => !prevShowPassword)
              }
            />
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

export default TextField;
