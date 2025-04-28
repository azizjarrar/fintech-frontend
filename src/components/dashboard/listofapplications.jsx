import { useEffect, useState } from "react";
import axios_instance from "../../api/axios_instance";
import Singleapplicationrow from "./singleapplicationrow";

const Listofapplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getApplications = async () => {
      try {
        const response = await axios_instance.get("/application");
        setApplications(response.data);
      } catch (error) {
        setErrorMessage("Failed to fetch applications. Please try again.");
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    getApplications();
  }, []);

  const headers = [
    "MSME",
    "Assigned Lender",
    "Status",
    "Created At",
    "Repayment Date",
    "Invoice Amount",
    "Funded Amount",
    "Buyer",
    "View",
  ];

  return (
    <div className="w-full h-full p-4">
      <div className="overflow-x-auto border rounded-md w-full">
        {/* Table Head */}
        <div className="font-semibold h-[3rem] min-w-[1350px] text-xs uppercase text-text-muted flex items-center justify-around bg-[#F0F4F8] border-b">
          {headers.map((header, index) => (
            <div key={index} className="flex-1 whitespace-nowrap p-2 text-center">
              {header}
            </div>
          ))}
        </div>

        {/* Table Body */}
        <div className="font-semibold text-xs min-w-[1350px] flex flex-col">
          {loading ? (
            // Skeleton loading
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-around w-full py-3 animate-pulse border-b"
              >
                {headers.map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 flex justify-center"
                  >
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ))
          ) : applications.length > 0 ? (
            applications.map((application, i) => (
              <Singleapplicationrow key={i} application={application} />
            ))
          ) : (
            <div className="text-center py-8 w-full">
              No applications right now
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listofapplications;
