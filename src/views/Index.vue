<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-8">
        <router-link
          to="/create"
          class="btn btn-primary btn-sm rounded shadow mb-3"
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
    <div class="card mt-5 rounded shadow" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
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
    let result = await axios.get("https://vue-be.herokuapp.com/api/v1/users");
    console.warn(result.data.data.users);
    this.list = result.data.data.users;
  },
  async mounted() {
    let result = await axios.get("https://vue-fix.herokuapp.com/api/v1/groups");
    console.warn(result.data.data.users);
    this.grouplist = result.data.data;
  },
};
</script>