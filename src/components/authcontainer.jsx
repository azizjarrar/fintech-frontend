import React from "react";

const Authcontainer = ({ children, css = "" }) => {
  return (
    <div
      className={`w-full bg-white ${css} flex flex-col items-center h-full justify-center z-10  p-4 sm:h-auto  sm:max-w-lg sm:my-4 lg:my-0  sm:border sm:rounded-xl`}
    >
      {children}
    </div>
  );
};

export default Authcontainer;
