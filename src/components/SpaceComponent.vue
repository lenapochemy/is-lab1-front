<script>

import {api} from "@/axios.js";
import {cleanErrorMessage, errorHandler} from "@/js/utils.js";
import UpdateComponent from "@/components/update/UpdateCoordinatesComponent.vue";
import {validateCoordX, validateFilterType, validateHealth,validateNumber, validateString} from "@/js/validation.js";
import AdminComponent from "@/components/AdminComponent.vue";

export default{
  name: "SpaceComponent",
  components: {AdminComponent, UpdateComponent},
  data(){
    return {
      spaceMarines: [],
      users_spaceMarines_id: [],
      coords: [],
      users_coords_id: [],
      chapters: [],
      users_chapters_id: [],

      currentCoordPage: 0,
      currentCoordParam: 'id',
      totalCoordPages: 0,

      currentChapterPage: 0,
      currentChapterParam: 'id',
      totalChapterPages: 0,

      currentMarinePage: 0,
      currentMarineParam: 'id',
      totalMarinePages: 0,

      filterChapterType: '',
      filterChapterParam: '',
      inChapterFilter: false,

      filterCoordType: '',
      filterCoordParam: '',
      inCoordFilter: false,

      filterMarineType: '',
      filterMarineParam: '',
      inMarineFilter: false,

    }
  },
  mounted() {
    this.token = localStorage.getItem("userToken");
    this.getCoordinates();
    this.getChapters();
    this.getSpaceMarines();
    this.getUsersSpaceMarines();
    this.getUsersChapters();
    this.getUsersCoordinates();
    // setInterval(this.getCoordinates, 5000);
    // setInterval(this.getChapters, 5000);
    // setInterval(this.getSpaceMarines, 5000);
  },
  methods: {
    getSpaceMarines: function(param){
      this.inMarineFilter = false;
      if(param != null){
        this.currentMarineParam = param;
      }
      let query = "?filter_param=all&filter_value=all&sort_param=" +   this.currentMarineParam + "&page=" +  this.currentMarinePage + "&size=10";
      api.get("/space" + query)
          .then(response => {
            if(response.status === 200){
              this.spaceMarines = response.data.content;
              this.totalMarinePages = response.data.totalPages;
              cleanErrorMessage("filter_marine_error");
            }
          })
          .catch(error => {
            errorHandler(error.response.status, "res_main_marine");
          })
    },
    getUsersSpaceMarines: function(){
      api.get("/space?filter_param=user&filter_value=id")
          .then(response => {
            if(response.status === 200){
              this.users_spaceMarines_id = response.data;
              cleanErrorMessage("filter_marine_error");
            }
          })
          .catch(error => {
            errorHandler(error.response.status, "res_main_marine");
          })
    },
    filterSpaceMarine(){
      if(this.validateMarineType() && this.validateMarine()) {
        this.inMarineFilter = true;
        let query = "?filter_param=" + this.filterMarineType + "&filter_value=" + this.filterMarineParam + "sort_param=" +   this.currentMarineParam + "&page=" +  this.currentMarinePage + "&size=10";
        api.get("/space" + query)
            .then(response => {
              if (response.status === 200) {
                this.spaceMarines = response.data.content;
                if (this.spaceMarines.length === 0) {
                  document.getElementById("filter_marine_error").innerHTML = "No find space marines with this " + this.filterMarineType;
                }
                this.totalMarinePages = response.data.totalPages;
              }
            })
            .catch(error => {
              errorHandler(error.response.status, "res_main_marine");
            })
      }
    },
    getChapters: function(param){
      this.inChapterFilter = false;
      if(param != null){
        this.currentChapterParam = param;
      }
      let query = "?filter_param=all&filter_value=all&sort_param=" +   this.currentChapterParam + "&page=" +  this.currentChapterPage + "&size=10";
      api.get("/space/chapter" + query)
          .then(response => {
            if(response.status === 200){
              this.chapters = response.data.content;
              this.totalChapterPages = response.data.totalPages;
              cleanErrorMessage("filter_chapter_error");
            }
          })
          .catch(error => {
            errorHandler(error.response.status, "res_main_chapter");
          })
    },
    getUsersChapters: function(){
      api.get("/space/chapter?filter_param=user&filter_value=id")
          .then(response => {
            if(response.status === 200){
              this.users_chapters_id = response.data;
              cleanErrorMessage("filter_chapter_error");
            }
          })
          .catch(error => {
            errorHandler(error.response.status, "res_main_chapter");
          })
    },
    filterChapter(){
      if(this.validateChapterType() && this.validateChapter()) {
        this.inChapterFilter = true;
        let query = "?filter_param=" + this.filterChapterType + "&filter_value=" + this.filterChapterParam + "sort_param=" +   this.currentChapterParam + "&page=" +  this.currentChapterPage + "&size=10";
        api.get("/space/chapter" + query)
            .then(response => {
              if (response.status === 200) {
                this.chapters = response.data.content;
                if (this.chapters.length === 0) {
                  document.getElementById("filter_chapter_error").innerHTML = "No find chapter with this " + this.filterChapterType;
                }
                this.totalChapterPages = response.data.totalPages;
              }
            })
            .catch(error => {
              errorHandler(error.response.status, "res_main_chapter");
            })
      }
    },
    getCoordinates: function(param){
      if(param != null) {
        this.currentCoordParam = param;
      }
      this.inCoordFilter = false;
      let query = "?filter_param=all&filter_value=all&sort_param=" +   this.currentCoordParam + "&page=" +  this.currentCoordPage + "&size=10";
      api.get("/space/coord" + query)
          .then(response => {
            if(response.status === 200){
              this.coords = response.data.content;
              this.totalCoordPages = response.data.totalPages;
              cleanErrorMessage("filter_coord_error");
            }
          })
          .catch(error => {
            errorHandler(error.response.status, "res_main_coord");
          })
    },
    getUsersCoordinates: function(){
      api.get("/space/coord?filter_param=user&filter_value=id")
          .then(response => {
            if(response.status === 200){
              this.users_coords_id = response.data;
              cleanErrorMessage("filter_coord_error");
            }
          })
          .catch(error => {
            errorHandler(error.response.status, "res_main_coord");
          })
    },
    filterCoord(){
      if(this.validateCoordType() && this.validateCoord()) {
        this.inCoordFilter = true;
        let query = "?filter_param=" + this.filterCoordType + "&filter_value=" + this.filterCoordParam + "sort_param=" +   this.currentCoordParam + "&page=" +  this.currentCoordPage + "&size=10";
        api.get("/space/coord" + query)
            .then(response => {
              if (response.status === 200) {
                this.coords = response.data.content;
                if (this.coords.length === 0) {
                  document.getElementById("filter_coord_error").innerHTML = "No find coord with this " + this.filterCoordType;
                }
                this.totalCoordPages = response.data.totalPages;
              }
            })
            .catch(error => {
              errorHandler(error.response.status, "res_main_coord");
            })
      }
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
    deleteChapter: function(id){
      api.delete("/space/chapter/" + id)
          .then(response => {
            document.getElementById("res_main_chapter").innerHTML = "Deleting chapter was success!";
            this.getChapters();
            this.getSpaceMarines();
          })
          .catch(error => {
            errorHandler(error.response.status, "res_main_chapter");
          })
    },
    deleteCoord: function (id){
      api.delete("/space/coord/" + id)
          .then(response => {
            document.getElementById("res_main_coord").innerHTML = "Deleting coordinates was success!";
            this.getCoordinates();
            this.getSpaceMarines();
          })
          .catch(error => {
            errorHandler(error.response.status, "res_main_coord");
          })
    },
    deleteSpaceMarine: function (id){
      api.delete("/space/" + id)
          .then(response => {
            document.getElementById("res_main_marine").innerHTML = "Deleting space marine was success!";
            this.getSpaceMarines();
            this.getChapters();
            this.getCoordinates();
          })
          .catch(error => {
            errorHandler(error.response.status, "res_main_marine");
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
      this.$store.commit('setSpaceMarine', spaceMarine);
      this.$router.push({name: 'update-space-marine-page'})
    },
    validateChapter(){
      return validateString(this.filterChapterParam, "Chapter " + this.filterChapterType, "chapter_name_error");
    },
    validateChapterType(){
      return validateFilterType(this.filterChapterType, "chapter");
    },
    validateCoordType(){
      return validateFilterType(this.filterCoordType, "coord");
    },
    validateCoord(){
      if(this.filterCoordType === 'x'){
        return validateCoordX(this.filterCoordParam, "coord_x_error");
      } else {
        return validateNumber(this.filterCoordParam, "Coordinate Y", "coord_y_error");
      }
    },
    validateMarineType(){
      return validateFilterType(this.filterMarineType, "marine")
    },
    validateMarine(){
      switch (this.filterMarineType) {
        case 'name':
          return validateString(this.filterMarineParam, "Name",  "name_error");
        case 'coord':
          return validateString(this.filterMarineParam, "Coordinates id", "marine_error");
        case 'chapter':
          return validateString(this.filterMarineParam, "Chapter id", "marine_error");
        case 'health':
          return validateHealth(this.filterMarineParam, "health_error");
      }
    },

    check_marine_owner(id){
      return this.users_spaceMarines_id.includes(id);
    },
    check_chapter_owner(id){
      return this.users_chapters_id.includes(id);
    },
    check_coord_owner(id){
      return this.users_coords_id.includes(id);
    }
  },

}
</script>

<template>
  <span id="res"/>

  <p class="label">Space Marines:</p>
  <p id="res_main_marine" class="error"></p>

  <table border="1" id="space_marine_table">
    <tbody>
    <tr>
    <th><input class="but"  type="submit" @click.prevent="getSpaceMarines('id')" value="ID"/></th>
    <th><input class="but"  type="submit" @click.prevent="getSpaceMarines('name')" value="name"/></th>
    <th><input class="but"  type="submit" @click.prevent="getSpaceMarines('coordinates')" value="coord id"/></th>
    <th>coord X</th>
    <th>coord Y</th>
    <th><input class="but"  type="submit" @click.prevent="getSpaceMarines('creationDate')" value="date and time"/></th>
    <th><input class="but"  type="submit" @click.prevent="getSpaceMarines('chapter')" value="chapter id"/></th>
    <th>chapter name</th>
    <th>chapter parent legion</th>
    <th><input class="but"  type="submit" @click.prevent="getSpaceMarines('health')" value="health"/></th>
    <th><input class="but"  type="submit" @click.prevent="getSpaceMarines('category')" value="category"/></th>
    <th><input class="but"  type="submit" @click.prevent="getSpaceMarines('weaponType')" value="weapon type"/></th>
    <th><input class="but"  type="submit" @click.prevent="getSpaceMarines('meleeWeapon')" value="melee weapon"/></th>
    <th>owner</th>
    </tr>
    <tr v-for="marine in spaceMarines">
      <td>{{marine.id}}</td>
      <td>{{marine.name}}</td>
      <td>{{marine.coordinates.id}}</td>
      <td>{{marine.coordinates.x}}</td>
      <td>{{marine.coordinates.y}}</td>
      <td>{{marine.creationDate}}</td>
      <td>{{marine.chapter.id}}</td>
      <td>{{marine.chapter.name}}</td>
      <td>{{marine.chapter.parentLegion}}</td>
      <td>{{marine.health}}</td>
      <td>{{marine.category}}</td>
      <td>{{marine.weaponType}}</td>
      <td>{{marine.meleeWeapon}}</td>
      <td>{{marine.user.login}}</td>
      <td v-if="check_marine_owner(marine.id)" >
        <input class="but"  type="submit" @click.prevent="deleteSpaceMarine(marine.id)" value="delete"/>
        <input class="but"  type="submit" @click.prevent="updateSpaceMarine(marine)" value="update"/>
      </td>
    </tr>
    </tbody>
  </table>

  <div>
    <span>Filter for space marines:</span>
    <form>
      <select v-model="filterMarineType" @change="validateMarineType">
        <option value="name">name</option>
        <option value="coord">coordinates id</option>
        <option value="chapter">chapter id</option>
        <option value="health">health</option>
      </select>
      <input type="text" v-model="filterMarineParam" @change="validateMarine"/>
      <input class="but" type="submit" @click.prevent="filterSpaceMarine()" value="filter"/>

      <span class="error" id="filter_marine_error"></span>
      <span class="error" id="marine_error"></span>
      <span class="error" id="name_error"></span>
      <span class="error" id="coord_error"></span>
      <span class="error" id="chapter_error"></span>
      <span class="error" id="health_error"></span>

    </form>
    <input class="but" type="button" v-if="inMarineFilter" @click.prevent="getSpaceMarines()" value="delete filter"/>
  </div>

  <div>
    <span>Page number {{currentMarinePage+1}}</span>
    <input class="but"  type="submit" v-if="currentMarinePage > 0" @click.prevent="getPrevPageMarine" value="previous page"/>
    <input class="but"  type="submit" v-if="currentMarinePage + 1 < totalMarinePages" @click.prevent="getNextPageMarine" value="next page"/>
  </div>


  <p class="label">Coordinates:</p>
  <p id="res_main_coord" class="error"></p>
  <table border="1" id="coord_table" v-if="coords.length > 0">
    <tbody>
    <tr>
    <th> <input class="but"  type="submit" @click.prevent="getCoordinates('id')" value="ID"/></th>
    <th> <input class="but"  type="submit" @click.prevent="getCoordinates('x')" value="X"/></th>
    <th> <input class="but"  type="submit" @click.prevent="getCoordinates('y')" value="Y"/></th>
    <th>Owner</th>
    </tr>
    <tr v-for="coord in coords">
      <td>{{coord.id}}</td>
      <td>{{coord.x}}</td>
      <td>{{coord.y}}</td>
      <td>{{coord.user.login}}</td>
      <td v-if="check_coord_owner(coord.id)">
        <input class="but"  type="submit" @click.prevent="deleteCoord(coord.id)" value="delete"/>
        <input class="but"  type="submit" @click.prevent="updateCoord(coord)" value="update"/>
      </td>
    </tr>
    </tbody>
  </table>

  <div>
    <span>Filter for coords:</span>
    <form>
      <select v-model="filterCoordType" @change="validateCoordType">
        <option value="x">X</option>
        <option value="y">Y</option>
      </select>
      <input type="text" v-model="filterCoordParam" @change="validateCoord"/>
      <input class="but" type="submit" @click.prevent="filterCoord()" value="filter"/>

      <span class="error" id="filter_coord_error"></span>
      <span class="error" id="coord_x_error"></span>
      <span class="error" id="coord_y_error"></span>
    </form>
    <input class="but" type="button" v-if="inCoordFilter" @click.prevent="getCoordinates()" value="delete filter"/>
  </div>

  <div>
    <span>Page number {{currentCoordPage+1}}</span>
    <input class="but"  type="submit" v-if="currentCoordPage > 0" @click.prevent="getPrevPageCoordinates" value="previous page"/>
    <input class="but"  type="submit" v-if="currentCoordPage + 1 < totalCoordPages" @click.prevent="getNextPageCoordinates" value="next page"/>
  </div>


  <p class="label">Chapters:</p>
  <p id="res_main_chapter" class="error"></p>
  <table border="1" id="chapter_table">
    <tbody>
    <tr>
    <th> <input class="but"  type="submit" @click.prevent="getChapters('id')" value="ID"/></th>
    <th> <input class="but"  type="submit" @click.prevent="getChapters('name')" value="name"/></th>
    <th> <input class="but"  type="submit" @click.prevent="getChapters('parentLegion')" value="parent legion"/></th>
    <th>owner</th>
    </tr>
    <tr v-for="chapter in chapters">
      <td>{{chapter.id}}</td>
      <td>{{chapter.name}}</td>
      <td>{{chapter.parentLegion}}</td>
      <td>{{chapter.user.login}}</td>
      <td v-if="check_chapter_owner(chapter.id)">
          <input class="but"  type="submit" @click.prevent="deleteChapter(chapter.id)" value="delete"/>
          <input class="but"  type="submit" @click.prevent="updateChapter(chapter)" value="update"/>
      </td>
    </tr>
    </tbody>
  </table>

  <div id="filter">
    <span>Filter for chapter:</span>
    <form>
      <select v-model="filterChapterType" @change="validateChapterType">
        <option value="name">name </option>
        <option value="parentLegion" >parent legion</option>
      </select>
      <input type="text" v-model="filterChapterParam" @change="validateChapter"/>
      <input class="but" type="submit" @click.prevent="filterChapter()" value="filter"/>

      <span class="error" id="filter_chapter_error"></span>
      <span class="error" id="chapter_name_error"></span>
    </form>
    <input class="but" type="button" v-if="inChapterFilter" @click.prevent="getChapters()" value="delete filter"/>
  </div>

  <div>
    <span>Page number {{currentChapterPage+1}}</span>
    <input class="but"  type="submit" v-if="currentChapterPage > 0" @click.prevent="getPrevPageChapter" value="previous page"/>
    <input class="but"  type="submit" v-if="currentChapterPage + 1 < totalChapterPages" @click.prevent="getNextPageChapter" value="next page"/>
  </div>



</template>

<style>
.error input {
  border-color: red;
}
.error {
  color: red;
}


.but{
  background-color: deeppink;
  font-weight: bold;
  padding: 4px 9px 4px;
  font-size: medium;
}
.but:hover, .but:focus{
  background-color: lightpink;
}
</style>