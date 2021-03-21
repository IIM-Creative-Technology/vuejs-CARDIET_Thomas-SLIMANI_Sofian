<template>
  <div @click.prevent="toggleCreator" id="overlay-creator"></div>
  <div id="creator-block">
    <h2>Créer une nouvelle page</h2>

    <p v-if="error" class="error-block">{{ error }}</p>
  <div class="form">
    <div class="line-form">
      <label>Titre de la page</label>
      <input type="text" v-model="blog.title"><br>
    </div>
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




<!--    <input type="file" placeholder="Image Link" @change="onFileSelected"><br>-->


    <button class="edit" @click.prevent="createBlog">Créer la page</button>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  name: "BlogCreator",
  props: ['blogs'],
  data() {
    return {
      blog: {
        title: '',
        meta_title: '',
        meta_description: '',
        img: '',
        content: '',
      },
      error: ''
    }
  },
  emits: ['toggleCreator'],
  methods: {
    sendError(error) {
      this.error = error;
    },
    toggleCreator() {
      this.$emit('toggleCreator');
    },
    // Creation de blog
    createBlog() {
      // On vérifie si le titre existe déjà
      if(this.blogs.filter(blog => blog.title === this.blog.title).length > 0) {
        return this.sendError('Ce titre est déjà utilisé')
      }
      // On utilise la fonction addBlog dans notre store
      this.addBlog(this.blog);
      // on remet à 0
      this.blog = {title: '', meta_title: '', meta_description: '', img: '', content: '',};
      this.toggleCreator();
    },
    ...Vuex.mapActions(['addBlog']),

    onFileSelected(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.blog.img = files[0];
    },
    createImage(file) {
      let reader = new FileReader();

      reader.onload = (e) => {
        this.blog.img = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
}
</script>

<style scoped>
  #overlay-creator {
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: none;
  }

  #overlay-creator.activated {
    display: block;
  }

  #creator-block {
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

  #creator-block.activated {
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