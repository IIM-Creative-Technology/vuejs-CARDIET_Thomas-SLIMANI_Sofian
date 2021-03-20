<template>
  <h1>Page de blog</h1>
  <blog-list :blogs="blogs"/>
</template>

<script>

import BlogList from '@/components/Blog/BlogList';
import Vuex from "vuex";

export default {
name: "Blog",
  components: {
    BlogList
  },
  computed: {
    ...Vuex.mapGetters(['blogs']),
  },
}
</script>

<style scoped>

</style>