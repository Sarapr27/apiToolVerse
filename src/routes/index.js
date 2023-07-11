const { Router } = require('express');
const routerProduct=require('./routerProduct')
const routerUser=require('./routerUser')
const routerShippingAddress=require('./routerShippingAddress')

const router = Router();

router.use(routerProduct)
router.use(routerUser)
router.use(routerShippingAddress)

module.exports = router;
