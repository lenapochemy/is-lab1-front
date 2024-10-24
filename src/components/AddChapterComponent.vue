<script>
import {api} from "@/axios.js";
import {errorHandler} from "@/js/utils.js";
import {validateChapterName} from "@/js/validation.js";

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
              document.getElementById("res").innerHTML = "ura add";
              // this.getChapters();
              this.$router.push({name: 'main-page'})
            })
            .catch(error => {
              errorHandler(error.response.status, "res");
            })
      }
    },
    validateName(){
      return validateChapterName(this.chapter.name);
    },
    // validateChapterName(){
    //   if(this.chapter.name == ""){
    //     createErrorMessage("Chapter name can't be empty", "chapter_name_error");
    //     return false;
    //   } else {
    //     cleanErrorMessage("chapter_name_error");
    //     return true;
    //   }
    // },
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
      <input type="text" v-model="chapter.name" @change="validateName"/>
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
    <input class="but"  type="submit" @click.prevent="goToMainPage" value="back to main page"/>
  </div>
</template>

<style>
.error {
  color: red;
}
</style>