import {imgJson,Color,detail,CarYearImg,imgDetail} from '../../api/index'
let state = {
    imgJson:[],
    isshow:false,
    colorJson:{},
    yearlist:[],
    years:'2017',
    carList:[],
    isshowCar:false,
    CarYearList:[],
    checkYear:'2018',
    title:'',
    CarYearJson:[],
    isShowCarYear:false,
    name:"",
    page:1,
    allImgJson:[],
    showAllImg:false,
    swiperFlag:false
}


let mutations = {
    getImg:(state,payload)=>{
        let img = '';
        payload.map((item,index)=>{
            item.List.map((value,key)=>{
                let imgs = value.Url.split('{')[0];
                value.Url = imgs+'3.jpg';
            })
        })
        state.imgJson = payload;
        console.log('img...',payload)
    },
    showColor:(state,payload)=>{
        state.isshow = !state.isshow;
        state.colorJson = payload;
        console.log(payload)
        let arr = []
        for(let i in payload){
            arr.push(i)
        }
        arr.sort((a,b)=>{
            return b-a;
        });
        state.yearlist = arr;
    },
    year:(state,payload)=>{
        state.years = payload;
    },
    back:(state,payload)=>{
        state.isshow = false;
    },
    showCar:(state,payload)=>{
        let arr = [];
        let another = [];
        let tit = ""
        state.carList = payload.list;
        state.isshowCar = !state.isshowCar;
        state.carList.map((item,index)=>{
            if(arr.indexOf(item.market_attribute.year) ==-1){
                arr.push(item.market_attribute.year)
            }
            if(another.indexOf(item.exhaust_str) ==-1){
                another.push(item.exhaust_str)
            }else if (another.indexOf(item.max_power_str) ==-1){
                another.push(item.max_power_str)
            }else if (another.indexOf(item.inhale_type)==-1){
                another.push(item.inhale_type)
            }
        })
        arr.sort((a,b)=>{
            return b-a;
        })
        state.CarYearList = arr;
        another[0]+='/';
        another.map((item,index)=>{
            tit+=item;
        });
        state.title = tit;
        console.log(state.carList)
    },
    CarYear:(state,payload)=>{
        console.log(payload);
        state.checkYear = payload
    },
    backPage:(state,payload)=>{
        state.isshowCar = false;
    },
    CarYearImg:(state,payload)=>{
        payload.map((item,index)=>{
            item.List.map((value,key)=>{
                let imgs = value.Url.split('{')[0];
                value.Url = imgs+'3.jpg';
            })
        })
        state.isShowCarYear = !state.isShowCarYear;
        state.CarYearJson = payload;
        console.log('detail',payload)
    },
    Allimg:(state,payload)=>{
        payload.List.map((item,index)=>{
            let imgs = item.Url.split('{')[0];
            item.Url = imgs+'3.jpg';
        })
        state.allImgJson = payload.List;
        state.showAllImg = true;
        console.log(state.allImgJson)
    },
    cunt:(state,payload)=>{
        state.page = payload;
    },
    showSwiper:(state,payload)=>{
        state.swiperFlag = true;
    },
    closeSwiper:(state,payload)=>{
        state.swiperFlag = false;
    },
    showSwipers:(state,payload)=>{
        state.swiperFlag = true;
    }
}

let actions = {
    getImg:({commit},payload)=>{
        imgJson(payload).then(res=>{
            console.log(res)
            commit('getImg',res.data)
        })
    },
    showColor:({commit},payload)=>{
        Color(payload).then(res=>{
            commit('showColor',res.data)
        })
    },
    showCar:({commit},payload)=>{
        console.log(payload);
        detail(payload).then(res=>{
            commit('showCar',res.data)
        })
    },
    CarYearImg:({commit},payload)=>{
        const {id,car_id,name} = payload;
        state.name = name;
        console.log('name...',state.name);
        CarYearImg(id,car_id).then(res=>{
            commit('CarYearImg',res.data)
        })
    },
    Allimg:({commit},payload)=>{
        const {id,carId,page} = payload;
        console.log('page.........',page);
        let arr = []
        imgDetail(id,carId,state.page).then(res=>{
            console.log('所有的图片。。。',res.data);
            commit('Allimg',res.data);
            
        })
    }
}


export default {
    namespaced:true,
    state,
    actions,
    mutations
}



