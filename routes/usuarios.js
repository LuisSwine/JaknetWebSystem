const express = require('express')

const router = express.Router()
const { authorized } = require('../database/db')


const authController = require('../controllers/authController')
const usuarioController = require('../controllers/usuarioController')


//#2.1.1.1. Visualización del Perfil
router.get('/miPerfil', authController.isAuthenticated, (req, res)=>{
    res.render('miPerfil', {user: req.user})
})
//#2.1.1.2. Cambiar Nombre y Apellidos del usuario
router.get('/changeNameUserPro', usuarioController.changeNombreUsuario)
//#2.1.1.3. Cambiar Telefono
router.get('/changeTelUserPro', usuarioController.changeTelUsuario)
//#2.1.1.4. Cambiar Email
router.get('/changeMailUserPro', usuarioController.changeMailUsuario)
//#2.1.1.5. Cambiar Contraseña
router.get('/changeContraUserPro', usuarioController.changePassUser)
    
//#2.2.1.1. TABLA DE USUARIOS
router.get('/adminusers', authController.isAuthenticated, authController.selectUsers, (req, res)=>{
    res.render('Usuarios/usersAdmin', {user: req.user, usuarios: req.usuarios})
})
//#2.2.1.2. REPORTE DE ASISTENCIA
router.get('/reporteAsistencia', authController.isAuthenticated, authController.reporteAsistencia, (req, res)=>{
    res.render('reporteAsistencia', {user: req.user, asistencias: req.asistencias, flag: req.query.flag})
})
        
//#2.2.2.1. Formulario para registrar un nuevo usuario
router.get('/nuevo_usuario', authController.isAuthenticated, (req, res)=>{
    res.render('Usuarios/formCreateUser', {user: req.user})
})
//#2.2.2.2. Funcion que registra al usuario
router.post('/nuevo_usuario', authController.createUser)
        
//#2.2.3.1. FORMULARIO PARA EDITAR USUARIO
router.get('/editar', authController.isAuthenticated, authController.selectUser, (req, res)=>{
    res.render('Usuarios/editUser', {user: req.user, usuario: req.usuario})
})
//#2.2.3.2. FUNCION PARA GUARDAR LOS CAMBIOS AL EDITAR USUARIO
router.post('/editar', authController.editUser)
        
//#2.2.4.1. PAGINA GENERAR REPORTE ASISTENCIA
router.get('/reporte_asistencia', authController.isAuthenticated, authController.reporteGeneralAsistencia, (req, res)=>{
    res.render('Usuarios/reporteAsistencia', {user: req.user, asistencias: req.asistencias})
})
        
//#2.2.5.1. FUNCION QUE CAMBIA LA CONTRASEÑA
router.get('/cambiar_contra_admin', usuarioController.changePassUserAdmin)

module.exports = router;