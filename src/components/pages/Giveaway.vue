<template>
  <div class="main">
    <h1>Giveaways</h1>
    <h3>Must complete at least one offer to join</h3>
    <panel class="enter">
      <div>
        <h2>{{ timer }}</h2>
        <p>Next Giveaway In</p>
      </div>
      <button @click="enter()">Enter Giveaway</button>
      <div>
        <h2>10 R$</h2>
        <h3>Giveaway Amount</h3>
      </div>
    </panel>
    <panel class="winner">
      <h3>Last Winner</h3>
      <h1>{{ lastWinner }}</h1>
      <img :src="`https://www.roblox.com/Thumbs/Avatar.ashx?x=200&y=200&username=${lastWinner}`"/>
    </panel>
  </div>
</template>

<script>
import panel from "../panel";

export default {
  name: "Giveaway",
  components: {
    panel,
  },
  data() {
    return {
      lastWinner: ". . .",
      timer: "Giveway ends every hour",
    };
  },
  methods: {
    enter() {
      fetch(`${this.$apiHostname}/api/giveaway/join`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ user: localStorage.account }),
        mode: "cors",
      })
        .then((data) => data.json())
        .then((json) => {
          alert(json.status);
        });
    },
  },
  mounted() {
    fetch(`${this.$apiHostname}/api/giveaway/lastwinner`)
      .then((raw) => raw.text())
      .then((text) => (this.lastWinner = text));
    setInterval(() => {
      const now = new Date();
      const mins = now.getMinutes();
      const secs = now.getSeconds();
      this.timer = 60 - mins - 1 + "m " + (60 - secs) + "s";
    }, 1000);
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
  width: 80%;
  margin: 15px;
  text-align: center;
}
.enter {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
