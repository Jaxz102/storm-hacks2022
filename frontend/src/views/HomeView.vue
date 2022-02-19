<template>
  <main>

  </main>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss"scoped>
@import "../assets/styles.scss";

main{
  width: 100%;
  height: 100%;
  background-color: $bg;
}

</style>
