<template>
    <div class="bg-gray-200 h-screen min-w-screen ">
        <div class="flex flex-col p-3 md:grid md:grid-cols-4 grap-4 w-full h-full content-center">
            <div class="col-span-4 h-20 md:h-0 "></div>
            <div class="bg-white w-full rounded overflow-auto h-full ">
                <form class="p-6 mt-10">
                    <div class="mb-6">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Nombre
                        </label>
                        <input type="texto" :class="{ 'border-error': (errors && becaName.trim() == '') }"
                            v-model="becaName"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Beca de ..." required />
                    </div>
                    <div class="mb-6">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Porcentage
                        </label>
                        <label class="input-group mb-6">
                            <input type="number" v-model.number="becaPorcentaje"
                                :class="{ 'border-error': (errors && becaPorcentaje == '') }" placeholder="10" min="0"
                                max="100" stop="0.1"
                                class="input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <span>%</span>
                        </label>
                    </div>

                    <div class="mb-6">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Requisitos
                        </label>
                        <textarea v-model="becaRequisitos"
                            :class="{ 'border-error': (errors && becaRequisitos.trim() == '') }"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Nivel de ingles ..." required />
                    </div>

                    <div class="mb-6">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Pais
                        </label>
                        <select :class="{ 'border-error': (errors && becaPais == '') }" v-model="becaPais"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 select"
                            name="" id="">
                            <option value="" class=""> -- Seleccionse alguno --</option>
                            <option v-for="pais in allPais" :key="pais.id" :value="pais.id"> {{ pais.nombre }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-6">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Universidad
                        </label>
                        <select :class="{ 'border-error': (errors && becaUni == '') }" v-model="becaUni"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 select"
                            name="" id="">
                            <option value="" class=""> -- Seleccionse alguna --</option>
                            <option v-for="uni in allUnis" :key="uni.id" :value="uni.id"> {{ uni.nombre }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-6">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Categoria
                        </label>
                        <select :class="{ 'border-error': (errors && becaCat == '') }" v-model="becaCat"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 select"
                            name="" id="">
                            <option value="" class="text-gray-300"> -- Categoria --</option>
                            <option value="Nacional">Nacional</option>
                            <option value="Internacional">Internacional</option>
                        </select>
                    </div>

                    <button type="button" @click="guardar"
                        class="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Guardar
                    </button>
                    <button v-show="becadUpdateId != null" @click="actualizar" type="button"
                        class="text-white ml-4 bg-accent hover:bg-accent-focus focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Actualizar
                    </button>
                </form>
            </div>
            <div class="col-span-3 flex items-center justify-center ml-2">
                <div class="relative overflow-x-auto shadow-md sm:rounded-sm">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">Name</th>
                                <th scope="col" class="px-6 py-3">
                                    Procentaje
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Requisitos
                                </th>
                                <th scope="col" class="px-6 py-3">Pais</th>
                                <th scope="col" class="px-6 py-3">
                                    Universidad
                                </th>
                                <th scope="col" class="px-6 py-3">Categoria</th>
                                <th scope="col" class="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(beca, index) in allBecas" :key="beca.id"
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {{ beca.nombre }}
                                </th>
                                <td class="px-6 py-4">
                                    {{ Number(beca.porcentaje).toFixed(2) }}%
                                </td>
                                <td class="px-6 py-4 whitespace-pre-wrap">
                                    {{ beca.requisitos }}
                                </td>
                                <td class="px-6 py-4">
                                    {{
                                            allPais?.filter(
                                                (ele) => ele.id == beca.pais
                                            )[0]?.nombre + " "
                                    }}
                                </td>
                                <td class="px-6 py-4">
                                    {{
                                            allUnis?.filter(
                                                (ele) => ele.id == beca.universidad
                                            )[0]?.nombre + " "
                                    }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ beca.categoria }}
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <div class="flex flex-col">
                                        <button @click="eliminar(beca.id, index)"
                                            class="btn btn-sm bg-red-100 text-red-500 border-red-100 btn-error mb-1">
                                            <i class="fi fi-ss-trash"></i>
                                        </button>
                                        <button @click="editar(beca.id, index)"
                                            class="btn btn-sm bg-green-100 text-green-500 border-green-100 btn-success mb-1">
                                            <i class="fi fi-ss-pencil"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div id="toast"
            class=" invisible fixed bottom-0 left-8 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg  dark:text-gray-400 dark:bg-gray-800 shadow-xl  "
            :class="{ 'show': showSnack }" role="alert">

            <div v-if="snackIcon == 'success'"
                class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"></path>
                </svg>
            </div>
            <div v-if="snackIcon == 'error'"
                class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </div>
            <div v-if="snackIcon == 'warning'"
                class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"></path>
                </svg>
            </div>
            <div class="ml-3 text-sm font-normal"> {{ snackMessage }} </div>
            <button type="button"
                class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-success" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mapWritableState } from "pinia";
import { useSessionStore } from "../stores/SessionStore";

export default {
    data() {
        return {
            errors: false,
            becaName: "",
            becaPorcentaje: "",
            becaRequisitos: "",
            becaPais: "",
            becaUni: "",
            becaCat: "",

            becadUpdateId: null,
            becaIndex: null,

            allUnis: [],
            allPais: [],
            allBecas: [],

            showSnack: false,
            snackMessage: "",
            snackIcon: "",
        };
    },
    computed: {
        ...mapWritableState(useSessionStore, ["sessionToken", "backAPIUrl"]),
    },

    created() {
        this.getAllBecas();
        this.getAllUni();
        this.getAllPais();
    },

    methods: {
        editar(id, index) {
            this.becadUpdateId = id;
            this.becaIndex = index;

            let t = this;
            const options = {
                method: "GET",
                url: this.backAPIUrl + "api/beca/" + id,
                headers: {
                    Authorization: "Token " + this.sessionToken,
                    "Content-Type": "application/json",
                },
            };

            axios
                .request(options)
                .then(function (response) {
                    t.becaName = response.data.nombre;
                    t.becaPorcentaje = response.data.porcentaje;
                    t.becaRequisitos = response.data.requisitos;
                    t.becaPais = response.data.pais;
                    t.becaUni = response.data.universidad;
                    t.becaCat = response.data.categoria;
                    
                })
                .catch(function (error) {
                    console.error(error);
                });
        },

        eliminar(id, index) {
            this.uniIdUpdate = null;
            let t = this;

            const options = {
                method: "DELETE",
                url: this.backAPIUrl + "api/beca/" + id,
                headers: {
                    Authorization: "Token " + this.sessionToken,
                    "Content-Type": "application/json",
                },
            };

            axios
                .request(options)
                .then(function (response) {
                    t.allBecas.splice(index, 1);
                    t.showSnackF("Eliminado con exito", "success");
                })
                .catch(function (error) {
                    console.error(error);
                });
        },

        guardar() {
            this.becadUpdateId = null;
            if (
                this.becaName.trim() == "" ||
                this.becaPorcentaje == '' ||
                this.becaRequisitos.trim() == "" ||
                this.becaPais == "" ||
                this.becaUni == "" ||
                this.becaCat == ""
            ) {
                this.errors = true;
                return;
            }

            this.errors = false;
            let t = this
            const options = {
                method: "POST",
                url: this.backAPIUrl + "api/beca/",
                headers: {
                    Authorization: "Token " + this.sessionToken,
                    "Content-Type": "application/json",
                },

                data: {
                    nombre: this.becaName,
                    porcentaje: this.becaPorcentaje,
                    requisitos: this.becaRequisitos,
                    categoria: this.becaCat,
                    pais: this.becaPais,
                    universidad: this.becaUni
                },
            };

            axios
                .request(options)
                .then(function (response) {
                    t.allBecas.push(response.data);
                    t.becaName = "";
                    t.becaPorcentaje = "";
                    t.becaRequisitos = "";
                    t.becaPais = "";
                    t.becaUni = "";
                    t.becaCat = "";

                    t.showSnackF("Guardado con exito", "success");
                })
                .catch(function (error) {
                    console.error(error);
                });
        },

        actualizar() {
            if (
                this.becaName.trim() == "" ||
                this.becaPorcentaje == '' ||
                this.becaRequisitos.trim() == "" ||
                this.becaPais == "" ||
                this.becaUni == "" ||
                this.becaCat == ""
            ) {
                this.errors = true;
                return;
            }

            this.errors = false;
            let t = this
            const options = {
                method: "PUT",
                url: this.backAPIUrl + "api/beca/" + this.becadUpdateId,
                headers: {
                    Authorization: "Token " + this.sessionToken,
                    "Content-Type": "application/json",
                },

                data: {
                    nombre: this.becaName,
                    porcentaje: this.becaPorcentaje,
                    requisitos: this.becaRequisitos,
                    categoria: this.becaCat,
                    pais: this.becaPais,
                    universidad: this.becaUni
                },
            };

            axios
                .request(options)
                .then(function (response) {
                    t.allBecas[t.becaIndex] = response.data;

                    t.becaName = "";
                    t.becaPorcentaje = "";
                    t.becaRequisitos = "";
                    t.becaPais = "";
                    t.becaUni = "";
                    t.becaCat = "";
                    t.becadUpdateId = null;
                    t.showSnackF("Actualizado con exito", "success");

                })
                .catch(function (error) {
                    console.error(error);
                });

        },

        showSnackF(message, icon) {
            this.snackMessage = message;
            this.snackIcon = icon;
            this.showSnack = true;
            let t = this;
            setTimeout(function () {
                t.showSnack = false;
            }, 3000);
        },

        getAllUni() {
            let t = this;
            const options = {
                method: "GET",
                url: this.backAPIUrl + "api/universidad/",
                headers: {
                    Authorization: "Token " + this.sessionToken,
                    "Content-Type": "application/json",
                },
            };

            axios
                .request(options)
                .then(function (response) {
                    t.allUnis = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        getAllPais() {
            let t = this;
            const options = {
                method: "GET",
                url: this.backAPIUrl + "api/paises/",
                headers: {
                    Authorization: "Token " + this.sessionToken,
                    "Content-Type": "application/json",
                },
            };

            axios
                .request(options)
                .then(function (response) {
                    t.allPais = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        getAllBecas() {
            let t = this;
            const options = {
                method: "GET",
                url: this.backAPIUrl + "api/beca/",
                headers: {
                    Authorization: "Token " + this.sessionToken,
                    "Content-Type": "application/json",
                },
            };

            axios
                .request(options)
                .then(function (response) {
                    t.allBecas = response.data;
                    // console.log(response);
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
    },
    // watch: {
    // becaPorcentaje(newValue, oldValue) {
    //     console.log(newValue == '');
    // }
    // },
};
</script>

<style scoped>
/* The snackbar - position it at the bottom and in the middle of the screen */
#snackbar {
    visibility: hidden;
    /* Hidden by default. Visible on click */
    min-width: 250px;
    /* Set a default minimum width */
    margin-left: -125px;
    /* Divide value of min-width by 2 */
    background-color: #333;
    /* Black background color */
    color: #fff;
    /* White text color */
    text-align: center;
    /* Centered text */
    border-radius: 2px;
    /* Rounded borders */
    padding: 16px;
    /* Padding */
    position: fixed;
    /* Sit on top of the screen */
    z-index: 1;
    /* Add a z-index if needed */
    left: 50%;
    /* Center the snackbar */
    bottom: 30px;
    /* 30px from the bottom */
}

/* Show the snackbar when clicking on a button (class added with JavaScript) */
.show {
    visibility: visible !important;
    /* Show the snackbar */
    /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
  However, delay the fade out process for 2.5 seconds */
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
    from {
        bottom: 0;
        opacity: 0;
    }

    to {
        bottom: 30px;
        opacity: 1;
    }
}

@keyframes fadein {
    from {
        bottom: 0;
        opacity: 0;
    }

    to {
        bottom: 30px;
        opacity: 1;
    }
}

@-webkit-keyframes fadeout {
    from {
        bottom: 30px;
        opacity: 1;
    }

    to {
        bottom: 0;
        opacity: 0;
    }
}

@keyframes fadeout {
    from {
        bottom: 30px;
        opacity: 1;
    }

    to {
        bottom: 0;
        opacity: 0;
    }
}
</style>
