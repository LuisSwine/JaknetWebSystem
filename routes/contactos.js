const express = require('express')

const router = express.Router()
const { authorized } = require('../database/db')


const authController = require('../controllers/authController')
const clientController = require('../controllers/clientController')
const ubicacionesController = require('../controllers/ubicacionesController')
const contactosController = require('../controllers/contactsController')
const cotizacionesController = require('../controllers/cotizacionesController')
const areasController = require('../controllers/areasController')

router.get('/administrar', authController.isAuthenticated, contactosController.selectContacts, (req, res)=>{
    res.render('Contactos/contactsAdmin', {user: req.user, contactos: req.contactos, isCliente: false})
})
router.get('/nuevo_contacto', authController.isAuthenticated, clientController.selectClients, (req, res)=>{
    res.render('Contactos/formCreateContact', {user: req.user, clientes: req.clientes, clienteSelected: req.query.cliente, flag: req.query.flag})
})
router.post('/nuevo_contacto', contactosController.createContact)
router.get('/editar', authController.isAuthenticated, clientController.selectClients, contactosController.selectContact, (req, res)=>{
    res.render('Contactos/editContact', {user: req.user, clientes: req.clientes, contacto: req.contacto, clienteSelected: req.query.cliente, flag: req.query.flag})
})
router.post('/editar', contactosController.editContact) 
router.get('/eliminar', contactosController.deleteContact)


//CONTACTOS EN UBICACION
router.get('/contacto_ubicacion', authController.isAuthenticated, ubicacionesController.selectUbicacion, contactosController.selectContacts, (req, res)=>{
    res.render('Ubicaciones/addContact', {user: req.user, ubicacion: req.ubicacion, contactos: req.contactosCliente, clienteSelected: req.query.cliente, flag: req.query.flag})
})
router.post('/contacto_ubicacion', contactosController.relacionarConUbi)
router.get('/eliminar_de_ubicacion', contactosController.eliminarRelacion)
module.exports = router