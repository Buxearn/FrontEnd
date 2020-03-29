<template>
    <div style="margin: auto; text-align: center">
        <panel style="margin: auto; padding: 25px; margin-top: 35px; display: inline-block">
            <h2>Resller Login</h2>
            <input type="text" placeholder="Username" v-model="username"><br>
            <input type="password" placeholder="Password" v-model="password"><br>
            <button @click="signin(username, password)">Signin</button>
        </panel>
        <panel style="margin: 25px 25px 25px 25px; padding: 25px; margin-top: 35px; display: inline-block">
            <h2>Apply for Reseller</h2>
            <input type="text" placeholder="Username" v-model="applyUsername"><br>
            <input type="password" placeholder="Password" v-model="applyPassword"><br>
            <input type="text" placeholder="Roblox Group" v-model="applyGroup"><br>
            <button @click="apply()">Apply</button>
        </panel>
    </div>
</template>

<script>
import panel from '../panel'

export default {
    name: 'ResellerLogin',
    components: {
      panel
    },
    data() {
        return {
            username: undefined,
            password: undefined,
            applyUsername: undefined,
            applyPassword: undefined,
            applyGroup: undefined
        }
    },
    methods: {
        signin(u, p) {
            fetch(`${this.$apiHostname}/reseller/auth`, {
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
                    localStorage.resellerAuth = result.auth
                    localStorage.resellerUsername = u
                    this.$router.push('/reseller')
                } else {
                    alert('Error')
                }
            })
        },
        apply() {
            fetch(`${this.$apiHostname}/api/reseller/apply`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ name: this.applyUsername, pass: this.applyPassword, group: this.applyGroup }),
                mode: 'cors'
            })
            .then(result => result.json())
            .then(result => {
                alert(JSON.stringify(result.status))
                this.applyUsername = undefined
                this.applyPassword = undefined
                this.applyGroup = undefined
            })
        }
    }
}
</script>