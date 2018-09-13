import Vue from 'vue'
import Vuex from 'vuex'
import Index from './modules/index'
import Detail from './modules/detail'
import Img from './modules/img'
import Login from './modules/login'
import Quotation from './modules/quotation'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        Index,
        Detail,
        Img,
        Login,
        Quotation
    }
})