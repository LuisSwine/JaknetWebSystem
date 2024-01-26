import express from 'express'

import { isAuthenticated } from '../controllers/authController.js'
import { getEtapa } from '../controllers/etapasController.js'
import { assignTarea, createTarea, deleteTarea, deliverTarea, getTareaAsignada, getUsuariosAsignados, loadTareaReporte, obtenerReportes, rejectTarea, selectInfoTareasUsuario, selectTarea, selectTareasEtapa, selectTiposTarea, showDetailsTarea, updateAsignacion, updateTarea, validateTarea, watchReporte } from '../controllers/tareasController.js'

const router = express.Router()

router.get('/etapa', isAuthenticated, getEtapa, selectTareasEtapa, (req, res)=>{
    res.render('Proyectos/Tareas/tareasAdmin', {user: req.user, etapa: req.etapa, tareas: req.tareas, proyecto: req.query.proyecto, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
})
router.get('/agregar', isAuthenticated, getEtapa, selectTiposTarea, (req, res)=>{
    res.render('Proyectos/Tareas/formAddTask', {user: req.user, etapa: req.etapa, tipos: req.tipos, proyecto: req.query.proyecto, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
})
router.get('/editar', isAuthenticated, selectTarea, selectTiposTarea, (req, res)=>{
    res.render('Proyectos/Tareas/editarTarea', {user: req.user, tarea: req.tarea, tipos: req.tipos, etapa: req.query.etapa, proyecto: req.query.proyecto, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
})
router.get('/editar_asignacion', isAuthenticated, getTareaAsignada, getUsuariosAsignados, (req, res)=>{
    res.render('Proyectos/Tareas/editarAsign', {user: req.user, asignacion: req.asignacion, usuarios: req.usuarios, etapa: req.query.etapa, proyecto: req.query.proyecto, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
})
router.get('/asignar', isAuthenticated, validateTarea, getUsuariosAsignados, (req, res)=>{
    res.render('Proyectos/Tareas/asignTask', {user: req.user, tarea: req.tarea, usuarios: req.usuarios, etapa: req.query.etapa, proyecto: req.query.proyecto, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
})
router.get('/mis_tareas', isAuthenticated, selectInfoTareasUsuario, obtenerReportes, (req, res)=>{
    res.render('Tareas/misTareas', {user: req.user, tareas: req.tareas, reportes: req.reportes})
})
router.get('/ver_detalles', showDetailsTarea)
router.get('/eliminar', deleteTarea)
router.get('/entregar', deliverTarea)
router.get('/subir_reporte', loadTareaReporte)
router.get('/ver_reporte', watchReporte)
router.get('/devolver_tarea', rejectTarea)
router.post('/agregar', createTarea)
router.post('/editar', updateTarea)
router.post('/asignar', assignTarea)
router.post('/editar_asignacion', updateAsignacion)

export default router