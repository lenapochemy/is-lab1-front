<script>
import {api} from "@/axios.js";
import {errorHandler} from "@/js/utils.js";
import {validateCoordX, validateNumber} from "@/js/validation.js";

export default {
  name: "AddCoordinateComponent",
  data(){
    return{
      coordinates: {
        x: '',
        y: ''
      }
    }
  },
  methods: {
    addCoordinate: function() {
      if(this.validateX() && this.validateY()) {
        api.post("/space/coord/create", this.coordinates)
            .then(response => {
              // this.$router.push({name: 'main-page'})
              document.getElementById("res_add_coord").innerHTML = "Adding coordinates was successful!"
            })
            .catch(error => {
              // errorHandler(error.response.status, "res");
              errorHandler(error.status, "res_add_coord", "print", error.response.data);
            })
      }
    },
    validateX(){
      return validateCoordX(this.coordinates.x, "coord_x_error");
    },
    validateY(){
      return validateNumber(this.coordinates.y, "Coordinate Y", "coord_y_error");
    },
  }
}
</script>

<template>
  <form id="coord">
    <span>ADD COORDINATES:</span>
    <div>
      <span>coordinate X:</span>
      <input type="text" v-model="coordinates.x" @change="validateX"/>
      <span class="error" id="coord_x_error"/>
    </div>

    <div>
      <span>coordinate Y:</span>
      <input type="text" v-model="coordinates.y" @change="validateY"/>
      <span class="error" id="coord_y_error"/>
    </div>

    <div>
      <input class="but"  type="submit" @click.prevent="addCoordinate" value="add"/>
    </div>
  </form>
  <p id="res_add_coord"></p>
</template>

<style scoped>

</style>