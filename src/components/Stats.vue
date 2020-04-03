<template>
  <div class="container">
    <div class="completed box">
      <h1>{{ offers }}</h1>
      <p>Offers Complete</p>
    </div>
    <div class="rewarded box">
      <h1 style="font-size: 41px;">{{ rewarded }}</h1>
      <p>Total Earned</p>
    </div>
    <div class="online box">
      <h1>{{ users }}</h1>
      <p>Users Registered</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Stats",
  data() {
    return {
      rewarded: 100,
      offers: 100,
      users: 100,
    };
  },
  mounted() {
    fetch(`${this.$apiHostname}/stats`)
      .then((raw) => raw.json())
      .then((stats) => {
        this.rewarded = stats.r;
        this.offers = stats.o;
        this.users = stats.u;
      });
  },
};
</script>

<style scoped>
.container {
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  color: #282f3c;
}

.box {
  padding: 15px;
}
</style>

