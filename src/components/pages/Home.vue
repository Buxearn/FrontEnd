<template>
    <div>
        <br>
        <div class="imageBanner" style="text-align: center; margin: auto; color: white; padding-top: 100px; padding-bottom: 100px">
            <h1>Welcome to Buxearn</h1>
            <br>
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
        <panel style="margin: auto; text-align: center; padding: 20px; width: 70vw; height: calc(0.77 * 70vw)">
            <iframe width="100%" height="100%" :src="youtubeKey" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </panel>
        <br>
        <Stats/>
        <iframe src="https://www.buxearn.com/embed1.html" style="height: 125px; width: 100%; border: none; overflow: none"></iframe>
        <div style="display: flex; flex-wrap: wrap; flex-direction: row; justify-content: center; align-items: center; text-align: center; margin: auto;">
            <Signin style=" margin: 10px; padding: 20px;"></Signin>
            <panel style="margin: 10px; padding: 20px">
                <Cashouts></Cashouts>
            </panel>
        </div>
        <br> 
    </div>
</template>

<script>
import Stats from '../Stats'
import panel from '../panel'
import Signin from './Signin'
import Cashouts from '../Cashouts'

export default {
    name: 'Home',
    components: {
        Stats,
        panel,
        Signin,
        Cashouts
    },
    data() {
        return {
            youtubeKey: ''
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
h1 {
    text-align: center;
}
.float:hover {
    transform: scale(1.08);
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
