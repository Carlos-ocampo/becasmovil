<template>
    <div class="flex items-center justify-center w-screen md:min-h-screen bg-gray-100 text-gray-800 px-8">
        <div class="modal" :class="{ 'modal-open': errorConection }">
            <div class="modal-box">
                <h3 class="font-bold text-lg">
                    Error al intentar conectarnos!
                </h3>
                <p class="py-4">
                    Estamos trabajando en mejorar la calidad de nuestros
                    servicios, por favor sea paciente e intente más tarde. !
                </p>
                <div class="modal-action">
                    <label for="my-modal" class="btn" @click="errorConection = false">aa ok!</label>
                </div>
            </div>
        </div>

        <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-8 w-full max-w-screen-lg align-bottom">
            <div class="lg:col-span-2 grid content-center">
                <div class="flex flex-col">
                    <h2 class="text-sm font-medium">Paises</h2>
                    <div class="bg-white rounded mt-4 shadow-lg">
                        <div class="border-t">
                            <!-- error alert -->
                            <div class="alert alert-warning shadow-lg" :class="{ hidden: !errors }">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6"
                                        fill="none" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <span>{{ errorMessage }}</span>
                                </div>
                            </div>

                            <div class="md:grid md:grid-cols-3 gap-4 px-8 pb-8 py-5">
                                <div class="col-span-2">
                                    <label class="text-xs font-semibold" for="paisName">Nombre del pais</label>
                                    <input id="paisName"
                                        class="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm" :class="{
                                            'input-bordered input-error':
                                                errors,
                                        }" v-model="countryName" type="text" name="paisName" placeholder="Colombia" />
                                </div>
                                <div class="pt-3 md:pt-0">
                                    <label class="text-xs font-semibold" for="cardNumber">Emoji</label>
                                    <input class="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm"
                                        type="text" placeholder="..." v-model="countryEmoji" />
                                </div>
                                <div class="py-5 col-span-3 justify-around flex">
                                    <button class="btn btn-secondary mr-auto" @click="savePais">
                                        guardar
                                    </button>
                                    <button v-show="updateCountryId != null" class="btn btn-accent mr-auto"
                                        @click="updatePais">
                                        actualizar
                                    </button>
                                    <button :class="{
                                        'btn  btn-ghost': countrySvg != '',
                                    }" type="button" @click="
    countryName = suggestCountryName
">
                                        <img class="object-cover mr-auto" :class="{
                                            'w-10': countrySvg != '',
                                        }" :title="
    countrySvg != ''
        ? suggestCountryName
        : ''
" :src="countrySvg" />
                                    </button>
                                    <input type="number" class="w-4" name="inxcountry" :class="{
                                        hidden:
                                            countrySvg == '' ||
                                            saveFilterData.length <= 1,
                                    }" v-model="countryIndex" :min="0" :max="saveFilterData.length - 1"
                                        @change="updateCountryOptions" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid md:max-h-screen">
                <div class="md:h-20"></div>

                <h2 class="text-sm font-medium pb-2">
                    Listado de paises
                    <div class="badge badge-primary">
                        {{ allCountries.length }}
                    </div>
                </h2>
                <div class="overflow-auto shadow-lg rounded-sm flex flex-col divide-y p-2 my-3">
                    <div v-for="(country, index) in allCountries" :key="country.id"
                        class="bg-white rounded mt-4 shadow-lg py-6">
                        <div class="px-8">
                            <div class="flex items-center">
                                <span class="text-md font-semibold focus:outline-none capitalize">
                                    {{ country.nombre }}</span>
                                <span class="text-xs text-gray-500 mb-px mx-2">
                                    <div class="badge badge-ghost badge-sm">
                                        #{{ country.id }}
                                    </div>
                                </span>
                                <span class="text-sm ml-auto -mt-1"><img loading="lazy" alt="" class="ml-auto w-10"
                                        :src="country.svg" /></span>
                            </div>
                        </div>
                        <div class="pl-8 pr-6 mt-4">
                            <div class="flex items-end">
                                <span class="text-sm mr-auto font-semibold">{{
                                        country.emoji
                                }}</span>

                                <button
                                    class="btn btn-active btn-outline text-gray-500 hover:bg-primary border-none btn-sm mx-1 -mb-2"
                                    @click="cargarPais(country.id, index)">
                                    <i class="fi fi-rr-pencil"></i>
                                </button>
                                <button
                                    class="btn btn-active btn-outline text-gray-500 hover:bg-red-500 border-none btn-sm mx-1 -mb-2"
                                    @click="deletePais(country.id, index)">
                                    <i class="fi fi-rr-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- <div class="bg-white rounded mt-4 shadow-lg py-6 ">
                        <div class="px-8">
                            <div class="flex items-end">
                                <select class="text-sm font-medium focus:outline-none -ml-1" name="" id="">
                                    <option value="">Product (Billed Monthly)</option>
                                    <option value="">Product (Billed Annually)</option>
                                </select>
                                <span class="text-sm ml-auto font-semibold">$20</span>
                                <span class="text-xs text-gray-500 mb-px">/mo</span>
                            </div>
                            <span class="text-xs text-gray-500 mt-2">Save 20% with annual billing</span>
                        </div>
                        <div class="px-8 mt-4">
                            <div class="flex items-end justify-between">
                                <span class="text-sm font-semibold">Tax</span>
                                <span class="text-sm text-gray-500 mb-px">10%</span>
                            </div>
                        </div>
                    </div> -->
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
import countryData from "../assets/json/country3.json";

