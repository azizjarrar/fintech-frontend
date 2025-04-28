import { useState, useEffect } from "react";
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

const Buyerapprove = ({ applicationId, setSingleApplication }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");
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

  useEffect(() => {
    const approveApplication = async (e) => {
      setLoading(true);

      try {
        const response = await axios_instance.post(
          `/application/approve-invoice-buyer/${applicationId}/`,
          {
            status,
          }
        );
        fetchApplication(applicationId);
        setIsOpen(false);
        dispatch(
          setNotification({
            message:
              "Success! You have approved the invoice. The next steps will now proceed.",
            isVisible: true,
            bg: "bg-primary-dark",
          })
        );
      } catch (err) {
        dispatch(
          setNotification({
            message:
              "Oops! Something went wrong while approving the invoice. Please try again later.",
            isVisible: true,
            bg: "bg-error-default",
          })
        );
        console.log("err");
      } finally {
        setLoading(false);
      }
    };

    if (status === "approved" || status === "disapproved") {
      approveApplication();
    }
  }, [status]);

  return (
    <div className="mb-2">
      <SubmitButton
        onClick={() => setIsOpen(true)}
        name="Approve Invoice"
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
                  Approve Invoice Confirmation
                </DialogTitle>
                <Description className="text-text-muted text-center">
                  You are about to approve the uploaded invoice.
                  <br />
                  Once approved, the process will continue to the next step.
                  <br />
                  Please carefully review the invoice details before confirming
                  approval.
                </Description>
                <div className="flex gap-4">
                  <SubmitButton
                    onClick={() => setStatus("disapproved")}
                    name="Dissaproved"
                    css="bg-background-default"
                  />
                  <SubmitButton
                    loading={loading}
                    onClick={() => setStatus("approved")}
                    name="Approve"
                    css="bg-primary-dark text-white"
                  />
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Buyerapprove;
