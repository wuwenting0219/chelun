<template>
    <div class="img">
        <div class="img_show">
            <div class="type">
                
                <span @click="showColor(id)">颜色</span>
                <span @click="showCar(id)">车型</span>
            </div>
            <div class="img_content">
                <ul v-for="(item,index) in imgJson" :key="index">
                    <p @click="Allimg({id:id,carId:item.Id,page})">
                        <span>{{item.Name}}</span>
                        <span>{{item.Count}}张照片></span>
                    </p>
                    <li v-for="(value,key) in item.List" :key="key">
                        <img v-lazy="value.Url" alt="">
                    </li>
                </ul>
            </div>
        </div>
        <div class="color_show" v-if="isshow" style="transition:1s transform 1s;transform:translateY(-100%)">
            <p @click="back">全部颜色</p>
            <div>
                <p class="color-type">
                    <span v-for="(item,index) in yearlist" :key="index" @click="year(item)" :class="item==years?'active':''">{{item}}</span>
                </p>
                <ul  v-for="(item,index) in colorJson" :key="index" v-if="index == years">
                    <li  v-for="(value,key) in item" :key="key" ><span :style="{background:value.Value}"></span>    {{value.Name}}</li>
                </ul>
            </div>
        </div>
        <div class="car_show"  v-if="isshowCar" style="transition:1s transform 1s;transform:translateY(-100%)">
            <p @click="backPage">全部车款</p>
            <div class="year">
                <span v-for="(item,index) in CarYearList" :key="index" @click="CarYear(item)" :class="checkYear==item?'active':''">{{item}}</span>
            </div>
            <div >
                <p>{{title}}</p>
                <ul >
                    <li v-for="(item,index) in carList" :key="index" v-if="checkYear == item.market_attribute.year" @click="CarYearImg({id,car_id:item.car_id,name:item.market_attribute.year+'年'+item.car_name})">
                        <p>
                            <span>{{item.market_attribute.year}}年{{item.car_name}}</span>
                            <span>{{item.market_attribute.dealer_price_min}}起</span>
                        </p>
                        <p>
                            <span>{{item.horse_power}}马力{{item.gear_num}}档{{item.trans_type}}</span>
                            <span>指导价{{item.market_attribute.official_refer_price}}</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="car_detailImg" v-if="isShowCarYear" style="transition:1s transform 1s;transform:translateY(-100%)">
            <div class="detailImg_tit">
                <span @click="showColor(id)">颜色</span>
                <span @click="showCar(id)">{{name}}</span>
            </div>
            <div class="img-default" >
                <ul  v-for="(item,index) in CarYearJson" :key="index">
                    <p>
                        <span>{{item.Name}}</span>
                        <span>{{item.Count}}张</span>
                    </p>
                    <li v-for="(value,key) in item.List" :key="key">
                        <img :src="value.Url" alt="" @click="showSwipers">
                    </li>
                </ul>
            </div>
        </div>
        <div class="detailImg" v-if="showAllImg" style="transition:1s transform 1s;transform:translateY(-100%)" ref="all">
             <!-- @touchend="touchend()" -->
            <div class="img-list">
                <li v-for="(item,index) in allImgJson" :key="index">
                    <img :src="item.Url" @click="showSwiper">
                </li>
                 <p class="bottom">加载中...</p>
            </div>
           
        </div>
        <div class="img-swiper" v-if="swiperFlag" style="transition:1s transform 1s;transform:translateY(-100%)" ref="all">
            <div class="swiper-all" @click="closeSwiper()">
                <div class="swiper-container">
                    <swiper :options="swiperOption">
                        <swiper-slide  v-for="(item,index) in allImgJson" :key="index">
                            <img :src="item.Url" alt="">
                        </swiper-slide>
                        <p class="swiper-pagination" slot="pagination"></p>
                    </swiper>
                </div>
                <button @click.stop="toAsk()" class="button">讯最低价</button>
                
            </div>
        </div>
    </div>
    
