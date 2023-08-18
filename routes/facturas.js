const express = require('express')

const router = express.Router()
const { authorized } = require('../database/db')

const authController = require('../controllers/authController')
const proveedoresController = require('../controllers/proveedoresControllers')
const facturasController = require('../controllers/facturasController')
const productosController = require('../controllers/productosController')
const unidadesController = require('../controllers/unidadesController')
const marcasController = require('../controllers/marcasController')

router.get('/agregar_factura', authController.isAuthenticated, authController.selectProyect, proveedoresController.selectProvs, (req, res)=>{
    res.render('Facturas/formNueva', {user: req.user, proyecto: req.proyecto, proveedores: req.proveedores, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
})
router.post('/agregar_factura', facturasController.insertFactura)


router.get('/detalles', authController.isAuthenticated, facturasController.getDetallesFactura, facturasController.getProductosFactura, (req, res)=>{
    res.render('Facturas/configurarFactura', {user: req.user, factura: req.factura, productos: req.productos, proyecto: req.query.proyecto, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
})

router.get('/agregar_producto', authController.isAuthenticated, productosController.selectProducts, unidadesController.selectUnits, productosController.selectCategoriasProduct, productosController.selectTipoProducto, marcasController.selectBrands, proveedoresController.selectProvs, facturasController.getDetallesFactura, (req, res)=>{
    res.render('Facturas/crearProducto', {user: req.user, productos: req.productos, unidades: req.unidades, categorias: req.categorias, tipos: req.tipos, marcas: req.marcas, proveedores: req.proveedores, factura: req.factura, proyecto: req.query.proyecto, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
})
router.post('/agregar_producto', facturasController.insertProducto)



module.exports = router;