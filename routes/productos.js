const express = require('express')

const router = express.Router()
const { authorized } = require('../database/db')


const authController = require('../controllers/authController')
const productosController = require('../controllers/productosController')
const marcasController = require('../controllers/marcasController')
const proveedoresController = require('../controllers/proveedoresControllers')

router.get('/administrar', authController.isAuthenticated, productosController.selectProducts, (req, res)=>{
    res.render('Productos/productAdmin', {user: req.user, productos: req.productos})
})
router.get('/nuevo_producto', authController.isAuthenticated, productosController.selectCategoriasProduct, productosController.selectTipoProducto, marcasController.selectBrands, proveedoresController.selectProvs, (req, res)=>{
    res.render('Productos/formCreateProduct', {user: req.user, categorias: req.categorias, tipos: req.tipos, marcas: req.marcas, proveedores: req.proveedores})
})
router.post('/nuevo_producto', productosController.createProduct)
router.get('/editar', authController.isAuthenticated, productosController.selectProduct, productosController.selectCategoriasProduct, productosController.selectTipoProducto, marcasController.selectBrands, (req, res)=>{
    res.render('Productos/editProduct', {user: req.user, producto: req.producto, categorias: req.categorias, tipos: req.tipos, marcas: req.marcas})
})
router.post('/editar', productosController.editProduct)

router.get('/eliminar', productosController.deleteProduct)

module.exports = router;


