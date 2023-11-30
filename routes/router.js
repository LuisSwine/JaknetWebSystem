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


/* 
import Ubicacion  from './ubicaciones.js'
import Factura    from './facturas.js' 
*/

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
/* 
router.use('/facturas', Factura) 
*/

 //INSTANCIACION A NUESTROS CONTROLADORES
import {login, isAuthenticated, logout} from '../controllers/authController.js'
import { selectLastMoves } from '../controllers/viaticosController.js'
import { proyectosAsistencia } from '../controllers/usuarioController.js'
import { selectInfoTareasUserDashboard, obtenerReportes} from '../controllers/tareasController.js'
/*const clientController       = require('../controllers/clientController')
const ubicacionesController  = require('../controllers/ubicacionesController') 
const proveedoresController  = require('../controllers/proveedoresControllers')
const marcasController       = require('../controllers/marcasController')
const serviciosController    = require('../controllers/serviciosController')
const productosController    = require('../controllers/productosController')
const contactosController    = require('../controllers/contactsController')
const areasController        = require('../controllers/areasController')
const tareasController       = require('../controllers/tareasController')
const cotizacionesController = require('../controllers/cotizacionesController')
const proyectosController    = require('../controllers/proyectosController')
const usuarioController      = require('../controllers/usuarioController') */

