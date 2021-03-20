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
    ...Vuex.mapGetters(['blogs']),
    ...Vuex.mapGetters(['current_user']),
  },
  methods: {
    toggleCreator() {
      this.creator = !this.creator;
    },
    toggleEditor(blog) {
      this.editor.toggle = !this.editor.toggle;
      this.editor.blog = blog;
    },
    checkAuth() {
        //if(this.current_user === null) return router.push({name: 'Blog'});
    },
  },
  beforeMount(){
    this.checkAuth();
  },
}
</script>

<style scoped>

</style>