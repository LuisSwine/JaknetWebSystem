ALTER TABLE op016_movimientos_inventario ADD usuario_afectado INT(10) NOT NULL;
ALTER TABLE op016_movimientos_inventario CHANGE COLUMN usuario usuario_registra INT(1) NOT NULL;
ALTER TABLE op016_movimientos_inventario ADD almacen INT(10) NOT NULL;

ALTER VIEW movimientos_invent_view001
AS SELECT 
`op016_movimientos_inventario`.`folio` AS `folio`, 
`op016_movimientos_inventario`.`usuario_afectado` AS `folio_usuario_afectado`,
`ua`.`nombres` AS `nombre_usuario_afectado`, 
`ua`.`apellidos` AS `apellido_usuario_afectado`, 
`op016_movimientos_inventario`.`usuario_registra` AS `folio_usuario_registra`,
`ur`.`nombres` AS `nombre_usuario_registra`, 
`ur`.`apellidos` AS `apellido_usuario_registra`, 
`op016_movimientos_inventario`.`producto` AS `folio_producto`, 
`cat016_productos`.`sku` AS `sku`, 
`cat016_productos`.`descripcion` AS `descripcion`, 
`op016_movimientos_inventario`.`cantidad` AS `cantidad`, 
`op016_movimientos_inventario`.`fecha` AS `fecha`,
`cat027_almacenes`.`folio` AS `folio_almacen`,
`cat027_almacenes`.`nombre` AS `almacen` 
FROM `op016_movimientos_inventario` 
JOIN `cat001_usuarios` AS `ua` ON `op016_movimientos_inventario`.`usuario_afectado` = `ua`.`folio`
JOIN `cat001_usuarios` AS `ur` ON `op016_movimientos_inventario`.`usuario_registra` = `ur`.`folio`
JOIN `cat016_productos` ON `op016_movimientos_inventario`.`producto` = `cat016_productos`.`folio`
JOIN `cat027_almacenes` ON `op016_movimientos_inventario`.`almacen` = `cat027_almacenes`.`folio`;

CREATE TABLE cat027_almacenes (
  folio INT(10) NOT NULL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  ubicacion VARCHAR(300) NOT NULL
);


ALTER TABLE cat027_almacenes
MODIFY folio INT(10) AUTO_INCREMENT;

ALTER TABLE cat020_inventario
ADD almacen INT(10) NOT NULL;

ALTER VIEW inventario_view001
AS SELECT 
        `cat020_inventario`.`folio` AS `folio`, 
		`cat027_almacenes`.`folio` AS `folio_almacen`,
		`cat027_almacenes`.`nombre` AS `almacen`, 
        `cat020_inventario`.`producto` AS `folio_producto`,
        `cat016_productos`.`descripcion` AS `producto`,
        `cat016_productos`.`sku` AS `sku`,
        `cat016_productos`.`categoria` AS `folio_categoria`,
        `cat017_categoria_producto`.`nombre` AS `categoria`,
        `cat016_productos`.`tipo` AS `folio_tipo`,
        `cat018_tipo_producto`.`nombre` AS `tipo`,
        `cat016_productos`.`marca` AS `folio_marca`,
        `cat015_marcas`.`nombre` AS `marca`,
        `cat020_inventario`.`cantidad` AS `cantidad`,
        `cat020_inventario`.`unidades` AS `folio_unidad`,
        `cat023_unidades`.`nombre` AS `unidad`,
        `cat023_unidades`.`abreviatura` AS `abreviatura`,
        `cat023_unidades`.`codigo_sat` AS `codigo_sat`
    FROM
        ((((((`cat020_inventario`
        JOIN `cat016_productos` ON ((`cat020_inventario`.`producto` = `cat016_productos`.`folio`)))
        JOIN `cat017_categoria_producto` ON ((`cat016_productos`.`categoria` = `cat017_categoria_producto`.`folio`)))
        JOIN `cat018_tipo_producto` ON ((`cat016_productos`.`tipo` = `cat018_tipo_producto`.`folio`)))
        JOIN `cat015_marcas` ON ((`cat016_productos`.`marca` = `cat015_marcas`.`folio`)))
        JOIN `cat023_unidades` ON ((`cat020_inventario`.`unidades` = `cat023_unidades`.`folio`)))
        JOIN `cat027_almacenes` ON ((`cat020_inventario`.`almacen` = `cat027_almacenes`.`folio`)));

CREATE TABLE op018_movs_invent_proy (
	folio INT(10) NOT NULL PRIMARY KEY,
    usuario_registra INT(10) NOT NULL,
    producto INT(10) NOT NULL,
    cantidad INT(10) NOT NULL,
    fecha datetime NOT NULL,
    proyecto INT(10) NOT NULL,
    almacen INT(10) NOT NULL
);

ALTER TABLE op018_movs_invent_proy
MODIFY folio INT(10) AUTO_INCREMENT;

