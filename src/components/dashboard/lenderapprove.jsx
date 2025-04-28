import { useEffect, useState } from "react";
import SubmitButton from "../Submitbutton";
import axios_instance from "../../api/axios_instance";
import { getSingleApplication } from "../../api/services/applicationservice";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setNotification } from "../../redux/features/notificationSlice";
import Formfield from "../formfield";
const Lenderapprove = ({ applicationId, setSingleApplication }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    interestRate: null,
    tenure: null,
  });
  const formFields = [
    {
      id: "interestRate",
      name: "interestRate",
      type: "number",
      value: formData.interestRate,
      required: true,
      placeholder: "Interest Rate",
      title: "Interest Rate",
      min: 0,
      max: 100,
    },
    {
      id: "tenure",
      name: "tenure",
      type: "number",
      value: formData.tenure,
      required: true,
      title: "Tenure",
      placeholder: "Tenure",
    },
  ];
  const fetchApplication = async (id) => {
    try {
      const data = await getSingleApplication(id);
      setSingleApplication(data);
    } catch (error) {
      console.error("Failed to fetch application:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isFormInvalid = () => {
    const isTenureValid = !!formData.tenure;
    const isInterestRateValid =
      formData.interestRate !== "" &&
      formData.interestRate >= 0 &&
      formData.interestRate <= 100;

    return !(isTenureValid && isInterestRateValid);
  };

  useEffect(() => {
    const changeApplicationStatus = async (e) => {
      setLoading(true);

      try {
        await axios_instance.post(
          `/application/lender-approve/${applicationId}`,
          {
            status: status,
            interestRate: formData.interestRate,
            tenure: formData.tenure,
          }
        );
        fetchApplication(applicationId);
        setIsOpen(false);
        dispatch(
          setNotification({
            message:
              "Success! The application has been approved and is now assigned to the lender for review.",
            isVisible: true,
            bg: "bg-primary-dark",
          })
        );
      } catch (err) {
        dispatch(
          setNotification({
            message: "Oops! Something went wrong. Please try again later.",
            isVisible: true,
            bg: "bg-error-default",
          })
        );
      } finally {
        setLoading(false);
      }
    };

    if (status === "approve" || status === "disapprove") {
      console.log(status)
      changeApplicationStatus();
    }
  }, [status, formData.interestRate, formData.tenure, applicationId, dispatch]);

  return (
    <div className="mb-2">
      <SubmitButton
        onClick={() => setIsOpen(true)}
        name="Lender approve application"
        css="bg-primary-dark text-white"
      />
      <AnimatePresence>
        {isOpen && (
          <Dialog
            static
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30"
            />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              <DialogPanel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-lg space-y-4 bg-white p-12 rounded-lg shadow-xl rounded"
              >
                <DialogTitle className="text-lg font-bold text-center">
                  Approve Application Confirmation
                </DialogTitle>
                <Description className="text-text-muted text-center">
                  {" "}
                  You are about to approve this application.
                </Description>
                <form className="w-full z-10 ">
                  {formFields.map((field) => (
                    <Formfield
                      key={field.id}
                      id={field.id}
                      name={field.name}
                      type={field.type}
                      value={field.value}
                      onChange={handleChange}
                      required={field.required}
                      placeholder={field.placeholder}
                      title={field.title}
                      min={field.min}
                      max={field.max}
                    />
                  ))}
                  <div className="flex gap-4">
                    <SubmitButton
                      onClick={() => setStatus("disapprove")}
                      name="disapprove"
                      css="bg-background-default"
type="button"
                    
                    />

                    <SubmitButton
                      loading={loading}
                      onClick={() => setStatus("approve")}
                      name="Approve"
                      isFormInvalid={isFormInvalid}
                      css="bg-primary-dark text-white"
                    />
                  </div>
                </form>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Lenderapprove;
