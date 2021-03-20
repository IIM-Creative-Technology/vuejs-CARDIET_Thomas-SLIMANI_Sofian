<template>
  <h2>Formulaire de connexion</h2>
  <input type="email" placeholder="Email" v-model="user.email"><br>
  <input type="password" placeholder="Mot de passe" v-model="user.password"><br>
  <button @click.prevent="VerifyUser">Se connecter</button>
  <p>Pas encore de compte? <a href="#" @click.prevent="toggleAuth">S'inscrire</a></p>
</template>

<script>
import Vuex from "vuex";
import bcrypt from "bcryptjs";

export default {
  name: "AuthLogin",
  emits: ['toggleAuth', 'sendError'],
  data() {
    return {
      user: {
        email: '',
        password: '',
      }
    }
  },
  computed: {
    ...Vuex.mapGetters(['users']),
    ...Vuex.mapGetters(['current_user']),
  },
  methods: {
    ...Vuex.mapActions(['authUser']),
    VerifyUser() {
      let user = this.users.filter(user => user.email === this.user.email);
      if(user.length <= 0) {
        this.sendError('Utilisateur non enregistré');
      }
      else {
        bcrypt.compare(this.user.password, user[0].password, (err, res) => {
          if(!res) return this.sendError('Mail ou Mot de passe incorrect');
        })
        this.authUser(user[0])
      }
    },
    toggleAuth() {
      this.$emit('toggleAuth')
    },
    sendError(error) {
      this.$emit('sendError', error)
    }
  }
}
</script>

<style scoped>

</style>