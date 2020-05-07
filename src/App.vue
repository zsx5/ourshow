<template>
  <div id="app">
    <nav-bar bgColor="#000" textColor="#fff" height="59px">
        <div slot="left">
          <div class="nav-item">
            <router-link to='/'>主页</router-link>
            <router-link to='/tools'>工具</router-link>
            <router-link to='/games'>游戏</router-link>
          </div>
        </div>
    </nav-bar>
    <router-view/>
  </div>
</template>
<script>
import NavBar from 'components/navbar/NavBar'
export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>
<style>
.nav-item {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 18px;
}
.nav-item a {
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
.nav-item a:hover{
  background-color: rgba(100,100,100, 0.2);
}
</style>
