<template>
    <!-- component -->

    <div class="antialiased font-sans bg-gray-200 min-h-full sm:min-h-screen">
        <div class="container mx-auto px-4 sm:px-8">
            <div class="">
                <div class="h-8"></div>
                <div>
                    <h2 class="text-2xl font-semibold leading-tight">
                        Universidades
                    </h2>
                </div>
                <div class="my-2 flex sm:flex-row flex-col">
                    <div class="">
                        <input placeholder="Universidad"
                            class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                            :class="{ 'border-red-500': errors && uniName == '' }" v-model="uniName" />

                    </div>
                </div>
                <textarea placeholder="Descripcion"
                    class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                    name="" id="" cols="30" rows="2" :class="{ 'border-red-500': errors && uniDescription == '' }"
                    v-model="uniDescription"></textarea>

                <div class="flex m-2 gap-2">
                    <button class="btn btn-primary" @click="guardar">guardar</button>
                    <button v-show="uniIdUpdate != null" @click="actualizar" class="btn btn-accent">Actualizar</button>
                </div>

                <div class="-mx-4 sm:-mx-8 px-4 sm:px-8  ">
                    <div class="inline-block min-w-full shadow rounded-lg   w-fit overflow-auto max-h-96">
                        <table class="min-w-full leading-normal overflow-y-auto  ">
                            <thead>
                                <tr>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Nombre
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Descripcion
                                    </th>

                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="">

                                <tr v-for="(uni, index) in allUnis" :key="uni.id">
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 w-10 h-10">
                                                <i class="text-3xl w-full h-full rounded-full fi fi-ss-school"></i>
                                            </div>
                                            <div class="ml-3">
                                                <p class="text-gray-900 whitespace-no-wrap">
                                                    {{ uni.nombre }}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div class="flex">
                                            <p>{{ uni.descripcion }}</p>
                                        </div>
                                    </td>

                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div class="flex flex-col">
                                            <button
                                                class="my-1 btn btn-sm btn-success text-green-900 bg-green-200 border-green-200"
                                                @click="edit(uni.id, index)">
                                                <i class="fi fi-sr-pencil"></i>
                                            </button>
                                            <button
                                                class="my-1 btn btn-sm btn-error text-red-900 bg-red-200 border-red-200"
                                                @click="deleteuni(uni.id, index)">
                                                <i class="fi fi-sr-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>

                        </table>
                    </div>
                </div>
                <div></div>
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
            uniName: "",
            uniDescription: "",
            uniIdUpdate: null,
            uniIndex: null,
            allUnis: [],

            showSnack: false,
            snackMessage: '',
            snackIcon: '',
        };
    },
    computed: {
        ...mapWritableState(useSessionStore, ["sessionToken", "backAPIUrl"]),
    },

    created() {
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

    methods: {
        edit(id, index) {
            this.uniIdUpdate = id
            this.uniIndex = index


            let t = this
            const options = {
                method: 'GET',
                url: this.backAPIUrl + "api/universidad/" + id,
                headers: {
                    Authorization: "Token " + this.sessionToken,
                    "Content-Type": "application/json",
                },
            };

            axios.request(options).then(function (response) {
                t.uniName = response.data.nombre
                t.uniDescription = response.data.descripcion
            }).catch(function (error) {
                console.error(error);
            });
        },

        deleteuni(id, index) {
            this.uniIdUpdate = null
            let t = this

            const options = {
                method: 'DELETE',
                url: this.backAPIUrl + "api/universidad/" + id,
                headers: {
                    Authorization: "Token " + this.sessionToken,
                    "Content-Type": "application/json",
                },

                data: {
                    nombre: this.uniName,
                    descripcion: this.uniDescription
                },
            };

            axios.request(options).then(function (response) {
                t.allUnis.splice(index, 1);
                t.showSnackF('Eliminado con exito', 'success')
            }).catch(function (error) {
                console.error(error);
            });
        },
        guardar() {
            this.uniIdUpdate = null

            if (this.uniName.trim() == '' || this.uniDescription.trim() == '') {
                this.errors = true
                return
            }
            this.errors = false
            let t = this
            const options = {
                method: 'POST',
                url: this.backAPIUrl + "api/universidad/",
                headers: {
                    Authorization: "Token " + this.sessionToken,
                    "Content-Type": "application/json",
                },

                data: {
                    nombre: this.uniName,
                    descripcion: this.uniDescription
                }
            };

            axios.request(options).then(function (response) {
                t.allUnis.push(response.data)
                t.uniName = ""
                t.uniDescription = ""
                t.showSnackF('Guardado con exito', 'success')
            }).catch(function (error) {
                console.error(error);
            });
        },
        actualizar() {

            if (this.uniName.trim() == '' || this.uniDescription.trim() == '') {
                this.errors = true
                return
            }
            this.errors = false
            let t = this
            const options = {
                method: 'PUT',
                url: this.backAPIUrl + "api/universidad/" + this.uniIdUpdate,
                headers: {
                    Authorization: "Token " + this.sessionToken,
                    "Content-Type": "application/json",
                },

                data: {
                    nombre: this.uniName,
                    descripcion: this.uniDescription
                }
            };

            axios.request(options).then(function (response) {
                t.allUnis[t.uniIndex] =  response.data
                t.uniName = ""
                t.uniDescription = ""
                t.showSnackF('Actualizado con exito', 'success')
            }).catch(function (error) {
                console.error(error);
            });
        },
        showSnackF(message, icon) {
            this.snackMessage = message
            this.snackIcon = icon
            this.showSnack = true
            let t = this
            setTimeout(function () {
                t.showSnack = false
            }, 3000);
        }
    },
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

