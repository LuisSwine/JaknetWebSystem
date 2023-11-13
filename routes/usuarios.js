import express from 'express'
const router = express.Router()

import {login, isAuthenticated, logout} from '../controllers/authController.js'
import { getUsuarios, createUser, updateNombreUsuario, updateTelefonoUsuario, updateEmailUsuario, updatePassUsuario } from '../controllers/usuarioController.js'

//GESTION DE USUARIOS
router.get('/adminusers', isAuthenticated, getUsuarios, (req, res)=>{
    res.render('Usuarios/usersAdmin', {user: req.user, usuarios: req.usuarios})
})
router.get('/nuevo_usuario', isAuthenticated, (req, res)=>{
    res.render('Usuarios/formCreateUser', {user: req.user})
})
router.post('/nuevo_usuario', createUser)

//#2.1.1.1. Visualización del modulo de Mi Perfil
router.get('/miPerfil', isAuthenticated, (req, res)=>{
    res.render('miPerfil', {user: req.user})
})
router.get('/cambiar_nombre_per', updateNombreUsuario)
router.get('/cambiar_telefono_per', updateTelefonoUsuario)
router.get('/cambiar_email_per', updateEmailUsuario)
router.get('/cambiar_contra_per', updatePassUsuario)




/* 
//#2.1.1.2. Cambiar Nombre y Apellidos del usuario

//#2.1.1.3. Cambiar Telefono
    
//#2.2.1.1. TABLA DE USUARIOS

//#2.2.1.2. REPORTE DE ASISTENCIA
router.get('/reporteAsistencia', authController.isAuthenticated, authController.reporteAsistencia, (req, res)=>{
    res.render('reporteAsistencia', {user: req.user, asistencias: req.asistencias, flag: req.query.flag})
})
        
//#2.2.2.1. Formulario para registrar un nuevo usuario

//#2.2.2.2. Funcion que registra al usuario

        
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


router.get('/eliminar', authController.deleteUser)
 */
export default router