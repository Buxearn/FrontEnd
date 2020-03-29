<template>
  <div class="cashoutsMain" style="width: 300px">
      <h2>Latest Cashouts</h2>
      <div v-for="i in cashouts" :key="i" >
            <img :src="`https://www.roblox.com/Thumbs/Avatar.ashx?x=50&y=50&username=${i[0]}`">
            <div class="name">{{ i[0] }}</div>
            <div class="amount">{{ i[1] }}</div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Cashouts',
    data() {
        return {
            cashouts: []
        }
    },
    mounted() {
        fetch(`${this.$apiHostname}/stats/cashout`)
                .then(raw => raw.json())
                .then(stats => {
                    this.cashouts = stats
                })
    }
}
</script>

<style scoped>
/* Cashouts */
.cashoutsMain {
    display: flex;
    flex-direction: column;
}
.cashoutsMain > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 300px;
    padding: 5px;
    align-items: center;
}
.cashoutsMain > div > .amount {
    padding: 10px;
    border-radius: 10px;
    background-color: #69E4B5;
    align-self: right;
}

/*
span {
    padding: 5px;
    border-radius: 10px;
    background-color: #09b76b;
    padding-left: 10px;
    padding-right: 10px;
}
hr {
    margin: 10px;
}*/
</style>