router.get('/login', (req, res)=>{
    res.render('login', {alert: false})
})
router.post('/login', login)
router.get('/logout', logout)
//DASHBOARD DEL USUARIO
router.get('/', isAuthenticated, selectLastMoves, proyectosAsistencia, selectInfoTareasUserDashboard, obtenerReportes, (req, res)=>{
    res.render('superadminindex', {userName: req.user, depositos: req.depositos, proyectosAsist: req.proyectosAsist, tareas: req.tareas, reportes: req.reportes})
})
/* 
//FUNCIONES OBSOLETAS PENDIENTES DE REVISION PARA ELIMINARLAS
router.get('/deleteUbi/:folio', ubicacionesController.deleteUbicacion)
router.get('/createTipo/:nombre', productosController.createTipoProducto)
router.get('/createCategoria/:nombre', productosController.createCategoriaProducto)

router.get('/adminservicios', authController.isAuthenticated, serviciosController.selectServicios, (req, res)=>{
    res.render('Servicios/serviciosAdmin', {user: req.user, servicios: req.servicios})
})
router.get('/formcreateservicios', authController.isAuthenticated, productosController.selectCategoriasProduct, (req, res)=>{
    res.render('Servicios/formCreateServicio', {user: req.user, categorias: req.categorias})
})
router.post('/createService', serviciosController.createServicio)
router.get('/editarservicio/:folio', authController.isAuthenticated, serviciosController.selectServicio, productosController.selectCategoriasProduct, (req, res)=>{
    res.render('Servicios/editServicio', {user: req.user, servicio: req.servicio, categorias: req.categorias})
})
router.post('/editService', serviciosController.editServicio)
router.get('/deleteServicio/:folio', serviciosController.deleteServicio)


router.get('/adminmarcas', authController.isAuthenticated, marcasController.selectBrands, (req, res)=>{
    res.render('Marcas/marcasAdmin', {user: req.user, marcas: req.marcas})
})
router.get('/formcreatemarca', authController.isAuthenticated, (req, res) =>{
    res.render('Marcas/formCreateBrand', {user: req.user})
})
router.post('/createBrand', marcasController.createBrand)
router.get('/perfilMarca', authController.isAuthenticated, marcasController.selectBrand, marcasController.selectProveedoresMarca, marcasController.selectProductosMarca, (req, res)=>{
    res.render('Marcas/profileMarca', {user: req.user, marca: req.marca, proveedores: req.proveedores, productos: req.productos})
})
router.get('/cambiarNombreMarca', marcasController.editNombreMarca)
router.get('/relateProveedorMarca', authController.isAuthenticated, proveedoresController.selectProvs, (req, res)=>{
    res.render('Marcas/formRelateProveedorMarca', {user: req.user, proveedores: req.proveedores, marca: req.query.marca})
})
router.post('/relacionarProveedorMarca', marcasController.relateProveedorMarca)
router.get('/deleteProveedorMarca', marcasController.deleteProveedorMarca)
router.get('/deleteMarca/:folio', marcasController.deleteBrand)
              
router.get('/admintareas', authController.isAuthenticated, tareasController.selectTareasAdmin, tareasController.obtenerReportesAdmin,(req, res)=>{
    res.render('Tareas/adminTareas', {user: req.user, tareas: req.tareas, reportes: req.reportes})
})
router.get('/assignAdminTask', authController.isAuthenticated, tareasController.validateTarea, tareasController.usuariosAsignados, (req, res)=>{
    res.render('Tareas/assignTask', {user: req.user, tarea: req.tarea, usuarios: req.usuarios})
})
router.post('/asignTaskAdmin', tareasController.asignarTareaAdmin)
router.get('/crearTareaAdmin', authController.isAuthenticated, authController.selectProyectos, authController.selectAllEtapas, tareasController.selectTiposTarea, (req, res)=>{
    res.render('Tareas/formCreateTask', {user: req.user, proyectos: req.proyectos, etapas: req.etapas, tipos: req.tipos})
})
router.post('/createTareaAdmin', tareasController.createTareaAdmin)
router.get('/declineReportAdmin', tareasController.declineReportAdmin)
router.get('/checkAsIncAdmin', tareasController.checkAsIncAdmin)
router.get('/deleteTareaAdmin', tareasController.deleteTareaAdmin)

router.get('/createcotizacionProyecto', proyectosController.createCotizacionProyecto)
router.get('/deleteCotiProy', proyectosController.deleteCotizacion)
router.get('/deleteProyectoGrl', proyectosController.deleteProyectoGrl)
router.get('/formCreateCotClient', authController.isAuthenticated, ubicacionesController.selectUbicaciones, authController.selectProyectos, (req, res)=>{
    res.render('Clientes/formCreateCot', {user: req.user, ubicaciones: req.ubicaciones, proyectos: req.proyectos, cliente: req.query.cliente})
})
router.post('/addCotClient', clientController.addCotClient)
router.get('/deleteCotiCliente', clientController.deleteCotizacion)
router.get('/formCotUbi', authController.isAuthenticated, authController.selectProyectos, (req, res)=>{
    res.render('Ubicaciones/fromCotUbi', {user: req.user, proyectos: req.proyectos, ubicacion: req.query.ubicacion, cliente: req.query.cliente, flag: req.query.flag})
})      
router.post('/addCotUbi', ubicacionesController.addCotUbi)
router.get('/deleteCotiUbi', ubicacionesController.deleteCotizacion) 
router.get('/cotizacionMain', authController.isAuthenticated, clientController.selectClient, cotizacionesController.selectCotizacion, cotizacionesController.selectProductosCotizacion, cotizacionesController.selectServiciosCotizacion, (req, res)=>{
    res.render('Proyectos/Cotizaciones/mainCotizacion', {user: req.user, clienteSelected: req.cliente, cotizacion: req.cotizacion, costoPersonal: req.costoPersonal, subtotal_productos: req.subtotal_productos, subtotal_servicios: req.subtotal_servicios, subtotal: req.subtotal, total: req.total, productos: req.productos, servicios: req.servicios, proyecto: req.query.proyecto, flag: req.query.flag, cliente: req.query.cliente, ubicacion: req.query.ubicacion, permisos: req.query.permisos})
})
router.get('/definirTasa', cotizacionesController.definirTasa)
router.get('/definirTecnico', cotizacionesController.definirTecnico)
router.get('/definirSupervisor', cotizacionesController.definirSupervisor)
router.get('/definirIntereses', cotizacionesController.definirIntereses)
router.get('/formaddproduct', authController.isAuthenticated, productosController.selectProducts, (req, res)=>{
    res.render('Proyectos/Cotizaciones/addProduct', {user: req.user, productos: req.productos, cotizacion: req.query.cotizacion, proyecto: req.query.proyecto, ubicacion: req.query.ubicacion, cliente: req.query.cliente, flag: req.query.flag, permisos: req.query.permisos})
})
router.post('/addProductCot', cotizacionesController.addProducto)
router.get('/editarProductoCotizacion', authController.isAuthenticated, cotizacionesController.selectProductoCoti, (req, res)=>{
    res.render('Proyectos/Cotizaciones/editProduct', {user: req.user, producto: req.producto, cotizacion: req.query.cotizacion, proyecto: req.query.proyecto, ubicacion: req.query.ubicacion, cliente: req.query.cliente, flag: req.query.flag, permisos: req.query.permisos})
})
router.post('/editPorductCot', cotizacionesController.editarProductoCoti)
router.get('/deleteProductCot', cotizacionesController.deleteProductCot)
router.get('/formaddservice', authController.isAuthenticated, serviciosController.selectServicios, (req, res)=>{
    res.render('Proyectos/Cotizaciones/addService', {user: req.user, servicios: req.servicios, cotizacion: req.query.cotizacion, proyecto: req.query.proyecto, ubicacion: req.query.ubicacion, cliente: req.query.cliente, flag: req.query.flag, permisos: req.query.permisos})
})
router.post('/addServiceCot', cotizacionesController.addService)
router.get('/editarServicioCotizacion', authController.isAuthenticated, cotizacionesController.selectServicioCoti, (req, res)=>{
    res.render('Proyectos/Cotizaciones/editService', {user: req.user, servicio: req.servicio, cotizacion: req.query.cotizacion, proyecto: req.query.proyecto, ubicacion: req.query.ubicacion, cliente: req.query.cliente, flag: req.query.flag, permisos: req.query.permisos})
})
router.post('/editServiceCot', cotizacionesController.editarServicioCoti)          
router.get('/deleteServiceCot', cotizacionesController.deleteServiceCot)
router.get('/cotizacionPDF', authController.isAuthenticated, cotizacionesController.cotizacionPDF, cotizacionesController.selectProductosCotizacion, cotizacionesController.selectServiciosCotizacion, (req, res)=>{
    res.render('Proyectos/Cotizaciones/generarPDF', {user: req.user, cotizacion: req.registro, productos: req.productos, servicios: req.servicios})
})
router.get('/definirNumeroPDFCotizacion', cotizacionesController.definirNumeroPDFCotizacion)
router.get('/definirDestinatarioPDFCotizacion', cotizacionesController.definirDestinatarioPDFCotizacion)
router.get('/definirPuestoDestinatarioPDFCotizacion', cotizacionesController.definirPuestoDestinatarioPDFCotizacion)
router.get('/definirClientePDFCotizacion', cotizacionesController.definirClientePDFCotizacion)
router.get('/definirMonedaPDFCotizacion', cotizacionesController.definirMonedaPDFCotizacion)
router.get('/definirUbicacionPDFCotizacion', cotizacionesController.definirUbicacionPDFCotizacion)
router.get('/definirQuienSolicitaPDFCotizacion', cotizacionesController.definirQuienSolicitaPDFCotizacion)
router.get('/definirNotasPDFCotizacion', cotizacionesController.definirNotasPDFCotizacion)
router.get('/definirEmisorPDFCotizacion', cotizacionesController.definirEmisorPDFCotizacion)
router.get('/descargarPDF', cotizacionesController.createPDFCot)
router.get('/contactsclient/:folio', authController.isAuthenticated, contactosController.selectContacts, clientController.selectClient, (req, res)=>{
    res.render('Contactos/contactsAdmin', {user: req.user, contactos: req.contactos, cliente: req.cliente, isCliente: true})
})
router.get('/ubicacionesclient/:folio', authController.isAuthenticated, ubicacionesController.selectUbicaciones, clientController.selectClient, (req, res)=>{
    res.render('Ubicaciones/ubicacionesAdmin', {user: req.user, ubicaciones: req.ubicaciones, cliente: req.cliente, isCliente: true})
})
router.get('/editarubi/:folio', authController.isAuthenticated, clientController.selectClients, ubicacionesController.selectUbicacion, (req, res)=>{
    res.render('Ubicaciones/editUbi', {user: req.user, clientes: req.clientes, ubicacion: req.ubicacion})
})
router.post('/editUbi', ubicacionesController.editUbicacion)
router.get('/adminareas', authController.isAuthenticated, areasController.selectAreas, ubicacionesController.selectUbicacion, (req, res)=>{
    res.render('Areas/areasAdmin', {user: req.user, areas: req.areas, ubicacion: req.ubicacion, clienteSelected: req.query.cliente, flag: req.query.flag})
})
router.get('/adminviaticos', authController.isAuthenticated, authController.selectViaticos, (req, res)=>{
    res.render('Viaticos/viaticosAdmin', {user: req.user, operaciones: req.operaciones})
})
router.get('/adminProject/:folio', authController.isAuthenticated, authController.selectProyectos, clientController.selectClient, (req, res) =>{
    res.render('Proyectos/proyectosAdmin', {user: req.user, proyectos: req.proyectos, flag: req.flag, cliente: req.cliente})
})
router.get('/selectUsers', authController.selectUsers)
router.get('/selectUser/:folio', authController.selectUser)
router.get('/deleteCoti', cotizacionesController.deleteCotizacion) */

export default router