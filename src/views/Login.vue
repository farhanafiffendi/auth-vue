<template>
  <div class="container-fluid mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <!-- <div v-if="validation" class="mt-2 alert alert-danger">
          {{ validation }}
        </div> -->
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>LOGIN</h4>
            <hr />
            <form  @submit.prevent="login">>
              <div class="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  v-model="user.email"
                  class="form-control"
                  placeholder="Email Address"
                />
              </div>
              <div class="form-group">
                <label>Password</label>
                <input
                  type="password"
                  v-model="user.password"
                  class="form-control"
                  placeholder="Password"
                  required
                />
              </div>
              <div class="d-grid gap-2 mt-2 d-md-block">
                <button class="btn btn-primary me-2" type="submit">
                  Simpan
                </button>
                <button class="btn btn-danger" type="reset">reset</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  data() {
      return {
        //state user
        user: {
          email: '',
          password: '',
        },
        //validation
        validation: []
      }
    },

    methods: {
      async login() {

        await axios.post("https://vue-be.herokuapp.com/api/v1/login", {
            email: this.user.email,
            password: this.user.password
          })
          .then((response) => {
         if(response.status === 200){
           localStorage.setItem("token", response.data.data.token);
           this.$store.commit("setUser", true)
           this.$store.commit("getUser", response.data.data)
            //redirect ke halaman home
            this.$router.push({
              name: 'Index'
            })
         }
          })
          .catch(error => {
            //assign validation
           console.log(error);
          })
      }

    },

    mounted() {
      console.log(this.$store.state.isUser);
      console.log(this.$store.state.user.email);
    }
};
</script>