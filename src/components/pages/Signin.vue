<template>
  <panel style="margin: auto; padding: 25px; margin-top: 35px;">
    <h2>Signin With Your Roblox Account</h2>
    <p>Enter your Roblox Username</p>
    <input type="text" placeholder="Username" v-model.trim="username">
    <button @click="signin(username)">Signin</button>
    </panel>
</template>

<script>
import panel from '../panel'

export default {
    name: 'Signin',
    components: {
      panel
    },
    methods: {
      signin(username) {
        if (username) {
          if (localStorage.refferal) {
            fetch(`${this.$apiHostname}/api/account?name=${String(localStorage.refferal).toLowerCase()}`)
              .then(() => {
                fetch(`${this.$apiHostname}/api/account?name=${String(username).toLowerCase()}?invite=${String(localStorage.refferal).toLowerCase()}`)
                .then(() => {
                  localStorage.account = username
                  this.$router.push('/earn')
                })
              })
          } else {
             fetch(`${this.$apiHostname}/api/account?name=${String(username).toLowerCase()}`)
              .then(() => {
                localStorage.account = username
                this.$router.push('/earn')
              })
          }
        }
      }
    }
}
</script>