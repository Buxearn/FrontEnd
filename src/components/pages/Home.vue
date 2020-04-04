<template>
  <div class="page">
    <div class="nav">
      <h1 class="grow">BUXEARN</h1>
      <a class="mobileHide grow" href="https://discord.gg/j3EYh9j" target="_blank">Help</a>
      <a class="mobileHide grow" href="https://discord.gg/j3EYh9j" target="_blank">Contact</a>
      <a class="mobileHide grow">How It Works</a>
      <router-link class="grow" to="/earn">Sign Up</router-link>
    </div>
    <div class="top-content">
      <h1 style="font-size: 38px">Earn By Doing Simple Tasks</h1>
      <p style="font-size: 22px">Complete Simple Surveys, Watch Videos, Play Games, and more...</p>
      <router-link to="/earn"><font-awesome-icon icon="money-bill" />Get Started</router-link>
    </div>
    <div class="images">
      <img src="../../assets/blue_gfx_1.png">
      <img src="../../assets/blue_gfx_2.png">
    </div>
    <div class="stats">
      <div>
        <h1>{{ stats[0] }}</h1>
        <h2>Offers Completed</h2>
      </div>
      <div>
        <h1>{{ stats[1] }}</h1>
        <h2>Total Earned</h2>
      </div>
    </div>
    <div class="bottom-content">
      <div class="video grow">
        <iframe :src="youtubeKey">
        </iframe>
      </div>
      <div class="steps">
        <div class="step grow">
          <i><font-awesome-icon icon="user" /></i>
          <h2>Sign Up</h2>
        </div>
        <div class="step grow">
          <i><font-awesome-icon icon="money-bill" /></i>
          <h2>Earn</h2>
        </div>
        <div class="step grow">
          <i><font-awesome-icon icon="gift" /></i>
          <h2>Withdraw</h2>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      stats: [0, 0],
      youtubeKey: ''
    };
  },
  mounted() {
    fetch(`${this.$apiHostname}/api/youtube`)
      .then((result) => result.text())
      .then(
        (key) => (this.youtubeKey = "https://www.youtube.com/embed/" + key)
      );
    fetch(`https://api.buxearn.com/stats`)
      .then((res) => res.json())
      .then((result) => {
        this.stats = [
          Number(result.o).toLocaleString("en"),
          Number(result.r).toLocaleString("en"),
        ];
      });
  },
};
</script>

<style scoped>
.page {
  overflow-x: hidden;
  background-color: #0088ff;
  background: url("../../assets/blue_background.png");
  background-size: 100% 100%;
}
.stats {
  background-color: #ffffff;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  color: #3e3e3e;
  text-align: center;
}
.stats > div {
  padding: 25px;
}
.stats > div > h1 {
  font-size: 40px;
}
.nav {
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  color: white;
}
img {
  pointer-events: none;
}
.nav > h1 {
  font-size: 45px;
  font-style: italic;
  text-shadow: -3px -2px #005bbf, 0 -2px #005bbf, 3px 2px #005bbf,
    -3px 3px #005bbf;
  z-index: 5;
}
.nav > a {
  color: inherit;
  text-decoration: none;
  font-size: 30px;
  padding: 10px;
}
.nav > a:nth-child(5) {
  border: white 3px solid;
  border-radius: 20px;
}
.nav > a:nth-child(5):hover {
  background-color: white;
  color: #0088ff;
}
.top-content {
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 125px 25px;
  min-height: 20vw;  
}
.top-content > * {
  padding: 5px;
  z-index: 1;
}
.top-content > a {
  display: flex;
  align-items: center;
  margin: 15px;
  padding: 3px;
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 25px;  
  background-color: #1583bc;
  border: 5px solid #1583bc;
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 22px 10px rgba(0,94,194,1);
  -moz-box-shadow: 0px 0px 22px 10px rgba(0,94,194,1);
  box-shadow: 0px 0px 22px 10px rgba(0,94,194,1);
}
.top-content > a > svg {
  margin-right: 3px;
  border-radius: 5px 0px 0px 5px;
  border: 5px solid white;
  background: white;
  color: #1583bc;
}
.bottom-content {
  padding: 25px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.bottom-content > div {
  margin: 20px;
}
.steps {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
.step {
  margin: 15px;
  padding: 15px;
  color: white;
  border: 2px solid white;
  background-color: #2d90ec;
  text-align: center;
  letter-spacing: 1px;
  font-size: 24px;
}
.step > i {
  position: relative;
  padding: 15px;
  font-size: 30px;
  border-radius: 30px;
  color: white;
  border: 3px solid white;
  background-color: #2d90ec;
  top: -25px;
}

.images {
  height: 0px;
  width: 100%;
  position: relative;
}
.images > img {
  position: absolute;
  height: calc(70vw * 0.9);
  width: calc(112vw * 0.9);
  bottom: calc(-20vw * 0.9);
  overflow: hidden;
}
.images > img:nth-child(1) {
  left: -35vw;
  clip-path: polygon(0px 0px, 0% 71.5%, 100% 71.5%, 100% 0%);
}
.images > img:nth-child(2) {
  transform: rotateY(180deg);
  right: -25vw;

  height: calc(70vw);
  width: calc(112vw);
  bottom: calc(-20vw);
  clip-path: polygon(0px 0px, 0% 71.5%, 47% 71.5%, 47% 100%, 100% 100%, 100% 0%);
}
.video > iframe {
  border: solid 16px #0a439a;
  border-radius: 8px;
  width: 350px;
  height: 200px;
}
@media screen and (max-width: 720px) {
  .mobileHide {
    display: none;
  }
}
</style>
