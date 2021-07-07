<template>
  <div id="app" :class="{dark: isDark}">
    <div class="nav" :class="{elementDark: isDark}">
      <p>Where in the world</p>
      <p @click="setDark" class="setDark"><font-awesome-icon icon="moon" /> <span v-if="isDark">Light Mode</span>
      <span v-if="!isDark">Dark Mode</span></p>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
   data(){
    return{
      isDark: this.$store.isDark,
      country: null
    }
  },
  methods:{
    setDark(){
      this.isDark = !this.isDark;
      this.$store.dispatch("setDark", this.isDark);
    }
  },
  created(){
    if(this.$route.path!=="/"){
      this.$router.push('/');
    }
  }
}
</script>

<style>
*,
*::before,
*::after{
  box-sizing: border-box;
  padding:0;
  margin:0;
}
body{
  overflow:overlay;
}
#app {
  min-height: 100vh;
  --dark-element: hsl(209, 23%, 22%);
  --dark-background: hsl(207, 26%, 17%);
  --dark-text-light-element: hsl(0, 0%, 100%);
  --light-text: hsl(200, 15%, 8%);
  --light-input: hsl(0, 0%, 52%);
  --light-background: hsl(0, 0%, 98%);
  font-family: 'Nunito Sans', sans-serif;
  color: var(--light-text);
  background: var(--light-background);
}

.nav {
  position:fixed;
  background: var(--dark-text-light-element);
  width: 100%;
  padding: 20px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--light-text);
}

.search{
  border-radius: 10px;
  display: flex;
  height: 50px;
  color: var(--light-input);
  font-size: 30px;
  padding: 10px;
  margin: 105px 5px 40px 5px;
}

.search input{
  color: var(--light-input);
  background: var(--dark-text-light-element-element);
  border:none;
  margin: 0 10px;
  width: 85%;
  height: 30px;
  outline:none;
}

button{
  background: var(--dark-text-light-element);
}

.dark{
  background: var(--dark-background) !important;
  color: var(--dark-text-light-element) !important;
}

.elementDark{
  background: var(--dark-element) !important;
  color: var(--dark-text-light-element) !important;
}

.setDark:hover{
  cursor: pointer;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(90, 90, 90);
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}

@media only screen and (min-width: 768px){
  .search{
    grid-column-start: 1;
    grid-column-end:5;
    width: 35vw;
    margin: 120px 25px 25px 30px;
  }
  .nav{
    height: 80px;
    padding: 0 5vw;
  }
}
</style>

