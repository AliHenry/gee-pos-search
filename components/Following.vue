<template>
    <div class="mt-5">
        <b-row>
            <b-col sm="3" v-for="favorite in favorites">
                <b-card :title="favorite.name"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2">
                    <p class="card-text">
                        <strong>Price: </strong>{{favorite.price}}
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
            vm.$store.dispatch('favorites');
        },
        computed: {
            ...mapGetters({
                favorites: 'favorites'
            }),
        },
        data () {
            return {
                text1: ''
            }
        }
    }
</script>