<script>
import {api} from "@/axios.js";
import {validateString} from "@/js/validation.js";
import {errorHandler} from "@/js/utils.js";

export default {
  data(){
    return {
      chapters: [],
      chapter: null,
      editChapterInfo : [],
    }
  },
  mounted() {
    this.getAllChapters();
  },
  methods: {
    getAllChapters(){
      api.get("/space/chapter?filter_param=all")
          .then(response => {
            if(response.status === 200){
              this.chapters = response.data;
            }
          })
          .catch(error => {
            document.getElementById("res_edit_chapter").innerHTML = error;
          })
    },
    validateChapter(){
      return validateString(this.chapter, "Chapter", "chapter_error");
    },
    getEditInfo: function() {
      if(this.validateChapter()) {
        api.get("/edit/chapter/" + this.chapter.id)
            .then(response => {
              this.editChapterInfo = response.data;
            })
            .catch(error => {
              errorHandler(error.response.status, "res_edit_chapter");
            })
      }
    },
  }
}
</script>

<template>
  <div>
    <span>Chapter:</span>
    <select v-model="chapter" @change="validateChapter">
      <option v-for="chapter in chapters" v-bind:value="chapter" >ID: {{chapter.id}}, name: {{chapter.name}}, parent legion: {{chapter.parentLegion}}</option>
    </select>
    <span class="error" id="chapter_error"/>
  </div>

  <input class="but"  type="submit" @click.prevent="getEditInfo()" value="get info"/>

  <table border="1" id="chapter_table">
    <tbody>
    <tr>
    <th>chapter id</th>
    <th>user login</th>
    <th>date</th>
    <th>type</th>
    </tr>
    <tr v-for="chap in editChapterInfo">
      <td>{{chap.chapter.id}}</td>
      <td>{{chap.user.login}}</td>
      <td>{{chap.date}}</td>
      <td>{{chap.type}}</td>
    </tr>
    </tbody>
  </table>


</template>

<style scoped>

</style>