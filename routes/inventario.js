import express from 'express'

import { isAuthenticated } from '../controllers/authController.js'
import { deleteFromInventario, deleteFromInventarioPersonal, getInventario, getInventarioUsuario, getReporteGeneral, getReporteUsuario, setInventario, setInventarioUsuario, updateInventario, updateInventarioPersonal } from '../controllers/inventarioController.js'
import { selectProductos } from '../controllers/productosController.js'
import { getUnidades } from '../controllers/unidadesController.js'
import { getAlmacenes } from '../controllers/almacenesController.js'
import { getUsuario } from '../controllers/usuarioController.js'

const router = express.Router()

router.get('/inventario_general', isAuthenticated, getInventario, (req, res)=>{
    res.render('Inventario/inventAdmin', {user: req.user, inventario: req.inventario})
})
router.get('/agregar_general', isAuthenticated, selectProductos, getUnidades, getAlmacenes, (req, res)=>{
    res.render('Inventario/formMoveInvent', {user: req.user, productos: req.productos, unidades: req.unidades, almacenes: req.almacenes})
})
router.get('/reporte_general', isAuthenticated, getReporteGeneral, (req, res)=>{
    res.render('Inventario/movesInventGrl', {user: req.user, movimientos: req.movimientos})
}) 
router.get('/mi_inventario', isAuthenticated, getUsuario, getInventarioUsuario, getAlmacenes, (req, res)=>{
    res.render("Minventario/miInventario", {user: req.user, usuario: req.usuario, productos: req.productos, almacenes: req.almacenes, flag: req.query.flag})
}) 
router.get('/reporte_personal', isAuthenticated, getUsuario, getReporteUsuario, (req, res)=>{
    res.render('Minventario/movesInventPer', {user: req.user, usuario: req.usuario, movimientos: req.movimientos, flag: req.query.flag})
})
router.get('/agregar', isAuthenticated, getUsuario, getInventario, getUnidades, (req, res)=>{
    res.render('Minventario/formAddElements', {user: req.user, usuario: req.usuario, productos: req.inventario, unidades: req.unidades, flag: req.query.flag})
})
router.post('/agregar', setInventarioUsuario)
router.post('/agregar_general', setInventario)
router.get('/editar_general', updateInventario)
router.get('/editar_personal', updateInventarioPersonal)
router.get('/eliminar_general', deleteFromInventario)
router.get('/eliminar_personal', deleteFromInventarioPersonal)

export default router
