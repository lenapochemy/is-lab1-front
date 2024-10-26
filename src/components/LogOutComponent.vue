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
.but{
  background-color: blueviolet;
  font-weight: bold;
  padding: 4px 9px 4px;
  font-size: medium;
  //margin-top: 30px;
  //margin-bottom: 30px;
}
.but:hover, .but:focus{
  background-color: mediumpurple;
}
</style>