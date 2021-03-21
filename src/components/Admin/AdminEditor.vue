<template>
  <div @click.prevent="toggleEditor" id="overlay-editor"></div>
  <div id="editor-block">
    <h2>Modifier la page '{{ blog.title }}'</h2>

    <div class="form">

      <div class="line-form">
        <label>Meta Title</label>
        <input type="text" v-model="blog.meta_title"><br>
      </div>
      <div class="line-form">
        <label>Meta Description</label>
        <input type="text" v-model="blog.meta_description"><br>
      </div>
      <div class="line-form">
        <label>Image URL</label>
        <input type="text" v-model="blog.img"><br>
      </div>
      <div class="line-form">
        <label>Corps du post</label>
        <textarea  v-model="blog.content"/><br>
      </div>
    </div>

    <button class="edit" @click.prevent="changeBlog">Modifier la page</button>
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
      this.$emit('toggleEditor', this.blog);
    },
    // Edition de blog
    changeBlog() {
      // On emploie la fonction editBlog dans notre store
      this.editBlog(this.blog);
      // on remet à 0
      this.blog = {meta_title: '', meta_description: '', img: '', content: '',};
      this.toggleEditor();
    },
    ...Vuex.mapActions(['editBlog']),
  }
}
</script>

<style scoped>
  #overlay-editor {
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: none;
  }

  #overlay-editor.activated {
    display: block;
  }

  #editor-block {
    position: fixed;
    width: 50%;
    height: 100%;
    background-color: white;
    right: 0;
    top: 0;
    transform: translate(100%);
    transition: transform .2s ease-out;
    z-index: 999;
  }

  #editor-block.activated {
    transform: translateX(0);
  }

  .form{
    width: 80%;
    margin: 2em auto;
    text-align: left;
  }
  .line-form{
    margin: 1em;
  }

  label{
    display: block;
    width: 150px;
    float: left;
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
    margin: auto;

  }
</style>