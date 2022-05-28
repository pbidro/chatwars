<template>

    <div class="sideNav" title="Sidebar" shadow>
      <div >
   <p>Using in components (list group) example:<p/>
    <b-list-group style="max-width: 300px;">
      <b-list-group-item class="d-flex align-items-center">
        <b-avatar class="mr-3"></b-avatar>
        <span class="mr-auto">J. Circlehead</span>
        <b-badge>5</b-badge>
      </b-list-group-item>
      <b-list-group-item class="d-flex align-items-center">
        <b-avatar variant="primary" text="BV" class="mr-3"></b-avatar>
        <span class="mr-auto">BootstrapVue</span>
        <b-badge>12</b-badge>
      </b-list-group-item>
      <b-list-group-item class="d-flex align-items-center">
        <b-avatar variant="info" src="https://placekitten.com/300/300" class="mr-3"></b-avatar>
        <span class="mr-auto">Super Kitty</span>
        <b-badge>9</b-badge>
      </b-list-group-item>
      <b-list-group-item class="d-flex align-items-center">
        <b-avatar variant="success" icon="people-fill" class="mr-3"></b-avatar>
        <span class="mr-auto">ACME group</span>
        <b-badge>7</b-badge>
      </b-list-group-item>
    </b-list-group>
      </div>
    </div>



</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    name: 'EntryPoint',
    data(){
        return{
        }
    },
    created(){

    },
    methods:{
          ...mapActions([
      "signIn",'getCurrentUser','signUp'
    ]),
    },
    computed:{
    ...mapState(['usuario']),
    },
    mounted() {
      this.getCurrentUser();
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
  width: 300px;
  height: 100vh;
  background-color: purple;
}

</style>
