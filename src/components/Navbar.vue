<template>
  <div>
    <div class="toggleNav">
      <a @click="showMenu = !showMenu">
          <font-awesome-icon icon="bars" />
      </a>
    </div>
    <Nav :class="showMenu ? 'show' : ''" v-show="getAccount.loggedin">
      <div class="avatar">
        <img class="grow"
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
          <font-awesome-icon icon="money-bill" />
          <span>Earn</span>
        </router-link>
        <router-link to="/daily">
          <font-awesome-icon icon="money-bill" />
          <span>Daily Reward</span>
        </router-link>
        <router-link to="/giveaway">
          <font-awesome-icon icon="money-bill" />
          <span>Giveaways</span>
        </router-link>
        <router-link to="/payout">
          <font-awesome-icon icon="money-bill" />
          <span>Payout</span>
        </router-link>
        <router-link to="/account">
          <font-awesome-icon icon="money-bill" />
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
  padding: 25px 0px 0px 0px;
  width: 200px;
  height: 100vh;
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
    position: absolute;
    display: none;
    height: 100%;
  }
  nav.show {
    display: block;
  }
}
</style>
