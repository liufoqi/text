<template>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path:'/'}">返回登录</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/layout/bookSoltList'}">书籍管理</el-breadcrumb-item>
          <el-breadcrumb-item>书籍分类列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="user-manage">
        <el-table :data="tableData">
          <el-table-column
            prop="index"
            label="分类编号"
            width="130">
          </el-table-column>
          <el-table-column
            prop="icon"
            label="封面"
            width="110">
            <template slot-scope="scope">
            <img :src="scope.row.icon" class="icon">
          </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="分类名字"
            width="200">
          </el-table-column>
          <el-table-column
            prop="books.length"
            label="书籍数量"
            width="150">
          </el-table-column>
          <el-table-column label="书籍操作"  width="400">
            <template slot-scope="scope">
              <el-button @click="handleDetails(scope.row._id)" size="small" type="primary">查看详情</el-button>
              <el-button @click="handleDelete(scope.row._id)" size="small" type="danger" >删除</el-button>
              <el-button @click="handleChange(scope.row._id)" size="small" type="danger" >修改分类</el-button>
              <el-button @click="handleAdd(scope.row._id)" size="small" type="primary" >添加图书</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="pageChange"
          :total="count">
        </el-pagination>
      </div>
    </div>
</template>

<script>

    export default {
        name: "index",
      data(){
         return{
           tableData:[],
           count:0,
           page:1,
           Id:'123'
         }
      },
         methods: {
           getData() {
             this.$axios.get('/category', {pn:this.page, size:this.count}).then(res => {
               console.log(res)
               if (res.code === 200) {
                 console.log(res)
                 this.tableData = res.data
                 this.count=res.count
               }
             })
           },
           handleDetails(id) {
             this.$router.push(`/layout/bookList?typeId=${id}&&Id=${this.Id}`)
           },
           // query:{typeId:`${id}`,Id:`${this.Id}`}}
           handleDelete(id) {
             console.log(id)
             this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
             }).then(() => {
               this.$axios.delete(`/category/${id}`).then(res => {
                 this.$message.success(res.msg)
               })
             }).catch(() => {
               this.$message({
                 type: 'info',
                 message: '已取消删除'
               });
             });
           },
           handleAdd(id){
             this.$router.push(`/layout/addSlotBook?typeId=${id}`)
           },
           handleChange(id){
             this.$router.push(`/layout/changeBookList?typeId=${id}`)
           },
           pageChange(page) {
             console.log(page);
             this.page = page;
             this.getData()
           },

         },
      created() {
        this.getData()
      }
    }
</script>

<style scoped lang="scss">
  .user-manage{
    .icon{
      width: 80px;
      height:80px;
    }

  }
</style>
