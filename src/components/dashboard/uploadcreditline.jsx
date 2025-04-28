import { useState } from "react";
import axios_instance from "../../api/axios_instance"; // Your Axios instance
import SubmitButton from "../Submitbutton";

export default function ApplyCreditLine() {
  const [formData, setFormData] = useState({
    cr: null,
    tradeLicense: null,
    taxCard: null,
    estdCertificate: null,
    auditedReport: null,
    bankStatement: null,
    creditScore: "",
    monthlyAerageTransaction: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formFields = [
    {
      id: "cr",
      label: "Commercial Registration Certificate (CR)",
      type: "file",
    },
    { id: "tradeLicense", label: "Trade License", type: "file" },
    { id: "taxCard", label: "Tax Card", type: "file" },
    { id: "estdCertificate", label: "Establishment Certificate", type: "file" },
    { id: "auditedReport", label: "Audited Financial Report", type: "file" },
    { id: "bankStatement", label: "Bank Statement", type: "file" },
    {
      id: "creditScore",
      label: "*Credit Score (0–800) Required",
      type: "number",
      min: "0",
      max: "800",
    },

    {
      id: "monthlyAerageTransaction",
      label: "monthly Average Transaction",
      type: "number",
    },
  ];

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
  
    if (!file) return;
  
    const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
  
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage("Only PDF and image (JPEG, JPG, PNG) files are allowed.");
      e.target.value = null;
      return;
    }
  
    setErrorMessage(""); 
    setFormData((prevState) => ({
      ...prevState,
      [field]: file,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios_instance.post(
        "/application",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFormData({
        cr: null,
        tradeLicense: null,
        taxCard: null,
        estdCertificate: null,
        auditedReport: null,
        bankStatement: null,
        creditScore: "",
        monthlyAerageTransaction: null,
      });

      setSuccessMessage("Your application was successfully submitted");
      window.location.href = "/dashboard/listofapplications";
      console.log("Application response:", response?.data);
    } catch (error) {
      if (
        error?.response?.data?.error === "Only PDF and image files are allowed"
      ) {
        setErrorMessage("Only PDF and image files are allowed");
      } else {
        setErrorMessage("Failed to submit application. Please try again.");
      }
      console.log("Error submitting application:", error);
    } finally {
      setLoading(false);
    }
  };

  const isFormInvalid = () => {
    const isFormValid =
      formData.creditScore && formData.monthlyAerageTransaction;

    return !isFormValid;
  };

  return (
    <div className="w-full  h-full p-4 overflow-y-scroll ">
      <div className="bg-white border rounded-xl p-4 max-w-lg w-full mx-auto my-auto ">
        {/* Conditional rendering of success or error messages */}
        {successMessage ? (
          <SuccessfullySubmitted
            message={successMessage}
            setSuccessMessage={setSuccessMessage}
          />
        ) : (
          <>
            {errorMessage && (
              <p className="text-error-dark text-center mb-4 font-semibold text-lg">
                {errorMessage}
              </p>
            )}

            {/* Form */}
            <h2 className="text-xl font-semibold text-center text-text-default mb-6">
              Apply for Credit Line
            </h2>
            <form onSubmit={handleSubmit} className="space-y-2">
              {formFields.map((field) => (
                <div key={field.id} className="space-y-1">
                  <label
                    htmlFor={field.id}
                    className="text-sm font-medium text-text-default "
                  >
                    {field.label}
                  </label>
                  {field.type === "number" ? (
                    <input
                      type="number"
                      id={field.id}
                      name={field.id}
                      value={formData[field.id]}
                      onChange={handleInputChange}
                      min={field.min}
                      max={field.max}
                      className="block  w-full text-sm text-text-default bg-background-light border  rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-primary-dark"
                    />
                  ) : (
                    <input
                      type="file"
                      id={field.id}
                      onChange={(e) => handleFileChange(e, field.id)}
                      className={`                       file:mr-4 file:p-2
                      file:rounded-full file:border-0
                      file:text-xs file:font-semibold
                      file:bg-primary-light file:text-primary-dark
                      block w-full text-sm text-gray-800 bg-gray-50 border  cursor-pointer rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-dark ${
                      formData[field.id] &&
                      field.type === "file" &&
                      "outline-none ring-1 ring-primary-dark"
 }`}
                    />
                  )}
                  {formData[field.id] && field.type === "file" && (
                    <p className="text-primary-dark text-sm mt-1 font-semibold flex text-md items-center">
                      <span className="mr-2">Uploaded</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </p>
                  )}
                </div>
              ))}
              <SubmitButton
                css="bg-primary-dark text-white !mt-4"
                name="Submit Application"
                loading={loading}
                isFormInvalid={isFormInvalid}
              />
            </form>
          </>
        )}
      </div>
    </div>
  );
}

const SuccessfullySubmitted = ({ message, setSuccessMessage }) => {
  return (
    <div className=" text-center  flex flex-col justify-around items-center space-y-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-28 text-primary-default"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
          clipRule="evenodd"
        />
      </svg>

      <p className=" font-semibold text-2xl">{message}</p>
    </div>
  );
};
