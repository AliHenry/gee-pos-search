export const state = () => ({
    isAuthenticated: false,
    user: null,
    status: {
        loading: false,
        success: false,
        error: false
    },
})

export const getters = {
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

export const mutations = {
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
}

export const actions = {
    async register(context, payload) {
        let vm = this;
        return new Promise((resolve, reject) => {
            context.commit('LOADING');
            vm.$axios.post('auth/register', payload).then(response => {
                vm.$auth.setToken('local', 'Bearer ' +response.data.response.access_token);
                vm.$auth.setUser(response.data.response.user);
                context.commit('SUCCESS');
                context.commit('IS_AUTHENTICATED', true);
                context.commit('SET_USER', response.data.response.user);
                resolve(response);
            }).catch(error => {
                context.commit('ERROR', error.response.data.errors);
                reject(error);
            });
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
    async authenticate({
                           commit
                       }, provider) {
        let vm = this;
        commit('LOADING');
        try {
            const {
                data
            } = await vm.$auth.loginWith(provider);
            commit('SET_USER', vm.$auth.user);
            commit('IS_AUTHENTICATED', vm.$auth.loggedIn);
            commit('SUCCESS');
            return data;
        } catch (e) {
            commit('ERROR', e);
            throw e;
        }
    },
    async fetchUser({
                        commit
                    }) {
        let vm = this;
        commit('LOADING');
        try {
            let res = await vm.$auth.fetchUser()
            commit('SET_USER', vm.$auth.user);
            return res;
        } catch (e) {
            commit('ERROR', e);
            throw e;
        }
    },
    checkAuth({
                  commit
              }) {
        let vm = this;
        commit('IS_AUTHENTICATED', vm.$auth.loggedIn);
    },
    async fetchData({
                        commit
                    }) {
        let vm = this;
        try {
            await vm.$auth.fetchUser()
            commit('SET_USER', vm.$auth.user);
            commit('IS_AUTHENTICATED', vm.$auth.loggedIn);
            commit('SUCCESS');
        } catch (e) {
            commit('ERROR', e);
            throw e;
        }
    },
    async logout({
                     commit
                 }) {
        let vm = this;
        return new Promise((resolve, reject) => {
            vm.$axios.post('auth/logout').then(response => {
                commit('SUCCESS');
                commit('LOGOUT');
                resolve(response)
            }).catch(error => {
                commit('ERROR', error.data);
                reject(error)
            });
        });
    }
}
