<script>
import {api} from "@/axios.js";
import {errorHandler} from "@/js/utils.js";
import {createErrorMessage, cleanErrorMessage} from "@/js/utils.js";

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
      if(this.validateCoordX() && this.validateCoordY()) {
        api.post("/space/newCoord", this.coordinates, {
          headers: {
            "Content-Type": "application/json"
          }
        })
            .then(response => {
              // document.getElementById("res").innerHTML = "ura add";
              // this.getCoordinates();
              this.$router.push({name: 'main-page'})
            })
            .catch(error => {
              errorHandler(error.response.status, "res");
            })
      }
    },
    validateCoordX(){
      if(this.coordinates.x == ""){
        createErrorMessage("Coordinate X can't be empty", "coord_x_error");
        return false;
      } else {
        this.coordinates.x.replace(",", ".");
        let x = this.coordinates.x;
        if (!(!isNaN(parseFloat(x)) && isFinite(x))) {
          createErrorMessage("Coordinate X should be a number, more than -147", "coord_x_error");
          return false;
        } else {
          if (x <= -147) {
            createErrorMessage("Coordinate X should be a number, more than -147", "coord_x_error");
            return false;
          } else {
            cleanErrorMessage("coord_x_error");
            return true;
          }
        }
      }
    },
    validateCoordY(){
      if(this.coordinates.y == ""){
        createErrorMessage("Coordinate Y can't be empty", "coord_y_error");
        return false;
      } else {
        this.coordinates.y.replace(",", ".");
        let y = this.coordinates.y;
        if (!(!isNaN(parseFloat(y)) && isFinite(y))) {
          createErrorMessage("Coordinate Y should be a number", "coord_y_error");
          return false;
        } else {
          cleanErrorMessage("coord_y_error");
          return true;
        }
      }
    },
    goToMainPage(){
      this.$router.push({name: 'main-page'})
    }
  }
}
</script>

<template>
  <form id="coord">
    <span>COORDINATES:</span>
    <div>
      <span>coordinate X:</span>
      <input type="text" v-model="coordinates.x" @change="validateCoordX"/>
      <span class="error" id="coord_x_error"/>
      <!--      <p v-if="$v.coordinates.x.$error">Поле должно быть числом большим -147</p>-->
    </div>

    <div>
      <span>coordinate Y:</span>
      <input type="text" v-model="coordinates.y" @change="validateCoordY"/>
      <span class="error" id="coord_y_error"/>
    </div>

    <div>
      <input class="but"  type="submit" @click.prevent="addCoordinate" value="add"/>
    </div>
  </form>
  <div>
    <form @submit.prevent="goToMainPage">
      <input class="but" type="submit" value="back to main page">
    </form>
  </div>
</template>

<style scoped>

</style>