CREATE VIEW movs_invent_proys_view001
AS SELECT 
`op018_movs_invent_proy`.`folio` AS `folio`, 
`op018_movs_invent_proy`.`usuario_registra` AS `folio_usuario_registra`,
`cat001_usuarios`.`nombres` AS `nombre_usuario_afectado`, 
`cat001_usuarios`.`apellidos` AS `apellido_usuario_afectado`, 
`op018_movs_invent_proy`.`producto` AS `folio_producto`, 
`cat016_productos`.`sku` AS `sku`, 
`cat016_productos`.`descripcion` AS `descripcion`, 
`op018_movs_invent_proy`.`cantidad` AS `cantidad`, 
`op018_movs_invent_proy`.`fecha` AS `fecha`,
`op018_movs_invent_proy`.`proyecto` as `folio_proyecto`,
`cat009_proyectos`.`nombre` as `proyecto`,
`cat009_proyectos`.`ubicacion` as `folio_ubicacion`,
`cat007_ubicaciones`.`nombre` as `ubicacion`,
`cat007_ubicaciones`.`cliente` as `folio_cliente`,
`cat003_clientes`.`nombre` as `cliente`,
`op018_movs_invent_proy`.`almacen` AS `folio_almacen`,
`cat027_almacenes`.`nombre` AS `almacen` 
FROM `op018_movs_invent_proy` 
JOIN `cat001_usuarios` ON `op018_movs_invent_proy`.`usuario_registra` = `cat001_usuarios`.`folio`
JOIN `cat016_productos` ON `op018_movs_invent_proy`.`producto` = `cat016_productos`.`folio`
JOIN `cat027_almacenes` ON `op018_movs_invent_proy`.`almacen` = `cat027_almacenes`.`folio`
JOIN `cat009_proyectos` ON `op018_movs_invent_proy`.`proyecto` = `cat009_proyectos`.`folio`
JOIN `cat007_ubicaciones` ON `cat009_proyectos`.`ubicacion` = `cat007_ubicaciones`.`folio`
JOIN `cat003_clientes` ON `cat007_ubicaciones`.`cliente` = `cat003_clientes`.`folio`;

ALTER VIEW `viaticos_depositos_view001` AS
    SELECT 
        `cat022_operaciones`.`folio` AS `folio`,
        `cat022_operaciones`.`tipo_operacion` AS `tipo_operacion`,
        `cat024_tipo_operacion`.`tipo` AS `tipo`,
        `cat022_operaciones`.`id_bene` AS `id_bene`,
        `cat022_operaciones`.`beneficiario` AS `beneficiario`,
        `cat022_operaciones`.`emisor` AS `folio_emisor`,
        `cat001_usuarios`.`nombres` AS `nombre_emisor`,
        `cat001_usuarios`.`apellidos` AS `apellido_emisor`,
        `cat022_operaciones`.`enlace` AS `enlace`,
        `cat022_operaciones`.`concepto` AS `concepto`,
        `cat022_operaciones`.`clave` AS `folio_clave`,
        `cat021_claves_seguimiento`.`clave` AS `clave`,
        `cat021_claves_seguimiento`.`proyecto` AS `proyecto`,
        `cat009_proyectos`.`nombre` AS `nombre_proyecto`,
        `cat021_claves_seguimiento`.`uso` AS `uso`,
        `cat022_operaciones`.`fecha` AS `fecha`,
        `cat022_operaciones`.`monto` AS `monto`
    FROM
        ((((`cat022_operaciones`
        JOIN `cat024_tipo_operacion` ON ((`cat022_operaciones`.`tipo_operacion` = `cat024_tipo_operacion`.`folio`)))
        JOIN `cat001_usuarios` ON ((`cat022_operaciones`.`emisor` = `cat001_usuarios`.`folio`)))
        JOIN `cat021_claves_seguimiento` ON ((`cat022_operaciones`.`clave` = `cat021_claves_seguimiento`.`folio`)))
        JOIN `cat009_proyectos` ON ((`cat021_claves_seguimiento`.`proyecto` = `cat009_proyectos`.`folio`)))
    WHERE
        (`cat022_operaciones`.`tipo_operacion` = 1);
        
ALTER VIEW `viaticos_comprobaciones_view001` AS
    SELECT 
        `cat022_operaciones`.`folio` AS `folio`,
        `cat022_operaciones`.`tipo_operacion` AS `tipo_operacion`,
        `cat024_tipo_operacion`.`tipo` AS `tipo`,
        `cat022_operaciones`.`id_bene` AS `id_bene`,
        `cat022_operaciones`.`beneficiario` AS `beneficiario`,
        `cat022_operaciones`.`emisor` AS `folio_emisor`,
        `cat001_usuarios`.`nombres` AS `nombre_emisor`,
        `cat001_usuarios`.`apellidos` AS `apellido_emisor`,
        `cat022_operaciones`.`enlace` AS `enlace`,
        `cat022_operaciones`.`concepto` AS `concepto`,
        `cat022_operaciones`.`clave` AS `folio_clave`,
        `cat021_claves_seguimiento`.`clave` AS `clave`,
        `cat021_claves_seguimiento`.`proyecto` AS `proyecto`,
        `cat009_proyectos`.`nombre` AS `nombre_proyecto`,
        `cat021_claves_seguimiento`.`uso` AS `uso`,
        `cat022_operaciones`.`fecha` AS `fecha`,
        `cat022_operaciones`.`monto` AS `monto`
    FROM
        ((((`cat022_operaciones`
        JOIN `cat024_tipo_operacion` ON ((`cat022_operaciones`.`tipo_operacion` = `cat024_tipo_operacion`.`folio`)))
        JOIN `cat001_usuarios` ON ((`cat022_operaciones`.`emisor` = `cat001_usuarios`.`folio`)))
        JOIN `cat021_claves_seguimiento` ON ((`cat022_operaciones`.`clave` = `cat021_claves_seguimiento`.`folio`)))
        JOIN `cat009_proyectos` ON ((`cat021_claves_seguimiento`.`proyecto` = `cat009_proyectos`.`folio`)))
    WHERE
        (`cat022_operaciones`.`tipo_operacion` = 2)