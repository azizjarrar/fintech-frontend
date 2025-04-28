import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Statusbadge from "./statusbadge";
import Adminapprove from "./adminapprove";
import Spinner from "../spinner";
import Lenderapprove from "./lenderapprove";
import Uploadinvoice from "./invoiceupload";
import Buyerapprove from "./buyerapprove";
import Fundinvoice from "./fundinvoice";
import Markasrepaid from "./markasrepaid";
import Closeapplication from "./closeapplication";
import { getSingleApplication } from "../../api/services/applicationservice";
const Singleapplicationpage = () => {
  const { id } = useParams();
  const [singleApplication, setSingleApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [documents, setDocuments] = useState({});

  const documentMapping = {
    cr: "Commercial Registration Certificate",
    tradeLicense: "Trade License",
    taxCard: "Tax Card",
    estdCertificate: "Establishment Certificate",
    auditedReport: "Audited Financial Statement",
    bankStatement: "Bank Statement",
    creditScore: "Credit Score"
  };



  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const data = await getSingleApplication(id);
        setSingleApplication(data);
      } catch (error) {
        console.error("Failed to fetch application:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  useEffect(() => {
    if (singleApplication?.documents) {
      setDocuments(singleApplication.documents);
    }
  }, [singleApplication]);

  const formatDocumentName = (filePath) => {
    const parts = filePath?.split("\\");
    return parts[parts?.length - 1];
  };

  const statusSteps = {
    submitted: 1,
    assigned_to_lender: 2,
    lender_approved: 3,
    invoice_uploaded: 4,
    buyer_approved: 5,
    invoice_funded: 6,
    closed: 7,
  };
  const handleDownload = async (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop(); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (singleApplication?.status) {
      const currentStep = statusSteps[singleApplication.status];
      setStep(currentStep || 0);
    }
  }, [singleApplication?.status, statusSteps]);

  const formatDate = (date) =>
    date === "N/A" || !date
      ? "N/A"
      : new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  const user = JSON.parse(localStorage.getItem("user")) || null;
  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner css="mx-auto" />
      </div>
    );
  }
  return (
    <div className="w-full  h-full p-4 overflow-y-scroll ">
      {user.role === "admin" && step === 1 && (
        <Adminapprove
          applicationId={singleApplication?._id}
          setSingleApplication={setSingleApplication}
        />
      )}
      {user.role === "lender" && step === 2 && (
        <Lenderapprove
          applicationId={singleApplication?._id}
          setSingleApplication={setSingleApplication}
        />
      )}
      {user.role === "msme" && step === 3 && (
        <Uploadinvoice
          applicationId={singleApplication?._id}
          setSingleApplication={setSingleApplication}
        />
      )}

      {user.role === "buyer" && step === 4 && (
        <Buyerapprove
          applicationId={singleApplication?._id}
          setSingleApplication={setSingleApplication}
        />
      )}

      {user.role === "lender" && step === 5 && (
        <Fundinvoice
          applicationId={singleApplication?._id}
          setSingleApplication={setSingleApplication}
        />
      )}

      {user.role === "msme" && step === 6 && (
        <Markasrepaid
          applicationId={singleApplication?._id}
          setSingleApplication={setSingleApplication}
        />
      )}
      {user.role === "lender" && step === 6 && (
        <Closeapplication
          applicationId={singleApplication?._id}
          setSingleApplication={setSingleApplication}
        />
      )}

      {/* Stepper Bar */}

      {singleApplication?.status !== "rejected" &&
        singleApplication?.status !== "rejected_by_madad" && (
          <div className="w-full bg-white h-auto flex flex-col mx-auto justify-between items-center min-h-custom relative">
            <ul className="w-full flex items-center justify-around p-4 relative ">
              <li className="flex items-center justify-around ">
                <div className="w-[20%] flex items-center justify-around flex-col">
                  <div
                    className={`w-8 h-8 z-10 bg-background-light flex items-center justify-between border border text-center rounded-full ${
                      step === 1
                        ? "border !bg-primary-default text-white rounded-full flex items-center justify-around"
                        : step > 1
                        ? "border !bg-primary-light text-primary-dark flex items-center justify-around"
                        : "border border-black flex items-center justify-around"
                    }`}
                  >
                    {step >= 1 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      "1 "
                    )}
                  </div>
                  <p className="text-text-muted font-semibold mt-2 hidden lg:block whitespace-nowrap text-sm ">
                    Submitted
                  </p>
                </div>
              </li>

              <li className="w-1/5 flex items-center">
                <div
                  className={`w-[80%] h-0.5 ${
                    step >= 2 ? "bg-primary-default" : "bg-background-light"
                  }`}
                ></div>

                <div className="w-[20%] flex items-center justify-around flex-col">
                  <div
                    className={`w-8 h-8 z-10 bg-background-light flex items-center justify-between border border rounded-full ${
                      step === 2
                        ? "border !bg-primary-default text-white rounded-full flex items-center justify-around"
                        : step > 2
                        ? "border !bg-primary-light text-primary-dark flex items-center justify-around"
                        : "border border-black flex items-center justify-around"
                    }`}
                  >
                    {step >= 2 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      "2"
                    )}
                  </div>
                  <p className="text-text-muted font-semibold mt-2 hidden lg:block whitespace-nowrap text-sm ">
                    Assigned to lender
                  </p>
                </div>
              </li>

              <li className="w-1/5 flex items-center">
                <div
                  className={`w-[80%] h-0.5 ${
                    step >= 3 ? "bg-primary-default" : "bg-background-light"
                  }`}
                ></div>

                <div className="w-[20%] flex items-center justify-around flex-col">
                  <div
                    className={`w-8 h-8 z-10 bg-background-light flex items-center justify-between border border rounded-full ${
                      step === 3
                        ? "border !bg-primary-default text-white rounded-full flex items-center justify-around"
                        : step > 3
                        ? "border !bg-primary-light text-primary-dark flex items-center justify-around"
                        : "border border-black flex items-center justify-around"
                    }`}
                  >
                    {step >= 3 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      "3"
                    )}
                  </div>
                  <p className="text-text-muted font-semibold mt-2 hidden lg:block whitespace-nowrap text-sm ">
                    Approved by the lender
                  </p>
                </div>
              </li>

              {/* Step 4 - Invoice Uploaded */}
              <li className="w-1/5 flex items-center">
                <div
                  className={`w-[80%] h-0.5 ${
                    step >= 4 ? "bg-primary-default" : "bg-background-light"
                  }`}
                ></div>

                <div className="w-[20%] flex items-center justify-around flex-col">
                  <div
                    className={`w-8 h-8 z-10 bg-background-light flex items-center justify-between border border rounded-full ${
                      step === 4
                        ? "border !bg-primary-default text-white rounded-full flex items-center justify-around"
                        : step > 4
                        ? "border !bg-primary-light text-primary-dark flex items-center justify-around"
                        : "border border-black flex items-center justify-around"
                    }`}
                  >
                    {step >= 4 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      "4"
                    )}
                  </div>
                  <p className="text-text-muted font-semibold mt-2 hidden lg:block whitespace-nowrap text-sm ">
                    Invoice uploaded{" "}
                  </p>
                </div>
              </li>

              {/* Step 5 - Buyer Approved / Disapproved */}
              <li className="w-1/5 flex items-center">
                <div
                  className={`w-[80%] h-0.5 ${
                    step >= 5 ? "bg-primary-default" : "bg-background-light"
                  }`}
                ></div>

                <div className="w-[20%] flex items-center justify-around flex-col">
                  <div
                    className={`w-8 h-8 z-10 bg-background-light flex items-center justify-between border border rounded-full ${
                      step === 5
                        ? "border !bg-primary-default text-white rounded-full flex items-center justify-around"
                        : step > 5
                        ? "border !bg-primary-light text-primary-dark flex items-center justify-around"
                        : "border border-black flex items-center justify-around"
                    }`}
                  >
                    {step >= 5 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      "5"
                    )}
                  </div>
                  <p className="text-text-muted font-semibold mt-2 hidden lg:block whitespace-nowrap text-sm ">
                    Buyer approved{" "}
                  </p>
                </div>
              </li>

              {/* Step 6 - Invoice Funded */}
              <li className="w-1/5 flex items-center">
                <div
                  className={`w-[80%] h-0.5 ${
                    step >= 6 ? "bg-primary-default" : "bg-background-light"
                  }`}
                ></div>

                <div className="w-[20%] flex items-center justify-around flex-col">
                  <div
                    className={`w-8 h-8 z-10 bg-background-light flex items-center justify-between border border rounded-full ${
                      step === 6
                        ? "border !bg-primary-default text-white rounded-full flex items-center justify-around"
                        : step > 6
                        ? "border !bg-primary-light text-primary-dark flex items-center justify-around"
                        : "border border-black flex items-center justify-around"
                    }`}
                  >
                    {step >= 6 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      "6"
                    )}
                  </div>
                  <p className="text-text-muted font-semibold mt-2 hidden lg:block whitespace-nowrap text-sm ">
                    Invoice funded
                  </p>
                </div>
              </li>

              {/* Step 7 - Closed */}
              <li className="w-1/5 flex items-center">
                <div
                  className={`w-[80%] h-0.5 ${
                    step >= 7 ? "bg-primary-default" : "bg-background-light"
                  }`}
                ></div>

                <div className="w-[20%] flex items-center justify-around flex-col">
                  <div
                    className={`w-8 h-8 z-10 bg-background-light flex items-center justify-between border border rounded-full ${
                      step === 7
                        ? "border !bg-primary-default text-white rounded-full flex items-center justify-around"
                        : step > 7
                        ? "border !bg-primary-light text-primary-dark flex items-center justify-around"
                        : "border border-black flex items-center justify-around"
                    }`}
                  >
                    {step >= 7 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      "7"
                    )}
                  </div>
                  <p className="text-text-muted font-semibold mt-2 hidden lg:block whitespace-nowrap text-sm ">
                    Closed
                  </p>
                </div>
              </li>
            </ul>
          </div>
        )}
      <div className="text-center w-full py-2">
        {singleApplication?.status === "rejected_by_madad" && (
          <p className="text-error-default font-semibold text-center">
            This application was rejected by Madad team.
          </p>
        )}

        {singleApplication?.status === "rejected" && (
          <p className="text-error-default font-semibold">
            This application was rejected.
          </p>
        )}
      </div>
      {/* Application infos  */}
      <div className="w-full mb-4">
        <h2 className="font-semibold mb-2">Application infos</h2>
        <div className="overflow-x-auto overflow-y-hidden w-full border rounded-md custom-scrollbar">
          <div className="font-semibold h-[4rem] text-text-muted uppercase text-xs  p-2 min-w-[1250px] flex items-center justify-between w-full  bg-[#F0F4F8] border-b  ">
            <div className="w-[12.5%] text-center ">MSME ID</div>
            <div className="w-[12.5%] text-center ">Assigned Lender</div>
            <div className="w-[12.5%] text-center ">Assigned Limit</div>
            <div className="w-[12.5%] text-center ">Interest Rate</div>
            <div className="w-[12.5%] text-center ">Tenure</div>
            <div className="w-[12.5%] text-center ">Credit Score</div>
            <div className="w-[12.5%] text-center ">Buyer</div>
            <div className="w-[12.5%] text-center ">Status</div>
          </div>

          <div className="text-black flex h-[calc(100%-4rem)] items-center justify-between w-full flex-col overflow-y-auto custom-scrollbar min-w-[1250px]">
            <div className="flex w-full py-2 font-semibold items-center justify-around p-2">
              <div className="w-[12.5%] text-center ">
                {singleApplication?.msme?.name}
              </div>
              <div className="w-[12.5%] text-center ">
                {singleApplication?.assignedLender?.name}
              </div>
              <div className="w-[12.5%] text-center ">
                {singleApplication?.assignedLimit}
              </div>
              <div className="w-[12.5%] text-center ">
                {singleApplication?.interestRate}
              </div>
              <div className="w-[12.5%] text-center ">
                {singleApplication?.tenure}
              </div>
              <div className="w-[12.5%] text-center ">
                {singleApplication?.creditScore}
              </div>
              <div className="w-[12.5%] text-center ">
                {singleApplication?.buyer?.name}
              </div>
              <div className="w-[12.5%] text-center ">
                <Statusbadge status={singleApplication?.status} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mb-4">
        <h2 className="font-semibold mb-2">Date Stamps</h2>
        <div className="overflow-x-auto overflow-y-hidden w-full border rounded-md custom-scrollbar">
          <div className="font-semibold h-[4rem] text-text-muted uppercase text-xs min-w-[1250px] flex items-center justify-between w-full p-2 bg-[#F0F4F8] border-b ">
            <div className="w-[16.66%] text-center">Creation Date</div>{" "}
            <div className="w-[16.66%] text-center">Updated At</div>{" "}
            <div className="w-[16.66%] text-center">Repayment Date</div>{" "}
            <div className="w-[16.66%] text-center">
              Lender Approval Date
            </div>{" "}
            <div className="w-[16.66%] text-center">
              Buyer Approval Date
            </div>{" "}
            <div className="w-[16.66%] text-center">Disbursed Date</div>{" "}
          </div>

          <div className="text-black flex h-[calc(100%-4rem)] items-center justify-between w-full flex-col overflow-y-auto custom-scrollbar min-w-[1250px]">
            <div className="flex w-full p-2 font-semibold justify-around">
              <div className="w-[16.66%] text-center">
                {formatDate(singleApplication?.createdAt)}
              </div>{" "}
              <div className="w-[16.66%] text-center">
                {formatDate(singleApplication?.updatedAt)}
              </div>{" "}
              <div className="w-[16.66%] text-center">
                {formatDate(singleApplication?.repaymentDate)}
              </div>{" "}
              <div className="w-[16.66%] text-center">
                {formatDate(singleApplication?.lenderApprovalDate)}
              </div>{" "}
              <div className="w-[16.66%] text-center">
                {formatDate(singleApplication?.buyerApprovalDate)}
              </div>{" "}
              <div className="w-[16.66%] text-center">
                {formatDate(singleApplication?.disbursedDate)}
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex gap-2 flex-col">
        <div className="w-full">
          <div className="w-full mb-2 ">
            <h2 className="font-semibold mb-2">Financial Information</h2>
            <div className="overflow-x-auto overflow-y-hidden w-full border rounded-md custom-scrollbar">
              <div className="font-semibold h-[4rem] text-text-muted uppercase text-xs  flex items-center justify-between w-full p-2 bg-[#F0F4F8] border-b ">
                <div className="w-[50%] text-center">Invoice Amount</div>{" "}
                <div className="w-[50%] text-center">Funded Amount</div>{" "}
              </div>

              <div className="text-black flex h-[calc(100%-4rem)] items-center justify-between w-full flex-col overflow-y-auto custom-scrollbar ">
                <div className="flex w-full p-2 font-semibold">
                  <div className="w-[50%] text-center">
                    {" "}
                    {singleApplication?.invoiceAmount}{" "}
                  </div>{" "}
                  <div className="w-[50%] text-center">
                    {singleApplication?.fundedAmount}
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>

          {singleApplication?.uploadedInvoice !== "N/A" && (
            <div className="w-full ">
              <h2 className="font-semibold mb-2">Uploaded invoice</h2>
              <div className="overflow-x-auto overflow-y-hidden w-full border rounded-md custom-scrollbar">
                <div className="font-semibold h-[4rem] text-text-muted uppercase text-xs flex items-center justify-between w-full p-2 bg-[#F0F4F8] border-b">
                  <div className="w-[50%] text-center">Document name</div>
                  <div className="w-[50%] text-center">Actions</div>
                </div>

                <div className="text-black flex flex-col w-full p-2">
                  {singleApplication?.uploadedInvoice && (
                    <div className="flex items-center justify-between w-full  py-2">
                      <div className="w-[50%] text-center truncate text-xs font-medium">
                      Invoice
                      </div>

                      <div className="w-[50%] flex justify-center">
                        <a
                          href={singleApplication.uploadedInvoice}
                          download
                          className="cursor-pointer hover:bg-primary-dark hover:text-white transition border border-primary-dark rounded w-fit flex p-1 text-primary-dark text-xs items-center justify-around font-semibold"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-5 mr-1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15Zm-6.75-10.5a.75.75 0 0 0-1.5 0v4.19l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V10.5Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Download</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full">
          <h2 className="font-semibold mb-2">Documents</h2>
          <div className="overflow-x-auto overflow-y-hidden w-full border rounded-md">
            <div className="font-semibold h-[4rem] text-text-muted uppercase text-xs flex items-center justify-between w-full p-2 bg-[#F0F4F8] border-b ">
              <div className="w-[50%] text-center">Document Name</div>
              <div className="w-[50%] text-center">Actions</div>
            </div>

            <div className="text-black flex flex-col w-full p-2">
              {Object.entries(documents)
               .filter(([_, value]) => value !== "N/A") 
              .map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between items-center py-2 border-b last:border-b-0"
                >
                  <div className="w-[50%] text-center font-semibold text-xs truncate">
                  {documentMapping[key]}

                  </div>

                  <div className="w-[50%] text-center flex justify-center p-2">
                    <button
                      onClick={() => handleDownload(value)}
                      className="cursor-pointer hover:bg-primary-dark hover:text-white transition border border-primary-dark rounded w-fit flex p-1 text-primary-dark text-xs items-center justify-around font-semibold"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15Zm-6.75-10.5a.75.75 0 0 0-1.5 0v4.19l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V10.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singleapplicationpage;


