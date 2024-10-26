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
  },
  methods: {
    goToMainPage(){
      this.$router.push({name: 'menu-page'})
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
        api.post("/space/coord/update", this.coordinate)
            .then(response => {
              document.getElementById("res_update_coord").innerHTML = "Update coordinate was successful!"
            })
            .catch(error => {
              errorHandler(error.response.status, "res_update_coord");
            })
      }
    }
  }
}
</script>

<template>
  <p class="label">Update coordinate:</p>
  <p>Id: {{coordinate.id}}</p>
  <form id="coord">
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

  <p id="res_update_coord"></p>
  <div>
    <input class="but"  type="submit" @click.prevent="goToMainPage" value="back to main page"/>
  </div>


</template>

<style scoped>

</style>