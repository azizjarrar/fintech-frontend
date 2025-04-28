import React from "react";

const Errormessage = ({ message, css }) => {

  return (
    <>
      {message ? (
        <p
          className={` mb-4 rounded font-semibold text-center text-sm text-error-default ${css}`}
        >
          {message}
        </p>
      ) : null}
    </>
  );
};

export default Errormessage;
