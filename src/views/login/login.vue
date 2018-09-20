<template>
  <div id="login">
<div class="container">
  <h1 class="title">欢迎来到后台管理系统</h1>
  <div class="login-box">
  <h2 class="login-box-title">请登录</h2>
  <el-form class="form">
    <el-form-item label="用户名">
      <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formData.password" placeholder="请输入密码" type="password"></el-input>
    </el-form-item>
    <el-button  @click="handleLogin" type="primary" class="login-btn" :loading="isLoading">
    登录
   </el-button>
  </el-form>

  </div>
</div>
  </div>
</template>
<script>
    export default {
        name: "login",
        data(){
          return{
            formData:{
              username:'',
              password:''
            },
            isLoading:false
          }},
            methods:{
               handleLogin(){
                 this.isLoading=true
                 this.$axios.post('/login',this.formData).then(res=>{
                 console.log(res)
               if(res.code==200){
                 this.$store.commit('CHANGE_USERTNFO',res.data)
                 this.$message.success('登录成功')
                 setTimeout(()=>{
                   this.$router.push('/layout/index')
                 },1000)


               }else{
                  this.$message.error(res.message)
               }
               this.isLoading=false
             }).catch(err=>{
               this.isLoading=false
             })
               }},
             created(){
          let h1=this.$refs.title
             }
    }
</script>

<style scoped lang="scss">
.container {
  margin-top:0;
  min-height: 100vh;
  background: #545;
  padding: 10px;
  .title {
    margin-top: 90px;
    text-align: center;
    color: #fff;
    font-weight: 400;
  }
  .login-box {
    width: 400px;
    height: 300px;
    border: 1px solid red;
    padding: 40px;
    border-radius: 8px;
    margin: 20px auto 0;
    background: #e9e9e9;
    .login-box-title{
      text-align: center;
      font-weight: 400;
      color: #333;
    }
    .form{
      margin-top:20px ;
    }
    .login-btn{
      width: 100%;
      box-sizing:border-box;
    }
  }
}

</style>
