<template>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path:'/'}">返回登录</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item  :to="{ path: '/layout/bookSoltList'}">书籍分类列表</el-breadcrumb-item>
          <el-breadcrumb-item  :to="{ path:'/layout/bookList'}"> {{this.title}}&nbsp详情列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="user-manage" >
        <el-table :data="tableData"  >
          <el-table-column
          prop="icon"
          label="书籍封面"
          width="110">
          <template slot-scope="scope">
            <img :src="scope.row.img" class="img">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="书籍名字"
          width="200">
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者"
          width="200">
        </el-table-column>
        <el-table-column
          class="desc"
          prop="desc"
          label="书籍简介"
          width="900"
        >
        </el-table-column>
        <el-table-column label="阅读与删除"  fixed="right"  width="400">
          <template slot-scope="scope">
            <el-button @click="handleReader(scope.row._id)"  type="primary">开始阅读</el-button>
            <el-button @click="handleDelete(scope.row._id)"  type="danger" >删除</el-button>
            <el-button @click="handleChange(scope.row._id)"  type="danger" >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
        <!--<el-pagination-->
          <!--background-->
          <!--layout="prev, pager, next"-->
          <!--@current-change="pageChap03+nge"-->
          <!--:total="count">-->
        <!--</el-pagination>-->
      </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
          return{
            typeId:'',
            tableData:[],
            title:'',
            uptitle:''
          }
      },
      methods:{
        getData(){
          const typeId = this.$route.query.typeId||this.$route.query.type
          // const Id =this.$route.query.Id
          console.log(typeId)
          this.$axios.get(`/category/${typeId}/books`).then(res => {
            console.log(res);
            this.tableData=res.data.books
            this.title=res.data.title
          })
        },
        handleReader(id){
          this.$router.push(`/layout/readBook?id=${id}&&title=${this.title}`)
        },
        handleChange(id){
          this.$router.push(`/layout/changeBook?id=${id}`)
        }
      },
        created(){
          this.getData()
          // this.typeId=this.$router.data.query.id
      }
    }
</script>

<style scoped lang="scss">
  .img{
    width: 80px;
    height:80px;
  }
</style>
