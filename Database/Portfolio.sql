CREATE TABLE `CStock`.`Portfolio` (
  `PortfolioId` INT NOT NULL AUTO_INCREMENT,
  `UserId` INT NOT NULL,
  `Asset` VARCHAR(256) NOT NULL,
  `Count` DOUBLE NOT NULL,
  PRIMARY KEY (`PortfolioId`),
  INDEX `UserId_idx` (`UserId` ASC),
  CONSTRAINT `Port_UserId_FK`
    FOREIGN KEY (`UserId`)
    REFERENCES `CStock`.`User` (`UserId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
