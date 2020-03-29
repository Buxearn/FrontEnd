<template>
  <div id="app">
    <NavBar/>
    <router-view></router-view>
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
* {
  margin: 0px;
  padding: 0px;
  font-family: 'Poppins', sans-serif;
}
body {
  background-color: #e8eff4;
}

button {
  /* border-radius: 34px; */
  /* background: linear-gradient(225deg, #d1d7dc, #f8ffff);
box-shadow: -12px 12px 18px #bcc2c6, 
            12px -12px 18px #ffffff; */
  background-color: #24CEE7;
  border-radius: 5px;
  color: white;
  padding: 15px;
  text-decoration: none;
  border: none;
  margin: 10px;
  outline: none;
}

button:hover {
  cursor: pointer;
  background-color: rgb(37, 158, 177);
  -webkit-animation: scale-up-center 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
	animation: scale-up-center 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

button:disabled {
  background-color: rgb(107, 197, 197);
  animation: none;
}

input {
  border-radius: 5px;
  padding: 15px;
  text-decoration: none;
  border: none;
  margin: 10px;
  outline: none;
  background-color: #e8eff4;
}

@-webkit-keyframes scale-up-center {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  100% {
    -webkit-transform: scale(1.05);
            transform: scale(1.05);
  }
}
@keyframes scale-up-center {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  100% {
    -webkit-transform: scale(1.05);
            transform: scale(1.05);
  }
}


button:active {
  /* background: linear-gradient(225deg, #d1d7dc, #f8ffff);
  box-shadow: -5px 5px 10px #bcc2c6, 
            5px -5px 10px #ffffff; */
  background-color: rgb(27, 82, 90);
}

#app {
  margin-bottom: 15px;
}

.footer {
  position: relative;
  bottom: 0px;
  text-align: right;
  width: calc(100% - 20px);
  right: 10px;
  color: lightgray;
  padding-top: 50px;
}

@media only screen and (max-width: 768px) {
  .footer span {
    display: none;
  }
}
.imageBanner {
    /* height: 250px; */
    width: 100%;
    background-image:url('./assets/Flat.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 70% !important;
    box-shadow: 0px 10px 20px -5px rgba(0,0,0,.8);
}
</style>
