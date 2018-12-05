<template>
    <b-card no-body>
        <b-tabs pills card vertical>
            <b-tab title="My Profile" active>
                <Profile></Profile>
            </b-tab>
            <b-tab title="Favorite">
                <Favorites></Favorites>
            </b-tab>
            <b-tab title="Following">
                <Following></Following>
            </b-tab>
        </b-tabs>
    </b-card>
</template>

<script>
    import Profile from '~/components/Profile.vue'
    import Favorites from '~/components/Favorite.vue'
    import Following from '~/components/Following.vue'

    export default {
        components: {
            Favorites,
            Following,
            Profile
        },
        middleware: 'notAuthenticated',
    }
</script>