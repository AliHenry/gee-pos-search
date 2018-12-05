<template>
    <div class="mt-5">
        <b-row>
            <b-col sm="3">
                <b-card title="User Info"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2">
                    <p class="card-text">
                        <strong>First Name: </strong>{{customer.first_name}}
                    </p>
                    <p class="card-text">
                        <strong>Last Name: </strong>{{customer.last_name}}
                    </p>
                    <p class="card-text">
                        <strong>Last Name: </strong>{{customer.email}}
                    </p>
                    <b-button href="#" variant="default">Edit</b-button>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        mounted() {
            let vm = this;
            vm.$store.dispatch('customer');
        },
        computed: {
            ...mapState('auth', {
                customer: 'user'
            }),
        },
        data () {
            return {
                text1: ''
            }
        }
    }
</script>