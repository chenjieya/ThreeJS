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
  mounted() {
    new Three(this.$refs.threejs).init();
  },
}
</script>
