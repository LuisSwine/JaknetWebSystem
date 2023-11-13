import { registrar_marca, seleccionar_marca_por_nombre } from "../models/Marca.js";
import { editar_proveedor, registrar_proveedor, registrar_relacion_marca_proveedor, seleccionar_marcas_proveedor, seleccionar_productos_proveedor, seleccionar_proveedor, seleccionar_proveedores, validar_relacion_marca_proveedor } from "../models/Proveedor.js";

const getProveedores = async(req, _, next) =>{
    try {
        await seleccionar_proveedores().then(resultado=>{
            req.proveedores = resultado
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener los proveedores registrados: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getProveedor = async(req, _, next) =>{
    try {
        await seleccionar_proveedor(req.query.proveedor).then(resultado=>{
            req.proveedor = resultado
            return next()
        }).catch(error=>{
            throw(`Ha ocurrido un error al obtener la información del proveedor: `, error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getMarcasProveedor = async(req, _, next)=>{
    try {
        await seleccionar_marcas_proveedor(req.query.proveedor).then(resultado=>{
            req.marcas = resultado
            return next()
        }).catch(error=>{
            throw("Error al obtener las marcas del proveedor: ", error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const getProductosProveedor = async(req, _, next)=>{
    try {
        await seleccionar_productos_proveedor(req.query.proveedor).then(resultado=>{
            req.productos = resultado
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener los productos del proveedor: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const setProveedor = async(req, res, next) =>{
    try {
        const proveedor = {
            nombre: req.body.nombre,
            web:    req.body.web
        }

        await registrar_proveedor(proveedor).then(_=>{
            res.redirect('/proveedores/administrar')
            return next()  
        }).catch(error=>{
            throw('Ha ocurrido un error al registrar al proveedor: ', error)
        })  
    } catch (error) {
        console.log(error)
        return next()
    }
}
const setMatchMarcaProveedor = async(req, res, next)=>{
    try {
        const registro = {
            marca: req.body.marca,
            proveedor: req.body.proveedor
        }

        const ruta = `/proveedores/perfil?proveedor=${registro.proveedor}` 

        if(registro.marca == 'other'){

            const n_marca = req.body.nueva_marca

            await registrar_marca(n_marca).catch(error=>{
                throw('Ha ocurrido un error al registrar la nueva marca: ', error)
            })

            await seleccionar_marca_por_nombre(n_marca).then(resultado=>{
                registro.marca = resultado
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener el folio de la marca: ', error)
            })
        }

        let does_match_exist = false

        await validar_relacion_marca_proveedor(registro.marca, registro.proveedor).then(resultado=>{
            does_match_exist = resultado
        }).catch(error=>{
            throw(`Error al validar la relacion marca - proveedor: ${error}`)
        })

        if(!does_match_exist){
            await registrar_relacion_marca_proveedor(registro).then(_=>{
                res.redirect(ruta)
                return next()
            }).catch(error=>{
                throw('Ha ocurrido un error al registrar la relacion entre la marca y el proveedor: ', error)
            })
        }
    } catch (error) {
        console.log(error)
        return next()
    }
}
const updateProveedor = async(req, res, next) =>{
    try {
        const folio  = req.body.folio
        const nombre = req.body.nombre
        const web    = req.body.web

        await editar_proveedor(folio, nombre, web).then(_=>{
            res.redirect('/proveedores/administrar')
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al actualizar la información del proveedor: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}

export {
    getProveedores,
    getProveedor,
    getMarcasProveedor,
    getProductosProveedor,
    setProveedor,
    setMatchMarcaProveedor,
    updateProveedor
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
exports.deleteMarcaProveedor = async(req, res, next)=>{
    try {
        let registro = req.query.registro
        let proveedor = req.query.proveedor

        conexion.query("DELETE FROM op007_marca_proveedor WHERE folio = ?", [registro], (error, fila)=>{
            if(error){throw error;}
            else{
                let ruta = `/proveedores/perfil?proveedor=${proveedor}`
                res.redirect(ruta)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.deleteProv = async(req, res, next) =>{
    try {
        //para realizar un delete seguro es necesario verificar primero que no tenga marcas relacionadas
        let proveedor = req.query.folio

        conexion.query("SELECT folio FROM op007_marca_proveedor WHERE proveedor = ?", [proveedor], (error, fila)=>{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    //Podemos eliminar de manera segura
                    conexion.query("DELETE FROM cat014_proveedores WHERE folio = ?", [proveedor], function(error2, filas){
                        if(error2){
                            throw error2
                        }else{
                            res.redirect('/proveedores/administrar')
                            return next()
                        }
                    })
                }else{
                    showError(res, 'No se puede eliminar al proveedor', 'Este proveedor provee algunas marcas que se encuentran registradas, edite esta información antes de eliminar al proveedor', 'proveedores/administrar')
                    return next()
                }
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
*/