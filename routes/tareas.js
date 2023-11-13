import express from 'express'

import { isAuthenticated } from '../controllers/authController.js'
import { getEtapa } from '../controllers/etapasController.js'
import { assignTarea, createTarea, deleteTarea, getTareaAsignada, getUsuariosAsignados, selectTarea, selectTareasEtapa, selectTiposTarea, showDetailsTarea, updateAsignacion, updateTarea, validateTarea } from '../controllers/tareasController.js'

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
router.get('/ver_detalles', showDetailsTarea)
router.post('/agregar', createTarea)
router.post('/editar', updateTarea)
router.post('/asignar', assignTarea)
router.post('/editar_asignacion', updateAsignacion)
router.get('/eliminar', deleteTarea)

export default router




/* const express = require('express')

const { authorized } = require('../database/db')


const authController = require('../controllers/authController')
const tareasController = require('../controllers/tareasController')
const proyectosController = require('../controllers/proyectosController')

//TAREAS EN ETAPA




//EDITAR TAREA


//VER DETALLES


//ASIGNACIONES



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



module.exports = router; */