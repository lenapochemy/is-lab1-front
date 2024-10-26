<script>
import LogInComponent from "@/components/LogInComponent.vue";
import RegistrationComponent from "@/components/RegistrationComponent.vue";
import TestComponent from "@/components/TestComponent.vue";

export default {
  name: "StartView",
  components: {
    TestComponent,
    LogInComponent,
    RegistrationComponent
  },
  data(){
    return {
      buttons: [{"value": "Registration", "name": "Регистрация"}, {"value": "LogIn", "name": "Вход"}],
      currentButton: "LogIn"
    }
  },
  computed: {
    currentButtonComponent: function(){
      return this.currentButton + "Component";
    }
  }
}
</script>

<template>
  <div class="start-item">
    <button
        v-for="button in buttons"
        v-bind:key="button"
        v-bind:class="['tab-button', {active: currentButton === button.value}]"
        v-on:click="currentButton = button.value"
    >
      {{button.name}}
    </button>
    <component v-bind:is="currentButtonComponent"></component>
  </div>
  <div>
    <TestComponent/>
  </div>
</template>

<style scoped>
.tab-button{
  background-color: lightpink;
  font-weight: bold;
  padding: 4px 9px 4px;
  font-size: large;
  /*margin: 30px 10px;*/
  margin: auto;
}
.tab-button:hover, .tab-button:focus, .tab-button:active{
  background-color: deeppink;
}
</style>