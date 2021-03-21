<template>
  <h1>Liste des pages</h1>
  <ul>
    <li class="article" v-for="blog in getBlogsPage" :key="blog">
      <img :src="blog.img" alt="">
      <div class="block">
        <h2>{{ blog.title }}</h2>
        <h3>{{ blog.meta_title }}</h3>
        <h4>{{ blog.meta_description }}</h4>
      </div>

      <button class="edit" @click.prevent="toggleEditor(blog)">Editer</button>
      <button class="suppr" @click.prevent="deleteBlog(blog)">supprimer</button>
    </li>
  </ul>

  <div class="pagination">
    <button v-if="!isFirstPage" @click.prevent="changePage(current_page)">Précédent</button>
    <button :class="{'current-page' : nb === current_page}" @click.prevent="changePage(nb+1)" v-for="nb in getFollowingPages" :key="nb">{{ nb + 1 }}</button>
    ...
    <button @click.prevent="changePage(getNbPage)">{{ getNbPage }}</button>
    <button v-if="!isLastPage" @click.prevent="changePage(current_page+2)">Suivant</button>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  name: "BlogList",
  props: ['blogs'],
  emits: ['toggleEditor'],
  data() {
    return {
      current_page: 0,
      per_page: 2,
    }
  },
  computed: {
    // On récupère les blogs en fonction du numéro de page
    getBlogsPage() {
      // on récupère de début du tableau en fonction de la page actuelle
      let start_blog = this.per_page*this.current_page;
      // et la fin pour avoir un interval
      let end_blog = start_blog+this.per_page;
      // on récupère uniquement la partie du tableau qu'on souhaite
      return this.blogs.slice(start_blog,end_blog);
    },
    // on récupère le nombre de page à afficher
    getNbPage() {
      // on arrondit à l'entier au dessus
      // on divise le nombre de blogs par le nombre de page
      return Math.ceil(this.blogs.length/this.per_page);
    },
    // on réalise un tableau contenant la page précédente, actuelle et suivante
    getFollowingPages() {
      let followings = [];
      // on vérifie si la page précédente existe
      if(!this.isFirstPage) {
        followings.push(this.current_page-1);
      }
      followings.push(this.current_page);
      // on vérifie si la page suivante existe
      if(!this.isLastPage) {
        followings.push(this.current_page+1);
      }
      return followings;
    },
    isFirstPage() {
      return !this.current_page > 0;
    },
    isLastPage() {
      return this.current_page >= this.getNbPage-1;
    }
  },
  methods: {
    toggleEditor(blog) {
      this.$emit('toggleEditor', blog)
    },
    ...Vuex.mapActions(['deleteBlog']),
    // on change la page et donc les blogs affichés
    changePage(nb) {
      this.current_page = nb-1;
    },
  }
}
</script>

<style scoped>

  .current-page {
    background-color: #42b983;
  }

  .article{
    display: flex;
    width: 50%;
    background-color: #42b983;
    margin: 2em auto;
    padding: 0.3em 1em;
  }

  .block{
  }

  .edit{
    background: none;
    border: 2px solid #000000;
    display: block;
    font-size: 0.7em;
    font-weight: lighter;
    padding: 1em 2em;
    position: relative;
    text-transform: uppercase;
    height: 4em;
    margin: auto 0.5em auto 3em;

  }
  .suppr{
    background-color: red;
    color: #ffffff;
    border:none ;
    border-radius: 5px;

    display: block;
    font-size: 0.7em;
    font-weight: bold;
    padding: 1em 2em;
    position: relative;
    text-transform: uppercase;
    height: 4em;
    margin: auto 1em;
  }


</style>