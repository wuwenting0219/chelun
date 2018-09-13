import {detail} from '../../api/index'

let state ={
    detailJson:{},
    changeYear:'全部'
}

let getters = {
    years(state){
        if(!Object.keys(state.detailJson).length){
            return null;
        }
        if(!state.detailJson.list.length){
            return null;
        }

        let arr = state.detailJson.list.map((item,index)=>{
            return item.market_attribute.year;
        })
        let years = new Set(arr);
        return ['全部',...years]
    },
    list(state){
        if(!Object.keys(state.detailJson).length){
            return null;
        }
        if(!state.detailJson.list.length){
            return null;
        }
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
            return merge(state.detailJson.list)
        }else {
            return merge(state.detailJson.list.filter(item=>{
                return item.market_attribute.year == state.changeYear;
            }))
        }
    }
}

let mutations = {
    getDetailJson:(state,payload)=>{
        payload.list.sort((a,b)=>{
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
        state.detailJson = payload;
        
        console.log(state.detailJson)
    },
    changeYear(state,payload){
        state.changeYear = payload
    }
}


let actions = {
    getDetailJson:({commit},payload)=>{
        detail(payload).then(res=>{
            commit('getDetailJson',res.data)
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
