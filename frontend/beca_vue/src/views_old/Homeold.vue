<template>
  <div>
    <Login v-if="sessionToken == ''"/>
    <MainView v-else/>
  </div>
</template>

<script>
import Login from "../components/Login.vue";
import MainView from "../components/Main.vue";
import { mapWritableState } from 'pinia'
import { useSessionStore } from "../stores/SessionStore"

export default {
  name: "HomeView",
  components: {
    Login,
    MainView
  },
  computed: {
    ...mapWritableState(useSessionStore, ['sessionToken'])
  },

};
</script>