</template>
<script>
    import {mapState,mapMutations,mapActions,mapGetters} from 'vuex';
    import BScroll from 'better-scroll';
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css';
    export default {
        data(){
            return{
                id:location.href.split('=')[1],
                page:1,
                startY:0,
                startScroll:0,
                swiperOption:{
                    pagination: {
                        el: '.swiper-pagination',
                        type : 'fraction', 
                        clickable :true, 
                    }  
                }
            }
        },
        computed:{
            ...mapState({
                imgJson:state=>state.Img.imgJson,
                isshow:state=>state.Img.isshow,
                colorJson:state=>state.Img.colorJson,
                yearlist:state=>state.Img.yearlist,
                years:state=>state.Img.years,
                isshowCar:state=>state.Img.isshowCar,
                CarYearList:state=>state.Img.CarYearList,
                checkYear:state=>state.Img.checkYear,
                carList:state=>state.Img.carList,
                title:state=>state.Img.title,
                CarYearJson:state=>state.Img.CarYearJson,
                isShowCarYear:state=>state.Img.isShowCarYear,
                name:state=>state.Img.name,
                showAllImg:state=>state.Img.showAllImg,
                allImgJson:state=>state.Img.allImgJson,
                swiperFlag:state=>state.Img.swiperFlag
            })
        },
        methods:{
            ...mapActions({
                getImg:'Img/getImg',
                showColor:'Img/showColor',
                showCar:'Img/showCar',
                CarYearImg:'Img/CarYearImg',
                Allimg:'Img/Allimg'
            }),
            ...mapMutations({
                year:'Img/year',
                back:'Img/back',
                CarYear:'Img/CarYear',
                backPage:'Img/backPage',
                showSwiper:'Img/showSwiper',
                closeSwiper:'Img/closeSwiper',
                showSwipers:'Img/showSwipers'
            }),
            // touchend(e){
            //     let scrollHeight = this.$refs.all.getBoundingClientRect().height - window.innerHeight;
            //     let current = this.$refs.all.scrollTop;
            //     if (current > (scrollHeight-20)){
            //         this.page++;
            //         console.log(this.page);
            //         this.$store.commit('Img/cunt',this.page);

            //     }
                
            // },
            toAsk(){
                this.$router.push('/Quotation')
            }
        },
        mounted(){
            this.getImg(this.$route.query.id);
            console.log('length...',this.allImgJson.length)
            
        },
        updated(){
            if(!this.allImgJson.length){
                return null;
            }
            new BScroll('.detailImg',{
                click:true,
                probeType:2
            });
            

        }
    }
