import express from 'express'

import { isAuthenticated } from '../controllers/authController.js'
import { getProyecto } from '../controllers/proyectosController.js'
import { getAreasProyecto } from '../controllers/areasController.js'
import { addEtapa, deleteEtapa, getEtapa, updateEtapa } from '../controllers/etapasController.js'

const router = express.Router() 

router.get('/agregar_etapa', isAuthenticated, getProyecto, getAreasProyecto, (req, res)=>{
    res.render('Proyectos/formAddEtapa', {user: req.user, proyecto: req.proyecto, areas: req.areas, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
})
router.get('/editar', isAuthenticated, getEtapa, getAreasProyecto, (req, res)=>{
    res.render('Proyectos/editarEtapa', {user: req.user, etapa: req.etapa, areas: req.areas, proyecto: req.query.proyecto, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
})
router.get('/eliminar', deleteEtapa)
router.post('/agregar_etapa', addEtapa)
router.post('/editar', updateEtapa)



export default router;

