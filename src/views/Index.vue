<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-8">
        <router-link
          to="/create"
          class="btn btn-primary btn-sm rounded shadow mb-3 me-4"
          >Add User
        </router-link>
        <router-link
          to="/add-group"
          class="btn btn-primary btn-sm rounded shadow mb-3"
          >Add Group
        </router-link>
        <div class="card rounded shadow">
          <div class="card-header">Data user</div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in list" :key="item.id">
                  <td>
                    {{ item.email }}
                  </td>
                  <td>{{ item.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="container d-flex flex-wrap">
      <div v-for="card in grouplist" :key="card.id">
        <div class="card mt-5 rounded shadow" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">{{ card.grupname }}</h5>
            <h6 class="card-subtitle mb-2 text-muted"></h6>
            <p class="card-text">{{ card?.pertama?.email }}</p>
            <p class="card-text">{{ card?.kedua?.email }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      list: [],
      grouplist: [],
    };
  },
  async mounted() {
    let response = await axios.get(
      "https://vue-fix.herokuapp.com/api/v1/members"
    );
    console.log(response.data.data);
    this.list = response.data.data;

    let result = await axios.get("https://vue-fix.herokuapp.com/api/v1/groups");
    console.log(result.data.data);
    this.grouplist = result.data.data;
  },
};
</script>