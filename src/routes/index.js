const { Router } = require('express');
const routerProduct=require('./routerProduct')
const routerUser=require('./routerUser')
const routerShippingAddress=require('./routerShippingAddress')
const routerPaymentMethod=require('./routerPaymentMethod')
const routerPurchaseCart=require('./routerPurchaseCart')
const routerPurchaseOrder=require('./routerPurchaseOrder')
const routerReview=require('./routerReview')
const routerSession=require('./routerSession')

const router = Router();

router.use(routerProduct)
router.use(routerUser)
router.use(routerShippingAddress)
router.use(routerPaymentMethod)
router.use(routerPurchaseCart)
router.use(routerPurchaseOrder)
router.use(routerReview)
router.use(routerSession)


module.exports = router;
