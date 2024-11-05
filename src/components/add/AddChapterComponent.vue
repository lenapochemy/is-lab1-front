<script>
import {api} from "@/axios.js";
import {errorHandler} from "@/js/utils.js";
import {validateString} from "@/js/validation.js";

export default {
  name: "AddChapterComponent",
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
        api.post("/space/chapter/create", this.chapter)
            .then(response => {
              document.getElementById("res_add_chap").innerHTML = "Adding chapter was successful!"
            })
            .catch(error => {
              errorHandler(error.response.status, "res_add_chap");
            })
      }
    },
    validateName(){
      return validateString(this.chapter.name, "Chapter name", "chapter_name_error");
    },
  }
}
</script>

<template>
  <form id="chapter">
    <span>ADD CHAPTER:</span>
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
      <input class="but" type="submit" @click.prevent="addChapter()" value="add"/>
    </div>
  </form>
  <p id="res_add_chap"></p>
</template>

<style>
.error {
  color: red;
}
</style>