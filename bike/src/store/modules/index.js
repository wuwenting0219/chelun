import {CarJson,Carlist} from '../../api/index'

let state = {
    jsonList:{},
    LetterList:[],
    show:false,
    showLetterIndex:0,
    anotherShow :false,
    CarId:9,
    carList:[],
    brandId:9
   
}


let mutations = {
    getJson:(state,payload)=>{
        let letters = [];
        let jsons = {};
        payload.map((item,index)=>{
            let spell = item.Spelling.slice(0,1);
            if(letters.indexOf(spell) !=-1){
                jsons[spell].push(item)
            }else{
                letters.push(spell);
                jsons[spell] = [item]
            }
        })
        state.jsonList = jsons;
        state.LetterList = letters;
    },
    changeStart:(state,payload)=>{
        console.log(state.show)
        state.show = true;
    },
    changeEnd:(state,payload)=>{
        state.show = false;
    },
    showLetter:(state,payload)=>{
        state.showLetterIndex = payload;
    },
    another:(state,payload)=>{
        state.anotherShow = true;
    },
    anotherNone:(state,payload)=>{
        console.log(111)
        state.anotherShow = false;
    },
    CarList:(state,payload)=>{
        state.anotherShow = true;
        state.carList = payload.data
    },
    showlist:(state,payload)=>{
        state.anotherShow = true
    }
}

let actions = {
    getJson:({commit},payload)=>{
        CarJson().then(res=>{
            if(res.code==1){
                commit('getJson',res.data);
            }else{
                alert(res.msg)
            }
        })
    },
    getCarJson:(context,payload)=>{
        console.log('che',payload,'brand ',state.brandId);
        // state.brandId = payload
        // if(payload ==state.brandId){
            
            Carlist(payload).then(body=>{
                context.commit('CarList',body)
            })

        // }
        
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}