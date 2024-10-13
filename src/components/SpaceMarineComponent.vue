<script>

import {api} from "@/axios.js";
import {errorHandler} from "@/js/errorHandler.js";
import CoordinatesComponent from "@/components/CoordinatesComponent.vue";
import ChapterComponent from "@/components/ChapterComponent.vue";

export default {
  name: "SpaceMarineComponent",
  components: {
    CoordinatesComponent,
    ChapterComponent
  },
  data(){
    return {
      spaceMarines: [],
      coordinates: [],
      // chapters: [],

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
      }
    }
  },
  methods: {
    getSpaceMarines: function(){
      api.get("/space/getSpaceMarine")
          .then(response => {
            if(response.status === 200){
              document.getElementById("res").innerHTML = "yes";
              this.spaceMarines = response.data;
            }
          })
          .catch(error => {
            document.getElementById("res").innerHTML = error;
          })

    },
    addSpaceMarine: function() {
      api.post("/space/addSpaceMarine", this.spaceMarine, {
        headers: {
          "Content-Type" : "application/json"
        }
      })
          .then(response => {
            this.getSpaceMarines();
            document.getElementById("res").innerHTML = "ura add";
          })
          .catch(error => {
            errorHandler(error.response.status, "res");
          })
    }
  },
  mounted() {
    this.getSpaceMarines();
    this.coordinates = localStorage.getItem("coordinates");
    this.chapters = localStorage.getItem("chapters");
    console.log("chapters in space: " + this.chapters)
  }
}

</script>

<template>
<!--  <ChapterComponent v-model="chapters" />-->
<!--  <CoordinatesComponent/>-->

  <form @submit.prevent="getSpaceMarines">
    <input class="but" type="submit" value="get marines">
  </form>

  <table border="1" id="space_marine_table">
    <thead>
    <th>id</th>
    <th>name</th>
    <th>coord id</th>
    <!--      <th>coord y</th>-->
    <th>date time</th>
    <th>chapter id</th>
    <!--      <th>chapter parent legion</th>-->
    <th>health</th>
    <th>category</th>
    <th>weapon type</th>
    <th>melee weapon</th>
    </thead>
    <tbody>
    <tr v-for="marine in spaceMarines">
      <td>{{marine.id}}</td>
      <td>{{marine.name}}</td>
      <td>{{marine.coordinates.id}}</td>
      <!--      <td>{{marine.coordinates.y}}</td>-->
      <td>{{marine.creationDate}}</td>
      <td>{{marine.chapter.id}}</td>
      <!--      <td>{{marine.chapter.parentLegion}}</td>-->
      <td>{{marine.health}}</td>
      <td>{{marine.category}}</td>
      <td>{{marine.weaponType}}</td>
      <td>{{marine.meleeWeapon}}</td>
    </tr>
    </tbody>
  </table>


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

<!--    <div>-->
<!--      <span>chapter id:</span>-->
<!--      <input type="text" v-model="spaceMarine.chapter.id"/>-->
<!--    </div>-->

    <div>
      <span>Chapter:</span>
      <select v-model="spaceMarine.chapter.id">
        <option v-for="chapter in chapters" v-bind:value="chapter.id">{{chapter.name}} {{chapter.parentLegion}}</option>
      </select>
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


</template>

<style scoped>

</style>