import axios from "axios";
import { mapWritableState } from "pinia";
import { useSessionStore } from "../stores/SessionStore";

export default {
    data() {
        return {
            errors: false, // error al intentar submit
            errorMessage: "",
            errorConection: false, // bandera de conexion
            allCountries: [],
            countryData: countryData,
            countryName: "",
            countryEmoji: "",
            suggestCountryName: "",
            countrySvg: "",
            countryIndex: 0,
            saveFilterData: [],
            showSnack: false,
            snackMessage: '',
            snackIcon: '',
            updateCountryId: null,
            updateCountryindex: null
        };
    },
    methods: {
        savePais() {
            this.updateCountryId = null
            if (this.countryName == "") {
                this.errors = true;
                this.errorMessage =
                    "Es necesario llenar el campo del nombre como mínimo";
                return;
            }
            this.errors = false;
            // validar si el país ta está registrado

            let existences = this.allCountries.filter((element) => {
                return (
                    element.nombre.trim().toLowerCase() ==
                    this.countryName.trim().toLowerCase()
                );
            });

            if (existences.length > 0) {
                this.errors = true;
                this.errorMessage =
                    "El país que intenta incluir, ya se encuentra en el sistema";
                return;
            }

            // save
            const options = {
                method: "POST",
                url: this.backAPIUrl + "api/paises/",
                headers: {
                    Authorization: "Token " + this.sessionToken,
                    "Content-Type": "application/json",
                },
                data: {
                    nombre: this.countryName,
                    emoji: this.countryEmoji,
                },
            };
            let t = this;
            axios
                .request(options)
                .then(function (response) {
                    let newdata = response.data;
                    newdata.svg = t.countryData.filter(
                        (element) => element.emoji == newdata.emoji
                    )[0]?.image;
                    t.allCountries.push(newdata);
                    t.countryName = "";
                    t.showsnack("Se ha guardado con exito", "success")
                })
                .catch(function (error) {
                    t.errorConection = true;
                    console.error(error);
                });
        },

        deletePais(id, index) {
            this.updateCountryId = null
            let t = this
            const options = {
                method: 'DELETE',
                url: this.backAPIUrl + "api/paises/" + id,
                headers: {
                    Authorization: "Token " + this.sessionToken,
                    "Content-Type": "application/json",
                }
            };

            axios.request(options).then(function (response) {
                t.allCountries.splice(index, 1);
                // console.log(response.data);
                t.showsnack("Se ha eliminado con exito", "success")

            }).catch(function (error) {
                t.errorConection = true;
                console.error(error);
            });
        },

        getAllPaises() {
            // get paises
            const headers = {
                Authorization: "Token " + this.sessionToken,
            };
            let t = this;

            axios
                .get(this.backAPIUrl + "api/paises/", {
                    headers: headers,
                })
                .then((response) => {
                    t.allCountries = [];
                    t.allCountries = response.data;
                    t.allCountries.forEach((elem) => {
                        elem.svg = t.countryData.filter(
                            (element) => element.emoji == elem.emoji
                        )[0]?.image;
                    });
                    // console.log(t.allCountries[0].name)
                })
                .catch((error) => {
                    t.errorConection = true;
                    console.log(error);
                });
        },

        updateCountryOptions() {
            if (this.countryIndex < 0) {
                this.countryIndex = 0;
                return;
            }
            if (
                this.countryIndex >= this.saveFilterData.length &&
                this.countryIndex != 0
            ) {
                //console.log("diss", this.countryIndex, this.saveFilterData.length)
                this.countryIndex--;
                return;
            }

            let cname = this.countryName.trim().toLowerCase();
            let filterdata = this.countryData.filter((element) => {
                return element.sname.toLowerCase().includes(cname);
            });
            this.countryEmoji =
                filterdata.length > 0
                    ? filterdata[this.countryIndex].emoji
                    : "";
            this.countrySvg =
                filterdata.length > 0
                    ? filterdata[this.countryIndex].image
                    : "";
            this.suggestCountryName =
                filterdata.length > 0
                    ? filterdata[this.countryIndex].sname
                    : "";

            this.saveFilterData = filterdata;
        },
        cargarPais(id, index) {
            const options = {
                method: 'GET',
                url: this.backAPIUrl + "api/paises/" + id,
                headers: {
                    Authorization: "Token " + this.sessionToken,
                    "Content-Type": "application/json",
                }
            };
            let t = this
            axios.request(options).then(function (response) {

                t.countryName = response.data.nombre
                t.countryEmoji = response.data.emoji
                t.updateCountryId = response.data.id
                t.updateCountryindex = index
             }).catch(function (error) {
                console.error(error);
            });
        },
        updatePais() {
            let t = this

            const options = {
                method: 'PUT',
                url: this.backAPIUrl + "api/paises/" + t.updateCountryId,
                headers: {
                    Authorization: "Token " + this.sessionToken,
                    "Content-Type": "application/json",
                },
                data: {
                    id: t.updateCountryId,
                    nombre: t.countryName,
                    emoji: t.countryEmoji.trim()
                }
            };
            axios.request(options).then(function (response) {
                t.allCountries[t.updateCountryindex] = {
                    id: t.updateCountryId,
                    nombre: t.countryName,
                    emoji: t.countryEmoji,
                    svg: t.countrySvg
                }
                t.updateCountryId = null
                t.countryName = ''
                t.showsnack("Actualización exitosa", "success")
            }).catch(function (error) {
                console.error(error);
            });

        },

        showsnack(message, icon) {
            console.log(message)
            this.snackMessage = message
            this.snackIcon = icon
            this.showSnack = true
            let t = this
            setTimeout(function () {
                console.log("esconder")
                t.showSnack = false
            }, 3000);
        }
    },
    computed: {
        ...mapWritableState(useSessionStore, ["sessionToken", "backAPIUrl"]),
        // getedemoji() {
        //     if (this.countryName.trim() == '') {
        //         this.countryEmoji = ''
        //         this.countrySvg = ''
        //         return ''
        //     }
        //     // return this.countryData.filter
        //     let cname = this.countryName.trim().toLowerCase()
        //     let filterdata = this.countryData.filter(element => {
        //         return element.sname.toLowerCase().includes(cname)
        //     })
        //     this.countryEmoji = filterdata.length > 0 ? filterdata[this.countryIndex].emoji : ''
        //     this.countrySvg = filterdata.length > 0 ? filterdata[this.countryIndex].image : ''
        //     this.suggestCountryName = filterdata.length > 0 ? filterdata[this.countryIndex].sname : ''

        //     this.saveFilterData = filterdata
        //     return this.countryEmoji
        // },
    },
    watch: {
        countryName(newValue, oldValue) {
            this.countryIndex = 0;
            this.errors = false;

            if (this.countryName.trim() == "") {
                this.countryEmoji = "";
                this.countrySvg = "";
                return "";
            }
            // return this.countryData.filter
            let cname = this.countryName.trim().toLowerCase();
            let filterdata = this.countryData.filter((element) => {
                return element.sname.toLowerCase().includes(cname);
            });
            if (this.countryName.trim() == "") {
                return;
            }
            this.countryEmoji =
                filterdata.length > 0
                    ? filterdata[this.countryIndex].emoji
                    : "";
            this.countrySvg =
                filterdata.length > 0
                    ? filterdata[this.countryIndex].image
                    : "";
            this.suggestCountryName =
                filterdata.length > 0
                    ? filterdata[this.countryIndex].sname
                    : "";

            this.saveFilterData = filterdata;
        },
    },
    created() {
        // validate the session status
        if (this.sessionToken.trim == "") {
            this.$router.push("/login");
        }
        // consultar todos los paises actuales
        this.getAllPaises();
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
