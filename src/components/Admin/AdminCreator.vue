<template>
  <div @click.prevent="toggleCreator" id="overlay"></div>
  <div id="creator-block">
    <h2>Créer une nouvelle page</h2>

    <p v-if="error" class="error-block">{{ error }}</p>

    <input type="text" placeholder="Title" v-model="blog.title"><br>
    <input type="text" placeholder="Meta Title" v-model="blog.meta_title"><br>
    <input type="text" placeholder="Meta Description" v-model="blog.meta_description"><br>
    <input type="file" placeholder="Image Link" @change="onFileSelected"><br>
    <textarea placeholder="Corps du post" v-model="blog.content"/><br>

    <button @click.prevent="createBlog(blog)">Créer la page</button>
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
        img: null,
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
    createBlog(blog) {
      // On vérifie si le titre existe déjà
      if(this.blogs.filter(blog => blog.title === this.blog.title)) {
        return this.sendError('Ce titre est déjà utilisé')
      }
      // On utilise la fonction addBlog dans notre store
      this.addBlog(blog);
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

      console.log(this.blog.img)
    },
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