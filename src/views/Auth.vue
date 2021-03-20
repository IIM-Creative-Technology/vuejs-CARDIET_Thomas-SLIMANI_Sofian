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
    checkAuth() {
      if(this.current_user !== null) return router.push({name: 'Blog'});
    },
    toggleAuth() {
      this.auth_type++;
      if(this.auth_type > 1) this.auth_type = 0;
    },
    sendError(error) {
      this.error = error;
    }
  },
  beforeMount(){
    this.checkAuth();
  },
}
</script>

<style scoped>

</style>