const pkg = require('./package')

module.exports = {
    mode: 'universal',

    /*
    ** Headers of the page
    */
    head: {
        title: pkg.name,
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: pkg.description}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },

    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#fff'},

    /*
    ** Global CSS
    */
    css: [],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [],

    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://github.com/nuxt-community/axios-module#usage
        '@nuxtjs/axios',
        // Doc: https://bootstrap-vue.js.org/docs/
        'bootstrap-vue/nuxt',
        '@nuxtjs/auth',
        'nuxt-material-design-icons'
    ],
    server: {
        // nuxt.js server options ( can be overrided by environment variables )
        port: 9000,
    },
    /*
    ** Axios module configuration
    */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
        baseURL: 'http://127.0.0.1:8000/customer',
    },

    auth: {
        plugins: ['~/plugins/auth.js'],
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: '/login',
                        method: 'post',
                        propertyName: 'response.access_token'
                    },
                    logout: {
                        url: '/logout',
                        method: 'post'
                    },
                    user: {
                        url: '/user',
                        method: 'get',
                        propertyName: 'response.customer'
                    }
                },
                // tokenRequired: true,
                // tokenType: 'bearer',
            },
        }
    },

    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {

        }
    }
}
