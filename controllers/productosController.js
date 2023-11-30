import { registrar_marca, seleccionar_marca_por_nombre } from "../models/Marca.js";
import { registrar_categoria, registrar_producto, registrar_tipo, seleccionar_categoria_por_nombre, seleccionar_categorias_productos, seleccionar_productos, seleccionar_tipo_por_nombre, seleccionar_tipos_productos, seleccionar_producto, editar_producto, validar_producto_inventario, validar_producto_proyecto, validar_producto_usuario, eliminar_producto } from "../models/Producto.js";
import { registrar_relacion_marca_proveedor, validar_relacion_marca_proveedor } from "../models/Proveedor.js";

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
const selectCategoriasProductos = async(req, _, next) =>{
    try {
        await seleccionar_categorias_productos().then(resultado=>{
            req.categorias = resultado;
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener las categorias: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const selectTipoProducto = async(req, _, next) =>{
    try {
        await seleccionar_tipos_productos().then(resultado=>{
            req.tipos = resultado
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener los tipos de producto: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const setProductoProveedor = async(req, res, next) =>{
    try {
        const registro = {
            sku: req.body.sku,
            descripcion: req.body.descripcion,
            categoria: req.body.categoria,
            tipo: req.body.tipo,
            marca: req.body.marca,
            precio: req.body.precio,
            enlace: req.body.enlace
        }

        const proveedor = req.body.proveedor;
        const ruta = `/proveedores/perfil?proveedor=${proveedor}` 

        if (registro.marca == 'other'){
            const n_marca = req.body.nueva_marca
            await registrar_marca(n_marca).catch(error=>{
                throw('Ha ocurrido un error al registrar la marca: ', error)
            })
            await seleccionar_marca_por_nombre(n_marca).then(resultado => {
                registro.marca = resultado
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener la marca: ', error)
            })
        }

        if (registro.tipo == 'other'){
            const n_tipo = req.body.nuevo_tipo
            await registrar_tipo(n_tipo).catch(error=>{
                throw('Ha ocurrido un error al registrar el nuevo tipo: ', error)
            })
            await seleccionar_tipo_por_nombre(n_tipo).then(resultado => {
                registro.tipo = resultado
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener el tipo: ', error)
            })
        }

        if (registro.categoria == 'other'){
            const n_categoria = req.body.nueva_categoria
            await registrar_categoria(n_categoria).catch(error=>{
                throw('Ha ocurrido un error al registrar la categoria: ', error)
            })
            await seleccionar_categoria_por_nombre(n_categoria).then(resultado => {
                registro.categoria = resultado
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener la categoria: ', error)
            })
        }

        const relacion = {
            marca: registro.marca,
            proveedor: proveedor
        }

        let does_match_exist = false
        await validar_relacion_marca_proveedor(relacion.marca, relacion.proveedor).then(resultado=>{
            does_match_exist = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al validar la relación entre la marca y el proveedor: ', error)
        })
        if(!does_match_exist){
            await registrar_relacion_marca_proveedor(relacion).catch(error=>{
                throw('Error al registrar la relación entre la marca y el proveedor: ', error)
            })
        }
        
        await registrar_producto(registro).then(_=>{
            res.redirect(ruta)
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al registrar el nuevo producto: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const selectProductos = async(req, _, next) =>{
    try {
        await seleccionar_productos().then(resultado=>{
            req.productos = resultado
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener los productos: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const selectProducto = async(req, _, next) =>{
    try {
        await seleccionar_producto(req.query.producto).then(resultado=>{
            req.producto = resultado
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al obtener el productoi: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const createProducto = async(req, res, next) =>{
    try {
        const producto = {
            sku: req.body.sku,
            descripcion: req.body.descripcion,
            categoria: req.body.categoria,
            tipo: req.body.tipo,
            marca: req.body.marca,
            precio: req.body.precio,
            enlace: req.body.enlace
        }

        if (producto.marca == 'other'){
            const n_marca = req.body.nueva_marca
            await registrar_marca(n_marca).catch(error=>{
                throw('Ha ocurrido un error al registar la marca: ', error)
            })
            await seleccionar_marca_por_nombre(n_marca).then(resultado=>{
                producto.marca = resultado
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener la marca registrada: ', error)
            })
            const relacion = {
                marca: producto.marca,
                proveedor: req.body.proveedor
            }
            await registrar_relacion_marca_proveedor(relacion).catch(error=>{
                throw('Ha ocurrido un error al registrar la relación entre la marca y el proveedor: ', error)
            })
        }

        if (producto.tipo == 'other'){
            const n_tipo = req.body.nuevo_tipo
            await registrar_tipo(n_tipo).catch(error=>{
                throw('Ha ocurrido un error al registar el nuevo tipo de producto: ', error)
            })
            await seleccionar_tipo_por_nombre(n_tipo).then(resultado=>{
                producto.tipo = resultado;
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener el tipo del producto registrado: ', error);
            })
        }

        if (producto.categoria == 'other'){
            const n_categoria = req.body.nueva_categoria
            await registrar_categoria(n_categoria).catch(error=>{
                throw ('Ha ocurrido un error al registrar una nueva categoría', error)
            })
            await seleccionar_categoria_por_nombre(n_categoria).then(resultado=>{
                producto.categoria = resultado
            }).catch(error=>{
                throw('Ha ocurrido un error al obtener la categoria registrada: ', error)
            })
        }

        await registrar_producto(producto).then(_=>{
            res.redirect('/productos/administrar')
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al registrar el producto: ', error)
        })   
    } catch (error) {
        console.log(error)
        return next()
    }
}
const editProducto = async(req, res, next) =>{
    try {
        const folio       = req.body.folio
        const descripcion = req.body.descripcion
        const categoria   = req.body.categoria
        const tipo        = req.body.tipo
        const marca       = req.body.marca
        const precio      = req.body.precio
        const enlace      = req.body.enlace

        await editar_producto(descripcion, categoria, tipo, marca, precio, enlace, folio).then(_=>{
            res.redirect('/productos/administrar')
            return next()
        }).catch(error=>{
            throw('Ha ocurrido un error al editar el producto: ', error)
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
const deleteProducto = async(req, res, next) =>{
    try {
        const producto = req.query.producto
        
        //Primero verificamos si hay existencias en el inventario
        let its_in_invent, its_in_project, its_w_user = null
        await validar_producto_inventario(producto).then(resultado=>{
            its_in_invent = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al buscar el producto en el inventario: ', error)
        })
        await validar_producto_proyecto(producto).then(resultado=>{
            its_in_project = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al buscar el producto en los proyectos: ', error)
        })
        await validar_producto_usuario(producto).then(resultado=>{
            its_w_user = resultado
        }).catch(error=>{
            throw('Ha ocurrido un error al buscar el producto en los usuarios: ', error)
        })
         
        if(its_in_invent || its_in_project || its_w_user){
            showError(res, 'No se ha podido eliminar el producto', 'Este producto tiene existencias en el inventario, algun proyecto o esta en posesión de un usuario por lo que no es posible eliminarlo', 'productos/administrar')
            return next()
        }

        await eliminar_producto(producto).catch(error=>{
            throw('Ha ocurrido un error al borrar el producto: ', error)
        })

        res.redirect('/productos/administrar')
        return next()
    } catch (error) {
        console.log(error)
        return next()
    }
}
export {
    selectCategoriasProductos,
    selectTipoProducto,
    setProductoProveedor,
    selectProductos,
    selectProducto,
    createProducto,
    editProducto,
    deleteProducto
}