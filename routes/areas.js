const express = require('express')

const router = express.Router()
const { authorized } = require('../database/db')


const authController = require('../controllers/authController')
const ubicacionesController = require('../controllers/ubicacionesController')
const areasController = require('../controllers/areasController')


router.get('/nueva_area', authController.isAuthenticated, ubicacionesController.selectUbicacion, (req, res)=>{
    res.render('Areas/formCreateArea', {user: req.user, ubicacion: req.ubicacion, clienteSelected: req.query.cliente, flag: req.query.flag})
})
router.post('/nueva_area', areasController.createArea)
router.get('/editar', authController.isAuthenticated, areasController.selectArea, (req, res)=>{
    res.render('Areas/editArea', {user: req.user, area: req.area, ubicacion: req.query.ubicacion, clienteSelected: req.query.cliente, flag: req.query.flag})
})
router.post('/editar', areasController.editArea)
router.get('/eliminar', areasController.deleteArea)

module.exports = router;