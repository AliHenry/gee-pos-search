<template>
    <b-navbar toggleable="md" type="dark" variant="dark">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="/">GEESearch</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <b-nav-item href="login" v-if="!isAuthenticated">Login</b-nav-item>
                <b-nav-item href="register" v-if="!isAuthenticated">Sign up</b-nav-item>

                <b-nav-item-dropdown right v-if="isAuthenticated">
                    <!-- Using button-content slot -->
                    <template slot="button-content">
                        <em v-if="user">{{user.first_name}}</em>
                    </template>
                    <b-dropdown-item href="/profile">Profile</b-dropdown-item>
                    <b-dropdown-item @click="logout">Signout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>

</template>

<script>
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex';

    export default {
        mounted() {
            let vm = this;
            vm.$store.dispatch('customer');
        },
        computed: {
            ...mapGetters({
                isAuthenticated: 'isAuthenticated',
                user: 'user'
            }),
        },
        methods: {
            ...mapActions({
                logoutAction: 'logout'
            }),
            async logout() {
                let vm = this;
                vm.logoutAction().then(res => {
                    this.$router.push('/')
                }).catch(err => {
                    this.formError = err.data
                });
            }
        }
    }
</script>