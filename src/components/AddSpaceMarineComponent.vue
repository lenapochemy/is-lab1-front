<script>
import {api} from "@/axios.js";
import {cleanErrorMessage, errorHandler} from "@/js/utils.js";
import {validateCategory, validateChapter, validateCoords, validateHealth, validateName} from "@/js/validation.js";

export default{
  name: "AddSpaceMarineComponent",
  data(){
    return {
      spaceMarine: {
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
  methods: {
    addSpaceMarine: function() {
      if(this.validateName() && this.validateCoords() && this.validateChapter() &&
          this.validateHealth() && this.validateCategory()) {
        api.post("/space/create", this.spaceMarine, {
          headers: {
            "Content-Type": "application/json"
          }})
            .then(response => {
              // document.getElementById("res").innerHTML = "ura add";
              // this.getSpaceMarines();
              this.$router.push({name: 'main-page'})
            })
            .catch(error => {
              errorHandler(error.response.status, "res");
            })
      }
    },
    getAllChapters(){
      api.get("/space/chapter")
          .then(response => {
            if(response.status === 200){
              // document.getElementById("res").innerHTML = "yes chapter";
              this.chapters = response.data;
            }
          })
          .catch(error => {
            document.getElementById("res").innerHTML = error;
          })
    },
    getAllCoordinates(){
      api.get("/space/coord")
          .then(response => {
            if(response.status === 200){
              this.coords = response.data;
            }
          })
          .catch(error => {
            document.getElementById("res").innerHTML = error;
          })
    },
    validateName(){
      return validateName(this.spaceMarine.name);
    },
    validateCoords(){
      return validateCoords(this.spaceMarine.coordinates);
    },
    validateChapter(){
      return validateChapter(this.spaceMarine.chapter);
    },
    validateHealth(){
      return validateHealth(this.spaceMarine.health);
    },
    validateCategory(){
      return validateCategory(this.spaceMarine.category);
    },
    goToMainPage(){
      this.$router.push({name: 'main-page'})
    }
  },
  mounted() {
    this.getAllCoordinates();
    this.getAllChapters();
    // this.coords = this.$store.state.coords;
    // this.chapters = this.$store.state.chapters;
    // console.log(this.chapters)
    // console.log(this.$store.state.coords)
    // this.coords = this.$router.state.coords;
    // this.chapters = this.$router.state.chapters;
    // this.coords = localStorage.getItem("coords")
  }
}
</script>

<template>
  <form id="spaceMarine">
    <span>SPACE MARINE:</span>
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
      <!--      <div v-for="chapter in chapters">-->
      <!--        <input type="radio" v-model="spaceMarine.chapter.id"  v-bind:value="chapter.id" @change="validateChapter"/>-->
      <!--        <label>name: {{chapter.name}}, parent legion: {{chapter.parentLegion}}</label>-->
      <!--      </div>-->

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
      <!--      <span id="weapon_error"/>-->
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
      <input class="but"  type="submit" @click.prevent="addSpaceMarine()" value="add"/>
    </div>
  </form>
  <div>
    <input class="but"  type="submit" @click.prevent="goToMainPage" value="back to main page"/>
  </div>
</template>

<style scoped>

</style>