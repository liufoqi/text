<template>
    <div class="main">

      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path:'/'}">返回登录</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item  :to="{ path: '/layout/bookSoltList'}">书籍分类</el-breadcrumb-item>
          <el-breadcrumb-item  :to="{ path:'/layout/bookList',query:{type:this.tableData.type}}">
            {{this.uptitle}}&nbsp列表</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.tableData.title}}详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="content">
        <h3>{{this.tableData.title}}</h3>
        <img :src="this.tableData.img" alt="">
        <ul class="content-main" style="float: right;">
          <li class="index">书籍编号：{{this.tableData.index}}</li>
          <!--<li class="title">书名：{{this.tableData.title}}</li>-->
          <li class="author">作者：{{this.tableData.author}}</li>
          <li class="looknums">看过的人数：{{this.tableData.looknums}}</li>
          <li class="startsnums">关注：{{this.tableData.startsnums}}</li>
          <li class="status">书籍状态：{{this.state}}</li>
          <li class="updateTime">更新时间：{{this.tableData.updateTime}}</li>
        </ul>
          <p class="desc">简介:<br>{{this.tableData.desc}}</p>
          <!--<li>{{this.tableData}}</li>-->

      </div>
    </div>
</template>

<script>
    export default {
        name: "readbook",
      data(){
          return{
           tableData:[],
            img:'',
            Id:'',
            typeId:'',
            state:'',
            uptitle:''
          }
      },
      methods:{
          getData(){
            this.Id=this.$route.query.id
            this.uptitle=this.$route.query.title
            console.log(this.Id)
            this.$axios.get(`/book/${this.Id}`).then(res=>{
              console.log(res)
              if(res.code===200){
                this.tableData=res.data
                this.img= res.data.img
                this.$message({
                  message: '恭喜你，获取图书成功',
                  type: 'success'
                })
                if(res.data.status===1){
                  this.state='免费'
                }else {
                  this.state='需要付费'
                }
              }else {
                   this.$message.error({
                     message:'数据走丢了',
                   })
              }
            })
          }
      },
      created(){
        this.getData()
      }

    }
</script>

<style scoped lang="scss">
  .main{

  }
  h3{
    margin-top: 15px;
    text-align: center;
  }
 /*this.Id=this.$route.query.id*/
  .content{
    margin-left:30px;
    margin-top: 20px;
    width: 600px;
    padding-left: 200px;
  }
  ul li{
list-style: none;
    margin-top: 20px;
  }
</style>
