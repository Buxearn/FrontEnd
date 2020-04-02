<template>
  <div class="main">
    <h1>Payout</h1>
    <panel>
      <h3>Withdraw ROBUX!</h3>
      <p>You must complete at least 2 offers to be eligible to withdraw</p>
      <p>Minimum withdraw: 5 RBX</p>
      <br />
      <input type="number" placeholder="Amount" v-model="withdrawAmount" />
      <button :disabled="withdrawAmount < 5" @click="getGroup()">
        Withdraw
      </button>
      <div v-show="group">
        <br />
        <h4>Join this group before clicking Confirm</h4>
        <p>If you do not join the group you will lose your Robux</p>
        <a :href="group" target="_blank" rel="noopener noreferrer"
          ><button @click="clickedJoin = true">Join Group</button></a
        >
      </div>
      <div v-show="clickedJoin">
        <br />
        <h4>Click Payout AFTER you have JOINED the group</h4>
        <button @click="payout()">Payout</button>
      </div>
    </panel>
    <panel>
      <Cashouts></Cashouts>
    </panel>
  </div>
</template>

<script>
import panel from "../panel";
import Cashouts from "../Cashouts";

export default {
  name: "Payout",
  components: {
    panel,
    Cashouts,
  },
  data() {
    return {
      withdrawAmount: 5,
      group: undefined,
      clickedJoin: false,
    };
  },
  methods: {
    getGroup() {
      this.group = undefined;
      this.clickedJoin = false;
      fetch(`${this.$apiHostname}/api/payout/getgroup`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ amount: this.withdrawAmount }),
        mode: "cors",
      })
        .then((data) => data.json())
        .then((json) => {
          if (json.status === "Robux Available") {
            this.group = `https://www.roblox.com/groups/${json.groupId}`;
          } else {
            alert(json.status);
          }
        });
    },
    payout() {
      fetch(`${this.$apiHostname}/api/payout/pay`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          amount: this.withdrawAmount,
          user: localStorage.account,
        }),
        mode: "cors",
      })
        .then((data) => data.json())
        .then((json) => {
          alert(JSON.stringify(json));
          (this.withdrawAmount = undefined),
            (this.group = undefined),
            (this.clickedJoin = false);
        });
    },
  },
};
</script>

<style scoped>
.main {
  width: calc(100% - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.main > * {
  margin: 20px;
}
@media screen and (max-width: 720px) {
 .main {
    width: 100%;
 } 
}
</style>
