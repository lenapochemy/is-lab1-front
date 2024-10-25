<script >
import {defineComponent} from "vue";
import TestComponent from "@/components/TestComponent.vue";
import LogOutComponent from "@/components/LogOutComponent.vue";
import SpaceComponent from "@/components/SpaceComponent.vue";
import AdminComponent from "@/components/AdminComponent.vue";

export default defineComponent({
  components: {
    AdminComponent,
    SpaceComponent,
    LogOutComponent,
    TestComponent}
})
</script>

<template>
  <TestComponent/>
  <AdminComponent/>
  <SpaceComponent/>
  <LogOutComponent/>
</template>

<style scoped>

</style>