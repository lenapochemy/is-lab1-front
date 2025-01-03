export function errorHandler(status, mess, mode, print){
    switch (status){
        case 400:
            if(mode === "print"){
                document.getElementById(mess).innerHTML = print;
            } else {
                document.getElementById(mess).innerHTML = "Неверные данные";
            }
            break;
        case 401:
            if(mode === "reg") {
                document.getElementById(mess).innerHTML = "Этот "+ print + " уже занят, пожалуйста выберите другой";
            } else {
                document.getElementById(mess).innerHTML = "Неверный логин или пароль, попробуйте еще раз";
            }
            break;
        case 403:
            document.getElementById(mess).innerHTML = "Вы не авторизованы";
            // localStorage.removeItem("userToken");
            // this.$router.push({name: 'start-page'});
            break;
        default:
            document.getElementById(mess).innerHTML = "Проблемы с сервером :(";
    }
}

export function createErrorMessage(mess, param){
    document.getElementById(param).innerHTML = mess;
}
export function cleanErrorMessage(param){
    document.getElementById(param).innerHTML = null;
}
