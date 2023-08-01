const express = require('express')

const router = express.Router()
const { authorized } = require('../database/db')


const authController = require('../controllers/authController')
const proveedoresController = require('../controllers/proveedoresControllers')
const marcasController = require('../controllers/marcasController')
const productosController = require('../controllers/productosController')

//LISTADO DE PROVEEDORES
router.get('/administrar', authController.isAuthenticated, proveedoresController.selectProvs, (req, res) =>{
    res.render('Proveedores/provAdmin', {user: req.user, proveedores: req.proveedores})
})

//NUEVO PROVEEDOR
router.get('/nuevo_proveedor', authController.isAuthenticated, (req, res)=>{
    res.render('Proveedores/formCreateProv', {user: req.user})
})
router.post('/nuevo_proveedor', proveedoresController.createProv)

//EDITAR PROVEEDOR
router.get('/editar', authController.isAuthenticated, proveedoresController.selectProveedor, (req, res)=>{
    res.render('Proveedores/editProv', {user: req.user, proveedor: req.proveedor})
})
router.post('/editar', proveedoresController.editProv)

//ELIMINAR PROVEEDOR
router.get('/eliminar', proveedoresController.deleteProv)

//GESTIONAR MARCAS
router.get('/agregar_marca', authController.isAuthenticated, marcasController.selectBrands, (req, res)=>{
    res.render('Proveedores/formRelateMarcaProveedor', {user: req.user, marcas: req.marcas, proveedor: req.query.proveedor})
})
router.post('/agregar_marca', proveedoresController.relateMarcaProveedor)
router.get('/eliminar_marca', proveedoresController.deleteMarcaProveedor)
//GESTIONAR PRODUCTOS
router.get('/agregar_producto', authController.isAuthenticated, productosController.selectCategoriasProduct, productosController.selectTipoProducto, marcasController.selectBrands, (req, res)=>{
    res.render('Proveedores/formCreateProduct', {user: req.user, categorias: req.categorias, tipos: req.tipos, marcas: req.marcas, proveedor: req.query.proveedor})
})
router.post('/agregar_producto', proveedoresController.createProductProveedor)

//PERFIL DEL PROVEEDOR
router.get('/perfil', authController.isAuthenticated, proveedoresController.selectProveedor, proveedoresController.selectMarcasProveedor, proveedoresController.selectProductosProveedor, (req, res)=>{
    res.render('Proveedores/profileProv', {user: req.user, proveedor: req.proveedor, marcas: req.marcas, productos: req.productos})
})
module.exports = router;