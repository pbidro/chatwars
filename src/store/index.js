/* Vuex Library*/

import Vue from 'vue'
import Vuex from 'vuex'
import {auth} from '../firebase/config'
import {signInWithEmailAndPassword,onAuthStateChanged,createUserWithEmailAndPassword} from 'firebase/auth'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    usuario: ''
  },

  getters: {
  },

  mutations: {
    setUser(state, payload) {
      state.usuario = payload.email
      console.log(`user state change ${state.usuario}`)
    },
    },

  actions: {
    async getCurrentUser(context){
     await onAuthStateChanged(auth, (user) => {
        if (user) {
          context.commit('setUser', user)
        } else {
          context.commit('setUser', {email:null})
        }
    })},

    async signIn(context, { email, password }) {
      const res = await signInWithEmailAndPassword(auth, email, password)
      if (res) {
        context.commit('setUser', res.user)
      }
    },

    async signUp(context, { email, password }) {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      if (res) {

        const newUser = {
          "user": {
            userMail: res.email,
            registerDate: `"${Date.now()}"`,
            lastConection: `"${Date.now()}"`,
            matchCounter: 100,
            matchUsers: [
              {
                starwars86: {
                matchAcept: true,
                }

              }

            ]
          }

        }
        
        /*await addDoc(collection(getFirestore(), "starchat"), empty_user);*/
        console.log(newUser)
        context.commit('setUser', res.user)
      }
      else {
        throw new Error('No se pudo completar el registro de usuario')
      }

    }

  },
  modules: {
  }
}
  )
