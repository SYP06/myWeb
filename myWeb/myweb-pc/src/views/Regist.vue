<template>
  <div class="container">
    <div class="regist-box">
      <h3 class="title">用户注册</h3>
      <el-form class="regist-form" :model="registForm" :rules="registRules" ref="registFormRef">
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="registForm.username"
            clearable
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="registForm.nickname"
            clearable
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="registForm.password"
            type="password"
            clearable
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="doRegist">注册</el-button>
          <el-button type="info" @click="resetRegistForm">重置</el-button>

        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      registForm: {
        username: "",
        nickname:"",
        password: "",
      },
      // 表单验证规则
      registRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    resetRegistForm(){
      this.$refs.registFormRef.resetFields()
    },
    doRegist(){
      console.log('hahah');
      this.$http.post('/user/regist',{
        username:this.registForm.username,
        nickname:this.registForm.nickname,
        password:this.registForm.password,
      }).then(res=>{
        console.log(res);
        this.$router.push('/login')
      })
    }

  },
  
};
</script>
<style lang="scss" scoped>
.container {
  background-color: #2b4b6b;
  height: 100%;
  .regist-box {
    width: 30rem;
    height: 23rem;
    background-color: #fff;
    border-radius: 0.8rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title{
      padding: 1.5rem;
      color: #000;
    }
    .regist-form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 1.5rem;
      box-sizing: border-box;
      margin-bottom: 1.5rem;
      .btn {
        margin: 0 auto;
      }
    }
  }
}
</style>