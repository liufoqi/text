<template>
    <div>
      <h2>修改分类</h2>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/'}">返回登录</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/layout/bookSoltList'}">书籍管理</el-breadcrumb-item>
        <el-breadcrumb-item>书籍分类列表</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="input">
        <el-form>
          <el-form-item label="添加新的分类头像">
            <uploadImg v-model="formData.icon" style="float:left"></uploadImg>
          </el-form-item>
          <el-form-item label="新的分类名">
            <el-input placeholder="请输入新的分类名" v-model="formData.title">
            </el-input>
          </el-form-item>
          <el-form-item label="分类排序号" >
            <el-input placeholder="请输入排序号,数值越大越靠前"  v-model="formData.index"></el-input>
          </el-form-item >
          <el-form-item>
            <el-button @click="handleChange">确认修改</el-button>
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
               title:'',
               icon:'',
               index:''
            }
          }
       },
      methods:{
        getcategory(){
          this.$axios.get(`/category/${this.$route.query.typeId}`).then(res=>{
            console.log(res)
            if(res.code===200){
              this.formData=res.data
            }
          })
        },
         handleChange(){
          const id =this.$route.query.typeId
           this.$axios.put(`/category/${id}`,this.formData).then(res=>{
             console.log(res)
             if(res.code==200){
               this.$message.success(res.msg)
               this.$router.push('/layout/bookSoltlist')
             }else{
               this.$message.error(res.msg)
             }
           })
        }
      },
      created(){
          this.getcategory()
      }
    }
</script>

<style scoped>
.input{
  margin-top: 20px;
}
</style>
<!--title	[string]	是	分类标题-->
<!--icon	[string]	是	分类头图-->
<!--index-->
