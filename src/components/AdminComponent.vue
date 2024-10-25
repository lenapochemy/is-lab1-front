<script >
import {api} from "@/axios.js";
import {errorHandler} from "@/js/utils.js";

export default {
  name: "AdminComponent",
  data(){
    return {
      role: ''
    }
  },
  mounted() {
    this.getRole();
  },
  methods: {
    getRole(){
      api.get("/user/admin/role", {headers: {
        "Authorization" : this.$store.state.token
        }})
          .then(response => {
            // document.getElementById("admin").i
            // nnerHTML = response.data;
            this.role = this.getRoleText(response.data)
          })
          .catch(error => {
            errorHandler(error.response.status, "res");
          })
    },
    becomeAdmin(){
      api.post("/user/admin/become")
          .then(response => {
            document.getElementById("admin").innerHTML = response.data;
          })
          .catch(error => {
            errorHandler(error.response.status, "res");
          })
    },
    getRoleText(role){
      switch (role){
        case "APPROVED_ADMIN":
          return "admin, you can delete and delete all objects.";
        case "WAITING_ADMIN":
          return "just user, you can delete and update just your objects. Your request for becoming admin on considerate," +
              " please wait for approve from another admin "
        default:
          return "just user, you can delete and update just your objects.";
      }
    }
  }
}
</script>

<template>
  <span id="admin"></span>
  <span>You are {{role}}</span>

  <input class="but"  type="submit" @click.prevent="becomeAdmin" value="become admin"/>

</template>

<style scoped>

</style>