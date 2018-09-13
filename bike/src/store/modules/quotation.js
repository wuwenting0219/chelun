import {city,cityDetail,DetailCarList} from '../../api/index'
let state = {
    isShow:false,
    jsons:[],
    changeYear:'2018',
    title:'2018年款典藏版 40 TFSI 进取版',
    isShowCity:false,
    cityJson:[],
    isShowDetail:false,
    cityId :1,
    detailJson:[],
    checkCity:'',
    car_id:'129491',
    CarId:'201',
    allCar:[],
    showNumbers:false,
    num:0
}

let getters = {
    years(state){
        // if(!Object.keys(state.detailJson).length){
        //     return null;
        // }
        if(!state.jsons.length){
            return null;
        }

        let arr = state.jsons.map((item,index)=>{
            return item.market_attribute.year;
        })
        let years = new Set(arr);
        return [...years]
    },
    list(state){
        // // if(!Object.keys(state.detailJson).length){
        // //     return null;
        // // }
        // if(!state.json.length){
        //     return null;
        // }
        function merge(arr){
            let types =[];
            let obj = {};
            // console.log('obj......',arr)
            arr.forEach((item,index)=>{
                let type = item.exhaust_str+'/'+item.max_power_str+'/'+item.inhale_type;
                if(types.indexOf(type) ==-1){
                    types.push(type);
                    obj[type] = [item];
                }else {
                    obj[type].push(item)
                }
            })
            return obj;
           
        }
        if(state.changeYear == '全部'){
            return merge(state.jsons)
        }else {
            return merge(state.jsons.filter(item=>{
                return item.market_attribute.year == state.changeYear;
            }))
        }
    }
}

let mutations = {
    showYear:(state,payload)=>{
        state.isShow = true;
        payload.sort((a,b)=>{
            if(b.market_attribute.year != a.market_attribute.year){
                return b.market_attribute.year - a.market_attribute.year;
            }else {
                //按照排量
                if(b.exhaust_str > a.exhaust_str){
                    return 1;
                }else if(b.exhaust_str < a.exhaust_str){
                    return -1
                }else{
                    //按照功率
                    if(b.max_power_str > a.max_power_str){
                        return 1;
                    }else if (b.max_power_str < a.max_power_str){
                        return -1;
                    }else {
                        //按照指导价格
                        if(b.market_attribute.dealer_price_min > a.market_attribute.dealer_price_min){
                            return -1;
                        }else if (b.market_attribute.dealer_price_min < a.market_attribute.dealer_price_min ){
                            return -1;
                        }
                    }
                }
            }
        })
        state.jsons = payload;
    },
    changeYears:(state,payload)=>{
        state.changeYear = payload
    },
    select:(state,payload)=>{
        state.isShow = false;
        console.log('xixixi....',payload);
        const {name,id} = payload;
        
        state.title = name;
        // window.localStorage.setItem('name',state.title)
        state.car_id = id;
        console.log(state.car_id)
    },
    showCity:(state,payload)=>{
        state.isShowCity = true
    },
    getCityJson:(state,payload)=>{
        console.log('payload....',payload);
        state.cityJson = payload
    },
    getDetailJson:(state,payload)=>{
        state.isShowDetail = true
        state.detailJson = payload;

    },
    detail:(state,payload)=>{
        payload.map((item,index)=>{
            return Number(item.vendorPrice).toFixed(2);
        })
        state.allCar = payload;
        state.isShowCity = false;
        state.isShowDetail = false;
    },
    close:(state,payload)=>{
        state.isShowDetail = false
    },
    showNumber:(state,payload)=>{
        state.num = payload;
        console.log(state.num)
        state.showNumbers = true
    },
    closeNumber:(state,payload)=>{
        state.showNumbers = false;
    }
}

let actions = {
    getCityJson:({commit},payload)=>{
        city().then(res=>{
            commit('getCityJson',res.data)
        })
    },
    showDetail:({commit},payload)=>{
        cityDetail(payload).then(res=>{
            console.log('city......',res.data);
            commit('getDetailJson',res.data)
        })
    },
    check:({commit},payload)=>{
        const {name,id} = payload
        state.checkCity = name;
        DetailCarList(state.car_id,id).then(res=>{
            commit('detail',res.data.list)
        })
    }
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}