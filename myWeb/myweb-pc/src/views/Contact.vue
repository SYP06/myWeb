<template>
  <div>
    <!-- Start Contact -->
    <section class="section line-vector" id="contact">
      <div class="section_title mb-4 text-center">
        <h2><span>Contact</span></h2>
      </div>
      <div class="row align-items-center">
        <div class="col-md-6 order-2 order-md-1">
          <div class="p-4 contact-box rounded form-box">
            <h4 class="m-0">Get In Touch !</h4>
            <div class="custom-form">
              <div id="message"></div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group position-relative">
                    <p>
                      Your Name
                      <span class="text-danger">*</span>
                    </p>
                    <i class="mdi mdi-account ml-3 icons"></i>
                    <input
                      name="name"
                      type="text"
                      v-model="name"
                      class="form-control pl-5"
                      placeholder="First Name :"
                      required
                    />
                  </div>
                </div>
                <!--end col-->
                <div class="col-md-6">
                  <div class="form-group position-relative">
                    <p>
                      Your Email
                      <span class="text-danger">*</span>
                    </p>
                    <i class="mdi mdi-email ml-3 icons"></i>
                    <input
                      v-model="email"
                      name="email"
                      class="form-control pl-5"
                      placeholder="Your email :"
                      required
                    />
                  </div>
                </div>
                <!--end col-->
                <div class="col-md-12">
                  <div class="form-group position-relative">
                    <p>Subject</p>
                    <i class="mdi mdi-book ml-3 icons"></i>
                    <input
                      v-model="subject"
                      name="subject"
                      id="subject"
                      type="text"
                      class="form-control pl-5"
                      placeholder="Subject"
                    />
                  </div>
                </div>
                <!--end col-->
                <div class="col-md-12">
                  <div class="form-group position-relative">
                    <p>Suggestions</p>
                    <i class="mdi mdi-comment-text-outline ml-3 icons"></i>
                    <textarea
                      v-model="comments"
                      name="comments"
                      id="comments"
                      rows="4"
                      class="form-control pl-5"
                      placeholder="Your Message :"
                    ></textarea>
                  </div>
                </div>
              </div>
              <!--end row-->
              <div class="row">
                <div class="col-sm-12 text-center">
                  <button
                    @click="sendContact"
                    class="btn btn-hover send-btn btn-block"
                  >
                    send Message
                  </button>
                  <div id="simple-msg"></div>
                </div>
              </div>
              <el-button type="text" @click="open"></el-button>
            </div>
          </div>
        </div>
        <div class="col-md-6 order-1 order-md-2">
          <div class="contact-img">
            <img
              src="../assets/images/contact/contact-vector.png"
              class="img-fluid"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      subject: "",
      comments: "",
    };
  },
  methods: {
    sendContact() {
      this.$http
        .post("/contact/send", {
          name: this.name,
          email: this.email,
          subject: this.subject,
          comments: this.comments,
        })
        .then((res) => {
          console.log(res);
          this.open();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    open() {
      this.$alert("感谢您提出的宝贵建议，谢谢", "提交成功", {
        confirmButtonText: "确定",
      });
    },
  },
};
</script>
<style scoped>
section {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100%) !important;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding-left: 5rem;
  background-color: #f1f3f6;
}

.section_title h2::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 4.5rem;
  width: 4.5rem;
  background: url("../assets/images/title-decoration.png") no-repeat;
  background-size: 4.5rem;
  z-index: 0;
}
.section_title h2 {
  position: relative;
  margin-bottom: 2rem;
}
.col-md-6 {
  color: #212529;
}
.section_title {
  margin-top: 3.5rem;
}

.section_title h2 {
  color: #212529;
}
.section_title h2 span {
  font-size: 2.5rem;
  font-weight: 600;
}
.contact_form {
  padding: 2rem;
  background: #fff;
  border-radius: 2rem;
}
.contact-box {
  box-shadow: 0.3rem 0.3rem 0.3rem #dfdfdf, -0.3rem -0.3rem 0.3rem #fafafa;
}

.form-group .icons {
  position: absolute;
  top: 0;
  left: 0;
  line-height: 5rem;
  font-size: 1rem;
}
.form-control {
  padding: 0.3rem 1.5rem;
  font-size: 0.8rem;
  font-weight: 300;
  box-shadow: inset 0.3rem 0.3rem 0.3rem #dadada,
    inset -0.3rem -0.3rem 0.3rem #fafafa;
  border: none;
  background: #f1f3f6;
}
.form-control:focus {
  box-shadow: inset 0.3rem 0.3rem 0.3rem #dadada,
    inset -0.3rem -0.3rem 0.3rem #fafafa;
  border: none;
  background: #f1f3f6;
}
.form-group label {
  font-size: 0.8rem;
  font-weight: 400;
}

.custom-form .form-group {
  margin: 1.5rem 0 0;
}

.send-btn {
  margin-top: 2rem;
  background: #ff9e2b;
  box-shadow: inset 0.3rem 0.3rem 0.3rem #d77807,
    inset -0.3rem -0.3rem 0.3rem #ff9e2b;
}
.send-btn:hover {
  color: #fff;
}
.col-md-12 {
  margin-top: 0;
}
.align-items-center {
  margin: 3rem;
}
.notice {
  color: #212529;
}
</style>