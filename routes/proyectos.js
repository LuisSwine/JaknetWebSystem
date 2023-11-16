import express from 'express'

import { isAuthenticated } from '../controllers/authController.js'
import { getCliente } from '../controllers/clientController.js'
import { getUbicaciones } from '../controllers/ubicacionesController.js'
import { createProyecto, getComprobacionesProyecto, getDatosViaticosProyecto, getDepositosProyecto, getInventarioProyecto, getMisProyectos, getProyecto, getRolesProyecto, updateDocumentacionProyecto, updateGaleriaProyecto, updateNombreProyecto } from '../controllers/proyectosController.js'
import { getEtapasProyecto } from '../controllers/etapasController.js'
import { getContactosProyecto } from '../controllers/contactsController.js'
import { getFacturasProyecto } from '../controllers/facturasController.js'
import { assignViaticosProyecto, deleteComprobanteProyecto, deleteDepositoProyecto, setPresupuestoProyecto } from '../controllers/viaticosController.js'

const router = express.Router()

router.get('/nuevo_proyecto', isAuthenticated, getCliente, getUbicaciones, (req, res)=>{
    res.render('Proyectos/formCreateProyect', {user: req.user, cliente: req.cliente, ubicaciones: req.ubicaciones, ubicacion: req.query.ubicacion, flag: req.query.flag})
})
router.get('/perfil', isAuthenticated, getProyecto, getEtapasProyecto, getRolesProyecto, getContactosProyecto, getFacturasProyecto, (req, res) =>{
    res.render('Proyectos/profileProyect', {user: req.user, proyecto: req.proyecto, etapas: req.etapas, roles: req.roles, contactos: req.contactos, facturas: req.facturas, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
})
router.get('/mis_proyectos', isAuthenticated, getMisProyectos, (req, res)=>{
    res.render('Proyectos/misProyectos', {user: req.user, proyectos: req.proyectos})
})
router.get('/viaticos', isAuthenticated, getProyecto, getDatosViaticosProyecto, getDepositosProyecto, getComprobacionesProyecto, (req, res)=>{
    res.render('Proyectos/Viaticos/viaticosAdmin', {user: req.user, proyecto: req.proyecto, datos: req.datos, depositos: req.depositos, comprobaciones: req.comprobaciones, flag: req.query.flag, ubicacion: req.query.ubicacion, cliente: req.query.cliente, permisos: req.query.permisos})
})
router.get('/asignar_viaticos', isAuthenticated, getRolesProyecto, (req, res)=>{
    res.render('Proyectos/Viaticos/assignViaticos', {user: req.user, roles: req.roles, proyecto: req.query.proyecto, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
})
router.get('/exportar_datos', isAuthenticated, getDepositosProyecto, getComprobacionesProyecto, (req, res)=>{
    res.render('Proyectos/Viaticos/exportData', {user: req.user, proyecto: req.query.proyecto, data: req.query.data, depositos: req.depositos, comprobaciones: req.comprobaciones, flag: req.query.flag, ubicacion: req.query.ubicacion, cliente: req.query.cliente, permisos: req.query.permisos})
})
router.get('/inventario', isAuthenticated, getProyecto, getInventarioProyecto, (req, res)=>{
    res.render('InventarioProyectos/proyInventario', {user: req.user, proyecto: req.proyecto, inventario: req.inventario, flag: req.query.flag, ubicacion: req.query.ubicacion, cliente: req.query.cliente, permisos: req.query.permisos})
})
router.post('/asignar_viaticos', assignViaticosProyecto)
router.post('/nuevo_proyecto', createProyecto)
router.get('/cambiar_nombre', updateNombreProyecto)
router.get('/cambiar_documentacion', updateDocumentacionProyecto)
router.get('/cambiar_galeria', updateGaleriaProyecto)
router.get('/definir_presupuesto', setPresupuestoProyecto)
router.get('/eliminar_deposito', deleteDepositoProyecto)
router.get('/eliminar_comprobante', deleteComprobanteProyecto)

export default router


/*
router.get('/administrar', authController.isAuthenticated, authController.selectProyectos, (req, res)=>{
    res.render('Proyectos/proyectosAdmin', {user: req.user, proyectos: req.proyectos, flag: req.flag})
})

//INVENTARIO
router.post('/agregar', inventarioController.addProduct2Proyecto)

router.get('/mover_inventario', authController.isAuthenticated, authController.selectProyect, authController.selectInvent, unidadesController.selectUnits, (req,res)=>{
    res.render('InventarioProyectos/formAddElements', {user: req.user, proyecto: req.proyecto, inventario: req.inventario, unidades: req.unidades, flag: req.query.flag, ubicacion: req.query.ubicacion, cliente: req.query.cliente, permisos: req.query.permisos})
})
router.get('/editar_inventario', inventarioController.modificarInventProy)
router.get('/eliminar_inventario', inventarioController.returnAll2Invent)

router.get('/eliminar_proyecto_ubicacion', proyectosController.deleteProyectoUbicacion)

module.exports = router */