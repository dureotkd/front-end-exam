import { toast } from "react-toastify";

const util_helper = {
  toast: function ({ type, message }) {
    switch (type) {
      case "error":
        toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        break;

      default:
        break;
    }
  },
};

export default util_helper;
