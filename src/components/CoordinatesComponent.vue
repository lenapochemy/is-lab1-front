<script>

import {api} from "@/axios.js";
import {errorHandler} from "@/js/errorHandler.js";

export default {
  name: "CoordinatesComponent",
  data(){
    return {
      coordinates: {
        x: '',
        y: ''
      },
      coordination: []
    }
  },
  methods: {
    getCoordinates: function(){
      api.get("/space/getCoord")
          .then(response => {
            if(response.status === 200){
              document.getElementById("res").innerHTML = "yes";
              this.coordination = response.data;
              localStorage.setItem("coordinates", this.coordination);
            }
          })
          .catch(error => {
            document.getElementById("res").innerHTML = error;
          })

    },
    addCoordination: function() {
      api.post("/space/newCoord", this.coordinates, {
        headers: {
          "Content-Type" : "application/json"
        }
      })
          .then(response => {
            this.getCoordinates();
            document.getElementById("res").innerHTML = "ura add";
          })
          .catch(error => {
            errorHandler(error.response.status, "res");
          })
    }
  },
  mounted() {
    this.getCoordinates();
  }
}
</script>

<template>
  <form @submit.prevent="getCoordinates">
    <input class="but" type="submit" value="get coords">
  </form>

  <table border="1" id="coord_table">
    <thead>
    <th>id</th>
    <th>X</th>
    <th>Y</th>
    </thead>
    <tbody>
    <tr v-for="coord in coordination">
      <td>{{coord.id}}</td>
      <td>{{coord.x}}</td>
      <td>{{coord.y}}</td>
    </tr>
    </tbody>
  </table>

  <form id="coord">
    <span>COORDINATES:</span>
    <div>
      <span>coordinate X:</span>
      <input type="text" v-model="coordinates.x"/>
    </div>

    <div>
      <span>coordinate Y:</span>
      <input type="text" v-model="coordinates.y"/>
    </div>

    <div>
      <input type="submit" @click.prevent="addCoordination" value="add"/>
    </div>
  </form>
</template>

<style scoped>

</style>