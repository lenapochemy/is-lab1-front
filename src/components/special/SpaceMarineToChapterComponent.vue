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
      api.get("/space/chapter")
          .then(response => {
            if(response.status === 200){
              // document.getElementById("res").innerHTML = "yes chapter";
              this.chapters = response.data;
            }
          })
          .catch(error => {
            document.getElementById("res_to_chapter").innerHTML = error;
          })
    },
    getAllSpaceMarines(){
      api.get("/space")
          .then(response => {
            if(response.status === 200){
              this.spaceMarines = response.data;
            }
          })
          .catch(error => {
            document.getElementById("res_to_chapter").innerHTML = error;
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
              document.getElementById("res_to_chapter").innerHTML = "Space marine added to chapter";
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
  <div>
    <span>Chapter:</span>
    <select v-model="chapter" @change="validateChapter">
      <option v-for="chapter in chapters" v-bind:value="chapter" >ID: {{chapter.id}}, name: {{chapter.name}}, parent legion: {{chapter.parentLegion}}</option>
    </select>

    <span class="error" id="filter_chapter_error"/>
  </div>

  <div>
    <span>Space marine:</span>
    <select v-model="marine" @change="validateSpaceMarine">
      <option v-for="spaceMarine in spaceMarines" v-bind:value="spaceMarine" >
        ID: {{spaceMarine.id}}, name: {{spaceMarine.name}}, coord ID: {{spaceMarine.coordinates.id}}, date: {{spaceMarine.creationDate}}, chapter ID: {{spaceMarine.chapter.id}}, health: {{spaceMarine.health}}, category: {{spaceMarine.category}}, weapon type: {{spaceMarine.weaponType}}, melee weapon: {{spaceMarine.meleeWeapon}}</option>
    </select>

    <span class="error" id="filter_marine_error"/>
  </div>
  <input class="but"  type="button" @click.prevent="addSpaceMarineToChapter" value="add space marine to this chapter"/>
  <span id="res_to_chapter"></span>
</template>

<style scoped>

</style>