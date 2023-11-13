import { 
    cambiar_documentacion_proyecto, 
    cambiar_galeria_proyecto,
    cambiar_nombre_proyecto, 
    crear_proyecto, 
    seleccionar_mis_proyectos, 
    seleccionar_proyecto, 
    seleccionar_proyectos, 
    seleccionar_proyectos_cliente, 
    seleccionar_proyectos_ubicacion, 
    seleccionar_roles_proyecto 
} from "../models/Proyecto.js";

function calculateRuta(flag, ubicacion, cliente, proyecto, permisos){
    let ruta = '';
    switch(parseInt(flag)){
        case 0:
            //ruta = `/proyectos/perfil?proyecto=${proyecto}&flag=0`;
            ruta = `/proyectos/perfil?proyecto=${proyecto}&cliente=${cliente}&flag=0`;
            break;
        case 1:
            ruta = `/proyectos/perfil?proyecto=${proyecto}&ubicacion=${ubicacion}&cliente=${cliente}&flag=1`
            //ruta = `/proyectos/perfil?proyecto=${proyecto}&cliente=${cliente}&flag=1`;
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

const getProyectos = async(req, _, next)=>{
    try {
        if(req.query.ubicacion){
            await seleccionar_proyectos_ubicacion(req.query.ubicacion).then(resultado =>{
                req.proyectos = resultado
                return next()
            })
            .catch(error=>{
                //TODO: MEJORAR LA GESTION DE LOS ERRORES
                throw new Error('Error al obtener los proyectos en la ubicacion: ', error)
            })
        }else if(req.query.cliente){
            await seleccionar_proyectos_cliente(req.query.cliente).then(resultado =>{
                req.proyectos = resultado
                req.flag = true
                return next()
            })
            .catch(error=>{
                //TODO: MEJORAR LA GESTION DE LOS ERRORES
                throw new Error('Error al obtener los proyectos del cliente: ', error)
            })
        }else{
            await seleccionar_proyectos().then(resultado =>{
                req.proyectos = resultado
                req.flag = false
                return next()
            })
            .catch(error=>{
                //TODO: MEJORAR LA GESTION DE LOS ERRORES
                throw new Error('Error al obtener los proyectos: ', error)
            })
        }
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getProyecto = async(req, _, next)=>{
    try {
        const proyecto = req.query.proyecto

        await seleccionar_proyecto(proyecto).then(resultado=>{
            req.proyecto = resultado
            return next()
        })
        .catch(error=>{
            throw('Ha ocurrido un error al obtener los datos del proyecto seleccionado: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getRolesProyecto = async(req, _, next)=>{
    try {
        const proyecto = req.query.proyecto
        await seleccionar_roles_proyecto(proyecto).then(resultado=>{
            req.roles = resultado
            return next()
        })
        .catch(error=>{
            throw('Ha ocurrido un error al obtener los roles del proyecto: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getMisProyectos = async(req, res, next)=>{
    try {
        const usuario = req.query.folio

        await seleccionar_mis_proyectos(usuario).then(resultado=>{
            req.proyectos = resultado
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener los proyectos del usuario: ', error)
        })

        
    } catch (error) {
        console.log(error)
        return next()
    }
}
const createProyecto = async(req, res, next) =>{
    try {
        const proyecto = {
            nombre: req.body.nombre,
            ubicacion: req.body.ubicacion[0],
            galeria: req.body.galeria,
            documentacion: req.body.documentacion,
            estatus: req.body.estatus
        }

        console.log(proyecto)

        let posibleRuta = `/ubicaciones/perfil?ubicacion=${req.body.ubicacion}`
        if(req.body.flag == 1){
            posibleRuta = `/ubicaciones/perfil?ubicacion=${req.body.ubicacion}&cliente=${req.body.cliente}`
        }else if(req.body.flag == 0){
            posibleRuta = `/clientes/administrar?cliente=${req.body.cliente}` //CHECKED
            //posibleRuta = `/ubicaciones/perfil?ubicacion=${req.body.ubicacion}&flag=0`
        }

        await crear_proyecto(proyecto).then(_=>{
                res.redirect(posibleRuta)
                return next() 
        })
        .catch(error=>{
            throw('Ha ocurrido un error al registrar el proyecto: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const updateNombreProyecto = async(req, res, next)=>{
    try {
        const proyecto = req.query.proyecto
        const nombre = req.query.nombre
        let ruta = calculateRuta(req.query.flag, req.query.ubicacion, req.query.cliente, req.query.proyecto)
        
        await cambiar_nombre_proyecto(nombre, proyecto).then(_=>{
            res.redirect(ruta)
            return next()
        })
        .catch(error=>{
            throw('No se ha podido cambiar el nombre del proyecto: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const updateDocumentacionProyecto = async(req, res, next)=>{
    try {
        let ruta = calculateRuta(req.query.flag, req.query.ubicacion, req.query.cliente, req.query.proyecto)
        
        await cambiar_documentacion_proyecto(req.query.documentacion, req.query.proyecto).then(_=>{
            res.redirect(ruta)
            return next()
        })
        .catch(error=>{
            throw('Ha ocurrido un error al cambiar la dirección de documentación del proyecto: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const updateGaleriaProyecto = async(req, res, next)=>{
    try {
        let ruta = calculateRuta(req.query.flag, req.query.ubicacion, req.query.cliente, req.query.proyecto)
        
        await cambiar_galeria_proyecto(req.query.galeria, req.query.proyecto).then(_=>{
            res.redirect(ruta)
            return next()
        })
        .catch(error=>{
            throw('Ha ocurrido un error al cambiar la dirección de galeria del proyecto: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
export {
    getProyectos,
    getProyecto,
    getRolesProyecto,
    getMisProyectos,
    createProyecto,
    updateNombreProyecto,
    updateDocumentacionProyecto,
    updateGaleriaProyecto
}

/* 
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




//Fin de la gestion de etapas en el perfil de proyecto

//Gestion de roles en el perfil de proyecto


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

 */
