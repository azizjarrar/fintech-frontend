import { useState } from "react";
import SubmitButton from "../Submitbutton";
import axios_instance from "../../api/axios_instance";
import { getSingleApplication } from "../../api/services/applicationservice";
import { useEffect } from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setNotification } from "../../redux/features/notificationSlice";

const Adminapprove = ({ applicationId, setSingleApplication }) => {




  
  const [loading, setLoading] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  let [status, setStatus] = useState("");

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


 



 useEffect(
  ()=>{
    const changeApplicationStatus = async (e) => {
      setLoading(true);
  
      try {
       await axios_instance.post(
          `/application/approve/${applicationId}/${status}`
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
if(status === "approved" || status === "rejected"){
  changeApplicationStatus()

}

  },[status]
)

  return (
    <div className="mb-2">
      <SubmitButton
        onClick={() => setIsOpen(true)}
        name="Approve application"
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
                  <br />
                  Upon approval, the application will be assigned to a lender
                  for the next phase of processing.
                  <br />
                  Please ensure that all required documents and financial
                  information have been reviewed and verified.
                  <br />
                </Description>
                <div className="flex gap-4">
                  <SubmitButton
                    onClick={()=>setStatus("rejected")}
                    name="Reject"
                    css="bg-background-default"
                  />

                  <SubmitButton
                    loading={loading}
                    onClick={()=>setStatus("approved")}
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

export default Adminapprove;
