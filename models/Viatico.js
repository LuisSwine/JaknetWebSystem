import conexion from '../database/db.js'

const viaticos_comodin = (query)=>{
    return new Promise((resolve, reject)=>{
        conexion.query(query, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}

const obtener_suma_depositos = ()=>{
    return new Promise((resolve, reject) => {
        conexion.query("SELECT SUM(monto) as suma_depositos FROM viaticos_depositos_view001 WHERE YEAR(fecha) >= 2025", (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila[0].suma_depositos)
            }
        })
    })
}
const obtener_suma_comprobaciones = ()=>{
    return new Promise((resolve, reject) => {
        conexion.query("SELECT SUM(monto) as suma_comprobaciones FROM viaticos_comprobaciones_view001 WHERE YEAR(fecha) >= 2025", (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila[0].suma_comprobaciones)
            }
        })
    })
}
const obtener_suma_depositos_definido = (inicio, termino)=>{
    return new Promise((resolve, reject) => {
        conexion.query("SELECT SUM(monto) as suma_depositos FROM viaticos_depositos_view001 WHERE (fecha BETWEEN ? AND ?)", [inicio, termino], (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila[0].suma_depositos)
            }
        })
    })
}
const obtener_suma_comprobaciones_definido = (inicio, termino)=>{
    return new Promise((resolve, reject) => {
        conexion.query("SELECT SUM(monto) as suma_comprobaciones FROM viaticos_comprobaciones_view001 WHERE (fecha BETWEEN ? AND ?)", [inicio, termino], (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila[0].suma_comprobaciones)
            }
        })
    })
}
const obtener_depositos_usuario_definido = (inicio, termino, usuario)=>{
    return new Promise ((resolve,reject)=> {
        conexion.query("SELECT * FROM viaticos_depositos_view001 WHERE id_bene = ? AND (fecha BETWEEN ? AND ?) ORDER BY folio DESC", [usuario, inicio, termino], (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const obtener_depositos_usuario = (usuario)=>{
    return new Promise ((resolve,reject)=> {
        conexion.query("SELECT * FROM viaticos_depositos_view001 WHERE id_bene = ? ", usuario, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const obtener_comprobantes_usuario_definido = (inicio, termino, usuario)=>{
    return new Promise ((resolve,reject)=> {
        conexion.query("SELECT * FROM viaticos_comprobaciones_view001 WHERE folio_emisor = ? AND (fecha BETWEEN ? AND ?) ORDER BY folio DESC", [usuario, inicio, termino], (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const obtener_comprobantes_usuario = (usuario)=>{
    return new Promise ((resolve,reject)=> {
        conexion.query("SELECT * FROM viaticos_comprobaciones_view001 WHERE folio_emisor = ? ORDER BY folio DESC", usuario, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const obtener_depositos_definido = (inicio, termino) =>{
    return new Promise ((resolve ,reject )=> {
        conexion.query("SELECT * FROM viaticos_depositos_view001 WHERE (fecha BETWEEN ? AND ?) ORDER BY folio DESC", [inicio, termino], (error, filas)=>{
            if(error){
                reject(error)
            }else{
                resolve(filas)
            }
        })
    })
}
const obtener_depositos = ()=>{
    return new Promise ((resolve ,reject )=> {
        conexion.query("SELECT * FROM viaticos_depositos_view001", (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const obtener_comprobantes = ()=>{
    return new Promise ((resolve ,reject )=> {
        conexion.query("SELECT * FROM viaticos_comprobaciones_view001", (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const obtener_comprobantes_definido = (inicio, termino) =>{
    return new Promise ((resolve ,reject )=> {
        conexion.query("SELECT * FROM viaticos_comprobaciones_view001 WHERE (fecha BETWEEN ? AND ?) ORDER BY folio DESC", [inicio, termino], (error, filas)=>{
            if(error){
                reject(error)
            }else{
                resolve(filas)
            }
        })
    })
}
const obtener_clave = (clave)=>{
    return new Promise ((resolve,reject)=>{
        conexion.query('SELECT * FROM cat021_claves_seguimiento WHERE clave = ?', clave, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila[0].folio);
            }
        })
    })
}
const obtener_clave_por_folio = (folio)=>{
    return new Promise((resolve,reject)=> {
        conexion.query("SELECT * FROM claves_view001 WHERE folio = ?", folio, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const obtener_monto_saldado = (folio_clave) =>{
    return new Promise ((resolve,reject)=>{
        conexion.query("SELECT SUM(monto) as rendido FROM viaticos_comprobaciones_view001 WHERE folio_clave = ?", folio_clave, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const obtener_claves = ()=>{
    return new Promise ((resolve,reject)=>{
        conexion.query("SELECT * FROM claves_view001", (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const obtener_claves_usuario = (usuario)=>{
    return new Promise ((resolve,reject)=>{
        conexion.query("SELECT * FROM cat021_claves_seguimiento WHERE usuario = ? ORDER BY folio DESC", usuario, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const obtener_claves_usuario_view = (usuario)=>{
    return new Promise ((resolve, reject)=>{
        conexion.query("SELECT * FROM claves_view001 WHERE folio_usuario = ?", usuario, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const obtener_saldo_usuario = (usuario)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT saldo FROM cat001_usuarios WHERE folio = ? AND YEAR(fecha) >= 2025", usuario, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila[0].saldo);
            }
        })
    })
}
const obtener_comprobaciones_clave = (clave)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("SELECT * FROM viaticos_comprobaciones_view001 WHERE folio_clave = ?", clave, (error, filas)=>{
            if(error){
                reject(error)
            }else{
                resolve(filas)
            }
        })
    })
}
const obtener_ultimos_movimientos = (usuario)=>{
    return new  Promise ((resolve,reject)=> {
        console.log(usuario)
        conexion.query("SELECT * FROM viaticos_depositos_view001 WHERE id_bene = ? ORDER BY FOLIO DESC LIMIT 5", usuario, (error, fila)=>{
            if(error){
                reject(error)
            }else{
                resolve(fila)
            }
        })
    })
}
const registrar_clave = (clave)=>{
    return new Promise((resolve, reject)=>{
        conexion.query('INSERT INTO cat021_claves_seguimiento SET ?', clave, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve();
            }
        })
    })
}
const registrar_operacion = (operacion)=>{
    return new Promise((resolve, reject)=>{
        conexion.query('INSERT INTO cat022_operaciones SET ?', operacion, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve();
            }
        })
    })
}
const definir_presupuesto_proyecto = (presupuesto, proyecto)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("UPDATE cat009_proyectos SET presupuesto = ? WHERE folio = ?", [presupuesto, proyecto], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const actualizar_saldo = (usuario, saldo)=>{
    return new Promise ((resolve,reject)=>{
        conexion.query("UPDATE cat001_usuarios SET saldo = ? WHERE folio = ? YEAR(fecha) >= 2025", [saldo, usuario], (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const validar_comprobantes_deposito = (clave)=>{
    return new Promise ((resolve,reject)=>{
        conexion.query("SELECT folio FROM viaticos_comprobaciones_view001 WHERE folio_clave = ?", clave, (error, fila)=>{
            if(error){
                reject(error)
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
const eliminar_deposito = (deposito)=>{
    return new Promise ((resolve,reject)=>{
        conexion.query("DELETE FROM cat022_operaciones WHERE folio = ?", deposito, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const eliminar_clave = (clave)=>{
    return new Promise ((resolve,reject)=>{
        conexion.query("DELETE FROM cat021_claves_seguimiento WHERE folio = ?", clave, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}
const eliminar_operacion = (operacion)=>{
    return new Promise((resolve, reject)=>{
        conexion.query("DELETE FROM cat022_operaciones WHERE folio = ?", operacion, (error, _)=>{
            if(error){
                reject(error)
            }else{
                resolve();
            }
        })
    })
}

export {
    viaticos_comodin,
    obtener_suma_depositos,
    obtener_suma_comprobaciones,
    obtener_suma_depositos_definido,
    obtener_depositos,
    obtener_suma_comprobaciones_definido,
    obtener_depositos_definido,
    obtener_comprobantes,
    obtener_comprobantes_definido,
    obtener_clave,
    obtener_claves,
    obtener_claves_usuario,
    obtener_claves_usuario_view,
    obtener_saldo_usuario,
    obtener_clave_por_folio,
    obtener_monto_saldado,
    obtener_comprobaciones_clave,
    obtener_comprobantes_usuario,
    obtener_comprobantes_usuario_definido,
    obtener_depositos_usuario,
    obtener_depositos_usuario_definido,
    obtener_ultimos_movimientos,
    registrar_clave,
    registrar_operacion,
    definir_presupuesto_proyecto,
    actualizar_saldo,
    validar_comprobantes_deposito,
    eliminar_clave,
    eliminar_deposito,
    eliminar_operacion
}