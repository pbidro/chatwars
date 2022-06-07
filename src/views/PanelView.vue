<template>

    <div >

        <b-navbar  type="dark" variant="dark">
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
          <b-nav-item >




  


</b-nav-item >
        </b-navbar-nav>

      </b-navbar>

    <div class="sideNav" title="Sidebar" shadow>
   <p>Using in components (list group) example:<p/>
    <b-list-group style="max-width: 300px;">
      <b-list-group-item class="d-flex align-items-center">
        <b-avatar class="mr-3"></b-avatar>
        <span class="mr-auto">{{usuario}}</span>
      </b-list-group-item>
      <b-list-group-item class="d-flex align-items-center">
        <span class="mr-auto">user id: {{miData.documentid}}</span>
      </b-list-group-item>
      <b-list-group-item class="d-flex align-items-center">
        <b-avatar variant="info" src="https://placekitten.com/300/300" class="mr-3"></b-avatar>
        <span class="mr-auto">Super Kitty</span>
      </b-list-group-item>


      <b-list-group-item class="d-flex align-items-center">
        <b-avatar variant="success" icon="people-fill" class="mr-3"></b-avatar>
        <span class="mr-auto">{{miData.data.user.matchCounter}}</span>
      </b-list-group-item>


      <b-list-group-item class="d-flex align-items-center">

<b-dropdown variant="outline-danger">
    <template #button-content>
      Notificaciones  <b-badge pill class="pill bg-danger"> {{getPendingMatch().length}}</b-badge>
    </template>
    <b-dropdown-item v- v-for='pendings in getPendingMatch()'
    :key='pendings.id' >{{pendings.matchUser}} {{pendings.document}}

        <b-button href="#" variant="success" @click="approveMatch({fromUser: miData ,toUser: getTargetUser(pendings.document)})">Approve</b-button>
        <b-button href="#" variant="danger" @click="rejectMatch({fromUser: miData ,toUser: getTargetUser(pendings.document)})">Reject</b-button>

        

    </b-dropdown-item>
  </b-dropdown>
      </b-list-group-item>

    </b-list-group>

      </div>
      <b-container class="bv-example-row sidecontent">
  <b-row  >
    <b-col  v-for='user in getNotMatchedUsers( getAllMatchDocs())'
    :key='user._id'   cols="4">
    
      <b-card 
    title="Card Title"
    img-src="https://picsum.photos/600/300/?image=25"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
 {{ user.data.user.userMail }}    </b-card-text>
 
    <b-button href="#" variant="primary" @click="sendMatch({fromUser: miData ,toUser: user})">like</b-button>

  </b-card>

   
    
    </b-col>
  </b-row>
</b-container>



    </div>


</template>

<script>
import { getFirestore } from "firebase/firestore";

import {mapState,mapGetters,mapActions} from 'vuex'
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
      "signIn",'getCurrentUser','signUp','getMyData','instanceFirestore','getAnotherUsers','sendMatch','approveMatch','rejectMatch'
    ]),

    },
    computed:{
    ...mapState(['usuario','miData','otherUsers']),
    ...mapGetters(['getPendingMatch','getTargetUser','getNotMatchedUsers','getAllMatchDocs'])
    },
    mounted() {
        this.getAnotherUsers();

}
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.sideNav{
  width: 30%;
  height: 100%;
  background-color: purple;
  float: left;
  display: block;
  position:fixed;
  z-index: 1;
}

.sidecontent{
  background-color: red;
  width:70%  ;
  float: right;
  display:flex ;  
  margin: 0 auto; 
}
</style>
