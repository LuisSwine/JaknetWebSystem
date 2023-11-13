import express from 'express'

import { isAuthenticated } from '../controllers/authController.js'
import { getUbicacion } from '../controllers/ubicacionesController.js'
import { assign2Ubiacion, createContacto, deleteAsignacionContacto, getContacto, getContactos, updateContacto } from '../controllers/contactsController.js'
import { getClientes } from '../controllers/clientController.js'

const router = express.Router()

router.get('/contacto_ubicacion', isAuthenticated, getUbicacion, getContactos, (req, res)=>{
    res.render('Ubicaciones/addContact', {user: req.user, ubicacion: req.ubicacion, contactos: req.contactos, clienteSelected: req.query.cliente, flag: req.query.flag})
})
router.get('/nuevo_contacto', isAuthenticated, getClientes, (req, res)=>{
    res.render('Contactos/formCreateContact', {user: req.user, clientes: req.clientes, clienteSelected: req.query.cliente, flag: req.query.flag})
})
router.get('/editar', isAuthenticated, getClientes, getContacto, (req, res)=>{
    res.render('Contactos/editContact', {user: req.user, clientes: req.clientes, contacto: req.contacto, clienteSelected: req.query.cliente, flag: req.query.flag})
})
router.post('/contacto_ubicacion', assign2Ubiacion)
router.post('/nuevo_contacto', createContacto)
router.post('/editar', updateContacto) 
router.get('/eliminar_de_ubicacion', deleteAsignacionContacto)



export default router

/* 

router.get('/administrar', authController.isAuthenticated, contactosController.selectContacts, (req, res)=>{
    res.render('Contactos/contactsAdmin', {user: req.user, contactos: req.contactos, isCliente: false})
})
router.get('/eliminar', contactosController.deleteContact)


//CONTACTOS EN UBICACION
module.exports = router */