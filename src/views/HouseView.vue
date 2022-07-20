<template>
  <div id="house-container" ref="threejs"></div>
</template>

<script>
import { Three } from "@/utils/house"
export default {
  name: "HouseView",
  data() {
    return {
      cameraObj: {
        radian: 40,
        aspect: 2,
        position: {
          x: 0,
          y: 0,
          z: 5000,
        },
        far: 10000
      },
      geometryObj: {
        width: 10000,
        height: 10000,
      },
      materialObj: {
        color: 0xffffff, 
      },
    };
  },
  mounted() {
    const threeUI = new Three(
      this.$refs.threejs,
      this.cameraObj,
      this.geometryObj,
      this.materialObj
    );
    threeUI.init(); // 渲染
    // threeUI.animate();
  },
};
</script>

<style>
</style>