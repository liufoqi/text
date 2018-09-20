<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/'}">返回登录</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/layout/index'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item  :to="{ path: '/layout/bookSoltList'}">书籍分类</el-breadcrumb-item>
        <!--<el-breadcrumb-item  :to="{ path:'/layout/bookList',query:{type:this.tableData.type}}">-->
        <el-breadcrumb-item>修改图书</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="contnet">
       <el-form style="margin-top: 20px">
         <el-form-item label="修改书籍序号">
           <template>
             <el-input-number v-model="formData.index" @change="handleChange" :min="1" :max="1000000"></el-input-number>
           </template>
           <!--<el-input v-model="formData.index"></el-input>-->
         </el-form-item>
         <el-form-item label="修改书名">
           <el-input v-model="formData.title"></el-input>
         </el-form-item>
         <el-form-item label="修改作者">
           <el-input v-model="formData.author"></el-input>
         </el-form-item>
         <el-form-item label="修改书籍封面">
           <template>
             <uploadImg v-model="formData.img" style="float: left" >
               <img :src="formData.img">
             </uploadImg>
           </template>
         </el-form-item>
         <el-form-item label="修改简介">
           <el-input type="textarea" v-model="formData.desc"></el-input>
         </el-form-item>
         <el-form-item label="修改所属分类">
           <template>
             <el-select v-model="formData.type">
               <el-option
                 v-for="(item,index) in category"
                 :key="index"
                 :label="item.title"
                 :value="item._id">
               </el-option>
             </el-select>
           </template>
         </el-form-item>
         <el-form-item>
           <el-button @click="handleSubmit">保存修改</el-button>
           <el-button @click="handleReset">取消保存</el-button>
         </el-form-item>
       </el-form>
    </div>
  </div>

</template>

<script>
    export default {
        name: "changeBook",
      data(){
          return{
            formData:{
                book_id:'',
                index:'',
                desc:'',
                author:'',
                img:'',
                type:'',
                title:''
            },
            category:[]
          }
      },
      methods:{
          getBook(){
            this.$axios.get(`/book/${this.$route.query.id}`).then(res=>{
              console.log(res)
              if(res.code===200){
                this.formData={
                  ...this.formData,
                  ...res.data,
                  book_id:''
                }
              }else{
                this.$message.error(res.msg)
              }
            })
          },
        handleSubmit(){
            this.formData.book_id=this.$route.query.id
            this.$axios.put('/book',this.formData).then(res=>{
              console.log(res)
              if(res.code===200){
                this.$message.success(res.msg)
              }else {
                this.$message.error(res.msg)
              }
            })
        },
           async getcategory(){
            const res = await this.$axios.get('/category')
              console.log(res)
             this.category=res.data
           },
        handleReset(){
            this.formData={
              book_id:'',
              index:'',
              desc:'',
              author:'',
              img:'',
              type:'',
              title:''
            }
            this.getcategory()
        },
        handleChange(value){
        }
      },
      created(){
          this.getBook()
          this.getcategory()
      }
    }
</script>

<style scoped lang="scss">
  .contnet{
    width: 600px;
  }
</style>
