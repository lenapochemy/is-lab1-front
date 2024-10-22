import {cleanErrorMessage, createErrorMessage} from "@/js/utils.js";

export function validateCoordX(x){
    if(x == ""){
        createErrorMessage("Coordinate X can't be empty", "coord_x_error");
        return false;
    } else {
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

export function validateChapterName(name){
    if(name == ""){
        createErrorMessage("Chapter name can't be empty", "chapter_name_error");
        return false;
    } else {
        cleanErrorMessage("chapter_name_error");
        return true;
    }
}

export function validateName(name){
    if(name == ""){
        createErrorMessage("Name can't be empty", "name_error");
        return false;
    } else {
        cleanErrorMessage("name_error");
        return true;
    }
}

export function validateCoords(coordinates){
    if(coordinates.id == undefined || coordinates.id == ""){
        createErrorMessage("Coordinates can't be empty", "coord_error");
        return false;
    } else {
        cleanErrorMessage("coord_error");
        return true;
    }
}
export function validateChapter(chapter){
    // if(this.spaceMarine.chapter == undefined || )
    // console.log("in chapter validate" + this.spaceMarines.chapter)
    if(chapter.id == null || chapter.id == ""){
        createErrorMessage("Chapter can't be empty", "chapter_error");
        return false;
    } else {
        cleanErrorMessage("chapter_error");
        return true;
    }
}
export function validateHealth(health){
    if(health == ""){
        createErrorMessage("Health can't be empty", "health_error");
        return false;
    } else {
        // health.replace(",", ".");
        // let health = this.spaceMarine.health;
        if (!(!isNaN(parseFloat(health)) && isFinite(health))) {
            createErrorMessage("Health should be a number", "health_error");
            return false;
        } else if (health <= 0) {
            createErrorMessage("Health should be a number, more than 0", "health_error");
            return false;
        } else {
            cleanErrorMessage("health_error");
            return true;
        }
    }
}
export function validateCategory(category){
    if(category == ""){
        createErrorMessage("Category can't be empty", "category_error");
        return false;
    } else {
        cleanErrorMessage("category_error");
        return true;
    }
}