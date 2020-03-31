<template>
  <div id="app">
    <div class="title" v-show="this.$route.name !== 'Home'">
      <h1>BUXEARN</h1>
    </div>
    <div :class="this.$route.name !== 'Home' ? 'notHomeApp' : ''">
    <NavBar v-show="this.$route.name !== 'Home'"/>
    <router-view :class="this.$route.name !== 'Home' ? 'notHome' : ''"></router-view>
    </div>
    <div class="footer">
      <p><span>Buxearn &copy; 2020 | </span> We are not affiliated with Roblox or any other entity.</p>
    </div>
  </div>
</template>

<script>
import NavBar from './components/Navbar'

export default {
  name: 'app',
  components: {
    NavBar
  }
}
</script>

<style>
@font-face {
  font-family: ActoMedium;
  src: url('./assets/ActoFont/Acto-Medium.otf');
}
@font-face {
  font-family: ActoLight;
  src: url('./assets/ActoFont/Acto-Light.otf');
}

body {
  overflow-x: hidden;
}
* {
  font-family: ActoLight;
  margin: 0px;
  padding: 0px;
}
h1, h2, h3, h4, h5, h6, .actoMedium {
  font-family: ActoMedium;
}
.footer {
  position: relative;
  bottom: 0px;
  text-align: right;
  right: 10px;
  color: darkslategrey;
  padding: 25px;
}

.notHomeApp {
  display: flex;
  flex-wrap: wrap;
}
.notHomeView {
  width: calc(100vw - 200px);
}
.title {
  width: 100%;
  text-align: center;
  padding: 5px;
  background-color: #0088ff;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("./assets/blue_background.png");
  background-position: center center;
}
.title > h1 {
  color: white;
  font-size: 45px;
  font-style: italic;
  text-shadow: -3px -2px #005bbf, 0 -2px #005bbf, 3px 2px #005bbf, -3px 3px #005bbf;
}
</style>
