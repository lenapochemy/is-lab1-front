<script>
import {api} from "@/axios.js";
import {utils} from "@/js/utils.js";
import {createErrorMessage, cleanErrorMessage} from "@/js/utils.js";

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
        api.post("/space/addSpaceMarine", this.spaceMarine, {
          headers: {
            "Content-Type": "application/json"
          }
        })
            .then(response => {
              // document.getElementById("res").innerHTML = "ura add";
              // this.getSpaceMarines();
              this.$router.push({name: 'main-page'})
            })
            .catch(error => {
              utils(error.response.status, "res");
            })
      }
    },
    validateName(){
      if(this.spaceMarine.name == ""){
        createErrorMessage("Name can't be empty", "name_error");
        return false;
      } else {
        cleanErrorMessage("name_error");
        return true;
      }
    },
    validateCoords(){
      // console.log("in coord validate" + this.spaceMarine.coordinates.id)
      if(this.spaceMarine.coordinates.id == undefined || this.spaceMarine.coordinates.id == ""){
        createErrorMessage("Coordinates can't be empty", "coord_error");
        return false;
      } else {
        cleanErrorMessage("coord_error");
        return true;
      }
    },
    validateChapter(){
      // if(this.spaceMarine.chapter == undefined || )
      // console.log("in chapter validate" + this.spaceMarines.chapter)
      if(this.spaceMarine.chapter.id == null || this.spaceMarine.chapter.id == ""){
        createErrorMessage("Chapter can't be empty", "chapter_error");
        return false;
      } else {
        cleanErrorMessage("chapter_error");
        return true;
      }
    },
    validateHealth(){
      if(this.spaceMarine.health == ""){
        createErrorMessage("Health can't be empty", "health_error");
        return false;
      } else {
        this.spaceMarine.health.replace(",", ".");
        let health = this.spaceMarine.health;
        if (!(!isNaN(parseFloat(health)) && isFinite(health))) {
          createErrorMessage("Health should be a number", "health_error");
          return false;
        } else if (health <= 0) {
          createErrorMessage("Health should be a number, more than 0", "health_error");
          return false;
        } else {
          cleanErrorMessage("health_error");
          return true;
        }
      }
    },
    validateCategory(){
      // console.log(this.spaceMarine.category)
      if(this.spaceMarine.category == ""){
        createErrorMessage("Category can't be empty", "category_error");
        return false;
      } else {
        cleanErrorMessage("category_error");
        return true;
      }
    },
    goToMainPage(){
      this.$router.push({name: 'main-page'})
    }
  },
  mounted() {
    this.coords = this.$store.state.coords;
    this.chapters = this.$store.state.chapters;
    // console.log(this.coords)
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
    <form @submit.prevent="goToMainPage">
      <input class="but" type="submit" value="back to main page">
    </form>
  </div>
</template>

<style scoped>

</style>