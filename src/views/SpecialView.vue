<script>
import {defineComponent} from "vue";
import SpecialComponent from "@/components/special/MinChapterComponent.vue";
import AdminComponent from "@/components/AdminComponent.vue";
import SpaceComponent from "@/components/SpaceComponent.vue";
import LogOutComponent from "@/components/LogOutComponent.vue";
import TestComponent from "@/components/TestComponent.vue";
import MinChapterComponent from "@/components/special/MinChapterComponent.vue";
import CreateNewChapterComponent from "@/components/special/CreateNewChapterComponent.vue";
import GreaterMeleeWeaponComponent from "@/components/special/GreaterMeleeWeapon.vue";
import NameStartComponent from "@/components/special/NameStartComponent.vue";
import SpaceMarineToChapterComponent from "@/components/special/SpaceMarineToChapterComponent.vue";

export default {
  components: {
    SpaceMarineToChapterComponent,
    NameStartComponent,
    GreaterMeleeWeaponComponent,
    CreateNewChapterComponent,
    MinChapterComponent
  },
  methods:{
    goToMainPage(){
      this.$router.push({name: 'main-page'})
    },
  }

}
</script>

<template>
  <MinChapterComponent/>
  <NameStartComponent/>
  <GreaterMeleeWeaponComponent/>
  <SpaceMarineToChapterComponent/>
  <CreateNewChapterComponent/>

  <input class="but"  type="submit" @click.prevent="goToMainPage" value="back to main page"/>

</template>

<style scoped>

</style>