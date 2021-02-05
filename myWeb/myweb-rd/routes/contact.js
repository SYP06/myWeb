const router = require('koa-router')()
const controller = require('../controller/contactController')

router.prefix('/contact')


router.post('/send', controller.sendContact )




module.exports = router
