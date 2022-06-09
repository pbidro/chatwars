<template>
  <div id="app">
    <div v-if="!$route.meta.hideNavbar">
      <b-navbar   type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item class="mr-auto"
            ><router-link to="/">Home</router-link></b-nav-item
          >
          <b-nav-item
            ><router-link to="/signUp">SignUp</router-link></b-nav-item
          >
          <b-nav-item class="mr-auto"
            ><router-link to="/signIn">SignIn</router-link></b-nav-item
          >

          <b-nav-item class="mr-auto"
            ><router-link to="/panel">Panel</router-link></b-nav-item
          >
        
        </b-navbar-nav>
        <b-navbar-nav class="mr-auto ms-auto mb-2 mb-lg-0">
        <b-button @click="signUp({ email: `topo${Date.now()}@acac.cl`, password: 'acac123' }),getAnotherUsers()">Button</b-button>
          <b-nav-item >{{`Bienvenido: ${usuario}`}}</b-nav-item>

        </b-navbar-nav>

      </b-navbar>
    </div>

    <router-view />
  </div>
</template>

<script>
import { getFirestore } from "firebase/firestore";

import {mapState,mapActions} from 'vuex'
export default {
    name: 'EntryPoint',
    data(){
        return{
        }
    },
    created(){
    this.instanceFirestore(getFirestore);

    },
    methods:{
          ...mapActions([
      "signIn",'getCurrentUser','signUp','getMyData','instanceFirestore','getAnotherUsers'
    ]),

    },
    computed:{
    ...mapState(['usuario','miData','otherUsers']),
    },
    mounted() {
      this.getCurrentUser();
      this.getMyData();
}

}
</script>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
