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
            })
            .catch(error => {
              errorHandler(error.response.status, "res");
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
  <span id="res"></span>
  <form id="chapter">
    <span>CHAPTER:</span>
    <div>
      <span>chapter name:</span>
      <input type="text" v-model="chapter.name" @change="validateName"/>
      <span class="error" id="chapter_name_error"/>
    </div>

    <div>
      <span>chapter parent legion:</span>
      <input type="text" v-model="chapter.parentLegion"/>
    </div>

    <div>
      <input class="but" type="button" @click.prevent="addChapter()" value="create new chapter"/>
    </div>
  </form>

</template>

<style>
</style>