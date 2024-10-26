<script>

import {api} from "@/axios.js";
import {cleanErrorMessage, errorHandler} from "@/js/utils.js";
import UpdateComponent from "@/components/UpdateCoordinatesComponent.vue";
import {
  validateCategory,
  validateChapterName,
  validateCoordX,
  validateCoordY,
  validateFilterType, validateHealth,
  validateName, validateNotEmpty, validateNumber
} from "@/js/validation.js";
import AdminComponent from "@/components/AdminComponent.vue";

export default{
  name: "SpaceComponent",
  components: {AdminComponent, UpdateComponent},
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

      filterChapterType: '',
      filterChapterParam: '',
      inChapterFilter: false,

      filterCoordType: '',
      filterCoordParam: '',
      inCoordFilter: false,

      filterMarineType: '',
      filterMarineParam: '',
      inMarineFilter: false,

      userLogin: '',
      admin: false,

    }
  },
  mounted() {
    this.admin = this.$store.state.admin;
    this.token = localStorage.getItem("userToken");
    this.userLogin = localStorage.getItem("userLogin")
    this.getCoordinates();
    this.getChapters();
    this.getSpaceMarines();
    this.getRole();
    setInterval(this.getCoordinates, 5000);
    setInterval(this.getChapters, 5000);
    setInterval(this.getSpaceMarines, 5000);
  },
  methods: {
    getSpaceMarines: function(param){
      this.inMarineFilter = false;
      if(param != null){
        this.currentMarineParam = param;
      }
      api.get("/space/" + this.currentMarineParam + "/" + this.currentMarinePage)
          .then(response => {
            if(response.status === 200){
              this.spaceMarines = response.data.content;
              this.totalMarinePages = response.data.totalPages;
              cleanErrorMessage("filter_marine_error");
            }
          })
          .catch(error => {
            errorHandler(error.response.status, "res_main_marine");          })
    },
    filterSpaceMarine(){
      if(this.validateMarineType() && this.validateMarine()) {
        this.inMarineFilter = true;
        api.get("/space/by" + this.filterMarineType + "/" + this.filterMarineParam + "/" + this.currentMarineParam + "/" + this.currentMarinePage)
            .then(response => {
              if (response.status === 200) {
                this.spaceMarines = response.data.content;
                if (this.spaceMarines.length == 0) {
                  document.getElementById("filter_marine_error").innerHTML = "No find chapter with this " + this.filterMarineType;
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
      api.get("/space/chapter/" + this.currentChapterParam + "/" + this.currentChapterPage)
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
    filterChapter(){
      if(this.validateChapter() && this.validateChapterType()) {
        this.inChapterFilter = true;
        let url = "/space/chapter/"
        if (this.filterChapterType == "name") {
          url += "byName/"
        } else {
          url += "byParentLegion/"
        }
        api.get(url + this.filterChapterParam + "/" + this.currentChapterParam + "/" + this.currentChapterPage)
            .then(response => {
              if (response.status === 200) {
                this.chapters = response.data.content;
                if (this.chapters.length == 0) {
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
      api.get("/space/coord/" + this.currentCoordParam + "/" + this.currentCoordPage)
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
    filterCoord(){
      if(this.validateCoordType() && this.validateCoord()) {
        this.inCoordFilter = true;
        let url = "/space/coord/"
        if (this.filterCoordType == "x") {
          url += "byX/"
        } else {
          url += "byY/"
        }
        api.get(url + this.filterCoordParam + "/" + this.currentCoordParam + "/" + this.currentCoordPage)
            .then(response => {
              if (response.status === 200) {
                this.coords = response.data.content;
                if (this.coords.length == 0) {
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
      return validateChapterName(this.filterChapterParam);
    },
    validateChapterType(){
      return validateFilterType(this.filterChapterType, "chapter");
    },
    validateCoordType(){
      return validateFilterType(this.filterCoordType, "coord");
    },
    validateCoord(){
      if(this.filterCoordType == 'x'){
        return validateCoordX(this.filterCoordParam);
      } else {
        return validateCoordY(this.filterCoordParam);
      }
    },
    validateMarineType(){
      return validateFilterType(this.filterMarineType, "marine")
    },
    validateMarine(){
      switch (this.filterMarineType){
        case 'Name':
          return validateName(this.filterMarineParam);
        case 'Coord':
          return validateNumber(this.filterMarineParam, "Coordinates id", "marine");
        case 'Date':
          return validateNotEmpty(this.filterMarineParam, "Date", "marine");
        case 'Chapter':
          return validateNumber(this.filterMarineParam, "Chapter", "marine");
        case 'Health':
          return validateHealth(this.filterMarineParam)
        case 'Category':
          return validateCategory(this.filterMarineParam);
        case 'Weapon':
          return validateNotEmpty(this.filterMarineParam, "Weapon", "marine");
        case 'MeleeWeapon':
          return validateNotEmpty(this.filterMarineParam, "Melee weapon", "marine");
      }
    },
    getRole(){
      this.admin = this.$store.state.admin;
    },
  },

}
</script>

<template>
  <span id="res"/>

  <p class="label">Coordinates:</p>
  <p id="res_main_coord" class="error"></p>
  <table border="1" id="coord_table" v-if="coords.length > 0">
    <thead>
    <th> <input class="but"  type="submit" @click.prevent="getCoordinates('id')" value="ID"/></th>
    <th> <input class="but"  type="submit" @click.prevent="getCoordinates('x')" value="X"/></th>
    <th> <input class="but"  type="submit" @click.prevent="getCoordinates('y')" value="Y"/></th>
    <th>Owner</th>
    </thead>
    <tbody>
    <tr v-for="coord in coords">
      <td>{{coord.id}}</td>
      <td>{{coord.x}}</td>
      <td>{{coord.y}}</td>
      <td>{{coord.user.login}}</td>
      <td v-if="admin || coord.user.login === this.userLogin">
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
    <thead>
    <th> <input class="but"  type="submit" @click.prevent="getChapters('id')" value="ID"/></th>
    <th> <input class="but"  type="submit" @click.prevent="getChapters('name')" value="name"/></th>
    <th> <input class="but"  type="submit" @click.prevent="getChapters('parentLegion')" value="parent legion"/></th>
    <th>owner</th>
    </thead>
    <tbody>
    <tr v-for="chapter in chapters">
      <td>{{chapter.id}}</td>
      <td>{{chapter.name}}</td>
      <td>{{chapter.parentLegion}}</td>
      <td>{{chapter.user.login}}</td>
      <td v-if="admin || chapter.user.login === this.userLogin">
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


  <p class="label">Space Marines:</p>
  <p id="res_main_marine" class="error"></p>

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
    <th>owner</th>
    </thead>
    <tbody>
    <tr v-for="marine in spaceMarines">
      <td>{{marine.id}}</td>
      <td>{{marine.name}}</td>
      <td>{{marine.coordinates.id}}</td>
      <td>{{marine.creationDate}}</td>
      <td>{{marine.chapter.id}}</td>
      <td>{{marine.health}}</td>
      <td>{{marine.category}}</td>
      <td>{{marine.weaponType}}</td>
      <td>{{marine.meleeWeapon}}</td>
      <td>{{marine.user.login}}</td>
      <td v-if="admin || marine.user.login === this.userLogin">
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
        <option value="Name">name</option>
        <option value="Coord">coordinates id</option>
        <option value="Chapter">chapter id</option>
        <option value="Health">health</option>
        <option value="Category">category</option>
      </select>
      <input type="text" v-model="filterMarineParam" @change="validateMarine"/>
      <input class="but" type="submit" @click.prevent="filterSpaceMarine()" value="filter"/>

      <span class="error" id="filter_marine_error"></span>
      <span class="error" id="marine_error"></span>
      <span class="error" id="name_error"></span>
      <span class="error" id="coord_error"></span>
      <span class="error" id="chapter_error"></span>
      <span class="error" id="health_error"></span>
      <span class="error" id="category_error"></span>

    </form>
    <input class="but" type="button" v-if="inMarineFilter" @click.prevent="getSpaceMarines()" value="delete filter"/>
  </div>

  <div>
    <span>Page number {{currentMarinePage+1}}</span>
    <input class="but"  type="submit" v-if="currentMarinePage > 0" @click.prevent="getPrevPageMarine" value="previous page"/>
    <input class="but"  type="submit" v-if="currentMarinePage + 1 < totalMarinePages" @click.prevent="getNextPageMarine" value="next page"/>
  </div>

</template>

<style scoped>
.error input {
  border-color: red;
}
.error {
  color: red;
}
.my {
  color: cornflowerblue;
}
.notMy {
  color: lightyellow;
}
</style>