<template>
  <div id="nav">
    <router-link v-if="isAuth" to="/admin">Gérer le Blog</router-link> |
    <router-link to="/">Blog</router-link> |
    <router-link v-if="!isAuth" to="/login">Login</router-link>
    <a href="#" v-else @click="disconnect">Se déconnecter</a>
  </div>
  <p id="author-name" v-if="isAuth">Bienvenue '{{ current_user }}'</p>
  <router-view/>
</template>

<script>
  import Vuex from "vuex";

  export default {
    name: 'App',
    computed: {
      ...Vuex.mapGetters(['current_user']),
      isAuth() {
        return this.current_user !== null;
      }
    },
    methods: {
      disconnect() {
        this.disconnectUser();
      },
      ...Vuex.mapActions(['disconnectUser']),
    }
  }
</script>

<style>

* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

ul {
  list-style: none;
}

#author-name {
  background-color: gray;
  color: white;
  padding: 10px 0;
  font-weight: bold;
  font-size: 1.6em;
  margin-bottom: 20px;
}
</style>
