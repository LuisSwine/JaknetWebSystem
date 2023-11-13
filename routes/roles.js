import express from 'express'

import { isAuthenticated } from '../controllers/authController.js'
import { getProyecto } from '../controllers/proyectosController.js'
import { getUsuarios } from '../controllers/usuarioController.js'
import { deleteRol, getRoles, setRolProyect } from '../controllers/rolesController.js'

const router = express.Router()

router.get('/asignar', isAuthenticated, getProyecto, getUsuarios, getRoles, (req, res)=>{
    res.render('Proyectos/formAsignRol', {user: req.user, proyecto: req.proyecto , usuarios: req.usuarios, roles: req.roles, ubicacion: req.query.ubicacion, cliente: req.query.cliente, flag: req.query.flag, permisos: req.query.permisos})
})
router.post('/asignar', setRolProyect)
router.get('/eliminar', deleteRol)



export default router