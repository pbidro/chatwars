<template>

    <div >
            <div class="sideNav" title="Sidebar" shadow>
   <p>Using in components (list group) example:<p/>
    <b-list-group style="max-width: 300px;">
      <b-list-group-item class="d-flex align-items-center">
        <b-avatar class="mr-3"></b-avatar>
        <span class="mr-auto">{{usuario}}</span>
        <b-badge>5</b-badge>
      </b-list-group-item>
      <b-list-group-item class="d-flex align-items-center">
        <span class="mr-auto">user id: {{miData.documentid}}</span>
        <b-badge>12</b-badge>
      </b-list-group-item>
      <b-list-group-item class="d-flex align-items-center">
        <b-avatar variant="info" src="https://placekitten.com/300/300" class="mr-3"></b-avatar>
        <span class="mr-auto">Super Kitty</span>
      </b-list-group-item>
      <b-list-group-item class="d-flex align-items-center">
        <b-avatar variant="success" icon="people-fill" class="mr-3"></b-avatar>
        <span class="mr-auto">{{miData.data.user.matchCounter}}</span>
        <b-badge>7</b-badge>
      </b-list-group-item>
    </b-list-group>
      </div>
      <b-container class="bv-example-row sidecontent">
  <b-row  >
    <b-col  v-for='user in otherUsers'
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

import {mapState,mapActions} from 'vuex'
export default {
    name: 'EntryPoint',
    data(){
        return{
        }
    },
    created(){
    this.instanceFirestore(getFirestore);
    this.getAnotherUsers();
    },
    methods:{
          ...mapActions([
      "signIn",'getCurrentUser','signUp','getMyData','instanceFirestore','getAnotherUsers','sendMatch'
    ]),

    },
    computed:{
    ...mapState(['usuario','miData','otherUsers']),
    },
    mounted() {
      this.getCurrentUser();
      this.getMyData();
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
  position:fixed;
}

.sidecontent{
  background-color: red;
  width:70%  ;
  float: right;
  display:flex ;  
  margin: 0 auto; 
}
</style>
