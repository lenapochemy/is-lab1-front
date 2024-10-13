<script>
import {api} from '@/axios.js'

export default {
  name: "TestComponent",
  methods: {
    hello: function(){
      api.get("/space/hello")
          .then(response => {
            if(response.status === 200){
              document.getElementById("res").innerHTML = "uraura";
            }
          })
          .catch(error => {
            document.getElementById("res").innerHTML = error;
          })

    }
  }
}
</script>

<template>
  <form @submit.prevent="hello">
  <input class="but" type="submit" value="hello">
  </form>
  <span id="res"></span>
</template>

<style scoped>

</style>