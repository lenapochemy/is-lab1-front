<script>
import {api} from "@/axios.js";
import {errorHandler} from "@/js/utils.js";
import {validateChapterName} from "@/js/validation.js";

export default {
  name: "UpdateChapterComponent",
  data(){
    return {
      chapter: {
        id: '',
        name: '',
        parentLegion: null
      }
    }
  },
  mounted(){
    this.chapter = this.$store.state.chapter;
  },
  methods:{
    update(){
      if(this.validateName()){
        // console.log("in request");
        api.post("/space/updateChapter", this.chapter)
            .then(response => {
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
    goToMainPage(){
      this.$router.push({name: 'main-page'})
    }
  }
}
</script>

<template>
  <span id="res"></span>
  <form id="chapter">
    <span>UPDATE CHAPTER:</span>
    <b>ID: {{chapter.id}}</b>
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
      <input class="but" type="submit" @click.prevent="update" value="update"/>
    </div>
  </form>

  <div>
    <input class="but"  type="submit" @click.prevent="goToMainPage" value="back to main page"/>
  </div>
</template>

<style scoped>

</style>