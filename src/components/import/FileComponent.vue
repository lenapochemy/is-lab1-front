<script>
import {api} from "@/axios.js";
import {errorHandler} from "@/js/utils.js";

export default {
  data(){
    return {
      selectedFile: null,
      fileName: ''
    }
  },
  methods:{
    uploadFile(){
      let formData = new FormData();
      formData.append("file", this.selectedFile);

      api.post("/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(
          response => {
            this.fileName = response.data;
            document.getElementById("import_res").innerHTML = "success import";
            document.getElementById("import_error").innerHTML = "";
          }
      ).catch(error => {
        errorHandler(error.status, "import_error", "print", error.response.data);
        document.getElementById("import_res").innerHTML = "";
          }
      )
    },
    selectFile(event){
      this.selectedFile = event.target.files[0];
    },
  }
}
</script>

<template>

  <div>
<!--    <p>Upload file</p>-->
    <div>
      <form @submit.prevent="uploadFile">
        <label id="label" class="but" for="file">Select file</label>
        <input id="file" type="file" @change="selectFile">
        <br>
        <button class="but" type="submit">Import</button>
      </form>
<!--      <div v-if>-->
<!--        <-->
<!--      </div>-->
    </div>
    <p class="error" id="import_error"></p>
    <p id="import_res"></p>
  </div>

</template>

<style scoped>
#file {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  position: absolute;
  z-index: -1;
}

#label {
  background: lightpink;
  padding: 8px 15px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
  border: 1px solid ;
  margin-top: 30px;
  margin-bottom: 30px;
}

.but{
  background-color: deeppink;
  font-weight: bold;
  padding: 4px 9px 4px;
  font-size: medium;
  margin-top: 30px;
  margin-bottom: 30px;
}
.but:hover, .but:focus{
  background-color: lightpink;
}

</style>