<template>
  <div>
    <div class="background">
      <h3></h3>
      <b-container class="container_background">
        <!-- Content here -->
        <b-row class="text-center container_row">
          <b-col
            cols="12" v-bind:class="{ sender_align: friends.from == usuario,receiver_align: friends.from != usuario  }"
            v-for="friends in getConversation(this.url_name).chat"
            :key="friends.id"
            
          >
          <div v-bind:class="{ sender: friends.from == usuario,receiver: friends.from != usuario  }">
             {{ friends.text }}
          </div>
            </b-col
          >

        </b-row>
<b-row class="text_input">
  <b-col class="2"></b-col>

  <b-col class="8"><b-form-input
          v-model="text"
          placeholder="Message"
          class="text_input--box"
        ></b-form-input> 
        
</b-col>
  <b-col class="2">
            <b-button
          href="#"
          variant="primary"
          class="text_input--button"
          @click="
            sendMessage({
              text: text,
              from: usuario,
              to: url_name,
              target: getTargetUser(targetDocument),
              date: Date.now(),
            })
          "
          >Send</b-button
        > 
  </b-col>
</b-row>
        
       
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { getFirestore } from "firebase/firestore";

export default {
  props: {},
  created() {
    this.instanceFirestore(getFirestore);
      window.addEventListener('scroll', this.handleScroll);

  },
  mounted() {
    this.url_name = this.$route.params.name;

    this.getAnotherUsers();

    this.targetDocument = this.getConversation(this.url_name).document;
    
  },
  data() {
    return {
      url_name: null,
      text: "",
      targetDocument: "",
          scrolled: false

    };
  },
  computed: {
    ...mapState(["usuario", "miData", "otherUsers"]),
    ...mapGetters(["getConversation", "getTargetUser"]),
  },
  methods: {
    ...mapActions(["instanceFirestore", "getAnotherUsers", "sendMessage"]),
      handleScroll () {
    this.scrolled = window.scrollY > 0;
  }
  },
};
</script>

<style >
*{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  
}
.background {
  position: relative;
  background-image: url("../assets/img/chat/1.jpeg");
  width: 100%;
  height: 100%;
  margin-top:-10px;
  display: block;
}

.container_background {
  background-color: rgb(229 218 255 / 80%);
  padding:30px;
    min-height:100vh ;

}

.container_row{
    display: flex;

  justify-content: flex-start;
    align-items: center;

}


.sender_align{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.receiver_align{
  justify-content: flex-end;
  align-items: center;
}

.sender{
  background-color: rgb(0 193 104);
  word-wrap: break-word;
  word-break: break-all;
  max-width: 70%;
  color:white;
  text-align: right;
  padding-left:30px;
  padding-right:30px;
  padding-top:10px;
  padding-bottom:10px;
  border-radius: 10px;
  margin-top:10px;
  }

  .receiver{
  background-color: rgb(0 129 241);
  color:white;
  max-width: 70%;
   word-wrap: break-word;
  word-break: break-all;
  text-align: left;
  padding-left:30px;
  padding-right:30px;
  padding-top:10px;
  padding-bottom:10px;
  border-radius: 10px;
  margin-top:10px;
  }

.text_input{
  margin-top:20px;
}

  .text_input--box{
    border-radius: 30px;
    display: inline;
    float: right;
    min-width:300px;
  }
    .text_input--button{
    border-radius: 30px;
    display: inline;
    float: left;
  }
</style>