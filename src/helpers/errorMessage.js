import Swal from "sweetalert2";

const errorMessage = (text) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: text,
  });
};

export default errorMessage;
