import express from 'express'

import { isAuthenticated } from '../controllers/authController.js'
import { deleteMarcaProveedor, deleteProveedor, getMarcasProveedor, getProductosProveedor, getProveedor, getProveedores, setMatchMarcaProveedor, setProveedor, updateProveedor } from '../controllers/proveedoresControllers.js'
import { getMarcas } from '../controllers/marcasController.js'
import { selectCategoriasProductos, selectTipoProducto, setProductoProveedor } from '../controllers/productosController.js'

const router = express.Router()

router.get('/administrar', isAuthenticated, getProveedores, (req, res) =>{
    res.render('Proveedores/provAdmin', {user: req.user, proveedores: req.proveedores})
})
router.get('/nuevo_proveedor', isAuthenticated, (req, res)=>{
    res.render('Proveedores/formCreateProv', {user: req.user})
})
router.get('/editar', isAuthenticated, getProveedor, (req, res)=>{
    res.render('Proveedores/editProv', {user: req.user, proveedor: req.proveedor})
})
router.get('/perfil', isAuthenticated, getProveedor, getMarcasProveedor, getProductosProveedor, (req, res)=>{
    res.render('Proveedores/profileProv', {user: req.user, proveedor: req.proveedor, marcas: req.marcas, productos: req.productos})
})
router.get('/agregar_marca', isAuthenticated, getMarcas, (req, res)=>{
    res.render('Proveedores/formRelateMarcaProveedor', {user: req.user, marcas: req.marcas, proveedor: req.query.proveedor})
})
router.get('/agregar_producto', isAuthenticated, selectCategoriasProductos, selectTipoProducto, getMarcas, (req, res)=>{
    res.render('Proveedores/formCreateProduct', {user: req.user, categorias: req.categorias, tipos: req.tipos, marcas: req.marcas, proveedor: req.query.proveedor})
})
router.post('/nuevo_proveedor', setProveedor)
router.post('/editar', updateProveedor)
router.post('/agregar_marca', setMatchMarcaProveedor)
router.post('/agregar_producto', setProductoProveedor)
router.get('/eliminar', deleteProveedor)
router.get('/eliminar_marca', deleteMarcaProveedor)


export default router