import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

class User {
  constructor (id) {
    this.id = id
  }
}

export default {
  state: {
    currUser: null
  },
  mutations: {
    setUser (state, payload) {
      state.currUser = payload
    }
  },
  actions: {
    async registerUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', new User(firebase.auth().currentUser.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async loginUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', new User(firebase.auth().currentUser.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    autoLoginUser ({commit}, payload) {
      commit('setUser', new User(payload.uid))
    },
    logoutUser ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.currUser
    },
    isUserLoggedIn (state) {
      return state.currUser !== null
    }
  }
}
