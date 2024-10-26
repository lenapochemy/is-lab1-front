<script>
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

}
</script>

<template>
  <MinChapterComponent/>
  <br/>
  <NameStartComponent/>
  <br/>
  <GreaterMeleeWeaponComponent/>
  <br/>
  <SpaceMarineToChapterComponent/>
  <br/>
  <CreateNewChapterComponent/>


</template>

<style >
.label{
  color: mediumblue;
  font-size: large;
}
</style>