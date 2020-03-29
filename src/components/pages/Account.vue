<template>
  <div class="main">
    <h2 style="text-align: center">Your account</h2><br>
    <panel style="margin: auto; text-align: center">
      <div>
        <img style="height: 200px; width: 200px; border: 5px solid #24CEE7; border-radius: 100px;" :src="'https://www.roblox.com/Thumbs/Avatar.ashx?x=200&y=200&username=' + name">
        <br>
      </div>
      <div class="inline">
        <h4>Account</h4>
        <p>{{ name }}</p>
        <br>
      </div>
      <div class="inline">
        <h4>Balance</h4>
        <p>{{ account.balance }}</p>
        <br>
      </div>
      <div class="inline">
        <h4>Total Earned</h4>
        <p>{{ account.totalEarned }}</p>
        <br>
      </div>
      <div class="inline">
        <h4>Offers Completed</h4>
        <p>{{ account.offersComplete }}</p>
        <br>
      </div>
      <br>
      <button @click="$router.push('/payout')">Payout</button>
    </panel>
    <panel style="margin: 20px auto; padding: 30px;">
      <h3>Invite friends and earn Robux!</h3>
      <h4 style="border-radius: 5px; padding: 15px;margin: 10px; outline: none; background-color: #e8eff4;">https://www.buxearn.com/#/?invite={{ name }}</h4>
      <p>You will earn 5% of all Robux your friends earn.</p>
    </panel>
    <panel style="margin: 20px auto; padding: 30px">
      <h4>Redeem Promo Code</h4>
      <p>You must complete an offer to be eligble to redeem a promocode</p>
      <input type="text" placeholder="Code" v-model="promoInput">
      <button @click="redeemPromo()">Redeem</button>
    </panel>
  </div>
</template>

<script>
import panel from '../panel'

export default {
    name: 'Account',
    components: {
        panel
    },
    data() {
      return {
        name: localStorage.account,
        account: '',
        promoInput: undefined
      }
    },
    mounted() {
      fetch(`${this.$apiHostname}/api/account?name=${localStorage.account}`)
      .then(raw => raw.json())
      .then(accountData => {
        this.account = JSON.parse(accountData)
      })
    },
    methods: {
      redeemPromo() {
        fetch(`${this.$apiHostname}/api/redeem/promo`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ name: this.promoInput, user: localStorage.account }),
          mode: 'cors'
        })
        .then(() => this.promoInput = undefined)
      }
    }
}
</script>

<style scoped>
.main {
  padding: 30px;
}
.inline {
  display: inline-block;
  margin: 30px;
}
</style>
