<template>
  <button class="button" @click.prevent="toggleCreator">Créer une page</button>
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
  .button,
  button::after {
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }
  .button {
    background: none;
    border: 4px solid #000000;
    border-radius: 10px;
    color: #000000;
    display: block;
    font-size: 0.7em;
    font-weight: bold;
    margin: 5px auto;
    padding: 1em 3em;
    position: relative;
    text-transform: uppercase;
  }
  .button::before,
  button::after {
    background: #000000;
    content: '';
    position: absolute;
    z-index: -1;
    height: 100%;
    left: 0;
    top: 0;
    width: 0;
  }
  .button:hover {
    color: #ffffff;
  }

  .button:hover:after {
    width: 100%;
  }
</style>