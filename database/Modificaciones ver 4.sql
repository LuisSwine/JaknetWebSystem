/*Query para actualizacion del 02 de febrero de 2024*/
USE bd_scgj_proof;

create table op001_registro_login (
	folio INT(10) PRIMARY KEY AUTO_INCREMENT,
    usuario INT(10),
    fecha DATE,
    hora TIME
);

create table op021_registro_logout (
	folio INT(10) PRIMARY KEY AUTO_INCREMENT,
    usuario INT(10),
    fecha DATE,
    hora TIME
);

/*Añadimos la columna status a la tabla cat001_usuarios para permitir el bloque de usuarios*/
ALTER TABLE cat001_usuarios ADD COLUMN estatus INT DEFAULT 0;

/*Creamos la tabla operativa para la creación y eliminación de tareas*/
create table op022_historial_tareas (
	folio INT(10) PRIMARY KEY AUTO_INCREMENT,
    tarea INT(10),
    usuario INT(10),
    fecha datetime,
    accion INT(2)
);

/*Creamos la tabla para registrar las acciones de asignación de tarea*/
create table op023_acciones_tarea(
	folio INT(10) PRIMARY KEY AUTO_INCREMENT,
    administrador INT(10),
    encargado INT(10),
    tarea INT(10),
    fecha datetime,
    accion INT(2)
);

/*Cambiamos el nombre del rol de proyecto Gentente por Lider de Proyecto*/
UPDATE cat011_roles_proyecto SET rol = 'Lider de Proyecto' WHERE folio = 1;

