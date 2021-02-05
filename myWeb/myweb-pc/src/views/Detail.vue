<template>
  <div>
    <section class="lineVector">
      <div class="detail-box">
        <div class="blog-title">
          <h3 class="detail-item">{{ blog.title }}</h3>
          <span class="detail-item">{{ formateDate(blog.post_time) }}</span>
        </div>
        <div class="blog-content detail-item">{{ blog.content }}</div>
      </div>
      <div class="comment-box">
        <h6 class="comments-title">评论</h6>
        <div class="comment" v-for="item in comment" :key="item.comm_id">
          <div class="comment-content">{{ item.comm_content }}</div>
          <div class="comment-info">
            <span class="userinfo">{{ item.nickname }}</span>
            <span class="post-time">{{ formateDate(item.comm_post_time) }}</span>
          </div>
        </div>
        <div class="sendComment">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="textarea"
            maxlength="200"
            show-word-limit
          >
          </el-input>
          <button class="btn" @click="sendComment">提交</button>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      blog: "",
      comment: "",
      text: '',
      textarea: '',
      blogId:'',
      nickname:'',
    };
  },
  created() {
    this.getBlogDetail();
  },
  methods: {
    getBlogDetail() {
      let loginUser = this.$store.state.loginUser;
      this.nickname =loginUser.nickname
      let blogId = this.$route.params.id;
      this.$http("/blog/detail/" + blogId).then((res) => {
        console.log("detail",res);
        if (res.data.state == "success") {
          this.blog = res.data.blogInfo;
          this.comment = res.data.blogInfo.comments;
          this.blogId = res.data.blogInfo.blog_id;
        } else {
          this.$router.push("/error");
        }
      });
    },
    sendComment() {
      // loginUser为空
      let loginUser = this.$store.state.loginUser;
      console.log(loginUser);
      if (loginUser) {
        this.$http
          .post("/blog/comment", {
            comment:this.textarea,
            blogId:this.blogId ,
            userId: loginUser.user_id,
            nickname:loginUser.nickname,
            headers: {
              Authorization: localStorage.getItem("mytoken"),
            },
          })
          .then((res) => {
            console.log("comment",res);
            let { state } = res.data;
            if (state == "success") {
              this.$router.push("/blog");
            } else {
              alert("发表评论失败!");
            }
          })
      } else {
        alert("还没有登录呢");
        this.$router.push("/login");
      }
    },
    formateDate(datetime) {
      function addDateZero(num) {
        return num < 10 ? "0" + num : num;
      }
      let d = new Date(datetime);
      let formatdatetime =
        d.getFullYear() +
        "-" +
        addDateZero(d.getMonth() + 1) +
        "-" +
        addDateZero(d.getDate()) +
        " " +
        addDateZero(d.getHours()) +
        ":" +
        addDateZero(d.getMinutes()) +
        ":" +
        addDateZero(d.getSeconds());
      return formatdatetime;
    },
  },
};
</script>
<style scoped>
.lineVector {
  background: url("../assets/images/contact/contact-bg.png");
  -webkit-animation: slide 20s linear infinite;
  -moz-animation: slide 20s linear infinite;
  animation: slide 20s linear infinite;
  height: 100%;
}
@keyframes slide {
  from {
    background-position: 0 0;
  }

  to {
    background-position: -25rem 0;
  }
}
section {
  color: #000;
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100%) !important;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 2.5rem 0 7.5rem;
}
.section_title {
  margin: 2rem auto;
}
.detail-box {
  /* background-color: rgba(127, 164, 231,0.9); */
  background-color: #fff;
  margin: 3rem auto;
  /* padding: 20px; */
  border: 0.1rem solid #ffffff;
  border-radius: 0.8rem;
  padding: 1.5rem;
  width: 60rem;
}
.detail-item {
  margin: 1rem 0;
}
.comment-box {
  color: black;
  background-color: #ffffff;
  margin: 1.5rem auto;
  border: 0.1rem solid #ffffff;
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: left;
  width: 60rem;
}
.comment {
  margin-top: 0.8rem;
  padding: 0.8rem;
  border: 0.1rem solid #f1f1f1;
  border-radius: 0.8rem;
  background-color: #f1f1f1;
  display: flex;
  justify-content: space-between;
}
.userinfo{
  margin-right: 0.2rem;
}
.sendComment{
  margin-top:1rem;
}

.el-textarea{
  margin:0.8rem auto;
}
.btn{
  font-size: 0.5rem;
  border: 0.1rem solid #f1f1f1;
}
</style>