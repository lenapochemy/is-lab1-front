<script >
import {defineComponent} from "vue";
import TestComponent from "@/components/TestComponent.vue";
import LogOutComponent from "@/components/LogOutComponent.vue";
import SpaceComponent from "@/components/SpaceComponent.vue";
import AdminComponent from "@/components/AdminComponent.vue";
import SpecialComponent from "@/components/special/MinChapterComponent.vue";

export default defineComponent({
  components: {
    SpecialComponent,
    AdminComponent,
    SpaceComponent,
    LogOutComponent,
    TestComponent}
})
</script>

<template>
<!--  <SpecialComponent/>-->
  <TestComponent/>
  <AdminComponent/>
  <SpaceComponent/>
  <LogOutComponent/>
</template>

<style scoped>

</style>