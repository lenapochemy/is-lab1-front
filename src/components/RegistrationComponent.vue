<template>

  <h1>Registration</h1>
  <form @submit.prevent="registration">
    <div>
      <label for="login">LogIn </label>
      <input type="text" id="login" name="login" v-model="regData.login" @change="validateLogin" >
      <span class="error" id="login_error"/>
    </div>
    <div>
      <label for="password">Password </label>
      <input type="password" id="password" name="password" v-model="regData.password" @change="validatePassword">
      <span class="error" id="password_error"/>
    </div>
    <input class="but" type="submit" value="Registration">
  </form>
  <p id="res_reg"></p>
  <div>
    <img alt="cat picture" src="/cat2.jpg"/>
  </div>
</template>

<script>
import {api} from '@/axios'
import {errorHandler} from "@/js/utils.js";
import {validateString} from "@/js/validation.js";

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
      return validateString(this.regData.login, "Login", "login");

    },
    validatePassword(){
      return validateString(this.regData.password, "Password", "password");

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


