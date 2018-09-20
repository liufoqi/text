<template>
<div>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/'}">返回登录</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/layout/index'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>添加轮播图</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="content">
    <el-form>
      <el-form-item label="轮播图书名" >
        <el-input v-model=" formData.title"></el-input>
      </el-form-item>
      <el-form-item label="添加轮播图图片">
        <template>
          <uploadImg v-model="formData.img" style="float: left">
            <img :src="tableData.img">
          </uploadImg>
        </template>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formData.bookSolt" @change="booksChange">
          <el-option v-for="(item,index) in bookSolts"
                      :key="index"
                     :label="item.title"
                     :value="item._id"
          ></el-option>
        </el-select>
          <div class="book-item" v-if="getBookItem[0]">
            <div class="book-desc">
            <span class="title">
              书名:&nbsp;&nbsp;{{getBookItem[0].title}}
            </span><br>
            <span class="author">作者：{{getBookItem[0].author}}
            </span>
          </div>
            <div class="book-left" >
            <img :src="getBookItem[0].img"class="img-wrap">

          </div>

        </div>

      </el-form-item>
      <el-form-item>
        <template>
          <el-input-number v-model="formData.index" @change="handleChangeindex"
                           :min="1" :max="10000000" label="描述文字">

          </el-input-number>
        </template>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button  type="danger" @click="resetForm">重置</el-button>
    </el-form-item>
    </el-form>
    <el-dialog title="书籍列表" :visible.sync="isShowDialog">
      <el-table :data="books">
        <el-table-column property="title" label="书名" width="150"></el-table-column>
        <el-table-column label="书籍封面" width="200">
         <template slot-scope="scope">
           <img :src="scope.row.img "  class="img">
         </template>
        </el-table-column>
        <el-table-column property="author" label="作者"></el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope">
          <el-button  type="primary" size="small" @click="handleAdd(scope.row._id)">
            添加
          </el-button>
            </template>
        </el-table-column>

      </el-table>
    </el-dialog>

  </div>
</div>
</template>

<script>
    export default {
        name: "addSwipers",
      data(){
          return{
            formData:{
              title:'',
              img:'',
              book:'',
              index:1,
              bookSolt:''
            },
            bookSolts:[],
            books:[],
            bookcount:0,
            isShowDialog:false,
            tableData:[]
          }
      },
      methods:{
        getData(){
            this.$axios.get('/category',{pn:1,size:100}).then(res=>{
              console.log(res)
              if(res.code===200){
                this.bookSolts=res.data
              }
            })
          },
         async getbooksChange(){
          const res = await this.$axios.get(`/category/${this.formData.bookSolt}/books`)
           this.books=res.data.books
          this.bookcount=res.count
        },
        booksChange(){
          this.isShowDialog=true
          this.getbooksChange()
        },
        handleAdd(id){
          this.formData.book=id
          this.isShowDialog=false
    },
        submitForm(){
             let  isCanSubmit =true
           for(let key in this.formData){
             if(!this.formData[key]){
               isCanSubmit=false
             }
           }
           if (isCanSubmit){
             this.$axios.post('/swiper',this.formData).then(res=>{
               this.getbooksChange()
               if(res.code===200){
                 this.$message.success(res.msg)
                 this.$router.push({path:'requestSwiper'})
               }else{
                 this.$message.error(res.msg)
               }

             })
           }
        },
        getInitData(){

          this.$axios.get(`/swiper/${this.$route.query.id}`).then(
            res=>{
              console.log(res)
              this.formData={
                ...this.formData,
                ...res.data,
                book:res.data.book._id,
                bookSolt:res.data.book.type,
              }
              this.getbooksChange()

            }
          )
        },
        resetForm(){
           this.formData={title:'',
             img:'',
             book:'',
             index:1,
             bookSolt:''
             }
             this.getInitData()
        },
        handleChangeindex(value){
          console.log(value);
        },
      },
      created(){
          this.getData()
        // if(this.$route.name === 'addSwipers'){
        //   this.formData={
        //     title:'',
        //     img:'',
        //     book:'',
        //     index:1,
        //     bookSolt:''
        //   }
        // }else{
          this.getInitData()
        // }

      },
      computed:{
          getBookItem(){
            if(this.formData.book){
              return this.books.filter(item=>item._id===this.formData.book)
            }else{
              return[]
            }
          }
      }
    }
</script>

<style scoped lang="scss">
  .content{
    width: 500px;

    .book-item{
       height: 200px;
       border: 2px solid rebeccapurple;
      .book-left{
       width:180px;
        height: 200px;
    }
      .img-wrap{
        width: 160px;
        height: 200px;
      }
      .book-desc{
        margin-top: 60px;
        margin-right: 20px;
        float: right;
        width:300px ;
        text-align: left;

    }
      .author{
        margin-top:30px;
        color: #555;
      }
     }
  }

  .img{
    width: 80px;
    height: 90px;
  }


</style>
