<template>

  <div class="form">


<b-container class="form-container"> 

  <b-card no-body class="overflow-hidden text-white bg-dark" >
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img :src="form.user.foto" alt="Image" class="hover-shadow"></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body title="Regístrate">


             
    <h1>Tu personaje asignado será: {{starwarsapi[random_number].name}}</h1>
    <p>email: <b-input type="email" required v-model="form.user.userMail" /></p>
    <p>leyenda: <b-input required v-model="form.user.leyenda" /></p>
    <p>username: <b-input required v-model="form.user.name" /></p>
    <p>password: <b-input required type="password" v-model="password" /></p>
    <b-button variant="success" @click="signUp({email:form.user.userMail,password:password,newUser:form}),moveToPanel() ">Registrar</b-button>
    
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>


</b-container>


  </div>


</template>

<script>
import { mapActions } from "vuex";
import { getFirestore } from "firebase/firestore";

export default {
  name: "RegistrarView",
  data() {
    return {
      random_number: null,
      starwarsapi: "",
      password: "",
      password2: "",
      form: {
        user: {
          leyenda:"",
          userMail: "",
          registerDate: Date.now(),
          lastConection: Date.now(),
          matchCounter: 100,
          matchUsers: [],
          name: "",
          foto: null,
        },
      },
      show: true,
    };
  },
  methods: {
    randomIntFromInterval() {
      return Math.floor(Math.random() * (20 - 0 + 1) + 0);
    },
    moveToPanel(){
      this.$router.push('panel') 
    },
    ...mapActions(["signUp", "instanceFirestore"]),
  },
  created() {
    fetch("https://akabab.github.io/starwars-api/api/all.json")
      .then((response) => response.json())
      .then((data) => (this.starwarsapi = data))
      .then(() => (this.random_number = this.randomIntFromInterval()))
      .then(() => (this.form.user.foto = this.starwarsapi[this.random_number].image));

    this.instanceFirestore(getFirestore);

  },
};
</script>