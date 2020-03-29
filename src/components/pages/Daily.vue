<template>
  <div>
    <panel style="margin: auto; margin-top: 35px; text-align: center;">
      <h3>Claim Your Daily Reward</h3><br>
      <p>You must complete an offer to use the daily reward</p>
      <div style="margin: auto">
        <h1>{{ countdown }}</h1>
        <button v-show="countdown === 'Ready'" style="text-align: center" @click="claim()">Claim</button>
      </div>
    </panel>
    <panel style="margin: auto; margin-top: 35px;" class="dailyMain">
    <!-- <div class="dailyAds">
      <div class="ad">
        <h3>Your Ad Here</h3>
      </div>
      <div class="ad">
        <h3>Your Ad Here</h3>
      </div>
    </div> -->
    <div class="dailyPanel">
      <div class="quests">
        <h1>Daily Quests</h1>
        <p>Resets in {{ dayTimer }}</p>
        <div class="list">
          <div v-for="(item, index) in daily.redeemed" :key="index">
            <p>Completed {{ daily.complete }} of {{ item[0] }} offers</p>
            <button @click="claimDaily(index)" :disabled="daily.complete < item[0] || item[2]" v-show="!item[2]" >Claim {{ item[1] }}</button>
          </div>
        </div>
      </div>
      <div class="achievements">
        <h1>Achievements</h1>
        <div class="list">
          <div v-for="(item, index) in achivements.redeemed" :key="index">
            <p>Completed {{ achivements.complete }} of {{ item[0] }} offers</p>
            <button @click="claimAchievement(index)" :disabled="achivements.complete < item[0] || item[2]" v-show="!item[2]" >Claim {{ item[1] }}</button>
          </div>
        </div>
      </div>
    </div>
  </panel>
  
    <!-- <panel style="margin: auto; margin-top: 35px; text-align: center;">
      <h3>Daily Quest</h3><br>
      <h4>Day resets in {{ estReset }}</h4>
      <div style="margin: auto" class="questList">
        <p><strong>Complete 1 offers</strong><button>Claim</button></p>
        <p><strong>Complete 5 offers</strong><button disabled>2/5</button></p>
      </div>
    </panel>
    <panel style="margin: auto; margin-top: 35px; text-align: center;">
      <h3>Achievements</h3><br>
      <div style="margin: auto" class="questList">
        <p class="complete"><strong>Complete 5 offers</strong></p>
        <p><strong>Complete 25 offers</strong><button disabled>2/5</button></p>
      </div>
    </panel> -->
  </div>
</template>

<script>
import panel from '../panel'

export default {
  name: 'Daily',
  components: {
    panel
  },
  data() {
    return {
      account: '',
      countdown: '00:00:00',
      achivements: [],
      daily: [],
      dayTimer: ''
    }
  },
  methods: {
    getCountdown() {
      const countDownDate = this.account.lastDailyClaim + 86400000
       const x = setInterval(() => {
        const now = new Date().getTime()
        const distance = countDownDate - now
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        this.countdown = (hours + ":" + minutes + ":" + seconds)

        if (distance < 0) {
          clearInterval(x);
          this.countdown = "Ready"
        }
      }, 1000)
    },
    claim() {
      fetch(`${this.$apiHostname}/api/claimdaily`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ account: localStorage.account }),
                mode: 'cors'
            })
            .then(() => {
              fetch(`${this.$apiHostname}/api/account?name=${localStorage.account}`)
                .then(raw => raw.json())
                .then(accountData => {
                  this.account = JSON.parse(accountData)
                  this.getCountdown()
                })
            })
    },
    claimDaily(index) {
      fetch(`${this.$apiHostname}/quests/claim`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ index: index, user: localStorage.account }),
        mode: 'cors'
      })
      .then(() => {
        fetch(`${this.$apiHostname}/quests?name=${localStorage.account}`, { mode: 'cors' })
        .then(res => res.json())
        .then(res => this.daily = res)
      })
    },
    claimAchievement(index) {
      fetch(`${this.$apiHostname}/achievements/claim`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ index: index, user: localStorage.account }),
        mode: 'cors'
      })
      .then(() => {
        fetch(`${this.$apiHostname}/achievements?name=${localStorage.account}`, { mode: 'cors' })
        .then(res => res.json())
        .then(res => this.achivements = res)
      })
    }
  },
  mounted() {
    fetch(`${this.$apiHostname}/api/account?name=${localStorage.account}`)
    .then(raw => raw.json())
    .then(accountData => {
      this.account = JSON.parse(accountData)
      this.getCountdown()
    })
    fetch(`${this.$apiHostname}/quests?name=${localStorage.account}`, { mode: 'cors' })
      .then(res => res.json())
      .then(res => this.daily = res)
    fetch(`${this.$apiHostname}/achievements?name=${localStorage.account}`, { mode: 'cors' })
      .then(res => res.json())
      .then(res => this.achivements = res)
    setInterval(() => {
      const hours = 24 - new Date().getUTCHours()
      const minutes = 60 - new Date().getUTCMinutes()
      const seconds = 60 - new Date().getUTCSeconds()
      this.dayTimer = (hours + "h " + minutes + "m " + seconds + "s")
    }, 1000)
  }
}
</script>

<style>
.questList > p {
  font-size: 20px;
  border: 1px rgb(180, 180, 180) solid;
  margin: 3px;
  padding: 5px;
}
.questList > .complete {
  background-color: rgba(102, 253, 89, 0.719);
  border: 1px rgba(102, 253, 89, 0.719) solid;
}
/* Daily Rewards */
.dailyMain {
    padding: 25px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-content: center;
}
.dailyMain > .dailyAds {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.dailyMain > .dailyAds > .ad {
    background-color: white;
    margin: 5px;
    padding: 10px;
}
.dailyMain > .dailyPanel {
    padding-top: 25px;
    padding-bottom: 25px;
    background-color: white;
    display: flex;
    flex-direction: row;
    width: 80%;
    justify-content: space-evenly;
}
.dailyMain > .dailyPanel > .quests {
    padding: 25px;
    text-align: center;
}
.dailyMain > .dailyPanel > div {
	width: 300px;
	max-width: 100%;
}
.dailyMain > .dailyPanel > .achievements {
    padding: 25px;
}
.dailyMain > .dailyPanel > div > .list {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-content: center;
    text-align: center;
}
.dailyMain > .dailyPanel > div > .list > div {
    padding: 5px;
    border-top: rgb(139, 139, 134) 1px solid;
}
@media (max-width: 945px) {
    .dailyMain {
        flex-direction: column;
    }
    .dailyMain > .dailyPanel > .quests, .dailyMain > .dailyPanel > .achievements {
        border: none;
    }
    .dailyMain > .dailyPanel {
        flex-direction: column;
        text-align: center;
        width: 100%;
    }
}
</style>
