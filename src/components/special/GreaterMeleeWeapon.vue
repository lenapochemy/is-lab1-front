<script >
import {api} from "@/axios.js";
import {validateString} from "@/js/validation.js";
import {errorHandler} from "@/js/utils.js";

export default {
  name: "GreaterMeleeWeaponComponent",
  data() {
    return {
      callGreater: false,
      spaceMarines: [],
      meleeWeapon: ''
    }
  },
  methods: {
    getWithGreaterMeleeWeapon(){
      if(this.validateMeleeWeapon()) {
        api.get("/special/greaterMeleeWeapon/" + this.meleeWeapon)
            .then(response => {
              if (response.status === 200) {
                this.spaceMarines = response.data;
                if(this.spaceMarines.length === 0) {
                  document.getElementById("res_melee").innerHTML = "No this space marines";
                  this.callGreater = false;
                } else {
                  document.getElementById("res_melee").innerHTML = "Find space marines was successful!";
                  this.callGreater = true;
                }
                //

              }
            })
            .catch(error => {
              // document.getElementById("res_melee").innerHTML = error;
              errorHandler(error.response.status, "res_melee");
            })
      }
    },
    validateMeleeWeapon(){
      return validateString(this.meleeWeapon, "Melee weapon", "melee_error");
    }
  }

}
</script>

<template>
  <p class="label">Find all space marine with greater melee weapon:</p>
  <div>

    <p>Choose melee weapon:</p>
    <input type="radio" id="chain" value="CHAIN_AXE" v-model="meleeWeapon" @change="validateMeleeWeapon"/>
    <label for="chain">chain axe</label>
    <br/>
    <input type="radio" id="claw" value="LIGHTING_CLAW" v-model="meleeWeapon" @change="validateMeleeWeapon"/>
    <label for="claw">lighting claw</label>
    <br/>
    <input type="radio" id="blade" value="POWER_BLADE" v-model="meleeWeapon" @change="validateMeleeWeapon"/>
    <label for="blade">power blade</label>
    <span class="error" id="melee_error"></span>
  </div>

  <input class="but"  type="button" @click.prevent="getWithGreaterMeleeWeapon" value="get space marine with greater melee weapon"/>

  <p id="res_melee"></p>

  <table border="1" id="space_marine_table" v-if="callGreater">
    <tbody>
    <tr>
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
    </tr>
    <tr v-for="marine in spaceMarines">
      <td>{{marine.id}}</td>
      <td>{{marine.name}}</td>
      <td>{{marine.coordinates.id}}</td>
      <td>{{marine.coordinates.x}}</td>
      <td>{{marine.coordinates.y}}</td>
      <td>{{marine.creationDate}}</td>
      <td>{{marine.chapter.id}}</td>
      <td>{{marine.chapter.name}}</td>
      <td>{{marine.chapter.parentLegion}}</td>
      <td>{{marine.health}}</td>
      <td>{{marine.category}}</td>
      <td>{{marine.weaponType}}</td>
      <td>{{marine.meleeWeapon}}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>