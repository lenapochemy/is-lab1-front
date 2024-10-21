<script>
import {api} from "@/axios.js";
import {errorHandler} from "@/js/utils.js";
import {createErrorMessage, cleanErrorMessage} from "@/js/utils.js";

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
      if(this.validateChapterName()) {
        api.post("/space/newChapter", this.chapter, {
          headers: {
            "Content-Type": "application/json"
          }
        })
            .then(response => {
              document.getElementById("res").innerHTML = "ura add";
              // this.getChapters();
              this.$router.push({name: 'main-page'})
            })
            .catch(error => {
              errorHandler(error.response.status, "res");
            })
      }
    },
    validateChapterName(){
      if(this.chapter.name == ""){
        createErrorMessage("Chapter name can't be empty", "chapter_name_error");
        return false;
      } else {
        cleanErrorMessage("chapter_name_error");
        return true;
      }
    },
    goToMainPage(){
      this.$router.push({name: 'main-page'})
    }
  }
}
</script>

<template>
  <span id="res"></span>
  <form id="chapter">
    <span>CHAPTER:</span>
    <div>
      <span>chapter name:</span>
      <input type="text" v-model="chapter.name" @change="validateChapterName"/>
      <span class="error" id="chapter_name_error"/>
    </div>

    <div>
      <span>chapter parent legion:</span>
      <input type="text" v-model="chapter.parentLegion"/>
      <!--      <span id="chapter_parent_error"/>-->
    </div>

    <div>
      <input class="but" type="submit" @click.prevent="addChapter()" value="add"/>
    </div>
  </form>

  <div>
    <form @submit.prevent="goToMainPage">
      <input class="but" type="submit" value="back to main page">
    </form>
  </div>
</template>

<style>
.error {
  color: red;
}
</style>