<template>
  <div id="connection-block">
    <h2 id="title">Formulaire de connexion</h2>
    <input type="email" placeholder="Email" v-model="user.email"><br>
    <input type="password" placeholder="Mot de passe" v-model="user.password"><br>
    <button @click.prevent="VerifyUser">Se connecter</button>
    <p>Pas encore de compte? <a href="#" @click.prevent="toggleAuth">S'inscrire</a></p>
  </div>
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
    // on récupère les states de vuex
    ...Vuex.mapGetters(['users']),
    ...Vuex.mapGetters(['current_user']),
  },
  methods: {
    ...Vuex.mapActions(['authUser']),
    // on vérifie l'authentification
    VerifyUser() {
      // on récupère l'utilisateur avec le même email
      let user = this.users.filter(user => user.email === this.user.email);
      // si il y en a aucun on envoie une erreur
      if(user.length <= 0) {
        this.sendError('Utilisateur non enregistré');
      }
      else {
        // on compare le hashpass avec bcrypt
        bcrypt.compare(this.user.password, user[0].password, (err, res) => {
          if(!res) return this.sendError('Mail ou Mot de passe incorrect');
          // on emploie la fonction authUser de notre store
          else this.authUser(user[0])
        })
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

  #connection-block {
    width: 40%;
    margin: 20px auto;
    border: gray 1px solid;
    padding: 5px;
  }

  #title {
    margin: 20px 0;
    font-size: 1.8em;
  }

  input {
    margin: 10px 0;
    font-size: 1.5em;
  }

  button {
    margin: 15px 0;
    border: none;
    font-size: 1.5em;
    outline: none;
    padding: 4px;
    border-radius: 5px;
  }
  
  button:hover {
    cursor: pointer;
    background-color: #42b983;
  }

  a {
    text-decoration: none;
    color: #42b983;
  }

</style>