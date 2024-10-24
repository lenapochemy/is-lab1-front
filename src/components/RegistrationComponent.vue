<template>

  <h1>Регистрация</h1>
  <form @submit.prevent="registration">
    <div>
      <label for="login">Логин </label>
      <input type="text" id="login" name="login" v-model="regData.login" @change="validateLogin" >
      <span id="login_error"/>
    </div>
    <div>
      <label for="password">Пароль </label>
      <input type="password" id="password" name="password" v-model="regData.password" @change="validatePassword">
      <span id="password_error"/>
    </div>
    <input class="but" type="submit" value="Зарегистрироваться">
  </form>
  <span id="res"></span>

</template>

<script>
import {api} from '@/axios'
import {errorHandler} from "@/js/utils.js";

export default {
  name: "RegistrationComponent",
  data(){
    return {
      regData: {
        login: '',
        password: ''
      }
    }
  },
  methods: {
    createErrorMessage(mess, param){
      document.getElementById(param + "_error").innerHTML = mess;
    },
    cleanErrorMessage(param){
      document.getElementById(param + "_error").innerHTML = null;
    },
    validateLogin(){
      if(this.regData.login == ""){
        this.createErrorMessage("Login can't be empty", "login");
        return false;
      } else {
        this.cleanErrorMessage("login");
        return true;
      }
    },
    validatePassword(){
      if(this.regData.password == ""){
        this.createErrorMessage("Password can't be empty", "password");
        return false;
      } else {
        this.cleanErrorMessage("password");
        return true;
      }
    },
    registration: function (){
      if(this.validateLogin() && this.validatePassword()) {
        api.post("/user/reg", this.regData)
            .then(response => {
              if (response.status === 200) {
                document.getElementById("res").innerHTML = "Вы зарегистрированы, теперь можете входить";
              }
            })
            .catch(error => {
              errorHandler(error.response.status, "res", "reg")
              // document.getElementById("res").innerHTML = "что-то не так";
            });
      }
    }
  }
}

</script>

<style scoped>
.but{
  background-color: deeppink;
  font-weight: bold;
  padding: 4px 9px 4px;
  font-size: large;
  margin-top: 30px;
  margin-bottom: 30px;
}
.but:hover, .but:focus{
  background-color: lightpink;
}
label{
  font-size: large;
}
</style>


