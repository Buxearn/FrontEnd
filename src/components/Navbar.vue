<template>
  <div>
    <div class="toggleNav">
      <a @click="showMenu = !showMenu">
        <font-awesome-icon icon="bars" />
      </a>
    </div>
    <Nav :class="showMenu ? 'show' : ''" v-show="getAccount.loggedin">
      <div class="avatar">
        <img
          class="grow"
          :src="
            'https://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&username=' +
              getAccount.name
          "
        />
        <h1>{{ getAccount.name }}</h1>
        <h3 class="balance"><span>R$</span>{{ balance }}</h3>
      </div>
      <div class="links">
        <router-link to="/earn">
          <font-awesome-icon icon="tasks" />
          <span>Earn</span>
        </router-link>
        <router-link to="/daily">
          <font-awesome-icon icon="clock" />
          <span>Daily Reward</span>
        </router-link>
        <router-link to="/giveaway">
          <font-awesome-icon icon="gift" />
          <span>Giveaways</span>
        </router-link>
        <router-link to="/payout">
          <font-awesome-icon style="padding-left: 0px; padding-right: 4px" icon="money-check-alt" />
          <span>Payout</span>
        </router-link>
        <router-link to="/account" style="padding-right: 5px; padding-left: 3px;">
          <font-awesome-icon icon="user" />
          <span>Account</span>
        </router-link>
        <router-link href="https://discord.gg/j3EYh9j" target="_blank">
          <font-awesome-icon icon="money-bill" />
          <span>Help</span>
        </router-link>
        <br />
        <a @click="logout()">
          <span>Logout</span>
        </a>
      </div>
      <div class="bottom">
        <div style="display: flex; flex-direction: row; justify-content: space-evenly; padding: 5px;">
          <router-link to="/policies" style="text-decoration: none; color: inherit">Policies</router-link>
          <router-link to="/tos" style="text-decoration: none; color: inherit">Terms</router-link>
        </div>
        <div class="social">
          <font-awesome-icon :icon="['fab', 'discord']" />
          <font-awesome-icon :icon="['fab', 'youtube']" />
        </div>
      </div>
    </Nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      showMenu: false,
      account: this.updateAccount(),
      balance: 0,
      page: undefined,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("account");
      this.$router.push("/");
    },
    updateAccount() {
      if (localStorage.account) {
        return {
          loggedin: true,
          name: localStorage.account,
        };
      } else {
        return {
          loggedin: false,
        };
      }
    },
    getBalance() {
      fetch(`${this.$apiHostname}/api/account?name=${localStorage.account}`)
        .then((raw) => raw.json())
        .then((accountData) => {
          this.balance = JSON.parse(accountData).balance;
        });
    },
  },
  watch: {
    $route() {
      this.page = this.$route.path;
      this.account = this.updateAccount();
      this.getBalance();
    },
  },
  computed: {
    getAccount() {
      return this.account;
    },
  },
  mounted() {
    this.getBalance();
    setInterval(() => this.getBalance(), 15000);
  },
};
</script>

<style scoped>
nav {
  width: 200px;
  height: 100%;
  background-color: #11577b;
}
nav > .links {
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 25px 5px;
}
nav > .links > a {
  color: white;
  text-decoration: none;
  font-size: 24px;
  margin: -2px 10px;
  display: flex;
  align-items: center;
}
nav > .links > a > svg {
  padding: 10px 5px;
  margin-right: 5px;
  border-right: 2px solid #88abbd;
}
.router-link-active {
  color: #91cdec !important;
}
nav > .links > a:hover {
  color: #91cdec;
}
.avatar {
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.avatar > * {
  margin: 5px;
}
.avatar > .balance {
  padding: 5px;
  border-radius: 10px;
  background-color: #319cd3;
  padding-right: 10px;
}
.avatar > .balance > span {
  background-color: #11577b;
  border-radius: 7px 0px 0px 7px;
  padding: 3px;
  margin-right: 5px;
}
.avatar > img {
  border-radius: 75px;
  background-color: white;
  border: solid 5px #1b3241;
}
.bottom {
  position: absolute;
  width: 200px;
  bottom: 0px;
  color: white;
  background-color: #07354d;
}
.social {
  background-color: #0f242f;
  padding: 5px;
  font-size: 30px;
display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.social > svg {
  padding: 5px;
}
.social > svg:hover {
  color: grey;
}
.toggleNav {
  display: none;
}

@media screen and (max-width: 720px) {
  .toggleNav {
    display: block;
    width: 100vw;
    color: white;
    font-size: 32px;
    text-align: center;
    background-color: #11577b;
  }
  nav {
    width: 100%;
    display: none;
    height: fit-content;
  }
  nav.show {
    display: block;
  }
  .bottom {
    position: relative;
  }
  .bottom {
    width: 100%;
  }
}
</style>
