const { Router } = require('express');
const {getAllProducts, getProductById, getProductByName, createProducts} =require("../controllers/Product.controller");


const router = Router();

/* ----------------------------------- */
/* Products                         */
/* ----------------------------------- */

router.route('/product').get(getAllProducts).post(createProducts).get(getProductByName)
router.route('/product/:id').get(getProductById)



module.exports = router;