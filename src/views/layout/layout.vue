<template>
  <div class="layout">
    <div class="header ml-200" >
    <h1 class="title">后台管理系统</h1>
    </div>
    <div class="side-bar ">
      <el-menu
      :router="true"
      background-color="#545c64"
      text-color="#fff"
      >
        <!--<el-submenu index="1">-->
          <!--<template slot="title">-->
            <!--<i class="el-icon-location"></i>-->
            <!--<span>主要操作页</span>-->
          <!--</template>-->
          <el-submenu index="1-1">
            <template slot="title">用户管理</template>
            <el-menu-item index="/layout/users">用户列表</el-menu-item>
            <el-menu-item index="/layout/usersDetail">个人管理页</el-menu-item>
            <el-menu-item index="/layout/addUsers">添加用户</el-menu-item>
          </el-submenu>
          <el-submenu index="1-2">
            <template slot="title">书籍管理</template>
            <el-menu-item index="/layout/bookSoltList">书籍列表</el-menu-item>
            <el-menu-item index="/layout/addBookList">添加书籍分类列表</el-menu-item>
            <el-menu-item index="/layout/addBook">添加一本图书</el-menu-item>
          </el-submenu>
          <el-submenu  index="1-3">
            <template slot="title">轮播图管理</template>
            <el-menu-item index="/layout/requestSwiper">获取轮播图</el-menu-item>
              <el-menu-item index="/layout/addSwipers">添加轮播图</el-menu-item>
              <!--<el-menu-item index="/layout/"></el-menu-item>-->
          </el-submenu>
          <!--<el-submenu index="1-4">-->
            <!--<template slot="title">选项4</template>-->
            <!--<el-menu-item index="1-4-1">选项1</el-menu-item>-->
          <!--</el-submenu>-->
        <!--</el-submenu>-->
        <!--<el-menu-item index="2">-->
          <!--<i class="el-icon-menu"></i>-->
          <!--<span slot="title">导航二</span>-->
        <!--</el-menu-item>-->
        <!--<el-menu-item index="3" disabled>-->
          <!--<i class="el-icon-document"></i>-->
          <!--<span slot="title">导航三</span>-->
        <!--</el-menu-item>-->
        <!--<el-menu-item index="4">-->
          <!--<i class="el-icon-setting"></i>-->
          <!--<span slot="title">导航四</span>-->
        <!--</el-menu-item>-->
      </el-menu>

    </div>
      <div class="main-content ml-200" >
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
    export default {
        name: "layout"
    }
</script>
<style scoped lang="scss">
.layout{
  .title{
    text-align: center;
    font-weight: 400;
    line-height: 60px;
    height: 80px;
    border-bottom:1px solid #f1f1f1;
    font-size: 20px;
  }
  .ml-200{
    margin-left: 201px;
  }
  .side-bar{
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    padding-top:80px;
    width: 200px;
    border-right: 1px solid #f1f1f1;
    overflow: hidden;
    background: #545c64;
    /deep/{
    .el-menu{
      border-right: none;
    }
  }
  }

   .main-content{
     padding:15px ;
   }
}

</style>
