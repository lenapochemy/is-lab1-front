<script>

import SpaceComponent from "@/components/SpaceComponent.vue";
import LogOutComponent from "@/components/LogOutComponent.vue";
import SpecialComponent from "@/views/SpecialComponent.vue";
import AddChapterComponent from "@/components/add/AddChapterComponent.vue";
import AddCoordinateComponent from "@/components/add/AddCoordinateComponent.vue";
import AddSpaceMarineComponent from "@/components/add/AddSpaceMarineComponent.vue";
import AdminComponent from "@/components/AdminComponent.vue";
import EditChapterComponent from "@/components/edit/EditChapterComponent.vue";
import EditCoordComponent from "@/components/edit/EditCoordComponent.vue";
import EditSpaceMarineComponent from "@/components/edit/EditSpaceMarineComponent.vue";
import Header from "@/components/Header.vue";
import VisualizationComponent from "@/components/VisualizationComponent.vue";
export default {
  components:{
    Header,
    AdminComponent,
    SpaceComponent,
    LogOutComponent,
    SpecialComponent,
    AddChapterComponent,
    AddCoordinateComponent,
    AddSpaceMarineComponent,
    EditChapterComponent,
    EditCoordComponent,
    EditSpaceMarineComponent,
    VisualizationComponent
  },
  data(){
    return {
      buttons: [{"value": "Admin", "name": "Admin profile"},
          {"value": "Space", "name": "Space marines"},
          {"value": "Special", "name": "Special operation"},
        {"value": "AddCoordinate", "name": "Add coordinates"},
        {"value": "AddChapter", "name": "Add chapter"},
        {"value": "AddSpaceMarine", "name": "Add space marine"},
        {"value": "EditChapter", "name": "Chapter editing info"},
        {"value": "EditCoord", "name": "Coordinates editing info"},
        {"value": "EditSpaceMarine", "name": "Space marine editing info"},
        {"value": "Visualization", "name": "Visualization"}
      ],
      currentButton: "Space"
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
<header>
  <Header/>
  <LogOutComponent/>
</header>
<body>
  <div>

    <button
      v-for="button in buttons"
      v-bind:key="button"
      v-bind:class="['tab-button', {active: currentButton === button.value}]"
      v-on:click="currentButton = button.value">{{button.name}}</button>
    <component v-bind:is="currentButtonComponent"></component>
  </div>
  <br>
  </body>

</template>

<style scoped>
.tab-button{
  background-color: skyblue;
  font-weight: bold;
  padding: 4px 9px 4px;
  font-size: large;
  margin: auto;
}
.tab-button:hover, .tab-button:focus, .tab-button:active{
  background-color: mediumblue;
}
</style>