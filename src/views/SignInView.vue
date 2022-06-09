<template>
  <div class="form">


<b-container class="form-container"> 

  <b-card no-body class="overflow-hidden text-white bg-dark" >
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img src="https://i.pinimg.com/originals/f4/01/6c/f4016cd613e6217d349ed16b8363471e.jpg" alt="Image" class="hover-shadow"></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body title="Inscribirse">


             

  
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>


</b-container>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          food: null,
          checked: []
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
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