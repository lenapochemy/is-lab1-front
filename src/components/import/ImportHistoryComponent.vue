<script>
import {api} from "@/axios.js";

export default {
  data() {
    return {
      imports: []
    }
  },
  methods: {
    getAllImports() {
      api.get("/files/history")
          .then(response => {
            if (response.status === 200) {
              this.imports = response.data;
            }
          })
          .catch(error => {
            document.getElementById("res_import").innerHTML = error;
          })
    },
    download(id) {
      api.get("/files/" + id, {responseType: 'blob'})
          .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.download = "file_" + id + ".json";
                link.click();
                window.URL.revokeObjectURL(url);
              }
          )
          .catch(error => {
            document.getElementById("res_import").innerHTML = error;
          })
    }
  },
  mounted() {
    this.getAllImports();
  }
}
</script>

<template>
  <p id="res_import"/>
  <table border="1">
    <tbody>
    <tr>
      <th>id</th>
      <th>user login</th>
      <th>status</th>
      <th>object count</th>
    </tr>
    <tr v-for="imp in imports">
      <td>{{ imp.id }}</td>
      <td>{{ imp.user.login }}</td>
      <td>{{ imp.status }}</td>
      <td>{{ imp.count }}</td>
      <td v-if="imp.status">
        <input class="but" type="submit" @click.prevent="this.download(imp.id)" value="download"/>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>