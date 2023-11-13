import express from 'express';

import { isAuthenticated } from '../controllers/authController.js'
import { createProducto, editProducto, selectCategoriasProductos, selectProducto, selectProductos, selectTipoProducto } from "../controllers/productosController.js";
import { getMarcas } from '../controllers/marcasController.js';
import { getProveedores } from '../controllers/proveedoresControllers.js';

const router = express.Router()

router.get('/administrar', isAuthenticated, selectProductos, (req, res)=>{
    res.render('Productos/productAdmin', {user: req.user, productos: req.productos})
})
router.get('/nuevo_producto', isAuthenticated, selectCategoriasProductos, selectTipoProducto, getMarcas, getProveedores, (req, res)=>{
    res.render('Productos/formCreateProduct', {user: req.user, categorias: req.categorias, tipos: req.tipos, marcas: req.marcas, proveedores: req.proveedores})
})
router.get('/editar', isAuthenticated, selectProducto, selectCategoriasProductos, selectTipoProducto, getMarcas, (req, res)=>{
    res.render('Productos/editProduct', {user: req.user, producto: req.producto, categorias: req.categorias, tipos: req.tipos, marcas: req.marcas})
})
router.post('/nuevo_producto', createProducto)
router.post('/editar', editProducto)

export default router


/* const express = require('express')

const { authorized } = require('../database/db')


const authController = require('../controllers/authController')
const productosController = require('../controllers/productosController')
const marcasController = require('../controllers/marcasController')
const proveedoresController = require('../controllers/proveedoresControllers')


router.get('/eliminar', productosController.deleteProduct)

module.exports = router;


 */