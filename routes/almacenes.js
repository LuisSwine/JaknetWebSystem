import express from 'express'

import { isAuthenticated } from '../controllers/authController.js'
import { deleteDeAlmacen, getAlmacen, getAlmacenes, getMovimientosProyecto, getMovimientosUsuario, moverInventario, setAlmacen, updateCantidadAlmacen, updateNombreAlmacen, updateUbicacionAlmacen } from '../controllers/almacenesController.js'
import { getInventarioOn } from '../controllers/inventarioController.js'
import { selectProductos } from '../controllers/productosController.js'
import { getUnidades } from '../controllers/unidadesController.js'

const router = express.Router()

router.get('/admin', isAuthenticated, getAlmacenes, (req, res)=>{
    res.render('Almacenes/almacenesAdmin', {user: req.user, almacenes: req.almacenes})
})
router.get('/gestionar_almacen', isAuthenticated, getAlmacen, getInventarioOn, (req, res)=>{
    res.render('Almacenes/gestionarAlmacen', {user: req.user, almacen: req.almacen, inventario: req.inventario})
})
router.get('/nuevo_almacen', isAuthenticated, (req, res)=>{
    res.render('Almacenes/formCreate', {user: req.user})
})
router.get('/agregar_producto', isAuthenticated, getAlmacen, selectProductos, getUnidades, (req, res)=>{
    res.render('Almacenes/formAddProduct', {user: req.user, almacen: req.almacen, productos: req.productos, unidades: req.unidades})
})
router.get('/reporte_movimientos', isAuthenticated, getAlmacen, getMovimientosUsuario, getMovimientosProyecto, (req, res)=>{
    res.render('Almacenes/reportesAdmin', {user: req.user, almacen: req.almacen, movimientos_usuario: req.movimientos_usuario, movimientos_proyecto: req.movimientos_proyecto, inicio: req.query.inicio, termino: req.query.termino})
})
router.get('/exportar_usuarios', isAuthenticated, getAlmacen, getMovimientosUsuario, (req, res)=>{
    res.render('Almacenes/exportarDatosUsuarios', {user: req.user, almacen: req.almacen, movimientos_usuario: req.movimientos_usuario, inicio: req.query.inicio, termino: req.query.termino})
})
router.get('/exportar_proyectos', isAuthenticated, getAlmacen, getMovimientosProyecto, (req, res)=>{
    res.render('Almacenes/exportarDatosProyectos', {user: req.user, almacen: req.almacen, movimientos_proyecto: req.movimientos_proyecto, inicio: req.query.inicio, termino: req.query.termino})
})
router.get('/cambiarNombre', updateNombreAlmacen);
router.get('/cambiarUbicacion', updateUbicacionAlmacen);
router.get('/editFrom', updateCantidadAlmacen);
router.get('/deleteFrom', deleteDeAlmacen);

router.post('/agregar_producto', moverInventario);
router.post('/nuevo_almacen', setAlmacen)


export default router










