const conexion = require('../database/db')
const {promisify} = require('util')
const { query } = require('../database/db')
const { nextTick } = require('process')

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


//CRUD PARA LA GESTION DE CONTACTOS
exports.selectContacts = async(req, res, next) =>{
    try {
        if(req.query.cliente){
            conexion.query("SELECT * FROM contactos_view001 WHERE folio_cliente = ?", [req.query.cliente], (error, filas)=>{
                if(error){
                    throw error;
                }else{
                    req.contactosCliente = filas
                    return next()
                }
            })
        }else{
            conexion.query("SELECT * FROM contactos_view001", (error, filas)=>{
                if(error){
                    throw error;
                }else{
                    req.contactos = filas
                    return next()
                }
            })
        }
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.selectContact = async(req, res, next) =>{
    try {
        conexion.query("SELECT * FROM cat006_contactos WHERE folio = ?", [req.query.contacto], (error, fila)=>{
            if(error){
                throw error;
            }else{
                req.contacto = fila
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.selectContactsUbi = async(req, res, next)=>{
    try {
        conexion.query("SELECT * FROM contactos_ubicacion_view001 WHERE folio_ubicacion = ?", [req.query.ubicacion], (error, fila)=>{
            if(error){
                throw error
            }else{
                req.contactos = fila
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.createContact = async(req, res, next) =>{
    try {
        let data = {
            nombre: req.body.nombre,
            email: req.body.email,
            telefono: req.body.telefono,
            descripcion: req.body.descripcion,
            cliente: req.body.cliente
        }
        let insert = "INSERT INTO cat006_contactos SET ?"
        conexion.query(insert, data, function(error, results){
            if(error){
                throw error
            }else{
                if(req.body.flag == 1){
                    res.redirect(`/clientes/administrar?cliente=${data.cliente}`)
                }else{
                   res.redirect('/admincontactos')
                }
                return next()    
            }
        })    
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.editContact = async(req, res, next) =>{
    try {
        let folio       = req.body.folio
        let nombre      = req.body.nombre 
        let email       = req.body.email
        let telefono    = req.body.telefono
        let descripcion = req.body.descripcion
        let cliente     = req.body.cliente

        let sql = "UPDATE cat006_contactos SET nombre = ?, email = ?, telefono = ?, descripcion = ? WHERE folio = ?"

        conexion.query(sql, [nombre, email, telefono, descripcion, folio], function(error, results){
            if(error){
                throw error
            }else{
                res.redirect(`/clientes/administrar?cliente=${cliente}`)
                return next()
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}
exports.deleteContact = async(req, res, next) =>{
    try {
        let contacto = req.query.contacto
        let ruta = 'admincontactos'
        if(req.query.flag == 1) ruta = `clientes/administrar?cliente=${req.query.cliente}`
        //confirmamos que el contacto no este registrado en otra tabla
        conexion.query("SELECT folio FROM cat013_cotizaciones WHERE contacto = ?", [contacto], (error, fila)=>{{
            if(error){
                throw error
            }else{
                if(fila.length === 0){
                    conexion.query("SELECT folio FROM op015_contacto_ubicacion WHERE contacto = ?", [contacto], (error2, fila2)=>{
                        if(error2){
                            throw error2
                        }else{
                            if(fila2.length === 0){
                                conexion.query("DELETE FROM cat006_contactos WHERE folio = ?", [contacto], function(error3, filas){
                                    if(error3){
                                        throw error3
                                    }else{
                                        res.redirect(`/${ruta}`)
                                        return next()
                                    }
                                })
                            }else{
                                showError(res, 'ERROR', 'No se pudo eliminar al contacto pues se esta usando', ruta)
                                return next()
                            }
                        }
                    })
                }else{
                    showError(res, 'ERROR', 'No se pudo eliminar al contacto pues se esta usando', ruta)
                    return next()
                }
            }
        }})
    } catch (error) {
        console.log(error)
        return next()
    }
}
//FIN DEL CRUD PARA LA GESTION DE CONTACTOS

//RELACION CON UBICACION
exports.relacionarConUbi = async(req, res, next)=>{
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
                if(req.body.flag == 1) {posibleRuta = `/ubicaciones/perfil?ubicacion=${data.ubicacion}&cliente=${req.body.cliente}&flag=${req.body.flag}`}
                else if(req.body.flag == 0){posibleRuta = `/ubicaciones/perfil?ubicacion=${data.ubicacion}&flag=${req.body.flag}`}
                
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
exports.eliminarRelacion = async(req, res, next)=>{
    try {
        let posibleRuta = ''
        if(req.query.flag == 1) {posibleRuta = `/ubicaciones/perfil?ubicacion=${req.query.ubicacion}&cliente=${req.query.cliente}&flag=${req.query.flag}`}
        else if(req.query.flag == 0){posibleRuta = `/ubicaciones/perfil?ubicacion=${req.query.ubicacion}&flag=${req.query.flag}`}
        
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
