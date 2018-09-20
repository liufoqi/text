<template>
    <div class="user-manage">
      <div class="breadcrumb">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/'}">返回登录</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <el-table :data="tableData">
        <el-table-column
          prop="nickname"
          label="姓名"
          width="130">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="添加时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="个性签名"
          width="400">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="用户头像"
          width="110">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" class="avatar">
          </template>
        </el-table-column>
        <el-table-column label="操作"  width="400">
          <template slot-scope="scope">
            <el-button @click="handleDetails" size="small" type="primary">查看详情</el-button>
            <el-button @click="handleDelete(scope.row._id)" size="small" type="danger" >删除</el-button>
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
</template>

<script>
    export default {
      data(){
        return{
          tableData:[],
          count:0,
          page:1
        }
      },
      methods:{
        getData(){
            this.$axios.get('/user',{pn:this.page,size:8}).then(res=>{
              console.log(res)
              if(res.code===200){
                this.count=res.count
                this.tableData=res.data
              }
            })
        },
        handleDetails(id){
          this.$router.push(`/layout/userDetails?id=${id}`)
        },
        handleDelete(id){
          this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
              this.$axios.post('/user/delete',{userIds:[id]}).then(res=>{
                this.$message.success(res.msg)
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        pageChange(page){
          console.log(page);
          this.page = page ;
          this.getData()
        }
      },
      created(){
        this.getData()
      }
    }
</script>

<style scoped lang="scss">
.user-manage{
  .avatar{
    width: 80px;
    height:80px;
  }
}
</style>
