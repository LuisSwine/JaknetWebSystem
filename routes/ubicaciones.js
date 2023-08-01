const express = require('express')

const router = express.Router()
const { authorized } = require('../database/db')


const authController = require('../controllers/authController')
const clientController = require('../controllers/clientController')
const ubicacionesController = require('../controllers/ubicacionesController')
const contactosController = require('../controllers/contactsController')
const cotizacionesController = require('../controllers/cotizacionesController')
const areasController = require('../controllers/areasController')

router.get('/administrar', authController.isAuthenticated, ubicacionesController.selectUbicaciones, (req, res)=>{
    res.render('Ubicaciones/ubicacionesAdmin', {user: req.user, ubicaciones: req.ubicaciones, isCliente: false})
})

router.get('/nueva_ubicacion', authController.isAuthenticated, clientController.selectClients, (req, res)=>{
    res.render('Ubicaciones/formCreateUbi', {user: req.user, clientes: req.clientes, clienteSelected: req.query.cliente, flag: req.query.flag})
})
router.post('/nueva_ubicacion', ubicacionesController.createUbicacion)


router.get('/perfil', authController.isAuthenticated, ubicacionesController.selectUbicacion, areasController.selectAreas, contactosController.selectContactsUbi, authController.selectProyectos, cotizacionesController.selectCotizaciones, (req, res)=>{
    res.render('Ubicaciones/perfilUbi', {user: req.user, ubicacion: req.ubicacion, areas: req.areas, contactos: req.contactos, proyectos: req.proyectos, cotizaciones: req.cotizaciones, clienteSelected: req.query.cliente, flag: req.query.flag})
})

//EDITAR
router.get('/cambiar_nombre', ubicacionesController.editNombreUbicacion)
router.get('/cambiar_direccion', ubicacionesController.editDireccionUbicacion)

module.exports = router