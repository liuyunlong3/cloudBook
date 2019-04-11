import Vue from 'vue'
import Vuex from 'vuex'
import { fetch } from '../utils/index'
import api from '../utils/api'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)  //安装vuex

const store = new Vuex.Store({
    state: {
        userMsg: {},
        userData: {}
    },
    mutations: {
        'CHANGE_USER_MSG'(state, userMsg) {
            state.userMsg = userMsg
        }
    },
    actions: {
        getUserMsg(context) {
            return new Promise((resolve) => {
                fetch.get(api.user).then(res => {
                    if (res.code == 200) {
                        this.userData = res.data
                        context.commit('CHANGE_USER_MSG', res.data)
                        resolve(res)
                    }
                })
            })
        }
    },
    plugins:[createPersistedState({
        storage: {
            getItem: key => sessionStorage.getItem(key),
            setItem: (key,value) =>
            sessionStorage.setItem(key, value),
            removeItem: key => sessionStorage.removeItem(key),
        },
    })]
})

export default store