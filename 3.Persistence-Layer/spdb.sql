-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-12-2016 a las 16:51:04
-- Versión del servidor: 5.6.21
-- Versión de PHP: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `spdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `address`
--

CREATE TABLE IF NOT EXISTS `address` (
`idAddress` int(11) NOT NULL,
  `address` varchar(45) NOT NULL,
  `idProvider` int(11) DEFAULT NULL,
  `idCity` int(11) NOT NULL,
  `idClient` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area`
--

CREATE TABLE IF NOT EXISTS `area` (
`idArea` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `budget`
--

CREATE TABLE IF NOT EXISTS `budget` (
`idBudget` int(11) NOT NULL,
  `observations` text,
  `date` date NOT NULL,
  `commercialConditions` text,
  `bruteTotal` double NOT NULL,
  `IVA` double NOT NULL,
  `months` int(11) NOT NULL,
  `activityTotal` double NOT NULL,
  `idProject` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `budgetps`
--

CREATE TABLE IF NOT EXISTS `budgetps` (
`idBudgetPS` int(11) NOT NULL,
  `margin` double NOT NULL,
  `amount` int(11) NOT NULL,
  `days` int(11) NOT NULL,
  `unitValue` double NOT NULL,
  `idProductService` int(11) NOT NULL,
  `idBudget` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `city`
--

CREATE TABLE IF NOT EXISTS `city` (
`idCity` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `idCountry` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `client`
--

CREATE TABLE IF NOT EXISTS `client` (
`idClient` int(11) NOT NULL,
  `NIT` varchar(45) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contact`
--

CREATE TABLE IF NOT EXISTS `contact` (
`idContact` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phoneNumber` varchar(45) NOT NULL,
  `idProvider` int(11) DEFAULT NULL,
  `idClient` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `country`
--

CREATE TABLE IF NOT EXISTS `country` (
`idCountry` int(11) NOT NULL,
  `countryCode` varchar(5) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `expenses`
--

CREATE TABLE IF NOT EXISTS `expenses` (
`idExpenses` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` text,
  `value` double NOT NULL,
  `idBudgetPS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productservice`
--

CREATE TABLE IF NOT EXISTS `productservice` (
`idProductService` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` text,
  `price` double NOT NULL,
  `idProvider` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `project`
--

CREATE TABLE IF NOT EXISTS `project` (
`idProject` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `idClient` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provider`
--

CREATE TABLE IF NOT EXISTS `provider` (
`idProvider` int(11) NOT NULL,
  `NIT` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role`
--

CREATE TABLE IF NOT EXISTS `role` (
`idRole` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE IF NOT EXISTS `user` (
`idUser` int(11) NOT NULL,
  `document` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `userName` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `idArea` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_role`
--

CREATE TABLE IF NOT EXISTS `user_role` (
`idUser_Role` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idRole` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `value`
--

CREATE TABLE IF NOT EXISTS `value` (
`idValue` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `address`
--
ALTER TABLE `address`
 ADD PRIMARY KEY (`idAddress`), ADD KEY `fk_Address_Provider1_idx` (`idProvider`), ADD KEY `fk_Address_City1_idx` (`idCity`), ADD KEY `fk_Address_Client1_idx` (`idClient`);

--
-- Indices de la tabla `area`
--
ALTER TABLE `area`
 ADD PRIMARY KEY (`idArea`);

--
-- Indices de la tabla `budget`
--
ALTER TABLE `budget`
 ADD PRIMARY KEY (`idBudget`), ADD KEY `fk_Budget_Project1_idx` (`idProject`);

--
-- Indices de la tabla `budgetps`
--
ALTER TABLE `budgetps`
 ADD PRIMARY KEY (`idBudgetPS`), ADD KEY `fk_BudgetPS_ProductService1_idx` (`idProductService`), ADD KEY `fk_BudgetPS_Budget1_idx` (`idBudget`);

--
-- Indices de la tabla `city`
--
ALTER TABLE `city`
 ADD PRIMARY KEY (`idCity`), ADD KEY `fk_City_Country1_idx` (`idCountry`);

--
-- Indices de la tabla `client`
--
ALTER TABLE `client`
 ADD PRIMARY KEY (`idClient`);

--
-- Indices de la tabla `contact`
--
ALTER TABLE `contact`
 ADD PRIMARY KEY (`idContact`), ADD KEY `fk_Contact_Provider1_idx` (`idProvider`), ADD KEY `fk_Contact_Client1_idx` (`idClient`);

--
-- Indices de la tabla `country`
--
ALTER TABLE `country`
 ADD PRIMARY KEY (`idCountry`);

--
-- Indices de la tabla `expenses`
--
ALTER TABLE `expenses`
 ADD PRIMARY KEY (`idExpenses`), ADD KEY `fk_Expenses_BudgetPS1_idx` (`idBudgetPS`);

--
-- Indices de la tabla `productservice`
--
ALTER TABLE `productservice`
 ADD PRIMARY KEY (`idProductService`), ADD KEY `fk_ProductService_Provider1_idx` (`idProvider`);

--
-- Indices de la tabla `project`
--
ALTER TABLE `project`
 ADD PRIMARY KEY (`idProject`), ADD KEY `fk_Project_Client1_idx` (`idClient`);

--
-- Indices de la tabla `provider`
--
ALTER TABLE `provider`
 ADD PRIMARY KEY (`idProvider`);

--
-- Indices de la tabla `role`
--
ALTER TABLE `role`
 ADD PRIMARY KEY (`idRole`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
 ADD PRIMARY KEY (`idUser`), ADD KEY `fk_User_Area_idx` (`idArea`);

--
-- Indices de la tabla `user_role`
--
ALTER TABLE `user_role`
 ADD PRIMARY KEY (`idUser_Role`), ADD KEY `fk_User_Role_User1_idx` (`idUser`), ADD KEY `fk_User_Role_Role1_idx` (`idRole`);

--
-- Indices de la tabla `value`
--
ALTER TABLE `value`
 ADD PRIMARY KEY (`idValue`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `address`
--
ALTER TABLE `address`
MODIFY `idAddress` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `area`
--
ALTER TABLE `area`
MODIFY `idArea` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `budget`
--
ALTER TABLE `budget`
MODIFY `idBudget` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `budgetps`
--
ALTER TABLE `budgetps`
MODIFY `idBudgetPS` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `city`
--
ALTER TABLE `city`
MODIFY `idCity` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `client`
--
ALTER TABLE `client`
MODIFY `idClient` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `contact`
--
ALTER TABLE `contact`
MODIFY `idContact` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `country`
--
ALTER TABLE `country`
MODIFY `idCountry` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `expenses`
--
ALTER TABLE `expenses`
MODIFY `idExpenses` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `productservice`
--
ALTER TABLE `productservice`
MODIFY `idProductService` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `project`
--
ALTER TABLE `project`
MODIFY `idProject` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `provider`
--
ALTER TABLE `provider`
MODIFY `idProvider` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `role`
--
ALTER TABLE `role`
MODIFY `idRole` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `user_role`
--
ALTER TABLE `user_role`
MODIFY `idUser_Role` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `value`
--
ALTER TABLE `value`
MODIFY `idValue` int(11) NOT NULL AUTO_INCREMENT;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `address`
--
ALTER TABLE `address`
ADD CONSTRAINT `fk_Address_City1` FOREIGN KEY (`idCity`) REFERENCES `city` (`idCity`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_Address_Client1` FOREIGN KEY (`idClient`) REFERENCES `client` (`idClient`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_Address_Provider1` FOREIGN KEY (`idProvider`) REFERENCES `provider` (`idProvider`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `budget`
--
ALTER TABLE `budget`
ADD CONSTRAINT `fk_Budget_Project1` FOREIGN KEY (`idProject`) REFERENCES `project` (`idProject`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `budgetps`
--
ALTER TABLE `budgetps`
ADD CONSTRAINT `fk_BudgetPS_Budget1` FOREIGN KEY (`idBudget`) REFERENCES `budget` (`idBudget`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_BudgetPS_ProductService1` FOREIGN KEY (`idProductService`) REFERENCES `productservice` (`idProductService`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `city`
--
ALTER TABLE `city`
ADD CONSTRAINT `fk_City_Country1` FOREIGN KEY (`idCountry`) REFERENCES `country` (`idCountry`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `contact`
--
ALTER TABLE `contact`
ADD CONSTRAINT `fk_Contact_Client1` FOREIGN KEY (`idClient`) REFERENCES `client` (`idClient`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_Contact_Provider1` FOREIGN KEY (`idProvider`) REFERENCES `provider` (`idProvider`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `expenses`
--
ALTER TABLE `expenses`
ADD CONSTRAINT `fk_Expenses_BudgetPS1` FOREIGN KEY (`idBudgetPS`) REFERENCES `budgetps` (`idBudgetPS`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `productservice`
--
ALTER TABLE `productservice`
ADD CONSTRAINT `fk_ProductService_Provider1` FOREIGN KEY (`idProvider`) REFERENCES `provider` (`idProvider`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `project`
--
ALTER TABLE `project`
ADD CONSTRAINT `fk_Project_Client1` FOREIGN KEY (`idClient`) REFERENCES `client` (`idClient`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
ADD CONSTRAINT `fk_User_Area` FOREIGN KEY (`idArea`) REFERENCES `area` (`idArea`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `user_role`
--
ALTER TABLE `user_role`
ADD CONSTRAINT `fk_User_Role_Role1` FOREIGN KEY (`idRole`) REFERENCES `role` (`idRole`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_User_Role_User1` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
