//Llamamos tambien al modulo de express
const express = require('express')

const router = express.Router()
const { authorized } = require('../database/db')

//INSTANCIACION A NUESTROS CONTROLADORES
const authController         = require('../controllers/authController')
const clientController       = require('../controllers/clientController')
const ubicacionesController  = require('../controllers/ubicacionesController') 
const proveedoresController  = require('../controllers/proveedoresControllers')
const marcasController       = require('../controllers/marcasController')
const unidadesController     = require('../controllers/unidadesController')
const serviciosController    = require('../controllers/serviciosController')
const productosController    = require('../controllers/productosController')
const contactosController    = require('../controllers/contactsController')
const areasController        = require('../controllers/areasController')
const tareasController       = require('../controllers/tareasController')
const cotizacionesController = require('../controllers/cotizacionesController')
const proyectosController    = require('../controllers/proyectosController')
const viaticosController     = require('../controllers/viaticosController')
const usuarioController      = require('../controllers/usuarioController')
const inventarioController   = require('../controllers/inventarioController')

//MODLUO #0 - INICIO DE SESION
router.get('/login', (req, res)=>{
    res.render('login', {alert: false})
})
router.post('/login', authController.login)

//MODULO #1 - DASHBOARD DE USUARIO
    //*- FUNCION #1.1. DASHBOARD DE USUARIO
    router.get('/', authController.isAuthenticated, authController.selectLatsMoves, usuarioController.proyectosAsistencia, tareasController.selectInfoTareasUserDashboard, tareasController.obtenerReportes, (req, res)=>{
        res.render('superadminindex', {userName: req.user, depositos: req.depositos, proyectosAsist: req.proyectosAsist, tareas: req.tareas, reportes: req.reportes})
    })
    //*- FUNCION #1.2. CONTROL DE ASISTENCIA
        //#1.2.1. FUNCION PARA REGISTRAR ASISTENCIA
        router.get('/registrarAsistencia', usuarioController.resgistrarAsistencia)
//MODULO #2 - USUARIOS
    //SECCION #2.1. PERFIL
        //*-Funcion #2.1.1. Perfil del usuario
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
    //SECCION #2.2. LISTA DE USUARIOS
        //*-Funcion #2.2.1. Visualizar Usuarios
            //#2.2.1.1. TABLA DE USUARIOS
            router.get('/adminusers', authController.isAuthenticated, authController.selectUsers, (req, res)=>{
                res.render('Usuarios/usersAdmin', {user: req.user, usuarios: req.usuarios})
            })
            //#2.2.1.2. REPORTE DE ASISTENCIA
            router.get('/reporteAsistencia', authController.isAuthenticated, authController.reporteAsistencia, (req, res)=>{
                res.render('reporteAsistencia', {user: req.user, asistencias: req.asistencias, flag: req.query.flag})
            })
        //*-Funcion #2.2.2. Crear Usuarios
            //#2.2.2.1. Formulario para registrar un nuevo usuario
            router.get('/formcreateusers', authController.isAuthenticated, (req, res)=>{
                res.render('Usuarios/formCreateUser', {user: req.user})
            })
            //#2.2.2.2. Funcion que registra al usuario
            router.post('/createUser', authController.createUser)
        //*-FUNCION #2.2.3. EDITAR USUARIO
            //#2.2.3.1. FORMULARIO PARA EDITAR USUARIO
            router.get('/editarusuario', authController.isAuthenticated, authController.selectUser, (req, res)=>{
                res.render('Usuarios/editUser', {user: req.user, usuario: req.usuario})
            })
            //#2.2.3.2. FUNCION PARA GUARDAR LOS CAMBIOS AL EDITAR USUARIO
            router.post('/editUser', authController.editUser)
        //*- FUNCION #2.2.4. REPORTE DE ASISTENCIA
            //#2.2.4.1. PAGINA GENERAR REPORTE ASISTENCIA
            router.get('/generarReporteAsistencia', authController.isAuthenticated, authController.reporteGeneralAsistencia, (req, res)=>{
                res.render('Usuarios/reporteAsistencia', {user: req.user, asistencias: req.asistencias})
            })
        //*- FUNCION #2.2.5. CAMBIAR CONTRASEÑA
            //#2.2.5.1. FUNCION QUE CAMBIA LA CONTRASEÑA
            router.get('/changeContraUserAdmin', usuarioController.changePassUserAdmin)

