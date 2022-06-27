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
                  v-model="user.anggotapertama"
                  aria-label="Default select example"
                  as="select"
                >
                  <option
                    v-for="item in grouplist"
                    :value="item.id"
                    :key="item.id"
                    :selected="item === user.anggotapertama"
                  >
                    {{ item.email }}
                  </option>
                </select>
                <label>Select users</label>
                <select
                  class="form-select"
                  v-model="user.anggotakedua"
                  aria-label="Default select example"
                  as="select"
                >
                  <option value="" disabled></option>
                  <option
                    v-for="item in grouplist"
                    :value="item.id"
                    :key="item.id"
                    :selected="item === user.anggotakedua"
                  >
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
      anggotapertama: "",
      anggotakedua: "",
    });

    //state validation
    const validation = ref(false);

    //method register
    function addgroup() {
      //define variable
      let grupname = user.grupname;
      let anggotapertama = user.anggotapertama;
      let anggotakedua = user.anggotakedua;

      //send server with axios
      axios
        .post("https://vue-fix.herokuapp.com/api/v1/group", {
          grupname,
          anggotapertama,
          anggotakedua,
        })
        .then(() => {
          //redirect ke halaman home
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