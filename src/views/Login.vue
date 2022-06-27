<template>
  <div class="container-fluid mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div v-if="validation" class="mt-2 alert alert-danger">
          {{ validation }}
        </div>
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>LOGIN</h4>
            <hr />
            <form @submit.prevent="login">
              <div class="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  v-model="user.email"
                  class="form-control"
                  placeholder="Email Address"
                  required
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
  setup() {
    //inisialisasi vue router on Composition API
    const router = useRouter();

    //state user
    const user = reactive({
      email: "",
      password: "",
    });

    //state validation
    const validation = ref(false);

    //state loginFailed
    const loginFailed = ref(null);

    //method login
    function login() {
      //define variable
      let email = user.email;
      let password = user.password;

      //send server with axios
      axios
        .post("https://vue-be.herokuapp.com/api/v1/login", {
          email,
          password,
        })
        .then((response) => {
          if (response.status === 200) {
            //set token
            localStorage.setItem("token", response.data.data.token);

            //redirect ke halaman home
            return router.push("/");
          }

          //set state loggedIn to true
          loginFailed.value = true;
        })
        .catch((error) => {
          //set validation dari error response
          // loginFailed.value = false;
          validation.value = error.response.data.message;
        });
    }

    return {
      user, // <-- state user
      validation, // <-- state validation
      loginFailed, // <-- state loggedIn
      login, // <-- method login
    };
  },
};
</script>