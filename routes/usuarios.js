import express from 'express'
const router = express.Router()

import {login, isAuthenticated, logout} from '../controllers/authController.js'
import { getUsuarios, createUser, updateNombreUsuario, updateTelefonoUsuario, updateEmailUsuario, updatePassUsuario, getUsuario, updateUsuario, updateContraUsuarioAdmin, deleteUsuario, notifyRecoverPass, unlockUser, updateSaldoUsuario } from '../controllers/usuarioController.js'
import { reporteGeneralAsistencia } from '../controllers/asistenciasController.js'

//GESTION DE USUARIOS
router.get('/adminusers', isAuthenticated, getUsuarios, (req, res)=>{
    res.render('Usuarios/usersAdmin', {user: req.user, usuarios: req.usuarios})
})
router.get('/nuevo_usuario', isAuthenticated, (req, res)=>{
    res.render('Usuarios/formCreateUser', {user: req.user})
})
router.get('/editar', isAuthenticated, getUsuario, (req, res)=>{
    res.render('Usuarios/editUser', {user: req.user, usuario: req.usuario})
})
//#2.1.1.1. Visualización del modulo de Mi Perfil
router.get('/miPerfil', isAuthenticated, (req, res)=>{
    res.render('miPerfil', {user: req.user})
})
router.get('/reporte_asistencia', isAuthenticated, reporteGeneralAsistencia, (req, res)=>{
    res.render('Usuarios/reporteAsistencia', {user: req.user, asistencias: req.asistencias})
})
router.post('/nuevo_usuario', createUser)
router.post('/editar', updateUsuario)
router.get('/cambiar_nombre_per', updateNombreUsuario)
router.get('/cambiar_telefono_per', updateTelefonoUsuario)
router.get('/cambiar_email_per', updateEmailUsuario)
router.get('/cambiar_contra_per', updatePassUsuario)
router.get('/cambiar_contra_admin', updateContraUsuarioAdmin)
router.get('/cambiar_saldo', updateSaldoUsuario)
router.get('/eliminar', deleteUsuario)
router.get('/recuperar_contra', notifyRecoverPass)
router.get('/desbloquear_usuario', unlockUser)

export default router