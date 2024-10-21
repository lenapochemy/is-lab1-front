import {cleanErrorMessage, createErrorMessage} from "@/js/utils.js";

export function validateCoordX(x){
    if(x == ""){
        createErrorMessage("Coordinate X can't be empty", "coord_x_error");
        return false;
    } else {
        // x.replace(",", ".");
        // let x = this.coordinates.x;
        // console.log(x);
        if (!(!isNaN(parseFloat(x)) && isFinite(x))) {
            createErrorMessage("Coordinate X should be a number", "coord_x_error");
            return false;
        } else {
            if (x <= -147) {
                createErrorMessage("Coordinate X should be a number, more than -147", "coord_x_error");
                return false;
            } else {
                cleanErrorMessage("coord_x_error");
                return true;
            }
        }
    }
}
export function validateCoordY(y){
    console.log(y)
    if(y == ""){
        createErrorMessage("Coordinate Y can't be empty", "coord_y_error");
        return false;
    } else {
        // y.replace(",", ".");
        // let y = this.coordinates.y;
        if (!(!isNaN(parseFloat(y)) && isFinite(y))) {
            createErrorMessage("Coordinate Y should be a number", "coord_y_error");
            return false;
        } else {
            cleanErrorMessage("coord_y_error");
            return true;
        }
    }
}