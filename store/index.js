import Vue from 'vue'
import Vuex from 'vuex'
import cosmic from '../plugins/cosmic'

const createStore = () => {
  return new Vuex.Store({
    state: {
      cartTotal: 0,
      cart: {},
      products: [],
      globals: [],
      isAuthenticated: false,
      user: null,
      status: {
          loading: false,
          success: false,
          error: false
      },
    },
    mutations: {
      setProducts (state, products) {
        state.products = products
      },
      setGlobals (state, globals) {
        state.globals = globals
      },
      clearCart (state) {
        state.cart = {}
        state.cartTotal = 0
      },
      removeItem (state, item) {
        state.cartTotal -= item.count
        Vue.delete(state.cart, item.slug)
      },
      addToCart (state, item) {
        state.cartTotal++
        if (item.slug in state.cart) {
          state.cart[item.slug].count++
        } else {
          let stateItem = Object.assign({}, item)
          stateItem.count = 1
          state.cart[item.slug] = stateItem
        }
      },
        IS_AUTHENTICATED(state, status) {
            state.isAuthenticated = status
        },
        SET_USER(state, user) {
            state.user = user;
        },
        LOADING(state) {
            state.status = {
                loading: true,
                success: false,
                error: false
            }
        },
        SUCCESS(state) {
            state.status = {
                loading: false,
                success: true,
                error: false
            }
        },
        ERROR(state, error) {
            state.status = {
                loading: false,
                success: false,
                error: error && error.message || error
            }
        },
        LOGOUT(state) {
            state.status = {
                loading: false,
                success: false,
                error: false
            };
            state.isAuthenticated = false;
            state.user = null;
        }
    },
    actions: {
      nuxtServerInit ({ dispatch }, { req }) {
        return dispatch('getGlobals')
      },
      getProducts({ commit, state }) {
        const params = {
          type_slug: 'products'
        }
        return cosmic.getObjectsByType(params).then(data => {
          commit('setProducts', data.objects)
        }).catch(err => {
          console.log(err)
        })
      },
      getGlobals({ commit, state }) {
        const params = {
          type_slug: 'globals'
        }
        return cosmic.getObjectsByType(params).then(data => {
          commit('setGlobals', data.objects)
        }).catch(err => {
          console.log(err)
        })
      },
        async login({
                        commit
                    }, credentials) {
            let vm = this;
            commit('LOADING');
            try {
                await vm.$auth.loginWith('local', {
                    data: credentials
                });
                commit('SET_USER', vm.$auth.user);
                commit('IS_AUTHENTICATED', vm.$auth.loggedIn);
                commit('SUCCESS');
                return true;
            } catch (e) {
                console.log(e);
                commit('ERROR', e);
                throw e;
            }
        },
        async register(context, payload) {
            let vm = this;
            return new Promise((resolve, reject) => {
                context.commit('LOADING');
                vm.$axios.post('/register', payload).then(response => {
                    vm.$auth.setToken('local', 'Bearer ' +response.data.response.access_token);
                    vm.$auth.setUser(response.data.response.user);
                    context.commit('SUCCESS');
                    context.commit('IS_AUTHENTICATED', true);
                    context.commit('SET_USER', response.data.response.customer);
                    resolve(response);
                }).catch(error => {
                    context.commit('ERROR', error.response.data.errors);
                    reject(error);
                });
            })

        },

        async logout({
                         commit
                     }) {
            let vm = this;
            return new Promise((resolve, reject) => {
                vm.$axios.post('logout').then(response => {
                    commit('SUCCESS');
                    commit('LOGOUT');
                    resolve(response)
                }).catch(error => {
                    commit('ERROR', error.data);
                    reject(error)
                });
            });
        },
    },
    getters: {
      products: state => state.products,
      cart: state => state.cart,
        isAuthenticated(state) {
            return state.isAuthenticated
        },
        user(state) {
            return state.user
        },
        status(state) {
            return state.status
        },
        errors(state) {
            return state.status.error
        }
    }
  })
}

export default createStore
