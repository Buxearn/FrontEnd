<template>
    <div>
       <Nav>
            <div class="logo" style="user-select: none; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none;">
                <a href="#" @click="$router.push('/')">
                    <img src="../assets/BUXEARN.png" style="height: 60px; transform: translateY(-1px); user-select: none; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none;">
                </a>
            </div>
            <div class="right">
                <div class="links">
                    <router-link class="Navbar__Link" to="/earn"><font-awesome-icon icon="money-bill"/><span> Earn</span></router-link>
                    <router-link class="Navbar__Link" to="/daily"><font-awesome-icon icon="clock"/> Daily Reward</router-link>
                    <a href="https://discord.gg/j3EYh9j" target="_blank" class="Navbar__Link"><font-awesome-icon :icon="['fab', 'discord']"/> Discord</a>
                    <router-link class="Navbar__Link" to="/giveaway"><font-awesome-icon icon="gift"/> Giveaway</router-link>
                    <router-link class="Navbar__Link" to="/payout"><font-awesome-icon icon="money-check-alt"/> Payout</router-link>
                    <router-link class="Navbar__Link" to="/account"><font-awesome-icon icon="user"/> Account</router-link>
                </div>
                <div class="avatar">
                    <div v-if="getAccount.loggedin" class="loggedIn" style="width: 190px; height: 58px;">
                        <img style="height: 58px; width: 58px; border-radius: 26.5px; display: inline" :src="'https://www.roblox.com/Thumbs/Avatar.ashx?x=200&y=200&username=' + getAccount.name">
                        <p style="display: inline-block; top: 100%; transform: translateY(-42%); font-size: 16px" @click="getBalance()">R$ {{ balance }} | <a @click="logout()">Logout</a></p>
                    </div>
                    <div v-else><router-link to="/signin" style="color: white">Sign In</router-link></div>
                </div>
                <div class="toggleNav">
                    <div>
                        <font-awesome-icon @click="showMenu = !showMenu" icon="bars"/>
                    </div>
                </div>
            </div>
        </Nav>
        <div class="NavMobile">
            <transition name="slide-fade">
                <div v-show="showMenu" class="mobileMenu">
                    <div v-if="getAccount.loggedin" class="loggedIn" style="width: 100%; height: 58px;">
                        <img style="height: 58px; width: 58px; border-radius: 26.5px; display: inline" :src="'https://www.roblox.com/Thumbs/Avatar.ashx?x=200&y=200&username=' + getAccount.name">
                        <p style="display: inline-block; top: 100%; transform: translateY(-75%); font-size: 16px" @click="getBalance()">R$ {{ balance }} | <span @click="logout()">Logout</span></p>
                        <hr>
                    </div>
                    <div v-else><router-link to="/signin" >Sign In</router-link></div>
                    <router-link to="/earn"><font-awesome-icon icon="money-bill"/> Earn</router-link>
                    <router-link to="/daily"><font-awesome-icon icon="clock"/> Daily Reward</router-link>
                    <a href="https://discord.gg/6yYtjGn" target="_blank"><font-awesome-icon :icon="['fab', 'discord']"/> Discord</a>
                    <router-link to="/giveaway"><font-awesome-icon icon="gift"/> Giveaway</router-link>
                    <router-link to="/payout"><font-awesome-icon icon="money-check-alt"/> Payout</router-link>
                    <router-link to="/account"><font-awesome-icon icon="user"/> Account</router-link>
                </div>
            </transition>
        </div>
    <div  class="announcement">
      <h1><a href="https://discord.gg/j3EYh9j" target="_blank">Join our New Discord!</a></h1>
    </div>
    </div>
</template>

<script>
    export default {
        name: 'NavBar',
        data() {
            return {
                showMenu: false,
                account: this.updateAccount(),
                balance: 0
            }
        },
        methods: {
            logout() {
                localStorage.removeItem('account')
                this.$router.push('/')
            },
            updateAccount() {
                if (localStorage.account) {
                    return {
                        loggedin: true,
                        name: localStorage.account
                    }
                } else {
                    return {
                        loggedin: false
                    }
                }
            },
            getBalance() {
                fetch(`${this.$apiHostname}/api/account?name=${localStorage.account}`)
                .then(raw => raw.json())
                .then(accountData => {
                    this.balance = JSON.parse(accountData).balance
                })
            }
        },
        watch: {
            $route() {
                this.account = this.updateAccount()
                this.getBalance()
            }
        },
        computed: {
            getAccount() {
                return this.account
            }
        },
        mounted() {
            this.getBalance()
            setInterval(() => this.getBalance(), 15000);
        }
    }
</script>

<style scoped>
    .announcement {
      width: 100%;
      background-color: white;
    }
    .announcement > h1 {
      padding: 20px;
      text-align: center;
      font-size: 32px;
    }
    .announcement > h1 > a {
      color: red;
    }
    .announcement > h1 > a:hover {
      background-color: red;
color: white;
    }
    Nav {
        width: 100%;
        height: 58px;
        background: #24CEE7;
        color: white;
        display: flex;
        z-index: 50;
    }

    .NavMobile {
        z-index: 5;
        position: absolute;
        width: 100%;
    }

    Nav div {
        display: flex;
    }

    .logo {
        padding-left: 15px;
        font-size: 32px;
        line-height: 58px;
    }

    .logo a {
        text-decoration-line: none;
        color: white;
    }

    .right {
        margin-left: auto;
        line-height: 58px;
    }

    .loggedIn {
        height: 58px;
        display: block;
    }
    
    .loggedIn li {
        display: block;
        line-height: 28px;
        margin: auto;
        text-align: right;
    }

    .right div {
        margin-right: 10px;
    }

    .toggleNav {
        line-height: 58px;
        width: 29px;
        position: relative;
        padding: 5px;
        display: none;
    }

    .links a {
        text-decoration: none;
        color: white;
        margin-left: 10px;
        font-size: 20px;
    }
    .toggleNav div {
        width: 14px;
        height: 1em;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 25px;
        cursor: pointer;
    }

    .Navbar__Link {
        padding-right: 5px;
        font-size: 20px;
    }

    .Navbar__Link:hover {
        color: #e2e2e2;
        cursor: pointer;
    }

    .mobileMenu a:hover {
        color: #8a8686;
        cursor: pointer;
    }

    .mobileMenu {
        background-color: white;
        text-align: center;
        display: none;
    }

    .mobileMenu a {
        text-decoration: none;
        color: black;
        padding: 7px;
        display: block;
    }

    @media only screen and (max-width: 768px) {
        .toggleNav {
            display: inline-block;
        }

        .links {
            display: none;
        }

        .mobileMenu {
            display: block;
        }

        .avatar {
            display: none;
        }
    }

    @media only screen and (max-width: 1000px) {
        .links svg {
            display: none;
        }
        .links a {
            font-size: 18px;
        }
    }

    .slide-fade-enter-active {
        transition: all .2s ease;
    }
    .slide-fade-leave-active {
        transition: all .2s;
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateY(-40px);
        opacity: 0;
    }
</style>
