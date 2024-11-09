<script>
import {api} from "@/axios.js";
import {errorHandler} from "@/js/utils.js";
import {validateHealth, validateString} from "@/js/validation.js";

export default {
  name: "UpdateSpaceMarine",
  data(){
    return {
      spaceMarine: {
        id: '',
        name: '',
        coordinates: {
          id: '',
          x: '',
          y: '',
        },
        chapter: {
          id: '',
          name: '',
          parentLegion: ''
        },
        health: '',
        category: '',
        weaponType: null,
        meleeWeapon: null
      },
      coords: [],
      chapters: []
    }
  },
  mounted() {
    this.spaceMarine = this.$store.state.spaceMarine;
    this.getAllChapters();
    this.getAllCoordinates();
  },
  methods:{
    goToMainPage(){
      this.$router.push({name: 'menu-page'})
    },
    update: function() {
      if(this.validateName() && this.validateCoords() && this.validateChapter() &&
          this.validateHealth() && this.validateCategory()) {
        api.post("/space/update", this.spaceMarine)
            .then(response => {
              document.getElementById("res_update_marine").innerHTML = "Update space marine was successful!";
            })
            .catch(error => {
              errorHandler(error.response.status, "res_update_marine");
            })
      }
    },
    getAllChapters(){
      api.get("/space/chapter?filter_param=user")
          .then(response => {
            if(response.status === 200){
              this.chapters = response.data;
            }
          })
          .catch(error => {
            document.getElementById("res_update_marine").innerHTML = error;
          })
    },
    getAllCoordinates(){
      api.get("/space/coord?filter_param=user")
          .then(response => {
            if(response.status === 200){
              this.coords = response.data;
            }
          })
          .catch(error => {
            document.getElementById("res_update_marine").innerHTML = error;
          })
    },
    validateName(){
      return validateString(this.spaceMarine.name, "Name", "name_error");
    },
    validateCoords(){
      return validateString(this.spaceMarine.coordinates.id, "Coordinates", "coord_error");
    },
    validateChapter(){
      return validateString(this.spaceMarine.chapter.id, "Chapter", "chapter_error");
    },
    validateHealth(){
      return validateHealth(this.spaceMarine.health, "health_error");
    },
    validateCategory(){
      return validateString(this.spaceMarine.category, "Category", "category_error");
    },
  }
}
</script>

<template>

  <form id="spaceMarine">
    <p class="label">Update space marine:</p>
    <p>ID: {{spaceMarine.id}}</p>
    <div>
      <span>name:</span>
      <input type="text" v-model="spaceMarine.name" @change="validateName"/>
      <span class="error" id="name_error"/>
    </div>

    <div>
      <span>Coordinates:</span>
      <select v-model="spaceMarine.coordinates.id" @change="validateCoords">
        <option v-for="coord in coords" v-bind:value="coord.id">X={{coord.x}}, Y={{coord.y}}</option>
      </select>
      <span class="error" id="coord_error"/>
    </div>

    <div>
      <span>Chapter:</span>
      <select v-model="spaceMarine.chapter.id" @change="validateChapter">
        <option v-for="chapter in chapters" v-bind:value="chapter.id" >name: {{chapter.name}}, parent legion: {{chapter.parentLegion}}</option>
      </select>

      <span class="error" id="chapter_error"/>
    </div>

    <div>
      <span>health:</span>
      <input type="text" v-model="spaceMarine.health" @change="validateHealth"/>
      <span class="error" id="health_error"/>
    </div>

    <div>
      <span>astartes category:</span>
      <br/>
      <input type="radio" id="scout" value="SCOUT" v-model="spaceMarine.category" @change="validateCategory"/>
      <label for="scout">scout</label>
      <br/>
      <input type="radio" id="tactical" value="TACTICAL" v-model="spaceMarine.category" @change="validateCategory"/>
      <label for="tactical">tactical</label>
      <br/>
      <input type="radio" id="chaplain" value="CHAPLAIN" v-model="spaceMarine.category" @change="validateCategory"/>
      <label for="chaplain">chaplain</label>
      <br/>
      <span class="error" id="category_error"/>
    </div>

    <div>
      <span>weapon:</span>
      <br/>
      <input type="radio" id="boltgun" value="BOLTGUN" v-model="spaceMarine.weaponType"/>
      <label for="boltgun">boltgun</label>
      <br/>
      <input type="radio" id="combi" value="COMBI_PLASMA_GUN" v-model="spaceMarine.weaponType"/>
      <label for="combi">combi plasma gun</label>
      <br/>
      <input type="radio" id="grav" value="GRAV_GUN" v-model="spaceMarine.weaponType"/>
      <label for="grav">grav gun</label>
      <br/>
      <input type="radio" id="inferno" value="INFERNO_PISTOL" v-model="spaceMarine.weaponType"/>
      <label for="inferno">inferno pistol</label>
    </div>

    <div>
      <span>melee weapon:</span>
      <br/>
      <input type="radio" id="chain" value="CHAIN_AXE" v-model="spaceMarine.meleeWeapon"/>
      <label for="chain">chain axe</label>
      <br/>
      <input type="radio" id="claw" value="LIGHTING_CLAW" v-model="spaceMarine.meleeWeapon"/>
      <label for="claw">lighting claw</label>
      <br/>
      <input type="radio" id="blade" value="POWER_BLADE" v-model="spaceMarine.meleeWeapon"/>
      <label for="blade">power blade</label>
      <!--      <span id="melee_error"/>-->
    </div>

    <div>
      <input class="but"  type="submit" @click.prevent="update()" value="save"/>
    </div>
  </form>

  <p id="res_update_marine"></p>
  <div>
    <input class="but"  type="submit" @click.prevent="goToMainPage" value="back to main page"/>
  </div>
</template>

<style scoped>

</style>