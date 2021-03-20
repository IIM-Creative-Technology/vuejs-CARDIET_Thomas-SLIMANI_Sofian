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
      // on récupère le blog en fonction du titre
      // *lors de la création on peut mettre un seul titre donc il y aura obligatoirement 1 seul blog dans le tableau d'où l'index [0]
      return this.blogs.filter(blog => blog.title === this.$route.params.title)[0]
    },
    // on forme la date de création
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