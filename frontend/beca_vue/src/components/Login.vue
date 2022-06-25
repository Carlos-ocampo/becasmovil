<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
        <form @submit.prevent="login">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Usuario</span>
            </label>
            <input type="text" placeholder="Nombre de usuario" class="input input-bordered"
              :class="{ 'input-error': userError }" v-model="username" />
          </div>
          <div class="form-control mt-2">
            <label class="label">
              <span class="label-text">Contraseña</span>
            </label>
            <input type="password" placeholder="Clave" class="input input-bordered"
              :class="{ 'input-error': passwordError }" v-model="password" />
            <label class="label">
              <div v-show="error" class="mt-2 alert alert-error shadow-lg">
                <div>
                  <span class="text-center">{{ errorMessage }}</span>
                </div>
              </div>
            </label>
          </div>
          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary">Acceder</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapWritableState } from 'pinia'
import { useSessionStore } from "../stores/SessionStore"

export default {
  name: "LoginView",
  components: {},
  data() {
    return {
      username: "",
      password: "",
      error: false,
      errorMessage: "",
      userError: false,
      passwordError: false,
    };
  },
  computed: {
    ...mapWritableState(useSessionStore, ['sessionToken','backAPIUrl'])
  },
  methods: {
    login: function () {

      // Validaciones
      if (this.username.trim() == "" || this.password == "") {
        this.error = true;
        this.errorMessage = "Los campos usuario y contraseña son obligatorios";
        this.userError = this.username.trim() == "";
        this.passwordError = this.password == "";
        return;
      }

      // json componentes
      let auto_json = {
        username: this.username,
        password: this.password,
      };
      let t = this;

      // petition
      axios
        .post( this.backAPIUrl + "api_generate_token/", auto_json)
        .then((response) => {
          if (response.status == 200) {
            localStorage.token = response.data.token
            t.sessionToken = response.data.token
            t.$router.push('/')

          } else {
            t.error = true;
            t.errorMessage =
              "Las credenciales no son correctas, revisa por favor";
          }
        })
        .catch(function (error) {
          if (error.response.status == 400) {
            t.error = true;
            t.errorMessage =
              "Las credenciales proporcionadas no son correctas, por favor revise";
          } else {
            t.error = true;
            t.errorMessage =
              "Por el momento esta aplicación no se encuentra en servicio, tenemos problemas para conectarnos";
          }
        });
    },
  },
  created() {
    // Validar el estado del inicio de sesion
    if (this.sessionToken != '') {
      this.$router.push('/')
    }
  },
};
</script>
