<template>
  <div @click.prevent="toggleEditor" id="overlay"></div>
  <div id="creator-block">
    <h2>Modifier la page '{{ blog.title }}'</h2>

    <label>Meta Title</label>
    <input type="text" placeholder="Meta Title" v-model="blog.meta_title" ><br>

    <label>Meta Description</label>
    <input type="text" placeholder="Meta Description" v-model="blog.meta_description"><br>

    <label>Image</label>
    <input type="text" placeholder="Image Link" v-model="blog.img"><br>

    <label>Content</label>
    <textarea placeholder="Corps du post" v-model="blog.content"/><br>

    <button @click.prevent="changeBlog(blog)">Modifier la page</button>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  name: "BlogEditor",
  props: ['current_blog'],
  emits: ['toggleEditor'],
  data() {
    return {
      blog: this.current_blog
    }
  },
  methods: {
    toggleEditor() {
      this.$emit('toggleEditor');
    },
    // Edition de blog
    changeBlog(blog) {
      // On emploie la fonction editBlog dans notre store
      this.editBlog(blog);
      // on remet à 0
      this.blog = {meta_title: '', meta_description: '', img: '', content: '',};
      this.toggleEditor();
    },
    ...Vuex.mapActions(['editBlog']),
  }
}
</script>

<style scoped>
  #overlay {
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  #creator-block {
    position: fixed;
    width: 80%;
    height: 90%;
    background-color: white;
    left: 10%;
    top: 5%;
  }
</style>