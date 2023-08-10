const conexion = require('../database/db')
const {promisify} = require('util')
const { query } = require('../database/db')
const { nextTick } = require('process')

function calculateRuta(flag, ubicacion, cliente, proyecto, permisos){
    let ruta = '';
    switch(parseInt(flag)){
        case 0:
            ruta = `/proyectos/perfil?proyecto=${proyecto}&flag=0`;
            break;
        case 1:
            ruta = `/proyectos/perfil?proyecto=${proyecto}&cliente=${cliente}&flag=1`;
            break;
        case 2:
            ruta = `/proyectos/perfil?proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=2`;
            break;
        case 3:
            ruta = `/proyectos/perfil?proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=3`;
            break;
        case 4:
            ruta = `/proyectos/perfil?proyecto=${proyecto}&flag=4&permisos=${permisos}`;
            break;
    }
    return ruta
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

exports.createProject = async(req, res, next) =>{
    try {
        let data = {
            nombre: req.body.nombre,
            ubicacion: req.body.ubicacion,
            galeria: req.body.galeria,
            documentacion: req.body.documentacion,
            estatus: req.body.estatus
        }

        let posibleRuta = `/ubicaciones/perfil?ubicacion=${req.body.ubicacion}`
        if(req.body.flag == 1){ 
            posibleRuta = `/clientes/administrar?cliente=${req.body.cliente}`
        }else if(req.body.flag == 2){
            posibleRuta = `/ubicaciones/perfil?ubicacion=${req.body.ubicacion}&cliente=${req.body.cliente}&flag=1`
        }else if(req.body.flag == 0){
            posibleRuta = `/ubicaciones/perfil?ubicacion=${req.body.ubicacion}&flag=0`
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

exports.cambiarNombreProyecto = async(req, res, next)=>{
    try {
        let ruta = calculateRuta(req.query.flag, req.query.ubicacion, req.query.cliente, req.query.proyecto)
        conexion.query("UPDATE cat009_proyectos SET nombre = ? WHERE folio = ?", [req.query.nombre, req.query.proyecto], (error, fila)=>{
            if(error){
                throw error
            }else{
                res.redirect(ruta)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.cambiarDocumentacionProyecto = async(req, res, next)=>{
    try {
        let ruta = calculateRuta(req.query.flag, req.query.ubicacion, req.query.cliente, req.query.proyecto)
        conexion.query("UPDATE cat009_proyectos SET documentacion = ? WHERE folio = ?", [req.query.documentacion, req.query.proyecto], (error, fila)=>{
            if(error){
                throw error
            }else{
                res.redirect(ruta)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.cambiarGaleriaProyecto = async(req, res, next)=>{
    try {
        let ruta = calculateRuta(req.query.flag, req.query.ubicacion, req.query.cliente, req.query.proyecto)
        conexion.query("UPDATE cat009_proyectos SET galeria = ? WHERE folio = ?", [req.query.galeria, req.query.proyecto], (error, fila)=>{
            if(error){
                throw error
            }else{
                res.redirect(ruta)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.deleteProyectoClient = async(req, res, next)=>{
    try {
        const proyecto = req.query.proyecto
        const ruta = `perfilCliente?cliente=${req.query.cliente}`

        //VALIDAMOS COTIZACIONES
        conexion.query("SELECT folio FROM cat013_cotizaciones WHERE proyecto = ?", [proyecto], (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    //Validamos claves de seguimeinto
                    conexion.query("SELECT folio FROM cat021_claves_seguimiento WHERE proyecto = ?", [proyecto], (error2, fila2)=>{
                        if(error2){
                            throw error2
                        }else{
                            if(fila2.length === 0){
                                //Validamos etapas
                                conexion.query("SELECT folio FROM op002_etapas WHERE proyecto = ?", [proyecto], (error3, fila3)=>{
                                    if(error3){
                                        throw error3
                                    }else{
                                        if(fila3.length === 0){
                                            //Validamos roles
                                            conexion.query("SELECT folio FROM op005_roles WHERE proyecto = ?", [proyecto], (error4, fila4)=>{
                                                if(error4){
                                                    throw error4
                                                }else{
                                                    if(fila4.length === 0){
                                                        //Validamos asistencia
                                                        conexion.query("SELECT folio FROM op006_asistencia WHERE proyecto = ?", [proyecto], (error5, fila5)=>{
                                                            if(error5){
                                                                throw error5
                                                            }else{
                                                                if(fila5.length === 0){
                                                                    //Validamos material en proyecto
                                                                    conexion.query("SELECT folio FROM op011_material_proyecto WHERE proyecto = ?", [proyecto], (error6, fila6)=>{
                                                                        if(error6){
                                                                            throw error6
                                                                        }else{
                                                                            if(fila6.length === 0){
                                                                                //Validamos presupuesto
                                                                                conexion.query("SELECT folio FROM op012_presupuesto_proyecto WHERE proyecto = ?", [proyecto], (error7, fila7)=>{
                                                                                    if(error7){
                                                                                        throw error7
                                                                                    }else{
                                                                                        if(fila7.length === 0){
                                                                                            //Eliminamos
                                                                                            conexion.query("DELETE FROM cat009_proyectos WHERE folio = ?", [proyecto], (error8, fila8)=>{
                                                                                                if(error8){
                                                                                                    throw error8
                                                                                                }else{
                                                                                                    res.redirect(`/${ruta}`)
                                                                                                    return next()
                                                                                                }
                                                                                            })
                                                                                        }else{
                                                                                            showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues tiene un presupuesto definido`, ruta)
                                                                                            return next()
                                                                                        }
                                                                                    }
                                                                                })
                                                                            }else{
                                                                                showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues hay material en el proyecto`, ruta)
                                                                                return next()
                                                                            }
                                                                        }
                                                                    })
                                                                }else{
                                                                    showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues tiene un registro de asistencia`, ruta)
                                                                    return next()
                                                                }
                                                            }
                                                        })
                                                    }else{
                                                        showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues tiene roles asignados`, ruta)
                                                        return next()
                                                    }
                                                }
                                            })
                                        }else{
                                            showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues tiene etapas definidas`, ruta)
                                            return next()
                                        }
                                    }
                                })
                            }else{
                                showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues ya se otorgaron viaticos`, ruta)
                                return next()
                            }
                        }
                    })
                }else{
                    showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues ya esta cotizado`, ruta)
                    return next()
                }
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}

function validar_cotizaciones_proyecto(proyecto){
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT folio FROM cat013_cotizaciones WHERE proyecto = ?", proyecto, (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    resolve(false)
                }else{
                    resolve(true)
                }
            }
        })
    })
}
function validar_claves_proyecto(proyecto){
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT folio FROM cat021_claves_seguimiento WHERE proyecto = ?", proyecto, (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    resolve(false)
                }else{
                    resolve(true)
                }
            }
        })
    })
}
function validar_etapas_proyecto(proyecto){
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT folio FROM op002_etapas WHERE proyecto = ?", proyecto, (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    resolve(false)
                }else{
                    resolve(true)
                }
            }
        })
    })
}
function validar_roles_proyecto(proyecto){
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT folio FROM op005_roles WHERE proyecto = ?", proyecto, (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    resolve(false)
                }else{
                    resolve(true)
                }
            }
        })
    })
}
function validar_asistencia_proyecto(proyecto){
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT folio FROM op006_asistencia WHERE proyecto = ?", proyecto, (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    resolve(false)
                }else{
                    resolve(true)
                }
            }
        })
    })
}
function validar_material_proyecto(proyecto){
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT folio FROM op011_material_proyecto WHERE proyecto = ?", proyecto, (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    resolve(false)
                }else{
                    resolve(true)
                }
            }
        })
    })
}
function validar_presupuesto_proyecto(proyecto){
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT folio FROM op012_presupuesto_proyecto WHERE proyecto = ?", proyecto, (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    resolve(false)
                }else{
                    resolve(true)
                }
            }
        })
    })
}

exports.deleteProyectoUbicacion = async(req, res, next)=>{
    try {
        let proyecto = req.query.proyecto
        let ruta = '';
        if(req.query.flag == 1){ruta = `ubicaciones/perfil?ubicacion=${req.query.ubicacion}&cliente=${req.query.cliente}&flag=1`}
        else if(req.query.flag == 0){ruta = `ubicaciones/perfil?ubicacion=${req.query.ubicacion}&flag=0`}

        let proy_has_cotizaciones = await validar_cotizaciones_proyecto(proyecto)
        if(proy_has_cotizaciones){
            showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues ya esta cotizado`, `${ruta}`)
            return next()
        }

        let proy_has_viaticos = await validar_claves_proyecto(proyecto)
        if(proy_has_viaticos){
            showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues ya se otorgaron viaticos`, `${ruta}`)
            return next()
        }

        let proy_has_etapas = await validar_etapas_proyecto(proyecto)
        if(proy_has_etapas){
            showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues tiene etapas definidas`, `${ruta}`)
            return next()                        
        }

        let proy_has_roles = await validar_roles_proyecto(proyecto)
        if(proy_has_roles){
            showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues tiene roles asignados`, `${ruta}`)
            return next()
        }

        let proy_has_asistencias = await validar_asistencia_proyecto(proyecto)
        if(proy_has_asistencias){
            showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues tiene un registro de asistencia`, `${ruta}`)
            return next()
        }

        let proy_has_material = await validar_material_proyecto(proyecto)
        if(proy_has_material){
            showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues hay material en el proyecto`, `${ruta}`)
            return next()
        }

        let proy_has_presupuesto = await validar_presupuesto_proyecto(proyecto)
        if(proy_has_presupuesto){
            showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues tiene un presupuesto definido`, `${ruta}`)
            return next()
        }

        conexion.query("DELETE FROM cat009_proyectos WHERE folio = ?", [proyecto], (error8, fila8)=>{
            if(error8){
                throw error8
            }else{
                res.redirect(`/${ruta}`)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.deleteProyectoGrl = async(req, res, next)=>{
    try {
        const proyecto = req.query.proyecto
        const ruta = `adminproyectos`

        //VALIDAMOS COTIZACIONES
        conexion.query("SELECT folio FROM cat013_cotizaciones WHERE proyecto = ?", [proyecto], (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    //Validamos claves de seguimeinto
                    conexion.query("SELECT folio FROM cat021_claves_seguimiento WHERE proyecto = ?", [proyecto], (error2, fila2)=>{
                        if(error2){
                            throw error2
                        }else{
                            if(fila2.length === 0){
                                //Validamos etapas
                                conexion.query("SELECT folio FROM op002_etapas WHERE proyecto = ?", [proyecto], (error3, fila3)=>{
                                    if(error3){
                                        throw error3
                                    }else{
                                        if(fila3.length === 0){
                                            //Validamos roles
                                            conexion.query("SELECT folio FROM op005_roles WHERE proyecto = ?", [proyecto], (error4, fila4)=>{
                                                if(error4){
                                                    throw error4
                                                }else{
                                                    if(fila4.length === 0){
                                                        //Validamos asistencia
                                                        conexion.query("SELECT folio FROM op006_asistencia WHERE proyecto = ?", [proyecto], (error5, fila5)=>{
                                                            if(error5){
                                                                throw error5
                                                            }else{
                                                                if(fila5.length === 0){
                                                                    //Validamos material en proyecto
                                                                    conexion.query("SELECT folio FROM op011_material_proyecto WHERE proyecto = ?", [proyecto], (error6, fila6)=>{
                                                                        if(error6){
                                                                            throw error6
                                                                        }else{
                                                                            if(fila6.length === 0){
                                                                                //Validamos presupuesto
                                                                                conexion.query("SELECT folio FROM op012_presupuesto_proyecto WHERE proyecto = ?", [proyecto], (error7, fila7)=>{
                                                                                    if(error7){
                                                                                        throw error7
                                                                                    }else{
                                                                                        if(fila7.length === 0){
                                                                                            //Eliminamos
                                                                                            conexion.query("DELETE FROM cat009_proyectos WHERE folio = ?", [proyecto], (error8, fila8)=>{
                                                                                                if(error8){
                                                                                                    throw error8
                                                                                                }else{
                                                                                                    res.redirect(`/${ruta}`)
                                                                                                    return next()
                                                                                                }
                                                                                            })
                                                                                        }else{
                                                                                            showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues tiene un presupuesto definido`, ruta)
                                                                                            return next()
                                                                                        }
                                                                                    }
                                                                                })
                                                                            }else{
                                                                                showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues hay material en el proyecto`, ruta)
                                                                                return next()
                                                                            }
                                                                        }
                                                                    })
                                                                }else{
                                                                    showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues tiene un registro de asistencia`, ruta)
                                                                    return next()
                                                                }
                                                            }
                                                        })
                                                    }else{
                                                        showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues tiene roles asignados`, ruta)
                                                        return next()
                                                    }
                                                }
                                            })
                                        }else{
                                            showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues tiene etapas definidas`, ruta)
                                            return next()
                                        }
                                    }
                                })
                            }else{
                                showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues ya se otorgaron viaticos`, ruta)
                                return next()
                            }
                        }
                    })
                }else{
                    showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues ya esta cotizado`, ruta)
                    return next()
                }
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
//Gestion de etapas en perfil del proyecto
exports.addEtapa = async(req, res, next)=>{
    try {
        let data = {
            nombre: req.body.nombre,
            area: req.body.area,
            proyecto: req.body.proyecto
        }

        let ruta =  calculateRuta(req.body.flag, req.body.ubicacion, req.body.cliente, data.proyecto, req.body.permisos)

        let insert = "INSERT INTO op002_etapas SET ?"
        conexion.query(insert, data, function(error, results){
            if(error){
                throw error
            }else{
                res.redirect(ruta)
                return next()    
            }
        })    
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.selectEtapa = async(req, res, next) =>{
    try {
        conexion.query("SELECT * FROM etapas_view001 WHERE folio = ?", [req.query.etapa], (error, fila)=>{
            if(error){
                throw error;
            }else{
                req.etapa = fila
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.editarEtapa = async(req, res, next)=>{
    try {
        let etapa = req.body.folio
        let nombre = req.body.nombre
        let area = req.body.area
        let proyecto = req.body.proyecto

        let ruta =  calculateRuta(req.body.flag, req.body.ubicacion, req.body.cliente, proyecto, req.body.permisos)

        conexion.query("UPDATE op002_etapas SET nombre = ?, area = ? WHERE folio = ?", [nombre, area, etapa], (error, fila)=>{
            if(error){
                throw error
            }else{
                res.redirect(ruta)
                return next() 
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.deleteEtapa = async(req, res, next)=>{
    try {
        let etapa = req.query.etapa
        let ruta = calculateRuta(req.query.flag, req.query.ubicacion, req.query.cliente, req.query.proyecto, req.query.permisos)
        conexion.query("SELECT * FROM op003_tareas WHERE etapa = ?", [etapa], (err, fila)=>{
            if(err){
                throw err
            }else{
                if(fila.length === 0){
                    conexion.query("DELETE FROM op002_etapas WHERE folio = ?", [etapa], (err2, fila2)=>{
                        if(err2){
                            throw err2
                        }else{
                            res.redirect(ruta)
                            return next()  
                        }
                    })
                }else{
                    res.render('Error/showInfo', {
                        title: 'Etapa con tareas creadas',
                        alert: true,
                        alertTitle: 'INFORMACION',
                        alertMessage: `La etapa ${etapa} aun tiene tareas creadas, debe eliminarlas antes de eliminar la etapa del proyecto`,
                        alertIcon: 'info',
                        showConfirmButton: true,
                        timer: 8000,
                        ruta: `${ruta.replace('/', '')}` 
                    })
                    return next()
                }
            }
        })
    }catch (error) {
        console.log(error)
        return next()
    }
}
//Fin de la gestion de etapas en el perfil de proyecto

//Gestion de roles en el perfil de proyecto
exports.asignRolProyect = async(req, res, next) =>{
    try {
        let data = {
            proyecto: req.body.proyecto,
            usuario: req.body.usuario,
            rol: req.body.rol
        }
        let ruta = calculateRuta(req.body.flag, req.body.ubicacion, req.body.cliente, req.body.proyecto, req.body.permisos)
        
        //Primero validamos si el usuario no tiene ya un rol asignado en el proyecto
        conexion.query("SELECT folio FROM op005_roles WHERE proyecto = ? AND usuario = ?", [data.proyecto, data.usuario], (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){ //Si no existe entonces insertamos 
                    let insert = "INSERT INTO op005_roles SET ?"
                    conexion.query(insert, data, function(error, results){
                        if(error){
                            throw error
                        }else{
                            res.redirect(ruta)
                            return next()    
                        }
                    }) 
                }else{ //Si ya existe enviamos el error
                    res.render('Error/redirect', {
                        alert: true,
                        alertTitle: 'ERROR',
                        alertMessage: 'Este usuario ya tiene un rol asignado en este proyecto',
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: 8000,
                        ruta: `${ruta}`
                    })
                    return next()
                }
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.deleteRol = async(req, res, next)=>{
    try {
        let ruta = calculateRuta(req.query.flag, req.query.ubicacion, req.query.cliente, req.query.proyecto, req.query.permisos)
        
        //Validamos que el usuario no tenga una tarea asignada
        conexion.query("SELECT folio FROM validar_tarea_view001 WHERE usuario = ? AND proyecto = ?", [req.query.usuario, req.query.proyecto], (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    conexion.query("DELETE FROM op005_roles WHERE folio = ?", [req.query.rol], (err, fila)=>{
                        if(err){
                            throw err
                        }else{ 
                            res.redirect(ruta)
                            return next()  
                        }
                    }) 
                }else{
                    res.render('Error/showInfo', {
                        title: 'Rol con tareas asignadas',
                        alert: true,
                        alertTitle: 'INFORMACION',
                        alertMessage: `El usuario con este rol tiene una tarea asignada, por lo que no se puede eliminar el rol`,
                        alertIcon: 'info',
                        showConfirmButton: true,
                        timer: 8000,
                        ruta: `${ruta.replace('/', '')}`
                    })
                    return next()
                }
            }
        })
      
    } catch (error) {
        console.log(error)
        return next()
    }
}
//Fin de la gestion de roles

//Gestion de cotizaciones
exports.createCotizacionProyecto = async(req, res, next)=>{
    try {
        let cliente = req.query.cliente
        let ubicacion = req.query.ubicacion
        let flag = req.query.flag
        let proyecto = req.query.proyecto
        let permisos = req.query.permisos

        let ruta = calculateRuta(flag, ubicacion, cliente, proyecto, permisos)

        conexion.query("SELECT folio FROM cat006_contactos WHERE cliente = ? LIMIT 1", [cliente], (error2, fila)=>{
            if(error2){
                throw error2
            }else{
                //Validamos en caso de que no exista un contacto creado para el cliente
                if(fila.length === 0){
                    showError(res, 'ERROR AL CREAR COTIZACION', `No se ha podido crear la cotizacion pues no existe un contacto para este cliente, favor de definirlo`, `formcreatecontact?cliente=${cliente}&flag=1`)
                    return next()
                }else{
                    let data = {
                        proyecto: proyecto,
                        contacto: fila[0].folio 
                    }
                    let insert = "INSERT INTO cat013_cotizaciones SET ?"
                    conexion.query(insert, data, (error3, fila2)=>{
                        if(error3){
                            throw error3
                        }else{
                            res.redirect(ruta)
                            return next()  
                        }
                    })
                }
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.deleteCotizacion = async(req, res, next)=>{
    try {
        let cotizacion = req.query.folio
        let ruta = calculateRuta(req.query.flag, req.query.ubicacion, req.query.cliente, req.query.proyecto, req.query.permisos)

        //Validamos que no haya productos
        conexion.query("SELECT * FROM op008_lista_productos WHERE cotizacion = ?", [cotizacion], (err, fila)=>{
            if(err){
                throw err
            }else{
                if(fila.length === 0){
                    //Validamos que no haya servicios
                    conexion.query("SELECT * FROM op009_lista_servicios WHERE cotizacion = ?", [cotizacion], (error2, fila2)=>{
                        if(error2){
                            throw error2
                        }else{
                            if(fila2.length === 0){
                                //Eliminamos
                                conexion.query("DELETE FROM cat013_cotizaciones WHERE folio = ?", [cotizacion], (error3, fila3)=>{
                                    if(error3){
                                        throw error3
                                    }else{
                                        res.redirect(ruta)
                                        return next()  
                                    }
                                })
                            }else{
                                res.render('Error/showInfo', {
                                    title: 'Servicio(s) Cotizado(s)',
                                    alert: true,
                                    alertTitle: 'INFORMACION',
                                    alertMessage: `La cotizacion ${cotizacion} tiene almenos un servicio cotizado y no puede eliminarse`,
                                    alertIcon: 'info',
                                    showConfirmButton: true,
                                    timer: 8000,
                                    ruta: `${ruta}` 
                                })
                                return next()
                            }
                        }
                    })
                }else{
                    res.render('Error/showInfo', {
                        title: 'Producto(s) Cotizado(s)',
                        alert: true,
                        alertTitle: 'INFORMACION',
                        alertMessage: `La cotizacion ${cotizacion} tiene almenos un producto cotizado y no puede eliminarse`,
                        alertIcon: 'info',
                        showConfirmButton: true,
                        timer: 8000,
                        ruta: `${ruta}` 
                    })
                    return next()
                }
            }
        })
    }catch (error) {
        console.log(error)
        return next()
    }
}

//MIS PROYECTOS
exports.selectMisProyectos = async(req, res, next)=>{
    try {
        let usuario = req.query.folio

        conexion.query("SELECT * FROM roles_proyecto_view001 WHERE folio_usuario = ?", [usuario], (error, fila)=>{
            if(error){
                throw error
            }else{
                req.proyectos = fila
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}

