<template>
  <div class="main">
    <h1>Daily Rewards</h1>
    <div>
      <h3>Claim Your Daily Reward</h3>
      <br />
      <p>You must complete an offer to use the daily reward</p>
      <div style="margin: auto">
        <h1>{{ countdown }}</h1>
        <button
          v-show="countdown === 'Ready'"
          @click="claim()"
        >
          Claim
        </button>
      </div>
    </div>
    <div class="dailyMain">
        <div class="quests">
          <h1>Daily Quests</h1>
          <p>Resets in {{ dayTimer }}</p>
          <div class="list">
            <div v-for="(item, index) in daily.redeemed" :key="index">
              <p>Completed {{ daily.complete }} of {{ item[0] }} offers</p>
              <button
                @click="claimDaily(index)"
                :disabled="daily.complete < item[0] || item[2]"
                v-show="!item[2]"
              >
                Claim {{ item[1] }}
              </button>
            </div>
          </div>
        </div>
        <div class="achievements">
          <h1>Achievements</h1>
          <div class="list">
            <div v-for="(item, index) in achivements.redeemed" :key="index">
              <p>
                Completed {{ achivements.complete }} of {{ item[0] }} offers
              </p>
              <button
                @click="claimAchievement(index)"
                :disabled="achivements.complete < item[0] || item[2]"
                v-show="!item[2]"
              >
                Claim {{ item[1] }}
              </button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Daily",
  data() {
    return {
      account: "",
      countdown: "00:00:00",
      achivements: [],
      daily: [],
      dayTimer: "",
    };
  },
  methods: {
    getCountdown() {
      const countDownDate = this.account.lastDailyClaim + 86400000;
      const x = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        this.countdown = hours + ":" + minutes + ":" + seconds;

        if (distance < 0) {
          clearInterval(x);
          this.countdown = "Ready";
        }
      }, 1000);
    },
    claim() {
      fetch(`${this.$apiHostname}/api/claimdaily`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ account: localStorage.account }),
        mode: "cors",
      }).then(() => {
        fetch(`${this.$apiHostname}/api/account?name=${localStorage.account}`)
          .then((raw) => raw.json())
          .then((accountData) => {
            this.account = JSON.parse(accountData);
            this.getCountdown();
          });
      });
    },
    claimDaily(index) {
      fetch(`${this.$apiHostname}/quests/claim`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ index: index, user: localStorage.account }),
        mode: "cors",
      }).then(() => {
        fetch(`${this.$apiHostname}/quests?name=${localStorage.account}`, {
          mode: "cors",
        })
          .then((res) => res.json())
          .then((res) => (this.daily = res));
      });
    },
    claimAchievement(index) {
      fetch(`${this.$apiHostname}/achievements/claim`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ index: index, user: localStorage.account }),
        mode: "cors",
      }).then(() => {
        fetch(
          `${this.$apiHostname}/achievements?name=${localStorage.account}`,
          { mode: "cors" }
        )
          .then((res) => res.json())
          .then((res) => (this.achivements = res));
      });
    },
  },
  mounted() {
    fetch(`${this.$apiHostname}/api/account?name=${localStorage.account}`)
      .then((raw) => raw.json())
      .then((accountData) => {
        this.account = JSON.parse(accountData);
        this.getCountdown();
      });
    fetch(`${this.$apiHostname}/quests?name=${localStorage.account}`, {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((res) => (this.daily = res));
    fetch(`${this.$apiHostname}/achievements?name=${localStorage.account}`, {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((res) => (this.achivements = res));
    setInterval(() => {
      const hours = 24 - new Date().getUTCHours();
      const minutes = 60 - new Date().getUTCMinutes();
      const seconds = 60 - new Date().getUTCSeconds();
      this.dayTimer = hours + "h " + minutes + "m " + seconds + "s";
    }, 1000);
  },
};
</script>

<style>
.main {
  width: calc(100% - 200px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.main > * {
  margin: 15px;
  text-align: center;
}
.dailyMain {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.dailyMain > div {
  padding: 15px;
  margin: 10px;
}
.list > * {
  margin: 10px;
}
@media screen and (max-width: 720px) {
 .main {
    width: 100%;
 } 
}
</style>
