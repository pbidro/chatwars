<template>
  <div>
    <h1>Crear una nueva cuenta</h1>
    <p>email: <input v-model="form.user.userMail" /></p>
    <p>leyenda: <input v-model="form.user.leyenda" /></p>
    <p>username: <input v-model="form.user.name" /></p>
    <p>password: <input type="password" v-model="password" /></p>
    <button @click="signUp({email:form.user.userMail,password:password,newUser:form})">Registrar</button>
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



