CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `viaticos_depositos_view001` AS
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
        (`cat022_operaciones`.`tipo_operacion` = 1)