<template>
  <div class="fond-view">
    <img :src="blog.img" alt="">
    <h2 id="title">{{ blog.title }}</h2>
    <p id="content">{{ blog.content }}</p>

    <div id="infos-block">
      <p id="date">Posté le {{ date }}</p>
      <p id="author">par <span>{{ blog.author }}</span></p>
    </div>
  </div>

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

  img {
    max-width: 40%;
  }

  #title {
    font-family: sans-serif;
    text-transform: uppercase;
  }

  #content {
    text-align: left;
    width: 40%;
    margin: 50px auto;
    background-color: gray;
    padding: 10px;
    color: white;
  }

  #infos-block {
    display: flex;
    justify-content: space-between;
    width: 40%;
    margin: auto;
  }

  #author > span {
    color: #9b1e1e;
    font-weight: bold;
  }

  .fond-view{
    background-color: #42b983;
    padding: 2em;

  }

</style>