<script>
import {api} from "@/axios.js";
import {validateNotEmpty} from "@/js/validation.js";
import {errorHandler} from "@/js/utils.js";

export default {
  name: "SpaceMarineToChapterComponent",
  data() {
    return {
      spaceMarines: [],
      chapters: [],
      chapter: null,
      marine: null,
    }
  },
  mounted() {
    this.getAllChapters();
    this.getAllSpaceMarines();
  },
  methods: {
    getAllChapters(){
      api.get("/space/chapter/all")
          .then(response => {
            if(response.status === 200){
              this.chapters = response.data;
            }
          })
          .catch(error => {
            errorHandler(error.response.status, "res_to_chapter");
          })
    },
    getAllSpaceMarines(){
      api.get("/space/all")
          .then(response => {
            if(response.status === 200){
              this.spaceMarines = response.data;
            }
          })
          .catch(error => {
            errorHandler(error.response.status, "res_to_chapter");
          })
    },
    validateChapter(){
      return validateNotEmpty(this.chapter, "Chapter", "chapter");
    },
    validateSpaceMarine(){
      return validateNotEmpty(this.marine, "Space marine", "marine");
    },
    addSpaceMarineToChapter(){
      if(this.validateSpaceMarine() && this.validateChapter()) {
        api.post("/special/spaceMarineToChapter/" + this.chapter.id, this.marine)
            .then(response => {
              document.getElementById("res_to_chapter").innerHTML = "Space marine added to chapter successful!";
            })
            .catch(error => {
              errorHandler(error.response.status, "res_to_chapter");
            })
      }
    }
  }
}
</script>

<template>
  <p class="label">Add space marine to chapter:</p>
  <div>
    <label for="choose_chapter">Choose chapter:</label>
    <select id="choose_chapter" v-model="chapter" @change="validateChapter">
      <option v-for="chapter in chapters" v-bind:value="chapter" >ID: {{chapter.id}}, name: {{chapter.name}}, parent legion: {{chapter.parentLegion}}</option>
    </select>

    <span class="error" id="filter_chapter_error"/>
  </div>

  <div>
    <label for="choose_marine">Choose space marine:</label>
    <select id="choose_marine" v-model="marine" @change="validateSpaceMarine">
      <option v-for="spaceMarine in spaceMarines" v-bind:value="spaceMarine" >
        ID: {{spaceMarine.id}}, name: {{spaceMarine.name}}, coord ID: {{spaceMarine.coordinates.id}}, date: {{spaceMarine.creationDate}}, chapter ID: {{spaceMarine.chapter.id}}, health: {{spaceMarine.health}}, category: {{spaceMarine.category}}, weapon type: {{spaceMarine.weaponType}}, melee weapon: {{spaceMarine.meleeWeapon}}</option>
    </select>

    <span class="error" id="filter_marine_error"/>
  </div>

  <input class="but"  type="button" @click.prevent="addSpaceMarineToChapter" value="add space marine to chapter"/>
  <p id="res_to_chapter"></p>
</template>

<style scoped>

</style>