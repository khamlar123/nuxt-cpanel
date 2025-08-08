import Swal from "sweetalert2";
const warning = (message: string) => {
    Swal.fire({
        title: message,
        icon: "warning",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
        confirmButtonText: "Close",
        customClass: {
            popup: 'my-dark-swal',
            confirmButton: 'my-dark-confirm'
        }
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
        customClass: {
            popup: 'my-dark-swal',
            confirmButton: 'my-dark-confirm'
        }
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
        customClass: {
            popup: 'my-dark-swal',
            confirmButton: 'my-dark-confirm'
        }
    });
};

export default {
    warning,
    error,
    success,
};
