const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const medicineController = require('../controllers/medicineController')

router.get('/', userController.index)
router.post('/', userController.create)
router.get('/:userId', userController.show)
router.put('/:userId', userController.update)
router.delete('/:userId', userController.delete)

router.get('/:userId/medicines', medicineController.index)
router.post('/:userId/medicines', medicineController.create)
router.get('/:userId/medicines/:medicineId', medicineController.show)
router.put('/:userId/medicines/:medicineId', medicineController.update)
router.delete('/:userId/medicines/:medicineId', medicineController.delete)

module.exports = router