<template>
  <panel style="margin: auto; padding: 25px; margin-top: 35px;">
    <h2>Admin Login</h2>
    <input type="text" placeholder="Username" v-model="username"><br>
    <input type="password" placeholder="Password" v-model="password"><br>
    <button @click="signin(username, password)">Signin</button>
    </panel>
</template>

<script>
import panel from '../panel'

export default {
    name: 'AdminLogin',
    components: {
      panel
    },
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        signin(u, p) {
            fetch(`${this.$apiHostname}/admin/auth`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ username: u, password: p}),
                mode: 'cors'
            })
            .then(result => result.json())
            .then(result => {
                if (result.auth) {
                    localStorage.adminAuth = result.auth
                    this.$router.push('/admin')
                } else {
                    alert('Error')
                }
            })
        }
    }
}
</script>