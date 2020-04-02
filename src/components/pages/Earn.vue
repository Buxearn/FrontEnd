<template>
  <div class="main">
    <div
      style="border-bottom: solid grey 3px; width: 100%; padding-bottom: 15px; color: grey"
    >
      <h3>
        Join Our Discord Server:
        <a
          href="https://discord.gg/j3EYh9j"
          target="_blank"
          style="color: inherit"
          >Here</a
        >
      </h3>
    </div>
    <Stats></Stats>
    <panel class="oneTimeOffer">
      <h2>One time offers</h2>
      <a
        target="_blank"
        :href="`https://api.buxearn.com/subscribe?user=${user}`"
        ><button>Subscribe ( 1 Point)</button></a
      >
      <a target="_blank" :href="`https://api.buxearn.com/discord?user=${user}`"
        ><button>Join Discord ( 1 Point )</button></a
      >
    </panel>
    <h1>Offer Walls</h1>
    <div class="chooseOfferWall">
      <button
        style="background-color: #5bc0de; border-color: #5bc0de"
        @click="showAdgate = true"
      >
        <img alt="AdGate" src="../../assets/Adgate.svg" style="height: 20px" />
      </button>
      <button
        style="background-color: #22b84d; border-color: #22b84d"
        @click="showAdgate = false"
      >
        <img
          alt="OfferToro"
          src="../../assets/offerToro.png"
          style="height: 20px"
        />
      </button>
    </div>
    <iframe
      v-show="showAdgate"
      :src="adgateHref"
      style="width: 90%; height: 750px"
      frameborder="0"
    ></iframe>
    <iframe
      v-show="!showAdgate"
      :src="`https://www.offertoro.com/ifr/show/22656/${offerToroHref}/9287`"
      style="width: 90%; height: 750px"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
import panel from "../panel";
import Stats from "../Stats";

export default {
  name: "Earn",
  components: {
    panel,
    Stats,
  },
  data() {
    return {
      user: localStorage.account,
      showAdgate: true,
      youtubeKey: "",
      adgateHref:
        "https://wall.adgaterewards.com/nq2crg/" + localStorage.account,
      offerToroHref: localStorage.account,
    };
  },
  mounted() {
    fetch(`${this.$apiHostname}/api/youtube`)
      .then((result) => result.text())
      .then(
        (key) => (this.youtubeKey = "https://www.youtube.com/embed/" + key)
      );
  },
};
</script>

<style scoped>
* {
  text-align: center;
}
.main {
  width: calc(100% - 200px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.main > * {
  width: 80%;
  text-align: center;
}
.oneTimeOffer {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
}
.chooseOfferWall {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.chooseOfferWall > * {
  margin: 5px;
}
</style>
