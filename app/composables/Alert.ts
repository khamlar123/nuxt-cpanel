import Swal from "sweetalert2";
const warning = (message: string) => {
    Swal.fire({
        title: message,
        icon: "warning",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
        confirmButtonText: "Close",
    });
};

const error = async (message: string) => {
    Swal.fire({
        title: message,
        icon: "error",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
        confirmButtonText: "Close",
    });
};

const success = async (message: string) => {
    Swal.fire({
        title: message,
        icon: "success",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
        confirmButtonText: "Close",
    });
};

export default {
    warning,
    error,
    success,
};
