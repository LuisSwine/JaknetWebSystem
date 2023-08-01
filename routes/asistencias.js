const express = require('express')

const router = express.Router()
const { authorized } = require('../database/db')

const authController = require('../controllers/authController')
const usuarioController = require('../controllers/usuarioController')

router.get('/registrar', usuarioController.resgistrarAsistencia)
router.get('/mis_asistencias', authController.isAuthenticated, authController.reporteAsistencia, (req, res)=>{
    res.render('reporteAsistencia', {user: req.user, asistencias: req.asistencias, flag: req.query.flag})
})

module.exports = router;