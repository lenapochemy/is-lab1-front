<script >
import {api} from '@/axios.js'

export default {
  name: "GetComponent",
  data(){
    return {
      spaceMarines: [],
      coordination: [],
      chapters: []
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
              this.coordination = response.data;
            }
          })
          .catch(error => {
            document.getElementById("res").innerHTML = error;
          })

    }
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


  <table border="1" id="chapter_table">
    <thead>
    <th>id</th>
    <th>X</th>
    <th>Y</th>
    </thead>
    <tbody>
    <tr v-for="coord in coordination">
      <td>{{coord.id}}</td>
      <td>{{coord.x}}</td>
      <td>{{coord.y}}</td>
    </tr>
    </tbody>
  </table>

  <table border="1" id="coord_table">
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
    </tr>
    </tbody>
  </table>

</template>

<style scoped>

</style>