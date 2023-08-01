const express = require('express')

const router = express.Router()
const { authorized } = require('../database/db')

const authController = require('../controllers/authController')
const inventarioController = require('../controllers/inventarioController')
const productosController = require('../controllers/productosController')
const unidadesController = require('../controllers/unidadesController')
const usuarioController = require('../controllers/usuarioController')
const almacenesController = require('../controllers/almacenesController')

router.get('/inventario_general', authController.isAuthenticated, authController.selectInvent, (req, res)=>{
    res.render('Inventario/inventAdmin', {user: req.user, inventario: req.inventario})
})
router.get('/agregar_general', authController.isAuthenticated, productosController.selectProducts, unidadesController.selectUnits, almacenesController.getStorages, (req, res)=>{
    res.render('Inventario/formMoveInvent', {user: req.user, productos: req.productos, unidades: req.unidades, almacenes: req.almacenes})
})
router.post('/agregar_general', inventarioController.moverInventario)
router.get('/editar_general', inventarioController.editFromInvent)
router.get('/eliminar_general', inventarioController.deleteFromInvent)
router.get('/reporte_general', authController.isAuthenticated, authController.reporteGrlInvent, (req, res)=>{
    res.render('Inventario/movesInventGrl', {user: req.user, movimientos: req.movimientos})
})  


router.get('/mi_inventario', authController.isAuthenticated, authController.selectUser, productosController.selectInventarioUser, almacenesController.getStorages, (req, res)=>{
    res.render("Minventario/miInventario", {user: req.user, usuario: req.usuario, productos: req.productos, almacenes: req.almacenes, flag: req.query.flag})
})
router.get('/agregar', authController.isAuthenticated, authController.selectUser, authController.selectInvent, unidadesController.selectUnits, (req, res)=>{
    res.render('Minventario/formAddElements', {user: req.user, usuario: req.usuario, productos: req.inventario, unidades: req.unidades, flag: req.query.flag})
})
router.post('/agregar', usuarioController.addInvent2User)
router.get('/reporte_personal', authController.isAuthenticated, authController.selectUser, productosController.reportePersonalInvent, (req, res)=>{
    res.render('Minventario/movesInventPer', {user: req.user, usuario: req.usuario, movimientos: req.movimientos, flag: req.query.flag})
})
router.get('/editar_personal', inventarioController.modificarInventarioPersonal)
router.get('/eliminar_personal', inventarioController.returnAll2InventPersonal)

module.exports = router;