const sendRequest = (url,method="GET",body={})=>{
    if(/\?/.test(url)){
        url += '&_='+(+new Date())
    }else{
        url += '?_='+(+new Date())
    }
    let parmas = {method};
    if(parmas=='POST'){
        parmas.body = JSON.stringify(body)
    }
    return fetch(url,parmas).then(res=>res.json())
}

//首页
export let CarJson = ()=>{
    return sendRequest('https://baojia.chelun.com/v2-car-getMasterBrandList.html')
}

//车系列表
export let Carlist = (id)=>{
    return sendRequest(`https://baojia.chelun.com/v2-car-getMakeListByMasterBrandId.html?MasterID=${id}`)
}

//详情页数据
export let detail = (id)=>{
    return sendRequest(`https://baojia.chelun.com/v2-car-getInfoAndListById.html?SerialID=${id}`)
}

//图片页数据
export let imgJson = (id)=>{
    return sendRequest(`https://baojia.chelun.com/v2-car-getImageList.html?SerialID=${id}`)
}

//颜色数据
export let Color = (id)=>{
    return sendRequest(`https://baojia.chelun.com/v2-car-getModelImageYearColor.html?SerialID=${id}`)
}

export let CarYearImg = (id,colorId)=>{
    return sendRequest(`https://baojia.chelun.com/v2-car-getImageList.html?SerialID=${id}&CarID=${colorId}`)
}


//照片详情
export let ImgDetail = (id,imgId,page,pageSize)=>{
    return sendRequest(`https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=${id}&ImageID=${imgId}&Page=${page}&PageSize=${pageSize}`)
}


//quotation  用户登录页
export let Quotation = (carId,cityId)=>{
    return sendRequest(`https://baojia.chelun.com/v2-dealer-alllist.html?carId=${carId}&cityId=${cityId}`)
}

//city  城市列表页
export let city = ()=>{
    return sendRequest(`https://baojia.chelun.com/v1-city-alllist.html?_1536579702878`)
}

//具体那个城市
export let cityDetail = (id)=>{
    return sendRequest(`https://baojia.chelun.com/v1-city-alllist.html?provinceid=${id}&_1536582262108`)
}


//具体哪个城市的车
export let DetailCarList = (carId,cityId)=>{
    return sendRequest(`https://baojia.chelun.com/v2-dealer-alllist.html?carId=${carId}&cityId=${cityId}&_1536584203857`)
}

//详细照片
export let imgDetail = (carId,id,page)=>{
    return sendRequest(` https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=${carId}&ImageID=${id}&Page=${page}&PageSize=30&`)
}