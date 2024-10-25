<script >
import {api} from "@/axios.js";
import {validateNotEmpty} from "@/js/validation.js";

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
                if(this.spaceMarines.length == 0) {
                  document.getElementById("res_melee").innerHTML = "No this space marines";
                  this.callGreater = false;
                } else {
                  this.callGreater = true;
                }
                //

              }
            })
            .catch(error => {
              document.getElementById("res_melee").innerHTML = error;
            })
      }
    },
    validateMeleeWeapon(){
      return validateNotEmpty(this.meleeWeapon, "Melee weapon", "melee");
    }
  }

}
</script>

<template>
  <div>

    <input class="but"  type="button" @click.prevent="getWithGreaterMeleeWeapon" value="get space marine with melee weapon greater than"/>

    <span>choose melee weapon:</span>
    <br/>
    <input type="radio" id="chain" value="CHAIN_AXE" v-model="meleeWeapon" @change="validateMeleeWeapon"/>
    <label for="chain">chain axe</label>
    <br/>
    <input type="radio" id="claw" value="LIGHTING_CLAW" v-model="meleeWeapon" @change="validateMeleeWeapon"/>
    <label for="claw">lighting claw</label>
    <br/>
    <input type="radio" id="blade" value="POWER_BLADE" v-model="meleeWeapon" @change="validateMeleeWeapon"/>
    <label for="blade">power blade</label>
    <span class="error" id="filter_melee_error"></span>
  </div>

  <span id="res_melee"></span>

  <table border="1" id="space_marine_table" v-if="callGreater">
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