<template>
  <div class="container">
      <div class="rewarded box">
          <p>{{ rewarded}}</p>
          <span>Robux Rewarded</span>
      </div>
      <div class="completed box">
            <p>{{ offers }}</p>
            <span>Offers Completed</span>
      </div>
      <div class="online box">
            <p>{{ users }}</p>
            <span>Users</span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Stats',
    data() {
        return {
            rewarded: 100,
            offers: 100,
            users: 100
        }
    },
    mounted() {
        fetch(`${this.$apiHostname}/stats`)
                .then(raw => raw.json())
                .then(stats => {
                   this.rewarded = stats.r
                   this.offers = stats.o
                   this.users = stats.u
                })
    }
}
</script>

<style scoped>
.container {
    text-align: center;
}

.box {
    /* border-radius: 10px; */
    color: white;
    display: inline-block;
    height: 100px;
    width: 300px;
    margin: 10px;
    box-shadow: 9px 9px 23px #b7bdc1, 
            -9px -9px 23px #ffffff;
}

.rewarded {
    background-color: #09b76b;
}

.completed {
    background-color: #ff9800;
}

.online {
    background-color: #1094f7;
}

span {
    line-height: 40px;
}

p {
    line-height: 60px;
    font-size: 32px;
}
</style>