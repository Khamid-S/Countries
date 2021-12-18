import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    countries: [],
    isDark: false,
    currentCountry: null
  },
  mutations: {
    SET_COUNTRIES(state, countries){
      state.countries = countries;
    },
    SET_DARK(state, isDark){
      state.isDark = isDark;
    },
    SET_CURRENT_COUNTRY(state,currentCountry){
      state.currentCountry = currentCountry;
    }
  },
  actions: {
    getCountries({ commit }){
      axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => { 
      commit('SET_COUNTRIES', response.data);
      });
    },
    setDark({ commit }, isDark){
      commit('SET_DARK', isDark);
    },
    setCurrentCountry({commit}, currentCountry){
      commit('SET_CURRENT_COUNTRY', currentCountry);
    }
  },
  getters: {
    getCountries: (state) => state.countries,
    getIsDark: (state) => state.isDark,
    getCurrentCountry: (state) => state.currentCountry
  }
})