</script>
<style lang="scss" scoped>
    *{
        margin:0;
        padding:0;
        list-style:none;
    }

    html,body,#app,.img{
        width:100%;
        height: 100%;
        overflow: hidden;
    }
    .img_show{
        width:100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .type{
        width:100%;
        height: .8rem;
        display: flex;
        align-items: center;
        span{
            flex:1;
            text-align: center;
            font-size:.28rem;
        }
        span:after {
            content: "";
            display: inline-block;
            padding-top: .16rem;
            padding-right: .16rem;
            border-top: 2px solid #ccc;
            border-right: 2px solid #ccc;
            -webkit-transform: rotate(135deg);
            transform: rotate(135deg);
            margin-left: .2rem;
            vertical-align: 5%;
        }
    }
    .img_content{
        flex:1;
        overflow: scroll;
        ul{
            width:100%;
            display: flex;
            flex-wrap: wrap;
            position: relative;
            li{
               width: 32%;
                height: 2.46rem;
                padding: .05rem .03rem;
                box-sizing: border-box;
                img{
                    width:100%;
                    height: 98%;
                }
            }
            p{
                height: 2.46rem;
                font-size:.27rem;
                color:white;
                width: 32%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                position: absolute;
                top:0;
                left:0;
                span{
                    position: absolute;
                    top:.8rem;
                    left:1rem;
                    display: block;
                    z-index: 999;
                }
                span:nth-child(2){
                    position: absolute;
                    top:1.2rem;
                    left:.5rem;
                }
            }
        }
    }
    .color_show{
        width:100%;
        height: 100%;
        background: #f4f4f4;
        position: absolute;
        z-index: 10000;
        >P{
            margin: .15rem 0;
            font-size: .34rem;
            color: #00afff;
            background: #fff;
            text-align: center;
            line-height: .8rem;
            height: .8rem;
        }
        >div{
            width:100%;
            .color-type{
                width:100%;
                margin-top: .15rem;
                padding-left: .2rem;
                font-size: .3rem;
                line-height: .76rem;
                height: .76rem;
                background: #fff;
                overflow-x: scroll;
                span{
                    padding-right: .42rem;
                }
            }
            >ul{
                margin-top: .15rem;
                padding: 0 .2rem;
                overflow: hidden;
                background: #fff;
                >li{
                    float: left;
                    width: 3rem;
                    font-size: .32rem;
                    line-height: .68rem;
                    border: 1px solid #3aacff;
                    box-sizing: border-box;
                    margin: .2rem 0;
                    border-radius: .05rem;
                    margin-right: .2rem;
                }
                span{
                    display: inline-block;
                    width: .4rem;
                    height: .4rem;
                    margin-left: .2rem;
                    vertical-align: -12%;
                    // background: #fe9210;
                    box-sizing: border-box;
                    border: 1px solid #818181;
                }
            }
        }
    }
    .active{
        color:skyblue;
    }
    .car_show{
        width:100%;
        height: 100%;
        background: #f4f4f4;
        position: absolute;
        z-index: 1000;
        >P{
            margin: .15rem 0;
            font-size: .34rem;
            color: #00afff;
            background: #fff;
            text-align: center;
            line-height: .8rem;
            height: .8rem;
        }
        .year{
            margin-top: .15rem;
            padding-left: .2rem;
            font-size: .3rem;
            line-height: .76rem;
            height: .76rem;
            background: #fff;
            span{
                padding-right: .42rem;
                font-size:.28rem;
            }
        }
        >div{
            >p{
                font-size:.3rem;
                padding: 0 .2rem;
                height: .6rem;
                line-height: .6rem;
                font-size: .24rem;
                color: #666;
                background: #eee;
            }
            >ul{
                width:100%;
                background: #fff;
                >li{
                    width:100%;
                    font-size:.3rem;
                    margin: 0 .2rem;
                    padding: .28rem .06rem;
                    border-bottom: 1px solid #eee;
                    box-sizing: border-box;
                    height: 1.25rem;
                    line-height: 1;
                    margin-top:.1rem;
                    p:nth-child(1){
                        width: 100%;
                        display: flex;
                        align-items: center;
                        span:nth-child(1) {
                            width: 5rem;
                            display: inline-block;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                        }
                        span:nth-child(2){
                            
                            color: red;
                            font-size: .26rem;
                        }
                    }
                    p:nth-child(2){
                        background: #fff;
                        padding-top: .16rem;
                        font-size: .24rem;
                        display: flex;
                        position: relative;
                        span:nth-child(1){
                            color:#b3b3b3;
                        }
                        span:nth-child(2){
                            color: #818181;
                            position: absolute;
                            right: 1rem;
                            top:.15rem;
                        }
                    }
                }
            }
        }
    }
    .car_detailImg{
        width:100%;
        height: 100%;
        background: white;
        position: absolute;
        z-index:1000;
        overflow-y:scroll;
        .img-default{
            width:100%;
            >ul{
                width:100%;
                height: 2.46rem;
                display: flex;
                flex-wrap: wrap;
                position: relative;
               >p{
                   width: 32%;
                   height: 100%;
                   background: rgba(0,0,0,0.5);
                   position: absolute;
                   top:0;
                   left:0;
                    span:nth-child(1){
                       position: absolute;
                        top:.8rem;
                        left:1rem;
                        color:white;
                        font-size: .24rem;
                   }
                    span:nth-child(2){
                       position: absolute;
                        top:1.2rem;
                        left:1rem;
                        color:white;
                        font-size: .24rem;
                   }
               }
                >li{
                    width:32%;
                    height: 100%;
                    >img{
                        width:100%;
                        height: 100%;
                    }
                }
            }
            >ul:nth-child(2){
                margin-top:2.5rem;
            }
            >ul:nth-child(3){
                margin-top:2.5rem;
            }
        }
    }
    .detailImg_tit{
        width:100%;
        height: .8rem;
        display: flex;
        align-items: center;
        
        >span{
            font-size: .23rem;
            flex:1;
            text-align: center;
        }
        >span:nth-child(1){
            max-width: 2.6rem;
            display: inline-block;
            vertical-align: middle;
            line-height: 1.25;
            font-size: .28rem;
            margin-left:.6rem;
        }
        >span:after {
            content: "";
            display: inline-block;
            padding-top: .16rem;
            padding-right: .16rem;
            border-top: 2px solid #ccc;
            border-right: 2px solid #ccc;
            -webkit-transform: rotate(135deg);
            transform: rotate(135deg);
            margin-left: .2rem;
            vertical-align: 5%;
        }
        >span:nth-child(2){
            margin-left:.6rem;
            max-width: 2.6rem;
            display: inline-block;
            vertical-align: middle;
            line-height: 1.25;
            font-size: .28rem;
            
        }
        >span:nth-child(2):after{
            position: relative;
            top:-.2rem;
            left:.6rem;
        }
        

    }
    .detailImg{
        width:100%;
        height: 100%;
        z-index:1000;
        position: absolute;
        overflow: hidden;
        background: white;
        .img-list{
            width:100%;
            display: flex;
            flex-wrap: wrap;
            position: relative;
            li{
                width: 32%;
                height: 2.46rem;
                flex-shrink: 0;
                margin-right: .06rem;
                margin-bottom: .06rem;
                img{
                    width:100%;
                    height: 100%;
                }
            }
        }
        .bottom{
            position: absolute;
            font-size:.34rem;
            bottom:-.6rem;
            left:50%;
            margin-left:-.5rem;
        }
    }
    .img-swiper{
        width:100%;
        height: 100%;
        background: black;
        position: absolute;
        z-index:1000;
        .swiper-all{
            width:100%;
            height: 100%;
            position: relative;
            .swiper-container,.swiper-wrapper,.swiper-slide{
                width:100%;
                height: 11.5rem;
                img{
                    width:100%;
                    height: auto;
                }
            }
            .swiper-container{
                position: relative;
                top:2rem;
                left:0;
            }
            .swiper-pagination{
                width: 100%;
                height: 1rem;
                position: absolute;
                bottom: 86px;
                left: 0;
                color:white;
                font-size: .3rem;
            }
        }
    }
    .button{
        position: absolute;
        font-size: .28rem;
        padding: .1rem .15rem;
        right: .1rem;
        bottom: .1rem;
        background-color: #3aacff;
        border: none;
        position: absolute;
        color: #fff;
        z-index: 99;
        outline: none;
        -webkit-appearance: none;
    }
</style>