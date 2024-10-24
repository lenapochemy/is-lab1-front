<script >
export default {
  name: "LogOutComponent",
  data(){
    return {
      token: ''
    }
  },
  methods: {
    logout: function (){
      localStorage.removeItem("userToken");
      localStorage.removeItem("userLogin");
      this.$router.push({name: 'start-page'});

    }
  }
}
</script>

<template>
  <button id="out" class="but" @click.prevent="logout">Выйти</button>
  <br>
  <span id="logout"></span>
</template>

<style scoped>

</style>