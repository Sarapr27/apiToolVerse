const { Router } = require('express');
const routerProduct=require('./routerProduct')
const routerUser=require('./routerUser')

const router = Router();

router.use(routerProduct)
router.use(routerUser)

module.exports = router;
