import firebase from 'firebase/app'
import 'firebase/auth'
import { currentUser } from '../../constants/config'
import axios from "axios"
import router from '../../router.js'

export default {
  state: {
    currentUser: localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : null,
    loginError: null,
    processing: false,
    forgotMailSuccess:null,
    resetPasswordSuccess:null,
    booksList: null
  },
  getters: {
    currentUser: state => state.currentUser,
    processing: state => state.processing,
    loginError: state => state.loginError,
    forgotMailSuccess: state => state.forgotMailSuccess,
    resetPasswordSuccess:state => state.resetPasswordSuccess,
    booksList: state => state.booksList
  },
  mutations: {
    setUser(state, payload) {
      state.currentUser = payload
      state.processing = false
      state.loginError = null
    },
    setLogout(state) {
      state.currentUser = null
      state.processing = false
      state.loginError = null
    },
    setProcessing(state, payload) {
      state.processing = payload
      state.loginError = null
    },
    setError(state, payload) {
      state.loginError = payload
      state.currentUser = null
      state.processing = false
    },
    setForgotMailSuccess(state) {
      state.loginError = null
      state.currentUser = null
      state.processing = false
      state.forgotMailSuccess=true
    },
    setResetPasswordSuccess(state) {
      state.loginError = null
      state.currentUser = null
      state.processing = false
      state.resetPasswordSuccess=true
    },
    setBooksList(state, payload) {
      if (payload.error_msg) {
        state.booksList = payload;
      }
      else {
        state.booksList = {
          ...payload
        };
      }
    },
    clearError(state) {
      state.loginError = null
    }
  },
  actions: {
    login({ commit }, payload) {
      // commit('clearError')
      // commit('setProcessing', true)

      axios({
        method: 'post',
        url: '/auth/sign_in',
        data: {
          email: payload.email,
          password: payload.password
        },
        headers: {'content-type': 'application/json'}
      })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify({...response.data.data}));
        localStorage.setItem('access-token', response.headers['access-token']);
        localStorage.setItem('uid', response.headers.uid);
        localStorage.setItem('client', response.headers.client);
        commit('setUser', { uid: response.headers.uid, ...response.data.data });
      }, (error) => {
      });
    },
    register({ commit }, payload) {
      axios({
        method: 'post',
        url: '/auth',
        data: {
          name: payload.fullName,
          email: payload.email,
          password: payload.password
        },
        headers: {'content-type': 'application/json'}
      })
      .then((response) => {
      }, (error) => {
      });
    },
    forgotPassword({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      firebase
        .auth()
        .sendPasswordResetEmail(payload.email)
        .then(
          user => {
            commit('clearError')
            commit('setForgotMailSuccess')
          },
          err => {
            commit('setError', err.message)
            setTimeout(() => {
              commit('clearError')
            }, 3000)
          }
        )
    },
    resetPassword({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      firebase
        .auth()
        .confirmPasswordReset(payload.resetPasswordCode,payload.newPassword)
        .then(
          user => {
            commit('clearError')
            commit('setResetPasswordSuccess')
          },
          err => {
            commit('setError', err.message)
            setTimeout(() => {
              commit('clearError')
            }, 3000)
          }
        )
    },
    fetchBooksList({ commit }) {
      axios({
        method: 'get',
        url: '/books',
        headers: {'content-type': 'application/json'}
      })
      .then((response) => {
        const data = response.data;
        commit('setBooksList', data);
      }, (error) => {
      });
    },
    addNewBooks({ commit }, payload) {
      axios({
        method: 'post',
        url: '/books',
        data: {
          title: payload.bookTitle
        },
        headers: {'content-type': 'application/json'}
      })
      .then((response) => {
        router.push('/mybooks/books/view-books')
      }, (error) => {
      });
    },
    removeBook({ commit, dispatch }, payload) {
      axios({
        method: 'delete',
        url: '/books/' + payload.bookId,
        headers: {'content-type': 'application/json'}
      })
      .then((response) => {
        dispatch('fetchBooksList');
      }, (error) => {
      });
    },

    /*
       return await auth.(resetPasswordCode, newPassword)
        .then(user => user)
        .catch(error => error);
    */
    signOut({ commit }) {
      localStorage.clear();
      commit('setLogout');
    }
  }
}
