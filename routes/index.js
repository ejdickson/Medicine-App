const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const medicineController = require('../controllers/medicineController')

router.get('/', userController.index)
router.post('/', userController.create)
router.get('/:id', userController.show)
router.put('/:id', userController.update)
router.delete('/:id', userController.delete)

// router.get('/:id/medicines', medicineController.index)
// router.post('/:id/medicines', medicineController.create)
// router.get('/:id/medicines/:id', medicineController.show)
// router.put('/:id/medicines/:id', medicineController.update)
// router.delete('/:id/medicines/:id', medicineController.delete)

module.exports = router