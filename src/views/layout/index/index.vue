<template>
    <div class="element">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/'}">返回登录</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>欢迎来到后台管理系统</h1>
      <div>
        <span>评分</span>
        <el-rate
          v-model="value4"
          :icon-classes="['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3']"
          void-icon-class="icon-rate-face-off"
          :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
      >
        </el-rate>
        <span>评分</span>
          <el-rate
            v-model="value3"
            show-text
            show-score>
          </el-rate>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index",
      data(){
          return{
            value3:null,
            value4:null,
          }
      }
    }
</script>

<style scoped lang="scss">
.element{
  el-rate{
  }
}
</style>
