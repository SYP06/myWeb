const router = require('koa-router')()
const controller = require('../controller/blogController')

router.prefix('/blog')


router.get('/list', controller.getBlogList )

router.get('/detail/:blogId', controller.getBlogDetail )

router.post('/comment', controller.sendComment )




module.exports = router
