-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-03-2016 a las 09:32:05
-- Versión del servidor: 5.5.39
-- Versión de PHP: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `carrenting`
--
CREATE DATABASE IF NOT EXISTS `carrenting` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `carrenting`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alquiler`
--

DROP TABLE IF EXISTS `alquiler`;
CREATE TABLE IF NOT EXISTS `alquiler` (
`IdAlquiler` int(11) NOT NULL,
  `IdCliente` varchar(9) NOT NULL,
  `Matricula` varchar(8) NOT NULL,
  `FechaSalida` date NOT NULL,
  `FechaEntrada` date NOT NULL,
  `Importe` float NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=35 ;

--
-- Volcado de datos para la tabla `alquiler`
--

INSERT INTO `alquiler` (`IdAlquiler`, `IdCliente`, `Matricula`, `FechaSalida`, `FechaEntrada`, `Importe`) VALUES
(34, '111', '3920GJB', '2016-03-08', '2016-03-11', 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

DROP TABLE IF EXISTS `cliente`;
CREATE TABLE IF NOT EXISTS `cliente` (
  `IdCliente` varchar(10) NOT NULL DEFAULT '',
  `Nombre` varchar(20) NOT NULL,
  `Direccion` varchar(50) NOT NULL,
  `Telefono` int(9) NOT NULL,
  `Email` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`IdCliente`, `Nombre`, `Direccion`, `Telefono`, `Email`) VALUES
('15485697g', 'Maria', 'General Prim', 654987321, 'a@a.aa'),
('58710697g', 'Daniel', 'Mi casa', 123456789, 'dan@dan.es'),
('74125841a', 'Jorge', 'calle nueva', 123456789, 'e@r.ty');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seguro`
--

DROP TABLE IF EXISTS `seguro`;
CREATE TABLE IF NOT EXISTS `seguro` (
`IdSeguro` int(11) NOT NULL,
  `Descripcion` varchar(20) NOT NULL,
  `Precio` float NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `seguro`
--

INSERT INTO `seguro` (`IdSeguro`, `Descripcion`, `Precio`) VALUES
(1, 'Todo Riesgo', 400),
(2, 'A terceros', 250);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarifa`
--

DROP TABLE IF EXISTS `tarifa`;
CREATE TABLE IF NOT EXISTS `tarifa` (
`IdTarifa` int(11) NOT NULL,
  `Tipo` varchar(1) NOT NULL,
  `Importe` float NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `tarifa`
--

INSERT INTO `tarifa` (`IdTarifa`, `Tipo`, `Importe`) VALUES
(1, 'A', 5),
(2, 'B', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo`
--

DROP TABLE IF EXISTS `vehiculo`;
CREATE TABLE IF NOT EXISTS `vehiculo` (
  `Matricula` varchar(8) NOT NULL,
  `Marca` varchar(15) NOT NULL,
  `Modelo` varchar(15) NOT NULL,
  `TipoCombustible` varchar(10) NOT NULL,
  `Tipo` varchar(1) NOT NULL,
  `IdSeguro` int(11) NOT NULL,
  `IdTarifa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `vehiculo`
--

INSERT INTO `vehiculo` (`Matricula`, `Marca`, `Modelo`, `TipoCombustible`, `Tipo`, `IdSeguro`, `IdTarifa`) VALUES
('3920GJB', 'Seat', 'Ibiza', 'gasolina', 'A', 1, 1),
('8747BTF', 'Opel', 'Astra', 'gasolina', 'C', 2, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alquiler`
--
ALTER TABLE `alquiler`
 ADD PRIMARY KEY (`IdAlquiler`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
 ADD PRIMARY KEY (`IdCliente`);

--
-- Indices de la tabla `seguro`
--
ALTER TABLE `seguro`
 ADD PRIMARY KEY (`IdSeguro`);

--
-- Indices de la tabla `tarifa`
--
ALTER TABLE `tarifa`
 ADD PRIMARY KEY (`IdTarifa`);

--
-- Indices de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
 ADD PRIMARY KEY (`Matricula`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alquiler`
--
ALTER TABLE `alquiler`
MODIFY `IdAlquiler` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT de la tabla `seguro`
--
ALTER TABLE `seguro`
MODIFY `IdSeguro` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `tarifa`
--
ALTER TABLE `tarifa`
MODIFY `IdTarifa` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
