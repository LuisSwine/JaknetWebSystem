const express = require('express')

const router = express.Router()
const { authorized } = require('../database/db')


const authController = require('../controllers/authController')
const almacenesController = require('../controllers/almacenesController')
const inventarioController =  require('../controllers/inventarioController')
const productosController = require('../controllers/productosController')
const unidadesController = require('../controllers/unidadesController')

router.get('/admin', authController.isAuthenticated, almacenesController.getStorages, (req, res)=>{
    res.render('Almacenes/almacenesAdmin', {user: req.user, almacenes: req.almacenes})
})
router.get('/nuevo_almacen', authController.isAuthenticated, (req, res)=>{
    res.render('Almacenes/formCreate', {user: req.user})
})
router.post('/nuevo_almacen', almacenesController.addStorage)

router.get('/gestionar_almacen', authController.isAuthenticated, almacenesController.getAlmacenById, inventarioController.getInventarioOn, (req, res)=>{
    res.render('Almacenes/gestionarAlmacen', {user: req.user, almacen: req.almacen, inventario: req.inventario})
})
router.get('/cambiarNombre', almacenesController.changeName);
router.get('/cambiarUbicacion', almacenesController.changeUbicacion);

router.get('/agregar_producto', authController.isAuthenticated, almacenesController.getAlmacenById, productosController.selectProducts, unidadesController.selectUnits, (req, res)=>{
    res.render('Almacenes/formAddProduct', {user: req.user, almacen: req.almacen, productos: req.productos, unidades: req.unidades})
})
router.post('/agregar_producto', almacenesController.moverInventario);

router.get('/deleteFrom', almacenesController.deleteFrom);
router.get('/editFrom', almacenesController.editFrom);

router.get('/reporte_movimientos', authController.isAuthenticated, almacenesController.getAlmacenById, almacenesController.getMovimientosUsuario, almacenesController.getMovimientosProyecto, (req, res)=>{
    res.render('Almacenes/reportesAdmin', {user: req.user, almacen: req.almacen, movimientos_usuario: req.movimientos_usuario, movimientos_proyecto: req.movimientos_proyecto, inicio: req.query.inicio, termino: req.query.termino})
})
router.get('/exportar_usuarios', authController.isAuthenticated, almacenesController.getAlmacenById, almacenesController.getMovimientosUsuario, (req, res)=>{
    res.render('Almacenes/exportarDatosUsuarios', {user: req.user, almacen: req.almacen, movimientos_usuario: req.movimientos_usuario, inicio: req.query.inicio, termino: req.query.termino})
})
router.get('/exportar_proyectos', authController.isAuthenticated, almacenesController.getAlmacenById, almacenesController.getMovimientosProyecto, (req, res)=>{
    res.render('Almacenes/exportarDatosProyectos', {user: req.user, almacen: req.almacen, movimientos_proyecto: req.movimientos_proyecto, inicio: req.query.inicio, termino: req.query.termino})
})

module.exports = router;