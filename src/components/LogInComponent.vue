<template>

  <h1>Вход</h1>
  <form @submit.prevent="logIn">
    <div class="form-login">
      <label for="login">Логин </label>
      <input type="text" id="login" name="login" v-model="logData.login" @change="validateLogin">
      <span class="error" id="filter_login_error"/>
    </div>
    <div>
      <label for="password">Пароль </label>
      <input type="password" id="password" name="password" v-model="logData.password" @change="validatePassword">
      <span class="error" id="filter_password_error"/>
    </div>
    <input class="but" type="submit" value="Войти">
  </form>
  <span id="res_login"></span>


</template>

<script>
import {api} from "@/axios";
import {errorHandler} from "@/js/utils.js";
import {validateNotEmpty} from "@/js/validation.js";

export default {
  name: "LogInComponent",
  data(){
    return {
      logData: {
        login: '',
        password: ''
      }
    }
  },
  methods: {
    validateLogin(){
      return validateNotEmpty(this.logData.login, "Login", "login");
    },
    validatePassword(){
      return validateNotEmpty(this.logData.password, "Password", "password");
    },
    logIn: function (){
      if(this.validateLogin() && this.validatePassword()) {
        api.post("/user/logIn", this.logData)
            .then(response => {
              if (response.status === 200) {
                localStorage.setItem("userLogin", this.logData.login);
                localStorage.setItem("userToken", response.data);

                this.$router.push({name: 'menu-page'})
              }
            })
            .catch(error => {
              errorHandler(error.response.status, "res_login");
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