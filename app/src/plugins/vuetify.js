import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const opts = {
    theme: {
        themes: {
            light: {
                primary: '#FF9800',
                secondary: '#AE8A68',
                accent: '#DFE0DF',
                // error: '#FF675B',
                // success: '#789B00',
                // info: '#00BAAD'
            },
        },
    },
}

export default new Vuetify(opts)