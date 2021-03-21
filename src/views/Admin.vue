<template>
  <button @click.prevent="toggleCreator">Créer une page</button>
  <admin-creator v-if="creator" v-on:toggleCreator="toggleCreator" :blogs="blogs"/>
  <admin-editor v-if="editor.toggle" v-on:toggleEditor="toggleEditor($event)" :current_blog="editor.blog"/>
  <admin-list v-on:toggleEditor="toggleEditor($event)" :blogs="blogs"/>
</template>

<script>
import AdminList from '@/components/Admin/AdminList';
import AdminCreator from '@/components/Admin/AdminCreator';
import AdminEditor from "@/components/Admin/AdminEditor";
import Vuex from "vuex";
//import router from "@/router";

export default {
  name: "Admin",
  components: {
    AdminEditor,
    AdminList,
    AdminCreator
  },
  data() {
    return {
      creator: false,
      editor: {
        toggle: false,
        blog: {}
      },
    }
  },
  computed: {
    // récupérer les données stockées dans vuex
    ...Vuex.mapGetters(['blogs']),
    ...Vuex.mapGetters(['current_user']),
  },
  methods: {
    // Afficher / Désactiver le créateur de blog
    toggleCreator() {
      if(!this.creator) {
        setTimeout(function () {
          let creator = document.getElementById('creator-block');
          creator.classList.toggle('activated');
          let overlay = document.getElementById('overlay-creator');
          overlay.classList.toggle('activated');
        }, 0.1);
      }
      this.creator = !this.creator;
    },
    // Afficher / Désactiver l'éditeur de blog
    toggleEditor(blog) {
      // on définit le blog à modifier
      this.editor.blog = blog;

      if(!this.editor.toggle) {
        setTimeout(function () {
          let editor = document.getElementById('editor-block');
          editor.classList.toggle('activated');
          let overlay = document.getElementById('overlay-editor');
          overlay.classList.toggle('activated');
        }, 0.1);
      }

      this.editor.toggle = !this.editor.toggle;
    },
    // Vérification si l'utilisateur est connecté
    checkAuth() {
      // on redirect si il ne l'est pas
      //if(this.current_user === null) return router.push({name: 'Blog'});
    },
  },
  // méthodes à appeler lors du chargement de la page
  beforeMount(){
    this.checkAuth();
  },
}
</script>

<style scoped>

</style>