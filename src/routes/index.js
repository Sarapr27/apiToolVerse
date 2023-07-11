const { Router } = require('express');
const routerProduct=require('./routerProduct')
const routerUser=require('./routerUser')
const routerShippingAddress=require('./routerShippingAddress')
const routerCategory=require('./routerCategory')

const router = Router();

router.use(routerProduct)
router.use(routerUser)
router.use(routerShippingAddress)
router.use(routerCategory)

module.exports = router;
