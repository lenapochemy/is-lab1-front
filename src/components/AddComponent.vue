<script>

import {api} from "@/axios.js";
import {errorHandler} from "@/js/errorHandler.js";

export default {
  name: "AddComponent",
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
        weaponType: '',
        meleeWeapon: ''
      },
      coordinates: {
        x: '',
        y: ''
      },
      chapter: {
        name: '',
        parentLegion: ''
      }
    }
  },
  methods: {
    addSpaceMarine: function() {
      api.post("/space/addSpaceMarine", this.spaceMarine, {
        headers: {
          "Content-Type" : "application/json"
        }
      })
          .then(response => {
            document.getElementById("res").innerHTML = "ura add";
          })
          .catch(error => {
            errorHandler(error.response.status, "res");
          })
    },
    addChapter: function() {
      api.post("/space/newChapter", this.chapter, {
        headers: {
          "Content-Type" : "application/json"
        }
      })
          .then(response => {
            this.$getComponent.getChapters();
            document.getElementById("res").innerHTML = "ura add";
          })
          .catch(error => {
            errorHandler(error.response.status, "res");
          })
    },
    addCoordination: function() {
      api.post("/space/newCoord", this.coordinates, {
        headers: {
          "Content-Type" : "application/json"
        }
      })
          .then(response => {
            document.getElementById("res").innerHTML = "ura add";
          })
          .catch(error => {
            errorHandler(error.response.status, "res");
          })
    }
  }
}

</script>

<template>

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

  <form id="chapter">
    <span>CHAPTER:</span>
    <div>
      <span>chapter name:</span>
      <input type="text" v-model="chapter.name"/>
    </div>

    <div>
      <span>chapter parent legion:</span>
      <input type="text" v-model="chapter.parentLegion"/>
    </div>

    <div>
      <input type="submit" @click.prevent="addChapter()" value="add"/>
    </div>
  </form>


<form id="spaceMarine">
  <span>SPACE MARINE:</span>
  <div>
    <span>name:</span>
    <input type="text" v-model="spaceMarine.name"/>
  </div>

  <div>
    <span>coordinate id:</span>
    <input type="text" v-model="spaceMarine.coordinates.id"/>
  </div>

  <div>
    <span>chapter id:</span>
    <input type="text" v-model="spaceMarine.chapter.id"/>
  </div>


  <div>
    <span>health:</span>
    <input type="text" v-model="spaceMarine.health"/>
  </div>

  <div>
    <span>astartes category:</span>
    <br/>
    <input type="radio" id="scout" value="SCOUT" v-model="spaceMarine.category"/>
    <label for="scout">scout</label>
    <br/>
    <input type="radio" id="tactical" value="TACTICAL" v-model="spaceMarine.category"/>
    <label for="tactical">tactical</label>
    <br/>
    <input type="radio" id="chaplain" value="CHAPLAIN" v-model="spaceMarine.category"/>
    <label for="chaplain">chaplain</label>
    <br/>
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
  </div>

  <div>
    <input type="submit" @click.prevent="addSpaceMarine()" value="add"/>
  </div>
</form>

  <span id="res"></span>
</template>

<style scoped>

</style>