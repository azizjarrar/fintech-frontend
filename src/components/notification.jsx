import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "../redux/features/notificationSlice";
export default function Notification() {
  const dispatch = useDispatch();
  const { message, isVisible ,bg} = useSelector((state) => state.notification);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        dispatch(setNotification({ isVisible: false })); 
      }, 6000); 
      return () => clearTimeout(timer);
    }
  }, [isVisible, dispatch]);

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 text-white ${bg} rounded shadow-md text-sm  w-11/12 md:text-md md:w-fit transition-opacity z-50 duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
    {message}
    </div>
  );
}
