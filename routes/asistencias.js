import express from 'express'
import { isAuthenticated } from '../controllers/authController.js'
import { reporteAsistenciaUsuario, resgistrarAsistencia } from '../controllers/asistenciasController.js'

const router = express.Router()

router.get('/registrar', resgistrarAsistencia)
router.get('/mis_asistencias', isAuthenticated, reporteAsistenciaUsuario, (req, res)=>{
    res.render('reporteAsistencia', {user: req.user, asistencias: req.asistencias, flag: req.query.flag})
})

export default router