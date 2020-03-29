<template>
  <div>
    <h2>Earn Robux</h2>
    <Stats></Stats>
    <div style="display: flex; flex-direction: row; justify-content: center; flex-wrap: wrap; align-items: center; margin: 0px; padding: 20px;">
        <div style="display: flex; flex-direction: row; justify-content: center; margin: 0px; padding: 20px;">
          <panel>
            <Cashouts></Cashouts>
          </panel>
        </div>
        <div style="display: inline-block; margin: 0px; padding: 10px;">
          <panel style="margin: auto; text-align: center; padding: 10px; width: 310px; height: calc(0.77 * 340px)">
            <iframe width="100%" height="100%" :src="youtubeKey" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </panel>
        </div>
      </div>
    <div style="margin: auto; text-align: center">
      <panel style="margin: auto; text-align: center">
        <h3>One time offers</h3>
        <a target="_blank" :href="`https://api.buxearn.com/subscribe?user=${user}`"><button>Subscribe (1 Point)</button></a>
        <a target="_blank" :href="`https://api.buxearn.com/discord?user=${user}`"><button>Join Discord (1 Point)</button></a>
        <br>
        <h3>Choose an offer provider to get started.</h3>
        <button @click="showAdgate = true"><img alt="AdGate" src="../../assets/Adgate.svg" style="height: 20px"></button>
        <button @click="showAdgate = false"><img alt="OfferToro" src="../../assets/offerToro.png" style="height: 20px"></button>
        <br>
        <iframe v-show="showAdgate" :src="adgateHref" style="width: 80vw; height: 750px" frameborder="0"></iframe>
        <iframe v-show="!showAdgate" :src="`https://www.offertoro.com/ifr/show/22656/${offerToroHref}/9287`" style="width: 80vw; height: 750px" frameborder="0"></iframe>
      </panel>
    </div>
    <br>
    <div class="imageBanner" style="text-align: center; margin: auto; color: white; padding-top: 100px; padding-bottom: 100px; width: 100vw">
            <div style="display: inline-block; margin: 10px; padding: 20px; font-size: 22px">
                <img src="../../assets/gfx2.png" style="height: 250px" class="float">
                <p>Signin with your Roblox account</p>
            </div>
            <div style="display: inline-block; margin: 10px; padding: 20px; font-size: 22px">
                <img src="http://vignette2.wikia.nocookie.net/roblox/images/6/6d/9e796767641995eb303aeab03efb4990.png/revision/latest?cb=20150926185308" style="height: 250px" class="float">
                <p>Watch videos and complete tasks</p>
            </div>
            <div style="display: inline-block; margin: 10px; padding: 20px; font-size: 22px">
                <img src="../../assets/gfx3.png" style="height: 250px" class="float">
                <p>Instantly withdraw Robux!</p>
            </div>
        </div>
        <br>
        <iframe sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts" src="https://www.buxearn.com/embed1.html"  frameborder="0" style="height: 200px; width: 100%"></iframe>
  </div>
</template>

<script>
import panel from '../panel'
import Stats from '../Stats'
import Cashouts from '../Cashouts'

export default {
    name: 'Earn',
    components: {
      panel,
      Stats,
      Cashouts
    },
    data() {
      return {
        user: localStorage.account,
        showAdgate: true,
        youtubeKey: '',
        adgateHref: 'https://wall.adgaterewards.com/nq2crg/' + localStorage.account,
        offerToroHref: localStorage.account
      }
    },
    mounted() {
      fetch(`${this.$apiHostname}/api/youtube`)
            .then(result => result.text())
            .then(key => this.youtubeKey = 'https://www.youtube.com/embed/' + key)
    }
}
</script>

<style scoped>
* {
  text-align: center;
}
.float {
    position: relative;
    -webkit-animation-name: float;
    -webkit-animation-duration: 2s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: ease-in-out;
    animation-name: float;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
}

.float:hover {
    transform: scale(1.08);
}
@keyframes float {
  0%    {top: -1.7px;}
  50% {top: 1.7px;}
  100% {top: -1.7px;}
}
@-webkit-keyframes float {
  0%   {top: -1.7px;}
  50% {top: 1.7px;}
  100% {top: -1.7px;}
}
</style>
