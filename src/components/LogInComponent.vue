<template>

  <h1>LogIn</h1>
  <form @submit.prevent="logIn">
    <div class="form-login">
      <label for="login">Login </label>
      <input type="text" id="login" name="login" v-model="logData.login" @change="validateLogin">
      <span class="error" id="login_error"/>
    </div>
    <div>
      <label for="password">Password </label>
      <input type="password" id="password" name="password" v-model="logData.password" @change="validatePassword">
      <span class="error" id="password_error"/>
    </div>
    <input class="but" type="submit" value="LogIn">
  </form>
  <span id="res_login"></span>

  <div>
    <img alt="cat picture" src="/cat.jpg"/>
  </div>
</template>

<script>
import {api} from "@/axios";
import {errorHandler} from "@/js/utils.js";
import {validateString} from "@/js/validation.js";

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
      return validateString(this.logData.login, "Login", "login_error");
    },
    validatePassword(){
      return validateString(this.logData.password, "Password", "password_error");
    },
    logIn: function (){
      if(this.validateLogin() && this.validatePassword()) {
        let urlEncoded = new URLSearchParams();
        urlEncoded.append("login", this.logData.login);
        urlEncoded.append("password",this.logData.password);
        api.post("/user/logIn", urlEncoded)
            .then(response => {
              if (response.status === 200) {
                localStorage.setItem("userLogin", this.logData.login);
                // localStorage.setItem("userToken", response.data);

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

img{
  width: 320px;
  height: 320px;
}
</style>