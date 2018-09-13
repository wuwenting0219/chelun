<template>
    <div class="wrap">
        <div class="content">
            <div class="content_list" >
                <div class="car_list">
                    <div class="list" v-for="(item,index) in jsonList" :key="index">
                        <p :id="index">{{index}}</p>
                        <ul>
                            <li v-for="(value,key) in item" :key="key" @click="getCarJson(value.MasterID)" >
                                <span><img v-lazy="value.CoverPhoto" alt=""></span>
                                <span>{{value.Name}}</span>
                            </li>
                        </ul>
                    </div>
                </div>  
            </div>
            <div class="show" v-if="show">
                <span>{{LetterList[showLetterIndex]}}</span>
            </div>
        </div>
        <div class="letter" @touchstart="changeStart()"
                            @touchmove="touchmove"
                            @touchend="changeEnd()">
            <li v-for="(item,index) in LetterList" :key="index">
                <span >{{item}}</span>
            </li>
        </div>
        <Carlist></Carlist>
    </div>
</template>

<script>
import Bscroll from 'better-scroll';
import {mapState,mapMutations,mapActions} from 'vuex';
import Carlist from './Carlist.vue';
export default {
    data () {
        return {
        }
    },
    computed:{
        ...mapState({
            jsonList:state=>state.Index.jsonList,
            LetterList:state=>state.Index.LetterList,
            show:state=>state.Index.show,
            showLetterIndex:state=>state.Index.showLetterIndex,
        })
    },
    mounted(){
        this.getJson(111);
        // const scroll = new Bscroll('.content_list',{
        //     probeType:2,
        //     click:true
        // })
    },
    methods:{
        ...mapActions({
            getJson:"Index/getJson",
            getCarJson:"Index/getCarJson"
        }),
        ...mapMutations({
            changeStart:"Index/changeStart",
            changeEnd:"Index/changeEnd",
        }),
        touchmove(e){
            // console.log(e.touches);
            //获取手指的位置
            let pageY = e.touches[0].pageY;
            //计算当前在哪个字母的位置
            let indexs = Math.floor((pageY-this.marginTop)/this.height);
            //字母上下边界的处理
            if(indexs>this.LetterList.length-1){
                indexs = this.LetterList.length-1
            }else if (indexs<0){
                indexs =0;
            }
            //查询ID是是当前字母的元素
            let ele = document.getElementById(this.LetterList[indexs])
            let top = ele.offsetTop;
            // console.log(top)
            document.querySelector('.content_list').scrollTop = top;
            this.$store.commit('Index/showLetter',indexs)
        }
    },
    updated(){
        //计算字母的高度
        this.height = 0.47*window.innerWidth/750*100;
        // console.log(this.height);
        //获取字母距离顶部的距离
        this.marginTop = (window.innerHeight- (this.LetterList.length)*this.height)/2;
        // console.log(this.marginTop)
    },
    components:{
        Carlist
    }
}
</script>


<style>
    @import url('../common/css/index.css');
    @import url('../common/fonts2/iconfont.css');
    
</style>



