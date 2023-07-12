const {Router}=require('express')
const { getAllUsers, newUser, getUserById, getUserByName, updateUser, deleteUser } = require('../controllers/User.controller')

const router=Router()

router.route('/user').get(getAllUsers).post(newUser)
router.get('/user/name',getUserByName)

router.route('/user/:id').get(getUserById).put(updateUser).delete(deleteUser)

module.exports=router