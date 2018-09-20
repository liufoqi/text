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
  <h2>添加一本图书</h2>
  <el-form class="input" :model="formData">
    <el-form-item label="添加图书封面" label-width="100px">
      <el-switch
        v-model="isUpload"
        active-text="上传图片网址"
        inactive-text="本地上传图片"
        active-color="#13ce66"
        inactive-color="#ff4949"
      >
      </el-switch>
     </el-form-item >
    <el-form-item class="addimg">
      <el-input  v-model="formData.img" v-if="isUpload"  class="addimgup"></el-input>
      <uploadImg v-model="formData.img" style="float:left" v-else ></uploadImg>
    </el-form-item>

    <el-form-item label="图书作者">
      <el-input v-model=" formData.author" placeholder="请输入图书作者"></el-input>
    </el-form-item>
    <el-form-item label="看云图书链接">
    <el-input v-model=" formData.url" placeholder="请输入看云图书链接"></el-input>
  </el-form-item>
    <el-form-item>
      <el-button @click="submitBooks">提交到库</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
  import uploadImg from '../../../components/upload-com'
    export default {
      name: "addSoltBook",
      data() {
        return {
          formData: {
            url: '',
            author: '',
            img: '',
            typeId:''
          },
           isUpload:false,
            disable:false
        }
      },
      components: {
        uploadImg
      },
      methods: {
        submitBooks() {
           this.formData.typeId=this.$route.query.typeId
          this.$axios.post('/book/', this.formData).then(res => {
            console.log(res)
            if (res.code === 200) {
              this.$message.success(res.msg)
            } else {
              this.$message.error(res.msg)
            }
          })
        },
        created() {
        }

      }
    }
</script>

<style scoped lang="scss">
.input{
  width: 500px;
  margin-top: 25px;
  .addimg .addimgup{
  margin:30.5px 0;
}
}

</style>
