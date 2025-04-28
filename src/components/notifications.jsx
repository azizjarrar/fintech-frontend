import { useEffect, useState, useRef } from "react";
import axios_instance from "../api/axios_instance";
import Spinner from "./spinner";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Notifications = ({ css }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(null);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const getNotifications = async () => {
    try {
      const response = await axios_instance.get(`/notification`);
      setNotifications(response?.data);
      setCounter(0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      getNotifications();
    }
  }, [isOpen]);

  useEffect(() => {
    const getNotificationsUnread = async () => {
      try {
        const response = await axios_instance.get(
          `/notification/getNotificationsUnread`
        );
        console.log(response);
        setCounter(response.data.numOfUnRead);
      } catch (error) {
        console.log(error);
      }
    };
    getNotificationsUnread();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className={`relative flex items-center justify-around   ml-auto mr-16 md:mr-40  ${css}`}
    >
      <div
        className=" flex items-center cursor-pointer transition justify-around rounded-full relative"
        onClick={toggleDropdown}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
          />
        </svg>

        {counter > 0 && (
          <div className="absolute w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-around  text-xs top-0 right-0 ">
            {counter}
          </div>
        )}
      </div>
      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-8 left-1/2 z-40 transform  -translate-x-[76%] md:-translate-x-1/2 mt-2 h-64 w-[20rem] !max-w-screen sm:w-72 custom-scrollbar overflow-y-auto bg-white border border-gray-200 rounded-lg flex flex-col items-center justify-start">
          {loading ? (
            <div className="m-auto">
              <Spinner />
            </div>
          ) : notifications?.length > 0 ? (
            <div className="w-full px-1  ">
              <h3 className="text-left font-semibold mb-2 p-1">
                Notifications
              </h3>
              {notifications.map((n, i) => {
                const formattedDate = new Date(n.createdAt).toLocaleString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  }
                );

                return (
                  <Notif
                    key={i}
                    href={n.link}
                    title={n.title}
                    date={formattedDate}
                  />
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center flex-col w-full h-full">
              <div className="w-8 h-8 rounded-full   flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8 mb-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.143 17.082a24.248 24.248 0 0 0 3.844.148m-3.844-.148a23.856 23.856 0 0 1-5.455-1.31 8.964 8.964 0 0 0 2.3-5.542m3.155 6.852a3 3 0 0 0 5.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 0 0 3.536-1.003A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53"
                  />
                </svg>
              </div>
              <p className="text-center font-semibold text-sm text-textSecondaryColor">
                Quiet for now
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;

const Notif = ({ href, title, date }) => {
  return (
    <Link
      to={`/dashboard/listofapplications/${href}`}
      className="border-b last:border-b-0  p-2 flex items-center space-x-3 hover:bg-bgHoverLight cursor-pointer transition"
    >
      {/* Icon */}
      <div className="p-2 bg-gray-100 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
          />
        </svg>
      </div>

      {/* Notification Content */}
      <div className="flex flex-col">
        <h3 className="font-semibold text-gray-800 text-xs">{title}</h3>
        <p className="text-sm text-gray-500 text-xs">{date}</p>
      </div>
    </Link>
  );
};