const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')
const { query } = require('../database/db')
const { nextTick } = require('process')

//FUNCIONES DE APOYO DEL SISTEMA DE CONTROLADORES
    function formatoFecha(fecha, formato) {
        const map = {
            ss: fecha.getSeconds(),
            nn: fecha.getMinutes(),
            hh: fecha.getHours(),
            dd: fecha.getDate(),
            mm: fecha.getMonth() + 1,
            yy: fecha.getFullYear().toString().slice(-2),
        }

        return formato.replace(/ss|nn|hh|dd|mm|yy|yyy/gi, matched => map[matched])
    }
    function showError(res, titulo, mensaje, ruta){
        res.render('Error/showInfo', {
            title: titulo,
            alert: true,
            alertTitle: 'INFORMACION',
            alertMessage: mensaje,
            alertIcon: 'info',
            showConfirmButton: true,
            timer: 8000,
            ruta: ruta
        })
    }
//MODULO #0 - INICIO DE SESION
    exports.login = async(req, res) =>{
        try {
            //Recibimos los valores del formulario y los almacenamos en constantes
            const user = req.body.user
            const pass = req.body.pass

            if(!user || !pass){ //Validamos que no haya campos vacios
                res.render('login', {
                    alert: true,
                    alertTitle: 'ADVERTENCIA',
                    alertMessage: 'No puede dejar campos en blanco',
                    alertIcon: 'info',
                    showConfirmButton: true,
                    timer: 8000,
                    ruta: 'login' 
                })
            }else{ //Seleccionamos toda la información del usuario
                conexion.query('SELECT * FROM cat001_usuarios WHERE usuario = ?', [user], async(error, results)=>{
                    if(error) console.log(error); //En caso que haya un error en la consulta lo mostramos por consola
                    //Validamos la contraseña ingresada por el usuario, con la correspondiente
                    if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))){
                        res.render('login', {
                            alert: true,
                            alertTitle: 'ERROR',
                            alertMessage: 'Usuario y/o contraseña incorrecta',
                            alertIcon: 'error',
                            showConfirmButton: true,
                            timer: 8000,
                            ruta: 'login' 
                        })
                    }else{//Inicio de sesion validado
                        //Guardamos algunos valores para generar la cookie de inicio de sesion
                        const id = results[0].folio //Guardamos el folio del usuario
                        const token = jwt.sign({id: id}, process.env.JWT_SECRETO, {
                            expiresIn: process.env.JWT_TIEMPO_EXPIRA
                        }) //Creamos un token para almacenar la información de la cookie
                        
                        //Creamos la cookie con el folio del usuario
                        const cookiesOptions = {
                            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRA * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        }
                        res.cookie('jwt', token, cookiesOptions)

                        //Redireccionamos al dashboard
                        res.render('login', {
                            alert: true,
                            alertTitle: 'Conexion exitosa',
                            alertMessage: '¡INICIO DE SESION EXITOSO!',
                            alertIcon: 'success',
                            showConfirmButton: false,
                            timer: 800,
                            ruta: `?folio=${id}`
                        })
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    exports.isAuthenticated = async(req, res, next) =>{
        if(req.cookies.jwt){
            try {
                const decode = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
                conexion.query('SELECT * FROM cat001_usuarios WHERE folio = ?', [decode.id], (error, results)=>{
                    if(!results){return next()}
                    req.user = results[0]
                    return next()
                })
            } catch (error) {
                console.log(error)
                return next()
            } 
        }else{
            res.redirect('/login')
        }
    }
    exports.logout = (req, res) =>{
        res.clearCookie('jwt')
        return res.redirect('/')
    }

//DASHBOARD - VIATICOS
    exports.selectLatsMoves = async(req, res, next)=>{
        try {
            conexion.query("SELECT * FROM viaticos_depositos_view001 WHERE id_bene = ? ORDER BY FOLIO DESC LIMIT 5", [req.query.folio], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    req.depositos = fila
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }

//CRUD PARA USUARIOS (Procesos de Admin y SuperAdmin)
    //Select de todos los usuarios
    exports.selectUsers = async(req, res, next) =>{
        try {
            conexion.query("SELECT * FROM cat001_usuarios", (error, filas)=>{
                if(error){
                    throw error;
                }else{
                    req.usuarios = filas
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    //Select de un solo usuario
    exports.selectUser = async(req, res, next)=>{
        try {
            conexion.query("SELECT * FROM cat001_usuarios WHERE folio = ?", [req.query.usuario], (error, fila)=>{
                if(error){
                    throw error;
                }else{
                    req.usuario = fila
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    //Crear usuario
    exports.createUser = async(req, res, next)=>{
        try {
            const passHash = await bcryptjs.hash(req.body.pass, 8)
            let data = {
                nombres: req.body.nombres,
                apellidos: req.body.apellidos,
                usuario: req.body.usuario,
                pass: passHash,
                telefono: req.body.telefono,
                email: req.body.email,
                documentacion: req.body.linkDoc,
                tipo_usuario: req.body.tipoUser    
            }
            let insert = "INSERT INTO cat001_usuarios SET ?"
            conexion.query(insert, data, function(error, results){
                if(error){
                    throw error
                }else{
                    res.redirect('/adminusers')
                    return next()    
                }
            })    
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.editUser = async(req, res, next)=>{
        try {
            let folio           = req.body.folio
            let nombres         = req.body.nombres 
            let apellidos       = req.body.apellidos
            let telefono        = req.body.telefono
            let email           = req.body.email
            let documentacion   = req.body.documentacion

            let sql = "UPDATE cat001_usuarios SET nombres = ?, apellidos = ?, telefono = ?, email = ?, documentacion = ? WHERE folio = ?"

            conexion.query(sql, [nombres, apellidos, telefono, email, documentacion, folio], function(error, results){
                if(error){
                    throw error
                }else{
                    res.redirect('/adminusers')
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.deleteUser = async (req, res, next)=>{
        try {
            const usuario = req.params.folio
            //Validamos Claves de Seguimiento
            conexion.query("SELECT folio FROM cat021_claves_seguimiento WHERE usuario = ?", [usuario], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    if(fila.length === 0){
                        //Validamos Operaciones
                        conexion.query("SELECT folio FROM cat022_operaciones WHERE id_bene = ? OR emisor = ?", [usuario, usuario], (error2, fila2)=>{
                            if(error2){
                                throw error2
                            }else{
                                if(fila2.length === 0){
                                    //Validamos reportes
                                    conexion.query("SELECT folio FROM op004_reporte WHERE usuario = ?", [usuario], (error3, fila3)=>{
                                        if(error3){
                                            throw error3
                                        }else{
                                            if(fila3.length === 0){
                                                //Validamos Roles
                                                conexion.query("SELECT folio FROM op005_roles WHERE usuario = ?", [usuario], (error4, fila4)=>{
                                                    if(error4){
                                                        throw error4
                                                    }else{
                                                        if(fila4.length === 0){
                                                            //Validamos asistencias
                                                            conexion.query("SELECT folio FROM op006_asistencia WHERE usuario = ?", [usuario], (error5, fila5)=>{
                                                                if(error5){
                                                                    throw error5
                                                                }else{
                                                                    if(fila5.length === 0){
                                                                        //Validamos Material
                                                                        conexion.query("SELECT folio FROM op013_material_usuario WHERE usuario = ?", [usuario], (error6, fila6)=>{
                                                                            if(error6){
                                                                                throw error6
                                                                            }else{
                                                                                if(fila6.length === 0){
                                                                                    //Validamos Tareas
                                                                                    conexion.query("SELECT folio FROM op014_tarea_usuario WHERE usuario = ?", [usuario], (error7, fila7)=>{
                                                                                        if(error7){
                                                                                            throw error7
                                                                                        }else{
                                                                                            if(fila7.length === 0){
                                                                                                //Validamos movimientos de inventario
                                                                                                conexion.query("SELECT folio FROM op016_movimientos_inventario WHERE usuario = ?", [usuario], (error8, fila8)=>{
                                                                                                    if(error8){
                                                                                                        throw error8
                                                                                                    }else{
                                                                                                        if(fila8.length === 0){
                                                                                                            conexion.query("DELETE FROM cat001_usuarios WHERE folio = ?", [usuario], (error9, fila9)=>{
                                                                                                                if(error9){
                                                                                                                    throw error9
                                                                                                                }else{
                                                                                                                    res.redirect('/adminusers')
                                                                                                                    return next()
                                                                                                                }
                                                                                                            })
                                                                                                        }else{
                                                                                                            showError(res, 'Imposible eliminar usuario', `No se ha podido eliminar al usuario ${usuario} porque ya ha realizado movimientos de material en el inventario`, 'adminusers')
                                                                                                            return next()
                                                                                                        }
                                                                                                    }
                                                                                                })
                                                                                            }else{
                                                                                                showError(res, 'Imposible eliminar usuario', `No se ha podido eliminar al usuario ${usuario} porque tiene tareas asignadas`, 'adminusers')
                                                                                                return next()
                                                                                            }
                                                                                        }
                                                                                    })
                                                                                }else{
                                                                                    showError(res, 'Imposible eliminar usuario', `No se ha podido eliminar al usuario ${usuario} porque tiene en su posesión material o herramienta`, 'adminusers')
                                                                                    return next()
                                                                                }
                                                                            }
                                                                        })
                                                                    }else{
                                                                        showError(res, 'Imposible eliminar usuario', `No se ha podido eliminar al usuario ${usuario} porque ya tuvo participacion en proyectos`, 'adminusers')
                                                                        return next()
                                                                    }
                                                                }
                                                            })
                                                        }else{
                                                            showError(res, 'Imposible eliminar usuario', `No se ha podido eliminar al usuario ${usuario} porque tiene roles asignados en algun proyecto`, 'adminusers')
                                                            return next()
                                                        }
                                                    }
                                                })
                                            }else{
                                                showError(res, 'Imposible eliminar usuario', `No se ha podido eliminar al usuario ${usuario} porque ya ha entregado reporte de tareas`, 'adminusers')
                                                return next()
                                            }
                                        }
                                    })
                                }else{
                                    showError(res, 'Imposible eliminar usuario', `No se ha podido eliminar al usuario ${usuario} porque ya ha tenido operaciones de viaticos`, 'adminusers')
                                    return next()
                                }
                            }
                        })
                    }else{
                        showError(res, 'Imposible eliminar usuario', `No se ha podido eliminar al usuario ${usuario} porque tiene viaticos asignados`, 'adminusers')
                        return next()
                    }
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
//FIN DEL CRUD PARA LA GESTION DE USUARIOS

exports.relateContWUbi = async(req, res, next)=>{
    try {
        //Primero validamos si la relacion no existe ya
        conexion.query("SELECT * FROM op015_contacto_ubicacion WHERE ubicacion = ? AND contacto = ?", [req.body.ubicacion, req.body.contacto], (error, fila)=>{
            if(error){
                throw error
            }else{
                //Validamos si el registro no existe
                let data = {
                    ubicacion: req.body.ubicacion,
                    contacto: req.body.contacto
                }
                
                let posibleRuta = ''
                if(req.body.flag == 1) {posibleRuta = `/perfilUbicacion?ubicacion=${data.ubicacion}&cliente=${req.body.cliente}&flag=${req.body.flag}`}
                else if(req.body.flag == 0){posibleRuta = `/perfilUbicacion?ubicacion=${data.ubicacion}&flag=${req.body.flag}`}
                
                if(fila.length === 0){
                    conexion.query("INSERT INTO op015_contacto_ubicacion SET ?", data, (error2, fila2)=>{
                        if(error2){
                            throw error2
                        }else{
                            res.redirect(posibleRuta)
                            return next()
                        }
                    })
                }else{
                    res.redirect(posibleRuta)
                    return next()
                }
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.deleteContOfUbi = async(req, res, next)=>{
    try {
        let posibleRuta = ''
        if(req.query.flag == 1) {posibleRuta = `/perfilUbicacion?ubicacion=${req.query.ubicacion}&cliente=${req.query.cliente}&flag=${req.query.flag}`}
        else if(req.query.flag == 0){posibleRuta = `/perfilUbicacion?ubicacion=${req.query.ubicacion}&flag=${req.query.flag}`}
        
        conexion.query("DELETE FROM op015_contacto_ubicacion WHERE folio = ?", [req.query.contacto], (err, fila)=>{
            if(err){
                throw err
            }else{
                res.redirect(posibleRuta)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}

//CRUD DEL INVENTARIO
    exports.selectInvent = async(req, res, next) =>{
        try {
            conexion.query("SELECT * FROM inventario_view001", (error, filas)=>{
                if(error){
                    throw error;
                }else{
                    req.inventario = filas
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.selectInventItem = async(req, res, next) =>{
        try {
            conexion.query("SELECT * FROM inventario_view001 WHERE folio = ?", [req.params.folio], (error, fila)=>{
                if(error){
                    throw error;
                }else{
                    req.item = fila
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.moverInventario = async(req, res, next) =>{
        try {
            let data = {
                producto: req.body.producto,
                cantidad: req.body.cantidad,
                unidades: req.body.unidades
            }

            //Primero validamos si el producto se encuentra ya en el inventario
            conexion.query("SELECT folio, cantidad FROM cat020_inventario WHERE producto = ?", [data.producto], (err, fila)=>{
                if(err){
                    throw err
                }else{
                    if(fila.length === 0){ //No existe el producto en el inventario
                        let insert = "INSERT INTO cat020_inventario SET ?"
                        conexion.query(insert, data, function(error, results){
                            if(error){
                                throw error
                            }
                        })
                    }else{ //Ya existe el registro
                        //Modificamos la cantidad
                        let cant = parseInt(fila[0].cantidad) + parseInt(data.cantidad)
                        let folio = fila[0].folio
                        conexion.query("UPDATE cat020_inventario SET cantidad = ? WHERE folio = ?", [cant, folio], (err2, fila2)=>{
                            if(err2){
                                throw err2
                            }
                        }) 
                    }
                    //Ahora registramos el movimiento
                    let valores = {
                        usuario: req.body.usuario,
                        producto: data.producto,
                        cantidad: data.cantidad,
                        fecha: new Date()
                    }
                    conexion.query("INSERT INTO op016_movimientos_inventario SET ?", valores, (err3, fila3)=>{
                        if(err3){
                            throw err3
                        }else{
                            res.redirect('/admininventario')
                            return next()
                        }
                    })
                }
            })       
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.reporteGrlInvent = async(req, res, next)=>{
        try {
            if(req.query.inicio && req.query.termino){
                let inicio = new Date(req.query.inicio)
                let termino = new Date(req.query.termino)
                conexion.query("SELECT * FROM movimientos_invent_view001 WHERE (fecha BETWEEN ? AND ?)", [inicio, termino], (error, filas)=>{
                    if(error){
                        throw error
                    }else{
                        req.movimientos = filas
                        return next()
                    }
                })
            }else{
                conexion.query("SELECT * FROM movimientos_invent_view001", (error, filas)=>{
                    if(error){
                        throw error
                    }else{
                        req.movimientos = filas
                        return next()
                    }
                })
            }
        } catch (error) {
            console.log(error)
            return next()
        }
    }
//FIN DEL CRUD DE INVENTARIO

//CRUD DE VIATICOS
    exports.selectViaticos = async(req, res, next) =>{
        try {
            conexion.query("SELECT * FROM operaciones_viaticos001", (error, filas)=>{
                if(error){
                    throw error;
                }else{
                    req.operaciones = filas
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
//FIN DEL CRUD DE VIATICOS

//CRUD DE PROYECTOS
    exports.selectProyectos = async(req, res, next) =>{
        try {
            if(req.query.ubicacion){
                conexion.query("SELECT * FROM proyectos_view001 WHERE folio_ubicacion = ?", [req.query.ubicacion], (error, filas)=>{
                    if(error){
                        throw error;
                    }else{
                        req.proyectos = filas
                        return next()
                    }
                })
            }else if(req.query.cliente){
                conexion.query("SELECT * FROM proyectos_view001 WHERE folio_cliente = ?", [req.query.cliente], (error, filas)=>{
                    if(error){
                        throw error;
                    }else{
                        req.proyectos = filas
                        req.flag = true
                        return next()
                    }
                })
            }else{
                conexion.query("SELECT * FROM proyectos_view001", (error, filas)=>{
                    if(error){
                        throw error;
                    }else{
                        req.proyectos = filas
                        req.flag = false
                        return next()
                    }
                })
            }
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.createProject = async(req, res, next) =>{
        try {
            let data = {
                nombre: req.body.nombre,
                ubicacion: req.body.ubicacion,
                galeria: req.body.galeria,
                documentacion: req.body.documentacion,
                estatus: req.body.estatus
            }

            let posibleRuta = `/perfilUbicacion?ubicacion=${req.body.ubicacion}`
            if(req.body.flag == 1){ 
                posibleRuta = `/perfilCliente?cliente=${req.body.cliente}`
            }else if(req.body.flag == 2){
                posibleRuta = `/perfilUbicacion?ubicacion=${req.body.ubicacion}&cliente=${req.body.cliente}&flag=1`
            }else if(req.body.flag == 0){
                posibleRuta = `/perfilUbicacion?ubicacion=${req.body.ubicacion}&flag=0`
            }

            let insert = "INSERT INTO cat009_proyectos SET ?"
            conexion.query(insert, data, function(error, results){
                if(error){
                    throw error
                }else{
                    res.redirect(posibleRuta)
                    return next() 
                } 
            })    
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.selectProyect = async(req, res, next) =>{
        try {
            conexion.query("SELECT * FROM proyectos_view001 WHERE folio = ?", [req.query.proyecto], (error, fila)=>{
                if(error){
                    throw error;
                }else{
                    req.proyecto = fila
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }

//ETAPAS
    exports.selectAllEtapas = async(req, res, next)=>{
        try {
            conexion.query("SELECT * FROM etapas_view001", (error, fila)=>{
                if(error){
                    throw error
                }else{
                    req.etapas = fila
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.selectEtapasProyecto = async(req, res, next)=>{
        try {
            conexion.query("SELECT * FROM etapas_view001 WHERE folio_proyecto = ?", [req.query.proyecto], (error, fila)=>{
                if(error){
                    throw error;
                }else{
                    req.etapas = fila
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.selectAreasProyect = async(req, res, next)=>{
        try {
            if(req.query.ubicacion){
                conexion.query("SELECT * FROM areas_view001 WHERE folio_planta = ?", [req.query.ubicacion], (err, result)=>{
                    if(err){
                        throw err;
                    }else{
                        req.areas = result;
                        return next();
                    }
                })
            }else{
                conexion.query("SELECT folio_ubicacion FROM proyectos_view001 WHERE folio = ?", [req.query.proyecto], (error, filas)=>{
                    if(error){
                        throw error;
                    }else{
                        conexion.query("SELECT * FROM areas_view001 WHERE folio_planta = ?", [filas[0].folio_ubicacion], (err, result)=>{
                            if(err){
                                throw err;
                            }else{
                                req.areas = result;
                                return next();
                            }
                        })
                    }
                })
            }
        } catch (error) {
            console.log(error)
            return next()
        }
    }
//FIN ETAPAS

//ROL
    exports.selectRolesProyecto = async(req, res, next) =>{
        try {
            conexion.query("SELECT * FROM roles_view001 WHERE proyecto = ?", [req.query.proyecto], (error, filas)=>{
                if(error){
                    throw error;
                }else{
                    req.roles = filas
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.selectRoles = async(req, res, next)=>{
        try {
            conexion.query("SELECT * FROM cat011_roles_proyecto", (error, filas)=>{
                if(error){
                    throw error;
                }else{
                    req.roles = filas
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.selectContactsProyect = async(req, res, next)=>{
        try {
            //Primero obtenemos la ubicacion del proyecto
            conexion.query("SELECT ubicacion FROM cat009_proyectos WHERE folio = ?", [req.query.proyecto], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    conexion.query("SELECT * FROM contactos_ubicacion_view001 WHERE folio_ubicacion = ?", [fila[0].ubicacion], (err, result)=>{
                        if(err){
                            throw err;
                        }else{
                            req.contactos = result;
                            return next();
                        }
                    })
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
//FIN DE ROLES

//VIATICOS PROYECTO
    exports.datosViaticosProyectos = async(req, res, next)=>{
        try {
            let proyecto  = req.query.proyecto
            let datos = {
                gastado: 0,
                comprobado: 0
            }
            conexion.query("SELECT SUM(monto) as suma_depositos FROM viaticos_depositos_view001 WHERE proyecto = ?", [proyecto], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    datos.gastado = 0 + fila[0].suma_depositos
                    conexion.query("SELECT SUM(monto) as suma_comprobado FROM viaticos_comprobaciones_view001 WHERE proyecto = ?", [proyecto], (error2, fila2)=>{
                        if(error2){
                            throw error2
                        }else{
                            datos.comprobado = 0 + fila2[0].suma_comprobado
                            req.datos = datos
                            return next()
                        }
                    })
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.selectDepositosProyecto = async(req, res, next)=>{
        try {
            conexion.query("SELECT * FROM viaticos_depositos_view001 WHERE proyecto = ?", [req.query.proyecto], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    req.depositos = fila
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.selectComprobacionesProyecto = async(req, res, next)=>{
        try {
            conexion.query("SELECT * FROM viaticos_comprobaciones_view001 WHERE proyecto = ?", [req.query.proyecto], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    req.comprobaciones = fila
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    
//CLAVES DE SEGUIMIENTO
    exports.selectClaveUsuario = async(req, res, next)=>{
        try {
            conexion.query("SELECT * FROM claves_view001 WHERE folio_usuario = ?", [req.query.usuario], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    req.claves = fila
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.selectClave = async(req, res, next)=>{
        try {
            conexion.query("SELECT * FROM claves_view001 WHERE folio = ?", [req.query.clave], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    conexion.query("SELECT SUM(monto) as rendido FROM viaticos_comprobaciones_view001 WHERE folio_clave = ?", [req.query.clave], (error2, fila2)=>{
                        if(error2){
                            throw error2
                        }else{
                            req.clave = fila
                            req.rendido = fila2
                            return next()
                        }
                    })
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.selectComprobantesClave = async(req, res, next)=>{
        try {
            conexion.query("SELECT * FROM viaticos_comprobaciones_view001 WHERE folio_clave = ?", [req.query.clave], (error, filas)=>{
                if(error){
                    throw error
                }else{
                    req.comprobaciones = filas
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.deleteComprobanteClavePer = async(req, res, next)=>{
        try {
            conexion.query("DELETE FROM cat022_operaciones WHERE folio = ?", [req.query.folio], (err, fila)=>{
                if(err){
                    throw err
                }else{
                    let nuevoSaldo = parseFloat(req.query.saldo) + parseFloat(req.query.monto)
                    conexion.query("UPDATE cat001_usuarios SET saldo = ? WHERE folio = ?", [nuevoSaldo, req.query.usuario], (err2, fila2)=>{
                        if(err2){
                            throw err2
                        }else{
                            let ruta = `/seguimientoClaves?usuario=${req.query.usuario}&clave=${req.query.clave}` 
                            res.redirect(ruta)
                            return next()
                        }
                    })
                }
            })
        } catch (error) {
            console.log(error)
            return next
        }
    }
    exports.selectClaves = async(req, res, next)=>{
        try {
            conexion.query("SELECT * FROM claves_view001", (error, fila)=>{
                if(error){
                    throw error
                }else{
                    req.claves = fila
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.deleteComprobanteClaveGrl = async(req, res, next)=>{
        try {
            let emisor = req.query.emisor
            let monto = parseFloat(req.query.monto)
            let clave = req.query.clave

            conexion.query("SELECT saldo FROM cat001_usuarios WHERE folio = ?", [emisor], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    conexion.query("DELETE FROM cat022_operaciones WHERE folio = ?", [req.query.folio], (error2, fila2)=>{
                        if(error2){
                            throw error2
                        }else{
                            let nuevoSaldo = monto + parseFloat(fila[0].saldo)
                            conexion.query("UPDATE cat001_usuarios SET saldo = ? WHERE folio = ?", [nuevoSaldo, emisor], (error3, fila3)=>{
                                if(error3){
                                    throw error3
                                }else{
                                    res.redirect(`/adminClaves?clave=${clave}`)
                                    return next()
                                }
                            })
                        }
                    })
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }

//ASISTENCIAS POR USUARIO
    exports.reporteAsistencia = async(req, res, next)=>{
        try {
            conexion.query("SELECT * FROM reporte_asistencia_view001 WHERE folio_usuario = ?", [req.query.usuario], (error, fila)=>{
                if(error){
                    throw error
                }else{
                    req.asistencias = fila
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }
    exports.reporteGeneralAsistencia = async(req, res, next)=>{
        try {
            if(req.query.inicio && req.query.termino){
                conexion.query("SELECT * FROM reporte_asistencia_view001 WHERE (fecha BETWEEN ? AND ?) ORDER BY folio DESC", [req.query.inicio, req.query.termino], (error, filas)=>{
                    if(error){
                        throw error
                    }else{
                        req.asistencias = filas
                        return next()
                    }
                })
            }else{
                conexion.query("SELECT * FROM reporte_asistencia_view001 ORDER BY folio DESC", (error, filas)=>{
                    if(error){
                        throw error
                    }else{
                        req.asistencias = filas
                        return next()
                    }
                })
            }
        } catch (error) {
            console.log(error)
            return  next()
        }
    }