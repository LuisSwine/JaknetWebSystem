import express from 'express'
import { isAuthenticated } from '../controllers/authController.js'
import { deleteUnidad, getUnidad, getUnidades, setUnidad, updateUnidad } from '../controllers/unidadesController.js'



const router = express.Router()

router.get('/administrar', isAuthenticated, getUnidades, (req, res)=>{
    res.render('Unidades/unidadesAdmin', {user: req.user, unidades: req.unidades})
})
router.get('/nueva_unidad', isAuthenticated, (req, res)=>{
    res.render('Unidades/formCreateUnit', {user: req.user})
})
router.get('/editar', isAuthenticated, getUnidad, (req, res)=>{
    res.render('Unidades/editUnit', {user: req.user, unidad: req.unidad})
})
router.post('/editar', updateUnidad)
router.get('/eliminar', deleteUnidad)
router.post('/nueva_unidad', setUnidad)

export default router
