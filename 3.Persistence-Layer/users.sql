-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-12-2016 a las 09:18:26
-- Versión del servidor: 5.6.21
-- Versión de PHP: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `users`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE IF NOT EXISTS `rol` (
`idRol` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(45) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`idRol`, `name`, `description`) VALUES
(1, 'Admin', 'Todos los permisos concedidos'),
(2, 'Empleado', 'Solo puede ver');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE IF NOT EXISTS `user` (
`idUser` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(40) NOT NULL,
  `name` varchar(100) NOT NULL,
  `Rol_idRol` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`idUser`, `username`, `password`, `name`, `Rol_idRol`) VALUES
(1, 'stevenn2012', '6a2fd31903aea794fe7b6ab88450855e', 'Steven Puerto', 1),
(2, 'natsu400', 'e10adc3949ba59abbe56e057f20f883e', 'Natsu Dragnel', 2),
(3, 'grayblue', 'e99a18c428cb38d5f260853678922e03', 'Gray Fullbuster', 2),
(4, 'lucy94', 'a906449d5769fa7361d7ecc6aa3f6d28', 'Lucy Heartfilia', 2),
(5, 'stevenn20', '3fa1e85ccadc8b7962ddf117af0d46fd', 'Haren', 1),
(6, 'admin', 'e10adc3949ba59abbe56e057f20f883e', 'Admin', 1),
(7, 'kirito22', 'e10adc3949ba59abbe56e057f20f883e', 'kirito', 2),
(8, 'kirito22', 'e10adc3949ba59abbe56e057f20f883e', 'kirito', 2),
(9, 'asuna23', 'e10adc3949ba59abbe56e057f20f883e', 'Asuna', 2),
(10, 'kymaru2012', 'e10adc3949ba59abbe56e057f20f883e', 'kymaru', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
 ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
 ADD PRIMARY KEY (`idUser`), ADD KEY `fk_User_Rol_idx` (`Rol_idRol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
ADD CONSTRAINT `fk_User_Rol` FOREIGN KEY (`Rol_idRol`) REFERENCES `rol` (`idRol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
