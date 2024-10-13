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

</style>