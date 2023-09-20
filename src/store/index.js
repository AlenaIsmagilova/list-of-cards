import { createStore } from "vuex";
import {
  getCurrentUserApi,
  getUsersApi,
  logoutApi,
  signUpApi,
} from "../helpers/api";

export const store = createStore({
  state: {
    users: [],
    loggedIn: false,
    currentUser: null,
    currentUsersId: null,
  },
  mutations: {
    SET_USERS(state, data) {
      state.users = data;
    },
    REGISTRATION(state, data) {
      state.loggedIn = true;
      state.currentUsersId = data.id;
    },
    GET_CURRENT_USER(state, data) {
      state.currentUser = data;
    },
    LOGOUT(state) {
      state.loggedIn = false;
    },
  },
  actions: {
    getUsers({ commit }) {
      return getUsersApi().then((users) => {
        commit("SET_USERS", users.data);
      });
    },
    signUp({ commit }, form) {
      return signUpApi(form).then((res) => {
        commit("REGISTRATION", res);
        localStorage.setItem("user", JSON.stringify(res.id));
      });
    },
    getCurrentUser({ commit }, id) {
      return getCurrentUserApi(id).then((res) => {
        commit("GET_CURRENT_USER", res.data);
      });
    },
    logout({ commit }) {
      return logoutApi().then(() => {
        commit("LOGOUT");
        localStorage.removeItem("user");
      });
    },
  },
});
