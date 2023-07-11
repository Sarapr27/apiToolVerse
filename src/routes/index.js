const { Router } = require('express');
const routerProduct=require('./routerProduct')

const router = Router();

router.use(routerProduct)

module.exports = router;
