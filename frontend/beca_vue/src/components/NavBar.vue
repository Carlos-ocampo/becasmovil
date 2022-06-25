<template>

  <nav class="bg-base border-base-200 sm:px-4 py-2.5 rounded  fixed navbar bg-base-100 px-3">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <a href="https://flowbite.com" class="flex items-center">
        <router-link to="/" class="normal-case self-center text-xl font-semibold whitespace-nowrap">Becas University
        </router-link>
      </a>
      <button data-collapse-toggle="mobile-menu" type="button" @click="menuShow = !menuShow"
        class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
        aria-controls="mobile-menu" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        
        <svg class="w-6 h-6" fill="currentColor"  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"></path>
        </svg>
        
      </button>
      <div :class="{'hidden':!menuShow}" class=" w-full md:block md:w-auto" id="mobile-menu">
        <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
          <li
            class="block py-2 pr-4 pl-3 text-gray-700 border-b border-secundary-focus  hover:bg-yellow-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0"
            :class="{ 'text-primary': $route.name == 'becas' }" v-if="!sessionToken == ''"
            @click="menuShow=false">
            <router-link class="block" to="/becas"> becas </router-link>
          </li>
          <li
            class="block py-2 pr-4 pl-3 text-gray-700 border-b border-secundary-focus  hover:bg-yellow-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0"
            :class="{ 'text-primary': $route.name == 'universidades' }" v-if="!sessionToken == ''"
            @click="menuShow=false">
            <router-link class="block" to="/universidades"> Universidades </router-link>
          </li>

          <li
            class="block py-2 pr-4 pl-3 text-gray-700 border-b border-secundary-focus  hover:bg-yellow-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0"
            :class="{ 'text-primary': $route.name == 'Paises' }" v-if="!sessionToken == ''"
            @click="menuShow=false">
            <router-link class="block" to="/paises"> Paises </router-link>
          </li>

          <li
            class="block py-2 pr-4 pl-3 text-gray-700 border-b border-secundary-focus   hover:bg-yellow-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0"
            :class="{ 'text-primary': $route.name == 'Home' }"
            @click="menuShow=false">
            <router-link class="block" to="/">Home </router-link>
          </li>

          <li
            class="block py-2 pr-4 pl-3 text-gray-700 border-b border-secundary-focus  hover:bg-yellow-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0"
            :class="{ 'text-primary': $route.name == 'Login' }" v-if="sessionToken == ''"
            @click="menuShow=false">
            <router-link class="block" to="/login">Acceder </router-link>
          </li>
          <li v-if="!sessionToken == ''">
            <a  @click="logout"
              class="block py-2 pr-4 pl-3 text-gray-700 border-b border-secundary-focus  hover:bg-yellow-100 md:hover:bg-transparent md:border-0 md:hover:text-red-600 md:p-0 ">Salir</a>
          </li>

        </ul>
      </div>
    </div>
  </nav>

  <!-- <div class="fixed navbar bg-base-100 px-3">
    <div class="flex-1">
      <router-link to="/" class="btn btn-ghost normal-case text-xl">Becas University </router-link>
    </div>

    <div class="flex-none ">
      <ul class="menu menu-horizontal p-0">

        <li tabindex="0" class=" sm:hidden dropdown dropdown-end dropdown-hover">
          <a>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              class="inline-block w-5 h-5 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </a>
          
          <ul class="p-2 bg-base-100 dropdown-content menu shadow rounded-box w-52">
            <li v-for="enlace in enlaces" :key="enlace.id">
              <router-link :to="enlace.url">{{ enlace.name }} CRUD</router-link>
            </li>
          </ul>
        </li>

        <li class="hidden sm:inline" v-if="sessionToken == ''">
          <router-link to="/login">Acceder</router-link>
        </li>
        <li class="hidden sm:inline" v-else>
          <router-link to="/login">Administrar</router-link>
        </li>

        <li class="hidden sm:inline" v-if="!sessionToken == ''">
          <a @click="logout">Cerrar Sesión</a>
        </li>

      </ul>

    </div> 
  </div>-->
</template>

<script>
import { mapWritableState } from 'pinia'
import { useSessionStore } from "../stores/SessionStore"

export default {
  name: 'NavBar',
  data() {
    return {
      menuShow : false,
    }
  },
  computed: {
    ...mapWritableState(useSessionStore, ['sessionToken'])
  },
  methods: {
    logout: function () {
      // remove token
      localStorage.removeItem('token')
      this.sessionToken = ''
    }
  }
}
</script>