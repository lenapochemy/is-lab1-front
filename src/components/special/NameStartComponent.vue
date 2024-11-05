<script >
import {api} from "@/axios.js";
import {validateString} from "@/js/validation.js";
import {errorHandler} from "@/js/utils.js";

export default {
  name: "NameStartComponent",
  data() {
    return {
      callNameStart: false,
      spaceMarines: [],
      name: ''
    }
  },
  methods: {
    getWithNameStarts(){
      if(this.validateName()) {
        api.get("/special/nameStart/" + this.name)
            .then(response => {
              if (response.status === 200) {
                this.spaceMarines = response.data;
                if(this.spaceMarines.length === 0) {
                  document.getElementById("res_name").innerHTML = "No this space marines";
                  this.callNameStart = false;
                } else {
                  document.getElementById("res_name").innerHTML = "Find space marines was successful!";
                  this.callNameStart = true;
                }
                //

              }
            })
            .catch(error => {
              // document.getElementById("res_name").innerHTML = error;
              errorHandler(error.response.status, "res_name")
            })
      }
    },
    validateName(){
      return validateString(this.name, "Name start string", "name_error");
    }
  }

}
</script>

<template>
  <p class="label">Find all space marines, that name start on this string:</p>
  <div>
    <label for="name_str">Write name start:</label>
    <input id="name_str" type="text" @click.prevent="getWithNameStarts" v-model="name"/>
    <input class="but"  type="button" @click.prevent="getWithNameStarts" value="get space marine with this name start"/>
    <span class="error" id="name_error"/>
  </div>

  <p id="res_name"></p>

  <table border="1" id="space_marine_table" v-if="callNameStart">
    <tbody>
    <tr>
    <th>ID</th>
    <th>name</th>
    <th>coord ID</th>
    <th>coord x</th>
    <th>coord y</th>
    <th>date and time</th>
    <th>chapter ID</th>
    <th>chapter name</th>
    <th>chapter parent legion</th>
    <th>health</th>
    <th>category</th>
    <th>weapon type</th>
    <th>melee weapon</th>
    </tr>
    <tr v-for="marine in spaceMarines">
      <td>{{marine.id}}</td>
      <td>{{marine.name}}</td>
      <td>{{marine.coordinates.id}}</td>
      <td>{{marine.coordinates.x}}</td>
      <td>{{marine.coordinates.y}}</td>
      <td>{{marine.creationDate}}</td>
      <td>{{marine.chapter.id}}</td>
      <td>{{marine.chapter.name}}</td>
      <td>{{marine.chapter.parentLegion}}</td>
      <td>{{marine.health}}</td>
      <td>{{marine.category}}</td>
      <td>{{marine.weaponType}}</td>
      <td>{{marine.meleeWeapon}}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>