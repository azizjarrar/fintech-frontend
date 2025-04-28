import React, { useState } from "react";

const Formfield = ({
  id = "",
  name = "",
  type = "text",
  value = "",
  onChange = () => {},
  required = false,
  autoComplete = "off",
  pattern,
  title = "",
  placeholder = "",
  css = "",
  disabled = false,
  error = "",
  inputCss = "",
  rows = 6,
  min,       
  max,      

  onBlur = () => {},
  onFocus = () => {},
  options = [],
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={`mb-3.5 ${css}`}>
      {title && (
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-text-default"
        >
          {title}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          onBlur={onBlur}
          onFocus={onFocus}
          className={`${inputCss} block w-full px-2 rounded-md border-0 py-1.5 text-text-default shadow-sm ring-1 ring-inset placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-default sm:text-sm sm:leading-6
            ${disabled ? "bg-background-default" : "bg-background-light"}
            ${
              error
                ? "!ring-error-dark border border-error-dark !bg-error-light"
                : "ring-background-default"
            }`}
        />
      ) : type === "select" ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`${inputCss} block w-full px-2 rounded-md border-0 py-1.5 text-text-default shadow-sm ring-1 ring-inset placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-default sm:text-sm sm:leading-6
            ${disabled ? "bg-background-default" : "bg-background-light"}
            ${
              error
                ? "!ring-error-dark border border-error-dark !bg-error-light"
                : "ring-background-default"
            }`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          <input
            id={id}
            name={name}
            type={type === "password" && showPassword ? "text" : type}
            value={value}
            onChange={onChange}
            required={required}
            autoComplete={autoComplete}
            pattern={pattern}
            placeholder={placeholder}
            disabled={disabled}
            onBlur={onBlur}
            onFocus={onFocus}
            min={min}          
            max={max}         
          
            className={`${inputCss} block w-full px-2 pr-10 rounded-md border-0 py-1.5 text-text-default shadow-sm ring-1 ring-inset placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-default sm:text-sm sm:leading-6 h-10
             
              ${
                error
                  ? "!ring-error-dark border border-error-dark !bg-error-light"
                  : "ring-background-default"
              }`}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={handleTogglePassword}
              className="absolute inset-y-0 right-2 flex items-center text-text-muted focus:outline-none"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      )}

      {error && (
        <div className="mt-1 text-error-default text-sm flex items-center  w-full">
          <p className="w-full">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Formfield;
