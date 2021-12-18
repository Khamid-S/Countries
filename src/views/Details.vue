<template>
  <div class="details" :class="{dark: getIsDark}">
      <button @click="goToHome" class="back" :class="{elementDark: getIsDark}">
        <font-awesome-icon icon="arrow-left"/>
        <span > Back</span>
      </button>
      

        <img :src="getCurrentCountry.flags.svg">
        <div class="info">
          <div class="col1">
          <h3>{{getCurrentCountry.name.common}}</h3>
          <p><span class="strong">Native Name:</span> {{getCurrentCountry.altSpellings[getCurrentCountry.altSpellings.length-1]}}</p>
          <p><span class="strong">Population:</span> {{getCurrentCountry.population}}</p>
          <p><span class="strong">Region:</span> {{getCurrentCountry.region}}</p>
          <p><span class="strong">Subregion:</span> {{getCurrentCountry.subregion}}</p>
          <p><span class="strong">Area:</span> {{getCurrentCountry.area}} sq. km</p>
          <p><span class="strong">Capital:</span> {{getCurrentCountry.capital}}</p>
          </div>
          <br><br>
          <div class="col2">
          <p><span class="strong">Top Level Domain:</span> <span> {{getCurrentCountry.cca2}}</span></p>
          <p><span class="strong">Currencies:</span> <span> {{getCurrentCountry.currencies[Object.keys(getCurrentCountry.currencies)[0]].name}}</span>
          <span> {{getCurrentCountry.currencies[Object.keys(getCurrentCountry.currencies)[0]].symbol}}</span>
          </p>
          <p><span class="strong">Languages:</span> <span v-for="language in Object.entries(getCurrentCountry.languages)"
          :key="language[0]"> {{language[1]}} </span></p>
          </div>
          <br><br>
          <div class="col3">
          <h4>Border Countries:</h4>
          <div class="borders">
          <button v-for="country in getBorders"
          :key="country.name.common"
          :class="{elementDark: getIsDark}"
          @click="goToCountry(country)">
          {{country.name.common}}
          </button>
          </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  methods: {
    goToHome: function(){
      this.$router.push('/');
      this.$store.dispatch("setCurrentCountry", null);
    },
    goToCountry: function(country){
      this.$store.dispatch("setCurrentCountry", country);
      this.$router.push(country.name.common);
    }
  },
  computed: {
    getCountries(){
      return this.$store.getters.getCountries;
    },
    getIsDark(){
      return this.$store.getters.getIsDark;
    },
    getCurrentCountry(){
      console.log(this.$store.getters.getCurrentCountry);
      return this.$store.getters.getCurrentCountry;
    },
    getBorders(){
      let borders = [];
      const countries = this.getCountries;
      const currentCountry = this.getCurrentCountry;
      if(Object.prototype.hasOwnProperty.call(currentCountry, 'borders')){
      for(let i=0; i<currentCountry.borders.length;i++){
        for(let j=0; j<countries.length; j++){
          if(currentCountry.borders[i]==countries[j].cca3){
            borders.push(countries[j]);
          }
        }
      }
      }

      return borders;
    }
  }
}
</script>
<style scoped>
button{
  padding: 5px 10px;
  border: none;
  outline:none;
  box-shadow: 0px 0px 5px 1px #000000;
  border-radius: 5%;
  margin: 5px;
}

.borders button{
  padding: 5px 10px;
}

button:hover{
  cursor: pointer;
  box-shadow: 0px 0px 10px 2px #000000;
}

.details{
  padding: 100px 15vw 20px;
  font-size: 14px;
}
.country{
  width: 70vw;
  border-radius: 10px;
  overflow: hidden;
}

h3{
  line-height: 25px;
  padding: 10px 0;
}
img{
  width: 100%;
  padding: 20px 0;
}

.strong{
  font-weight: bold;
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
  .details{
    display:grid;
    grid-template-columns: 1fr 1fr;
    padding:0;
    padding-top: 80px;
  }
  .back{
    grid-column-start: 1;
    grid-column-end:3;
    width: 7vw;
    margin: 3vw 5vw 1vw;
  }
  img{
    margin: 0 5vw;
    width: 40vw;
  }
  .info{
    display: grid;
  }
  .col1{
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
  }
  .col2{
    margin-top: 45px;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
  }
  .col3{
    margin-top: 50px;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
  }

}
</style>
