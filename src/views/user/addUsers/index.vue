<template>
<div>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/'}">返回登录</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加用户</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-form class="input">
      <h2>添加管理员</h2>
     <el-form-item label="添加用户头像" label-width="100px">
       <uploadImg v-model="formData.avatar"></uploadImg>
       <!--<img src="imgUrl" >-->
         <!--<img src="imgUrl">-->
       <!--<el-upload-->
         <!--class="avatar-uploader"-->
         <!--action="https://upload-zi.qiniup.com"-->
         <!--:show-file-list="false"-->
         <!--:on-success="handleAvatarSuccess"-->
         <!--:before-upload="beforeAvatarUpload"-->
       <!--&gt;-->
         <!--<img v-if="imageUrl" :src="imgData" v-model="formData.avatar">-->
         <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
       <!--</el-upload>-->

     </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model=" formData.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input class="password" v-model=" formData.password" placeholder="请输入密码" ></el-input>
      </el-form-item>
      <el-form-item  label="再次确认密码:">
        <el-input class="checkpassword" v-model="formData.checkpassword" placeholder="请再次输入密码" >
        </el-input>
      </el-form-item>
      <el-form-item label=" 个人昵称:">
        <el-input  class="nickname"  v-model="formData.nickname"  placeholder="请输入个人昵称" >
        </el-input>
      </el-form-item>
    <el-form-item label="个人邮箱:">
      <el-input class="password" v-model=" formData.email" placeholder="请输入邮箱" ></el-input>
    </el-form-item>
      <el-form-item  label="个性签名:">
        <el-input
          class="desc"
          type="textarea"
          :rows="2"
          placeholder="请输入个性签名"
          v-model="formData.desc">
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="submit">提交</el-button>
      </el-form-item>
   </el-form>
  <!--<div>-->
    <!--<h2>上传图片</h2>-->
    <!--<div>-->
      <!--<form action="https://upload-z1.qiniup.com" method="post" enctype="multipart/form-data">-->
        <!--<input type="file" name="file"><br>-->
        <!--<input type="text" v-model="token" name="token"><br>-->
        <!--<button>提交</button>-->
      <!--</form>-->
    <!--</div>-->
  <!--</div>-->
  <!--<div>-->
    <!--<h2>ajax上传</h2>-->
    <!--<input type="file" @change="handleChange">-->
    <!--<img :src="imgData" v-model="formData.avatar">-->
  <!--</div>-->
  </div>
  <!--<uploadCom @success="uploadImg"></uploadCom>-->
  <!--<div style="border: 1px solid #000;">-->
    <!--<img src="imgData" >-->
  <!--</div>-->
</template>
<script>
  import uploadImg from '../../../components/upload-com'
  // import axios from 'axios'
    export default {
        name: "index",
      components:{
         uploadImg
      },
        data(){
         return{
           formData:{
             username:'',
             password:'',
             nickname:'',
             desc:'',
             email:'',
             checkpassword:'',
             avatar:''
         },

           // imageUrl: '',
           // token:'',
           // imgData:''
         }
      },
      methods: {
          submit(){
            if(this.formData.password=this.formData.checkpassword){
              this.$axios.post('/user',this.formData).then(res=>{
                console.log(res)
                if(res.code==200){
                  this.$message.success(res.message)
                  this.$router.push('/')
                }

              })

            }else{
              this.$message.error(res.message)
            }

          },
        // handleAvatarSuccess(res, file) {
        //   this.imageUrl = URL.createObjectURL(file.raw);
        // },
        // beforeAvatarUpload(file) {
        //   const isJPG = file.type === 'image/jpeg';
        //   const isLt2M = file.size / 1024 / 1024 < 2;
        //
        //   if (!isJPG) {
        //     this.$message.error('上传头像图片只能是 JPG 格式!');
        //   }
        //   if (!isLt2M) {
        //     this.$message.error('上传头像图片大小不能超过 2MB!');
        //   }
        //   return isJPG && isLt2M;
        // }

    //    ,  getToken(){
    //         axios.get('http://upload.yaojunrong.com/getToken').then(res=>{
    //           console.log(res)
    //           this.token=res.data.data
    //         })
    //     },
    //     handleChange(event){
    //      console.log(event)
    //       let file=event.target.files[0]
    //       let formData=new FormData()
    //       formData.append('file',file,file.name)
    //       formData.append('token',this.token)
    //       axios.post('https://upload-z1.qiniup.com',formData,{
    //         headers:{
    //           'Content-Type':'multpart/form-data',
    //           // 'Content-Type':'application/x-www-form-urlencoded',
    //           // 'Content-Type':'application/json'
    //         }
    //
    //       }).then(res=>{
    //         this.imgData=res.data.url
    //       })
    //     },uploadImg(url){
    //      this.imgData=url
    //     }
    //   },created(){
    //       this.getToken()
      }
    //
    }
</script>

<style scoped lang="scss">
  /*h2{*/
    /*margin-top:20px;*/
  /*}*/
  /*.input{*/
    /*width: 600px;*/
  /*}*/
  /*.avatar-uploader .el-upload {*/
    /*border: 1px dashed #d9d9d9;*/
    /*border-radius: 6px;*/
    /*cursor: pointer;*/
    /*position: relative;*/
    /*overflow: hidden;*/
  /*}*/
  /*.avatar-uploader .el-upload:hover {*/
    /*border-color: #409EFF;*/
  /*}*/
  /*.avatar-uploader-icon {*/
    /*font-size: 28px;*/
    /*color: #8c939d;*/
    /*width: 178px;*/
    /*height: 178px;*/
    /*line-height: 178px;*/
    /*text-align: center;*/
  /*}*/
  /*.avatar {*/
    /*width: 178px;*/
    /*height: 178px;*/
    /*display: block;*/
  /*}*/
</style>
