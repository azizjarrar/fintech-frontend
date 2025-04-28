import Spinner from "./spinner";

const SubmitButton = ({
  name,
  isFormInvalid,
  loading,
  type = "submit",
  onClick,
  css = "",
  disabled,
}) => {

  return (
    <button
      disabled={
        loading ||
        (typeof isFormInvalid === "function" && isFormInvalid()) ||
        disabled
      }
      type={type}
      onClick={onClick}
      className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm min-h-10 items-center ${css} ${
        loading ||
        (typeof isFormInvalid === "function" && isFormInvalid()) ||
        disabled
          ? "!bg-background-default  !cursor-not-allowed"
          : "bg-primaryBlack text-primaryWhite hover:opacity-90 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiaryBlack"
      }`}
    >
      {loading ? (
        <Spinner width="14" height="14" />
      ) : (
        name
      )}
    </button>
  );
};

export default SubmitButton;
