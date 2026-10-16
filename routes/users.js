var express = require('express');
var router = express.Router();
var userController = require('../controller/user');

router.route('/')
  .post(userController.createUser)
  .get(userController.getUsers);

router.route('/:id')
  .get(userController.getUserById)
  .put(userController.updateUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
