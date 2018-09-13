<template>
    <div class="another" v-if="anotherShow" style="transition: .4s transform .4s;transform:translateX(-100%)" ref="another">
            <div class="left" @click="anotherNone">
                <span><i class="icon iconfont icon-angle-right"></i></span>
            </div>
            <div class="right" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
                <div v-for="(item,index) in carList" :key="index" class="right_list">
                    <p>{{item.GroupName}}</p>
                    <ul v-for="(value,key) in item.GroupList" :key="key" @click="toDetail(value.SerialID)"> 
                            <li>
                                <img v-lazy="value.Picture" alt="">
                                <div>
                                    <p>{{value.AliasName}}</p>
                                    <p>{{value.DealerPrice}}</p>
                                </div>
                            </li>
                    </ul>
                </div>
            </div>
        </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex';
export default {
    
    computed:{
        ...mapState({
            anotherShow:state=>state.Index.anotherShow,
            carList:state=>state.Index.carList
        })
    },
    methods:{
        ...mapMutations({
            anotherNone:"Index/anotherNone"
        }),
        touchstart(e){
            this.touch = e.touches[0];
        },
        touchmove(e){
            let touch = e.touches[0];
            this.offsetX = touch.pageX - this.touch.pageX; 
            // console.log(this.offsetX)
            if(this.offsetX>100){
                this.$refs.another.style = `transform:translate3d(${this.offsetX}px, 0, 0)`;
            }
        },
        touchend(){
            // console.log('end',this.offsetX)
            if(this.offsetX>100){
                this.anotherNone();
            }
        },
        toDetail(id){
            this.$router.push({path:'/detail',query:{id}})
        }
    }
}
</script>
<style>


</style>


