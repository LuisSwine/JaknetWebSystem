const express = require('express')

const router = express.Router()
const { authorized } = require('../database/db')


const authController = require('../controllers/authController')
const viaticosController = require('../controllers/viaticosController')

router.get('/administrar', authController.isAuthenticated, viaticosController.stadisticsViatics, viaticosController.selectDepositos, viaticosController.selectComprobaciones, (req, res)=>{
    res.render('Viaticos/viaticosAdmin', {user: req.user, datos: req.datos, depositos: req.depositos, comprobaciones: req.comprobaciones, inicio: req.query.inicio, termino: req.query.termino})
})
router.get('/asignar', authController.isAuthenticated, authController.selectUsers, authController.selectProyectos, (req, res)=>{
    res.render('Viaticos/formAsignViatics', {user: req.user, usuarios: req.usuarios, proyectos: req.proyectos})
})
router.post('/asignar', viaticosController.assignViaticos)
router.get('/eliminar_deposito', viaticosController.deleteDepositoGrl)
router.get('/eliminar_comprobante', viaticosController.deleteComprobanteGrl)



router.get('/claves', authController.isAuthenticated, authController.selectUsers, authController.selectClaves, authController.selectClave, authController.selectComprobantesClave, (req, res)=>{
    res.render('Viaticos/adminClavesGrl', {user: req.user, usuarios: req.usuarios, claves: req.claves, claveSelected: req.clave, rendido: req.rendido, comprobaciones: req.comprobaciones, isClave: req.query.clave})
})
router.get('/exportar_main', authController.isAuthenticated, viaticosController.selectDepositos, viaticosController.selectComprobaciones, (req, res)=>{
    res.render('Viaticos/exportData2', {user: req.user, depositos: req.depositos, comprobaciones: req.comprobaciones, data: req.query.data, usuario: req.query.usuario})
})
router.get('/eliminar_comprobante_clave_per', authController.deleteComprobanteClavePer)
router.get('/eliminar_comprobante_clave', authController.deleteComprobanteClaveGrl)



router.get('/admin_personal', authController.isAuthenticated, authController.selectUser, viaticosController.selectDepositosUsuario, viaticosController.selectComprobacionesUsuario, (req, res)=>{
    res.render('Viaticos/adminViaticosPersonal', {user: req.user, usuario: req.usuario, depositos: req.depositos, comprobaciones: req.comprobaciones, inicio: req.query.inicio, termino: req.query.termino})
})
router.get('/comprobar', authController.isAuthenticated, viaticosController.selectClavesUsuario, (req, res)=>{
    res.render('Viaticos/loadTicket', {user: req.user, claves: req.claves, claveSelected: req.query.clave})
})
router.post('/comprobar', viaticosController.loadTicket)
router.get('/exportar_usuario', authController.isAuthenticated, viaticosController.selectDepositosUsuario, viaticosController.selectComprobacionesUsuario, (req, res)=>{
    res.render('Viaticos/exportData', {user: req.user, depositos: req.depositos, comprobaciones: req.comprobaciones, data: req.query.data, usuario: req.query.usuario, clave: req.query.clave})
})
router.get('/eliminar_comprobante_personal', viaticosController.deleteComprobante)
router.get('/claves_personal', authController.isAuthenticated, authController.selectClaveUsuario, authController.selectClave, authController.selectComprobantesClave, (req, res)=>{
    res.render('Viaticos/seguimientoClaves', {user: req.user, claves: req.claves, claveSelected: req.clave, rendido: req.rendido, comprobaciones: req.comprobaciones, isClave: req.query.clave})
})
router.get('/exportar_claves', authController.isAuthenticated, authController.selectComprobantesClave, (req, res)=>{
    res.render('Viaticos/exportData', {user: req.user, comprobaciones: req.comprobaciones, data: req.query.data, usuario: req.query.usuario, clave: req.query.clave})
})

module.exports = router;
