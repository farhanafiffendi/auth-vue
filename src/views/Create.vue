<template>
  <div class="container-fluid mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>Add User</h4>
            <hr />
            <form @submit.prevent="adduser">
              <div class="form-group">
                <label>Email</label>
                <input
                  type="email"
                  v-model="user.email"
                  class="form-control"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div class="form-group">
                <label>Name</label>
                <input
                  type="text"
                  v-model="user.name"
                  class="form-control"
                  placeholder="Name"
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
      name: "",
    });

    //state validation
    const validation = ref(false);

    //method register
    function adduser() {
      //define variable
      let email = user.email;
      let name = user.name;

      //send server with axios
      axios
        .post("https://vue-fix.herokuapp.com/api/v1/member", {
          email,
          name,
        })
        .then(() => {
          //redirect ke halaman login
          return router.push("/");
        })
        .catch((error) => {
          //set validation dari error response
          console.log(error);
        });
    }

    return {
      user, // <-- state user
      validation, // <-- state validation
      adduser, // <-- method register
    };
  },
};
</script>