<template>
  <div class="form">
    <a> </a>

    <b-container class="form-container">
      <b-card no-body class="overflow-hidden text-white bg-dark">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img
              :src="
                starwarsapi[random_number].image
                /*https://www.solofondos.com/wp-content/uploads/2016/03/star-wars-wallpaper-android.jpg*/
              "
              class="hover-shadow"
            ></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body title="Registrarse">
              <p>Tu personaje será: {{ starwarsapi[random_number].name }}</p>
              <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group
                  id="input-group-1"
                  label="Dirección de correo electrónico:"
                  label-for="input-1"
                  description="Nunca compartiremos su correo electrónico con nadie más."
                >
                  <b-form-input
                    id="input-1"
                    v-model="form.user.userMail"
                    type="email"
                    placeholder="email"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-2"
                  label="Tu nombre:"
                  label-for="input-2"
                >
                  <b-form-input
                    id="input-2"
                    v-model="form.user.name"
                    placeholder="Tu nombre"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-3"
                  label="Tu contraseña:"
                  label-for="input-3"
                >
                  <b-form-input
                    id="input-3"
                    placeholder="Contraseña"
                    required
                    v-model="password"
                    type="password"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-3"
                  label="Confirmar contraseña:"
                  label-for="input-3"
                >
                  <b-form-input
                    id="input-3"
                    placeholder="Confirma tu contraseña"
                    required
                    v-model="password2"
                    type="password"
                  ></b-form-input>
                </b-form-group>

                <b-button pill @click="register()" squared variant="success" size="lg"
                  >Registrarse</b-button
                >
              </b-form>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getFirestore } from "firebase/firestore";

export default {
  data() {
    return {
      random_number: this.randomIntFromInterval(),
      starwarsapi: "",
      password: "",
      password2: "",
      form: {

        user: {
          userMail: "",
          registerDate: Date.now(),
          lastConection: Date.now(),
          matchCounter: 100,
          matchUsers: [],
          name: "",
          foto: "",
        },
      },
      show: true,
    };
  },

  methods: {
    register() {
      if (this.password.length < 8) {
        alert("contraseña debe ser mayor a 8 caracteres");
        return;
      }
      if (this.password != this.password2) {
        alert("las contraseñas no coinciden");
        return;
      }
      this.form.user.foto = this.starwarsapi[this.random_number].image;
      this.signUp({
        email: this.form.user.userMail,
        password: this.password,
        newUser: this.form,
      });
      this.getAnotherUsers()
    },
    randomIntFromInterval() {
      return Math.floor(Math.random() * (20 - 0 + 1) + 0);
    },
    ...mapActions(["signIn", "signUp", "signOut", "instanceFirestore","getMyData","getCurrentUser","getAnotherUsers"]),
  },  computed: {
    ...mapState(["usuario", "miData", "otherUsers"]),
  },
  created() {
    fetch("https://akabab.github.io/starwars-api/api/all.json")
      .then((response) => response.json())
      .then((data) => (this.starwarsapi = data));

    this.instanceFirestore(getFirestore);

  },
  
    mounted() {
      this.getCurrentUser();
      this.getMyData();
}
};
</script>

<style scoped>
.form {
  padding-bottom: 2rem;
}
button {
  margin: 13px 12px 12px 10px;
}

button {
  margin: 13px;
}
.form-container {
  margin-top: 100px;
}
.form-container__image {
  width: 500px;
}

.overflow-hidden {
  background-color: black;
  padding: 0px;
  border-radius: 20px;
  height: 555px;
}
</style>