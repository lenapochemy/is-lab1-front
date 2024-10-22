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

      currentCoordPage: 0,
      currentCoordParam: 'id',
      totalCoordPages: 0,

      currentChapterPage: 0,
      currentChapterParam: 'id',
      totalChapterPages: 0,

      currentMarinePage: 0,
      currentMarineParam: 'id',
      totalMarinePages: 0,
    }
  },
  methods: {
    getSpaceMarines: function(param){
      if(param != null){
        this.currentMarineParam = param;
      }
      api.get("/space/getSpaceMarine/" + this.currentMarineParam + "/" + this.currentMarinePage)
          .then(response => {
            if(response.status === 200){
              document.getElementById("res").innerHTML = "yes";
              this.spaceMarines = response.data.content;
              this.totalMarinePages = response.data.totalPages;
            }
          })
          .catch(error => {
            document.getElementById("res").innerHTML = error;
          })

    },
    getChapters: function(param){
      if(param != null){
        this.currentChapterParam = param;
      }
      api.get("/space/getChapter/" + this.currentChapterParam + "/" + this.currentChapterPage)
          .then(response => {
            if(response.status === 200){
              document.getElementById("res").innerHTML = "yes chapter";
              this.chapters = response.data.content;
              this.totalChapterPages = response.data.totalPages;
              this.$store.commit('setChapters', this.chapters);
            }
          })
          .catch(error => {
            document.getElementById("res").innerHTML = error;
          })

    },
    getCoordinates: function(param){
      if(param != null) {
        this.currentCoordParam = param;
      }
      api.get("/space/getCoord/" + this.currentCoordParam + "/" + this.currentCoordPage)
          .then(response => {
            if(response.status === 200){
              document.getElementById("res").innerHTML = "yes";
              this.coords = response.data.content;
              this.totalCoordPages = response.data.totalPages;
              // localStorage.setItem("coords", this.coords)
              this.$store.commit('setCoords', this.coords);
            }
          })
          .catch(error => {
            document.getElementById("res").innerHTML = error;
          })
    },
    getPrevPageCoordinates(){
      this.currentCoordPage--;
      this.getCoordinates();
    },
    getNextPageCoordinates(){
      this.currentCoordPage++;
      this.getCoordinates();
    },
    getPrevPageChapter(){
      this.currentChapterPage--;
      this.getChapters();
    },
    getNextPageChapter(){
      this.currentChapterPage++;
      this.getChapters();
    },
    getPrevPageMarine(){
      this.currentMarinePage--;
      this.getSpaceMarines();
    },
    getNextPageMarine(){
      this.currentMarinePage++;
      this.getSpaceMarines();
    },
    addSpaceMarine: function() {
      this.$store.commit('setChapters', this.chapters);
      this.$store.commit('setCoords', this.coords);
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
      this.$store.commit('setCoord', coord);
      this.$router.push({name: 'update-coordinate-page'})
    },
    updateChapter(chapter){
      this.$store.commit('setChapter', chapter);
      this.$router.push({name: 'update-chapter-page'})
    },
    updateSpaceMarine(spaceMarine){
      this.$store.commit('setChapters', this.chapters);
      this.$store.commit('setCoords', this.coords);
      this.$store.commit('setSpaceMarine', spaceMarine);
      this.$router.push({name: 'update-space-marine-page'})
    }
  },
  mounted() {
    this.currentCoordPage = 0;
    this.currentCoordParam = 'id';
    this.currentChapterParam = 'id';
    this.currentChapterPage = 0;
    this.currentMarineParam = 'id';
    this.currentMarinePage = 0;
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
    <th> <input class="but"  type="submit" @click.prevent="getCoordinates('id')" value="ID"/></th>
    <th> <input class="but"  type="submit" @click.prevent="getCoordinates('x')" value="X"/></th>
    <th> <input class="but"  type="submit" @click.prevent="getCoordinates('y')" value="Y"/></th>
    </thead>
    <tbody>
    <tr v-for="coord in coords">
      <td>{{coord.id}}</td>
      <td>{{coord.x}}</td>
      <td>{{coord.y}}</td>
      <td>
        <input class="but"  type="submit" @click.prevent="deleteCoord(coord.id)" value="delete"/>
        <input class="but"  type="submit" @click.prevent="updateCoord(coord)" value="update"/>
      </td>
    </tr>
    </tbody>
  </table>

  <div>
    <span>Page number {{currentCoordPage+1}}</span>
    <input class="but"  type="submit" v-if="currentCoordPage > 0" @click.prevent="getPrevPageCoordinates" value="previous page"/>
    <input class="but"  type="submit" v-if="currentCoordPage + 1 < totalCoordPages" @click.prevent="getNextPageCoordinates" value="next page"/>
    <input class="but"  type="submit" @click.prevent="addCoordinate" value="add new coordinate"/>
  </div>


  <table border="1" id="chapter_table">
    <thead>
    <th> <input class="but"  type="submit" @click.prevent="getChapters('id')" value="ID"/></th>
    <th> <input class="but"  type="submit" @click.prevent="getChapters('name')" value="name"/></th>
    <th> <input class="but"  type="submit" @click.prevent="getChapters('parentLegion')" value="parent legion"/></th>
    </thead>
    <tbody>
    <tr v-for="chapter in chapters">
      <td>{{chapter.id}}</td>
      <td>{{chapter.name}}</td>
      <td>{{chapter.parentLegion}}</td>
      <td>
          <input class="but"  type="submit" @click.prevent="deleteChapter(chapter.id)" value="delete"/>
          <input class="but"  type="submit" @click.prevent="updateChapter(chapter)" value="update"/>
      </td>
    </tr>
    </tbody>
  </table>

  <div>
    <span>Page number {{currentChapterPage+1}}</span>
    <input class="but"  type="submit" v-if="currentChapterPage > 0" @click.prevent="getPrevPageChapter" value="previous page"/>
    <input class="but"  type="submit" v-if="currentChapterPage + 1 < totalChapterPages" @click.prevent="getNextPageChapter" value="next page"/>
    <input class="but"  type="submit" @click.prevent="addChapter" value="add new chapter"/>
  </div>

  <table border="1" id="space_marine_table">
    <thead>
    <th><input class="but"  type="submit" @click.prevent="getSpaceMarines('id')" value="ID"/></th>
    <th><input class="but"  type="submit" @click.prevent="getSpaceMarines('name')" value="name"/></th>
    <th><input class="but"  type="submit" @click.prevent="getSpaceMarines('coordinates')" value="coord id"/></th>
    <th><input class="but"  type="submit" @click.prevent="getSpaceMarines('creationDate')" value="date and time"/></th>
    <th><input class="but"  type="submit" @click.prevent="getSpaceMarines('chapter')" value="chapter id"/></th>
    <th><input class="but"  type="submit" @click.prevent="getSpaceMarines('health')" value="health"/></th>
    <th><input class="but"  type="submit" @click.prevent="getSpaceMarines('category')" value="category"/></th>
    <th><input class="but"  type="submit" @click.prevent="getSpaceMarines('weaponType')" value="weapon type"/></th>
    <th><input class="but"  type="submit" @click.prevent="getSpaceMarines('meleeWeapon')" value="melee weapon"/></th>
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
        <input class="but"  type="submit" @click.prevent="deleteSpaceMarine(marine.id)" value="delete"/>
        <input class="but"  type="submit" @click.prevent="updateSpaceMarine(marine)" value="update"/>
      </td>
    </tr>
    </tbody>
  </table>

  <div>
    <span>Page number {{currentMarinePage+1}}</span>
    <input class="but"  type="submit" v-if="currentMarinePage > 0" @click.prevent="getPrevPageMarine" value="previous page"/>
    <input class="but"  type="submit" v-if="currentMarinePage + 1 < totalMarinePages" @click.prevent="getNextPageMarine" value="next page"/>
    <input class="but"  type="submit" @click.prevent="addSpaceMarine" value="add new space marine"/>
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