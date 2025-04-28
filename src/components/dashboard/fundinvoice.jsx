import { useState } from "react";
import SubmitButton from "../Submitbutton";
import axios_instance from "../../api/axios_instance";
import Formfield from "../formfield";
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

const Fundinvoice = ({ applicationId, setSingleApplication }) => {
  const [loading, setLoading] = useState(false);
  const [invoiceAmount, setInvoiceAmount] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

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

  const fundinvoice = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios_instance.post(
        `/application/fund-invoice/${applicationId}`,
        { invoiceAmount }
      );

      fetchApplication(applicationId);
      setIsOpen(false);
      dispatch(
        setNotification({
          message: "Invoice amount successfully funded!",
          isVisible: true,
          bg: "bg-primary-dark",
        })
      );
    } catch (err) {
      console.error(err);

      if ( err?.response?.data?.error?.includes("limit to invoice is")) {
        dispatch(
          setNotification({
            message: err.response.data.error,
            isVisible: true,
            bg: "bg-error-default",
          })
        );
      } else {
        dispatch(
          setNotification({
            message: "Oops! Something went wrong. Please try again later.",
            isVisible: true,
            bg: "bg-error-default",
          })
        );
      }
      

    
    } finally {
      setLoading(false);
    }
  };

  const isFormInvalid = () => {
    const isFormValid = invoiceAmount;

    return !isFormValid;
  };

  return (
    <div className="mb-2">
      <SubmitButton
        onClick={() => setIsOpen(true)}
        name="Fund Invoice"
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
                className="max-w-lg space-y-4 bg-white p-12 rounded-lg shadow-xl rounded "
              >
                <DialogTitle className="text-lg font-bold text-center">
                  Enter Fund Amount
                </DialogTitle>
                <Description className="text-text-muted text-center text-sm">
                  Please enter the fund amount for this application.
                  <br />
                  Ensure the amount is accurate before submitting.
                  <br />
                  This will proceed the application to the next stage.
                </Description>

                <form onSubmit={fundinvoice} className="space-y-4">
                  <Formfield
                    id="invoiceAmount"
                    name="invoiceAmount"
                    title="Fund amount"
                    placeholder="Enter Found amount"
                    value={invoiceAmount}
                    onChange={(e) => setInvoiceAmount(e.target.value)}
                    required
                  />

                  {/* File Upload Input */}

                  <div className="flex gap-4">
                    <SubmitButton
                      onClick={() => setIsOpen(false)}
                      name="Cancel"
                      type="button"
                      css="bg-background-default"
                    />
                    <SubmitButton
                      loading={loading}
                      name="Fund"
                      isFormInvalid={isFormInvalid}
                      css="bg-primary-dark text-white"
                      type="submit"
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

export default Fundinvoice;
