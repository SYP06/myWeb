<template>
  <div class="container">
    <div class="login-box">
      <p class="title">登录</p>
      <el-form class="login-form" :model="loginForm" :rules="loginRules">
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="loginForm.username"
            clearable
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
            type="password"
            clearable
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="doLogin">登录</el-button>
        </el-form-item>
        <el-form-item class="btn">
          <router-link to="/regist">未注册？去注册></router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {  mapMutations } from 'vuex'
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      // 表单验证规则
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
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
    ...mapMutations(['storeLoginUser']),
    doLogin(){
      this.$http.post("/user/login",{
        username:this.loginForm.username,
        password:this.loginForm.password,

      }).then(res=>{
        console.log(res);
        let {state,token,user} = res.data;
        if(state =='success'){
          this.$store.commit('storeLoginUser', user);
          this.$store.dispatch('setToken',token);
          this.$router.push('/')
          }else{
            alert('用户名或密码不正确')
          }
      }).catch(err=>{
        console.log(err);
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.container {
  background-color: #2b4b6b;
  height: 100%;
  .login-box {
    width: 25rem;
    height: 20rem;
    background-color: #fff;
    border-radius: 0.8rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title{
      color: #212529;
      font-size: 1.5rem;
      padding: 0.5rem;
    }
    .login-form {
      position: absolute;
      bottom: 1.5rem;
      width: 100%;
      padding: 0 1.5rem;
      box-sizing: border-box;
      .btn {
        margin: 0 auto;
      }
    }
  }
}
</style>