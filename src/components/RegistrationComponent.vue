<template>

  <h1>Регистрация</h1>
  <form @submit.prevent="registration">
    <div>
      <label for="login">Логин </label>
      <input type="text" id="login" name="login" v-model="regData.login" @change="validateLogin" >
      <span class="error" id="filter_login_error"/>
    </div>
    <div>
      <label for="password">Пароль </label>
      <input type="password" id="password" name="password" v-model="regData.password" @change="validatePassword">
      <span class="error" id="filter_password_error"/>
    </div>
    <input class="but" type="submit" value="Зарегистрироваться">
  </form>
  <p id="res_reg"></p>

</template>

<script>
import {api} from '@/axios'
import {errorHandler} from "@/js/utils.js";
import {validateNotEmpty} from "@/js/validation.js";

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
    validateLogin(){
      return validateNotEmpty(this.regData.login, "Login", "login");

    },
    validatePassword(){
      return validateNotEmpty(this.regData.password, "Password", "password");

    },
    registration: function (){
      if(this.validateLogin() && this.validatePassword()) {
        api.post("/user/reg", this.regData)
            .then(response => {
              if (response.status === 200) {
                document.getElementById("res_reg").innerHTML = "Вы зарегистрированы, теперь можете входить";
              }
            })
            .catch(error => {
              errorHandler(error.response.status, "res_reg", "reg", error.response.data);
            });
      }
    }
  }
}

</script>

<style scoped>

</style>


