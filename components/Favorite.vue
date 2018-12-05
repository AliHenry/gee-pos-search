<template>
    <div class="mt-5">
        <b-row>
            <b-col sm="3" v-for="(favorite, index) in favorites" :key="index">
                <b-card :title="favorite.name"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2">
                    <p class="card-text">
                        <strong>Price: </strong>{{favorite.price}}
                    </p>
                    <a href="#" class="card-link">
                        <i class="material-icons" @click="remove(favorite.prod_uuid)">
                            delete_outline
                        </i>
                    </a>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

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
        },
        methods: {
            ...mapActions({
                favoriteAction: 'favorite'
            }),
            remove(id){
                this.favoriteAction(id);
            }
        },
    }
</script>