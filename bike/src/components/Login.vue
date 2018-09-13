<template>
    <div class="login">
        <input type="text" placeholder="请输入用户名" ref="user">
        <input type="password" placeholder="请输入密码" ref="pwd">
        <button @click="logins()">登录</button>
    </div>
</template>
<script>
    export default {
        methods:{
            logins(){
                let username = this.$refs.user.value;
                let password = this.$refs.pwd.value;
                if(!username){
                    alert('用户名不能为空');
                    return null;
                }
                if(!password){
                    alert('密码不能为空');
                    return null;
                }
                if(username == 'wwt' && password == '0219'){
                    let localStorage = window.localStorage;
                    localStorage.setItem('login',true);
                    window.history.back()
                }
            }
        },
        beforeLeave(to,from,path){
            next();
        },
        beforeEnter(to,from,path){
            next();
        }
    }
</script>
<style>
    .login{
        width:100%;
        height: 100%;

    }
    input{
        width:90%;
        height: .8rem;
        border-radius: .3rem;
        margin:0 auto;
        border:1px solid #999;
        margin-left:.4rem;
        text-indent: .3rem;
    }
    button{
        width:90%;
        height: .77rem;
        background: orange;
        color:white;
        border:0;
        border-radius: .3rem;
        margin-left:.4rem;
        font-size: .34rem;
    }
</style>

