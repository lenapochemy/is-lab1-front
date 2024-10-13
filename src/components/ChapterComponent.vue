<script>

import {api} from "@/axios.js";
import {errorHandler} from "@/js/errorHandler.js";


export default {
  name: "ChapterComponent",
  data(){
    return {
      chapter: {
        id: '',
        name: '',
        parentLegion: ''
      },
      chapters: []
      // chapId: []
    }
  },
  methods: {
    getChapters: function(){
      api.get("/space/getChapter")
          .then(response => {
            if(response.status === 200){
              document.getElementById("res").innerHTML = "yes chapter";
              this.chapters = response.data;
              // $emit('update:modelValue')
              // this.idList();
              // localStorage.setItem("chapters", this.chapters);
              // console.log("chapters in get response" + this.chapters);
              // console.log("chapters in local storage" + localStorage.getItem("chapters"));
            }
          })
          .catch(error => {
            document.getElementById("res").innerHTML = error;
          })

    },
    addChapter: function() {
      api.post("/space/newChapter", this.chapter, {
        headers: {
          "Content-Type" : "application/json"
        }
      })
          .then(response => {
            this.getChapters();
            document.getElementById("res").innerHTML = "ura add";
          })
          .catch(error => {
            errorHandler(error.response.status, "res");
          })
    },
    // idList: function (){
    //   this.chapId = [];
    //   for (chap in this.chapters){
    //     console.log(chap);
    //     console.log(chap.id);
    //     this.chapId.push(chap.id);
    //   }
    //   console.log(this.chapId);
    //   localStorage.setItem("chapId", this.chapId);
    //   console.log(localStorage.getItem("chapId"))
    // }
  },
  mounted() {
    this.getChapters();
  }
}
</script>

<template>
  <form @submit.prevent="getChapters">
    <input class="but" type="submit" value="get chapters">
  </form>

  <table border="1" id="chapter_table">
    <thead>
    <th>id</th>
    <th>name</th>
    <th>parent legion</th>
    </thead>
    <tbody>
    <tr v-for="chapter in chapters">
      <td>{{chapter.id}}</td>
      <td>{{chapter.name}}</td>
      <td>{{chapter.parentLegion}}</td>
    </tr>
    </tbody>
  </table>



  <form id="chapter">
    <div>
      <span>Chapter:</span>
      <select v-model="chapter.id">
        <option v-for="chapter in chapters" v-bind:value="chapter.id">{{chapter.name}} {{chapter.parentLegion}}</option>
      </select>
    </div>

    <span>CHAPTER:</span>
    <div>
      <span>chapter name:</span>
      <input type="text" v-model="chapter.name"/>
    </div>

    <div>
      <span>chapter parent legion:</span>
      <input type="text" v-model="chapter.parentLegion"/>
    </div>

    <div>
      <input type="submit" @click.prevent="addChapter()" value="add"/>
    </div>
  </form>
</template>

<style scoped>

</style>