<template>
  <div id="app">
  



    <b-navbar  toggleable="lg" type="light" >
      <b-navbar-brand><router-link to="/"><img src="./assets/img/landing/logo.png"/></router-link></b-navbar-brand>
          

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ms-auto">
        
          <b-nav-item
            ><router-link to="/signUp">SignUp</router-link></b-nav-item
          >
          <b-nav-item class="mr-auto"
            ><router-link to="/signIn">SignIn</router-link></b-nav-item
          >

         
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>



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
  background-color:black;
  a {
    font-weight: bold;
    color: #f2f5f8;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  
  }
}
</style>
