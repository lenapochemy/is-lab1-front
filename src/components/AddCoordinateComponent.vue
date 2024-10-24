<script>
import {api} from "@/axios.js";
import {errorHandler} from "@/js/utils.js";
import {validateCoordX, validateCoordY} from "@/js/validation.js";

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
              this.$router.push({name: 'main-page'})
            })
            .catch(error => {
              errorHandler(error.response.status, "res");
            })
      }
    },
    validateX(){
      return validateCoordX(this.coordinates.x);
    },
    validateY(){
      return validateCoordY(this.coordinates.y);
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
      <input type="text" v-model="coordinates.x" @change="validateX"/>
      <span class="error" id="coord_x_error"/>
      <!--      <p v-if="$v.coordinates.x.$error">Поле должно быть числом большим -147</p>-->
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
  <div>
    <input class="but"  type="submit" @click.prevent="goToMainPage" value="back to main page"/>
  </div>
</template>

<style scoped>

</style>