const {Router}=require('express')
const { getAllCategory, createCategory, getCategoryByid } = require('../controllers/Category.controller')

const router=Router()

router.route('/category').get(getAllCategory).post(createCategory)

router.route('/category/:id').get(getCategoryByid)


module.exports=router