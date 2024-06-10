import Swal from "sweetalert2";

function success(message: string){
    return Swal.fire({
        icon: "success",
        title: "success",
        text: message,
        showConfirmButton: true
    });
}

function error(message: string | unknown = "something went wrong"){
    let msg = "something went wrong";
    
    if (typeof message == "string"){
        msg = message;
    }
    
    if (
        message != null &&
        typeof message == "object" &&
        "message" in message &&
        typeof message.message == "string"
    ){
        msg = message.message; 
    }

    return Swal.fire({
        icon: "error",
        title: "error",
        text: msg,
        showConfirmButton: true
    });
}

async function areUSure(question: string){
    const result = await Swal.fire({
        icon: "question",
        text: question,
        showConfirmButton: true,
        showCancelButton: true
    });
    if (result.isConfirmed) {
        return true;
    }
    if (result.isDismissed) {
        return false;
    }
}

export const Dialogs = {success, error, areUSure};