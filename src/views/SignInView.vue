<template>
  <div class="form">


<b-container class="form-container"> 

  <b-card no-body class="overflow-hidden text-white bg-dark" >
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img src="https://i.pinimg.com/originals/f4/01/6c/f4016cd613e6217d349ed16b8363471e.jpg" alt="Image" class="hover-shadow"></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body title="Inicia Sesión">

    <p>Email: <b-input type="email" required v-model="userMail" /></p>
    <p>Password: <b-input required type="password" v-model="password" /></p>
             
    <b-button variant="success" @click="signIn({email:userMail,password:password}),moveToPanel() ">Logear</b-button>

  
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>


</b-container>


  </div>
</template>

<script>
import { mapActions } from "vuex";

  export default {
    data() {
      return {
  
          userMail: '',
          password: ''
      }
    },
    methods: {
      ...mapActions(["signIn", ]),
    moveToPanel(){
      this.$router.push('panel') 
    },
    }
  }
</script>

<style scoped>
.form {
  padding-bottom: 2rem;
}
button{
  margin: 13px 12px 12px 10px;
}


button{
  margin: 13px;
}
.form-container {
  margin-top: 100px;
}
.form-container__image {
  width: 500px;
}


</style>