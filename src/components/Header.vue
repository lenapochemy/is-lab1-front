<script >
import {api} from "@/axios.js";
import {errorHandler} from "@/js/utils.js";

export default {
  name: "Header",
  data() {
    return {
      name: String,
      role: String
    }
  },
  mounted() {
    this.name = localStorage.getItem("userLogin");
    this.getRole();
  },
  methods:{
    getRole(){
      api.get("/user/admin/role")
          .then(response => {
            let role = response.data;
            this.role = this.getRoleText(role);
          })
          .catch(error => {
            errorHandler(error.response.status, "admin");
          })
    },
    getRoleText(role){
      switch (role){
        case "APPROVED_ADMIN":
          return "admin";
        default:
          return "user";
      }
    },
  }
}
</script>

<template>
  <div>
    <span class="my_name">Your login: </span>
    <span class="data">{{name}}</span>
    <span class="my_name"> and your role: </span>
    <span class="data">{{role}}</span>
  </div>


</template>


<style scoped>

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;

}

h3 {
  font-size: 1.2rem;
}


.my_name, .data, #lab_work {
  //font-family: fantasy;
  //color: deeppink;
  font-size: large;
  font-weight: bold;
  //text-shadow: 2px 2px 2px black;
  //font-size: 3rem;
  //word-spacing: 4pt;
  //letter-spacing: 2pt;
}

.data{
  color: blue;
}

#lab_work{
  font-size: 2rem;
  letter-spacing: 1pt;
}


</style>
