<template>
    <div class="mt-5">
        <b-row>
            <b-col sm="3" v-for="(follow, index) in following" :key="index">
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
                    <a href="#" class="card-link">
                        <i class="material-icons" @click="remove(favorite.outlet_uuid)">
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