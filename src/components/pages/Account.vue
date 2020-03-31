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

      <panel>
        <h1>{{ account.totalEarned }}</h1>
        <h3>Robux Earned</h3>
      </panel>
      <panel>
        <h1>{{ account.balance }}</h1>
        <h3>Current Balance</h3>
      </panel>
      <panel>
        <h1>{{ account.totalEarned - account.balance }}</h1>
        <h3>Robux Paid Out</h3>
      </panel>
      <panel style="grid-column: span 3; padding: 25px 50px">
        <h3>Invite friends and earn Robux!</h3>
        <h4
          style="border-radius: 5px; padding: 15px;margin: 10px; outline: none; background-color: #e8eff4; color: black"
        >
          https://www.buxearn.com/#/?invite={{ name }}
        </h4>
        <p>You will earn 5% of all Robux your friends earn.</p>
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
  padding: 15px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.main > * {
  padding: 5px 0;
}
.grid {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  margin: 25px;
  align-items: center;
  justify-items: center;
  width: 80%;
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
.grid > * {
  /* width: 100%; */
}
</style>
