<template>
  <div @click.prevent="toggleCreator" id="overlay-creator"></div>
  <div id="creator-block">
    <h2>Créer une nouvelle page</h2>

    <p v-if="error" class="error-block">{{ error }}</p>

    <input type="text" placeholder="Title" v-model="blog.title"><br>
    <input type="text" placeholder="Meta Title" v-model="blog.meta_title"><br>
    <input type="text" placeholder="Meta Description" v-model="blog.meta_description"><br>
    <input type="text" placeholder="Image URL" v-model="blog.img"><br>
<!--    <input type="file" placeholder="Image Link" @change="onFileSelected"><br>-->
    <textarea placeholder="Corps du post" v-model="blog.content"/><br>

    <button @click.prevent="createBlog">Créer la page</button>
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
</style>