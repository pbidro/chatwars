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
    getPendingMatch: (state) => () => {
      var auxArray = state.miData.data.user.matchUsers.filter(matches => matches.state == "pending");
      return auxArray
    },

    getRejectedMatch: (state) => () => {

      var auxArray = state.miData.data.user.matchUsers.filter(matches => matches.state == "rejected");
      return auxArray
    },

    getAcceptedMatch: (state) => () => {
      var acceptedDocuments = state.miData.data.user.matchUsers.filter(matches => matches.state == "accepted");
      var acceptedDocumentsArray = acceptedDocuments.map(element => element.document);
      var responseObject = state.otherUsers.filter(element => acceptedDocumentsArray.includes(element.documentid))
      return responseObject
    },

    getConversation: (state) => (mail) => {
      var chatIndex = state.miData.data.user.matchUsers.findIndex(matches => matches.matchUser == mail);
      console.log(chatIndex+ 'chatindex')
      var responseObject = state.miData.data.user.matchUsers[chatIndex].chat 
      var document = state.miData.data.user.matchUsers[chatIndex].document

      if(responseObject == undefined){
        responseObject=[]
      }
      return {chat: responseObject, document: document}
    },

    getTargetUser: (state) => (docid) => {
      var auxArray = state.otherUsers.filter(matches => matches.documentid == docid);
      return auxArray[0]
    },

    getNotMatchedUsers: (state) => (interactions) => {
      console.log(state.otherUsers)
      console.log(interactions)
      var auxArray = state.otherUsers.filter(element => !interactions.includes(element.documentid))

      return auxArray
    },

    getAllMatchDocs: (state) => () => {
      var auxArray = state.miData.data.user.matchUsers;
      var result = auxArray.map(element => element.document);
      console.log(result);
      return result
    },
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

    async signOut(context) {
      const res = await auth.signOut()
      .then(() => {
        this.$router.push("/home");
      });
      if (res) {
        context.commit('setUser', res.user)
      }
    },

    async signIn(context, { email, password }) {
      const res = await signInWithEmailAndPassword(auth, email, password)
      if (res) {
        context.commit('setUser', res.user)
      }
    },

    async signUp(context, { email, password, newUser }) {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      if (res) {
        
        await addDoc(collection(getFirestore(), "starchat"), newUser);
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
              commit('setUserInfo', myDataPayload)
            });
          }

        } 
    })
    },

    async getAnotherUsers({commit}) {

      await onAuthStateChanged(auth, (user) => {
         if (user) {
 
          if (this.state.myFirestore) {
            const db = getFirestore();
           const q = query(collection(db, "starchat"),where('user.userMail','!=',user.email)) ;  
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
        if(objeto.fromUser.data.user.matchCounter >0){

          objeto.fromUser.data.user.matchCounter -= 1;
          objeto.toUser.data.user.matchUsers.push({matchUser: objeto.fromUser.data.user.userMail, state:"pending", document:objeto.fromUser.documentid})
          objeto.fromUser.data.user.matchUsers.push({matchUser: objeto.toUser.data.user.userMail, state:"pending", document:objeto.toUser.documentid})
        await setDoc(doc(db, "starchat", objeto.fromUser.documentid), objeto.fromUser.data);
        await setDoc(doc(db, "starchat", objeto.toUser.documentid), objeto.toUser.data);

        }

        commit
      }
    },

    async approveMatch(commit, objeto) {
      if (objeto != "") {
        const db = getFirestore();
        var fromIndex = objeto.fromUser.data.user.matchUsers.findIndex(element => element.matchUser == objeto.toUser.data.user.userMail)
        var toIndex = objeto.toUser.data.user.matchUsers.findIndex(element => element.matchUser == objeto.fromUser.data.user.userMail)

        objeto.toUser.data.user.matchUsers[toIndex].state = "accepted"
        objeto.fromUser.data.user.matchUsers[fromIndex].state = "accepted"
        
        await setDoc(doc(db, "starchat", objeto.fromUser.documentid), objeto.fromUser.data);
        await setDoc(doc(db, "starchat", objeto.toUser.documentid), objeto.toUser.data);

        

        commit
      }
    },


    async rejectMatch(commit, objeto) {
      if (objeto != "") {
        const db = getFirestore();
        var fromIndex = objeto.fromUser.data.user.matchUsers.findIndex(element => element.matchUser == objeto.toUser.data.user.userMail)
        var toIndex = objeto.toUser.data.user.matchUsers.findIndex(element => element.matchUser == objeto.fromUser.data.user.userMail)

        objeto.toUser.data.user.matchUsers[toIndex].state = "rejected"
        objeto.fromUser.data.user.matchUsers[fromIndex].state = "rejected"
        
        await setDoc(doc(db, "starchat", objeto.fromUser.documentid), objeto.fromUser.data);
        await setDoc(doc(db, "starchat", objeto.toUser.documentid), objeto.toUser.data);

        

        commit
      }
    },


    async sendMessage(commit, objeto) {
      if (objeto != "") {
        const db = getFirestore();

        var fromIndex = this.state.miData.data.user.matchUsers.findIndex(element => element.matchUser == objeto.to)
        console.log(objeto.target)
        var toIndex = objeto.target.data.user.matchUsers.findIndex(element => element.matchUser == this.state.usuario)

        if(this.state.miData.data.user.matchUsers[fromIndex].chat == undefined){
          this.state.miData.data.user.matchUsers[fromIndex].chat = []
          objeto.target.data.user.matchUsers[toIndex].chat =[]
        }
        var puchObject = {text: objeto.text ,from: objeto.from, to: objeto.to, date: objeto.date}

        this.state.miData.data.user.matchUsers[fromIndex].chat.push(puchObject)
        objeto.target.data.user.matchUsers[toIndex].chat.push(puchObject)

        await setDoc(doc(db, "starchat", this.state.miData.documentid), this.state.miData.data);
        await setDoc(doc(db, "starchat", objeto.target.documentid), objeto.target.data);

        commit
      }
    },
    

  },
  modules: {
  }
}
  )
