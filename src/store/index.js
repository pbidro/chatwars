/* Vuex Library*/

import Vue from 'vue'
import Vuex from 'vuex'
import {auth} from '../firebase/config'
import {signInWithEmailAndPassword,onAuthStateChanged,createUserWithEmailAndPassword} from 'firebase/auth'
import {getFirestore,collection,onSnapshot,query,where,addDoc/*,orderByaddDoc,deleteDoc*/,doc,setDoc} from 'firebase/firestore'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    myFirestore: null,
    usuario: '',
    miData: '',
    otherUsers: '',
  },

  getters: {
  },

  mutations: {
    setUser(state, payload) {
      state.usuario = payload.email
      console.log(`user state change ${state.usuario}`)
    },
    setUserInfo(state, payload) {
      state.miData = {data: payload.data, documentid:payload.documentid}
      console.log(`user data loaded ${payload.documentid}`)
    },
    setOtherUsers(state, payload) {
      console.log(payload)
      state.otherUsers = payload
      console.log(`other users loaded as:  ${payload}`)
    },
    instanceFirestore(state, fs) {
      state.myFirestore = fs
    },
    },

  actions: {

    
    async instanceFirestore(context, fs) {
      console.log('iniciado firestore')
      context.commit("instanceFirestore", fs())
    },
    async getCurrentUser(context){

     await onAuthStateChanged(auth, (user) => {
        if (user) {
          context.commit('setUser', user)
        } else {
          context.commit('setUser', {email:null})
        }
    })
  
  },
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
            userMail: res.user.email,
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
        
        await addDoc(collection(getFirestore(), "starchat"), newUser);
        console.log(newUser)
        context.commit('setUser', res.user)

      }
   

    },
    async getMyData({commit}) {


     await onAuthStateChanged(auth, (user) => {
        if (user) {

          if (this.state.myFirestore) {
            const db = getFirestore();
            console.log(`cargando datos del usuario ${user.email}`)
           const q =  query(collection(db, "starchat"),where('user.userMail','==',user.email));  
            onSnapshot(q, (querySnapshot) => {
              var myDataPayload = '';
              querySnapshot.forEach((doc) => {
                myDataPayload = {documentid: doc.id, data: doc.data()}
              });
              console.log(`my data payload: ${myDataPayload}`)
              commit('setUserInfo', myDataPayload)
            });
          }

        } else {
          commit('setUser', {email:null})
        }
    })
    },
    async getAnotherUsers({commit}) {


      await onAuthStateChanged(auth, (user) => {
         if (user) {
 
          if (this.state.myFirestore) {
            const db = getFirestore();
            console.log(user.email)
           const q = query(collection(db, "starchat"),where('user.userMail','!=',user.email));  
            onSnapshot(q, (querySnapshot) => {
              const mensajes = [];
              this.mensajes = [];
              querySnapshot.forEach((doc) => {
                mensajes.push({ documentid:doc.id,data: doc.data()});
              });
              commit('setOtherUsers', mensajes)
            });
          }
 
         } else {
           commit('setUser', {email:null})
         }
     })
     },
     async sendMatch(commit, objeto) {
      if (objeto != "") {
        console.log(objeto)
        const db = getFirestore();
        console.log('Match To User', objeto.toUser)
        objeto.fromUser.data.user.matchCounter -= 1;

        await setDoc(doc(db, "starchat", objeto.fromUser.documentid), objeto.fromUser.data);
        commit
      }
    },

  },
  modules: {
  }
}
  )
