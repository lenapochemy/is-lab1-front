<script>
import {api} from "@/axios.js";
import {errorHandler} from "@/js/utils.js";

export default {
  name: "SpecialComponent",
  data(){
    return{
      callMinSpaceMarine: false,
      minSpaceMarine: {
        id: '',
        name: '',
        coordinates: {
          id: '',
          x: '',
          y: '',
        },
        creationDate: '',
        chapter: {
          id: '',
          name: '',
          parentLegion: ''
        },
        health: '',
        category: '',
        weaponType: null,
        meleeWeapon: null
      },
    }
  },
  methods: {
    getSpaceMarineWithMinChapter(){
      this.callMinSpaceMarine = true;
      api.get("/special/minChapter")
          .then(response => {
            if(response.status === 200){
              this.minSpaceMarine = response.data;
              document.getElementById("res_min").innerHTML = "Find space marine was successful!";
            }
          })
          .catch(error => {
            // document.getElementById("res").innerHTML = error;
            errorHandler(error.response.status, "res_min");
          })
    }
  }
}
</script>

<template>
  <p class="label">Find space marine with minimal chapter id:</p>
  <input class="but"  type="button" @click.prevent="getSpaceMarineWithMinChapter" value="get space marine with min chapter"/>

  <table border="1" id="space_marine_table" v-if="callMinSpaceMarine">
    <thead>
    <th>ID</th>
    <th>name</th>
    <th>coord ID</th>
    <th>coord x</th>
    <th>coord y</th>
    <th>date and time</th>
    <th>chapter ID</th>
    <th>chapter name</th>
    <th>chapter parent legion</th>
    <th>health</th>
    <th>category</th>
    <th>weapon type</th>
    <th>melee weapon</th>
    </thead>
    <tbody>
    <tr>
      <td>{{minSpaceMarine.id}}</td>
      <td>{{minSpaceMarine.name}}</td>
      <td>{{minSpaceMarine.coordinates.id}}</td>
      <td>{{minSpaceMarine.coordinates.x}}</td>
      <td>{{minSpaceMarine.coordinates.y}}</td>
      <td>{{minSpaceMarine.creationDate}}</td>
      <td>{{minSpaceMarine.chapter.id}}</td>
      <td>{{minSpaceMarine.chapter.name}}</td>
      <td>{{minSpaceMarine.chapter.parentLegion}}</td>
      <td>{{minSpaceMarine.health}}</td>
      <td>{{minSpaceMarine.category}}</td>
      <td>{{minSpaceMarine.weaponType}}</td>
      <td>{{minSpaceMarine.meleeWeapon}}</td>
    </tr>
    </tbody>
  </table>

<p id="res_min"/>

</template>

<style scoped>

</style>