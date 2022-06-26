<template>
  <div class="row justify-content-md-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">Register</div>
        <div class="card-body">
          <form @submit.prevent="register">
            <div v-if="validation" class="mt-2 alert alert-danger">
              {{ validation }}
            </div>
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                class="form-control"
                v-model="user.name"
                placeholder="Name.."
              />
            </div>
            <div class="form-group">
              <label for="email">Email address</label>
              <input
                type="email"
                v-model="user.email"
                class="form-control"
                placeholder="Email.."
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Password.."
                v-model="user.password"
              />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
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
      name: "",
      email: "",
      password: "",
    });

    //state validation
    const validation = ref(false);

    //method register
    function register() {
      //define variable
      let name = user.name;
      let email = user.email;
      let password = user.password;

      //send server with axios
      axios
        .post("https://vue-be.herokuapp.com/api/v1/register", {
          name,
          email,
          password,
        })
        .then(() => {
          //redirect ke halaman login
          return router.push({
            name: "Login",
          });
        })
        .catch((error) => {
          //set validation dari error response
          validation.value = error.response.data.message;
        });
    }

    return {
      user, // <-- state user
      validation, // <-- state validation
      register, // <-- method register
    };
  },
};
</script>
