<script>

import Header from '@/components/Header.vue';
// import RegistrationComponent from "@/components/RegistrationComponent.vue";
import StartView from "@/views/StartView.vue";

export default {
  name: 'App',
  components: {
    StartView,
    Header
  },
  data(){
    return {
      headerParams: {
        title: "Лабораторная работа 1",
        name: "Русакова Лена",
        group: "P3317",
        variant: "367519"
      }
    }
  }
}

</script>

<template>
  <main>
    <router-view/>
  </main>
</template>

<style>

.but{
  background-color: deeppink;
  font-weight: bold;
  padding: 4px 9px 4px;
  font-size: medium;
  //margin-top: 30px;
  //margin-bottom: 30px;
}
.but:hover, .but:focus{
  background-color: lightpink;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
