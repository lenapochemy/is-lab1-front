<script>
import {api} from "@/axios.js";

export default {
  data(){
    return{
      imports: []
    }
  },
  methods: {
    getAllImports(){
      api.get("/files")
          .then(response => {
            if(response.status === 200){
              this.imports = response.data;
            }
          })
          .catch(error => {
            document.getElementById("res_import").innerHTML = error;
          })
    },
  },
  mounted() {
    this.getAllImports();
  }
}
</script>

<template>
  <p id="res_import"/>
  <table border="1" >
    <tbody>
    <tr>
      <th>id</th>
      <th>user login</th>
      <th>status</th>
      <th>object count</th>
    </tr>
    <tr v-for="imp in imports">
      <td>{{imp.id}}</td>
      <td>{{imp.user.login}}</td>
      <td>{{imp.status}}</td>
      <td>{{imp.count}}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>