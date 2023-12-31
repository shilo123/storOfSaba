import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
export default new Vuex.Store({
  plugins: [createPersistedState({ paths: ["ifshow"] })],
  state: {
    ifshow: false,
  },
  getters: {},
  mutations: {
    Sifshow(state) {
      state.ifshow = !state.ifshow;
    },
  },
  actions: {},
  modules: {},
});
