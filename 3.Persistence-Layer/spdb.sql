-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema SPDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema SPDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `SPDB` DEFAULT CHARACTER SET utf8 ;
USE `SPDB` ;

-- -----------------------------------------------------
-- Table `SPDB`.`Area`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SPDB`.`Area` (
  `idArea` BIGINT(64) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idArea`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SPDB`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SPDB`.`User` (
  `idUser` BIGINT(64) NOT NULL AUTO_INCREMENT,
  `document` BIGINT(64) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `userName` VARCHAR(100) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `idArea` BIGINT(64) NOT NULL,
  `email` VARCHAR(100) NULL,
  PRIMARY KEY (`idUser`),
  INDEX `fk_User_Area_idx` (`idArea` ASC),
  CONSTRAINT `fk_User_Area`
    FOREIGN KEY (`idArea`)
    REFERENCES `SPDB`.`Area` (`idArea`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SPDB`.`Role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SPDB`.`Role` (
  `idRole` BIGINT(64) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`idRole`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SPDB`.`User_Role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SPDB`.`User_Role` (
  `idUser_Role` BIGINT(64) NOT NULL AUTO_INCREMENT,
  `idUser` BIGINT(64) NOT NULL,
  `idRole` BIGINT(64) NOT NULL,
  PRIMARY KEY (`idUser_Role`),
  INDEX `fk_User_Role_User1_idx` (`idUser` ASC),
  INDEX `fk_User_Role_Role1_idx` (`idRole` ASC),
  CONSTRAINT `fk_User_Role_User1`
    FOREIGN KEY (`idUser`)
    REFERENCES `SPDB`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_Role_Role1`
    FOREIGN KEY (`idRole`)
    REFERENCES `SPDB`.`Role` (`idRole`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SPDB`.`Provider`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SPDB`.`Provider` (
  `idProvider` BIGINT(64) NOT NULL AUTO_INCREMENT,
  `NIT` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`idProvider`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SPDB`.`Country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SPDB`.`Country` (
  `idCountry` BIGINT(64) NOT NULL AUTO_INCREMENT,
  `countryCode` VARCHAR(5) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCountry`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SPDB`.`City`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SPDB`.`City` (
  `idCity` BIGINT(64) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `idCountry` BIGINT(64) NOT NULL,
  PRIMARY KEY (`idCity`),
  INDEX `fk_City_Country1_idx` (`idCountry` ASC),
  CONSTRAINT `fk_City_Country1`
    FOREIGN KEY (`idCountry`)
    REFERENCES `SPDB`.`Country` (`idCountry`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SPDB`.`Client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SPDB`.`Client` (
  `idClient` BIGINT(64) NOT NULL AUTO_INCREMENT,
  `NIT` VARCHAR(45) NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`idClient`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SPDB`.`Address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SPDB`.`Address` (
  `idAddress` BIGINT(64) NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(45) NOT NULL,
  `idProvider` BIGINT(64) NULL,
  `idCity` BIGINT(64) NOT NULL,
  `idClient` BIGINT(64) NULL,
  PRIMARY KEY (`idAddress`),
  INDEX `fk_Address_Provider1_idx` (`idProvider` ASC),
  INDEX `fk_Address_City1_idx` (`idCity` ASC),
  INDEX `fk_Address_Client1_idx` (`idClient` ASC),
  CONSTRAINT `fk_Address_Provider1`
    FOREIGN KEY (`idProvider`)
    REFERENCES `SPDB`.`Provider` (`idProvider`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Address_City1`
    FOREIGN KEY (`idCity`)
    REFERENCES `SPDB`.`City` (`idCity`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Address_Client1`
    FOREIGN KEY (`idClient`)
    REFERENCES `SPDB`.`Client` (`idClient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SPDB`.`Contact`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SPDB`.`Contact` (
  `idContact` BIGINT(64) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phoneNumber` VARCHAR(100) NOT NULL,
  `idProvider` BIGINT(64) NULL,
  `idClient` BIGINT(64) NULL,
  PRIMARY KEY (`idContact`),
  INDEX `fk_Contact_Provider1_idx` (`idProvider` ASC),
  INDEX `fk_Contact_Client1_idx` (`idClient` ASC),
  CONSTRAINT `fk_Contact_Provider1`
    FOREIGN KEY (`idProvider`)
    REFERENCES `SPDB`.`Provider` (`idProvider`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Contact_Client1`
    FOREIGN KEY (`idClient`)
    REFERENCES `SPDB`.`Client` (`idClient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SPDB`.`ProductService`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SPDB`.`ProductService` (
  `idProductService` BIGINT(64) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  `price` DECIMAL NOT NULL,
  `idProvider` BIGINT(64) NOT NULL,
  PRIMARY KEY (`idProductService`),
  INDEX `fk_ProductService_Provider1_idx` (`idProvider` ASC),
  CONSTRAINT `fk_ProductService_Provider1`
    FOREIGN KEY (`idProvider`)
    REFERENCES `SPDB`.`Provider` (`idProvider`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SPDB`.`Project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SPDB`.`Project` (
  `idProject` BIGINT(64) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `idClient` BIGINT(64) NOT NULL,
  `User_idUser` BIGINT(64) NOT NULL,
  PRIMARY KEY (`idProject`),
  INDEX `fk_Project_Client1_idx` (`idClient` ASC),
  INDEX `fk_Project_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_Project_Client1`
    FOREIGN KEY (`idClient`)
    REFERENCES `SPDB`.`Client` (`idClient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Project_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `SPDB`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SPDB`.`Budget`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SPDB`.`Budget` (
  `idBudget` BIGINT(64) NOT NULL AUTO_INCREMENT,
  `observations` TEXT NULL,
  `date` DATE NOT NULL,
  `commercialConditions` TEXT NULL,
  `bruteTotal` DECIMAL NOT NULL,
  `IVA` DECIMAL NOT NULL,
  `months` INT NOT NULL,
  `activityTotal` DECIMAL NOT NULL,
  `idProject` BIGINT(64) NOT NULL,
  PRIMARY KEY (`idBudget`),
  INDEX `fk_Budget_Project1_idx` (`idProject` ASC),
  CONSTRAINT `fk_Budget_Project1`
    FOREIGN KEY (`idProject`)
    REFERENCES `SPDB`.`Project` (`idProject`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SPDB`.`BudgetPS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SPDB`.`BudgetPS` (
  `idBudgetPS` BIGINT(64) NOT NULL AUTO_INCREMENT,
  `margin` DECIMAL NOT NULL,
  `amount` BIGINT(64) NOT NULL,
  `days` INT NOT NULL,
  `unitValue` DECIMAL NOT NULL,
  `idProductService` BIGINT(64) NOT NULL,
  `idBudget` BIGINT(64) NOT NULL,
  PRIMARY KEY (`idBudgetPS`),
  INDEX `fk_BudgetPS_ProductService1_idx` (`idProductService` ASC),
  INDEX `fk_BudgetPS_Budget1_idx` (`idBudget` ASC),
  CONSTRAINT `fk_BudgetPS_ProductService1`
    FOREIGN KEY (`idProductService`)
    REFERENCES `SPDB`.`ProductService` (`idProductService`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_BudgetPS_Budget1`
    FOREIGN KEY (`idBudget`)
    REFERENCES `SPDB`.`Budget` (`idBudget`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SPDB`.`Expenses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SPDB`.`Expenses` (
  `idExpenses` BIGINT(64) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  `value` DECIMAL NOT NULL,
  `idBudgetPS` BIGINT(64) NOT NULL,
  PRIMARY KEY (`idExpenses`),
  INDEX `fk_Expenses_BudgetPS1_idx` (`idBudgetPS` ASC),
  CONSTRAINT `fk_Expenses_BudgetPS1`
    FOREIGN KEY (`idBudgetPS`)
    REFERENCES `SPDB`.`BudgetPS` (`idBudgetPS`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SPDB`.`Value`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SPDB`.`Value` (
  `idValue` BIGINT(64) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `value` DECIMAL NOT NULL,
  PRIMARY KEY (`idValue`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
