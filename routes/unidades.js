const express = require('express')

const router = express.Router()
const { authorized } = require('../database/db')


const authController = require('../controllers/authController')
const unidadesController = require('../controllers/unidadesController')

router.get('/administrar', authController.isAuthenticated, unidadesController.selectUnits, (req, res)=>{
    res.render('Unidades/unidadesAdmin', {user: req.user, unidades: req.unidades})
})
router.get('/nueva_unidad', authController.isAuthenticated, (req, res)=>{
    res.render('Unidades/formCreateUnit', {user: req.user})
})
router.post('/nueva_unidad', unidadesController.createUnit)
router.get('/editar', authController.isAuthenticated, unidadesController.selectUnit, (req, res)=>{
    res.render('Unidades/editUnit', {user: req.user, unidad: req.unidad})
})
router.post('/editar', unidadesController.editUnit)
router.get('/eliminar', unidadesController.deleteUnit)

module.exports = router;