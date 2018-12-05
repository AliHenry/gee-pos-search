<template>
    <b-container class="bv-example-row mt-5">
        <b-row class="ustify-content-md-cente">
            <b-col cols="8">
                <b-card title="Sign Up"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2">
                    <div>
                        <b-form-group id="exampleInputGroup1"
                                      label-for="exampleInput1">
                            <b-form-input id="exampleInput1"
                                          type="text"
                                          v-model="form.first_name"
                                          required
                                          placeholder="First Name">
                            </b-form-input>
                            <span v-if="status.error" style="color:red">{{ status.error.first_name[0] }}</span>
                        </b-form-group>
                        <b-form-group id="exampleInputGroup1"
                                      label-for="exampleInput1">
                            <b-form-input id="exampleInput1"
                                          type="text"
                                          v-model="form.last_name"
                                          required
                                          placeholder="Last Name">
                            </b-form-input>
                            <span v-if="status.error" style="color:red">{{ status.error.last_name[0] }}</span>
                        </b-form-group>
                        <b-form-group id="exampleInputGroup1"
                                      label-for="exampleInput1">
                            <b-form-input id="exampleInput1"
                                          type="email"
                                          v-model="form.email"
                                          required
                                          placeholder="Enter email">
                            </b-form-input>
                            <span v-if="status.error" style="color:red">{{ status.error.email[0] }}</span>
                        </b-form-group>
                        <b-form-group id="exampleInputGroup1"
                                      label-for="exampleInput1">
                            <b-form-input id="exampleInput1"
                                          type="password"
                                          v-model="form.password"
                                          required
                            >
                            </b-form-input>
                            <span v-if="status.error" style="color:red">{{ status.error.password[0] }}</span>
                        </b-form-group>
                        <b-form-group id="exampleInputGroup1"
                                      label-for="exampleInput1">
                            <b-form-input id="exampleInput1"
                                          type="password"
                                          v-model="form.confirm_password"
                                          required
                            >
                            </b-form-input>
                            <span v-if="status.error" style="color:red">{{ status.error.confirm_password[0] }}</span>
                        </b-form-group>
                        <div>
                            <b-button variant="primary" @click="register">Sing Up</b-button>
                            <a href="login">Login</a>
                        </div>
                    </div>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex'

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
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    confirm_password: ''
                }
            };
        },
        methods: {
            ...mapActions({
                registerAction: 'register'
            }),
            async register(e) {
                e.preventDefault();
                let vm = this;
                this.registerAction(vm.form).then(res => {
                    if (res) {
                        console.log('login done...')
                        vm.$router.push('/');
                    }
                });
            },
        }
    }
</script>