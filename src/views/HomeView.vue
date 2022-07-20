<template>
  <div class="home" ref="threejs">

  </div>
</template>

<script>
import { Three } from "@/utils/three"

export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      cameraObj: {
        radian: 75,
        position: {
          x: 0,
          y: 0,
          z: 10,
        },
      },
      geometryObj: {
        width: 1,
        height: 1,
        depth: 10,
      },
      materialObj: {
        color: 0x00ff00,
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
    threeUI.animate();
  },
}
</script>
