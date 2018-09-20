<template>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path:'/'}">返回登录</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/layout/bookSoltList'}">书籍管理</el-breadcrumb-item>
          <el-breadcrumb-item>添加图书</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <h2>添加分类</h2>
      <el-form class="input">
      <el-form-item label="添加书籍封面" label-width="100px" >
        <uploadImg v-model="formData.icon" style="float:left"></uploadImg>
      </el-form-item>
        <el-form-item label="添加书籍数组">
          <el-input v-model=" formData.books" placeholder="请输入书籍名类"></el-input>
        </el-form-item>
        <el-form-item label="添加书籍类名">
          <el-input v-model=" formData.title" placeholder="请输入分类名"></el-input>
        </el-form-item>
        <el-button @click="submit">
          提交分类
        </el-button>
      </el-form>
    </div>
</template>
<script>
  import axios from 'axios'
  import uploadImg from '../../../components/upload-com'
    export default {
        name: "index",
       components:{
        uploadImg
      },
      data(){
          return{
           formData:{
             icon:'',
             title:'',
             // books:[]
           },

          }
      },
      methods:{
         submit(){
           this.$axios.post('/category',this.formData).then(res=>{
             console.log(res)
             if(res.code===200){
               this.$message.success(res.msg)
               this.$router.push('/layout/bookSoltList')
             }else{
               this.$message.error(res.message)
             }
           })
         }
      }
    }
</script>

<style scoped lang="scss">
  .input{
    width: 500px;
  }
</style>
