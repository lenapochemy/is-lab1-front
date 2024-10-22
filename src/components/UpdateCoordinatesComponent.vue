<script >
import {validateCoordX, validateCoordY} from "@/js/validation.js";
import {api} from "@/axios.js";
import {errorHandler} from "@/js/utils.js";
export default {
  name: "UpdateComponent",
  data() {
    return {
      coordinate: {
        id: "",
        x: "",
        y: ""
      }
    }
  },
  mounted() {
    this.coordinate = this.$store.state.coordinate;
    // this.coordinate.id = this.$store.state.coordinate.id;
    // this.coordinate.x = this.$store.state.coordinate.x;
    // this.coordinate.y = this.$store.state.coordinate.y;
  },
  methods: {
    goToMainPage(){
      this.$router.push({name: 'main-page'})
    },
    validateX(){
      return validateCoordX(this.coordinate.x);
    },
    validateY(){
      return validateCoordY(this.coordinate.y);
    },
    update(){
      if(this.validateX() && this.validateY()){
        console.log("in request");
        api.post("/space/updateCoord", this.coordinate)
            .then(response => {
              this.$router.push({name: 'main-page'})
            })
            .catch(error => {
              errorHandler(error.response.status, "res");
            })
      }
    }
  }
}
</script>

<template>
  <h1>Update Coordinate</h1>
  <b>Id: {{coordinate.id}}</b>
  <form id="coord">
<!--    <span>COORDINATES:</span>-->
    <div>
      <span>coordinate X:</span>
      <input type="text" v-model="coordinate.x" @change="validateX"/>
      <span class="error" id="coord_x_error"/>
    </div>

    <div>
      <span>coordinate Y:</span>
      <input type="text" v-model="coordinate.y" @change="validateY"/>
      <span class="error" id="coord_y_error"/>
    </div>

    <div>
      <input class="but"  type="submit" @click.prevent="update" value="save"/>
    </div>
  </form>
  <div>
    <input class="but"  type="submit" @click.prevent="goToMainPage" value="back to main page"/>
  </div>


</template>

<style scoped>

</style>