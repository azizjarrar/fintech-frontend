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

const UploadInvoice = ({ applicationId, setSingleApplication }) => {
  const [loading, setLoading] = useState(false);
  const [buyerEmail, setBuyerEmail] = useState("");
  const [file, setFile] = useState(null);
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

  const uploadInvoice = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("buyerEmail", buyerEmail);
      formData.append("invoice", file);

      await axios_instance.post(
        `/application/upload-invoice/${applicationId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      fetchApplication(applicationId);

      setIsOpen(false);
      dispatch(
        setNotification({
          message: "Invoice uploaded successfully! Awaiting buyer approval.",
          isVisible: true,
          bg: "bg-primary-dark",
        })
      );
    } catch (err) {
      console.error(err);
      if (
        err?.response?.data?.error ===
        "Buyer with the provided email not found on the platform"
      ) {
        dispatch(
          setNotification({
            message: "Buyer with the provided email not found on the platform",
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
    const isFormValid = buyerEmail && file;

    return !isFormValid;
  };

  return (
    <div className="mb-2">
      <SubmitButton
        onClick={() => setIsOpen(true)}
        name="Upload Invoice"
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
                  Upload Invoice Confirmation
                </DialogTitle>
                <Description className="text-text-muted text-center text-sm">
                  You are about to upload the invoice for this applicati on.
                  <br />
                  Please provide the buyer's email address and the invoice file
                  to proceed.
                  <br />
                  Ensure all details are correct before submission.
                </Description>

                <form onSubmit={uploadInvoice} className="space-y-4">
                  <Formfield
                    id="buyerEmail"
                    name="buyerEmail"
                    title="Buyer Email"
                    placeholder="Enter buyer's email address"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    required
                  />

                  {/* File Upload Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="invoice"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Upload Invoice File
                    </label>
                    <input
                      id="invoice"
                      name="invoice"
                      type="file"
                      accept="application/pdf,image/*"
                      onChange={(e) => setFile(e.target.files[0])}
                      required
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-primary-light file:text-primary-dark
                        hover:file:bg-primary-dark hover:file:text-white"
                    />
                    {file && (
                      <p className="text-xs text-gray-600 mt-1">
                        Selected file: {file.name}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <SubmitButton
                      onClick={() => setIsOpen(false)}
                      name="Cancel"
                      type="button"
                      css="bg-background-default"
                    />
                    <SubmitButton
                      loading={loading}
                      name="Upload"
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

export default UploadInvoice;
