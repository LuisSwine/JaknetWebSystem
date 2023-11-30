import express from 'express'

import { isAuthenticated } from '../controllers/authController.js'
import { getUbicacion } from '../controllers/ubicacionesController.js' 
import { createArea, deleteArea, getArea, updateArea } from '../controllers/areasController.js'

const router = express.Router()

router.get('/nueva_area', isAuthenticated, getUbicacion, (req, res)=>{
    res.render('Areas/formCreateArea', {user: req.user, ubicacion: req.ubicacion, clienteSelected: req.query.cliente})
})
router.get('/editar', isAuthenticated, getArea, (req, res)=>{
    res.render('Areas/editArea', {user: req.user, area: req.area, ubicacion: req.query.ubicacion, clienteSelected: req.query.cliente, flag: req.query.flag})
})
router.get('/eliminar', deleteArea)
router.post('/nueva_area', createArea)
router.post('/editar', updateArea)


export default router