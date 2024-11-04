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
            this.role = response.data;
            this.roleText = this.getRoleText(response.data)
          })
          .catch(error => {
            errorHandler(error.response.status, "admin");
          })
    },
    getWaitingAdmins(){
      api.get("/user/admin")
          .then(response => {
            this.waitingAdmins = response.data;
          })
          .catch(error => {
            errorHandler(error.response.status, "admin");
          })
    },
    becomeAdmin(){
      api.post("/user/admin/become")
          .then(response => {
            document.getElementById("admin").innerHTML = response.data;
            this.getRole();
          })
          .catch(error => {
            errorHandler(error.response.status, "admin");
          })
    },
    getRoleText(role){
      switch (role){
        case "APPROVED_ADMIN":
          // this.$store.commit('setAdmin', true);
          return "admin, you can delete and update all objects. Also you can approve new admin.";
        case "WAITING_ADMIN":
          return "just user, you can delete and update just your objects.\nYour request for becoming admin on considerate," +
              " please wait for approve from another admin "
        default:
          // this.$store.commit('setAdmin', false);
          return "just user, you can delete and update just your objects.";
      }
    },
    approveAdmin(id){
      api.post("/user/admin/approve/" + id)
          .then(response => {
            document.getElementById("admin").innerHTML = "Admin approving was successful!"
            this.getWaitingAdmins();
          })
          .catch(error => {
            errorHandler(error.response.status, "admin");
          })
    }
  }
}
</script>

<template>

  <br>
  <p>You are {{roleText}}</p>

  <input class="but" type="submit" v-if="role == 'USER'" @click.prevent="becomeAdmin" value="become admin"/>

  <div v-if="role === 'APPROVED_ADMIN' && waitingAdmins.length > 0">
    <p class="label">Users, who want to be admin:</p>
  <table>
<!--    <tr>-->
<!--      <td>login</td>-->
<!--    </tr>-->
    <tr v-for="admin in waitingAdmins">
      <td>{{admin.login}}</td>
      <td>
        <input class="but"  type="submit" @click.prevent="approveAdmin(admin.id)" value="approve"/>
      </td>
    </tr>
  </table>
  </div>

  <p id="admin"></p>
</template>

<style scoped>

</style>