<template>
  <div class="">
    <nav>
      <!-- Componente visual para el navbar -->
      <NavBar />
    </nav>
    <!-- Renderizar vista dependiendo la ruta -->
    <router-view /> 
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import { mapWritableState } from 'pinia'
import { useSessionStore } from "./stores/SessionStore"

export default {
  components: {
    NavBar
  },
  computed: {
    ...mapWritableState(useSessionStore, ['sessionToken'])
  },
  created() {
    // take token
    let s_token = localStorage.getItem("token")
    this.sessionToken = s_token ? s_token : ""
  },
}

</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; 
  margin-top: 60px;
} */
</style>
