const blogModel = require("../models/blogModel");

module.exports = {
  async getBlogList(ctx){
    let blogs = await blogModel.getBlogs();
    ctx.body = {
      state:'success',
      blogs
    }
  },
  async getBlogDetail(ctx){
    let { blogId } = ctx.params;
    let results = await blogModel.getBlogById(blogId);
    if(results.length>0){
      let { blog_id, title, content, post_time } = results[0];
      let blogInfo = {
        blog_id,
        title,
        content,
        post_time,
      };
      blogInfo.comments = [];
      for (let i = 0; i < results.length; i++) {
        let obj = results[i];
        blogInfo.comments.push({
          comm_id: obj.comm_id,
          comm_content: obj.comm_content,
          comm_post_time: obj.comm_post_time,
          comm_nickname: obj.comm_nickname,
          username: obj.username,
          nickname:obj.nickname
        });
      }
      console.log(blogInfo);
      ctx.body = {
        state: 'success',
        blogInfo
      }
    }else{
      ctx.body = 'error'
    }
    
  },
  async sendComment(ctx){
    let { comment, blogId, userId,nickname } = ctx.request.body;
    if (comment.trim().length == 0) {
      ctx.body = '内容不能为空!'
    } else {
      let results = await blogModel.saveComment(comment, blogId, userId,nickname);
      console.log(results);
      if (results.insertId>0) {
        ctx.body = {
          state: "success",
        };
      } else {
        ctx.body = {
          state: "fail",
        };
      }
    }
  }
  
}