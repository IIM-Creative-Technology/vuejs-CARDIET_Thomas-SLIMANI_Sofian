<template>
  <h1>Vue</h1>
  <h2>{{ blog.title }}</h2>
  <img :src="blog.img" alt="">
  <p>{{ blog.content }}</p>

  <h3>Posté le {{ date }}</h3>
</template>

<script>

import Vuex from "vuex";

export default {
  props: ['title'],
  name: "BlogView",
  data() {
    return {
      months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
    }
  },
  computed: {
    ...Vuex.mapGetters(['blogs']),
    blog() {
      return this.blogs.filter(blog => blog.title === this.$route.params.title)[0]
    },
    date: function () {
      return this.blog.date.getDate() + " " + this.months[this.blog.date.getMonth()] + " " + this.blog.date.getFullYear();
    },
  }
}
</script>

<style scoped>

  .current-page {
    background-color: #42b983;
  }

</style>