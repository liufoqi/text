<template>
    <div>
      <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/'}">返回登录</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/layout/index'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>获取轮播图</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
      <h3>获取轮播图</h3>
      <div>
        <el-table
          :data="tableData">
          <el-table-column
            prop="index"
            label="序号"
            style="text-align: center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="img"
            label="封面"
            width="110">
            <template slot-scope="scope">
              <img :src="scope.row.img">
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="书名"
            style="text-align: center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="book.author"
            label="作者"
            width="150"
          >
          </el-table-column>

          <el-table-column
            prop="book.title"
            label="分类名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="img"
            label="分类封面"
            width="150">
            <template slot-scope="scope">
              <img :src="scope.row.book.img">
            </template>
          </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
              <el-button @click="handleChange(scope.row._id)" type="primary" >编辑</el-button>
              <el-button @click="handleDelete(scope.row._id)" type="danger">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="pageChange"
          :total="this.count">
        </el-pagination>
      </div>
    </div>
</template>
<script>
    export default {
        name: "requestSwiper",
      data(){
         return{
           tableData:[],
           count:0,
           page:1,
         }
      },
      methods:{
          getData(){
            this.$axios.get('/swiper',{pn:this.page,size:this.count}).then(res=>{
              console.log(res)
              this.tableData=res.data
              this.count=res.count
              console.log(this.tableData)
            })
          },
           pageChange(page) {
           console.log(page);
           this.page = page;
           this.getData()
        },
        handleChange(id){
           this.$router.push({name:'addSwipers',query:{id}})
        },
        handleDelete(id){
          this.$confirm('此操作将永久删除该轮播图, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.$axios.post('/swiper/delete',{ids:[id]}).then(res=>{
              if (res.code===200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.getData()
              }else{
                this.$message({
                  type: 'error',
                  message: '删除失败，请检查网络!'
                })
              }


            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      created(){
          this.getData()
      }
    }
</script>

<style scoped lang="scss">
 img{
  width: 90px;
  height: 90px;
}
</style>
