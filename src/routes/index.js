const { Router } = require('express');
const routerProduct=require('./routerProduct')
const routerUser=require('./routerUser')
const routerShippingAddress=require('./routerShippingAddress')
const routerCategory=require('./routerCategory')
const routerPaymentMethod=require('./routerPaymentMethod')
const routerPurchaseCart=require('./routerPurchaseCart')
const routerPurchaseOrder=require('./routerPurchaseOrder')
const routerReview=require('./routerReview')

const router = Router();

router.use(routerProduct)
router.use(routerUser)
router.use(routerShippingAddress)
router.use(routerCategory)
router.use(routerPaymentMethod)
router.use(routerPurchaseCart)
router.use(routerPurchaseOrder)
router.use(routerReview)


module.exports = router;
