const express = require('express')

const router = express.Router()
const { authorized } = require('../database/db')


const authController = require('../controllers/authController')
const proyectosController = require('../controllers/proyectosController')


//AGREGAR ETAPA
router.get('/agregar_etapa', authController.isAuthenticated, authController.selectProyect, authController.selectAreasProyect, (req, res)=>{
    res.render('Proyectos/formAddEtapa', {user: req.user, proyecto: req.proyecto, areas: req.areas, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
})
router.post('/agregar_etapa', proyectosController.addEtapa)

//EDITAR ETAPA
router.get('/editar', authController.isAuthenticated, proyectosController.selectEtapa, authController.selectAreasProyect, (req, res)=>{
    res.render('Proyectos/editarEtapa', {user: req.user, etapa: req.etapa, areas: req.areas, proyecto: req.query.proyecto, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
})
router.post('/editar', proyectosController.editarEtapa)

//ELIMINAR ETAPA
router.get('/eliminar', proyectosController.deleteEtapa)


module.exports = router;