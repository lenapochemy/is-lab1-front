<script>
import {api} from "@/axios.js";
import {errorHandler} from "@/js/utils.js";


export default {
  name: "VisualizationComponent",
  data(){
    return {
      spaceMarines: [],
      canvas: null,
      ctx: null,
      colorMap: new Map(),
      colors: [],
      marine: {
        id: '',
        name: '',
        coordinates: {
          id: '',
          x: '',
          y: '',
        },
        chapter: {
          id: '',
          name: '',
          parentLegion: ''
        },
        health: '',
        category: '',
        weaponType: null,
        meleeWeapon: null
      },
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.getSpaceMarines();
    this.canvas.addEventListener('click', (event) => this.clickMarine(event));
    this.draw();
  },
  methods: {
    getSpaceMarines(){
      api.get("/space?filter_param=all")
          .then(response => {
            if(response.status === 200){
              // console.log(response.data);
              this.spaceMarines = response.data;
              // console.log(this.spaceMarines);
              this.draw();
            }
          })
          .catch(error => {
            errorHandler(error.response.status, "res_main_marine");
          })
      // this.draw();
    },
    getColor(owner){
      let color = this.colorMap.get(owner);
      let flag = false;
      while(!color && !flag){
        color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        console.log(color);
        if(!this.colors.includes(color)){
          flag = true;
          this.colorMap.set(owner, color);
          this.colors.push(color);
        }
      }
      return color;
    },
    draw(){
      this.ctx.clearRect(0 ,0, 800, 600);
      this.spaceMarines.forEach(marine => {
        const x = this.xToCanvas(marine.coordinates.x);
        const y = this.yToCanvas(marine.coordinates.y);
        const color = this.getColor(marine.user.login);
        // console.log(x, y);

        this.ctx.beginPath();
        this.ctx.arc(x, y, 10, 0, Math.PI*2);
        this.ctx.fillStyle = color;
        this.ctx.fill();

        this.ctx.fillStyle = 'black';
        // this.ctx.fillText(`${marine.name}`, x+15, y-5);
        // this.ctx.fillText(`(${marine.coordinates.x}, ${marine.coordinates.y})`, x+15, y+5);
      })
    },
    windowToCanvas(x, y){
      let bbox = this.canvas.getBoundingClientRect();
      return {x: x -bbox.left * (this.canvas.width / bbox.width),
        y: y - bbox.top * (this.canvas.height / bbox.height)
      };
    },
    xToCanvas(x){
      let  new_x = x + 400;
      return new_x;
    },
    yToCanvas(y){
      let new_y = (y + 300);
      return new_y;
    },
    xFromCanvas(x){
      let new_x = x - 400;
      return new_x;
    },
    yFromCanvas(y){
      let new_y = y - 300;
      return new_y;
    },
    clickMarine(event){
      this.draw();
      let loc = this.windowToCanvas(event.clientX, event.clientY);
      let x = this.xFromCanvas(loc.x);
      let y = this.yFromCanvas(loc.y);
      let spaceMarine = null;
      this.spaceMarines.forEach(mar => {
        // console.log(mar);
        if(Math.abs(mar.coordinates.x - x) < 10 && Math.abs(mar.coordinates.y - y) < 10){
              spaceMarine = mar;
            }
      })
      if(spaceMarine != null) {
        this.ctx.fillText(`name: ${spaceMarine.name}`, loc.x + 15, loc.y - 15);
        this.ctx.fillText(`user: ${spaceMarine.user.login}`, loc.x + 15, loc.y - 5);
        this.ctx.fillText(`coord: (${spaceMarine.coordinates.x}, ${spaceMarine.coordinates.y})`, loc.x + 15, loc.y + 5);
        this.ctx.fillText(`chapter: ${spaceMarine.chapter.name}`, loc.x + 15, loc.y + 15);
        this.ctx.fillText(`health: ${spaceMarine.health}`, loc.x + 15, loc.y + 25);
        this.ctx.fillText(`category: ${spaceMarine.category}`, loc.x + 15, loc.y + 35);
        this.ctx.fillText(`weapon: ${spaceMarine.weaponType}`, loc.x + 15, loc.y + 45);
        this.ctx.fillText(`meleeWeapon: ${spaceMarine.meleeWeapon}`, loc.x + 15, loc.y + 55);
      }
      // this.ctx.fillText(`name:${spaceMarine.name}, user:${spaceMarine.user.login}`, loc.x+15, loc.y+5);
    }
  }
}
</script>

<template>
  <div id="canvas">
    <canvas ref="canvas" width="800" height="600"></canvas>
  </div>
</template>

<style scoped>

#canvas {
  position: relative;
  margin: 30px;
  border: 1px solid #ccc;
}
</style>