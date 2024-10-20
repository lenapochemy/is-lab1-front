<script>

import {api} from "@/axios.js";
import {errorHandler} from "@/js/errorHandler.js";

export default{
  name: "SpaceComponent",
  data(){
    return {
      spaceMarines: [],
      coords: [],
      chapters: [],

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
      },
      chapterForDeleteId: ''
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
    getChapters: function(){
      api.get("/space/getChapter")
          .then(response => {
            if(response.status === 200){
              document.getElementById("res").innerHTML = "yes chapter";
              this.chapters = response.data;
            }
          })
          .catch(error => {
            document.getElementById("res").innerHTML = error;
          })

    },
    getCoordinates: function(){
      api.get("/space/getCoord")
          .then(response => {
            if(response.status === 200){
              document.getElementById("res").innerHTML = "yes";
              this.coords = response.data;
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
            document.getElementById("res").innerHTML = "ura add";
            this.getSpaceMarines();
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
            document.getElementById("res").innerHTML = "ura add";
            this.getChapters();
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
            this.getCoordinates();
          })
          .catch(error => {
            errorHandler(error.response.status, "res");
          })
    },
    deleteChapter: function(){
      api.delete("/space/chapter/" + this.chapterForDeleteId)
          .then(response => {
            document.getElementById("res").innerHTML = "delete good";
            this.getChapters();
            this.getSpaceMarines();
          })
          .catch(error => {
            errorHandler(error.response.status, "res");
          })
    },
    deleteCoord: function (id){
      api.delete("/space/coord/" + id)
          .then(response => {
            document.getElementById("res").innerHTML = "delete good";
            this.getCoordinates();
            this.getSpaceMarines();
          })
          .catch(error => {
            errorHandler(error.response.status, "res");
          })
    },
    deleteSpaceMarine: function (id){
      api.delete("/space/" + id)
          .then(response => {
            document.getElementById("res").innerHTML = "delete good";
            this.getSpaceMarines();
            this.getChapters();
            this.getCoordinates();
          })
          .catch(error => {
            errorHandler(error.response.status, "res");
          })
    }
  },
  mounted() {
    this.getCoordinates();
    this.getChapters();
    this.getSpaceMarines();
  }
}
</script>

<template>
  <form @submit.prevent="getSpaceMarines">
    <input class="but" type="submit" value="get marines">
  </form>
  <form @submit.prevent="getChapters">
    <input class="but" type="submit" value="get chapters">
  </form>
  <form @submit.prevent="getCoordinates">
    <input class="but" type="submit" value="get coords">
  </form>
  <span id="res"></span>



  <form @submit.prevent="deleteChapter">
    <select v-model="chapterForDeleteId">
      <option v-for="chapter in chapters" v-bind:value="chapter.id">name: {{chapter.name}}, parent legion: {{chapter.parentLegion}}</option>
    </select>
    <input class="but" type="submit" value="delete chapter">
  </form>

  <table border="1" id="coord_table">
    <thead>
    <th>id</th>
    <th>X</th>
    <th>Y</th>
    </thead>
    <tbody>
    <tr v-for="coord in coords">
      <td>{{coord.id}}</td>
      <td>{{coord.x}}</td>
      <td>{{coord.y}}</td>
      <td>
        <form @submit.prevent="deleteCoord(coord.id)">
          <input type="submit" value="delete"/>
        </form>
      </td>
    </tr>
    </tbody>
  </table>

  <table border="1" id="chapter_table">
    <thead>
    <th>id</th>
    <th>name</th>
    <th>parent legion</th>
    </thead>
    <tbody>
    <tr v-for="chapter in chapters">
      <td>{{chapter.id}}</td>
      <td>{{chapter.name}}</td>
      <td>{{chapter.parentLegion}}</td>
    </tr>
    </tbody>
  </table>

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
      <td>
        <form @submit.prevent="deleteSpaceMarine(marine.id)">
          <input type="submit" value="delete"/>
        </form>
      </td>
    </tr>
    </tbody>
  </table>



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

<!--    <div>-->
<!--      <span>coordinate id:</span>-->
<!--      <input type="text" v-model="spaceMarine.coordinates.id"/>-->
<!--    </div>-->

<!--    <div>-->
<!--      <span>chapter id:</span>-->
<!--      <input type="text" v-model="spaceMarine.chapter.id"/>-->
<!--    </div>-->

    <div>
      <span>Coordinates:</span>
      <select v-model="spaceMarine.coordinates.id">
        <option v-for="coord in coords" v-bind:value="coord.id">X={{coord.x}}, Y={{coord.y}}</option>
      </select>
    </div>

    <div>
      <span>Chapter:</span>
      <select v-model="spaceMarine.chapter.id">
        <option v-for="chapter in chapters" v-bind:value="chapter.id">name: {{chapter.name}}, parent legion: {{chapter.parentLegion}}</option>
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