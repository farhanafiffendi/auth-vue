<template>
  <div class="container-fluid mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>Add Group</h4>
            <hr />
            <form @submit.prevent="addgroup">
              <div class="form-group">
                <label>Group Name</label>
                <input
                  type="teks"
                  v-model="user.grupname"
                  class="form-control"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div class="form-group">
                <label>Select users</label>
                <select
                  class="form-select"
                  v-model="user.pertama"
                  aria-label="Default select example"
                  as="select"
                >
                  <option
                    v-for="item in grouplist"
                    :key="item.id"
                    value="item.id"
                  >
                    {{ item.email }}
                  </option>
                </select>
                <label>Select users</label>
                <select
                  class="form-select"
                  v-model="user.kedua"
                  aria-label="Default select example"
                >
                  <option v-for="item in grouplist" :key="item.id">
                    {{ item.email }}
                  </option>
                </select>
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
      grupname: "",
      pertama: "",
      kedua: "",
    });

    //state validation
    const validation = ref(false);

    //method register
    function addgroup() {
      //define variable
      let grupname = user.grupname;
      let pertama = user.pertama;
      let kedua = user.kedua;

      //send server with axios
      axios
        .post("https://vue-fix.herokuapp.com/api/v1/group", {
          grupname,
          pertama,
          kedua,
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
      addgroup, // <-- method register
    };
  },
  data() {
    return {
      grouplist: [],
    };
  },
  async mounted() {
    let result = await axios.get(
      "https://vue-fix.herokuapp.com/api/v1/members"
    );
    console.warn(result.data.data.users);
    this.grouplist = result.data.data;
  },
};
</script>