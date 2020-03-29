<template>
  <div>
    <br>
    <panel style="margin: auto; text-align: center; padding: 50px;">
      <h2>Giveaway</h2>
      <h3>10 RBX every hour!</h3>
      <p>To enter you need to complete at least one offer, at the end of the hour a winner will be drawn from participants.</p>
      <h3>Last Winner: {{ lastWinner }}</h3>
      <br>
      <button @click="enter()">Enter</button>
      <br>
      <h2>{{ timer }}</h2>
    </panel>
  </div>
</template>

<script>
import panel from '../panel'

export default {
    name: 'Giveaway',
    components: {
      panel
    },
    data() {
      return {
        lastWinner: '. . .',
        timer: 'Giveway ends every hour'
      }
    },
    methods: {
      enter() {
        fetch(`${this.$apiHostname}/api/giveaway/join`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ user: localStorage.account }),
          mode: 'cors'
        })
        .then(data => data.json())
        .then(json => {
          alert(json.status)
        })
      }
    },
    mounted() {
      fetch(`${this.$apiHostname}/api/giveaway/lastwinner`)
      .then(raw => raw.text())
      .then(text => this.lastWinner = text)
      setInterval(() => {
        const now = new Date();
        const mins = now.getMinutes();
        const secs = now.getSeconds();
        this.timer = "Giveaway ending in " + (60 - mins - 1) + " minutes and " + (60 - secs) + " seconds!";
      }, 1000)
    }
}
</script>
