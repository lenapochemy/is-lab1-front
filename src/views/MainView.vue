<script >
import {defineComponent} from "vue";
import TestComponent from "@/components/TestComponent.vue";
import LogOutComponent from "@/components/LogOutComponent.vue";
import GetComponent from "@/components/GetComponent.vue";
import AddComponent from "@/components/AddComponent.vue";
import ChapterComponent from "@/components/ChapterComponent.vue";
import CoordinatesComponent from "@/components/CoordinatesComponent.vue";
import SpaceMarineComponent from "@/components/SpaceMarineComponent.vue";
import SpaceComponent from "@/components/SpaceComponent.vue";

export default defineComponent({
  components: {
    SpaceComponent,
    SpaceMarineComponent,
    CoordinatesComponent, ChapterComponent, AddComponent, GetComponent, LogOutComponent, TestComponent}
})
</script>

<template>
  <TestComponent/>
  <SpaceComponent/>
<!--  <ChapterComponent/>-->
<!--  <CoordinatesComponent/>-->
<!--  <SpaceMarineComponent/>-->
<!--  <GetComponent/>-->
<!--  <AddComponent/>-->
  <LogOutComponent/>
</template>

<style scoped>

</style>