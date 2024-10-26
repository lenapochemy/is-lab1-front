<script>

import SpaceComponent from "@/components/SpaceComponent.vue";
import LogOutComponent from "@/components/LogOutComponent.vue";
import SpecialComponent from "@/views/SpecialComponent.vue";
import AddChapterComponent from "@/components/AddChapterComponent.vue";
import AddCoordinateComponent from "@/components/AddCoordinateComponent.vue";
import AddSpaceMarineComponent from "@/components/AddSpaceMarineComponent.vue";
import AdminComponent from "@/components/AdminComponent.vue";

export default {
  components:{
    AdminComponent,
    SpaceComponent,
    LogOutComponent,
    SpecialComponent,
    AddChapterComponent,
    AddCoordinateComponent,
    AddSpaceMarineComponent
  },
  data(){
    return {
      buttons: [{"value": "Admin", "name": "Admin profile"},
          {"value": "Space", "name": "Space marines"},
          {"value": "Special", "name": "Special operation"},
        {"value": "AddCoordinate", "name": "Add coordinates"},
        {"value": "AddChapter", "name": "Add chapter"},
        {"value": "AddSpaceMarine", "name": "Add space marine"},
      ],
      currentButton: "Admin",
    }
  },
  computed: {
    currentButtonComponent() {
      return this.currentButton + "Component";
    }

}
}

</script>

<template>


  <div>
    <LogOutComponent/>
    <button
      v-for="button in buttons"
      v-bind:key="button"
      v-bind:class="['tab-button', {active: currentButton === button.value}]"
      v-on:click="currentButton = button.value">{{button.name}}</button>
    <component v-bind:is="currentButtonComponent"></component>
  </div>
  <br>


</template>

<style scoped>
.tab-button{
  background-color: skyblue;
  font-weight: bold;
  padding: 4px 9px 4px;
  font-size: large;
  /*margin: 30px 10px;*/
  margin: auto;
}
.tab-button:hover, .tab-button:focus, .tab-button:active{
  background-color: mediumblue;
}
</style>