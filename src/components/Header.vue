<script >
export default {
  name: "Header",
  props: {
    title: String,
    name: String,
    group: String,
    variant: String
  }
}
</script>

<template>
  <div >
    <h1 id="my_name">{{name}}, {{group}}</h1>
    <h3 id="lab_work">{{title}}, вариант {{variant}}</h3>
  </div>


</template>


<style scoped>

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;

}

h3 {
  font-size: 1.2rem;
}


#my_name, #lab_work {
  font-family: fantasy;
  color: deeppink;
  //text-shadow: 2px 2px 2px black;
  font-size: 3rem;
  word-spacing: 4pt;
  letter-spacing: 2pt;
}

#lab_work{
  font-size: 2rem;
  letter-spacing: 1pt;
}


</style>
