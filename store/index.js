import Vue from 'vue'
import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: {
            products: [],
            favorites: [],
            following: [],
            isAuthenticated: false,
            user: null,
            status: {
                loading: false,
                success: false,
                error: false
            },
        },
        mutations: {
            SET_PRODUCT(state, products) {
                state.products = products
            },
            SET_FAVORITES(state, favorites) {
                state.favorites = favorites;
            },
            SET_FOLLOWING(state, following) {
                state.following = following;
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
                        vm.$auth.setToken('local', 'Bearer ' + response.data.response.access_token);
                        vm.$auth.setUser(response.data.response.customer);
                        context.commit('SUCCESS');
                        context.commit('IS_AUTHENTICATED', true);
                        context.commit('SET_USER', response.data.response.customer);
                        resolve(response);
                    }).catch(error => {
                        context.commit('ERROR', error.response.data.error);
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
            async favorites(context) {
                let vm = this;
                return new Promise((resolve, reject) => {
                    context.commit('LOADING');
                    vm.$axios.get('/favorite').then(response => {
                        context.commit('SUCCESS');
                        context.commit('SET_FAVORITES', response.data.response.customer.favorites);
                        resolve(response);
                    }).catch(error => {
                        context.commit('ERROR', error.response.data.error);
                        reject(error);
                    });
                })

            },
            async following(context) {
                let vm = this;
                return new Promise((resolve, reject) => {
                    context.commit('LOADING');
                    vm.$axios.get('/following').then(response => {
                        context.commit('SUCCESS');
                        context.commit('SET_FOLLOWING', response.data.response.customer.follow_outlet);
                        resolve(response);
                    }).catch(error => {
                        context.commit('ERROR', error.response.data.error);
                        reject(error);
                    });
                })

            },
            async follow({commit, dispatch}, outlet_uuid) {
                let vm = this;
                let data = {outlet_uuid : outlet_uuid};
                return new Promise((resolve, reject) => {
                    commit('LOADING');
                    vm.$axios.post('/follow-outlet', data).then(response => {
                        commit('SUCCESS');
                        dispatch('following');
                        resolve(response);
                    }).catch(error => {
                        commit('ERROR', error.response.data.error);
                        reject(error);
                    });
                })

            },
            async customer(context) {
                let vm = this;
                return new Promise((resolve, reject) => {
                    context.commit('LOADING');
                    vm.$axios.get('/user').then(response => {
                        context.commit('SUCCESS');
                        context.commit('IS_AUTHENTICATED', true);
                        context.commit('SET_USER', response.data.response.customer);
                        resolve(response);
                    }).catch(error => {
                        context.commit('ERROR', error.response.data.error);
                        reject(error);
                    });
                })

            },

            async fetch(context, payload) {
                let vm = this;
                let query = '';
                if (payload.filter) {
                    query = 'product?search=' + payload.search
                } else {
                    query = 'product'
                }
                return new Promise((resolve, reject) => {
                    context.commit('LOADING');
                    vm.$axios.get(query).then(response => {
                        context.commit('SUCCESS');
                        context.commit('SET_PRODUCT', response.data.response.products);
                        console.log(response.data.response);
                        resolve(response);
                    }).catch(error => {
                        context.commit('ERROR', error.response.data.errors);
                        reject(error);
                    });
                })
            },

            async like({commit, dispatch}, prod_uuid) {
                let vm = this;
                let data = {prod_uuid : prod_uuid};
                return new Promise((resolve, reject) => {
                    commit('LOADING');
                    vm.$axios.post('like-product', data).then(response => {
                        if (response.data.response.success){
                            commit('SUCCESS');
                            let info = {
                                filter: false
                            };
                            dispatch('fetch', info);
                            console.log(response.data.response);
                            resolve(response);
                        }

                    }).catch(error => {
                        commit('ERROR', error.response.data.errors);
                        reject(error);
                    });
                })
            },
            async favorite({commit, dispatch}, prod_uuid) {
                let vm = this;
                let data = {prod_uuid : prod_uuid};
                return new Promise((resolve, reject) => {
                    commit('LOADING');
                    vm.$axios.post('favorite', data).then(response => {
                        if (response.data.response.success){
                            commit('SUCCESS');
                            let info = {
                                filter: false
                            };
                            dispatch('fetch', info);
                            dispatch('favorites');
                            console.log(response.data.response);
                            resolve(response);
                        }

                    }).catch(error => {
                        commit('ERROR', error.response.data.errors);
                        reject(error);
                    });
                })
            },
        },
        getters: {
            products: state => state.products,
            cart: state => state.cart,
            isAuthenticated(state) {
                return state.isAuthenticated
            },
            getProducts(state) {
                return state.products
            },
            favorites(state) {
                return state.favorites
            },
            following(state) {
                return state.following
            },
            user(state) {
                return state.user
            },
            status(state) {
                return state.status
            },
            errors(state) {
                return state.status.error
            },
        }
    })
}

export default createStore
