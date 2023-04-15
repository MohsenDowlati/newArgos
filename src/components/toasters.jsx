// Import
import { ToastContainer, toast } from 'react-toastify';

// Fucntion for success toaster
export const successToaster = (message, position="bottom-right") => {
    // Toast exeuction
    toast.success(message, {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
    });
}

// Fucntion for info toaster
export const infoToaster = (message, position="bottom-right") => {
    // Toast exeuction
    toast.info(message, {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
    });
}

// Fucntion for error toaster
export const errorToaster = (message, position="bottom-right") => {
    // Toast exeuction
    toast.error(message, {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
    });
}