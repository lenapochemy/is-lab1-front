<template>

  <h1>Вход</h1>
  <form @submit.prevent="logIn">
    <div class="form-login">
      <label for="login">Логин </label>
      <input type="text" id="login" name="login" v-model="logData.login" @change="validateLogin">
      <span id="login_error"/>
<!--      <div class="input-errors" v-for="error of v$.login.$errors" :key="error.$uid">-->
<!--        <div class="error-msg">{{error.$message}}</div>-->
<!--      </div>-->
    </div>
<!--    <span class="error" v-if="$v.login.$invalid">Login can't be empty</span>-->
    <div>
      <label for="password">Пароль </label>
      <input type="password" id="password" name="password" v-model="logData.password" @change="validatePassword">
      <span id="password_error"/>
<!--      <span v-if="$v.password.$error()">Password can't be empty</span>-->
    </div>
    <input class="but" type="submit" value="Войти">
  </form>
  <span id="res"></span>


</template>

<script>
import {api} from "@/axios";
import {utils} from "@/js/utils.js";
// import useValidate from "@vuelidate/core"
// import {required} from "@vuelidate/validators"
// import router from "@/router.js";

export default {
  name: "LogInComponent",
  // setup (){
  //   return {v$: useValidate()}
  // },
  data(){
    return {
      // v$ :useValidate(),
      logData: {
        login: '',
        password: ''
      }
      // login: '',
      // password: ''
    }
  },
  // validations() {
  //   return {
  //     logData: {
  //       login: {required},
  //       password: {required}
  //     }
  //   }
  // },
  methods: {
    createErrorMessage(mess, param){
      document.getElementById(param + "_error").innerHTML = mess;
    },
    cleanErrorMessage(param){
      document.getElementById(param + "_error").innerHTML = null;
    },
    validateLogin(){
      if(this.logData.login == ""){
        this.createErrorMessage("Login can't be empty", "login");
        return false;
      } else {
        this.cleanErrorMessage("login");
        return true;
      }
    },
    validatePassword(){
      if(this.logData.password == ""){
        this.createErrorMessage("Password can't be empty", "password");
        return false;
      } else {
        this.cleanErrorMessage("password");
        return true;
      }
    },
    // setLogin(value) {
    //   this.login = value;
    //   this.$v.login.$touch()
    // },
    // setPassword(value) {
    //   this.password = value;
    //   this.$v.password.$touch()
    // },
    logIn: function (){
      // this.v$.$validate()
      if(this.validateLogin() && this.validatePassword()) {
        api.post("/user/logIn", this.logData, {
          headers: {
            "Content-Type": "application/json"
          }
        })
            .then(response => {
              if (response.status === 200) {
                // localStorage.setItem("userToken", response.data.token);

                this.$router.push({name: 'main-page'})
                // document.getElementById("res").innerHTML = "vse good";
              }
            })
            .catch(error => {
              utils(error.response.status, "res");
              // document.getElementById("res").innerHTML = "vse bad";
            });
      // } else {
      //   document.getElementById("res").innerHTML = "validation failed";
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