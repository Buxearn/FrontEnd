<template>
    <div>
        <panel style="padding: 25px; margin: 20px; display: inline-block;">
            <h2>Reseller Account Management</h2>
            <p>.ROBLOSECURITY Cookie:</p>
            <textarea id="" cols="30" rows="10" v-model="setROBLOSECURITY"></textarea>
            <p>Group ID:</p>
            <input type="text" v-model="setGroupID"><br>
            <button @click="setPayoutConfig(setROBLOSECURITY, setGroupID)">Save</button>
        </panel>
        <panel style="padding: 25px; margin: 20px; display: inline-block;">
            <h2>Balances</h2>
            <h4>Roblox Account Balance: {{ RobloxBalance }} RBX - Sold RBX: {{ outstandingBalance }}</h4>
            <br>
            <p>Selling Status: {{ sellingStatus }}</p>
            <button v-show="RobloxBalance >= 5 && sellingStatus === 'disabled'" @click="setEnable()">Enable</button><br>
            <button v-show="sellingStatus === 'enabled'" @click="setDisable()">Disable</button>
            <br><br><br>
            <div style="margin: auto; text-align: center">
                <button @click="logout()">Sign Out</button>
            </div>
        </panel>
        <br>
    </div>
</template>

<script>
import panel from '../panel'

export default {
    name: 'Reseller',
    components: {
      panel
    },
    data() {
        return {
            setGroupID: '',
            setROBLOSECURITY: '',
            RobloxBalance: 0,
            sellingStatus: 'disabled',
            outstandingBalance: 0,
            realGroupID: '',
            realROBLOSECURITY: ''
        }
    },
    methods: {
        setPayoutConfig(c, i) {
            fetch(`${this.$apiHostname}/reseller/setpayoutconfig`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': localStorage.resellerAuth
                },
                body: JSON.stringify({ cookie: c, id: i, user: localStorage.resellerUsername }),
                mode: 'cors'
                })
                .then(result => result.json())
                .then(json => {
                    if (json.status === 'success') {
                        this.realGroupID = i
                        this.realROBLOSECURITY = c
                        alert('Saved Config.')
                    } else {
                        alert(`Error, not changed!`)
                    }    
                })
        },
        logout() {
            localStorage.removeItem('resellerAuth')
            this.$router.push('/reseller/login')
        },
        getRobloxBalance() {
            fetch(`${this.$apiHostname}/reseller/getrobloxbalance`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': localStorage.resellerAuth
                },
                body: JSON.stringify({ user: localStorage.resellerUsername, cookie: this.setROBLOSECURITY, id: this.setGroupID }),
                mode: 'cors'
                })
                .then(result => result.json())
                .then(json => {
                    if (json.status === 'success') {
                        this.RobloxBalance = json.balance
                    }
                    this.getStatus()
                })
        },
        getStatus() {
            fetch(`${this.$apiHostname}/reseller/status`, {
                method: 'POST',
                headers: {
                    'authorization': localStorage.resellerAuth,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ user: localStorage.resellerUsername }),
                mode: 'cors'
            })
            .then(result => result.json())
            .then(json => {
                if (json.status === true) {
                    if (this.RobloxBalance < 5) {
                        this.setDisable()
                    }
                    this.sellingStatus = 'enabled'
                } else {
                    this.sellingStatus = 'disabled'
                }
            })
        },
        setEnable() {
            fetch(`${this.$apiHostname}/reseller/enable`, {
                method: 'POST',
                headers: {
                    'authorization': localStorage.resellerAuth,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ user: localStorage.resellerUsername, cookie: this.realROBLOSECURITY, id: this.realGroupID }),
                mode: 'cors'
            })
            .then(result => result.json())
            .then(json => {
                if (json.status === 'success') {
                    this.sellingStatus = 'enabled'
                } else {
                    this.sellingStatus = 'disabled'
                }
            })
        },
        setDisable() {
            fetch(`${this.$apiHostname}/reseller/disable`, {
                method: 'POST',
                headers: {
                    'authorization': localStorage.resellerAuth,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ user: localStorage.resellerUsername }),
                mode: 'cors'
            })
            .then(result => result.json())
            .then(json => {
                if (json.status === 'success') {
                    this.sellingStatus = 'disabled'
                } else {
                    this.sellingStatus = 'enabled'
                }
            })
        }
    },
    mounted() {
        fetch(`${this.$apiHostname}/reseller/getpayoutconfig`, {
            method: 'POST',
            headers: {
                'authorization': localStorage.resellerAuth,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ user: localStorage.resellerUsername }),
            mode: 'cors'
        })
        .then(result => result.json())
        .then(json => {
            this.setGroupID = json.id
            this.realGroupID = json.id
            this.realROBLOSECURITY = json.cookie
            this.setROBLOSECURITY = json.cookie
            this.outstandingBalance = json.balance
            this.getRobloxBalance()
        })
    }
}
</script>

<style>

</style>