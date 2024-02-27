import express from 'express'
import { isAuthenticated } from '../controllers/authController.js'
import { 
    assignViaticos, 
    deleteComprobante, 
    deleteComprobanteAdministrador, 
    deleteComprobanteClaveGrl, 
    deleteComprobanteClavePer, 
    deleteDepositoAdministrador, 
    getClave, 
    getClaves, 
    getClavesUsuario, 
    getClavesViewUsuario, 
    getComprobacionesUsuario, 
    getComprobantes, 
    getComprobantesClave, 
    getDepositos, 
    getDepositosUsuario, 
    getEstadisticasViaticos, 
    setComprobante 
} from '../controllers/viaticosController.js'
import { getUsuario, getUsuarios } from '../controllers/usuarioController.js'
import { getProyectos } from '../controllers/proyectosController.js'

const router = express.Router()


router.get('/administrar', isAuthenticated, getEstadisticasViaticos, getDepositos, getComprobantes, (req, res)=>{
    res.render('Viaticos/viaticosAdmin', {user: req.user, datos: req.datos, depositos: req.depositos, comprobaciones: req.comprobaciones, inicio: req.query.inicio, termino: req.query.termino})
})
router.get('/asignar', isAuthenticated, getUsuarios, getProyectos, (req, res)=>{
    res.render('Viaticos/formAsignViatics', {user: req.user, usuarios: req.usuarios, proyectos: req.proyectos})
})
router.get('/exportar_main', isAuthenticated, getDepositos, getComprobantes, (req, res)=>{
    res.render('Viaticos/exportData2', {user: req.user, depositos: req.depositos, comprobaciones: req.comprobaciones, data: req.query.data, usuario: req.query.usuario})
})
router.get('/claves', isAuthenticated, getUsuarios, getClaves, getClave, getComprobantesClave, (req, res)=>{
    res.render('Viaticos/adminClavesGrl', {user: req.user, usuarios: req.usuarios, claves: req.claves, claveSelected: req.clave, rendido: req.rendido, comprobaciones: req.comprobaciones, isClave: req.query.clave})
})
router.get('/admin_personal', isAuthenticated, getUsuario, getDepositosUsuario, getComprobacionesUsuario, (req, res)=>{
    res.render('Viaticos/adminViaticosPersonal', {user: req.user, usuario: req.usuario, depositos: req.depositos, comprobaciones: req.comprobaciones, inicio: req.query.inicio, termino: req.query.termino})
})
router.get('/comprobar', isAuthenticated, getClavesUsuario, (req, res)=>{
    res.render('Viaticos/loadTicket', {user: req.user, claves: req.claves, claveSelected: req.query.clave})
})
router.get('/exportar_usuario', isAuthenticated, getDepositosUsuario, getComprobacionesUsuario, (req, res)=>{
    res.render('Viaticos/exportData', {user: req.user, depositos: req.depositos, comprobaciones: req.comprobaciones, data: req.query.data, usuario: req.query.usuario, clave: req.query.clave})
})
router.get('/claves_personal', isAuthenticated, getUsuario, getClavesViewUsuario, getClave, getComprobantesClave, (req, res)=>{
    res.render('Viaticos/seguimientoClaves', {user: req.user, usuario: req.usuario, claves: req.claves, claveSelected: req.clave, rendido: req.rendido, comprobaciones: req.comprobaciones, isClave: req.query.clave})
})
router.get('/exportar_claves', isAuthenticated, getComprobantesClave, (req, res)=>{
    res.render('Viaticos/exportData', {user: req.user, comprobaciones: req.comprobaciones, data: req.query.data, usuario: req.query.usuario, clave: req.query.clave})
})
router.post('/asignar', assignViaticos)
router.post('/comprobar', setComprobante)
router.get('/eliminar_deposito', deleteDepositoAdministrador)
router.get('/eliminar_comprobante', deleteComprobanteAdministrador)
router.get('/eliminar_comprobante_personal', deleteComprobante)
router.get('/eliminar_comprobante_clave_per', deleteComprobanteClavePer)
router.get('/eliminar_comprobante_clave', deleteComprobanteClaveGrl)

export default router
