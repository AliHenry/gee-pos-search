<template>
    <div class="mt-5">
        <div>
            <b-form-input v-model="search"
                          type="text"
                          placeholder="Search"></b-form-input>
        </div>
        <b-row>
            <b-col sm="3" v-for="(product, index) in products" :key="index">
                <b-card :title="product.name"
                        img-src="https://picsum.photos/600/300/?image=25"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2 mt-2">
                    <hr>
                    <p class="card-text">

                        <strong>Price: </strong>${{product.price}}
                    </p>
                    <hr>
                    <b-card-body>
                        <a href="#" class="card-link">
                            <i class="material-icons" @click="likeDislike(product.prod_uuid)">
                                {{showLike(product.likes)}}
                            </i>
                        </a>
                        <a href="#" class="card-link">
                            <i class="material-icons" @click="favoriteUnFavorite(product.prod_uuid)">
                                {{showFavorite(product.favorites)}}
                            </i>
                        </a>
                        <a href="#" class="card-link">
                            <i class="material-icons" @click="followUnFollow(product.outlet_uuid)">
                                {{showFollowing(product.outlet_uuid)}}
                            </i>
                        </a>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions} from 'vuex'

    export default {
        mounted() {
            let vm = this;
            let data = {
                filter: false
            };
            vm.$store.dispatch('fetch', data);
            vm.$store.dispatch('customer');
            vm.$store.dispatch('following');
        },
        computed: {
            ...mapState({
                user: 'user'
            }),
            ...mapGetters({
                products: 'products',
                following: 'following'
            }),
        },
        data() {
            return {
                search: ''
            }
        },
        methods: {
            ...mapActions({
                likeAction: 'like',
                favoriteAction: 'favorite',
                followAction: 'follow'
            }),
            showLike(likes){
                if (likes.length > 0 && this.user !== null){
                    let result = likes.find(like => like.cus_uuid === this.user.cus_uuid)
                        return  result ? 'thumb_up' : 'thumb_down';
                }else {
                    return 'thumb_down'
                }
            },
            showFavorite(favorites){
                if (favorites.length > 0 && this.user !== null){
                    let result = favorites.find(favorite => favorite.cus_uuid === this.user.cus_uuid)
                    return  result ? 'favorite' : 'favorite_border';
                }else {
                    return 'favorite_border'
                }
            },
            showFollowing(id){
                if (this.following.length > 0){
                    let result = this.following.find(follow => follow.outlet_uuid === id)
                    return  result ? 'group' : 'group_add';
                }else {
                    return 'group_add'
                }
            },
            likeDislike(id){
                if (this.user !== null){
                    this.likeAction(id);
                }else{
                    this.$router.push('/login');
                }
            },
            favoriteUnFavorite(id){
                if (this.user !== null){
                    this.favoriteAction(id);
                }else{
                    this.$router.push('/login');
                }
            },
            followUnFollow(id){
                if (this.user !== null){
                    this.followAction(id);
                }else{
                    this.$router.push('/login');
                }
            }
        },
        watch: {
            search() {
                if (this.search.length > 0){
                    let data = {
                        search: this.search,
                        filter: true
                    };
                    this.$store.dispatch('fetch', data)
                } else{
                    let data = {
                        filter: false
                    };
                    this.$store.dispatch('fetch', data)
                }
            }

        },
    }
</script>