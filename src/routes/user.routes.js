/**
 * Created by sridhar on 6/12/20.
 */
const express = require('express')
const router = express.Router()
const userController =   require('../controllers/user.controller');
router.get('/', userController.findAll);
router.post('/', userController.create);
router.get('/:id', userController.findById);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
module.exports = router