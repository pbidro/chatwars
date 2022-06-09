<template>
  <div>
    <b-navbar  toggleable="lg" type="dark" variant="info">
      <b-navbar-brand
        ><img src="../assets/img/landing/logo.png"
      /></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ms-auto">
          <b-nav-form>
            <b-avatar
              variant="info"
              :src="miData.data.user.foto"
              class="mr-3"
            ></b-avatar>
            <span class="ms-1" style="color: white"> {{ usuario }}</span>
            <b-button
              size="sm"
              class="my-2 my-sm-0"
              variant="warning"
              @click="
                /*signUp({
                  email: `topo${Date.now()}@acac.cl`,
                  password: 'acac123',
                }),
                  getAnotherUsers() */
                  signOut()
              "
            >
          

                          <b-icon-power></b-icon-power> 

                  
          </b-button
            >
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container class="contenedor_panel" fluid>
      <!-- Content here -->
        <div class="sideNav" title="Sidebar">
            <b-list-group>
              <b-list-group-item class="d-flex align-items-center justify-content-center">
                  <b-button
                    variant="danger"
                  >
                    {{ miData.data.user.matchCounter }} <b-icon-heart-fill></b-icon-heart-fill> restantes
                  </b-button>

              </b-list-group-item>

              <b-list-group-item class="d-flex align-items-center justify-content-center">
                <b-dropdown variant="outline-danger">
                  <template #button-content>
                    Notificaciones
                    <b-badge pill class="pill bg-danger">
                      {{ getPendingMatch().length }}</b-badge
                    >
                  </template>
                  <b-dropdown-item
                    v-for="pendings in getPendingMatch()"
                    :key="pendings.id"
                    >{{ pendings.matchUser }} {{ pendings.document }}

                    <b-button
                      href="#"
                      variant="success"
                      @click="
                        approveMatch({
                          fromUser: miData,
                          toUser: getTargetUser(pendings.document),
                        })
                      "
                      >Approve</b-button
                    >
                    <b-button
                      href="#"
                      variant="danger"
                      @click="
                        rejectMatch({
                          fromUser: miData,
                          toUser: getTargetUser(pendings.document),
                        })
                      "
                      >Reject</b-button
                    >
                  </b-dropdown-item>
                </b-dropdown>
              </b-list-group-item>
              <b-list-group-item class="d-flex align-items-center">
                <b> Amigos </b>
              </b-list-group-item>

              <b-list-group-item
                class="d-flex align-items-center"
                v-for="friends in getAcceptedMatch()"
                :key="friends.id"
              >
                {{ friends.data.user.userMail }}

                <!-- Botón Modal-->
                <router-link :to="'chat/' + friends.data.user.userMail">
                  <b-button variant="success">
                    <b-icon-chat-dots-fill></b-icon-chat-dots-fill>
                  </b-button>
                </router-link>
              </b-list-group-item>
            </b-list-group>
          </div>
      <b-row>
  

        <b-col class="12">
          <b-container class="bv-example-row sidecontent">
            <b-row>
              <b-col
                v-for="user in getNotMatchedUsers(getAllMatchDocs())"
                :key="user._id"
                lg="4" md="6" xs="12"
              >
                <b-card
                  :title="user.data.user.name"
                  :img-src="user.data.user.foto"
                  img-alt="Image"
                  img-top
                  tag="article"
                  style="max-width: 20rem"
                  class="mb-2"
                >
                  <b-card-text> {{ user.data.user.userMail }} </b-card-text>

                  <b-button
                    href="#"
                    variant="danger"
                    @click="sendMatch({ fromUser: miData, toUser: user })"
                  >
                    <b-icon-heart-fill></b-icon-heart-fill>
                  </b-button>
                </b-card>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { getFirestore } from "firebase/firestore";

import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "EntryPoint",
  data() {
    return {};
  },
  created() {
    this.instanceFirestore(getFirestore);
  },
  methods: {
    ...mapActions([
      "signIn",
      "getCurrentUser",
      "signUp",
      "getMyData",
      "instanceFirestore",
      "getAnotherUsers",
      "sendMatch",
      "approveMatch",
      "rejectMatch",
      "signOut"
    ]),

  },
  computed: {
    ...mapState(["usuario", "miData", "otherUsers"]),
    ...mapGetters([
      "getPendingMatch",
      "getTargetUser",
      "getNotMatchedUsers",
      "getAllMatchDocs",
      "getAcceptedMatch",
    ]),
  },
  mounted() {
    this.getAnotherUsers();
  },
};
</script>

<style  lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

li {
  list-style-type: none;
}

a {
  text-decoration: none;
}
.sideNav {
  float: left;
  position: relative;
  z-index: 1;
}

.sidecontent {
  display: flex;
}

.bg-info {
  background-color: #6200ee !important;
}

.contenedor_panel{
  margin-top:15px;
}
</style>
