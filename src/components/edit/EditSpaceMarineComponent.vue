<script>
import {api} from "@/axios.js";
import {validateNotEmpty} from "@/js/validation.js";
import {errorHandler} from "@/js/utils.js";

export default {
  data(){
    return {
      spaceMarines: [],
      spaceMarine: null,
      editSpaceMarineInfo : [],
    }
  },
  mounted() {
    this.getAllSpaceMarines();
  },
  methods: {
    getAllSpaceMarines(){
      api.get("/space/all")
          .then(response => {
            if(response.status === 200){
              this.spaceMarines = response.data;
            }
          })
          .catch(error => {
            document.getElementById("res_edit_marine").innerHTML = error;
          })
    },
    validateMarine(){
      return validateNotEmpty(this.spaceMarine, "Space marine", "marine")
    },
    getEditInfo: function() {
      if(this.validateMarine()) {
        api.get("/edit/spaceMarine/" + this.spaceMarine.id)
            .then(response => {
              this.editSpaceMarineInfo = response.data;
            })
            .catch(error => {
              errorHandler(error.response.status, "res_edit_marine");
            })
      }
    },
  }
}
</script>

<template>
  <div>
    <span>Space marine:</span>
    <select v-model="spaceMarine" @change="validateMarine">
      <option v-for="marine in spaceMarines" v-bind:value="marine" >
        ID: {{marine.id}}, name: {{marine.name}}, coord ID: {{marine.coordinates.id}}, date: {{marine.creationDate}}, chapter ID: {{marine.chapter.id}}, health: {{marine.health}}, category: {{marine.category}}, weapon type: {{marine.weaponType}}, melee weapon: {{marine.meleeWeapon}}</option>    </select>
    <span class="error" id="filter_marine_error"/>
  </div>

  <input class="but"  type="submit" @click.prevent="getEditInfo()" value="get info"/>

  <table border="1" id="chapter_table">
    <thead>
    <th>space marine id</th>
    <th>user login</th>
    <th>date</th>
    <th>type</th>
    </thead>
    <tbody>
    <tr v-for="marine in editSpaceMarineInfo">
      <td>{{marine.spaceMarine.id}}</td>
      <td>{{marine.user.login}}</td>
      <td>{{marine.date}}</td>
      <td>{{marine.type}}</td>
    </tr>
    </tbody>
  </table>


</template>

<style scoped>

</style>