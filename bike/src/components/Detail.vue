<template>
        
        <div class="detail">
            <div class="img">
                <img :src="detailJson.CoverPhoto" alt="" @click="toImg(detailJson.SerialID)">
                <span>{{detailJson.pic_group_count}}张照片</span>
            </div>
            <div class="info">
                <p>{{detailJson.market_attribute && detailJson.market_attribute.dealer_price}}</p>
                <p>指导价:{{detailJson.market_attribute && detailJson.market_attribute.official_refer_price}}</p>
                <div class="action">
                    <button @click="toQuotation(detailJson)">{{detailJson.BottomEntranceTitle}}</button>
                
                </div>
            </div>
            <div class="car-list">
                <div class="car-type">
                    <span v-for="(item,index) in years" :key="index" @click="changeYear(item)" :class="Year== item ?'active':''">{{item}}</span>
                </div>
                <div class="div">
                    <div v-for="(item,index) in list" :key="index">
                        <p>{{index}}</p>
                        <li v-for="(value,key) in item" :key="key">
                            <p>{{value.market_attribute.year}}年款  {{value.car_name}}</p>
                            <p>{{value.horse_power}}马力{{value.gear_num}}档手自一体</p>
                            <p>
                                <span>指导价:{{value.market_attribute.official_refer_price}}</span>
                                <span>{{value.market_attribute.dealer_price_min}}起</span>
                            </p>
                            <button @click="toQuotation(detailJson)">询问底价</button>
                        </li>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <p>询问底价</p>
                <p>本地经销商为你报价</p>
            </div>
        </div>
       
 
</template>
<script>
    import {mapState,mapMutations,mapActions,mapGetters} from 'vuex';
    import Login from './Login'
    export default {
        computed:{
            ...mapState({
                detailJson:state=>state.Detail.detailJson,
                Year:state=>state.Detail.changeYear,
                isLogin:state=>state.Login.isLogin
            }),
           ...mapGetters({
               years:'Detail/years',
               list:'Detail/list'
           })
        },
        methods:{
           ...mapMutations({
                changeYear:'Detail/changeYear'
           }),
           ...mapActions({
               getDetailJson:'Detail/getDetailJson',
               
           }),
           toImg(id){
               this.$router.push({path:'/img',query:{id}})
           },
           toQuotation(json){
               console.log('json.....',json);
               window.localStorage.setItem('json',JSON.stringify(json));
            //    window.localStorage.setItem('name',JSON.stringify(name))
               this.$router.push({path:'/quotation'})
           }
        },
        mounted(){
            this.getDetailJson(this.$route.query.id);
        },
        components:{
            Login
        }
        
    }
</script>
<style lang="scss" scoped>
    .all{
        width:100%;
        height: 100%;
    }
    .detail{
        width:100%;
        height: 100%;
        font-size: .3rem;
        overflow-y:scroll;
    }
    .img{
        width:100%;
        height: 1.6rem;
        position: relative;
        img{
            width: 100%;
            left:0;
            top: 50%;
            transform: translateY(-88px);
            position: absolute;
        }
        span{
            position: absolute;
            right: 0;
            bottom:-1.7rem;
            color: #fff;
            padding: 1px .1rem;
            border-radius: .2rem;
            background: rgba(0,0,0,.6);
            font-size: .24rem;
        }
    }
    .info{
        width:100%;
        padding: .36rem .2rem .3rem;
        background: #fff;
        position: relative;
        top:2.1rem;
        left:0;
        p:first-child {
            font-size: .36rem;
            color: red;
            font-weight: 500;
        }
        p:nth-child(2) {
            font-size: .28rem;
            color: silver;
        }
        .action {
            padding-top: .2rem;
            -webkit-box-pack: justify;
            justify-content: space-between;
            width: 50%;
            position: absolute;
            right: .1rem;
            top: .22rem;
            button{
                width:100%;
                border-radius: .1rem;
                font-size: .32rem;
                height: .7rem;
                width: 3.45rem;
                border: none;
                box-sizing: border-box;
                background: #00afff;
                color: #fff;
            }
        }
    }
    .car-list{
        flex:1;
        position: relative;
        top:2.2rem;
        left:0;
        // overflow: scroll;
    }
    .car-type{
        border-top: .15rem solid #f4f4f4;
        padding: 0 .3rem;
        font-size: .32rem;
        height: .77rem;
        line-height: .77rem;
        background: #fff;
        span{
            padding-right: .46rem;
        }
        .active{
            color:skyblue
        }
        
    }
    li{
        list-style: none;
    }
    .div{
        width:100%;
        overflow-x: hidden;
        overflow-y: scroll;
        div{
            width:100%;
            >p{
                padding: 0 .2rem;
                height: .5rem;
                line-height: .5rem;
                font-size: .26rem;
                color: #999;
                background: #f4f4f4;
            }
        }
    }
    li{
        padding: 0 .2rem;
        border-bottom: .18rem solid #f4f4f4;
    }
    li p:first-child {
        padding: .26rem 0 .18rem;
        font-size: .3rem;
        line-height: 1;
        color: #3d3d3d;
    }
    li p:nth-child(2) {
        color: #bdbdbd;
        font-size: .26rem;
    }
    li p:nth-child(3) {
        text-align: right;
        padding-bottom: .1rem;
        font-size: .24rem;
        color: #818181;
        padding-right: .1rem;
        span{
            text-align: right;
            padding-bottom: .1rem;
            font-size: .24rem;
            color: #818181;
        }
        span:nth-child(2) {
            font-size: .3rem;
            color: #ff2336;
            margin-left: .1rem;
        }
        
    }
    li button{
        border: none;
        border-top: 1px solid #eee;
        width: 110%;
        height: .8rem;
        font-size: .32rem;
        color: #00afff;
        background: #fff;
        font-weight: 500;
        margin-left: -.3rem;
    }
    .bottom{
        position: fixed;
        width: 100%;
        bottom: 0;
        z-index: 99;
        background: #3aacff;
        height: 1rem;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        p{
            text-align: center;
        }
    }


    // https://baojia.chelun.com/v2-dealer-alllist.html?carId=129491&cityId=201&_1536236247783


    // https://baojia.chelun.com/v1-city-alllist.html?_1536236772718
</style>








