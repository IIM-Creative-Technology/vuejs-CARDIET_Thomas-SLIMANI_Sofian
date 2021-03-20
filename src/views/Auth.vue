<template>
  <h1>Page d'authentification</h1>
  <p v-if="error" class="error-block">{{ error }}</p>
  <auth-login v-if="auth_type === 0" v-on:toggleAuth="toggleAuth" v-on:sendError="sendError($event)"/>
  <auth-register v-if="auth_type === 1" v-on:toggleAuth="toggleAuth" v-on:sendError="sendError($event)"/>
</template>

<script>
import AuthLogin from "@/components/Auth/AuthLogin";
import AuthRegister from "@/components/Auth/AuthRegister";
import Vuex from "vuex";
import router from "@/router";

export default {
  name: "Auth",
  data() {
    return {
      auth_type: 0,
      error: null,
    }
  },
  computed: {
    ...Vuex.mapGetters(['current_user']),
  },
  components: {
    AuthLogin,
    AuthRegister
  },
  methods: {
    // Vérification si l'utilisateur est connecté
    checkAuth() {
      // on redirect si il ne l'est pas
      if(this.current_user !== null) return router.push({name: 'Blog'});
    },
    // Passer du mode connexion à inscription
    toggleAuth() {
      this.auth_type++;
      if(this.auth_type > 1) this.auth_type = 0;
    },
    // Afficher les erreurs
    sendError(error) {
      this.error = error;
    }
  },
  // méthodes à appeler lors du chargement de la page
  beforeMount(){
    this.checkAuth();
  },
}
</script>

<style scoped>

</style>