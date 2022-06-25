<template>
    <div class="px-6 py-8 bg-base-200">
        <div class="container flex justify-between mx-auto mt-12">
            <div class="w-full lg:w-8/12">
                <div class="flex items-center justify-between">
                    <h1 class="text-xl font-bold text-gray-700 md:text-2xl">
                        Becas
                    </h1>
                </div>

                <div v-for="beca in allBecas" :key="beca.id" class="mt-6">
                    <div class="max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md">
                        <div class="flex items-center justify-between">
                            <span class="font-light text-gray-600"> {{ obtenerDate(beca.created_at) }} </span><a
                                href="#"
                                class="px-2 py-1 font-bold text-gray-100 bg-gray-600 rounded hover:bg-gray-500"> {{
                                        allPais.filter(ele => ele.id == beca.pais)[0].nombre
                                }}</a>
                        </div>
                        <div class="mt-2">
                            <a href="#" class="text-2xl font-bold text-gray-700 hover:underline">
                                {{ beca.nombre }}
                            </a>
                            <p class="mt-2 text-gray-600 whitespace-pre-line">
                                {{ beca.requisitos }}
                            </p>
                        </div>
                        <div class="flex items-center justify-between mt-4">
                            <div>
                                <a href="#" class="flex items-center">
                                    <i
                                        class="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block fi fi-sr-graduation-cap text-center align-middle "></i>


                                    <h1 class="font-bold text-gray-700 hover:underline">
                                        {{ allUnis.filter(ele => ele.id == beca.universidad)[0].nombre }}
                                    </h1>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
            <div class="hidden w-4/12 -mx-8 lg:block">
                <!-- <div class="px-8">
                    <h1 class="mb-4 text-xl font-bold text-gray-700">
                        Authors
                    </h1>
                    <div class="flex flex-col max-w-sm px-6 py-4 mx-auto bg-white rounded-lg shadow-md">
                        <ul class="-mx-4">
                            <li class="flex items-center">
                                <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=731&amp;q=80"
                                    alt="avatar" class="object-cover w-10 h-10 mx-4 rounded-full" />
                                <p>
                                    <a href="#" class="mx-1 font-bold text-gray-700 hover:underline">Alex John</a><span
                                        class="text-sm font-light text-gray-700">Created 23 Posts</span>
                                </p>
                            </li>
                            <li class="flex items-center mt-6">
                                <img src="https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=333&amp;q=80"
                                    alt="avatar" class="object-cover w-10 h-10 mx-4 rounded-full" />
                                <p>
                                    <a href="#" class="mx-1 font-bold text-gray-700 hover:underline">Jane Doe</a><span
                                        class="text-sm font-light text-gray-700">Created 52 Posts</span>
                                </p>
                            </li>
                            <li class="flex items-center mt-6">
                                <img src="https://images.unsplash.com/photo-1531251445707-1f000e1e87d0?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=281&amp;q=80"
                                    alt="avatar" class="object-cover w-10 h-10 mx-4 rounded-full" />
                                <p>
                                    <a href="#" class="mx-1 font-bold text-gray-700 hover:underline">Lisa Way</a><span
                                        class="text-sm font-light text-gray-700">Created 73 Posts</span>
                                </p>
                            </li>
                            <li class="flex items-center mt-6">
                                <img src="https://images.unsplash.com/photo-1500757810556-5d600d9b737d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=735&amp;q=80"
                                    alt="avatar" class="object-cover w-10 h-10 mx-4 rounded-full" />
                                <p>
                                    <a href="#" class="mx-1 font-bold text-gray-700 hover:underline">Steve Matt</a><span
                                        class="text-sm font-light text-gray-700">Created 245 Posts</span>
                                </p>
                            </li>
                            <li class="flex items-center mt-6">
                                <img src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=373&amp;q=80"
                                    alt="avatar" class="object-cover w-10 h-10 mx-4 rounded-full" />
                                <p>
                                    <a href="#" class="mx-1 font-bold text-gray-700 hover:underline">Khatab
                                        Wedaa</a><span class="text-sm font-light text-gray-700">Created 332 Posts</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="px-8 mt-10">
                    <h1 class="mb-4 text-xl font-bold text-gray-700">
                        Categories
                    </h1>
                    <div class="flex flex-col max-w-sm px-4 py-6 mx-auto bg-white rounded-lg shadow-md">
                        <ul>
                            <li>
                                <a href="#" class="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline">-
                                    AWS</a>
                            </li>
                            <li class="mt-2">
                                <a href="#" class="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline">-
                                    Laravel</a>
                            </li>
                            <li class="mt-2">
                                <a href="#" class="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline">-
                                    Vue</a>
                            </li>
                            <li class="mt-2">
                                <a href="#" class="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline">-
                                    Design</a>
                            </li>
                            <li class="flex items-center mt-2">
                                <a href="#" class="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline">-
                                    Django</a>
                            </li>
                            <li class="flex items-center mt-2">
                                <a href="#" class="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline">-
                                    PHP</a>
                            </li>
                        </ul>
                    </div>
                </div> -->
                <div class="px-8 mt-10 max-h-screen overflow-auto mx-0 ">
                    <h1 class="mb-4 text-xl font-bold text-gray-700">
                        Noticias NYT
                    </h1>
                    <div v-for="(noticia, index) in allnyt" :key="index"  class="card w-96 bg-base-100 shadow-xl image-full m-2">
                        <figure><img loading="lazy" :src="noticia.media[0]['media-metadata'].reverse()[0].url" alt="Shoes" /></figure>
                        <div class="card-body">
                            <h2 class="card-title">{{noticia.title}}</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div class="card-actions justify-end">
                                <a :href="noticia.url"  target="_blank" class="btn btn-primary btn-md">see</a>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
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
            allBecas: [],
            allPais: [],
            allUnis: [],
            allnyt: [],
            meses: ['Ene', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],
            dias: ['Lun', 'Mar', 'Mie', 'Juev', 'Sab', 'Dom']
        };
    },
    computed: {
        ...mapWritableState(useSessionStore, ["sessionToken", "backAPIUrl"]),
    },
    methods: {
        obtenerDate(date) {
            let date_data = new Date(date);

            return this.meses[date_data.getUTCMonth()] + " " + date_data.getDate() + ", " + date_data.getUTCFullYear()
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

        getNoticias() {
            let t = this;
            const options = {
                method: "GET",
                url: "https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=bRAKbmyTSBVvoBWXpAHd6qRAIxihHUR8",
                headers: {
                    "Content-Type": "application/json",
                },
            };

            axios
                .request(options)
                .then(function (response) {
                    t.allnyt = response.data.results;
                    // console.log(response);
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
    },
    created() {
        this.getAllPais()
        this.getAllUni()
        this.getAllBecas()
        this.getNoticias()

    },
};
</script>

<style lang="css">
</style>
