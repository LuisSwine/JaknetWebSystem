CREATE DATABASE bd_scgj_proof;
USE bd_scgj_proof;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `areas_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `areas_view001` (
`folio` int(10)
,`nombre` varchar(150)
,`documentacion` varchar(255)
,`folio_planta` int(10)
,`ubicacion` varchar(50)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `asignacion_usuario_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `asignacion_usuario_view001` (
`folio_asignacion` int(10)
,`folio_usuario` int(10)
,`nombre_usuario` varchar(50)
,`apellido_usuario` varchar(50)
,`folio_tarea` int(10)
,`descripcion` varchar(255)
,`folio_etapa` int(10)
,`etapa` varchar(255)
,`folio_area_etapa` int(10)
,`area` varchar(150)
,`folio_proyecto` int(10)
,`proyecto` varchar(150)
,`folio_ubicacion` int(10)
,`ubicacion` varchar(50)
,`folio_cliente` int(10)
,`cliente` varchar(50)
,`fecha` date
,`folio_estatus` int(1)
,`estatus` varchar(100)
,`folio_tipo` int(2)
,`tipo` varchar(30)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat001_usuarios`
--

CREATE TABLE `cat001_usuarios` (
  `folio` int(10) NOT NULL,
  `nombres` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `apellidos` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `usuario` varchar(25) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `pass` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `telefono` varchar(16) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `saldo` double DEFAULT 0,
  `documentacion` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `tipo_usuario` int(2) NOT NULL,
  `ruta_imagen` varchar(150) COLLATE utf8mb4_spanish2_ci DEFAULT 'Imagenes/default.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat001_usuarios`
--

INSERT INTO `cat001_usuarios` (`folio`, `nombres`, `apellidos`, `usuario`, `pass`, `telefono`, `email`, `saldo`, `documentacion`, `tipo_usuario`, `ruta_imagen`) VALUES
(1, 'Luis Angel', 'Lopez Alvarez', 'LuisLopezAdmin', '$2y$10$R14bjAo7qnpyJNs8zjFy7ejSqm7h0Prl7APEJdeFNk6PbyDnFDmLG', '55-5100-6827', 'proyectos@tekcomit.com', 1527.99, 'https://drive.google.com/drive/folders/1Ohjg4KJWfTHgWIzWa1Q8by2RcfWuT7_j?usp=sharing', 0, 'Imagenes/default.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat002_tipo_usuario`
--

CREATE TABLE `cat002_tipo_usuario` (
  `id` int(2) NOT NULL,
  `tipo` varchar(25) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat002_tipo_usuario`
--

INSERT INTO `cat002_tipo_usuario` (`id`, `tipo`) VALUES
(0, 'Superadministrador'),
(1, 'Administrador'),
(2, 'Empleado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat003_clientes`
--

CREATE TABLE `cat003_clientes` (
  `folio` int(10) NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `tipo_cliente` int(2) NOT NULL,
  `tipo_servicio` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat003_clientes`
--

INSERT INTO `cat003_clientes` (`folio`, `nombre`, `tipo_cliente`, `tipo_servicio`) VALUES
(16, 'Gobierno de la Ciudad de Mexico', 2, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat005_tipo_servicio`
--

CREATE TABLE `cat005_tipo_servicio` (
  `folio` int(2) NOT NULL,
  `tipo` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat005_tipo_servicio`
--

INSERT INTO `cat005_tipo_servicio` (`folio`, `tipo`) VALUES
(1, 'VENTA DE PRODUCTOS'),
(2, 'REALIZACION DE SERVICIOS'),
(3, 'PRODUCTOS Y SERVICIOS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat006_contactos`
--

CREATE TABLE `cat006_contactos` (
  `folio` int(10) NOT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `telefono` varchar(16) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `cliente` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat006_contactos`
--

INSERT INTO `cat006_contactos` (`folio`, `nombre`, `email`, `telefono`, `descripcion`, `cliente`) VALUES
(18, 'Alejandro Gomez', 'alejandro@rtp.gob.mx', '55-7896-4799', 'Contacto general para dudas o entregas', 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat007_ubicaciones`
--

CREATE TABLE `cat007_ubicaciones` (
  `folio` int(10) NOT NULL,
  `cliente` int(10) NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `direccion` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat007_ubicaciones`
--

INSERT INTO `cat007_ubicaciones` (`folio`, `cliente`, `nombre`, `direccion`) VALUES
(20, 16, 'RTP iztapalapa', 'Unnamed Road, Buenavista, 09700 Ciudad de México, CDMX');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat008_areas`
--

CREATE TABLE `cat008_areas` (
  `folio` int(10) NOT NULL,
  `nombre` varchar(150) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `documentacion` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `planta` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat008_areas`
--

INSERT INTO `cat008_areas` (`folio`, `nombre`, `documentacion`, `planta`) VALUES
(22, 'Zona de Paqueaderos', 'https://drive.google.com/drive/folders/1XeyOYzfIn2P4XUpDE7wHGYltJRVtlCOg?usp=share_link', 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat009_proyectos`
--

CREATE TABLE `cat009_proyectos` (
  `folio` int(10) NOT NULL,
  `nombre` varchar(150) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `ubicacion` int(10) NOT NULL,
  `presupuesto` double DEFAULT 0,
  `galeria` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `documentacion` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `estatus` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat009_proyectos`
--

INSERT INTO `cat009_proyectos` (`folio`, `nombre`, `ubicacion`, `presupuesto`, `galeria`, `documentacion`, `estatus`) VALUES
(20, 'Cableado RTP', 20, 0, 'https://drive.google.com/drive/folders/1XeyOYzfIn2P4XUpDE7wHGYltJRVtlCOg?usp=share_link', 'https://drive.google.com/drive/folders/1XeyOYzfIn2P4XUpDE7wHGYltJRVtlCOg?usp=share_link', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat010_tipo_tareas`
--

CREATE TABLE `cat010_tipo_tareas` (
  `folio` int(2) NOT NULL,
  `tipo` varchar(30) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat010_tipo_tareas`
--

INSERT INTO `cat010_tipo_tareas` (`folio`, `tipo`) VALUES
(1, 'Con evidencia'),
(2, 'Sin evidencia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat011_roles_proyecto`
--

CREATE TABLE `cat011_roles_proyecto` (
  `folio` int(2) NOT NULL,
  `rol` varchar(25) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat011_roles_proyecto`
--

INSERT INTO `cat011_roles_proyecto` (`folio`, `rol`, `descripcion`) VALUES
(1, 'Gerente', 'Tiene todos los permisos, como asignar y revisar tareas, editar el proyecto y realizar la configuracion de etapas, visualizar contactos, crear cotizaciones, asignar viaticos y mover inventario'),
(2, 'Supervisor', 'Puede crear cotizaciones, asignar y crear tareas, y añadir etapas acceder al perfil de proyecto.'),
(3, 'Tecnico', 'Puede acceder unicamente a sus tareas asignadas para realizar los reportes y acceder unicamente de manera visual al perfil de proyecto'),
(4, 'Segurista', 'Puede acceder a toda la informacion de los empleados involucrados en el proyecto y puede asignar tareas. Acceder de manera visual al perfil del proyecto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat012_tipo_cliente`
--

CREATE TABLE `cat012_tipo_cliente` (
  `folio` int(2) NOT NULL,
  `tipo` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat012_tipo_cliente`
--

INSERT INTO `cat012_tipo_cliente` (`folio`, `tipo`) VALUES
(1, 'Fisico'),
(2, 'Moral');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat013_cotizaciones`
--

CREATE TABLE `cat013_cotizaciones` (
  `folio` int(10) NOT NULL,
  `proyecto` int(10) NOT NULL,
  `rendimiento` double DEFAULT 0,
  `costo_tecnico` double DEFAULT 0,
  `costo_supervisor` double DEFAULT 0,
  `intereses` double DEFAULT 0,
  `contacto` int(10) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat013_cotizaciones`
--

INSERT INTO `cat013_cotizaciones` (`folio`, `proyecto`, `rendimiento`, `costo_tecnico`, `costo_supervisor`, `intereses`, `contacto`) VALUES
(25, 20, 10, 0, 0, 0, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat014_proveedores`
--

CREATE TABLE `cat014_proveedores` (
  `folio` int(10) NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `web` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat014_proveedores`
--

INSERT INTO `cat014_proveedores` (`folio`, `nombre`, `web`) VALUES
(6, 'SYSCOM', 'https://www.syscom.mx/');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat015_marcas`
--

CREATE TABLE `cat015_marcas` (
  `folio` int(10) NOT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat015_marcas`
--

INSERT INTO `cat015_marcas` (`folio`, `nombre`) VALUES
(9, 'HIKVISION');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat016_productos`
--

CREATE TABLE `cat016_productos` (
  `folio` int(10) NOT NULL,
  `sku` varchar(25) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `categoria` int(2) NOT NULL,
  `tipo` int(2) NOT NULL,
  `marca` int(10) NOT NULL,
  `precio` double NOT NULL,
  `enlace` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat016_productos`
--

INSERT INTO `cat016_productos` (`folio`, `sku`, `descripcion`, `categoria`, `tipo`, `marca`, `precio`, `enlace`) VALUES
(8, 'DS-MP5604', 'DVR Móvil 1080P / 4 Canales TURBO + 4 Canales IP / Soporta 4G / WiFi / GPS / Soporta HDD', 2, 3, 9, 8000, 'https://www.syscom.mx/producto/DS-MP5604-HIKVISION-188780.html');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat017_categoria_producto`
--

CREATE TABLE `cat017_categoria_producto` (
  `folio` int(2) NOT NULL,
  `nombre` varchar(99) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat017_categoria_producto`
--

INSERT INTO `cat017_categoria_producto` (`folio`, `nombre`) VALUES
(1, 'Cableado Estructurado'),
(2, 'Videovigilancia'),
(3, 'Computo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat018_tipo_producto`
--

CREATE TABLE `cat018_tipo_producto` (
  `folio` int(2) NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat018_tipo_producto`
--

INSERT INTO `cat018_tipo_producto` (`folio`, `nombre`) VALUES
(1, 'Herramienta'),
(2, 'Material'),
(3, 'Equipo'),
(7, 'Papeleria');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat019_servicios`
--

CREATE TABLE `cat019_servicios` (
  `folio` int(10) NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `categoria` int(2) NOT NULL,
  `precio` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat020_inventario`
--

CREATE TABLE `cat020_inventario` (
  `folio` int(10) NOT NULL,
  `producto` int(10) NOT NULL,
  `cantidad` double NOT NULL,
  `unidades` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat021_claves_seguimiento`
--

CREATE TABLE `cat021_claves_seguimiento` (
  `folio` int(10) NOT NULL,
  `proyecto` int(10) NOT NULL,
  `clave` varchar(30) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `monto` double NOT NULL,
  `fecha` date NOT NULL,
  `usuario` int(10) NOT NULL,
  `uso` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat022_operaciones`
--

CREATE TABLE `cat022_operaciones` (
  `folio` int(10) NOT NULL,
  `tipo_operacion` int(11) NOT NULL,
  `id_bene` int(10) DEFAULT 0,
  `beneficiario` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `emisor` int(10) NOT NULL,
  `enlace` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `concepto` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `clave` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `monto` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat023_unidades`
--

CREATE TABLE `cat023_unidades` (
  `folio` int(2) NOT NULL,
  `nombre` varchar(30) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `abreviatura` varchar(10) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `codigo_sat` varchar(10) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat024_tipo_operacion`
--

CREATE TABLE `cat024_tipo_operacion` (
  `folio` int(11) NOT NULL,
  `tipo` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat024_tipo_operacion`
--

INSERT INTO `cat024_tipo_operacion` (`folio`, `tipo`) VALUES
(1, 'VIATICOS'),
(2, 'COMPROBACION');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat025_estatus_proyecto`
--

CREATE TABLE `cat025_estatus_proyecto` (
  `folio` int(10) NOT NULL,
  `estatus` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat025_estatus_proyecto`
--

INSERT INTO `cat025_estatus_proyecto` (`folio`, `estatus`) VALUES
(1, 'Planeacion'),
(2, 'En Curso'),
(3, 'En Pausa'),
(4, 'Cancelado'),
(5, 'Pendiente'),
(6, 'Terminado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat026_estatus_tarea`
--

CREATE TABLE `cat026_estatus_tarea` (
  `folio` int(11) NOT NULL,
  `estatus` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat026_estatus_tarea`
--

INSERT INTO `cat026_estatus_tarea` (`folio`, `estatus`) VALUES
(1, 'Asignada'),
(2, 'Entregada'),
(3, 'Pendiente'),
(4, 'Atrasada'),
(5, 'Incompleta'),
(6, 'Rechazada'),
(7, 'Creada');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `claves_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `claves_view001` (
`folio` int(10)
,`folio_proyecto` int(10)
,`proyecto` varchar(150)
,`clave` varchar(30)
,`monto` double
,`fecha` date
,`folio_usuario` int(10)
,`nombre_usuario` varchar(50)
,`apellido_usuario` varchar(50)
,`uso` varchar(255)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `clientes_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `clientes_view001` (
`folio` int(10)
,`nombre` varchar(50)
,`folio_tipo` int(2)
,`tipo` varchar(50)
,`folio_servicio` int(2)
,`servicio` varchar(50)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `contactos_ubicacion_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `contactos_ubicacion_view001` (
`folio` int(10)
,`folio_ubicacion` int(10)
,`ubicacion` varchar(50)
,`folio_contacto` int(10)
,`contacto` varchar(100)
,`email` varchar(50)
,`telefono` varchar(16)
,`descripcion` varchar(255)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `contactos_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `contactos_view001` (
`folio` int(10)
,`nombre` varchar(100)
,`email` varchar(50)
,`telefono` varchar(16)
,`descripcion` varchar(255)
,`folio_cliente` int(10)
,`cliente` varchar(50)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `cotizaciones_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `cotizaciones_view001` (
`folio` int(10)
,`folio_proyecto` int(10)
,`proyecto` varchar(150)
,`folio_cliente` int(10)
,`cliente` varchar(50)
,`folio_ubicacion` int(10)
,`ubicacion` varchar(50)
,`rendimiento` double
,`costo_tecnico` double
,`costo_supervisor` double
,`intereses` double
,`folio_contacto` int(10)
,`contacto` varchar(100)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `cotizacion_pdf_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `cotizacion_pdf_view001` (
`folio` int(10)
,`emite` int(2)
,`cotizacion` int(10)
,`rendimiento` double
,`intereses` double
,`numero` varchar(10)
,`fecha` date
,`destinatario` varchar(255)
,`total` double
,`solicita` varchar(255)
,`notas` text
,`puesto_destinatario` varchar(255)
,`cliente` varchar(255)
,`moneda` varchar(10)
,`ubicacion` varchar(255)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `etapas_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `etapas_view001` (
`folio` int(10)
,`nombre` varchar(255)
,`folio_area` int(10)
,`area` varchar(150)
,`documentacion_area` varchar(255)
,`folio_proyecto` int(10)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `inventario_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `inventario_view001` (
`folio` int(10)
,`folio_producto` int(10)
,`producto` varchar(255)
,`sku` varchar(25)
,`folio_categoria` int(2)
,`categoria` varchar(99)
,`folio_tipo` int(2)
,`tipo` varchar(50)
,`folio_marca` int(10)
,`marca` varchar(100)
,`cantidad` double
,`folio_unidad` int(2)
,`unidad` varchar(30)
,`abreviatura` varchar(10)
,`codigo_sat` varchar(10)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `marca_proveedor_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `marca_proveedor_view001` (
`folio` int(10)
,`folio_proveedor` int(10)
,`proveedor` varchar(50)
,`web_proveedor` varchar(255)
,`folio_marca` int(10)
,`marca` varchar(100)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `material_usuario_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `material_usuario_view001` (
`folio` int(10)
,`folio_usuario` int(10)
,`nombre_usuario` varchar(50)
,`apellido_usuario` varchar(50)
,`folio_producto` int(10)
,`sku` varchar(25)
,`descripcion` varchar(255)
,`folio_categoria` int(2)
,`categoria` varchar(99)
,`folio_tipo` int(2)
,`tipo` varchar(50)
,`folio_marca` int(10)
,`marca` varchar(100)
,`cantidad` double
,`folio_unidades` int(2)
,`unidades` varchar(30)
,`abreviatura` varchar(10)
,`sat` varchar(10)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `movimientos_invent_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `movimientos_invent_view001` (
`folio` int(10)
,`folio_usuario` int(10)
,`nombre_usuario` varchar(50)
,`apellido_usuario` varchar(50)
,`folio_producto` int(10)
,`sku` varchar(25)
,`descripcion` varchar(255)
,`cantidad` int(10)
,`fecha` datetime
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `op002_etapas`
--

CREATE TABLE `op002_etapas` (
  `folio` int(10) NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `area` int(10) NOT NULL,
  `proyecto` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `op003_tareas`
--

CREATE TABLE `op003_tareas` (
  `folio` int(10) NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `etapa` int(10) NOT NULL,
  `fecha_entrega` date NOT NULL,
  `estatus` int(1) NOT NULL,
  `tipo` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `op004_reporte`
--

CREATE TABLE `op004_reporte` (
  `folio` int(10) NOT NULL,
  `enlace` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `tarea` int(10) NOT NULL,
  `usuario` int(10) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `op005_roles`
--

CREATE TABLE `op005_roles` (
  `folio` int(10) NOT NULL,
  `proyecto` int(10) NOT NULL,
  `usuario` int(10) NOT NULL,
  `rol` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `op006_asistencia`
--

CREATE TABLE `op006_asistencia` (
  `folio` int(12) NOT NULL,
  `usuario` int(10) NOT NULL,
  `proyecto` int(10) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `op007_marca_proveedor`
--

CREATE TABLE `op007_marca_proveedor` (
  `folio` int(10) NOT NULL,
  `proveedor` int(10) NOT NULL,
  `marca` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `op008_lista_productos`
--

CREATE TABLE `op008_lista_productos` (
  `folio` int(10) NOT NULL,
  `producto` int(10) NOT NULL,
  `cotizacion` int(10) NOT NULL,
  `costo` double NOT NULL,
  `cantidad` int(11) NOT NULL,
  `tecnicos` int(11) NOT NULL,
  `supervisores` int(11) NOT NULL,
  `dias` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `op008_lista_productos`
--

INSERT INTO `op008_lista_productos` (`folio`, `producto`, `cotizacion`, `costo`, `cantidad`, `tecnicos`, `supervisores`, `dias`) VALUES
(13, 8, 25, 8000, 2, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `op009_lista_servicios`
--

CREATE TABLE `op009_lista_servicios` (
  `folio` int(10) NOT NULL,
  `servicio` int(10) NOT NULL,
  `cotizacion` int(10) NOT NULL,
  `costo` double DEFAULT 0,
  `tecnicos` int(11) DEFAULT 0,
  `supervisores` int(11) DEFAULT 0,
  `dias` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `op010_compras`
--

CREATE TABLE `op010_compras` (
  `folio` int(12) NOT NULL,
  `producto` int(10) NOT NULL,
  `cantidad` double NOT NULL,
  `unidades` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `op011_material_proyecto`
--

CREATE TABLE `op011_material_proyecto` (
  `folio` int(10) NOT NULL,
  `producto` int(10) NOT NULL,
  `proyecto` int(10) NOT NULL,
  `cantidad` double NOT NULL,
  `unidades` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `op012_presupuesto_proyecto`
--

CREATE TABLE `op012_presupuesto_proyecto` (
  `folio` int(10) NOT NULL,
  `proyecto` int(10) NOT NULL,
  `monto` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `op013_material_usuario`
--

CREATE TABLE `op013_material_usuario` (
  `folio` int(10) NOT NULL,
  `usuario` int(10) NOT NULL,
  `producto` int(10) NOT NULL,
  `cantidad` double NOT NULL,
  `unidades` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `op014_tarea_usuario`
--

CREATE TABLE `op014_tarea_usuario` (
  `folio` int(10) NOT NULL,
  `usuario` int(10) NOT NULL,
  `tarea` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `op015_contacto_ubicacion`
--

CREATE TABLE `op015_contacto_ubicacion` (
  `folio` int(10) NOT NULL,
  `ubicacion` int(10) NOT NULL,
  `contacto` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `op016_movimientos_inventario`
--

CREATE TABLE `op016_movimientos_inventario` (
  `folio` int(10) NOT NULL,
  `usuario` int(10) NOT NULL,
  `producto` int(10) NOT NULL,
  `cantidad` int(10) NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `op017_cotizacion_pdf`
--

CREATE TABLE `op017_cotizacion_pdf` (
  `folio` int(10) NOT NULL,
  `cotizacion` int(10) NOT NULL,
  `numero` varchar(10) COLLATE utf8mb4_spanish2_ci DEFAULT 'NUMERO',
  `fecha` date DEFAULT NULL,
  `destinatario` varchar(255) COLLATE utf8mb4_spanish2_ci DEFAULT '[DESTINATARIO]',
  `total` double DEFAULT NULL,
  `solicita` varchar(255) COLLATE utf8mb4_spanish2_ci DEFAULT '[SOLICITA]',
  `notas` text COLLATE utf8mb4_spanish2_ci,
  `emite` int(2) DEFAULT 1,
  `puesto_destinatario` varchar(255) COLLATE utf8mb4_spanish2_ci DEFAULT '[PUESTO DE DESTINATARIO]',
  `cliente` varchar(255) COLLATE utf8mb4_spanish2_ci DEFAULT '[CLIENTE]',
  `moneda` varchar(10) COLLATE utf8mb4_spanish2_ci DEFAULT '[MONEDA]',
  `ubicacion` varchar(255) COLLATE utf8mb4_spanish2_ci DEFAULT '[UBICACION]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `op017_cotizacion_pdf`
--

INSERT INTO `op017_cotizacion_pdf` (`folio`, `cotizacion`, `numero`, `fecha`, `destinatario`, `total`, `solicita`, `notas`, `emite`, `puesto_destinatario`, `cliente`, `moneda`, `ubicacion`) VALUES
(3, 25, 'NUMERO', '2022-10-31', '[DESTINATARIO]', NULL, '[SOLICITA]', '[INSERTE NOTAS]', 1, '[PUESTO DE DESTINATARIO]', '[CLIENTE]', '[MONEDA]', '[UBICACION]');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `operaciones_viaticos001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `operaciones_viaticos001` (
`folio` int(10)
,`folio_beneficiario` int(10)
,`beneficiario` varchar(100)
,`folio_emisor` int(10)
,`emisor` varchar(50)
,`enlace` varchar(255)
,`concepto` varchar(255)
,`folio_clave` int(11)
,`clave` varchar(30)
,`fecha` date
,`monto` double
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `productos_cotizacion_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `productos_cotizacion_view001` (
`folio` int(10)
,`folio_producto` int(10)
,`producto` varchar(255)
,`sku` varchar(25)
,`cotizacion` int(10)
,`costo_unitario` double
,`cantidad` int(11)
,`costo_base` double
,`tecnicos` int(11)
,`supervisores` int(11)
,`dias` int(11)
,`subtotal_tecnicos` double
,`subtotal_supervisores` double
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `productos_proveedor_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `productos_proveedor_view001` (
`folio` int(10)
,`sku` varchar(25)
,`descripcion` varchar(255)
,`folio_categoria` int(2)
,`categoria` varchar(99)
,`folio_tipo` int(2)
,`tipo` varchar(50)
,`precio` double
,`enlace` varchar(255)
,`folio_marca` int(10)
,`marca` varchar(100)
,`folio_proveedor` int(10)
,`proveedor` varchar(50)
,`web_proveedor` varchar(255)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `productos_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `productos_view001` (
`folio` int(10)
,`sku` varchar(25)
,`descripcion` varchar(255)
,`folio_categoria` int(2)
,`folio_tipo` int(2)
,`folio_marca` int(10)
,`precio` double
,`enlace` varchar(255)
,`marca` varchar(100)
,`tipo` varchar(50)
,`categoria` varchar(99)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `proyectos_asistencia_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `proyectos_asistencia_view001` (
`folio` int(10)
,`folio_proyecto` int(10)
,`proyecto` varchar(150)
,`folio_estatus` int(10)
,`estatus` varchar(100)
,`folio_usuario` int(10)
,`nombres` varchar(50)
,`apellidos` varchar(50)
,`folio_rol` int(2)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `proyectos_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `proyectos_view001` (
`folio` int(10)
,`nombre` varchar(150)
,`folio_ubicacion` int(10)
,`folio_cliente` int(10)
,`cliente` varchar(50)
,`ubicacion` varchar(50)
,`presupuesto` double
,`folio_estatus` int(10)
,`estatus` varchar(100)
,`galeria` varchar(255)
,`documentacion` varchar(255)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `reporte_asistencia_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `reporte_asistencia_view001` (
`folio` int(12)
,`folio_usuario` int(10)
,`nombre_usuario` varchar(50)
,`apellido_usuario` varchar(50)
,`folio_proyecto` int(10)
,`proyecto` varchar(150)
,`folio_ubicacion` int(10)
,`ubicacion` varchar(50)
,`folio_cliente` int(10)
,`cliente` varchar(50)
,`fecha` date
,`hora` time
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `roles_proyecto_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `roles_proyecto_view001` (
`folio` int(10)
,`folio_proyecto` int(10)
,`proyecto` varchar(150)
,`folio_ubicacion` int(10)
,`ubicacion` varchar(50)
,`folio_cliente` int(10)
,`cliente` varchar(50)
,`galeria` varchar(255)
,`documentacion` varchar(255)
,`folio_estatus` int(10)
,`estatus` varchar(100)
,`folio_usuario` int(10)
,`usuario` varchar(50)
,`folio_rol` int(2)
,`rol` varchar(25)
,`descripcion` varchar(255)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `roles_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `roles_view001` (
`folio` int(10)
,`proyecto` int(10)
,`folio_usuario` int(10)
,`nombres` varchar(50)
,`apellidos` varchar(50)
,`telefono` varchar(16)
,`email` varchar(50)
,`documentacion` varchar(100)
,`folio_rol` int(2)
,`rol` varchar(25)
,`descripcion` varchar(255)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `servicios_cotizacion_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `servicios_cotizacion_view001` (
`folio` int(10)
,`folio_servicio` int(10)
,`servicio` varchar(255)
,`cotizacion` int(10)
,`costo_servicio` double
,`tecnicos` int(11)
,`supervisores` int(11)
,`dias` int(11)
,`subtotal_tecnicos` double
,`subtotal_supervisores` double
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `servicios_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `servicios_view001` (
`folio` int(10)
,`descripcion` varchar(255)
,`folio_categoria` int(2)
,`precio` double
,`categoria` varchar(99)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `tareas_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `tareas_view001` (
`folio` int(10)
,`descripcion` varchar(255)
,`folio_etapa` int(10)
,`etapa` varchar(255)
,`fecha` date
,`folio_estatus` int(1)
,`estatus` varchar(100)
,`folio_tipo` int(2)
,`tipo` varchar(30)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `tareas_view002`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `tareas_view002` (
`folio` int(10)
,`descripcion` varchar(255)
,`folio_etapa` int(10)
,`etapa` varchar(255)
,`folio_area_etapa` int(10)
,`area` varchar(150)
,`folio_proyecto` int(10)
,`proyecto` varchar(150)
,`folio_ubicacion` int(10)
,`ubicacion` varchar(50)
,`folio_cliente` int(10)
,`cliente` varchar(50)
,`fecha` date
,`folio_estatus` int(1)
,`estatus` varchar(100)
,`folio_tipo` int(2)
,`tipo` varchar(30)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `tarea_asignada_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `tarea_asignada_view001` (
`folio` int(10)
,`folio_usuario` int(10)
,`nombres` varchar(50)
,`apellidos` varchar(50)
,`folio_tarea` int(10)
,`descripcion` varchar(255)
,`etapa` int(10)
,`folio_rol_usuario` int(2)
,`rol_usuario` varchar(25)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `ubicaciones_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `ubicaciones_view001` (
`folio` int(10)
,`folio_cliente` int(10)
,`nombre` varchar(50)
,`direccion` varchar(255)
,`cliente` varchar(50)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `validar_tarea_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `validar_tarea_view001` (
`folio` int(10)
,`usuario` int(10)
,`tarea` int(10)
,`etapa` int(10)
,`proyecto` int(10)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `viaticos_comprobaciones_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `viaticos_comprobaciones_view001` (
`folio` int(10)
,`tipo_operacion` int(11)
,`tipo` varchar(100)
,`id_bene` int(10)
,`beneficiario` varchar(100)
,`folio_emisor` int(10)
,`nombre_emisor` varchar(50)
,`apellido_emisor` varchar(50)
,`enlace` varchar(255)
,`concepto` varchar(255)
,`folio_clave` int(11)
,`clave` varchar(30)
,`proyecto` int(10)
,`nombre_proyecto` varchar(150)
,`uso` varchar(255)
,`fecha` date
,`monto` double
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `viaticos_depositos_view001`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `viaticos_depositos_view001` (
`folio` int(10)
,`tipo_operacion` int(11)
,`tipo` varchar(100)
,`id_bene` int(10)
,`beneficiario` varchar(100)
,`folio_emisor` int(10)
,`nombre_emisor` varchar(50)
,`apellido_emisor` varchar(50)
,`enlace` varchar(255)
,`concepto` varchar(255)
,`folio_clave` int(11)
,`clave` varchar(30)
,`proyecto` int(10)
,`nombre_proyecto` varchar(150)
,`uso` varchar(255)
,`fecha` date
,`monto` double
);

-- --------------------------------------------------------

--
-- Estructura para la vista `areas_view001`
--
DROP TABLE IF EXISTS `areas_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `areas_view001`  AS SELECT `cat008_areas`.`folio` AS `folio`, `cat008_areas`.`nombre` AS `nombre`, `cat008_areas`.`documentacion` AS `documentacion`, `cat008_areas`.`planta` AS `folio_planta`, `cat007_ubicaciones`.`nombre` AS `ubicacion` FROM (`cat008_areas` join `cat007_ubicaciones` on(`cat008_areas`.`planta` = `cat007_ubicaciones`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `asignacion_usuario_view001`
--
DROP TABLE IF EXISTS `asignacion_usuario_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `asignacion_usuario_view001`  AS SELECT `op014_tarea_usuario`.`folio` AS `folio_asignacion`, `op014_tarea_usuario`.`usuario` AS `folio_usuario`, `cat001_usuarios`.`nombres` AS `nombre_usuario`, `cat001_usuarios`.`apellidos` AS `apellido_usuario`, `op014_tarea_usuario`.`tarea` AS `folio_tarea`, `op003_tareas`.`descripcion` AS `descripcion`, `op003_tareas`.`etapa` AS `folio_etapa`, `op002_etapas`.`nombre` AS `etapa`, `op002_etapas`.`area` AS `folio_area_etapa`, `cat008_areas`.`nombre` AS `area`, `op002_etapas`.`proyecto` AS `folio_proyecto`, `cat009_proyectos`.`nombre` AS `proyecto`, `cat009_proyectos`.`ubicacion` AS `folio_ubicacion`, `cat007_ubicaciones`.`nombre` AS `ubicacion`, `cat007_ubicaciones`.`cliente` AS `folio_cliente`, `cat003_clientes`.`nombre` AS `cliente`, `op003_tareas`.`fecha_entrega` AS `fecha`, `op003_tareas`.`estatus` AS `folio_estatus`, `cat026_estatus_tarea`.`estatus` AS `estatus`, `op003_tareas`.`tipo` AS `folio_tipo`, `cat010_tipo_tareas`.`tipo` AS `tipo` FROM (((((((((`op014_tarea_usuario` join `cat001_usuarios` on(`op014_tarea_usuario`.`usuario` = `cat001_usuarios`.`folio`)) join `op003_tareas` on(`op014_tarea_usuario`.`tarea` = `op003_tareas`.`folio`)) join `op002_etapas` on(`op003_tareas`.`etapa` = `op002_etapas`.`folio`)) join `cat008_areas` on(`op002_etapas`.`area` = `cat008_areas`.`folio`)) join `cat009_proyectos` on(`op002_etapas`.`proyecto` = `cat009_proyectos`.`folio`)) join `cat007_ubicaciones` on(`cat008_areas`.`planta` = `cat007_ubicaciones`.`folio`)) join `cat003_clientes` on(`cat007_ubicaciones`.`cliente` = `cat003_clientes`.`folio`)) join `cat026_estatus_tarea` on(`op003_tareas`.`estatus` = `cat026_estatus_tarea`.`folio`)) join `cat010_tipo_tareas` on(`op003_tareas`.`tipo` = `cat010_tipo_tareas`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `claves_view001`
--
DROP TABLE IF EXISTS `claves_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `claves_view001`  AS SELECT `cat021_claves_seguimiento`.`folio` AS `folio`, `cat021_claves_seguimiento`.`proyecto` AS `folio_proyecto`, `cat009_proyectos`.`nombre` AS `proyecto`, `cat021_claves_seguimiento`.`clave` AS `clave`, `cat021_claves_seguimiento`.`monto` AS `monto`, `cat021_claves_seguimiento`.`fecha` AS `fecha`, `cat021_claves_seguimiento`.`usuario` AS `folio_usuario`, `cat001_usuarios`.`nombres` AS `nombre_usuario`, `cat001_usuarios`.`apellidos` AS `apellido_usuario`, `cat021_claves_seguimiento`.`uso` AS `uso` FROM ((`cat021_claves_seguimiento` join `cat009_proyectos` on(`cat021_claves_seguimiento`.`proyecto` = `cat009_proyectos`.`folio`)) join `cat001_usuarios` on(`cat021_claves_seguimiento`.`usuario` = `cat001_usuarios`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `clientes_view001`
--
DROP TABLE IF EXISTS `clientes_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `clientes_view001`  AS SELECT `cat003_clientes`.`folio` AS `folio`, `cat003_clientes`.`nombre` AS `nombre`, `cat003_clientes`.`tipo_cliente` AS `folio_tipo`, `cat012_tipo_cliente`.`tipo` AS `tipo`, `cat003_clientes`.`tipo_servicio` AS `folio_servicio`, `cat005_tipo_servicio`.`tipo` AS `servicio` FROM ((`cat003_clientes` join `cat005_tipo_servicio` on(`cat003_clientes`.`tipo_servicio` = `cat005_tipo_servicio`.`folio`)) join `cat012_tipo_cliente` on(`cat003_clientes`.`tipo_cliente` = `cat012_tipo_cliente`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `contactos_ubicacion_view001`
--
DROP TABLE IF EXISTS `contactos_ubicacion_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `contactos_ubicacion_view001`  AS SELECT `op015_contacto_ubicacion`.`folio` AS `folio`, `op015_contacto_ubicacion`.`ubicacion` AS `folio_ubicacion`, `cat007_ubicaciones`.`nombre` AS `ubicacion`, `op015_contacto_ubicacion`.`contacto` AS `folio_contacto`, `cat006_contactos`.`nombre` AS `contacto`, `cat006_contactos`.`email` AS `email`, `cat006_contactos`.`telefono` AS `telefono`, `cat006_contactos`.`descripcion` AS `descripcion` FROM ((`op015_contacto_ubicacion` join `cat007_ubicaciones` on(`op015_contacto_ubicacion`.`ubicacion` = `cat007_ubicaciones`.`folio`)) join `cat006_contactos` on(`op015_contacto_ubicacion`.`contacto` = `cat006_contactos`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `contactos_view001`
--
DROP TABLE IF EXISTS `contactos_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `contactos_view001`  AS SELECT `cat006_contactos`.`folio` AS `folio`, `cat006_contactos`.`nombre` AS `nombre`, `cat006_contactos`.`email` AS `email`, `cat006_contactos`.`telefono` AS `telefono`, `cat006_contactos`.`descripcion` AS `descripcion`, `cat006_contactos`.`cliente` AS `folio_cliente`, `cat003_clientes`.`nombre` AS `cliente` FROM (`cat006_contactos` join `cat003_clientes` on(`cat006_contactos`.`cliente` = `cat003_clientes`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `cotizaciones_view001`
--
DROP TABLE IF EXISTS `cotizaciones_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `cotizaciones_view001`  AS SELECT `cat013_cotizaciones`.`folio` AS `folio`, `cat013_cotizaciones`.`proyecto` AS `folio_proyecto`, `cat009_proyectos`.`nombre` AS `proyecto`, `cat003_clientes`.`folio` AS `folio_cliente`, `cat003_clientes`.`nombre` AS `cliente`, `cat007_ubicaciones`.`folio` AS `folio_ubicacion`, `cat007_ubicaciones`.`nombre` AS `ubicacion`, `cat013_cotizaciones`.`rendimiento` AS `rendimiento`, `cat013_cotizaciones`.`costo_tecnico` AS `costo_tecnico`, `cat013_cotizaciones`.`costo_supervisor` AS `costo_supervisor`, `cat013_cotizaciones`.`intereses` AS `intereses`, `cat013_cotizaciones`.`contacto` AS `folio_contacto`, `cat006_contactos`.`nombre` AS `contacto` FROM ((((`cat013_cotizaciones` join `cat009_proyectos` on(`cat013_cotizaciones`.`proyecto` = `cat009_proyectos`.`folio`)) join `cat006_contactos` on(`cat013_cotizaciones`.`contacto` = `cat006_contactos`.`folio`)) join `cat007_ubicaciones` on(`cat009_proyectos`.`ubicacion` = `cat007_ubicaciones`.`folio`)) join `cat003_clientes` on(`cat007_ubicaciones`.`cliente` = `cat003_clientes`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `cotizacion_pdf_view001`
--
DROP TABLE IF EXISTS `cotizacion_pdf_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `cotizacion_pdf_view001`  AS SELECT `op017_cotizacion_pdf`.`folio` AS `folio`, `op017_cotizacion_pdf`.`emite` AS `emite`, `op017_cotizacion_pdf`.`cotizacion` AS `cotizacion`, `cat013_cotizaciones`.`rendimiento` AS `rendimiento`, `cat013_cotizaciones`.`intereses` AS `intereses`, `op017_cotizacion_pdf`.`numero` AS `numero`, `op017_cotizacion_pdf`.`fecha` AS `fecha`, `op017_cotizacion_pdf`.`destinatario` AS `destinatario`, `op017_cotizacion_pdf`.`total` AS `total`, `op017_cotizacion_pdf`.`solicita` AS `solicita`, `op017_cotizacion_pdf`.`notas` AS `notas`, `op017_cotizacion_pdf`.`puesto_destinatario` AS `puesto_destinatario`, `op017_cotizacion_pdf`.`cliente` AS `cliente`, `op017_cotizacion_pdf`.`moneda` AS `moneda`, `op017_cotizacion_pdf`.`ubicacion` AS `ubicacion` FROM (`op017_cotizacion_pdf` join `cat013_cotizaciones` on(`op017_cotizacion_pdf`.`cotizacion` = `cat013_cotizaciones`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `etapas_view001`
--
DROP TABLE IF EXISTS `etapas_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `etapas_view001`  AS SELECT `op002_etapas`.`folio` AS `folio`, `op002_etapas`.`nombre` AS `nombre`, `op002_etapas`.`area` AS `folio_area`, `cat008_areas`.`nombre` AS `area`, `cat008_areas`.`documentacion` AS `documentacion_area`, `op002_etapas`.`proyecto` AS `folio_proyecto` FROM (`op002_etapas` join `cat008_areas` on(`op002_etapas`.`area` = `cat008_areas`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `inventario_view001`
--
DROP TABLE IF EXISTS `inventario_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `inventario_view001`  AS SELECT `cat020_inventario`.`folio` AS `folio`, `cat020_inventario`.`producto` AS `folio_producto`, `cat016_productos`.`descripcion` AS `producto`, `cat016_productos`.`sku` AS `sku`, `cat016_productos`.`categoria` AS `folio_categoria`, `cat017_categoria_producto`.`nombre` AS `categoria`, `cat016_productos`.`tipo` AS `folio_tipo`, `cat018_tipo_producto`.`nombre` AS `tipo`, `cat016_productos`.`marca` AS `folio_marca`, `cat015_marcas`.`nombre` AS `marca`, `cat020_inventario`.`cantidad` AS `cantidad`, `cat020_inventario`.`unidades` AS `folio_unidad`, `cat023_unidades`.`nombre` AS `unidad`, `cat023_unidades`.`abreviatura` AS `abreviatura`, `cat023_unidades`.`codigo_sat` AS `codigo_sat` FROM (((((`cat020_inventario` join `cat016_productos` on(`cat020_inventario`.`producto` = `cat016_productos`.`folio`)) join `cat017_categoria_producto` on(`cat016_productos`.`categoria` = `cat017_categoria_producto`.`folio`)) join `cat018_tipo_producto` on(`cat016_productos`.`tipo` = `cat018_tipo_producto`.`folio`)) join `cat015_marcas` on(`cat016_productos`.`marca` = `cat015_marcas`.`folio`)) join `cat023_unidades` on(`cat020_inventario`.`unidades` = `cat023_unidades`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `marca_proveedor_view001`
--
DROP TABLE IF EXISTS `marca_proveedor_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `marca_proveedor_view001`  AS SELECT `op007_marca_proveedor`.`folio` AS `folio`, `op007_marca_proveedor`.`proveedor` AS `folio_proveedor`, `cat014_proveedores`.`nombre` AS `proveedor`, `cat014_proveedores`.`web` AS `web_proveedor`, `op007_marca_proveedor`.`marca` AS `folio_marca`, `cat015_marcas`.`nombre` AS `marca` FROM ((`op007_marca_proveedor` join `cat014_proveedores` on(`op007_marca_proveedor`.`proveedor` = `cat014_proveedores`.`folio`)) join `cat015_marcas` on(`op007_marca_proveedor`.`marca` = `cat015_marcas`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `material_usuario_view001`
--
DROP TABLE IF EXISTS `material_usuario_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `material_usuario_view001`  AS SELECT `op013_material_usuario`.`folio` AS `folio`, `op013_material_usuario`.`usuario` AS `folio_usuario`, `cat001_usuarios`.`nombres` AS `nombre_usuario`, `cat001_usuarios`.`apellidos` AS `apellido_usuario`, `op013_material_usuario`.`producto` AS `folio_producto`, `cat016_productos`.`sku` AS `sku`, `cat016_productos`.`descripcion` AS `descripcion`, `cat016_productos`.`categoria` AS `folio_categoria`, `cat017_categoria_producto`.`nombre` AS `categoria`, `cat016_productos`.`tipo` AS `folio_tipo`, `cat018_tipo_producto`.`nombre` AS `tipo`, `cat016_productos`.`marca` AS `folio_marca`, `cat015_marcas`.`nombre` AS `marca`, `op013_material_usuario`.`cantidad` AS `cantidad`, `op013_material_usuario`.`unidades` AS `folio_unidades`, `cat023_unidades`.`nombre` AS `unidades`, `cat023_unidades`.`abreviatura` AS `abreviatura`, `cat023_unidades`.`codigo_sat` AS `sat` FROM ((((((`op013_material_usuario` join `cat001_usuarios` on(`op013_material_usuario`.`usuario` = `cat001_usuarios`.`folio`)) join `cat016_productos` on(`op013_material_usuario`.`producto` = `cat016_productos`.`folio`)) join `cat017_categoria_producto` on(`cat016_productos`.`categoria` = `cat017_categoria_producto`.`folio`)) join `cat018_tipo_producto` on(`cat016_productos`.`tipo` = `cat018_tipo_producto`.`folio`)) join `cat015_marcas` on(`cat016_productos`.`marca` = `cat015_marcas`.`folio`)) join `cat023_unidades` on(`op013_material_usuario`.`unidades` = `cat023_unidades`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `movimientos_invent_view001`
--
DROP TABLE IF EXISTS `movimientos_invent_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `movimientos_invent_view001`  AS SELECT `op016_movimientos_inventario`.`folio` AS `folio`, `op016_movimientos_inventario`.`usuario` AS `folio_usuario`, `cat001_usuarios`.`nombres` AS `nombre_usuario`, `cat001_usuarios`.`apellidos` AS `apellido_usuario`, `op016_movimientos_inventario`.`producto` AS `folio_producto`, `cat016_productos`.`sku` AS `sku`, `cat016_productos`.`descripcion` AS `descripcion`, `op016_movimientos_inventario`.`cantidad` AS `cantidad`, `op016_movimientos_inventario`.`fecha` AS `fecha` FROM ((`op016_movimientos_inventario` join `cat001_usuarios` on(`op016_movimientos_inventario`.`usuario` = `cat001_usuarios`.`folio`)) join `cat016_productos` on(`op016_movimientos_inventario`.`producto` = `cat016_productos`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `operaciones_viaticos001`
--
DROP TABLE IF EXISTS `operaciones_viaticos001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `operaciones_viaticos001`  AS SELECT `cat022_operaciones`.`folio` AS `folio`, `cat022_operaciones`.`id_bene` AS `folio_beneficiario`, `cat022_operaciones`.`beneficiario` AS `beneficiario`, `cat022_operaciones`.`emisor` AS `folio_emisor`, `cat001_usuarios`.`nombres` AS `emisor`, `cat022_operaciones`.`enlace` AS `enlace`, `cat022_operaciones`.`concepto` AS `concepto`, `cat022_operaciones`.`clave` AS `folio_clave`, `cat021_claves_seguimiento`.`clave` AS `clave`, `cat022_operaciones`.`fecha` AS `fecha`, `cat022_operaciones`.`monto` AS `monto` FROM ((`cat022_operaciones` join `cat001_usuarios` on(`cat022_operaciones`.`emisor` = `cat001_usuarios`.`folio`)) join `cat021_claves_seguimiento` on(`cat022_operaciones`.`clave` = `cat021_claves_seguimiento`.`folio`)) WHERE `cat022_operaciones`.`tipo_operacion` = 11  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `productos_cotizacion_view001`
--
DROP TABLE IF EXISTS `productos_cotizacion_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `productos_cotizacion_view001`  AS SELECT `op008_lista_productos`.`folio` AS `folio`, `op008_lista_productos`.`producto` AS `folio_producto`, `cat016_productos`.`descripcion` AS `producto`, `cat016_productos`.`sku` AS `sku`, `op008_lista_productos`.`cotizacion` AS `cotizacion`, `op008_lista_productos`.`costo` AS `costo_unitario`, `op008_lista_productos`.`cantidad` AS `cantidad`, `op008_lista_productos`.`costo`* `op008_lista_productos`.`cantidad` AS `costo_base`, `op008_lista_productos`.`tecnicos` AS `tecnicos`, `op008_lista_productos`.`supervisores` AS `supervisores`, `op008_lista_productos`.`dias` AS `dias`, `cat013_cotizaciones`.`costo_tecnico`* `op008_lista_productos`.`tecnicos` * `op008_lista_productos`.`dias` AS `subtotal_tecnicos`, `cat013_cotizaciones`.`costo_supervisor`* `op008_lista_productos`.`supervisores` * `op008_lista_productos`.`dias` AS `subtotal_supervisores` FROM ((`op008_lista_productos` join `cat016_productos` on(`op008_lista_productos`.`producto` = `cat016_productos`.`folio`)) join `cat013_cotizaciones` on(`op008_lista_productos`.`cotizacion` = `cat013_cotizaciones`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `productos_proveedor_view001`
--
DROP TABLE IF EXISTS `productos_proveedor_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `productos_proveedor_view001`  AS SELECT `cat016_productos`.`folio` AS `folio`, `cat016_productos`.`sku` AS `sku`, `cat016_productos`.`descripcion` AS `descripcion`, `cat016_productos`.`categoria` AS `folio_categoria`, `cat017_categoria_producto`.`nombre` AS `categoria`, `cat016_productos`.`tipo` AS `folio_tipo`, `cat018_tipo_producto`.`nombre` AS `tipo`, `cat016_productos`.`precio` AS `precio`, `cat016_productos`.`enlace` AS `enlace`, `cat016_productos`.`marca` AS `folio_marca`, `cat015_marcas`.`nombre` AS `marca`, `cat014_proveedores`.`folio` AS `folio_proveedor`, `cat014_proveedores`.`nombre` AS `proveedor`, `cat014_proveedores`.`web` AS `web_proveedor` FROM (((((`cat016_productos` join `cat017_categoria_producto` on(`cat016_productos`.`categoria` = `cat017_categoria_producto`.`folio`)) join `cat018_tipo_producto` on(`cat016_productos`.`tipo` = `cat018_tipo_producto`.`folio`)) join `cat015_marcas` on(`cat016_productos`.`marca` = `cat015_marcas`.`folio`)) join `op007_marca_proveedor` on(`cat015_marcas`.`folio` = `op007_marca_proveedor`.`marca`)) join `cat014_proveedores` on(`op007_marca_proveedor`.`proveedor` = `cat014_proveedores`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `productos_view001`
--
DROP TABLE IF EXISTS `productos_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `productos_view001`  AS SELECT `cat016_productos`.`folio` AS `folio`, `cat016_productos`.`sku` AS `sku`, `cat016_productos`.`descripcion` AS `descripcion`, `cat016_productos`.`categoria` AS `folio_categoria`, `cat016_productos`.`tipo` AS `folio_tipo`, `cat016_productos`.`marca` AS `folio_marca`, `cat016_productos`.`precio` AS `precio`, `cat016_productos`.`enlace` AS `enlace`, `cat015_marcas`.`nombre` AS `marca`, `cat018_tipo_producto`.`nombre` AS `tipo`, `cat017_categoria_producto`.`nombre` AS `categoria` FROM (((`cat016_productos` join `cat015_marcas` on(`cat016_productos`.`marca` = `cat015_marcas`.`folio`)) join `cat017_categoria_producto` on(`cat016_productos`.`categoria` = `cat017_categoria_producto`.`folio`)) join `cat018_tipo_producto` on(`cat016_productos`.`tipo` = `cat018_tipo_producto`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `proyectos_asistencia_view001`
--
DROP TABLE IF EXISTS `proyectos_asistencia_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `proyectos_asistencia_view001`  AS SELECT `op005_roles`.`folio` AS `folio`, `op005_roles`.`proyecto` AS `folio_proyecto`, `cat009_proyectos`.`nombre` AS `proyecto`, `cat009_proyectos`.`estatus` AS `folio_estatus`, `cat025_estatus_proyecto`.`estatus` AS `estatus`, `op005_roles`.`usuario` AS `folio_usuario`, `cat001_usuarios`.`nombres` AS `nombres`, `cat001_usuarios`.`apellidos` AS `apellidos`, `op005_roles`.`rol` AS `folio_rol` FROM (((`op005_roles` join `cat009_proyectos` on(`op005_roles`.`proyecto` = `cat009_proyectos`.`folio`)) join `cat025_estatus_proyecto` on(`cat009_proyectos`.`estatus` = `cat025_estatus_proyecto`.`folio`)) join `cat001_usuarios` on(`op005_roles`.`usuario` = `cat001_usuarios`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `proyectos_view001`
--
DROP TABLE IF EXISTS `proyectos_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `proyectos_view001`  AS SELECT `cat009_proyectos`.`folio` AS `folio`, `cat009_proyectos`.`nombre` AS `nombre`, `cat009_proyectos`.`ubicacion` AS `folio_ubicacion`, `cat007_ubicaciones`.`cliente` AS `folio_cliente`, `cat003_clientes`.`nombre` AS `cliente`, `cat007_ubicaciones`.`nombre` AS `ubicacion`, `cat009_proyectos`.`presupuesto` AS `presupuesto`, `cat009_proyectos`.`estatus` AS `folio_estatus`, `cat025_estatus_proyecto`.`estatus` AS `estatus`, `cat009_proyectos`.`galeria` AS `galeria`, `cat009_proyectos`.`documentacion` AS `documentacion` FROM (((`cat009_proyectos` join `cat007_ubicaciones` on(`cat009_proyectos`.`ubicacion` = `cat007_ubicaciones`.`folio`)) join `cat003_clientes` on(`cat007_ubicaciones`.`cliente` = `cat003_clientes`.`folio`)) join `cat025_estatus_proyecto` on(`cat009_proyectos`.`estatus` = `cat025_estatus_proyecto`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `reporte_asistencia_view001`
--
DROP TABLE IF EXISTS `reporte_asistencia_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `reporte_asistencia_view001`  AS SELECT `op006_asistencia`.`folio` AS `folio`, `op006_asistencia`.`usuario` AS `folio_usuario`, `cat001_usuarios`.`nombres` AS `nombre_usuario`, `cat001_usuarios`.`apellidos` AS `apellido_usuario`, `op006_asistencia`.`proyecto` AS `folio_proyecto`, `cat009_proyectos`.`nombre` AS `proyecto`, `cat009_proyectos`.`ubicacion` AS `folio_ubicacion`, `cat007_ubicaciones`.`nombre` AS `ubicacion`, `cat007_ubicaciones`.`cliente` AS `folio_cliente`, `cat003_clientes`.`nombre` AS `cliente`, `op006_asistencia`.`fecha` AS `fecha`, `op006_asistencia`.`hora` AS `hora` FROM ((((`op006_asistencia` join `cat001_usuarios` on(`op006_asistencia`.`usuario` = `cat001_usuarios`.`folio`)) join `cat009_proyectos` on(`op006_asistencia`.`proyecto` = `cat009_proyectos`.`folio`)) join `cat007_ubicaciones` on(`cat009_proyectos`.`ubicacion` = `cat007_ubicaciones`.`folio`)) join `cat003_clientes` on(`cat007_ubicaciones`.`cliente` = `cat003_clientes`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `roles_proyecto_view001`
--
DROP TABLE IF EXISTS `roles_proyecto_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `roles_proyecto_view001`  AS SELECT `op005_roles`.`folio` AS `folio`, `op005_roles`.`proyecto` AS `folio_proyecto`, `cat009_proyectos`.`nombre` AS `proyecto`, `cat009_proyectos`.`ubicacion` AS `folio_ubicacion`, `cat007_ubicaciones`.`nombre` AS `ubicacion`, `cat007_ubicaciones`.`cliente` AS `folio_cliente`, `cat003_clientes`.`nombre` AS `cliente`, `cat009_proyectos`.`galeria` AS `galeria`, `cat009_proyectos`.`documentacion` AS `documentacion`, `cat009_proyectos`.`estatus` AS `folio_estatus`, `cat025_estatus_proyecto`.`estatus` AS `estatus`, `op005_roles`.`usuario` AS `folio_usuario`, `cat001_usuarios`.`nombres` AS `usuario`, `op005_roles`.`rol` AS `folio_rol`, `cat011_roles_proyecto`.`rol` AS `rol`, `cat011_roles_proyecto`.`descripcion` AS `descripcion` FROM ((((((`op005_roles` join `cat009_proyectos` on(`op005_roles`.`proyecto` = `cat009_proyectos`.`folio`)) join `cat007_ubicaciones` on(`cat009_proyectos`.`ubicacion` = `cat007_ubicaciones`.`folio`)) join `cat003_clientes` on(`cat007_ubicaciones`.`cliente` = `cat003_clientes`.`folio`)) join `cat025_estatus_proyecto` on(`cat009_proyectos`.`estatus` = `cat025_estatus_proyecto`.`folio`)) join `cat001_usuarios` on(`op005_roles`.`usuario` = `cat001_usuarios`.`folio`)) join `cat011_roles_proyecto` on(`op005_roles`.`rol` = `cat011_roles_proyecto`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `roles_view001`
--
DROP TABLE IF EXISTS `roles_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `roles_view001`  AS SELECT `op005_roles`.`folio` AS `folio`, `op005_roles`.`proyecto` AS `proyecto`, `op005_roles`.`usuario` AS `folio_usuario`, `cat001_usuarios`.`nombres` AS `nombres`, `cat001_usuarios`.`apellidos` AS `apellidos`, `cat001_usuarios`.`telefono` AS `telefono`, `cat001_usuarios`.`email` AS `email`, `cat001_usuarios`.`documentacion` AS `documentacion`, `op005_roles`.`rol` AS `folio_rol`, `cat011_roles_proyecto`.`rol` AS `rol`, `cat011_roles_proyecto`.`descripcion` AS `descripcion` FROM ((`op005_roles` join `cat001_usuarios` on(`op005_roles`.`usuario` = `cat001_usuarios`.`folio`)) join `cat011_roles_proyecto` on(`op005_roles`.`rol` = `cat011_roles_proyecto`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `servicios_cotizacion_view001`
--
DROP TABLE IF EXISTS `servicios_cotizacion_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `servicios_cotizacion_view001`  AS SELECT `op009_lista_servicios`.`folio` AS `folio`, `op009_lista_servicios`.`servicio` AS `folio_servicio`, `cat019_servicios`.`descripcion` AS `servicio`, `op009_lista_servicios`.`cotizacion` AS `cotizacion`, `op009_lista_servicios`.`costo` AS `costo_servicio`, `op009_lista_servicios`.`tecnicos` AS `tecnicos`, `op009_lista_servicios`.`supervisores` AS `supervisores`, `op009_lista_servicios`.`dias` AS `dias`, `cat013_cotizaciones`.`costo_tecnico`* `op009_lista_servicios`.`tecnicos` * `op009_lista_servicios`.`dias` AS `subtotal_tecnicos`, `cat013_cotizaciones`.`costo_supervisor`* `op009_lista_servicios`.`supervisores` * `op009_lista_servicios`.`dias` AS `subtotal_supervisores` FROM ((`op009_lista_servicios` join `cat019_servicios` on(`op009_lista_servicios`.`servicio` = `cat019_servicios`.`folio`)) join `cat013_cotizaciones` on(`op009_lista_servicios`.`cotizacion` = `cat013_cotizaciones`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `servicios_view001`
--
DROP TABLE IF EXISTS `servicios_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `servicios_view001`  AS SELECT `cat019_servicios`.`folio` AS `folio`, `cat019_servicios`.`descripcion` AS `descripcion`, `cat019_servicios`.`categoria` AS `folio_categoria`, `cat019_servicios`.`precio` AS `precio`, `cat017_categoria_producto`.`nombre` AS `categoria` FROM (`cat019_servicios` join `cat017_categoria_producto` on(`cat019_servicios`.`categoria` = `cat017_categoria_producto`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `tareas_view001`
--
DROP TABLE IF EXISTS `tareas_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `tareas_view001`  AS SELECT `op003_tareas`.`folio` AS `folio`, `op003_tareas`.`descripcion` AS `descripcion`, `op003_tareas`.`etapa` AS `folio_etapa`, `op002_etapas`.`nombre` AS `etapa`, `op003_tareas`.`fecha_entrega` AS `fecha`, `op003_tareas`.`estatus` AS `folio_estatus`, `cat026_estatus_tarea`.`estatus` AS `estatus`, `op003_tareas`.`tipo` AS `folio_tipo`, `cat010_tipo_tareas`.`tipo` AS `tipo` FROM (((`op003_tareas` join `op002_etapas` on(`op003_tareas`.`etapa` = `op002_etapas`.`folio`)) join `cat026_estatus_tarea` on(`op003_tareas`.`estatus` = `cat026_estatus_tarea`.`folio`)) join `cat010_tipo_tareas` on(`op003_tareas`.`tipo` = `cat010_tipo_tareas`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `tareas_view002`
--
DROP TABLE IF EXISTS `tareas_view002`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `tareas_view002`  AS SELECT `op003_tareas`.`folio` AS `folio`, `op003_tareas`.`descripcion` AS `descripcion`, `op003_tareas`.`etapa` AS `folio_etapa`, `op002_etapas`.`nombre` AS `etapa`, `op002_etapas`.`area` AS `folio_area_etapa`, `cat008_areas`.`nombre` AS `area`, `op002_etapas`.`proyecto` AS `folio_proyecto`, `cat009_proyectos`.`nombre` AS `proyecto`, `cat009_proyectos`.`ubicacion` AS `folio_ubicacion`, `cat007_ubicaciones`.`nombre` AS `ubicacion`, `cat007_ubicaciones`.`cliente` AS `folio_cliente`, `cat003_clientes`.`nombre` AS `cliente`, `op003_tareas`.`fecha_entrega` AS `fecha`, `op003_tareas`.`estatus` AS `folio_estatus`, `cat026_estatus_tarea`.`estatus` AS `estatus`, `op003_tareas`.`tipo` AS `folio_tipo`, `cat010_tipo_tareas`.`tipo` AS `tipo` FROM (((((((`op003_tareas` join `op002_etapas` on(`op003_tareas`.`etapa` = `op002_etapas`.`folio`)) join `cat008_areas` on(`op002_etapas`.`area` = `cat008_areas`.`folio`)) join `cat009_proyectos` on(`op002_etapas`.`proyecto` = `cat009_proyectos`.`folio`)) join `cat007_ubicaciones` on(`cat008_areas`.`planta` = `cat007_ubicaciones`.`folio`)) join `cat003_clientes` on(`cat007_ubicaciones`.`cliente` = `cat003_clientes`.`folio`)) join `cat026_estatus_tarea` on(`op003_tareas`.`estatus` = `cat026_estatus_tarea`.`folio`)) join `cat010_tipo_tareas` on(`op003_tareas`.`tipo` = `cat010_tipo_tareas`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `tarea_asignada_view001`
--
DROP TABLE IF EXISTS `tarea_asignada_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `tarea_asignada_view001`  AS SELECT `op014_tarea_usuario`.`folio` AS `folio`, `op014_tarea_usuario`.`usuario` AS `folio_usuario`, `cat001_usuarios`.`nombres` AS `nombres`, `cat001_usuarios`.`apellidos` AS `apellidos`, `op014_tarea_usuario`.`tarea` AS `folio_tarea`, `op003_tareas`.`descripcion` AS `descripcion`, `op003_tareas`.`etapa` AS `etapa`, `op005_roles`.`rol` AS `folio_rol_usuario`, `cat011_roles_proyecto`.`rol` AS `rol_usuario` FROM ((((`op014_tarea_usuario` join `cat001_usuarios` on(`op014_tarea_usuario`.`usuario` = `cat001_usuarios`.`folio`)) join `op003_tareas` on(`op014_tarea_usuario`.`tarea` = `op003_tareas`.`folio`)) join `op005_roles` on(`op014_tarea_usuario`.`usuario` = `op005_roles`.`usuario`)) join `cat011_roles_proyecto` on(`op005_roles`.`rol` = `cat011_roles_proyecto`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `ubicaciones_view001`
--
DROP TABLE IF EXISTS `ubicaciones_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `ubicaciones_view001`  AS SELECT `cat007_ubicaciones`.`folio` AS `folio`, `cat007_ubicaciones`.`cliente` AS `folio_cliente`, `cat007_ubicaciones`.`nombre` AS `nombre`, `cat007_ubicaciones`.`direccion` AS `direccion`, `cat003_clientes`.`nombre` AS `cliente` FROM (`cat007_ubicaciones` join `cat003_clientes` on(`cat007_ubicaciones`.`cliente` = `cat003_clientes`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `validar_tarea_view001`
--
DROP TABLE IF EXISTS `validar_tarea_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `validar_tarea_view001`  AS SELECT `op014_tarea_usuario`.`folio` AS `folio`, `op014_tarea_usuario`.`usuario` AS `usuario`, `op014_tarea_usuario`.`tarea` AS `tarea`, `op003_tareas`.`etapa` AS `etapa`, `cat009_proyectos`.`folio` AS `proyecto` FROM (((`op014_tarea_usuario` join `op003_tareas` on(`op014_tarea_usuario`.`tarea` = `op003_tareas`.`folio`)) join `op002_etapas` on(`op003_tareas`.`etapa` = `op002_etapas`.`folio`)) join `cat009_proyectos` on(`op002_etapas`.`proyecto` = `cat009_proyectos`.`folio`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `viaticos_comprobaciones_view001`
--
DROP TABLE IF EXISTS `viaticos_comprobaciones_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `viaticos_comprobaciones_view001`  AS SELECT `cat022_operaciones`.`folio` AS `folio`, `cat022_operaciones`.`tipo_operacion` AS `tipo_operacion`, `cat024_tipo_operacion`.`tipo` AS `tipo`, `cat022_operaciones`.`id_bene` AS `id_bene`, `cat022_operaciones`.`beneficiario` AS `beneficiario`, `cat022_operaciones`.`emisor` AS `folio_emisor`, `cat001_usuarios`.`nombres` AS `nombre_emisor`, `cat001_usuarios`.`apellidos` AS `apellido_emisor`, `cat022_operaciones`.`enlace` AS `enlace`, `cat022_operaciones`.`concepto` AS `concepto`, `cat022_operaciones`.`clave` AS `folio_clave`, `cat021_claves_seguimiento`.`clave` AS `clave`, `cat021_claves_seguimiento`.`proyecto` AS `proyecto`, `cat009_proyectos`.`nombre` AS `nombre_proyecto`, `cat021_claves_seguimiento`.`uso` AS `uso`, `cat022_operaciones`.`fecha` AS `fecha`, `cat022_operaciones`.`monto` AS `monto` FROM ((((`cat022_operaciones` join `cat024_tipo_operacion` on(`cat022_operaciones`.`tipo_operacion` = `cat024_tipo_operacion`.`folio`)) join `cat001_usuarios` on(`cat022_operaciones`.`emisor` = `cat001_usuarios`.`folio`)) join `cat021_claves_seguimiento` on(`cat022_operaciones`.`clave` = `cat021_claves_seguimiento`.`folio`)) join `cat009_proyectos` on(`cat021_claves_seguimiento`.`proyecto` = `cat009_proyectos`.`folio`)) WHERE `cat022_operaciones`.`tipo_operacion` = 22  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `viaticos_depositos_view001`
--
DROP TABLE IF EXISTS `viaticos_depositos_view001`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `viaticos_depositos_view001`  AS SELECT `cat022_operaciones`.`folio` AS `folio`, `cat022_operaciones`.`tipo_operacion` AS `tipo_operacion`, `cat024_tipo_operacion`.`tipo` AS `tipo`, `cat022_operaciones`.`id_bene` AS `id_bene`, `cat022_operaciones`.`beneficiario` AS `beneficiario`, `cat022_operaciones`.`emisor` AS `folio_emisor`, `cat001_usuarios`.`nombres` AS `nombre_emisor`, `cat001_usuarios`.`apellidos` AS `apellido_emisor`, `cat022_operaciones`.`enlace` AS `enlace`, `cat022_operaciones`.`concepto` AS `concepto`, `cat022_operaciones`.`clave` AS `folio_clave`, `cat021_claves_seguimiento`.`clave` AS `clave`, `cat021_claves_seguimiento`.`proyecto` AS `proyecto`, `cat009_proyectos`.`nombre` AS `nombre_proyecto`, `cat021_claves_seguimiento`.`uso` AS `uso`, `cat022_operaciones`.`fecha` AS `fecha`, `cat022_operaciones`.`monto` AS `monto` FROM ((((`cat022_operaciones` join `cat024_tipo_operacion` on(`cat022_operaciones`.`tipo_operacion` = `cat024_tipo_operacion`.`folio`)) join `cat001_usuarios` on(`cat022_operaciones`.`emisor` = `cat001_usuarios`.`folio`)) join `cat021_claves_seguimiento` on(`cat022_operaciones`.`clave` = `cat021_claves_seguimiento`.`folio`)) join `cat009_proyectos` on(`cat021_claves_seguimiento`.`proyecto` = `cat009_proyectos`.`folio`)) WHERE `cat022_operaciones`.`tipo_operacion` = 11  ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cat001_usuarios`
--
ALTER TABLE `cat001_usuarios`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `tipo_usuario` (`tipo_usuario`);

--
-- Indices de la tabla `cat002_tipo_usuario`
--
ALTER TABLE `cat002_tipo_usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cat003_clientes`
--
ALTER TABLE `cat003_clientes`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `cat003_clientes_ibfk_1` (`tipo_cliente`),
  ADD KEY `cat003_clientes_ibfk_2` (`tipo_servicio`);

--
-- Indices de la tabla `cat005_tipo_servicio`
--
ALTER TABLE `cat005_tipo_servicio`
  ADD PRIMARY KEY (`folio`);

--
-- Indices de la tabla `cat006_contactos`
--
ALTER TABLE `cat006_contactos`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `cliente` (`cliente`);

--
-- Indices de la tabla `cat007_ubicaciones`
--
ALTER TABLE `cat007_ubicaciones`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `cliente` (`cliente`);

--
-- Indices de la tabla `cat008_areas`
--
ALTER TABLE `cat008_areas`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `planta` (`planta`);

--
-- Indices de la tabla `cat009_proyectos`
--
ALTER TABLE `cat009_proyectos`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `ubicacion` (`ubicacion`),
  ADD KEY `estatus` (`estatus`);

--
-- Indices de la tabla `cat010_tipo_tareas`
--
ALTER TABLE `cat010_tipo_tareas`
  ADD PRIMARY KEY (`folio`);

--
-- Indices de la tabla `cat011_roles_proyecto`
--
ALTER TABLE `cat011_roles_proyecto`
  ADD PRIMARY KEY (`folio`);

--
-- Indices de la tabla `cat012_tipo_cliente`
--
ALTER TABLE `cat012_tipo_cliente`
  ADD PRIMARY KEY (`folio`);

--
-- Indices de la tabla `cat013_cotizaciones`
--
ALTER TABLE `cat013_cotizaciones`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `proyecto` (`proyecto`),
  ADD KEY `contacto` (`contacto`);

--
-- Indices de la tabla `cat014_proveedores`
--
ALTER TABLE `cat014_proveedores`
  ADD PRIMARY KEY (`folio`);

--
-- Indices de la tabla `cat015_marcas`
--
ALTER TABLE `cat015_marcas`
  ADD PRIMARY KEY (`folio`);

--
-- Indices de la tabla `cat016_productos`
--
ALTER TABLE `cat016_productos`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `categoria` (`categoria`),
  ADD KEY `tipo` (`tipo`),
  ADD KEY `marca` (`marca`);

--
-- Indices de la tabla `cat017_categoria_producto`
--
ALTER TABLE `cat017_categoria_producto`
  ADD PRIMARY KEY (`folio`);

--
-- Indices de la tabla `cat018_tipo_producto`
--
ALTER TABLE `cat018_tipo_producto`
  ADD PRIMARY KEY (`folio`);

--
-- Indices de la tabla `cat019_servicios`
--
ALTER TABLE `cat019_servicios`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `categoria` (`categoria`);

--
-- Indices de la tabla `cat020_inventario`
--
ALTER TABLE `cat020_inventario`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `producto` (`producto`),
  ADD KEY `unidades` (`unidades`);

--
-- Indices de la tabla `cat021_claves_seguimiento`
--
ALTER TABLE `cat021_claves_seguimiento`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `usuario` (`usuario`),
  ADD KEY `proyecto` (`proyecto`);

--
-- Indices de la tabla `cat022_operaciones`
--
ALTER TABLE `cat022_operaciones`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `id_bene` (`id_bene`),
  ADD KEY `emisor` (`emisor`),
  ADD KEY `clave` (`clave`),
  ADD KEY `tipo_operacion` (`tipo_operacion`);

--
-- Indices de la tabla `cat023_unidades`
--
ALTER TABLE `cat023_unidades`
  ADD PRIMARY KEY (`folio`);

--
-- Indices de la tabla `cat024_tipo_operacion`
--
ALTER TABLE `cat024_tipo_operacion`
  ADD PRIMARY KEY (`folio`);

--
-- Indices de la tabla `cat025_estatus_proyecto`
--
ALTER TABLE `cat025_estatus_proyecto`
  ADD PRIMARY KEY (`folio`);

--
-- Indices de la tabla `cat026_estatus_tarea`
--
ALTER TABLE `cat026_estatus_tarea`
  ADD PRIMARY KEY (`folio`);

--
-- Indices de la tabla `op002_etapas`
--
ALTER TABLE `op002_etapas`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `area` (`area`),
  ADD KEY `proyecto` (`proyecto`);

--
-- Indices de la tabla `op003_tareas`
--
ALTER TABLE `op003_tareas`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `etapa` (`etapa`),
  ADD KEY `tipo` (`tipo`),
  ADD KEY `estatus` (`estatus`);

--
-- Indices de la tabla `op004_reporte`
--
ALTER TABLE `op004_reporte`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `tarea` (`tarea`),
  ADD KEY `usuario` (`usuario`);

--
-- Indices de la tabla `op005_roles`
--
ALTER TABLE `op005_roles`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `usuario` (`usuario`),
  ADD KEY `proyecto` (`proyecto`),
  ADD KEY `rol` (`rol`);

--
-- Indices de la tabla `op006_asistencia`
--
ALTER TABLE `op006_asistencia`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `usuario` (`usuario`),
  ADD KEY `proyecto` (`proyecto`);

--
-- Indices de la tabla `op007_marca_proveedor`
--
ALTER TABLE `op007_marca_proveedor`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `proveedor` (`proveedor`),
  ADD KEY `marca` (`marca`);

--
-- Indices de la tabla `op008_lista_productos`
--
ALTER TABLE `op008_lista_productos`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `producto` (`producto`),
  ADD KEY `cotizacion` (`cotizacion`);

--
-- Indices de la tabla `op009_lista_servicios`
--
ALTER TABLE `op009_lista_servicios`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `servicio` (`servicio`),
  ADD KEY `cotizacion` (`cotizacion`);

--
-- Indices de la tabla `op010_compras`
--
ALTER TABLE `op010_compras`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `producto` (`producto`),
  ADD KEY `unidades` (`unidades`);

--
-- Indices de la tabla `op011_material_proyecto`
--
ALTER TABLE `op011_material_proyecto`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `producto` (`producto`),
  ADD KEY `proyecto` (`proyecto`),
  ADD KEY `unidades` (`unidades`);

--
-- Indices de la tabla `op012_presupuesto_proyecto`
--
ALTER TABLE `op012_presupuesto_proyecto`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `proyecto` (`proyecto`);

--
-- Indices de la tabla `op013_material_usuario`
--
ALTER TABLE `op013_material_usuario`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `producto` (`producto`),
  ADD KEY `usuario` (`usuario`),
  ADD KEY `unidades` (`unidades`);

--
-- Indices de la tabla `op014_tarea_usuario`
--
ALTER TABLE `op014_tarea_usuario`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `usuario` (`usuario`),
  ADD KEY `tarea` (`tarea`);

--
-- Indices de la tabla `op015_contacto_ubicacion`
--
ALTER TABLE `op015_contacto_ubicacion`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `ubicacion` (`ubicacion`),
  ADD KEY `contacto` (`contacto`);

--
-- Indices de la tabla `op016_movimientos_inventario`
--
ALTER TABLE `op016_movimientos_inventario`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `producto` (`producto`),
  ADD KEY `usuario` (`usuario`);

--
-- Indices de la tabla `op017_cotizacion_pdf`
--
ALTER TABLE `op017_cotizacion_pdf`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `cotizacion` (`cotizacion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cat001_usuarios`
--
ALTER TABLE `cat001_usuarios`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `cat003_clientes`
--
ALTER TABLE `cat003_clientes`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `cat005_tipo_servicio`
--
ALTER TABLE `cat005_tipo_servicio`
  MODIFY `folio` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `cat006_contactos`
--
ALTER TABLE `cat006_contactos`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `cat007_ubicaciones`
--
ALTER TABLE `cat007_ubicaciones`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `cat008_areas`
--
ALTER TABLE `cat008_areas`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `cat009_proyectos`
--
ALTER TABLE `cat009_proyectos`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `cat010_tipo_tareas`
--
ALTER TABLE `cat010_tipo_tareas`
  MODIFY `folio` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cat011_roles_proyecto`
--
ALTER TABLE `cat011_roles_proyecto`
  MODIFY `folio` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `cat012_tipo_cliente`
--
ALTER TABLE `cat012_tipo_cliente`
  MODIFY `folio` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cat013_cotizaciones`
--
ALTER TABLE `cat013_cotizaciones`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `cat014_proveedores`
--
ALTER TABLE `cat014_proveedores`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `cat015_marcas`
--
ALTER TABLE `cat015_marcas`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `cat016_productos`
--
ALTER TABLE `cat016_productos`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `cat017_categoria_producto`
--
ALTER TABLE `cat017_categoria_producto`
  MODIFY `folio` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `cat018_tipo_producto`
--
ALTER TABLE `cat018_tipo_producto`
  MODIFY `folio` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `cat019_servicios`
--
ALTER TABLE `cat019_servicios`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cat020_inventario`
--
ALTER TABLE `cat020_inventario`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `cat021_claves_seguimiento`
--
ALTER TABLE `cat021_claves_seguimiento`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `cat022_operaciones`
--
ALTER TABLE `cat022_operaciones`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `cat023_unidades`
--
ALTER TABLE `cat023_unidades`
  MODIFY `folio` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `cat024_tipo_operacion`
--
ALTER TABLE `cat024_tipo_operacion`
  MODIFY `folio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cat025_estatus_proyecto`
--
ALTER TABLE `cat025_estatus_proyecto`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `cat026_estatus_tarea`
--
ALTER TABLE `cat026_estatus_tarea`
  MODIFY `folio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `op002_etapas`
--
ALTER TABLE `op002_etapas`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `op003_tareas`
--
ALTER TABLE `op003_tareas`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `op004_reporte`
--
ALTER TABLE `op004_reporte`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `op005_roles`
--
ALTER TABLE `op005_roles`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `op006_asistencia`
--
ALTER TABLE `op006_asistencia`
  MODIFY `folio` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `op007_marca_proveedor`
--
ALTER TABLE `op007_marca_proveedor`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `op008_lista_productos`
--
ALTER TABLE `op008_lista_productos`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `op009_lista_servicios`
--
ALTER TABLE `op009_lista_servicios`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `op013_material_usuario`
--
ALTER TABLE `op013_material_usuario`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `op014_tarea_usuario`
--
ALTER TABLE `op014_tarea_usuario`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `op015_contacto_ubicacion`
--
ALTER TABLE `op015_contacto_ubicacion`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `op016_movimientos_inventario`
--
ALTER TABLE `op016_movimientos_inventario`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `op017_cotizacion_pdf`
--
ALTER TABLE `op017_cotizacion_pdf`
  MODIFY `folio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cat003_clientes`
--
ALTER TABLE `cat003_clientes`
  ADD CONSTRAINT `cat003_clientes_ibfk_1` FOREIGN KEY (`tipo_cliente`) REFERENCES `cat012_tipo_cliente` (`folio`),
  ADD CONSTRAINT `cat003_clientes_ibfk_2` FOREIGN KEY (`tipo_servicio`) REFERENCES `cat005_tipo_servicio` (`folio`);

--
-- Filtros para la tabla `cat009_proyectos`
--
ALTER TABLE `cat009_proyectos`
  ADD CONSTRAINT `cat009_proyectos_ibfk_2` FOREIGN KEY (`estatus`) REFERENCES `cat025_estatus_proyecto` (`folio`);

--
-- Filtros para la tabla `cat021_claves_seguimiento`
--
ALTER TABLE `cat021_claves_seguimiento`
  ADD CONSTRAINT `cat021_claves_seguimiento_ibfk_1` FOREIGN KEY (`proyecto`) REFERENCES `cat009_proyectos` (`folio`);

--
-- Filtros para la tabla `cat022_operaciones`
--
ALTER TABLE `cat022_operaciones`
  ADD CONSTRAINT `cat001_usuarios_ibfk_4` FOREIGN KEY (`tipo_operacion`) REFERENCES `cat024_tipo_operacion` (`folio`);

--
-- Filtros para la tabla `op003_tareas`
--
ALTER TABLE `op003_tareas`
  ADD CONSTRAINT `op003_tareas_ibfk_3` FOREIGN KEY (`estatus`) REFERENCES `cat026_estatus_tarea` (`folio`);

--
-- Filtros para la tabla `op014_tarea_usuario`
--
ALTER TABLE `op014_tarea_usuario`
  ADD CONSTRAINT `op014_tarea_usuario_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `cat001_usuarios` (`folio`),
  ADD CONSTRAINT `op014_tarea_usuario_ibfk_2` FOREIGN KEY (`tarea`) REFERENCES `op003_tareas` (`folio`);

--
-- Filtros para la tabla `op016_movimientos_inventario`
--
ALTER TABLE `op016_movimientos_inventario`
  ADD CONSTRAINT `op016_movimientos_inventario_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `cat001_usuarios` (`folio`),
  ADD CONSTRAINT `op016_movimientos_inventario_ibfk_2` FOREIGN KEY (`producto`) REFERENCES `cat016_productos` (`folio`);

--
-- Filtros para la tabla `op017_cotizacion_pdf`
--
ALTER TABLE `op017_cotizacion_pdf`
  ADD CONSTRAINT `op017_cotizacion_pdf_ibfk_1` FOREIGN KEY (`cotizacion`) REFERENCES `cat013_cotizaciones` (`folio`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
