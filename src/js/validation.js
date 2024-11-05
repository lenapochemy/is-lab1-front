import {cleanErrorMessage, createErrorMessage} from "@/js/utils.js";

export function validateCoordX(x, error){
    if(!validateNumber(x, "Coordinate X", error)){
        return false;
    } else {
        if (x <= -147) {
            createErrorMessage("Coordinate X should be a number, more than -147", error);
            return false;
        } else {
            cleanErrorMessage(error);
            return true;
        }
    }
}
export function validateNumber(num, name, error){
    if(num === ""){
        createErrorMessage(name + " can't be empty", error);
        return false;
    } else {
        // y.replace(",", ".");
        if (!(!isNaN(parseFloat(num)) && isFinite(num))) {
            createErrorMessage(name +" should be a number", error);
            return false;
        } else {
            cleanErrorMessage(error);
            return true;
        }
    }
}

export function validateHealth(health, error){
    if(!validateNumber(health, "Health", error)) {
        return false;
    }
    else {
        if (health <= 0) {
            createErrorMessage("Health should be a number, more than 0", error);
            return false;
        } else {
            cleanErrorMessage(error);
            return true;
        }

    }
}
export function validateFilterType(name, object){
    if(name === '' || name == null){
        createErrorMessage("Filter type can't be empty", "filter_" + object + "_error");
        return false;
    } else {
        cleanErrorMessage("filter_" + object + "_error");
        return true;
    }
}

export function validateString(str, name, error){
    if(str == null || str === ""){
        createErrorMessage(name + " can't be empty", error);
        return false;
    } else {
        cleanErrorMessage(error);
        return true;
    }
}