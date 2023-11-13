import express from 'express'

import { isAuthenticated } from '../controllers/authController.js'
import { getClientes } from '../controllers/clientController.js'
import { getUbicaciones, getUbicacion, createUbicacion, updateNameUbicacion, updateDireccionUbicacion } from '../controllers/ubicacionesController.js'
import { getAreas } from '../controllers/areasController.js'
import { getContactosUbicacion } from '../controllers/contactsController.js'
import { getProyectos } from '../controllers/proyectosController.js'

const router = express.Router()

router.get('/nueva_ubicacion', isAuthenticated, getClientes, (req, res)=>{
    res.render('Ubicaciones/formCreateUbi', {user: req.user, clientes: req.clientes, clienteSelected: req.query.cliente, flag: req.query.flag})
})
router.get('/perfil', isAuthenticated, getUbicacion, getAreas, getContactosUbicacion, getProyectos, (req, res)=>{
    res.render('Ubicaciones/perfilUbi', {user: req.user, ubicacion: req.ubicacion, areas: req.areas, contactos: req.contactos, proyectos: req.proyectos, clienteSelected: req.query.cliente, flag: req.query.flag})
})


router.post('/nueva_ubicacion', createUbicacion)
router.get('/cambiar_nombre', updateNameUbicacion)
router.get('/cambiar_direccion', updateDireccionUbicacion)




router.get('/administrar', isAuthenticated, getUbicaciones, (req, res)=>{
    res.render('Ubicaciones/ubicacionesAdmin', {user: req.user, ubicaciones: req.ubicaciones, isCliente: false})
})


export default router

/* 





//EDITAR

module.exports = router */