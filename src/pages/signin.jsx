import Formfield from "../components/formfield";
import { useState } from "react";
import axios_instance from "../api/axios_instance";
import Authcontainer from "../components/authcontainer";
import SubmitButton from "../components/Submitbutton";
import Madadlogo from "../components/madadlogo";
import Errormessage from "../components/errormessage";
const Signin = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ emailAddress: "", password: "" });
  const [validationErrors, setValidationErrors] = useState({
    emailAddress: null,
    password: null,
  });

  const validateField = (name, value, formData) => {
    const errors = { ...validationErrors };

    switch (name) {
      case "emailAddress":
        if (!emailRegex.test(value)) {
          errors.emailAddress = "Invalid email address";
        } else {
          delete errors.emailAddress;
        }
        break;

      case "password":
        if (value.length < 8) {
          errors.password =
            "Password must be at least 8 characters or 8 digits.";
        } else {
          delete errors.password;
        }
        break;

      default:
        break;
    }

    return errors;
  };

  const isFormInvalid = () => {
    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== null
    );

    const isFormValid = formData.password && formData.emailAddress;

    return hasErrors || !isFormValid;
  };

  // Regex patterns for form validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.*$/;

  // Form field definitions
  const formFields = [
    {
      id: "email",
      name: "emailAddress",
      type: "email",
      value: formData.emailAddress,
      required: true,
      autoComplete: "email",
      placeholder: "Email addresse",
      pattern: emailRegex.source,
      title: "Email addresse",
    },
    {
      id: "password",
      name: "password",
      type: "password",
      value: formData.password,
      required: true,
      autoComplete: "new-password",
      title: "Password",
      placeholder: "Password",
      pattern: passwordRegex.source,
    },
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setValidationErrors(validateField(name, value, formData));
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios_instance.post("/auth/login", {
        email: formData.emailAddress,
        password: formData.password,
      });
      if (response.data.message === "Login successful") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.location.href = "/dashboard/listofapplications"
      }
    } catch (err) {
        console.log(err)
      if (err.response && err.response.data) {
        setError(
          err.response.data.message || "Something went wrong. Please try again."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ backgroundImage: `url('/images/authBg.jpg')` }}
      className="relative flex items-center justify-around h-screen bg-cover bg-center before:absolute before:inset-0 before:bg-black before:opacity-50 "
    >
      <Authcontainer>
        <Madadlogo css="justify-around " width={180} height={180} />

        <Errormessage message={error} />

        <form onSubmit={handleSignin} className="w-full z-10 ">
          {formFields.map((field) => (
            <Formfield
              key={field.id}
              id={field.id}
              name={field.name}
              type={field.type}
              value={field.value}
              onChange={handleChange}
              required={field.required}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              pattern={field.pattern}
              title={field.title}
              error={
                validationErrors[field.name] ? validationErrors[field.name] : ""
              }
            />
          ))}

          <SubmitButton
            loading={loading}
            name="login"
            isFormInvalid={isFormInvalid}
            css="bg-primary-default text-white"
          />
        </form>
      </Authcontainer>
    </div>
  );
};

export default Signin;
