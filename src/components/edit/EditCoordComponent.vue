<script >
import {api} from "@/axios.js";
import {validateString} from "@/js/validation.js";
import {errorHandler} from "@/js/utils.js";

export default {
  data(){
    return {
      coords: [],
      coordinates: null,
      editCoordsInfo : [],
    }
  },
  mounted() {
    this.getAllCoordinates();
  },
  methods: {
    getAllCoordinates(){
      api.get("/space/coord?filter_param=all")
          .then(response => {
            if(response.status === 200){
              this.coords = response.data;
            }
          })
          .catch(error => {
            document.getElementById("res_edit_coord").innerHTML = error;
          })
    },
    validateCoords(){
      return validateString(this.coordinates, "Coordinates", "coord_error");
    },
    getEditInfo: function() {
      if(this.validateCoords()) {
        api.get("/edit/coord/" + this.coordinates.id)
            .then(response => {
              this.editCoordsInfo = response.data;
              // document.getElementById("res_edit_chapter").innerHTML = "Update space marine was successful!";
            })
            .catch(error => {
              errorHandler(error.response.status, "res_edit_coord");
            })
      }
    },
  }
}
</script>

<template>
  <div>
    <span>Coordinates:</span>
    <select v-model="coordinates" @change="validateCoords">
      <option v-for="coord in coords" v-bind:value="coord" >ID: {{coord.id}}, x: {{coord.x}}, y: {{coord.y}}</option>
    </select>
    <span class="error" id="coord_error"/>
  </div>

  <input class="but"  type="submit" @click.prevent="getEditInfo()" value="get info"/>

  <table border="1" id="coord_table">
    <tbody>
    <tr>
    <th>coord id</th>
    <th>user login</th>
    <th>date</th>
    <th>type</th>
    </tr>
    <tr v-for="coord in editCoordsInfo">
      <td>{{coord.coordinates.id}}</td>
      <td>{{coord.user.login}}</td>
      <td>{{coord.date}}</td>
      <td>{{coord.type}}</td>
    </tr>
    </tbody>
  </table>


</template>

<style scoped>

</style>