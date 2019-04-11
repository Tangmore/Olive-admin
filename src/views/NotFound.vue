<template>
     <div class="page404">
          <img class="mb-2" src="http://127.0.0.1:8082/systemImg/404.png" alt="">
        <el-button type="warning" @click="returnTop" class="returnTop" plain> 返回</el-button>

     </div>  
</template>
<script>
    export default{
        data(){
            return{

            }
        },
        methods:{
            returnTop(){
                this.$router.push('/');
            }
        },

    }
</script>
<style>
     .page404{
        width: 100%;
        height: 100%;
        text-align: center;
        overflow: hidden;
        position:relative;
    }
    .page404 img{
        width: 100%;
        height: 100%;
    }
    .returnTop{
        position: absolute;
        bottom: 20%;
        left: 50%;
        transform: translateX(-50%);
    }

</style>
