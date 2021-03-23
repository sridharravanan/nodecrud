/**
 * Created by sridhar on 6/12/20.
 */
const express = require('express')
const router = express.Router()
const userController =   require('../controllers/user.controller');
const authorize = require('../_middleware/authorize')

router.get('/',  authorize,userController.findAll);
router.post('/', authorize,userController.create);
router.get('/:id',authorize,userController.findById);
router.put('/:id', authorize,userController.update);
router.delete('/:id', authorize,userController.delete);
module.exports = router