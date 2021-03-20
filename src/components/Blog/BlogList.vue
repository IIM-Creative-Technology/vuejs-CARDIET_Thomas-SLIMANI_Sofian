<template>
  <h1>Liste des pages</h1>
  <ul>
    <li v-for="blog in getBlogsPage" :key="blog">
      <img v-bind:src="blog.img" alt="">
      <h2>{{ blog.title }}</h2>
      <router-link :to="{ name: 'BlogView', params: { title: blog.title} }">En savoir plus</router-link>
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

export default {
  name: "BlogList",
  props: ['blogs'],
  data() {
    return {
      current_page: 0,
      per_page: 2,
    }
  },
  computed: {
    getBlogsPage() {
      let start_blog = this.per_page*this.current_page;
      let end_blog = start_blog+this.per_page;
      return this.blogs.slice(start_blog,end_blog);
    },
    getNbPage() {
      return Math.ceil(this.blogs.length/this.per_page);
    },
    getFollowingPages() {
      let followings = [];
      if(!this.isFirstPage) {
        followings.push(this.current_page-1);
      }
      followings.push(this.current_page);
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
    changePage(nb) {
      this.current_page = nb-1;
    }
  }
}
</script>

<style scoped>

  .current-page {
    background-color: #42b983;
  }

</style>