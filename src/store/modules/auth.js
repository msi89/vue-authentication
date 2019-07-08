import axios from 'axios'

export default {
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {}
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
          state.status = 'success'
          state.token = token
          state.user = user
    },
    auth_error(state){
          state.status = 'error'
    },
    logout(state){
          state.status = ''
          state.token = ''
    },
  },
  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'http://api.localhost/api/auth/login/', data: user, method: 'POST' })
        .then(resp => {
            const token = resp.data.key
            const user = resp.data.user
            localStorage.setItem('token', token)
            // Add the following line:
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
        })
        .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
        })
      })
    },
    register({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'http://api.localhost/api/auth/registration/', data: user, method: 'POST' })
        .then(resp => {
            commit('reg_status', true, resp)
            resolve(resp)
        })
        .catch(err => {
            commit('reg_status', false, err)
            reject(err)
        })
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
}