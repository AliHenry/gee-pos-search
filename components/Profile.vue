<template>
    <div class="mt-5">
        <b-row>
            <b-col sm="3" v-for="follow in following">
                <b-card :title="follow.name"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2">
                    <p class="card-text">
                        <strong>Address: </strong>{{follow.address}}
                    </p>
                    <p class="card-text">
                        <strong>City: </strong>{{follow.city}}
                    </p>
                    <b-button href="#" variant="danger">Remove</b-button>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        mounted() {
            let vm = this;
            vm.$store.dispatch('following');
        },
        computed: {
            ...mapGetters({
                following: 'following'
            }),
        },
        data () {
            return {
                text1: ''
            }
        }
    }
</script>