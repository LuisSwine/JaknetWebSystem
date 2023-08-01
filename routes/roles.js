const express = require('express')

const router = express.Router()
const { authorized } = require('../database/db')


const authController = require('../controllers/authController')
const proyectosController = require('../controllers/proyectosController')

router.get('/asignar', authController.isAuthenticated, authController.selectProyect, authController.selectUsers, authController.selectRoles, (req, res)=>{
    res.render('Proyectos/formAsignRol', {user: req.user, proyecto: req.proyecto , usuarios: req.usuarios, roles: req.roles, ubicacion: req.query.ubicacion, cliente: req.query.cliente, flag: req.query.flag, permisos: req.query.permisos})
})
router.post('/asignar', proyectosController.asignRolProyect)


router.get('/eliminar', proyectosController.deleteRol)


module.exports = router;
