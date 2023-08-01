const express = require('express')

const router = express.Router()
const { authorized } = require('../database/db')


const authController = require('../controllers/authController')
const clientController = require('../controllers/clientController')
const ubicacionesController = require('../controllers/ubicacionesController')
const contactosController = require('../controllers/contactsController')
const cotizacionesController = require('../controllers/cotizacionesController')
const proyectosController = require('../controllers/proyectosController')

router.get('/gestionar', authController.isAuthenticated, clientController.selectClients, (req, res)=>{
    res.render('Clientes/clientsAdmin', {user: req.user, clientes: req.clientes})
});
router.get('/agregar', authController.isAuthenticated, clientController.selectTipoServicios, (req, res)=>{
    res.render('Clientes/formCreateClient', {user: req.user, servicios: req.servicios})
});
router.post('/agregar', clientController.createClient);
router.get('/administrar', authController.isAuthenticated, clientController.selectClient, ubicacionesController.selectUbicaciones, contactosController.selectContacts, authController.selectProyectos, cotizacionesController.selectCotizacionesCliente, clientController.selectTipoClientes, clientController.selectTipoServicios, (req, res)=>{
    res.render('Clientes/perfilCliente', {user: req.user, cliente: req.cliente, ubicaciones: req.ubicaciones, contactos: req. contactosCliente, proyectos: req.proyectos, cotizaciones: req.cotizaciones, tiposCliente: req.tipos, tiposServicios: req.servicios})
});
router.get('/eliminar/:folio', clientController.deleteClient)
router.get('/cambiar_nombre', clientController.editarNombre)
router.get('/editar_servicio', clientController.editarServicio)
router.get('/editar_tipo', clientController.editarTipo)

//UBICACIONES
router.get('/eliminar_ubicacion', clientController.deleteUbicacionCliente)

//PROYECTOS
router.get('/eliminar_proyecto', proyectosController.deleteProyectoClient)

module.exports = router