//MODULO #3 - PROYECTOS
    //SECCION #3.1. CLIENTES
        //*- FUNCION #3.1.1. ADMINISTRACION DE CLIENTES
            //#3.1.1.1. PAGINA PRINCIPAL
            router.get('/adminclients', authController.isAuthenticated, clientController.selectClients, (req, res)=>{
                res.render('Clientes/clientsAdmin', {user: req.user, clientes: req.clientes})
            })
        //*- FUNCION #3.1.2. CREAR O REGISTRAR NUEVO CLIENTE
            //#3.1.2.1. FORMULARIO DE REGISTRO DEL CLIENTE
            router.get('/formcreateclient', authController.isAuthenticated, clientController.selectTipoServicios, (req, res)=>{
                res.render('Clientes/formCreateClient', {user: req.user, servicios: req.servicios})
            })
            //#3.1.2.2. FUNCION QUE REGISTRA AL CLIENTE EN LA BD
            router.post('/createClient', clientController.createClient)
        //*- FUNCION #3.1.3. PERFIL DEL CLIENTE
            //#3.1.3.1. PAGINA PRINCIPAL DEL PERFIL DEL CLIENTE
            router.get('/perfilCliente', authController.isAuthenticated, clientController.selectClient, ubicacionesController.selectUbicaciones, contactosController.selectContacts, authController.selectProyectos, cotizacionesController.selectCotizacionesCliente, clientController.selectTipoClientes, clientController.selectTipoServicios, (req, res)=>{
                res.render('Clientes/perfilCliente', {user: req.user, cliente: req.cliente, ubicaciones: req.ubicaciones, contactos: req. contactosCliente, proyectos: req.proyectos, cotizaciones: req.cotizaciones, tiposCliente: req.tipos, tiposServicios: req.servicios})
            })
            //#3.1.3.2. EDITAR EL NOMBRE DEL CLIENTE
            router.get('/cambiarNombreCliente', clientController.editNameClient)
            //#3.1.3.3. EDITAR EL SERVICIO PROVISTO AL CLIENTE
            router.get('/editServicioCliente', clientController.editServicioCliente)
            //#3.1.3.4. EDITAR EL TIPO DE CLIENTE
            router.get('/editTipoCliente', clientController.editTipoCliente)
            //#3.1.3.5. GESTIONAR COTIZACIONES
                //#3.1.3.5.1. CREAR COTIZACION
                    //#3.1.3.5.1.1. FORMULARIO
                    router.get('/formCreateCotClient', authController.isAuthenticated, ubicacionesController.selectUbicaciones, authController.selectProyectos, (req, res)=>{
                        res.render('Clientes/formCreateCot', {user: req.user, ubicaciones: req.ubicaciones, proyectos: req.proyectos, cliente: req.query.cliente})
                    })
                    //#3.1.3.5.1.2. FUNCION
                    router.post('/addCotClient', clientController.addCotClient)
                //#3.1.3.5.2. ELIMINAR COTIZACION
                router.get('/deleteCotiCliente', clientController.deleteCotizacion)
            //#3.1.3.6. GESTIONAR UBICACIONES
                //#3.1.3.6.1. ELIMINAR UBICACION FUNCION
                router.get('/deleteUbicacionCliente', clientController.deleteUbicacionCliente)
            //#3.1.3.7. GESTIONAR PROYECTOS
                //#3.1.3.7.1. ELIMINAR PROYECTO FUNCION
                router.get('/deleteProyectoCliente', proyectosController.deleteProyectoClient)
        //*- FUNCION #3.1.4. ELIMINAR CLIENTE
            //#3.1.4.1 FUNCION QUE ELIMINA AL CLIENTE
            router.get('/deleteClient/:folio', clientController.deleteClient)
    //SECCION #3.2. CONTACTOS
        //*- FUNCION #3.2.1. ADMINISTRACION DE CONTACTOS
            //#3.2.1.1. PAGINA DE ADMINISTRACION DE CONTACTOS
            router.get('/admincontactos', authController.isAuthenticated, contactosController.selectContacts, (req, res)=>{
                res.render('Contactos/contactsAdmin', {user: req.user, contactos: req.contactos, isCliente: false})
            })
        //*- FUNCION #3.2.2. CREAR O REGISTRAR UN NUEVO CONTACTO
            //#3.2.2.1. FORMULARIO DE REGISTRO DE CONTACTO
            router.get('/formcreatecontact', authController.isAuthenticated, clientController.selectClients, (req, res)=>{
                res.render('Contactos/formCreateContact', {user: req.user, clientes: req.clientes, clienteSelected: req.query.cliente, flag: req.query.flag})
            })
            //#3.2.2.2. FUNCION QUE REGISTRA EL NUEVO CONTACTO
            router.post('/createContact', contactosController.createContact)
        //*- FUNCION #3.2.3. ELIMINAR CONTACTO
            //#3.2.3.1. FUNCION QUE ELIMINA AL CONTACTO
            router.get('/deleteContact', contactosController.deleteContact)
        //*- FUNCION #3.2.4. EDITAR REGISTRO DEL CONTACTO
            //#3.2.4.1. FORMULARIO PARA EDITAR CONTACTO
            router.get('/editarcontacto', authController.isAuthenticated, clientController.selectClients, contactosController.selectContact, (req, res)=>{
                res.render('Contactos/editContact', {user: req.user, clientes: req.clientes, contacto: req.contacto, clienteSelected: req.query.cliente, flag: req.query.flag})
            })
            //#3.2.4.2. FUNCION QUE GUARDA LOS CAMBIOS AL CONTACTO
            router.post('/editContact', contactosController.editContact)
    //SECCION #3.3. UBICACIONES
        //*- FUNCION #3.3.1. ADMINISTRACION DE UBICACIONES
            //#3.3.1.1. PAGINA DE ADMINISTRACION DE UBIS
            router.get('/adminubicaciones', authController.isAuthenticated, ubicacionesController.selectUbicaciones, (req, res)=>{
                res.render('Ubicaciones/ubicacionesAdmin', {user: req.user, ubicaciones: req.ubicaciones, isCliente: false})
            })
        //*- FUNCION #3.3.2. CREAR O REGISTRAR UNA NUEVA UBICACION
            //#3.3.2.1. FORMULARIO PARA REGISTRAR UN NUEVO CLIENTE
            router.get('/formcreateubicacion', authController.isAuthenticated, clientController.selectClients, (req, res)=>{
                res.render('Ubicaciones/formCreateUbi', {user: req.user, clientes: req.clientes, clienteSelected: req.query.cliente, flag: req.query.flag})
            })
            //#3.3.2.2. FUNCION QUE REGISTRA LA NUEVA UBICACION
            router.post('/createUbi', ubicacionesController.createUbicacion)
        //*- FUNCION #3.3.3. PERFIL DE UBICACION
            //#3.3.3.1. PAGINA DE PERFIL DE CLIENTE
            router.get('/perfilUbicacion', authController.isAuthenticated, ubicacionesController.selectUbicacion, areasController.selectAreas, contactosController.selectContactsUbi, authController.selectProyectos, cotizacionesController.selectCotizaciones, (req, res)=>{
                res.render('Ubicaciones/perfilUbi', {user: req.user, ubicacion: req.ubicacion, areas: req.areas, contactos: req.contactos, proyectos: req.proyectos, cotizaciones: req.cotizaciones, clienteSelected: req.query.cliente, flag: req.query.flag})
            })
            //#3.3.3.2. FUNCION QUE CAMBIA EL NOMBRE DE LA UBICACION
            router.get('/cambiarNombreUbi', ubicacionesController.editNombreUbicacion)
            //#3.3.3.3. FUNCION QUE CAMBIA LA DIRECCION DE LA UBICACION
            router.get('/cambiarDireccionUbi', ubicacionesController.editDireccionUbicacion)
            //#3.3.3.4. GESTIONAR LAS AREAS DE LA UBICACION
                //#3.3.3.4.1. FORMULARIO DE REGISTRO DE AREA
                router.get('/formcreatearea', authController.isAuthenticated, ubicacionesController.selectUbicacion, (req, res)=>{
                    res.render('Areas/formCreateArea', {user: req.user, ubicacion: req.ubicacion, clienteSelected: req.query.cliente, flag: req.query.flag})
                })
                //#3.3.3.4.2. FUNCION QUE REGISTRA EL AREA
                router.post('/createArea', areasController.createArea)
                //#3.3.3.4.3. FUNCION QUE ELIMINA EL AREA
                router.get('/deleteArea', areasController.deleteArea)
                //#3.3.3.4.4. FORMULARIO PARA EDITAR EL AREA
                router.get('/editararea', authController.isAuthenticated, areasController.selectArea, (req, res)=>{
                    res.render('Areas/editArea', {user: req.user, area: req.area, ubicacion: req.query.ubicacion, clienteSelected: req.query.cliente, flag: req.query.flag})
                })
                //#3.3.3.4.5. FUNCION QUE GUARDA LOS CAMBIOS 
                router.post('/editArea', areasController.editArea)
            //#3.3.3.5. GESTIONAR COTIZACIONES A NIVEL UBICACION
                //#3.3.3.5.1. CREAR O REGISTRAR NUEVA COTIZACION
                    //3.3.3.5.1.1. FORMULARIO
                    router.get('/formCotUbi', authController.isAuthenticated, authController.selectProyectos, (req, res)=>{
                        res.render('Ubicaciones/fromCotUbi', {user: req.user, proyectos: req.proyectos, ubicacion: req.query.ubicacion, cliente: req.query.cliente, flag: req.query.flag})
                    })
                    //3.3.3.5.1.2. FUNCION
                    router.post('/addCotUbi', ubicacionesController.addCotUbi)
                //#3.3.3.5.2. ELIMINAR COTIZACION
                router.get('/deleteCotiUbi', ubicacionesController.deleteCotizacion) 
            //#3.3.3.6. GESTION DE CONTACTOS EN LA UBICACION
                //3.3.3.6.1. RELACIONAR CONTACTO CON UBICACION
                    //3.3.3.6.1.1. FORMULARIO
                    router.get('/relacionConUbi', authController.isAuthenticated, ubicacionesController.selectUbicacion, contactosController.selectContacts, (req, res)=>{
                        res.render('Ubicaciones/addContact', {user: req.user, ubicacion: req.ubicacion, contactos: req.contactosCliente, clienteSelected: req.query.cliente, flag: req.query.flag})
                    })
                    //3.3.3.6.1.2. FUNCION 
                    router.post('/relacionarContactoUbicacion', authController.relateContWUbi)
                //3.3.3.6.2. ELIMINAR CONTACTO DE LA UBICACION
                router.get('/deleteContOfUbi', authController.deleteContOfUbi)
            //#3.3.3.7. GESTION DE PROYECTOS EN LA UBICACIÓN
                //#3.3.3.7.1. ELIMINAR PROYECTO
                router.get('/deleteProyectoUbi', proyectosController.deleteProyectoUbicacion)
        //*- FUNCION #3.3.4. ELIMINAR UBICACION
            //#3.3.4.1. FUNCION QUE ELIMINA LA UBICACION
            router.get('/deleteUbi/:folio', ubicacionesController.deleteUbicacion)
    //SECCION #3.4. PROYECTOS
        //*- FUNCION #3.4.1. ADMINISTRACION DE PROYECTOS
            //#3.4.1.1. PAGINA PRINCIPAL
            router.get('/adminproyectos', authController.isAuthenticated, authController.selectProyectos, (req, res)=>{
                res.render('Proyectos/proyectosAdmin', {user: req.user, proyectos: req.proyectos, flag: req.flag})
            })
        //*- FUNCION #3.4.2. CREAR O REGISTRAR PROYECTO
            //#3.4.2.1. FORMULARIO
            router.get('/formcreateproyect', authController.isAuthenticated, clientController.selectClient, ubicacionesController.selectUbicaciones, (req, res)=>{
                res.render('Proyectos/formCreateProyect', {user: req.user, cliente: req.cliente, ubicaciones: req.ubicaciones, ubicacion: req.query.ubicacion, flag: req.query.flag})
            })
            //#3.4.2.2. FUNCION
            router.post('/createProject', authController.createProject)
        //*- FUNCION #3.4.3. PERFIL DE PROYECTO
            //#3.4.3.1. PAGINA DE PERFIL
            router.get('/profileProyect', authController.isAuthenticated, authController.selectProyect, authController.selectEtapasProyecto, authController.selectRolesProyecto, authController.selectContactsProyect, cotizacionesController.selectCotizaciones, (req, res) =>{
                res.render('Proyectos/profileProyect', {user: req.user, proyecto: req.proyecto, etapas: req.etapas, roles: req.roles, contactos: req.contactos, cotizaciones: req.cotizaciones, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
            })
            //#3.4.3.2. FUNCION EDITAR NOMBRE
            router.get('/cambiarNombreProyecto', proyectosController.cambiarNombreProyecto)
            //#3.4.3.3. GESTION DE ETAPAS DE PROYECTO
                //#3.4.3.3.1. CREAR O REGISTRAR ETAPA
                    //#3.4.3.3.1.1. FORMULARIO
                    router.get('/formaddetapa', authController.isAuthenticated, authController.selectProyect, authController.selectAreasProyect, (req, res)=>{
                        res.render('Proyectos/formAddEtapa', {user: req.user, proyecto: req.proyecto, areas: req.areas, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
                    })
                    //#3.4.3.3.1.2. FUNCION
                    router.post('/addEtapa', proyectosController.addEtapa)
                //#3.4.3.3.2. EDITAR ETAPA
                    //#3.4.3.3.2.1. FORMULARIO
                    router.get('/editarEtapa', authController.isAuthenticated, proyectosController.selectEtapa, authController.selectAreasProyect, (req, res)=>{
                        res.render('Proyectos/editarEtapa', {user: req.user, etapa: req.etapa, areas: req.areas, proyecto: req.query.proyecto, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
                    })
                    //#3.4.3.3.2.2. FUNCION
                    router.post('/editEtapa', proyectosController.editarEtapa)
                //#3.4.3.3.3. ELIMINAR ETAPA - FUNCION
                router.get('/deleteEtapa', proyectosController.deleteEtapa)
                //#3.4.3.3.4. GESTIONAR TAREAS - ETAPA
                    //#3.4.3.3.4.1. PAGINA PRINCIPAL
                    router.get('/tareasetapa', authController.isAuthenticated, proyectosController.selectEtapa, tareasController.selectTareasEtapa, (req, res)=>{
                        res.render('Proyectos/Tareas/tareasAdmin', {user: req.user, etapa: req.etapa, tareas: req.tareas, proyecto: req.query.proyecto, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
                    })
                    //#3.4.3.3.4.2. CREAR O REGISTRAR TAREA
                        //#3.4.3.3.4.2.1. FORMULARIO
                        router.get('/formaddtask', authController.isAuthenticated, proyectosController.selectEtapa, tareasController.selectTiposTarea, (req, res)=>{
                            res.render('Proyectos/Tareas/formAddTask', {user: req.user, etapa: req.etapa, tipos: req.tipos, proyecto: req.query.proyecto, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
                        })
                        //#3.4.3.3.4.2.2. FUNCION
                        router.post('/createTarea', tareasController.createTarea)
                    //#3.4.3.3.4.3. EDITAR TAREA
                        //#3.4.3.3.4.3.1. FORMULARIO
                        router.get('/editarTarea', authController.isAuthenticated, tareasController.selectTarea, tareasController.selectTiposTarea, (req, res)=>{
                            res.render('Proyectos/Tareas/editarTarea', {user: req.user, tarea: req.tarea, tipos: req.tipos, etapa: req.query.etapa, proyecto: req.query.proyecto, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
                        })
                        //#3.4.3.3.4.3.2. FUNCION
                        router.post('/editTarea', tareasController.editarTarea)
                    //#3.4.3.3.4.4. ASIGNAR TAREA
                        //#3.4.3.3.4.4.1. FORMULARIO
                        router.get('/asignarTarea', authController.isAuthenticated, tareasController.validateTarea, tareasController.usuariosAsignados, (req, res)=>{
                            res.render('Proyectos/Tareas/asignTask', {user: req.user, tarea: req.tarea, usuarios: req.usuarios, etapa: req.query.etapa, proyecto: req.query.proyecto, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
                        })
                        //#3.4.3.3.4.4.2. FUNCION
                        router.post('/asignTask', tareasController.asignarTarea)
                    //#3.4.3.3.4.5. REASIGNAR TAREA
                        //#3.4.3.3.4.5.1. FORMULARIO
                        router.get('/editarAsignacionTarea', authController.isAuthenticated, tareasController.selectAsignTask, tareasController.usuariosAsignados, (req, res)=>{
                            res.render('Proyectos/Tareas/editarAsign', {user: req.user, asignacion: req.asignacion, usuarios: req.usuarios, etapa: req.query.etapa, proyecto: req.query.proyecto, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
                        })
                        //#3.4.3.3.4.5.2. FUNCION
                        router.post('/reasignTask', tareasController.editarAsignacion)
                    //#3.4.3.3.4.6. ELIMINAR TAREA - FUNCION
                    router.get('/deleteTask', tareasController.deleteTarea)
                    //#3.4.3.3.4.7. Mostrar Asignacion de tarea
                    router.get('/showInfoTarea', tareasController.showAsignTarea)
            //#3.4.3.4. GESTION DE ROLES
                //#3.4.3.4.1. ASIGNAR ROLES
                    //#3.4.3.4.1.1. FORMULARIO
                    router.get('/formasignroles', authController.isAuthenticated, authController.selectProyect, authController.selectUsers, authController.selectRoles, (req, res)=>{
                        res.render('Proyectos/formAsignRol', {user: req.user, proyecto: req.proyecto , usuarios: req.usuarios, roles: req.roles, ubicacion: req.query.ubicacion, cliente: req.query.cliente, flag: req.query.flag, permisos: req.query.permisos})
                    })
                    //#3.4.3.4.1.2. FUNCION
                    router.post('/asignRol', proyectosController.asignRolProyect)
                //#3.4.3.4.2. ELIMINAR ROLES - FUNCION
                router.get('/deleteRol', proyectosController.deleteRol)
            //#3.4.3.5. GESTION DE COTIZACIONES
                //#3.4.3.5.1. CREAR COTIZACION - FUNCION
                router.get('/createcotizacionProyecto', proyectosController.createCotizacionProyecto)
                //#3.4.3.5.2. ELIMINAR COTIZACION - FUNCION
                router.get('/deleteCotiProy', proyectosController.deleteCotizacion)
            //#3.4.5.6. ELIMINAR PROYECTO
                router.get('/deleteProyectoGrl', proyectosController.deleteProyectoGrl)
        //*- FUNCION #3.4.4. VIATICOS DE PROYECTO
            //#3.4.4.1. PAGINA PRINCIPAL
            router.get('/proyectViaticos', authController.isAuthenticated, authController.selectProyect, authController.datosViaticosProyectos, authController.selectDepositosProyecto, authController.selectComprobacionesProyecto, (req, res)=>{
                res.render('Proyectos/Viaticos/viaticosAdmin', {user: req.user, proyecto: req.proyecto, datos: req.datos, depositos: req.depositos, comprobaciones: req.comprobaciones, flag: req.query.flag, ubicacion: req.query.ubicacion, cliente: req.query.cliente, permisos: req.query.permisos})
            })
            //#3.4.4.2. ASIGNAR VIATICOS
                //#3.4.4.2.1. FORMULARIO
                router.get('/formassignViatics', authController.isAuthenticated, authController.selectRolesProyecto, (req, res)=>{
                    res.render('Proyectos/Viaticos/assignViaticos', {user: req.user, roles: req.roles, proyecto: req.query.proyecto, cliente: req.query.cliente, ubicacion: req.query.ubicacion, flag: req.query.flag, permisos: req.query.permisos})
                })
                //#3.4.4.2.2. FUNCION
                router.post('/assignViaticsProy', viaticosController.assignViaticosProyect)
            //#3.4.4.3. EXPORTAR INFORMACIÓN DE PROYECTO
            router.get('/exportDataProyecto', authController.isAuthenticated, authController.selectDepositosProyecto, authController.selectComprobacionesProyecto, (req, res)=>{
                res.render('Proyectos/Viaticos/exportData', {user: req.user, proyecto: req.query.proyecto, data: req.query.data, depositos: req.depositos, comprobaciones: req.comprobaciones, flag: req.query.flag, ubicacion: req.query.ubicacion, cliente: req.query.cliente, permisos: req.query.permisos})
            })
            //#3.4.4.4. DEFINIR PRESUPUESTO
            router.get('/definirPresupuesto', viaticosController.definirPresupuesto)
            //#3.4.4.5. ELIMINAR UN REGISTRO
                //#3.4.4.5.1. ELIMINAR DEPOSITO
                router.get('/deleteDepositoViaticosProyecto', viaticosController.deleteDepositoProyect)
                //#3.4.4.5.2. ELIMINAR COMPROBANTE
                router.get('/deleteComprobanteProyecto', viaticosController.deleteComprobanteProyecto)
        //*- FUNCION #3.4.5. INVENTARIO PROYECTO
            //#3.4.5.1. ADMINISTRAR INVENTARIO
            router.get('/proyectosInvent', authController.isAuthenticated, authController.selectProyect, productosController.selectInventProyecto, (req, res)=>{
                res.render('InventarioProyectos/proyInventario', {user: req.user, proyecto: req.proyecto, inventario: req.inventario, flag: req.query.flag, ubicacion: req.query.ubicacion, cliente: req.query.cliente, permisos: req.query.permisos})
            })
            //#3.4.5.2. AGREGAR ELEMENTOS
                //#3.4.5.2.1. FORMULARIO
                router.get('/moverInventProy', authController.isAuthenticated, authController.selectProyect, authController.selectInvent, unidadesController.selectUnits, (req,res)=>{
                    res.render('InventarioProyectos/formAddElements', {user: req.user, proyecto: req.proyecto, inventario: req.inventario, unidades: req.unidades, flag: req.query.flag, ubicacion: req.query.ubicacion, cliente: req.query.cliente, permisos: req.query.permisos})
                })
                //#3.4.5.2.2. FUNCION
                router.post('/addProduct2Proyecto', inventarioController.addProduct2Proyecto)
            //#3.4.5.3. EDITAR ELEMENTOS
            router.get('/modificarProyectInvent', inventarioController.modificarInventProy)
            //#3.4.5.4. REGRESAR TODO AL INVENTARIO
            router.get('/returnAll2InventProy', inventarioController.returnAll2Invent)
    //SECCION #3.5. TAREAS
        //*- FUNCION #3.5.1. ADMINISTRACION DE TAREAS
            //#3.5.1.1. VISUALICACION DEL DASHBOARD
            router.get('/admintareas', authController.isAuthenticated, tareasController.selectTareasAdmin, tareasController.obtenerReportesAdmin,(req, res)=>{
                res.render('Tareas/adminTareas', {user: req.user, tareas: req.tareas, reportes: req.reportes})
            })
        //*- FUNCION #3.5.2. ASIGNAR TAREA
            //#3.5.2.1. FORMULARIO PARA ASIGNAR TAREA A UN USUARIO
            router.get('/assignAdminTask', authController.isAuthenticated, tareasController.validateTarea, tareasController.usuariosAsignados, (req, res)=>{
                res.render('Tareas/assignTask', {user: req.user, tarea: req.tarea, usuarios: req.usuarios})
            })
            //#3.5.2.2. FUNCION PARA ASIGNAR TAREA
            router.post('/asignTaskAdmin', tareasController.asignarTareaAdmin)
        //*- FUNCION #3.5.3. CREAR TAREA
            //#3.5.3.1. FORMULARIO PARA CREAR TAREA
            router.get('/crearTareaAdmin', authController.isAuthenticated, authController.selectProyectos, authController.selectAllEtapas, tareasController.selectTiposTarea, (req, res)=>{
                res.render('Tareas/formCreateTask', {user: req.user, proyectos: req.proyectos, etapas: req.etapas, tipos: req.tipos})
            })
            //#3.5.3.2. FUNCION PARA REGISTRAR TAREA
            router.post('/createTareaAdmin', tareasController.createTareaAdmin)
        //*- FUNCION #3.5.4. RECHAZAR REPORTE DE TAREA
            //#3.5.4.1. FUNCION QUE RECHAZA EL REPORTE ENTREGADO
            router.get('/declineReportAdmin', tareasController.declineReportAdmin)
        //*- FUNCION #3.5.5. MARCAR COMO INCOMPLETA
            //#3.5.5.1. FUNCION QUE MARCA COMO INCOMPLETA LA TAREA
            router.get('/checkAsIncAdmin', tareasController.checkAsIncAdmin)
        //*- FUNCION #3.5.6. ELIMINAR TAREA
            //#3.5.6.1. FUNCION QUE ELIMINA LA TAREA, REPORTE Y ASIGNACION
            router.get('/deleteTareaAdmin', tareasController.deleteTareaAdmin)
//MODULO #4 - INVENTARIO
    //SECCION #4.1. PROVEEDORES
        //*- FUNCION #4.1.1. ADMINISTRACION DE PROVEEDORES
            //#4.1.1.1. PAGINA DE ADMINISTRACION
            router.get('/adminproveedores', authController.isAuthenticated, proveedoresController.selectProvs, (req, res) =>{
                res.render('Proveedores/provAdmin', {user: req.user, proveedores: req.proveedores})
            })
        //*- FUNCION #4.1.2. CREAR O REGISTRAR UN NUEVO PROVEEDOR
            //#4.1.2.1. FORMULARIO DE REGISTRO
            router.get('/formcreateprov', authController.isAuthenticated, (req, res)=>{
                res.render('Proveedores/formCreateProv', {user: req.user})
            })
            //#4.1.2.2. FUNCION QUE REGISTRA AL PROVEEDOR
            router.post('/createProv', proveedoresController.createProv)
        //*- FUNCION #4.1.3. EDITAR PROVEEDOR
            //#4.1.3.1. FORMULARIO PARA EDITAR PROVEEDOR
            router.get('/editarproveedor', authController.isAuthenticated, proveedoresController.selectProveedor, (req, res)=>{
                res.render('Proveedores/editProv', {user: req.user, proveedor: req.proveedor})
            })
            //#4.1.3.2. FUNCION QUE GUARDA LOS CAMBIOS
            router.post('/editProv', proveedoresController.editProv)
        //*- FUNCION #4.1.4. GESTION O PERFIL DE PROVEEDOR
            //#4.1.4.1. PAGINA DE PERFIL
            router.get('/perfilProveedor', authController.isAuthenticated, proveedoresController.selectProveedor, proveedoresController.selectMarcasProveedor, proveedoresController.selectProductosProveedor, (req, res)=>{
                res.render('Proveedores/profileProv', {user: req.user, proveedor: req.proveedor, marcas: req.marcas, productos: req.productos})
            })
            //#4.1.4.2. GESTION DE MARCAS-PROVEEDOR
                //#4.1.4.2.1. AÑADIR MARCA AL PROVEEDOR
                    //#4.1.4.2.1.1. FORMULARIO
                    router.get('/relateMarcaProveedor', authController.isAuthenticated, marcasController.selectBrands, (req, res)=>{
                        res.render('Proveedores/formRelateMarcaProveedor', {user: req.user, marcas: req.marcas, proveedor: req.query.proveedor})
                    })
                    //#4.1.4.2.1.2. FUNCION QUE GUARDA EL CAMBIO
                    router.post('/relacionarMarcaProveedor', proveedoresController.relateMarcaProveedor)
                //#4.1.4.2.2. ELIMINAR MARCA DEL PROVEEDOR
                router.get('/deleteMarcaProveedor', proveedoresController.deleteMarcaProveedor)
        //*- FUNCION 4.1.5. ELIMINAR PROVEEDOR
            //#4.1.5.1. FUNCION QUE ELIMINA AL PROVEEDOR
            router.get('/deleteProv/:folio', proveedoresController.deleteProv)
    //SECCION #4.2. MARCAS
        //*- FUNCION #4.2.1. ADMINISTRACION DE MARCAS
            //#4.2.1.1. PAGINA PRINCIPAL
            router.get('/adminmarcas', authController.isAuthenticated, marcasController.selectBrands, (req, res)=>{
                res.render('Marcas/marcasAdmin', {user: req.user, marcas: req.marcas})
            })
        //*- FUNCION #4.2.2. CREAR O REGISTRAR MARCAS
            //#4.2.2.1. FORMULARIO DE REGISTRO
            router.get('/formcreatemarca', authController.isAuthenticated, (req, res) =>{
                res.render('Marcas/formCreateBrand', {user: req.user})
            })
            //#4.2.2.2. FUNCION QUE REGISTRA LA MARCA
            router.post('/createBrand', marcasController.createBrand)
        //*- FUNCION #4.2.3. PERFIL DE MARCA
            //#4.2.3.1. PAGINA DE PERFIL
            router.get('/perfilMarca', authController.isAuthenticated, marcasController.selectBrand, marcasController.selectProveedoresMarca, marcasController.selectProductosMarca, (req, res)=>{
                res.render('Marcas/profileMarca', {user: req.user, marca: req.marca, proveedores: req.proveedores, productos: req.productos})
            })
            //#4.2.3.2. CAMBIAR NOMBRE DE MARCA
            router.get('/cambiarNombreMarca', marcasController.editNombreMarca)
            //#4.2.3.3. GESTION DE PROVEEDORES
                //#4.2.3.3.1. AÑADIR PROVEEDOR DE LA MARCA
                    //#4.2.3.3.1.1. FORMULARIO
                    router.get('/relateProveedorMarca', authController.isAuthenticated, proveedoresController.selectProvs, (req, res)=>{
                        res.render('Marcas/formRelateProveedorMarca', {user: req.user, proveedores: req.proveedores, marca: req.query.marca})
                    })
                    //#1.2.3.3.1.2. FUNCION
                    router.post('/relacionarProveedorMarca', marcasController.relateProveedorMarca)
                //#4.2.3.3.2. ELIMINAR PROVEEDOR DE LA MARCA
                router.get('/deleteProveedorMarca', marcasController.deleteProveedorMarca)
        //*- FUNCION #4.2.4. ELIMINAR MARCA
            //#4.2.4.1. FUNCION QUE ELIMINA LA MARCA
            router.get('/deleteMarca/:folio', marcasController.deleteBrand)
    //SECCION #4.3. PRODUCTOS
        //*- FUNCION #4.3.1. ADMINISTRACION DE PRODUCTOS
            //#4.3.1.1. PAGINA DE ADMINISTRACION
            router.get('/adminproductos', authController.isAuthenticated, productosController.selectProducts, (req, res)=>{
                res.render('Productos/productAdmin', {user: req.user, productos: req.productos})
            })
        //*- FUNCION #4.3.2. CREAR O REGISTRAR UN NUEVO PRODUCTO
            //#4.3.2.1. FORMULARIO
            router.get('/formcreateproducts', authController.isAuthenticated, productosController.selectCategoriasProduct, productosController.selectTipoProducto, marcasController.selectBrands, (req, res)=>{
                res.render('Productos/formCreateProduct', {user: req.user, categorias: req.categorias, tipos: req.tipos, marcas: req.marcas})
            })
            //#4.3.2.2. FUNCION QUE REGISTRA
            router.post('/createProduct', productosController.createProduct)
        //*- FUNCION #4.3.3. EDITAR PRODUCTO
            //#4.3.3.1. FORMULARIO
            router.get('/editarproducto/:folio', authController.isAuthenticated, productosController.selectProduct, productosController.selectCategoriasProduct, productosController.selectTipoProducto, marcasController.selectBrands, (req, res)=>{
                res.render('Productos/editProduct', {user: req.user, producto: req.producto, categorias: req.categorias, tipos: req.tipos, marcas: req.marcas})
            })
            //#4.3.3.2. FUNCION
            router.post('/editProduct', productosController.editProduct)
        //*- FUNCION #4.3.4. CREAR TIPO DE PRODUCTO
            //#4.3.4.1. FUNCION
            router.get('/createTipo/:nombre', productosController.createTipoProducto)
        //*- FUNCION #4.3.5. CREAR CATEGORIA
            //#4.3.5.1. FUNCION
            router.get('/createCategoria/:nombre', productosController.createCategoriaProducto)
        //*- FUNCION #4.3.6. ELIMINAR PRODUCTO
            //#4.3.6.1. FUNCION
            router.get('/deleteProduct/:folio', productosController.deleteProduct)
    //SECCION #4.4. SERVICIOS
        //*- FUNCION #4.4.1. ADMINISTRACION DE SERVICIOS
            //#4.4.1.1. PAGINA PRINCIPAL
            router.get('/adminservicios', authController.isAuthenticated, serviciosController.selectServicios, (req, res)=>{
                res.render('Servicios/serviciosAdmin', {user: req.user, servicios: req.servicios})
            })
        //*- FUNCION #4.4.2. CREAR O REGISTRAR SERVICIOS
            //#4.4.2.1. FORMULARIO
            router.get('/formcreateservicios', authController.isAuthenticated, productosController.selectCategoriasProduct, (req, res)=>{
                res.render('Servicios/formCreateServicio', {user: req.user, categorias: req.categorias})
            })
            //#4.4.2.2. FUNCION
            router.post('/createService', serviciosController.createServicio)
        //*- FUNCION #4.4.3. EDITAR SERVICIO
            //#4.4.3.1. FORMULARIO
            router.get('/editarservicio/:folio', authController.isAuthenticated, serviciosController.selectServicio, productosController.selectCategoriasProduct, (req, res)=>{
                res.render('Servicios/editServicio', {user: req.user, servicio: req.servicio, categorias: req.categorias})
            })
            //#4.4.3.2. FUNCION
            router.post('/editService', serviciosController.editServicio)
        //*- FUNCION #4.4.4. ELIMINAR SERVICIO
            //#4.4.4.1. FUNCION
            router.get('/deleteServicio/:folio', serviciosController.deleteServicio)
    //SECCION #4.5. INVENTARIO
        //*- FUNCION #4.5.1. ADMINISTRAR INVENTARIO 
            //#4.5.1.1. PAGINA PRINCIPAL
            router.get('/admininventario', authController.isAuthenticated, authController.selectInvent, (req, res)=>{
                res.render('Inventario/inventAdmin', {user: req.user, inventario: req.inventario})
            })
        //*- FUNCION #4.5.2. REGISTRAR PRODUCTO EN INVENTARIO
            //#4.5.2.1. FORMULARIO
            router.get('/formadd2invent', authController.isAuthenticated, productosController.selectProducts, unidadesController.selectUnits, (req, res)=>{
                res.render('Inventario/formMoveInvent', {user: req.user, productos: req.productos, unidades: req.unidades})
            })
            //#4.5.2.2. FUNCION
            router.post('/moverInventario', authController.moverInventario)
        //*- FUNCION #4.5.2-1. EDITAR REGISTRO DEL INVENARIO
            //#4.5.2-1.1 FUNCION
            router.get('/modificarInvent', inventarioController.editFromInvent)
        //*- FUNCION #4.5.2-2. ELIMINAR REGISTRO DEL INVENARIO
            //#4.5.2-1.1 FUNCION
            router.get('/deleteFromInvent', inventarioController.deleteFromInvent)
        //*- FUNCION #4.5.3. GESTIONAR UNIDADES
            //#4.5.3.1. ADMINISTRADOR DE UNIDADES
            router.get('/adminunidades', authController.isAuthenticated, unidadesController.selectUnits, (req, res)=>{
                res.render('Unidades/unidadesAdmin', {user: req.user, unidades: req.unidades})
            })
            //#4.5.3.2. CREAR O REGISTRAR NUEVA UNIDAD
                //#4.5.3.2.1. FORMULARIO
                router.get('/formcreateunit', authController.isAuthenticated, (req, res)=>{
                    res.render('Unidades/formCreateUnit', {user: req.user})
                })
                //#4.5.3.2.2. FUNCION
                router.post('/createUnit', unidadesController.createUnit)
            //#4.5.3.3. EDITAR UNIDAD
                //#4.5.3.3.1. FORMULARIO
                router.get('/editarunidad/:folio', authController.isAuthenticated, unidadesController.selectUnit, (req, res)=>{
                    res.render('Unidades/editUnit', {user: req.user, unidad: req.unidad})
                })
                //#4.5.3.3.2. FUNCION
                router.post('/editUnit', unidadesController.editUnit)
            //#4.5.3.4. ELIMINAR UNIDAD
            router.get('/deleteUnidad/:folio', unidadesController.deleteUnit)
        //*- FUNCION #4.5.4. REPORTE DE MOVIMIENTOS
        router.get('/movimientosInventarioGrl', authController.isAuthenticated, authController.reporteGrlInvent, (req, res)=>{
            res.render('Inventario/movesInventGrl', {user: req.user, movimientos: req.movimientos})
        })

//MODULO #5 - VIATICOS | ADMINISTRADOR
    //SECCION #5.1. RESUMEN DE MOVIMIENTOS
        //*- FUNCION #5.1.1. ADMINISTRACION DE MOVIMIENTOS GENERAL
            //#5.1.1.1. PAGINA PRINCIPAL
            router.get('/adminViaticosGrl', authController.isAuthenticated, viaticosController.stadisticsViatics, viaticosController.selectDepositos, viaticosController.selectComprobaciones, (req, res)=>{
                res.render('Viaticos/viaticosAdmin', {user: req.user, datos: req.datos, depositos: req.depositos, comprobaciones: req.comprobaciones, inicio: req.query.inicio, termino: req.query.termino})
            })
        //*- FUNCION #5.1.2. ASIGNAR VIATICOS
            //#5.1.2.1. FORMULARIO
            router.get('/asignacionViaticos', authController.isAuthenticated, authController.selectUsers, authController.selectProyectos, (req, res)=>{
                res.render('Viaticos/formAsignViatics', {user: req.user, usuarios: req.usuarios, proyectos: req.proyectos})
            })
            //#5.1.2.2. FUNCION
            router.post('/assignViatics', viaticosController.assignViaticos)
        //*- FUNCION #5.1.3. GENERAR REPORTE GENERAL
            //#5.1.3.1. PAGINA DE REPORTES
            router.get('/exportData', authController.isAuthenticated, viaticosController.selectDepositos, viaticosController.selectComprobaciones, (req, res)=>{
                res.render('Viaticos/exportData2', {user: req.user, depositos: req.depositos, comprobaciones: req.comprobaciones, data: req.query.data, usuario: req.query.usuario})
            })
        //*- FUNCION #5.1.4. ELIMINAR COMPROBANTE
            //#5.1.4.1. FUNCION
            router.get('/deleteComprobanteGrl', viaticosController.deleteComprobanteGrl)
        //*- FUNCION #5.1.5. ELIMINAR DEPOSITO
            //#5.1.5.1. FUNCION
            router.get('/deleteDepositoGrl', viaticosController.deleteDepositoGrl)
    //SECCION #5.2. SEGUIMIENTO DE GASTOS
        //*- FUNCION #5.2.1. ADMINISTRACION DE CLAVES DE SEGUIMIENTO
            //#5.2.1.1. PAGINA PRINCIPAL
            router.get('/adminClaves', authController.isAuthenticated, authController.selectUsers, authController.selectClaves, authController.selectClave, authController.selectComprobantesClave, (req, res)=>{
                res.render('Viaticos/adminClavesGrl', {user: req.user, usuarios: req.usuarios, claves: req.claves, claveSelected: req.clave, rendido: req.rendido, comprobaciones: req.comprobaciones, isClave: req.query.clave})
            })
        //*- FUNCION #5.2.2. ELIMINAR COMPROBANTE
            //#5.2.2.1. FUNCION
            router.get('/deleteComprobanteClaveGrl', authController.deleteComprobanteClaveGrl)
    //SECCION #5.3. ASIGNAR VIATICOS

//MODULO #6 - VIATICOS | PERSONAL
    //SECCION #6.1. COMRPOBACIÓN Y DEPOSITOS
        //*- FUNCION #6.1.1. ADMINISTRACION DE VIATICOS
            //#6.1.1.1. PAGINA PRINCIPAL
            router.get('/adminViaticosPersonal', authController.isAuthenticated, authController.selectUser, viaticosController.selectDepositosUsuario, viaticosController.selectComprobacionesUsuario, (req, res)=>{
                res.render('Viaticos/adminViaticosPersonal', {user: req.user, usuario: req.usuario, depositos: req.depositos, comprobaciones: req.comprobaciones, inicio: req.query.inicio, termino: req.query.termino})
            })
        //*- FUNCION #6.1.2. SUBIR COMPROBANTES
            //#6.1.2.1. FORMULARIO
            router.get('/formLoadTicket', authController.isAuthenticated, viaticosController.selectClavesUsuario, (req, res)=>{
                res.render('Viaticos/loadTicket', {user: req.user, claves: req.claves, claveSelected: req.query.clave})
            })
            //#6.1.2.2. FUNCION
            router.post('/loadTicket', viaticosController.loadTicket)
        //*- FUNCION #6.1.3. EXPORTAR INFORMACION
            //#6.1.3.1. PAGINA DE EXPORTACION DE DEPOSITOS Y COMPROBANTES
            router.get('/exportDataUsuario', authController.isAuthenticated, viaticosController.selectDepositosUsuario, viaticosController.selectComprobacionesUsuario, (req, res)=>{
                res.render('Viaticos/exportData', {user: req.user, depositos: req.depositos, comprobaciones: req.comprobaciones, data: req.query.data, usuario: req.query.usuario, clave: req.query.clave})
            })
        //*- FUNCION #6.1.4. ELIMINAR COMPROBANTE
            //#6.1.4.1. FUNCION
            router.get('/deleteComprobanteUsuario', viaticosController.deleteComprobante)
    //SECCION #6.2. SEGUIMIENTO DE CLAVES
        //*- FUNCION #6.2.1. ADMINISTRACION DE CLAVES
            //#6.2.1.1. PAGINA PRINCIPAL
            router.get('/seguimientoClaves', authController.isAuthenticated, authController.selectClaveUsuario, authController.selectClave, authController.selectComprobantesClave, (req, res)=>{
                res.render('Viaticos/seguimientoClaves', {user: req.user, claves: req.claves, claveSelected: req.clave, rendido: req.rendido, comprobaciones: req.comprobaciones, isClave: req.query.clave})
            })
        //*- FUNCION #6.2.2. EXPORTAR INFORMACION
            //#6.2.2.1. PÁGINA DE EXPORTACION DE INFORMACION
            router.get('/exportDataClaves', authController.isAuthenticated, authController.selectComprobantesClave, (req, res)=>{
                res.render('Viaticos/exportData', {user: req.user, comprobaciones: req.comprobaciones, data: req.query.data, usuario: req.query.usuario, clave: req.query.clave})
            })
        //*- FUNCION #6.2.3. ELIMINAR COMPROBANTE
            //#6.2.3.1. FUNCION
            router.get('/deleteComprobanteClavePer', authController.deleteComprobanteClavePer)

//MODULO #7 - MIS TAREAS
    //SECCION #7.1. DASHBOARD DE MIS TAREAS
        //*- FUNCION #7.1.1. VISUALIZAR LAS TAREAS
            //#7.1.1.1. VISUALIZACIÓN DEL DASHBOARD
            router.get('/misTareas', authController.isAuthenticated, tareasController.selectInfoTareasUser, tareasController.obtenerReportes, (req, res)=>{
                res.render('Tareas/misTareas', {user: req.user, tareas: req.tareas, reportes: req.reportes})
            })
            //#7.1.1.2. ENTREGAR TAREA
            router.get('/entregarTarea', tareasController.entregarTarea)
            //#7.1.1.3. SUBIR REPORTE DE LAS TAREAS QUE LO AMERITEN
            router.get('/subirReporteTarea', tareasController.subirReporteTarea)
//MODULO #8 - MIS ASISTENCIAS
    //SECCION #8.1. DASHBOARD DE ASISTENCIAS
        //*- FUNCION #8.1.1. VISUALIZAR EL LISTADO
            //#8.1.1.1. VISUALOZACION DEL DASHBOARD
            router.get('/misAsistencias', authController.isAuthenticated, authController.reporteAsistencia, (req, res)=>{
                res.render('reporteAsistencia', {user: req.user, asistencias: req.asistencias, flag: req.query.flag})
            })
//MODULO #9 - MI INVENTARIO
    //SECCION #9.1. DAHSBOARD DE MI INVENTARIO
        //*- FUNCION #9.1.1. DE VISUALIZACION DEL INVENTARIO PERSONAL
            //#9.1.1.1. REGISTROS Y DASHBOARD PRINCIPAL
            router.get('/miInventario', authController.isAuthenticated, authController.selectUser, productosController.selectInventarioUser, (req, res)=>{
                res.render("Minventario/miInventario", {user: req.user, usuario: req.usuario, productos: req.productos, flag: req.query.flag})
            })
        //*- Funcion #9.1.2. REPORTE DE MOVIMIENTOS
            //#9.1.2.1. GENERAR REPORTE
            router.get('/movimientosInventarioPersonal', authController.isAuthenticated, authController.selectUser, productosController.reportePersonalInvent, (req, res)=>{
                res.render('Minventario/movesInventPer', {user: req.user, usuario: req.usuario, movimientos: req.movimientos, flag: req.query.flag})
            })
        //*- FUNCION #9.1.3. MOVER INVENTARIO
            //#9.1.3.1. Formulario para mover Inventario
            router.get('/moverInventUser', authController.isAuthenticated, authController.selectUser, authController.selectInvent, unidadesController.selectUnits, (req, res)=>{
                res.render('Minventario/formAddElements', {user: req.user, usuario: req.usuario, productos: req.inventario, unidades: req.unidades, flag: req.query.flag})
            })
            //#9.1.3.2. Funcion que agrega elementos al inventario
            router.post('/addProduct2User', usuarioController.addInvent2User)
        //*- FUNCION #9.1.4. ELIMINAR ITEM
            //#9.1.4.1. Devolver todas las existencias de un Item al Inventario
            router.get('/returnAll2Invent', usuarioController.returnAll2Invent)
        //*- FUNCION #9.1.5. MODIFICAR LA CANTIDAD DE UN ITEM EN POSESION
            //#9.1.5.1. Moficiar cantidad
            router.get('/modificarPersonalInvent', usuarioController.modificarInventPersonal)
//MODULO #10 - CIERRE SESION
    //Funcion #10.1. Cierre de sesion
    router.get('/logout', authController.logout)

//MODULO #11 - COTIZACIONES (MODULO NO EXPLICITO EN EL SISTEMA)
    //SECCION #11.1. ADMINISTRACION DE COTIZACION
        //*- FUNCION #11.1.1. PAGINA DE COTIZACION
            //#11.1.1.1. PAGINA PRINCIPAL
            router.get('/cotizacionMain', authController.isAuthenticated, clientController.selectClient, cotizacionesController.selectCotizacion, cotizacionesController.selectProductosCotizacion, cotizacionesController.selectServiciosCotizacion, (req, res)=>{
                res.render('Proyectos/Cotizaciones/mainCotizacion', {user: req.user, clienteSelected: req.cliente, cotizacion: req.cotizacion, costoPersonal: req.costoPersonal, subtotal_productos: req.subtotal_productos, subtotal_servicios: req.subtotal_servicios, subtotal: req.subtotal, total: req.total, productos: req.productos, servicios: req.servicios, proyecto: req.query.proyecto, flag: req.query.flag, cliente: req.query.cliente, ubicacion: req.query.ubicacion, permisos: req.query.permisos})
            })
        //*- FUNCION #11.1.2. EDITAR VALORES DE LA COTIZACION
            //#11.1.2.1. DEFINIR TASA DE RENDIMIENTO
            router.get('/definirTasa', cotizacionesController.definirTasa)
            //#11.1.2.2. DEFINIR IMPORTE DE TECNICO POR DIA
            router.get('/definirTecnico', cotizacionesController.definirTecnico)
            //#11.1.2.3. DEFINIR IMPORTE DE SUPERVISOR POR DIA
            router.get('/definirSupervisor', cotizacionesController.definirSupervisor)
            //#11.1.2.4. DEFINIR TASA DE INTERESES
            router.get('/definirIntereses', cotizacionesController.definirIntereses)
        //*- FUNCION #11.1.3. ADMINISTRAR PRODUCTOS
            //#11.1.3.1. AGREGAR PRODUCTOS
                //#11.1.3.1.1. FORMULARIO
                router.get('/formaddproduct', authController.isAuthenticated, productosController.selectProducts, (req, res)=>{
                    res.render('Proyectos/Cotizaciones/addProduct', {user: req.user, productos: req.productos, cotizacion: req.query.cotizacion, proyecto: req.query.proyecto, ubicacion: req.query.ubicacion, cliente: req.query.cliente, flag: req.query.flag, permisos: req.query.permisos})
                })
                //#11.1.3.1.2. FUNCION
                router.post('/addProductCot', cotizacionesController.addProducto)
            //#11.1.3.2. EDITAR PRODUCTO
                //#11.1.3.2.1. FORMULARIO
                router.get('/editarProductoCotizacion', authController.isAuthenticated, cotizacionesController.selectProductoCoti, (req, res)=>{
                    res.render('Proyectos/Cotizaciones/editProduct', {user: req.user, producto: req.producto, cotizacion: req.query.cotizacion, proyecto: req.query.proyecto, ubicacion: req.query.ubicacion, cliente: req.query.cliente, flag: req.query.flag, permisos: req.query.permisos})
                })
                //#11.1.3.2.2. FUNCION
                router.post('/editPorductCot', cotizacionesController.editarProductoCoti)
            //#11.1.3.3. ELIMINAR PRODUCTO - FUNCION
            router.get('/deleteProductCot', cotizacionesController.deleteProductCot)
        //*- FUNCION #11.1.4. ADMINISTRAR SERVICIOS
            //#11.1.4.1. AGREGAR SERVICIOS
                //#11.1.4.1.1. FORMULARIO
                router.get('/formaddservice', authController.isAuthenticated, serviciosController.selectServicios, (req, res)=>{
                    res.render('Proyectos/Cotizaciones/addService', {user: req.user, servicios: req.servicios, cotizacion: req.query.cotizacion, proyecto: req.query.proyecto, ubicacion: req.query.ubicacion, cliente: req.query.cliente, flag: req.query.flag, permisos: req.query.permisos})
                })
                //#11.1.4.1.2. FUNCION
                router.post('/addServiceCot', cotizacionesController.addService)
            //#11.1.4.2. EDITAR SERVICIOS
                //#11.1.4.2.1. FORMULARIO
                router.get('/editarServicioCotizacion', authController.isAuthenticated, cotizacionesController.selectServicioCoti, (req, res)=>{
                    res.render('Proyectos/Cotizaciones/editService', {user: req.user, servicio: req.servicio, cotizacion: req.query.cotizacion, proyecto: req.query.proyecto, ubicacion: req.query.ubicacion, cliente: req.query.cliente, flag: req.query.flag, permisos: req.query.permisos})
                })
                //#11.1.4.2.2. FUNCION
                router.post('/editServiceCot', cotizacionesController.editarServicioCoti)
            //#11.1.4.3. ELIMINAR SERVICIO - FUNCION
            router.get('/deleteServiceCot', cotizacionesController.deleteServiceCot)
    //SECCION #11.2 - GENERACION DE PDF PARA DESCARGAR
        //#FUNCION #11.2.1. PAGINA DE CONFIGURACION
            //#11.2.1.1. RUTA PARA CONFIGURAR LA COTIZACION
            router.get('/cotizacionPDF', authController.isAuthenticated, cotizacionesController.cotizacionPDF, cotizacionesController.selectProductosCotizacion, cotizacionesController.selectServiciosCotizacion, (req, res)=>{
                res.render('Proyectos/Cotizaciones/generarPDF', {user: req.user, cotizacion: req.registro, productos: req.productos, servicios: req.servicios})
            })
            //#11.2.1.2. RUTA PARA DEFNIR EL NUMERO DE COTIZACION
            router.get('/definirNumeroPDFCotizacion', cotizacionesController.definirNumeroPDFCotizacion)
            //#11.2.1.3. RUTA PARA DEFNIR EL DESTINATARIO DE COTIZACION
            router.get('/definirDestinatarioPDFCotizacion', cotizacionesController.definirDestinatarioPDFCotizacion)
            //#11.2.1.4. RUTA PARA DEFNIR EL PUESTO DEL DESTINATARIO DE COTIZACION
            router.get('/definirPuestoDestinatarioPDFCotizacion', cotizacionesController.definirPuestoDestinatarioPDFCotizacion)
            //#11.2.1.5. RUTA PARA DEFNIR EL CLIENTE DE COTIZACION
            router.get('/definirClientePDFCotizacion', cotizacionesController.definirClientePDFCotizacion)
            //#11.2.1.6. RUTA PARA DEFNIR LA MONEDA DE COTIZACION
            router.get('/definirMonedaPDFCotizacion', cotizacionesController.definirMonedaPDFCotizacion)
            //#11.2.1.7. RUTA PARA DEFNIR LA UBICACION DE COTIZACION
            router.get('/definirUbicacionPDFCotizacion', cotizacionesController.definirUbicacionPDFCotizacion)
            //#11.2.1.8. RUTA PARA DEFNIR QUIEN SOLICITA LA COTIZACION
            router.get('/definirQuienSolicitaPDFCotizacion', cotizacionesController.definirQuienSolicitaPDFCotizacion)
            //#11.2.1.8. RUTA PARA DEFNIR NOTAS DE LA COTIZACION
            router.get('/definirNotasPDFCotizacion', cotizacionesController.definirNotasPDFCotizacion)
            //#11.2.1.9. RUTA PARA CAMBIAR EL EMISOR DE LA COTIZACION
            router.get('/definirEmisorPDFCotizacion', cotizacionesController.definirEmisorPDFCotizacion)
            //#11.2.1.10. RUTA PARA UN DESCARGAR PDF
            router.get('/descargarPDF', cotizacionesController.createPDFCot)
//MODULO #12 - MIS PROYECTOS
    //SECCION #12.1. - ADMINISTRACION DE MIS PROYECTOS
        //FUNCION #12.1.1. VISUALIZAR PROYECTOS EN LOS QUE EL USUARIO ESTA ACTIVO
            //#12.1.1.1. TABLA PRINCIPAL
            router.get('/misProyectos', authController.isAuthenticated, proyectosController.selectMisProyectos, (req, res)=>{
                res.render('Proyectos/misProyectos', {user: req.user, proyectos: req.proyectos})
            })


//FUNCIONES OBSOLETAS PENDIENTES DE REVISION PARA ELIMINARLAS
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
router.get('/deleteUser/:folio', authController.deleteUser)
router.get('/deleteCoti', cotizacionesController.deleteCotizacion)

module.exports = router