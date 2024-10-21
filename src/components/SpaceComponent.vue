<script>

import {api} from "@/axios.js";
import {errorHandler} from "@/js/utils.js";
import UpdateComponent from "@/components/UpdateCoordinatesComponent.vue";

export default{
  name: "SpaceComponent",
  components: {UpdateComponent},
  data(){
    return {
      spaceMarines: [],
      coords: [],
      chapters: [],
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
              this.$store.commit('setChapters', this.chapters);
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
              // localStorage.setItem("coords", this.coords)
              this.$store.commit('setCoords', this.coords);
            }
          })
          .catch(error => {
            document.getElementById("res").innerHTML = error;
          })

    },
    addSpaceMarine: function() {
      this.$router.push({name: 'add-space-marine-page'})
    },
    addChapter: function() {
      this.$router.push({name: 'add-chapter-page'})
    },
    addCoordinate: function() {
      this.$router.push({name: 'add-coordinate-page'})
    },
    deleteChapter: function(id){
      api.delete("/space/chapter/" + id)
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
    },
    updateCoord(coord){
      this.$store.commit('setCoordId', coord.id);
      this.$store.commit('setCoordX', coord.x);
      this.$store.commit('setCoordY', coord.y);
      this.$router.push({name: 'update-coordinate-page'})
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
  <span id="res"></span>

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



<!--  <form @submit.prevent="deleteChapter">-->
<!--    <select v-model="chapterForDeleteId">-->
<!--      <option v-for="chapter in chapters" v-bind:value="chapter.id">name: {{chapter.name}}, parent legion: {{chapter.parentLegion}}</option>-->
<!--    </select>-->
<!--    <input class="but" type="submit" value="delete chapter">-->
<!--  </form>-->

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
          <input class="but" type="submit" value="delete"/>
        </form>
        <form @submit.prevent="updateCoord(coord)">
          <input class="but" type="submit" value="update">
        </form>
      </td>
    </tr>
    </tbody>
  </table>

  <div>
    <form @submit.prevent="addCoordinate">
      <input class="but" type="submit" value="add new coordinate">
    </form>
  </div>


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
      <td><form @submit.prevent="deleteChapter(chapter.id)">
        <input class="but" type="submit" value="delete"/>
      </form></td>
    </tr>
    </tbody>
  </table>

  <div>
    <form @submit.prevent="addChapter">
      <input class="but" type="submit" value="add new chapter">
    </form>
  </div>

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
          <input class="but" type="submit" value="delete"/>
        </form>
      </td>
    </tr>
    </tbody>
  </table>

  <div>
    <form @submit.prevent="addSpaceMarine">
      <input class="but" type="submit" value="add new space marine">
    </form>
  </div>

</template>

<style scoped>
.error input {
  border-color: red;
}
.error {
  color: red;
}
</style>