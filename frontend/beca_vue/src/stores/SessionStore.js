import { defineStore } from "pinia"

export const useSessionStore = defineStore("SessionStore",{

    // state 
    state: () => {
        return {
            sessionToken: '',
            backAPIUrl :'http://127.0.0.1:8000/'
        }
    }

    // actions


    // getters
})