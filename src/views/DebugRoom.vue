<template>
<div>
  <h1>this is a debug room where i develope website functionaity</h1>
  <h5>
    user 1 logeado como: <b>{{ this.user }}</b>
  </h5>

  <div>
    <button
      id="login"
      @click="this.signUp({ email: `test${Date.now()}@starcx.cl`, password: 'lolo123' })"
    >
      SignUp
    </button>
    <button
      id="login"
      @click="this.signIn({ email: 'test1653558034014@starcx.cl', password: 'lolo123' })"
    >
      SignIn
    </button>
    <button id="login" @click="this.signOut({ email: null })">SignOut</button>
    <br />
    <button
      id="login"
      @click="
        this.addMessage({
          texto: `mensaje enviado por ${user} a las ${Date.now()}`,
          date: Date.now(),
          user: user,
        })
      "
    >
      Enviar Chat
    </button>

    <button
      id="login"
      @click="
        this.getMyMessages({
          email: user,
        })
      "
    >
      Listar mis mensajes
    </button>



    <button
      id="login"
      @click="
        this.getAnotherUsers({
          email: user,
        })
      "
    >
      ver usuarios online
    </button>

  </div>

  <h4>demo chat</h4>
  <h5>{{ mensajes }}</h5>


  <h4>starwars api</h4>
  <h5>{{ starwarsapi }}</h5>

</div>
</template>

<script>
import { getFirestore } from "firebase/firestore";
import { mapActions, mapState } from "vuex";

export default {

name: "StarChat",
  data() {
    return {
      newMessage: "",
      editMessage: "",
      starwarsapi: "",
      usuario:"",
    };
},
  computed: {
    ...mapState(["user", "mensajes"]),
  },

  methods: {
    ...mapActions([
      "instanceFirestore",
      "getMessages",
      "getMyMessages",
      "getAnotherUsers",
      "addMessage",
      "signUp",
      "signIn",
      "signOut",
    ]),
       updateUser() {
          this.usuario = this.user
    }
  },

  created() {
    this.instanceFirestore(getFirestore);
    this.updateUser();
    fetch("https://akabab.github.io/starwars-api/api/all.json")
    .then(response => response.json())
    .then(data => (this.starwarsapi = data));},
  
  beforeMount() {
    this.getMessages();
  },

}
</script>

<style>

</style>