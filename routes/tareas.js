const express = require('express')

const router = express.Router()
const { authorized } = require('../database/db')


const authController = require('../controllers/authController')
const tareasController = require('../controllers/tareasController')
const proyectosController = require('../controllers/proyectosController')

//TAREAS EN ETAPA
router.get('/etapa', authController.isAuthenticated, proyectosController.selectEtapa, tareasController.selectTareasEtapa, (req, res)=>{
    res.render('Proyectos/Tareas/tareasAdmin', {user: req.user, etapa: req.etapa, tareas: req.tareas, proyecto: req.query.proyecto, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
})
router.get('/agregar', authController.isAuthenticated, proyectosController.selectEtapa, tareasController.selectTiposTarea, (req, res)=>{
    res.render('Proyectos/Tareas/formAddTask', {user: req.user, etapa: req.etapa, tipos: req.tipos, proyecto: req.query.proyecto, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
})
router.post('/agregar', tareasController.createTarea)

//EDITAR TAREA
router.get('/editar', authController.isAuthenticated, tareasController.selectTarea, tareasController.selectTiposTarea, (req, res)=>{
    res.render('Proyectos/Tareas/editarTarea', {user: req.user, tarea: req.tarea, tipos: req.tipos, etapa: req.query.etapa, proyecto: req.query.proyecto, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
})
router.post('/editar', tareasController.editarTarea)

//VER DETALLES
router.get('/ver_detalles', tareasController.showAsignTarea)

//ASIGNACIONES
router.get('/asignar', authController.isAuthenticated, tareasController.validateTarea, tareasController.usuariosAsignados, (req, res)=>{
    res.render('Proyectos/Tareas/asignTask', {user: req.user, tarea: req.tarea, usuarios: req.usuarios, etapa: req.query.etapa, proyecto: req.query.proyecto, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
})
router.post('/asignar', tareasController.asignarTarea)
router.get('/editar_asignacion', authController.isAuthenticated, tareasController.selectAsignTask, tareasController.usuariosAsignados, (req, res)=>{
    res.render('Proyectos/Tareas/editarAsign', {user: req.user, asignacion: req.asignacion, usuarios: req.usuarios, etapa: req.query.etapa, proyecto: req.query.proyecto, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
})
router.post('/editar_asignacion', tareasController.editarAsignacion)

//ELIMINAR TAREA
router.get('/eliminar', tareasController.deleteTarea)

//PERSONAL - MIS TAREAS
router.get('/mis_tareas', authController.isAuthenticated, tareasController.selectInfoTareasUser, tareasController.obtenerReportes, (req, res)=>{
    res.render('Tareas/misTareas', {user: req.user, tareas: req.tareas, reportes: req.reportes})
})
//#7.1.1.2. ENTREGAR TAREA
router.get('/entregar', tareasController.entregarTarea)
//#7.1.1.3. SUBIR REPORTE DE LAS TAREAS QUE LO AMERITEN
router.get('/subir_reporte', tareasController.subirReporteTarea)



module.exports = router;