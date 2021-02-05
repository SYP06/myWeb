<template>
  <div>
    <section class=" lineVector">
      <div class="section_title mb-4 text-center">
        <h2><span>B-l-o-g</span></h2>
      </div>
      <!-- 搜索框 -->
      <div class="search">
        <input class="search-input" type="text" placeholder="请输入内容" v-model="search"  @keyup="inpSearch">
        <button class="search-btn" @click="clear">X</button>
      </div>
      <div class="blog-box" v-if="showList.length>0" :style="img">
        <div class="blog" v-for="(item) in showList" :key="item.blog_id" @click = 'change(item)' v-bind:class="{active:item.isActive}" >
        <h5 class="blog-title">
         {{item.title}}
        </h5>
        <span class="blog-time">{{item.post_time }}</span>
        <p class="blog-skip">
          <router-link :to="{path:'/blog/detail/'+ item.blog_id}">查看详情></router-link>
        </p>
        </div> 
      </div>  
      <div class="blog-box" v-else>
        <div class="blog" v-for="(item) in blogs" :key="item.blog_id"  v-bind:class="{active:item.isActive}" >
        <h5 class="blog-title">
         {{item.title}}
        </h5>
        <span class="blog-time">{{formateDate(item.post_time)}}</span>
        <p class="blog-skip">
          <router-link :to="{path:'/blog/detail/'+ item.blog_id}">查看详情></router-link>
        </p>
      </div>  
      </div> 
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      blogs:[],
      showList:[],
      search:'',
    }
  },
  
  created() {
    this.getBlogs();
  },
  methods: {
    getBlogs(){
      this.$http('/blog/list').then(res=>{
        let { state } = res.data;
        if (state == "auth-fail") {
          alert("请求未授权");
        } else if (state == "success") {
          console.log(res);
          this.blogs = res.data.blogs;
        }
      })
    },
    inpSearch(){
       this.showList =this.blogs.filter((obj)=>{
        return obj.title.includes(this.search) 
      })
     console.log('show',this.showList);
    },
    
    clear(){
      this.search = "";
      this.inpSearch()
    },
    formateDate(datetime) {
      function addDateZero(num) {
        return (num < 10 ? "0" + num : num);
      }
      let d = new Date(datetime);
      let formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds());
      return formatdatetime;

    },

  }
}
</script>
<style scoped>
section {
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100%) !important;
    bottom: 0;
    background-color: #f1f3f6;
    padding: 0 3rem 0 11rem ;
    overflow-x: hidden;
    overflow-y: auto;
}
.section_title{
  margin: 3rem auto;
  color: #212529;

}
.section_title h2 {
    position: relative;
    margin-bottom: 2rem;
}
.section_title h2::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    height: 4.5rem;
    width: 4.5rem;
    background: url('../assets/images/title-decoration.png') no-repeat;
    background-size: 4.5rem;
    z-index: 0;
}
.blog {
  padding: 1rem;
  background: hsla(0, 0%, 80%, 0.8);
  border-radius: 0.7rem;
  text-align: left;
  margin: 1.5rem;  
}
.blog-title {
  padding: 0.5rem;
  
}
.blog-skip a:hover{
  color: black;
}

.blog-box{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* align-items: flex-start; */
}
.blog-box::after{
  content: '';
  flex: auto;
}

.search-input{
  margin: 2rem auto;
  border: 1px solid #212529;
  border-radius: 0.1rem;
  padding: 0.2rem;
  width: 25rem;
}
.search-btn{
  color: #212529;
  border:1px solid #212529;
  border-radius: 0.1rem;
  padding: 0.2rem;
}

</style>