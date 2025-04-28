import { Link } from "react-router-dom"; 
import Statusbadge from "./statusbadge";
const SingleApplicationRow = ({ application }) => {

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A";


  const fields = [
    application?.msme?.name,
    application?.assignedLender?.name,
    <Statusbadge status={application?.status} />, 
    formatDate(application?.createdAt),
    formatDate(application?.createdAt),
    application?.invoiceAmount,
    application?.fundedAmount,
    application?.buyer?.name,
  ];


  return (
    <>
      <div className="flex w-full py-2 border-b last:border-b-0 items-center justify-around">
        {fields.map((value, index) => (
          <div
            key={index}
            className="w-[11.11%] overflow-hidden truncate whitespace-nowrap p-2 text-center"
          >
            {value}
          </div>
        ))}

        <div className="w-[11.11%] overflow-hidden truncate whitespace-nowrap p-2 text-center">
          <Link
            to={`/dashboard/listofapplications/${application?._id}`} 
            className="text-primary-dark hover:underline"
          >
            View
          </Link>
        </div>
      </div>

    </>
  );
};

export default SingleApplicationRow;






