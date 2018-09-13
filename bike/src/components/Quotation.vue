<template>
    <div class="quotation">
        
        <div class="content">
            <header>可向多个商家咨询最低价，商家及时回复</header>
            <div class="title_info">
                <dl @click="showYear(json.list)">
                    <dt><img :src="json.Picture" alt=""></dt>
                    <dd>
                        <p>{{json.AliasName}}</p>
                        <!-- <p v-if="names">{{names}}</p> -->
                        <p>{{title}}</p>
                    </dd>
                </dl>
            </div>
            <div class="self-into">
                <p>个人信息</p>
                <ul>
                    <li>
                        <span>姓名</span>
                        <input type="text" placeholder="输入你的真实中文姓名">
                    </li>
                    <li>
                        <span>手机</span>
                        <input type="text" placeholder="输入你的真实手机号码" ref="nums">
                    </li>
                    <li @click="showCity()">
                        <span>城市</span>
                        <span>{{checkCity}}</span>
                    </li>
                </ul>
                <div class="button">
                    <button @click="showNumber(15652620093)">询最低价</button>
                </div>
                <Number v-if="showNumbers"></Number>
            </div>
            <div class="dealer-info">
                <p>选择报价经销商</p>
                <ul>
                    <li v-for="(item,index) in allCar" :key="index">
                        <p>
                            <span>{{item.dealerShortName}}</span>
                            <span>{{item.vendorPrice}}万元</span>
                        </p>
                        <p>
                            <span>{{item.address}}</span>
                            <span>{{item.saleRange}}</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        
        <div class="year" :class="isShow?' active':'year'">
            <div class="c-type">
                <span v-for="(item,index) in years" :key="index" @click="changeYears(item)" :class="item==changeYear?'blue':''">{{item}}</span>
            </div>
            <div class="car-content">
                <div v-for="(item,index) in list" :key="index">
                    <p>{{index}}</p>
                    <ul>
                        <li v-for="(value,key) in item" :key="key" @click="select({name:value.market_attribute.year+'年款'+value.car_name,id:value.car_id})">
                            <p>
                                <span>{{value.market_attribute.year}}年款  {{value.car_name}}</span>
                                <span>{{value.market_attribute.dealer_price_min}}起</span>
                            </p>
                            <p>
                                <span>{{value.horse_power}}马力{{value.gear_num}}档手自一体</span>
                                <span>指导价:{{value.market_attribute.official_refer_price}}</span>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="city-content" :class="isShowCity?'actives':''">
            <div class="provice">
                <div class="location">
                    <p>自动定位</p>
                    <p>北京</p>
                </div>
                <div class="list">
                    <p>省市</p>
                    <ul>
                        <li v-for="(item,index) in cityJson" :key="index" @click="showDetail(item.CityID)">{{item.CityName}}</li>
                    </ul>
                </div>
            </div>
            <div class="detail-city" :class="isShowDetail?'city-active':''">
                <div class="left" @click="close()"></div>
                <div class="right">
                    <ul>
                        <li v-for="(item,index) in detailJson" :key="index" @click="check({name:item.CityName,id:item.CityID})">{{item.CityName}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex';
import Number from './Number.vue'
export default {
    data(){
        return{
            json:{},
            
           
        }
    },
    computed:{
        ...mapState({
            isShow :state=>state.Quotation.isShow,
            jsons:state=>state.Quotation.jsons,
            changeYear:state=>state.Quotation.changeYear,
            title:state=>state.Quotation.title,
            isShowCity:state=>state.Quotation.isShowCity,
            cityJson:state=>state.Quotation.cityJson,
            isShowDetail:state=>state.Quotation.isShowDetail,
            detailJson:state=>state.Quotation.detailJson,
            checkCity:state=>state.Quotation.checkCity,
            allCar:state=>state.Quotation.allCar,
            showNumbers:state=>state.Quotation.showNumbers
        }),
        ...mapGetters({
            years:'Quotation/years',
            list:'Quotation/list'
        })
    },
    methods:{
        ...mapMutations({
            showYear:'Quotation/showYear',
            changeYears:'Quotation/changeYears',
            select:'Quotation/select',
            showCity:'Quotation/showCity',
            close:'Quotation/close',
            showNumber:'Quotation/showNumber'
        }),
        ...mapActions({
            getCityJson:'Quotation/getCityJson',
            showDetail:'Quotation/showDetail',
            check:'Quotation/check',
        })
    },
    mounted(){
        this.json = JSON.parse(localStorage.getItem('json'));
        console.log('dijia',this.json);
        this.getCityJson();
       
    },
    components:{
        Number
    }
    
}
</script>

<style lang="scss" scoped>

    .quotation{
        width:100%;
        height: 100%;
        font-size:.3rem;
        overflow: hidden;
        position: absolute;
        top:0;
        left:0;
        z-index:1000;
    }
    header{
        width:100%;
        height: .6rem;
        line-height: .6rem;
        width: 100%;
        background: #79cd92;
        text-align: center;
        color: #fff;
        font-size: .3rem;
    }
    .content{
        width:100%;
        height: 100%;
        background: #f4f4f4;
        overflow-y: scroll;
    }
    .title_info{
        width:100%;
        background: #fff;
        padding: .32rem .18rem .24rem;
        height: 2rem;
        box-sizing: border-box;
        dl{
            width:100%;
            height: 100%;
            display: flex;
            dt{
                width: 2.3rem;
                height: 1.41rem;
                border: 1px solid #eee;
                box-sizing: border-box;
                border-radius: 5px;
                img{
                    width:100%;
                    height: auto;
                }
            }
            
            dd{
                flex:1;
                margin-left: .2rem;
                p:nth-child(1){
                    font-size: .36rem;
                    line-height: 1;
                    margin-top:.1rem;
                }
                p:nth-child(2){
                    margin-top: .26rem;
                    font-size: .32rem;
                    line-height: 1.2;
                    color: #333;
                }
                    
            }
        }
    }
    .year{
        width:100%;
        height: 100%;
        background: #f4f4f4;
        transition: all .8s;
        transform: translateY(100%);
    }
  .active{
        transform: translateY(-100%);
    }
    .c-type{
        width:100%;
        padding-left: .2rem;
        font-size: .3rem;
        line-height: .76rem;
        height: .76rem;
        background: #fff;
        border-top:.1rem solid #f4f4f4;
        span{
            padding-right: .42rem;
        }
        
    }
    .car-content{
        width:100%;
        >div{
            width:100%;
            >p{
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
                li{
                    padding:.2rem;
                    box-sizing: border-box;
                    border-bottom: 1px solid #eee;
                    p:nth-child(1){
                        span:nth-child(1){
                            width: 5rem;
                            display: inline-block;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                        }
                        span:nth-child(2){
                            float: right;
                            color: red;
                            font-size: .26rem;
                        }
                    }
                    p:nth-child(2){
                        span:nth-child(1){
                            color: #b3b3b3;
                            font-size:.24rem;
                        }
                        span:nth-child(2){
                            color: #818181;
                            float: right;
                        }
                        
                        
                    }
                }
            }
        }
    }
    .blue{
        color:skyblue;
    }
    .self-into{
        width:100%;
        position: relative;
        p{
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
            padding: 0 .2rem;
            li:nth-child(1){
                font-size: .32rem;
                height: .88rem;
                line-height: .88rem;
                border-bottom: 1px solid #eee;
                box-sizing: border-box;
                color: #000;
                input{
                    font-size: .32rem;
                    padding-right: .2rem;
                    width: 88%;
                    text-align: right;
                    box-sizing: border-box;
                    color: #555;
                    outline: none;
                    -webkit-appearance: none;
                    border: none;
                }
            }
            li:nth-child(2){
                font-size: .32rem;
                height: .88rem;
                line-height: .88rem;
                border-bottom: 1px solid #eee;
                box-sizing: border-box;
                color: #000;
                input{
                    font-size: .32rem;
                    padding-right: .2rem;
                    width: 88%;
                    text-align: right;
                    box-sizing: border-box;
                    color: #555;
                    outline: none;
                    -webkit-appearance: none;
                    border: none;
                }
            }
            li:nth-child(3){
                font-size: .32rem;
                height: .88rem;
                line-height: .88rem;
                border-bottom: 1px solid #eee;
                box-sizing: border-box;
                color: #000;
                span:nth-child(2){
                    display: inline-block;
                    width: 88%;
                    color: #555;
                    text-align: right;
                    box-sizing: border-box;
                }
                span:nth-child(2):after {
                    content: "";
                    display: inline-block;
                    padding-top: .16rem;
                    padding-right: .16rem;
                    border-top: 1px solid silver;
                    border-right: 1px solid silver;
                    -webkit-transform: rotate(45deg);
                    transform: rotate(45deg);
                }
            }
            
        }
        .button{
            background: #fff;
            text-align: center;
            padding-top: .3rem;
            padding-bottom: .28rem;
            button{
                font-size: .32rem;
                color: #fff;
                width: 80%;
                background: #3aacff;
                height: .7rem;
                border-radius: .1rem;
                outline: none;
                -webkit-appearance: none;
                border: none;
            }
        }
        
    }
    .dealer-info{
        width:100%;
        >p{
            padding: 0 .2rem;
            height: .6rem;
            line-height: .6rem;
            font-size: .24rem;
            color: #666;
            background: #eee;
        }
        ul{
            background: #fff;
            padding: 0 .18rem;
            li{
                position: relative;
                padding: .26rem 0 .26rem .54rem;
                border-bottom: 1px solid #eee;
                box-sizing: border-box;
                height: 1.65rem;
                p:nth-child(1){
                    font-size: .3rem;
                    span:nth-child(2){
                        font-size: .24rem;
                        float: right;
                        color: red;
                    }
                }
                p:nth-child(2) {
                    margin-top: .1rem;
                    font-size: .24rem;
                    color: #a2a2a2;
                    span:first-child {
                        display: inline-block;
                        max-width: 4.6rem;
                    }
                    span:nth-child(2) {
                        float: right;
                    }
                }
            }
            
            li:before {
                background: #3aacff;
                border: none;
            }
            li:before {
                content: "";
                display: inline-block;
                width: .32rem;
                height: .32rem;
                border-radius: 50%;
                border: 2px solid #ccc;
                box-sizing: border-box;
                position: absolute;
                left: .05rem;
                top: 50%;
                -webkit-transform: translate3d(0,-50%,0);
                transform: translate3d(0,-50%,0);
            }
            li:after {
                content: "";
                display: inline-block;
                padding-top: .17rem;
                padding-right: .1rem;
                border: 2px solid #fff;
                -webkit-transform: rotate(40deg) translate3d(0,-50%,0);
                transform: rotate(40deg) translate3d(0,-50%,0);
                position: absolute;
                left: .07rem;
                border-left: none;
                border-top: none;
                top: 47%;
            }
        }
    }
    .city-content{
        width:100%;
        height: 100%;
        background: white;
        transition: all .8s;
        transform: translateY(100%);
        display: flex;
    }
    .actives{
        transform: translateY(-200%);
    }
    .provice{
        width:100%;
        height: 100%;
        overflow-y: scroll;
        flex-shrink: 0;
    }
    .location{
        width:100%;
        p:first-child {
            height: .4rem;
            line-height: .4rem;
            font-size: .24rem;
            padding-left: .2rem;
            background: #f4f4f4;
        }
        p:nth-child(2) {
            padding-left: .4rem;
            font-size: .28rem;
            height: .8rem;
            line-height: .8rem;
            background: #fff;
        }
    }
    .list{
        width:100%;
        >p{
            line-height: .4rem;
            font-size: .24rem;
            padding-left: .2rem;
            background: #f4f4f4;
        }
        >ul{
            width:100%;
            li{
                padding-left: .3rem;
                font-size: .28rem;
                height: .8rem;
                border-bottom: 1px solid #eee;
                box-sizing: border-box;
                margin-left: .1rem;
                position: relative;
            }
            li:after {
                content: "";
                display: inline-block;
                padding-top: .16rem;
                padding-right: .16rem;
                border-top: 1px solid #999;
                border-right: 1px solid #999;
                -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
                position: absolute;
                right: .35rem;
                top: .3rem;
            }
        }
    }
    .detail-city{
        width:100%;
        height: 100%;
        flex-shrink: 0;
        background: rgba(0,0,0,.6);
        transition: all .8s;
        transform: translateX(100%);
        display: flex;

    }
    .city-active{
        transform: translateX(-100%);
    }
    .left{
        flex-shrink: 0;
        flex:3;
        // background: rgba(0,0,0,0.7);
    }
    .right{
        flex:7;
        background: white;
        ul{
            widows: 100%;
            height: 100%;
            overflow: scroll;
            li{
                padding-left: .3rem;
                font-size: .28rem;
                height: .8rem;
                line-height: .8rem;
                border-bottom: 1px solid #eee;
                box-sizing: border-box;
                margin-left: .1rem;
            }
        }
    }
</style>

