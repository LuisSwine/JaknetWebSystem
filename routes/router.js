//Llamamos tambien al modulo de express
import express from 'express'
const router = express.Router()

import User       from './usuarios.js'
import Cliente    from './clientes.js'
import Ubicacion  from './ubicaciones.js'
import Area       from './areas.js'
import Contacto   from './contactos.js'
import Proyecto   from './proyectos.js'
import Etapa      from './etapas.js'
import Tarea      from './tareas.js'
import Rol        from './roles.js'
import Proveedor  from './proveedores.js'
import Producto   from './productos.js'
import Almacen    from './almacenes.js'
import Inventario from './inventario.js'
import Unidad     from './unidades.js'
import Viatico    from './viaticos.js'
import Asistencia from './asistencias.js'
import Panoramara from './panorama.js'

router.use('/usuarios', User)
router.use('/clientes', Cliente)
router.use('/ubicaciones', Ubicacion)
router.use('/areas', Area)
router.use('/contactos', Contacto)
router.use('/proyectos', Proyecto)
router.use('/etapas', Etapa)
router.use('/tareas', Tarea)
router.use('/roles', Rol)
router.use('/proveedores', Proveedor)
router.use('/productos', Producto)
router.use ('/almacenes', Almacen)
router.use('/inventario', Inventario)
router.use('/unidades', Unidad)
router.use('/viaticos', Viatico)
router.use('/asistencias', Asistencia)
router.use('/panorama', Panoramara)


 //INSTANCIACION A NUESTROS CONTROLADORES
import {login, isAuthenticated, logout} from '../controllers/authController.js'
import { selectLastMoves } from '../controllers/viaticosController.js'
import { proyectosAsistencia } from '../controllers/usuarioController.js'
import { selectInfoTareasUserDashboard, obtenerReportes} from '../controllers/tareasController.js'


router.get('/login', (req, res)=>{
    res.render('login', {alert: false})
})
router.post('/login', login)
router.get('/logout', logout)
//DASHBOARD DEL USUARIO
router.get('/', isAuthenticated, selectLastMoves, proyectosAsistencia, selectInfoTareasUserDashboard, obtenerReportes, (req, res)=>{
    res.render('superadminindex', {userName: req.user, depositos: req.depositos, proyectosAsist: req.proyectosAsist, tareas: req.tareas, reportes: req.reportes})
})

export default router