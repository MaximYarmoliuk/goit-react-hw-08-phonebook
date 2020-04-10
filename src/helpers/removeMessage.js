import Swal from "sweetalert2";

const removeMessage = (name, func) => {
  Swal.fire({
    title: `You want to remove the contact ${name}. Are you sure?`,
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.value) {
      func();
      Swal.fire("Deleted!", `Contact has been deleted.`, "success");
    }
  });
};

export default removeMessage;
