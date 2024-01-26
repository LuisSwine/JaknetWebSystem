CREATE TABLE cat028_facturas (
folio INT(10) not null primary key auto_increment,
identificador varchar(15) not null,
proveedor int(10) not null,
proyecto int(10) not null,
total double,
fecha date,
enlace varchar(300) not null 
);

CREATE TABLE op019_factura_producto(
folio int(10) primary key not null auto_increment,
factura int(10) not null,
producto int(10) not null,
cantidad double not null,
precio double,
unidad int(10) not null
);

CREATE TABLE cat029_eventos_factura(
folio int(10) not null primary key auto_increment,
evento varchar(255) not null
);

INSERT INTO cat029_eventos_factura (evento) VALUES('Se creó el registro de la factura');
INSERT INTO cat029_eventos_factura (evento) VALUES('Se añadió un producto a la factura');
INSERT INTO cat029_eventos_factura (evento) VALUES('Se editó un producto de la factura');
INSERT INTO cat029_eventos_factura (evento) VALUES('Se eliminó un producto de la factura');
INSERT INTO cat029_eventos_factura (evento) VALUES('Se editó información de la factura');
INSERT INTO cat029_eventos_factura (evento) VALUES('Se eliminó la factura');

CREATE TABLE op020_bitacora_facturas(
folio int(10) not null primary key auto_increment,
usuario int(10) not null,
fecha date,
factura int(10) not null,
evento int(10) not null
);

CREATE VIEW facturas_view001 AS
SELECT
cat028_facturas.folio as folio,
cat028_facturas.identificador as identificador,
cat028_facturas.proveedor as folio_proveedor,
cat014_proveedores.nombre as proveedor,
cat028_facturas.proyecto as folio_proyecto,
cat009_proyectos.nombre as proyecto,
cat009_proyectos.ubicacion as folio_ubicacion,
cat007_ubicaciones.nombre as ubicacion,
cat007_ubicaciones.cliente as folio_cliente,
cat003_clientes.nombre as cliente,
cat028_facturas.total as total,
cat028_facturas.fecha as fecha,
cat028_facturas.enlace as enlace
FROM cat028_facturas
INNER JOIN cat014_proveedores ON cat028_facturas.proveedor = cat014_proveedores.folio
INNER JOIN cat009_proyectos ON cat028_facturas.proyecto = cat009_proyectos.folio
INNER JOIN cat007_ubicaciones ON cat009_proyectos.ubicacion = cat007_ubicaciones.folio
INNER JOIN cat003_clientes ON cat007_ubicaciones.cliente = cat003_clientes.folio;

CREATE VIEW productos_factura_view001 AS
SELECT
op019_factura_producto.folio as folio,
op019_factura_producto.factura as folio_factura,
cat028_facturas.identificador as identificador_factura,
cat028_facturas.proveedor as folio_proveedor,
cat014_proveedores.nombre as proveedor,
op019_factura_producto.producto as folio_producto,
cat016_productos.sku as sku_producto,
cat016_productos.descripcion as descripcion_producto,
cat016_productos.marca as folio_marca,
cat015_marcas.nombre as marca,
op019_factura_producto.precio as precio,
op019_factura_producto.cantidad as cantidad,
op019_factura_producto.unidad as folio_unidad,
cat023_unidades.nombre as unidad,
cat023_unidades.abreviatura as unidad_abreviatura,
cat023_unidades.codigo_sat as codigo_sat
FROM op019_factura_producto
INNER JOIN cat028_facturas ON op019_factura_producto.factura = cat028_facturas.folio
INNER JOIN cat014_proveedores ON cat028_facturas.proveedor = cat014_proveedores.folio
INNER JOIN cat016_productos ON op019_factura_producto.producto = cat016_productos.folio
INNER JOIN cat015_marcas ON cat016_productos.marca = cat015_marcas.folio
INNER JOIN cat023_unidades ON op019_factura_producto.unidad = cat023_unidades.folio;

CREATE VIEW bitacora_facturas_view001 AS
SELECT
op020_bitacora_facturas.folio as folio,
op020_bitacora_facturas.fecha as fecha,
op020_bitacora_facturas.factura as folio_factura,
cat028_facturas.identificador as identificador_factura,
cat028_facturas.proveedor as folio_proveedor,
cat014_proveedores.nombre as proveedor,
cat028_facturas.total as total_factura,
cat028_facturas.proyecto as folio_proyecto,
cat009_proyectos.nombre as proyecto,
cat009_proyectos.ubicacion as folio_ubicacion,
cat007_ubicaciones.nombre as ubicacion,
cat007_ubicaciones.cliente as folio_cliente,
cat003_clientes.nombre as cliente,
op020_bitacora_facturas.usuario as folio_usuario,
cat001_usuarios.nombres as nombre_usuario,
cat001_usuarios.apellidos as apellido_usuario,
op020_bitacora_facturas.evento as folio_evento,
cat029_eventos_factura.evento as evento
FROM op020_bitacora_facturas
INNER JOIN cat028_facturas ON op020_bitacora_facturas.factura = cat028_facturas.folio
INNER JOIN cat014_proveedores ON cat028_facturas.proveedor = cat014_proveedores.folio
INNER JOIN cat009_proyectos ON cat028_facturas.proyecto = cat009_proyectos.folio
INNER JOIN cat007_ubicaciones ON cat009_proyectos.ubicacion = cat007_ubicaciones.folio
INNER JOIN cat003_clientes ON cat007_ubicaciones.cliente = cat003_clientes.folio
INNER JOIN cat001_usuarios ON op020_bitacora_facturas.usuario = cat001_usuarios.folio
INNER JOIN cat029_eventos_factura ON op020_bitacora_facturas.evento = cat029_eventos_factura.folio;

ALTER VIEW `proyectos_asistencia_view001` AS SELECT 
`op005_roles`.`folio` AS `folio`,
`op005_roles`.`proyecto` AS `folio_proyecto`,
`cat009_proyectos`.`nombre` AS `proyecto`,
`cat009_proyectos`.`estatus` AS `folio_estatus`,
`cat007_ubicaciones`.folio AS folio_ubicacion,
cat007_ubicaciones.nombre AS ubicacion,
cat003_clientes.folio AS folio_cliente,
cat003_clientes.nombre AS cliente,
`cat025_estatus_proyecto`.`estatus` AS `estatus`,
`op005_roles`.`usuario` AS `folio_usuario`,
`cat001_usuarios`.`nombres` AS `nombres`,
`cat001_usuarios`.`apellidos` AS `apellidos`,
`op005_roles`.`rol` AS `folio_rol`
FROM `op005_roles`
INNER JOIN `cat009_proyectos` ON `op005_roles`.`proyecto` = `cat009_proyectos`.`folio`
INNER JOIN `cat025_estatus_proyecto` ON `cat009_proyectos`.`estatus` = `cat025_estatus_proyecto`.`folio`
INNER JOIN `cat001_usuarios` ON `op005_roles`.`usuario` = `cat001_usuarios`.`folio`
INNER JOIN cat007_ubicaciones ON cat009_proyectos.ubicacion = cat007_ubicaciones.folio
INNER JOIN cat003_clientes ON cat007_ubicaciones.cliente = cat003_clientes.folio;