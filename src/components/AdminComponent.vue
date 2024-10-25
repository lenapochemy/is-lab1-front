<script >
import {api} from "@/axios.js";
import {errorHandler} from "@/js/utils.js";

export default {
  name: "AdminComponent",
  data(){
    return {
      role: '',
      roleText: '',
      waitingAdmins: [],
      user: null,
    }
  },
  mounted() {
    this.getRole();
    this.getWaitingAdmins();
  },
  methods: {
    getRole(){
      api.get("/user/admin/role")
          .then(response => {
            // document.getElementById("admin").i
            // nnerHTML = response.data;
            this.role = response.data;
            this.roleText = this.getRoleText(response.data)
          })
          .catch(error => {
            errorHandler(error.response.status, "res");
          })
    },
    getWaitingAdmins(){
      api.get("/user/admin")
          .then(response => {
            this.waitingAdmins = response.data;
          })
          .catch(error => {
            errorHandler(error.response.status, "res");
          })
    },
    becomeAdmin(){
      api.post("/user/admin/become")
          .then(response => {
            document.getElementById("admin").innerHTML = response.data;
            this.getRole();
          })
          .catch(error => {
            errorHandler(error.response.status, "res");
          })
    },
    getRoleText(role){
      switch (role){
        case "APPROVED_ADMIN":
          this.$store.commit('setAdmin', true);
          console.log(this.$store.state.admin);
          return "admin, you can delete and delete all objects.";
        case "WAITING_ADMIN":
          return "just user, you can delete and update just your objects. Your request for becoming admin on considerate," +
              " please wait for approve from another admin "
        default:
          this.$store.commit('setAdmin', false);
          return "just user, you can delete and update just your objects.";
      }
    },
    approveAdmin(id){
      api.post("/user/admin/approve/" + id)
          .then(response => {
            this.getWaitingAdmins();
          })
          .catch(error => {
            errorHandler(error.response.status, "res");
          })
    }
  }
}
</script>

<template>
  <span id="admin"></span>
  <span>You are {{roleText}}</span>

  <input class="but" type="submit" v-if="role == 'USER'" @click.prevent="becomeAdmin" value="become admin"/>

  <table v-if="role == 'APPROVED_ADMIN'">
    <tr v-for="admin in waitingAdmins">
      <td>{{admin.login}}</td>
      <td>
        <input class="but"  type="submit" @click.prevent="approveAdmin(admin.id)" value="approve"/>
      </td>
    </tr>

  </table>

</template>

<style scoped>

</style>