<template>
    <b-container class="bv-example-row mt-5">
        <b-row class="ustify-content-md-cente">
            <b-col cols="8">
                <b-card title="Login"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2">
                    <div>
                        <b-form-group id="exampleInputGroup1"
                                      label-for="exampleInput1">
                            <b-form-input id="exampleInput1"
                                          type="email"
                                          v-model="form.email"
                                          required
                                          placeholder="Enter email">
                            </b-form-input>
                            <span v-if="status.error" style="color:red">{{ status.error }}</span>
                        </b-form-group>
                        <b-form-group id="exampleInputGroup1"
                                      label-for="exampleInput1">
                            <b-form-input id="exampleInput1"
                                          type="password"
                                          v-model="form.password"
                                          required
                                          placeholder="Enter Password">
                                          >
                            </b-form-input>
                        </b-form-group>
                        <div>
                            <b-button variant="primary" @click="login">Login</b-button>
                            <a href="/register">Register</a>
                        </div>
                    </div>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                status: 'status'
            }),
        },
        data() {
            return {
                code: '',
                form: {
                    email: null,
                    password: null,
                }
            };
        },
        methods: {
            ...mapActions({
                loginAction: 'login'
            }),
            async login(e) {
                e.preventDefault();
                let vm = this;
                this.loginAction(vm.form).then(res => {
                    if (res) {
                        console.log('login done...')
                        vm.$router.push('/');
                    }
                });
            },
        },
    };
</script>