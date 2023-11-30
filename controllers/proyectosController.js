import { 
    cambiar_documentacion_proyecto, 
    cambiar_galeria_proyecto,
    cambiar_nombre_proyecto, 
    crear_proyecto, 
    seleccionar_comprobaciones_proyecto, 
    seleccionar_depositos_proyecto, 
    seleccionar_inventario_proyecto, 
    seleccionar_inversion_proyecto, 
    seleccionar_mis_proyectos, 
    seleccionar_proyecto, 
    seleccionar_proyectos, 
    seleccionar_proyectos_cliente, 
    seleccionar_proyectos_ubicacion, 
    seleccionar_roles_proyecto, 
    seleccionar_suma_comprobada_proyecto,
    validar_claves_proyecto,
    validar_asistencia_proyecto,
    validar_etapas_proyecto,
    validar_material_proyecto,
    validar_presupuesto_proyecto,
    validar_roles_proyecto,
    eliminar_proyecto
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
const getMisProyectos = async(req, _, next)=>{
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
const getDatosViaticosProyecto = async(req, _, next)=>{
    try {
        const proyecto  = req.query.proyecto
        let datos = {
            gastado: 0,
            comprobado: 0
        }

        await seleccionar_inversion_proyecto(proyecto).then(resultado =>{
            datos.gastado = 0 + resultado[0].suma_depositos
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener la inversion realizada en viaticos en el proyeto: ', error)
        })
        await seleccionar_suma_comprobada_proyecto(proyecto).then(resultado=>{
            datos.comprobado = 0 + resultado[0].suma_comprobado
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener la suma de las comprobaciones del proyecto: ', error)
        })

        req.datos = datos
        return next()

    } catch (error) {
        console.log(error)
        return next()
    }
}
const getDepositosProyecto = async(req, _, next)=>{
    try {
        await seleccionar_depositos_proyecto(req.query.proyecto).then(resultado=>{
            req.depositos = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener los depositos del proyecto: ', error)
        })
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getComprobacionesProyecto = async(req, _, next)=>{
    try {
        await seleccionar_comprobaciones_proyecto(req.query.proyecto).then(resultado=>{
            req.comprobaciones = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener las comprobaciones de los movimientos del proyecto: ', error)
        })
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getInventarioProyecto = async(req, _, next)=>{
    try {
        await seleccionar_inventario_proyecto(req.query.proyecto).then(resultado=>{
            req.inventario = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener el inventario del proyecto: ', error)
        })
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
const createProyecto = async(req, res, next) =>{
    try {
        const proyecto = {
            nombre: req.body.nombre,
            ubicacion: req.body.ubicacion,
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
const deleteProyectoUbicacion = async(req, res, next)=>{
    try {
        const proyecto = req.query.proyecto
        //TODO: Verificar adecuadamente el enrutamiento
        let ruta = '';
        if(req.query.flag == 1){ruta = `ubicaciones/perfil?ubicacion=${req.query.ubicacion}&cliente=${req.query.cliente}&flag=1`}
        else if(req.query.flag == 0){ruta = `ubicaciones/perfil?ubicacion=${req.query.ubicacion}&flag=0`}

        let proy_has_viaticos = null 
        await validar_claves_proyecto(proyecto).then(resultado=>{
            proy_has_viaticos = resultado
        }).catch(error=>{
            throw(`Error al buscar los viaticos asociados a este proyecto`, error)
        })
        if(proy_has_viaticos){
            showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues ya se otorgaron viaticos`, `${ruta}`)
            return next()
        }

        let proy_has_etapas = null 
        await validar_etapas_proyecto(proyecto).then(resultado=>{
            proy_has_etapas = resultado
        }).catch(error=>{
            throw('Ha ocurido un error al realizar la validacion correspondiente: ', error)
        })
        if(proy_has_etapas){
            showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues tiene etapas definidas`, `${ruta}`)
            return next()                        
        }

        let proy_has_roles = null 
        await validar_roles_proyecto(proyecto).then(resultado=>{
            proy_has_roles = resultado
        }).catch(error=>{
            throw('Ha ocurido un error al realizar la validacion correspondiente: ', error)
        })
        if(proy_has_roles){
            showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues tiene roles asignados`, `${ruta}`)
            return next()
        }

        let proy_has_asistencias = null 
        await validar_asistencia_proyecto(proyecto).then(resultado=>{
            proy_has_asistencias = resultado
        }).catch(error=>{
            throw('Ha ocurido un error al realizar la validacion correspondiente: ', error)
        })
        if(proy_has_asistencias){
            showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues tiene un registro de asistencia`, `${ruta}`)
            return next()
        }

        let proy_has_material = null 
        await validar_material_proyecto(proyecto).then(resultado=>{
            proy_has_material = resultado
        }).catch(error=>{
            throw('Ha ocurido un error al realizar la validacion correspondiente: ', error)
        })
        if(proy_has_material){
            showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues hay material en el proyecto`, `${ruta}`)
            return next()
        }

        let proy_has_presupuesto = null 
        await validar_presupuesto_proyecto(proyecto).then(resultado=>{
            proy_has_presupuesto = resultado
        }).catch(error=>{
            throw('Ha ocurido un error al realizar la validacion correspondiente: ', error)
        })
        if(proy_has_presupuesto){
            showError(res, 'Error eliminando proyecto', `El proyecto ${proyecto} no se pudo eliminar pues tiene un presupuesto definido`, `${ruta}`)
            return next()
        }

        await eliminar_proyecto(proyecto).catch(error=>{
            throw('Error al eliminar el proyecto', error)
        })
        
        res.redirect(`/${ruta}`)
        return next()
        
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
    getDatosViaticosProyecto,
    getDepositosProyecto,
    getComprobacionesProyecto,
    getInventarioProyecto,
    createProyecto,
    updateNombreProyecto,
    updateDocumentacionProyecto,
    updateGaleriaProyecto,
    deleteProyectoUbicacion
}