import { Routes, Route, Link, useLocation } from "react-router-dom";
import Listofapplications from "../components/dashboard/listofapplications";
import Madadlogo from "../components/madadlogo";
import Applycreditline from "../components/dashboard/uploadcreditline";
import Singleapplicationpage from "../components/dashboard/singleapplicationpage";
import Notifications from "../components/notifications";
import { useState } from "react";

const Dashboard = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user")) || null;
  if(localStorage.getItem("token")===undefined || localStorage.getItem("token")===null){
    window.location.href = "/signin"; 

  }
  const sidebarItems = [
    {
      label: "X",
      section: "listOfApplications",
      to: "/dashboard/listofapplications",
      svg: "",
    },
    {
      label: "X",
      section: "applyCreditLine",
      to: "/dashboard/applyCreditLine",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/signin"; // redirect to signin page
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Manage sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar open/close state
  };

  return (
    <div className="flex h-screen bg-background-light overflow-hidden">
      {/* Sidebar */}

      <div
        className={`fixed top-0 left-0 h-full transition-all duration-300 ${
          isSidebarOpen
            ? "w-[18%] xl:w-[14%] translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="text-text-default flex flex-col py-4 px-2 items-center justify-around h-full">
          <Madadlogo />

          <Link
            key="2"
            to="/dashboard/listofapplications"
            className={`w-full py-2 rounded-md font-semibold transition mb-2 text-center flex items-center mt-10 ${
              !isSidebarOpen ? "justify-between" : "justify-around"
            } p-2 text-sm whitespace-nowrap ${
              location.pathname === "/dashboard/listofapplications"
                ? "bg-primary-dark text-white"
                : "text-text-default hover:bg-primary-dark hover:text-white "
            }`}
          >
            <img
              width={25}
              height={25}
              src="/images/list.svg"
              alt="list icon"
            />{" "}
            <span className={`hidden lg:block`}> list of applications</span>
          </Link>

        {user?.role === "msme" &&   <Link
            key="2"
            to="/dashboard/applyCreditLine"
            className={`w-full py-2 rounded-md font-semibold transition mb-2 text-center flex items-center ${
              !isSidebarOpen ? "justify-between" : "justify-around"
            } p-2 text-sm whitespace-nowrap ${
              location.pathname === "/dashboard/applyCreditLine"
                ? "bg-primary-dark text-white"
                : "text-text-default hover:bg-primary-dark hover:text-white "
            }`}
          >
            <img
              width={25}
              height={25}
              src="/images/form.svg"
              alt="form icon"
            />{" "}
            <span className={`hidden lg:block`}> Apply for credit line</span>
          </Link>}

          {/* Logout button */}
          <div className="mt-auto w-full " onClick={handleLogout}>
            <button className="flex items-center justify-around text-error-dark mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-5 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>

              {/* <span className="font-semibold ">Log Out</span> */}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`h-full transition-all duration-300 ${
          isSidebarOpen
            ? "ml-[18%] xl:ml-[14%] w-[calc(100%-18%)] xl:w-[calc(100%-14%)]"
            : "w-full"
        }`}
      >
        {/* Navbar */}
        <div className="bg-background-dark flex h-[6%] items-center justify-between ">
          {/* Hamburger Icon for Mobile */}
          <button onClick={toggleSidebar} className="lg:hidden ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5h18M3 12h18M3 19h18"
              />
            </svg>
          </button>

          <div className="flex items-center  mr-auto ml-4">
            <div className="flex flex-col items-center justify-around">
              <h2 className="text-xs font-semibold">{user ? user.name : ""}</h2>
              <p className="text-text-muted text-xs">{user ? user.role : ""}</p>
            </div>
          </div>
       
          <Notifications />
         
        </div>

        {/* Content Area */}
        <div className="border rounded-tl-md bg-white h-[94%]">
          <Routes>
          <Route path="/" element={<Listofapplications />} />

            <Route path="listofapplications" element={<Listofapplications />} />
            <Route
              path="listofapplications/:id"
              element={<Singleapplicationpage />}
            />
            <Route path="applyCreditLine" element={<Applycreditline />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
