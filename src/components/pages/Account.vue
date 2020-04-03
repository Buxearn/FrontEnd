<template>
  <div class="main">
    <h1>Account</h1>
    <h3>View your stats</h3>
    <section class="grid">
      <panel class="avatarAndPromo">
        <div class="avatar">
          <img
            style="height: 125px; width: 125px; border: 5px solid #1b3241; border-radius: 100px; margin: 10px; background-color: white"
            :src="
              `https://www.roblox.com/Thumbs/Avatar.ashx?x=200&y=200&username=${name}`
            "
          />
          <h2>{{ name }}</h2>
        </div>
        <div class="promo">
          <h2>Redeem Promo Code</h2>

          <input type="text" placeholder="Code" v-model="promoInput" />
          <button @click="redeemPromo()">Redeem</button>
          <p>You must complete an offer to be eligble to redeem a promocode</p>
        </div>
      </panel>
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-evenly; width: 100%;">
      <panel style="width: calc(30%)">
        <h1>{{ account.totalEarned }}</h1>
        <h3>Total Earned</h3>
      </panel>

      <panel style="width: calc(30% - 30px)">
        <h1>{{ account.balance }}</h1>
        <h3>Current Balance</h3>
      </panel>

      <panel style="width: calc(30% - 30px)">
        <h1>{{ account.totalEarned - account.balance }}</h1>
        <h3>Paid Out</h3>
      </panel>
      </div>
      <panel>
        <h3>Invite friends and earn points!</h3>
        <h4
          style="border-radius: 5px; padding: 15px;margin: 10px; outline: none; background-color: #e8eff4; color: black"
        >
          https://www.buxearn.com/#/?invite={{ name }}
        </h4>
        <p>You will earn 5% of all points your friends earn.</p>
      </panel>
    </section>
  </div>
</template>

<script>
import panel from "../panel";

export default {
  name: "Account",
  components: {
    panel,
  },
  data() {
    return {
      name: localStorage.account,
      account: "",
      promoInput: undefined,
    };
  },
  mounted() {
    fetch(`${this.$apiHostname}/api/account?name=${localStorage.account}`)
      .then((raw) => raw.json())
      .then((accountData) => {
        this.account = JSON.parse(accountData);
      });
  },
  methods: {
    redeemPromo() {
      fetch(`${this.$apiHostname}/api/redeem/promo`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: this.promoInput,
          user: localStorage.account,
        }),
        mode: "cors",
      }).then(() => (this.promoInput = undefined));
    },
  },
};
</script>

<style scoped>
.main {
  width: calc(100% - 200px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.main > * {
  padding: 5px 0;
}
.grid {
  display: flex;
  flex-direction: column;
}
.grid > * {
  margin: 10px 10px;
  width: calc(100% - 20px);
  justify-content: center;
}
.avatarAndPromo {
  grid-column: span 3;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}

.avatar {
  display: flex;
  display: row;
  align-items: center;
}
@media screen and (max-width: 720px) {
 .main {
    width: 100%;
 } 
}
</style>
