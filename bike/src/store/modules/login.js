let state = {
    isLogin:false
}

let mutations = {
    dologin(state,payload){
        console.log(payload);
        let {username,password} = payload;
        if(username == 'wwt' && password == '0219'){
            let localStorage = window.localStorage;
            // state.isLogin = !state.isLogin;
            localStorage.setItem('login',true)
        }
    }
    
}

export default {
    namespaced:true,
    state,
    mutations
}