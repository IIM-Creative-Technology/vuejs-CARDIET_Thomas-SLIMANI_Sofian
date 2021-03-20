<template>
  <h2>Formulaire d'inscription</h2>
  <input type="email" placeholder="Email" v-model="user.email"><br>
  <input type="text" placeholder="User" v-model="user.pseudo"><br>
  <input type="password" placeholder="Mot de passe" v-model="user.password"><br>
  <input type="password" placeholder="Confirmer mot de passe" v-model="user.confirm_password"><br>
  <button @click.prevent="register">S'enregistrer</button>
  <p>Déjà un compte? <a href="#" @click.prevent="toggleAuth">Se connecter</a></p>

  {{ users }}
</template>

<script>
import Vuex from "vuex";
import bcrypt from 'bcryptjs';

export default {
  name: "AuthLogin",
  emits: ['toggleAuth', 'sendError'],
  data() {
    return {
      user: {
        email: '',
        pseudo: '',
        password: '',
        confirm_password: '',
      }
    }
  },
  computed: {
    ...Vuex.mapGetters(['users']),
  },
  methods: {
    // on réalise une fonction pour encrypter les mots de passe grâce à bcrypt
    encryptPassword(password) {
      // on définit la taille du hash
      const salt = bcrypt.genSaltSync(10)
      return bcrypt.hashSync(password, salt)
    },
    register() {
      // on vérifie si le mot de passe et la confirmation sont pareils
       if(this.user.password !== this.user.confirm_password) {
         this.sendError('Les mots de passe ne correspondent pas');
       }else {
         // on encrypt avec la fonction crée au dessus
         this.user.password = this.encryptPassword(this.user.password);
         // on emploie la fonction addUser de notre store
         this.addUser(this.user);
         // on vide user
         this.user.email = '';
         this.user.pseudo = '';
         this.user.password = '';
         this.user.confirm_password = '';
       }
    },
    ...Vuex.mapActions(['addUser']),
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