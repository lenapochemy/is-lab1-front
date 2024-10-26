<script>
import {api} from "@/axios.js";
import {errorHandler} from "@/js/utils.js";
import {validateChapterName} from "@/js/validation.js";

export default {
  name: "CreateNewChapterComponent",
  data(){
    return {
      chapter: {
        name: '',
        parentLegion: null
      }
    }
  },
  methods: {
    addChapter: function() {
      if(this.validateName()) {
        api.post("/special/newChapter", this.chapter)
            .then(response => {
              document.getElementById("res_new_chapter").innerHTML = "Create new chapter was successful!";
            })
            .catch(error => {
              errorHandler(error.response.status, "res_new_chapter");
            })
      }
    },
    validateName(){
      return validateChapterName(this.chapter.name);
    },

  }
}
</script>

<template>
  <p class="label">Create new chapter:</p>

  <form id="chapter">
    <div>
      <label for="write_name">chapter name:</label>
      <input id="write_name" type="text" v-model="chapter.name" @change="validateName"/>
      <span class="error" id="chapter_name_error"/>
    </div>

    <div>
      <label for="write_parent">chapter parent legion:</label>
      <input id="write_parent" type="text" v-model="chapter.parentLegion"/>
    </div>

    <div>
      <input class="but" type="button" @click.prevent="addChapter()" value="create new chapter"/>
    </div>
  </form>

  <p id="res_new_chapter"></p>
</template>

<style>
</style>