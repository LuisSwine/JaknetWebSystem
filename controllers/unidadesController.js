import { crear_unidad, editar_unidad, eliminar_unidad, seleccionar_unidad, seleccionar_unidades, validar_unidades_compra, validar_unidades_inventario, validar_unidades_proyecto, validar_unidades_usuario } from "../models/Unidad.js";

const getUnidades = async(req, res, next) =>{
    try {

        await seleccionar_unidades().then(resultado=>{
            req.unidades = resultado
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener las unidades: ', error)
        })

    } catch (error) {
        console.log(error)
        return next()
    }
}
const setUnidad = async(req, res, next) =>{
    try {
        const data = {
            nombre: req.body.nombre,
            abreviatura: req.body.abreviatura,
            codigo_sat: req.body.codigo_sat
        }

        await crear_unidad(data).then(_=>{
            res.redirect('/unidades/administrar')
            return next() 
        }).catch(error=>{
            throw('Ha ocurrido un error al registrar la nueva unidad: ', error)
        })   
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getUnidad = async(req, res, next) =>{
    try {
        await seleccionar_unidad(req.query.unidad).then(resultado=>{
            req.unidad = resultado
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener la información de la unidad: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const updateUnidad = async(req, res, next) =>{
    try {
        const folio       = req.body.folio
        const nombre      = req.body.nombre
        const abreviatura = req.body.abreviatura
        const codigo_sat  = req.body.codigo_sat

        await editar_unidad(nombre, abreviatura, codigo_sat, folio).then(_=>{
            res.redirect('/unidades/administrar')
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al editar la unidad: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const deleteUnidad = async(req, res, next) =>{
    try {
        //Primero verificamos que la unidad no este siendo utilizada en algun producto
        const folio = req.query.unidad

        let validar_inventario = false
        let validar_compras = false
        let validar_proyectos = false
        let validar_usuarios = false

        await validar_unidades_inventario(folio).then(r=>{
            validar_inventario = r
        }).catch(e=>{
            throw('Ha ocurrido un error al validar las unidades en el inventario: ', e)
        })
        await validar_unidades_compra(folio).then(r=>{
            validar_compras = r
        }).catch(e=>{
            throw('Ha ocurrido un error al validar las unidades en las compras: ', e)
        })
        await validar_unidades_proyecto(folio).then(r=>{
            validar_proyectos = r
        }).catch(e=>{
            throw('Ha ocurrido un error al validar las unidades en los proyectos: ', e)
        })
        await validar_unidades_usuario(folio).then(r=>{
            validar_usuarios = r
        }).catch(e=>{
            throw('Ha ocurrido un error al validar las unidades en los usuarios: ', e)
        })

        if(!validar_inventario && !validar_compras && !validar_proyectos && !validar_usuarios){
            await eliminar_unidad(folio).then(_=>{
                res.redirect('/unidades/administrar')
                return next() 
            }).catch(e=>{
                throw('Ha ocurrido un error al eliminar la unidad: ', e)
            })
        }

        
    } catch (error) {
        console.log(error)
        return next()
    }
}

export {
    getUnidades,
    getUnidad,
    updateUnidad,
    setUnidad,
    deleteUnidad
}