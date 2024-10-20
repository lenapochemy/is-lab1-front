<script >
import {defineComponent} from "vue";
import TestComponent from "@/components/TestComponent.vue";
import LogOutComponent from "@/components/LogOutComponent.vue";
import SpaceComponent from "@/components/SpaceComponent.vue";

export default defineComponent({
  components: {
    SpaceComponent,
    LogOutComponent,
    TestComponent}
})
</script>

<template>
  <TestComponent/>
  <SpaceComponent/>
  <LogOutComponent/>
</template>

<style scoped>

</style>