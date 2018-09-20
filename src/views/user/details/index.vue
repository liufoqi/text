<template>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path:'/'}">返回登录</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户详情页</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="form-wrap">
        <h2>修改个人信息</h2>
        <el-form :model="formData" size="small" label-width="80px" label-position="left">
          <el-form-item label="用户名">
            <el-input v-model="formData.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="formData.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户头像" >
         <uploadImg  v-model="formData.avatar" style="float: left"></uploadImg>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input type="textarea" v-model="formData.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="promary" @click="handleClick">
              保存修改
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
  import uploadImg from '../../../components/upload-com'
    export default {
        name: "index",
      components:{
          uploadImg
      },
      data(){
         return{
           formData:{
              username:'',
             nickname: '',
             email:'',
             desc:'',
             avatar: ''
           },

         }

      },
      methods:{
         initData(){
           this.formData={
             ...this.$store.state.userinfo
           }
         },
        handleClick(){
           this.$axios.put('/user/userInfo',this.formData).then(res=>{
             console.log(res)
             if(res.code==200){
               let userinfo=res.data
               this.$store.commit('CHANGE_USERINFOR',userinfo)
               this.initData()
               this.$message.success(res.msg)
             }
           })
        }
        },
      created(){
        this.initData()
      }
    }
</script>

<style scoped lang="scss">
  .form-wrap{
    width: 600px;
  }
</style>
