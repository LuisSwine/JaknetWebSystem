import express from 'express'

import { isAuthenticated } from '../controllers/authController.js'
import { getClientes, getCliente, getServicios, createClient, getTiposCliente, updateTipo, updateServicio, updateNombre, deleteCliente, deleteUbicacionCliente, deleteProyectoCliente } from '../controllers/clientController.js';
import { getUbicaciones } from '../controllers/ubicacionesController.js';
import { getContactos } from '../controllers/contactsController.js';
import { getProyectos } from '../controllers/proyectosController.js';

const router = express.Router()

router.get('/gestionar', isAuthenticated, getClientes, (req, res)=>{
    res.render('Clientes/clientsAdmin', {user: req.user, clientes: req.clientes})
});
router.get('/agregar', isAuthenticated, getServicios, (req, res)=>{
    res.render('Clientes/formCreateClient', {user: req.user, servicios: req.servicios})
});
router.get('/administrar', isAuthenticated, getCliente, getUbicaciones, getContactos, getProyectos, getTiposCliente, getServicios, (req, res)=>{
    res.render('Clientes/perfilCliente', {user: req.user, cliente: req.cliente, ubicaciones: req.ubicaciones, contactos: req.contactos, proyectos: req.proyectos, tiposCliente: req.tipos, tiposServicios: req.servicios})
});
router.get('/editar_tipo', updateTipo)
router.get('/editar_servicio', updateServicio)
router.get('/cambiar_nombre', updateNombre)
router.get('/eliminar', deleteCliente)
router.get('/eliminar_ubicacion', deleteUbicacionCliente)
router.get('/eliminar_proyecto', deleteProyectoCliente)
router.post('/agregar', createClient);

export default router