<script>
import {api} from "@/axios.js";
import {errorHandler} from "@/js/utils.js";
import {validateString} from "@/js/validation.js";

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
        api.post("/space/chapter/update", this.chapter)
            .then(response => {
              document.getElementById("res_update_chap").innerHTML = "Update chapter was successful!"
            })
            .catch(error => {
              errorHandler(error.response.status, "res_update_chap");
            })
      }
    },
    validateName(){
      return validateString(this.chapter.name, "Chapter name", "chapter_name_error");
    },
    goToMainPage(){
      this.$router.push({name: 'menu-page'})
    }
  }
}
</script>

<template>


  <form id="chapter">
    <p class="label">Update chapter:</p>
    <b>ID: {{chapter.id}}</b>
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
      <input class="but" type="submit" @click.prevent="update" value="update"/>
    </div>
  </form>
  <p id="res_update_chap"></p>
  <div>
    <input class="but"  type="submit" @click.prevent="goToMainPage" value="back to main page"/>
  </div>
</template>

<style scoped>

</style>