<template>
    <div class="div">
        <input type="text" placeholder="请输入验证码" ref="messge">
        <div class="button">
            <button @click="getMessge">点击获取验证码</button>
            <div class="wai"></div>
        </div>
        <span @click="closeNumber">X</span>
    </div>
</template>
<script>
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex';
export default {
    computed:{
        num:state=>state.Quotation.num
    },
    methods:{
        ...mapMutations({
            closeNumber:'Quotation/closeNumber'
        }),
        getMessge(){
            let messge = this.$refs.messge.value
            fetch('/getCapture',{
                phone:this.num
            })
            .then(res=>res.json())
            .then(body=>{
                console.log(body)
            })
        }
    },
    mounted(){
        
    }
}
</script>
<style lang="scss" scoped>
    .div{
        width:5rem;
        height:5rem;
        background: rgba(0,0,0,0.5);
        position: absolute;
        top:40%;
        left:1.3rem;
        display: flex;
        input{
            margin-top:1.7rem;
            width: 45%;
            height: 1rem;
            margin-left:.3rem;
            text-indent: .1rem;
        }
        .button{
            width:40%;
            margin-top:1.7rem;
            margin-left:.2rem;
            button{
                width:100%;
                height: 1rem;
                background: skyblue;;
                color:white;
                border:none;
           }

        }
        span{
            position: absolute;
            right: 0;
            top:0;
            width:.5rem;
            height: .5rem;
            display: inline-block;
            background: white;
            border-radius: 50%;
            color:black;
            text-align: center;
            line-height: .5rem;
        }
    }
</style>


