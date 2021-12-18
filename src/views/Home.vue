<template>
  <div class="home" :class="{dark: getIsDark}">
      <div class="search" :class="{elementDark: getIsDark}">
        <font-awesome-icon icon="search" ></font-awesome-icon>
        <input :class="{elementDark: getIsDark}"
        v-model="searchQuery" 
        type="text"
        placeholder="Search for a country"/>
      </div>
      <div
      class="country"
      :class="{elementDark: getIsDark}"
      v-for='country in filteredCountries' 
      :key='country.name'
      @click="goToCountry(country)"
      >
        <img :src="country.flags.svg">
        <div class="info">
          <h3>{{country.name.common}}</h3>
          <p><strong>Population:</strong> {{country.population}}</p>
          <p><strong>Area:</strong> {{country.area}} sq. km</p>
          <p><strong>Capital:</strong> {{country.capital[0]}}</p>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      searchQuery: ''
    }
  },
  methods:{
    goToCountry: function(country){
      this.$store.dispatch("setCurrentCountry", country);
      this.$router.push(country.name);
    }
  },
  computed: {
    filteredCountries(){
      let temp = [];
      let countries = this.getCountries;
      if(this.searchQuery===""){
        return countries;
      }
      let added;
      for(let i=0; i<this.getCountries.length;i++){
        added = false;
        for(let j=0; j<countries[i].altSpellings.length;j++){
          if((countries[i].altSpellings[j].toLowerCase().includes(this.searchQuery.toLowerCase())||
          countries[i].name.toLowerCase().includes(this.searchQuery.toLowerCase()))&&!added){
            added = true;
            temp.push(countries[i]);
          }
        }
      }
      return temp;
    },
    getCountries(){
      return this.$store.getters.getCountries;
    },
    getIsDark(){
      return this.$store.getters.getIsDark;
    },
  },
  mounted() {
    this.$store.dispatch("getCountries");
  }
}
</script>

<style scoped>
*{
  box-sizing: border-box;
}
.home{
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
}
.country{
  width: 70vw;
  border-radius: 10px;
  margin: 10px;
  overflow: hidden;
}

.country:hover{
  cursor: pointer;
  box-shadow: 0px 0px 10px 2px #000000;
}

.info{
  padding: 6%;
}
h3{
  line-height: 25px;
}
img{
  width: 100%;
}

.dark{
  background: var(--dark-background) !important;
  color: var(--dark-text-light-element) !important;
}

.elementDark{
  background: var(--dark-element) !important;
  color: var(--dark-text-light-element) !important;
}

@media only screen and (min-width: 768px){
  .home{
    display: grid;
    grid-template-columns: repeat(4,1fr)
  }

  .country{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 20vw;
    margin: 2vw;
  }
}
</style>
