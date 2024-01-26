const formatear_fecha = (fecha, formato)=>{
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
const mostrar_error = (res, titulo, mensaje, ruta, icono='info', time=8000)=>{
    res.render('Error/showInfo', {
        title: titulo,
        alert: true,
        alertTitle: 'INFORMACION',
        alertMessage: mensaje,
        alertIcon: icono,
        showConfirmButton: true,
        timer: time,
        ruta: ruta
    })
}
const mostrar_mensaje_inicio = (res, mensaje, ruta, icono)=>{
    res.render('login', {
        alert: true,
        alertTitle: 'ADVERTENCIA',
        alertMessage: mensaje,
        alertIcon: icono,
        showConfirmButton: true,
        timer: 2000,
        ruta: ruta 
    })
} 

export {
    formatear_fecha,
    mostrar_error,
    mostrar_mensaje_inicio
}