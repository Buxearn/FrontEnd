<template>
    <div style="padding: 30px; text-align: center">
        <panel style="padding: 25px; margin: 20px; display: inline-block">
            <h2>General Management</h2>
            <h3>Give Points</h3>
            <input type="number" placeholder="Points" v-model="givePointsAmount"><br>
            <input type="text"  placeholder="User" v-model="givePointsUser"><br>
            <button @click="givePoints(givePointsUser, givePointsAmount)">Give</button><br>
            <hr><br>
            <h3>Promo Codes</h3>
            <h4>Create</h4>
            <input type="text" placeholder="Code" v-model="createPromoCode"><br>
            <input type="number" placeholder="Value" v-model="createPromoValue"><br>
            <input type="number" placeholder="Uses" v-model="createPromoUses"><br>
            <button @click="createPromo()">Create</button>
            <hr><br>
            <h3>Daily Reward: {{ dailyReward }}</h3>
            <input type="number" placeholder="Set reward" v-model="setDailyReward">
            <button @click="changeDailyReward(setDailyReward)">Set</button>
            <hr><br>
            <h3>Set Youtube Video</h3>
            <input type="text" placeholder="URL" v-model="youtubeUrl">
            <button @click="setYoutubeURL()">Set</button>
        </panel>
        <panel style="padding: 25px; margin: 20px; display: inline-block;">
            <h2>Reseller Account Management</h2>
            <h4>Pending Reseller Applications</h4>
            <div class="pendingAccounts">
                <resellerItem v-for="application in resellerApplicationList" :key="application" :message="'User: ' + application.name + ' - Robux Group: ' + application.group" :approve="approveApplication" :approveParam="application.name" :reject="rejectAppliction" :rejectParam="application.name" ></resellerItem>
            </div>
            <hr><br>
            <h4>Active Reseller Accounts</h4>
            <resellerItem v-for="account in resellerAccountList" :key="account" :message="'User: ' + account.name + ' - Robux Group: ' + account.group" :reject="removeAccount" :rejectParam="account.name" ></resellerItem>
            <hr><br>
            <h4>Pending Payout Requests</h4>
        </panel>
        <panel style="padding: 25px; margin: 20px; display: inline-block">
            <h2>Admin Account</h2>
            <h3>Change Password</h3>
            <input type="password" placeholder="Password" v-model="password"><br>
            <input type="password" placeholder="Repeat Password" v-model="repeatPassword">
            <br><br>
            <button @click="changePassword(password, repeatPassword)">Change Password</button>
            <br><br><hr><br>
            <button @click="signout()">Signout</button>
        </panel>
    </div>
</template>

<script>
import panel from '../panel'
import resellerItem from '../adminComp/resellerItem'

export default {
    name: 'Admin',
    components: {
      panel,
      resellerItem
    },
    data() {
        return {
            password: '',
            repeatPassword: '',
            givePointsUser: '',
            givePointsAmount: undefined,
            dailyReward: undefined,
            setDailyReward: undefined,
            showPromoDetails: false,
            createPromoCode: undefined,
            createPromoValue: undefined,
            createPromoUses: undefined,
            resellerApplicationList: [],
            resellerAccountList: [],
            youtubeUrl: undefined
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
        },
        signout() {
            localStorage.removeItem('adminAuth')
            this.$router.push('/admin/login')
        },
        givePoints(u, a) {
            fetch(`${this.$apiHostname}/api/givepoints`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': localStorage.adminAuth
                },
                body: JSON.stringify({ user: u, amount: a}),
                mode: 'cors'}).then(result => result.json()).then(json => {
                    if (json.stauts === 'sucess') {
                        alert(`Sent ${u} ${a} Robux!`)
                    } else {
                        alert(`Error, Robux not sent`)
                    }
                    this.givePointsUser = ''
                    this.givePointsAmount = ''
                })
        },
        changePassword(p, p2) {
            if (p === p2) {
                fetch(`${this.$apiHostname}/admin/setpassword`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': localStorage.adminAuth
                },
                body: JSON.stringify({ pass: p }),
                mode: 'cors'
                })
                .then(result => result.json())
                .then(json => {
                    if (json.auth !== undefined) {
                        localStorage.adminAuth = json.auth
                        alert('Changed Password.')
                    } else {
                        alert(`Error, password not changed.`)
                    }
                    this.password = ''
                    this.repeatPassword = ''    
                })
                
            } else {
                alert('Passwords do not match.')
                this.password = ''
                this.repeatPassword = ''
            }
        },
        changeDailyReward(x) {
            fetch(`${this.$apiHostname}/admin/setdailyreward`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': localStorage.adminAuth
                },
                body: JSON.stringify({ value: x }),
                mode: 'cors'
            })
            .then(result => result.json())
            .then(json => {
                if (json.status === 'sucess') {
                    alert('Changed daily reward.')
                    this.dailyReward = x
                } else {
                    alert(`Error, daily reward not changed.`)
                }
                this.setDailyReward = ''
            })
        },
        createPromo() {
            fetch(`${this.$apiHostname}/api/create/promo`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': localStorage.adminAuth
                },
                body: JSON.stringify({ name: this.createPromoCode, value: this.createPromoValue, uses: this.createPromoUses }),
                mode: 'cors'
                })
                .then(result => result.json())
                .then(json => {
                    alert(json.status) 
                })
        },
        approveApplication(user) {
            fetch(`${this.$apiHostname}/api/resller/applications/approve`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': localStorage.adminAuth
                },
                body: JSON.stringify({ name: user }),
                mode: 'cors'
                })
                .then(() => { this.refreshResellerList() })
        },
        rejectAppliction(user) {
            fetch(`${this.$apiHostname}/api/resller/applications/reject`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': localStorage.adminAuth
                },
                body: JSON.stringify({ name: user }),
                mode: 'cors'
                })
                .then(() => { this.refreshResellerList() })
        },
        removeAccount(user) {
            fetch(`${this.$apiHostname}/api/resller/accounts/remove`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': localStorage.adminAuth
                },
                body: JSON.stringify({ name: user }),
                mode: 'cors'
                })
                .then(() => { this.refreshResellerList() })
        },
        refreshResellerList() {
            fetch(`${this.$apiHostname}/api/reseller/applications`, {
                method: 'POST',
                headers: {
                    'authorization': localStorage.adminAuth
                },
                mode: 'cors'
                })
                .then(result => result.json())
                .then(json => {
                    this.resellerApplicationList = []
                    Object.keys(json).forEach(key => {
                        this.resellerApplicationList.push({ name: key, group: json[key].group })
                    })
                })
            fetch(`${this.$apiHostname}/api/reseller/accounts`, {
                    method: 'POST',
                    headers: {
                        'authorization': localStorage.adminAuth
                    },
                    mode: 'cors'
                    })
                    .then(result => result.json())
                    .then(json => {
                        this.resellerAccountList = []
                        Object.keys(json).forEach(key => {
                            this.resellerAccountList.push({ name: key, group: json[key].group })
                        })
                    })
        },
        setYoutubeURL() {
            const _key = new URL(this.youtubeUrl).search.split('v=')[1].split('&')[0]
            fetch(`${this.$apiHostname}/api/youtube/set`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': localStorage.adminAuth
                },
                body: JSON.stringify({ key: _key }),
                mode: 'cors'
                })
                .then(data => data.json())
                .then(json => alert(json.status))
        }
    },
    mounted() {
        fetch(`${this.$apiHostname}/admin/getdailyreward`)
            .then(result => result.json())
            .then(json => this.dailyReward = json.value)
        this.refreshResellerList()
        
    }
}
</script>