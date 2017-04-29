CREATE TABLE `CStock`.`XigniteAlerts` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `XigniteId` INT NOT NULL,
  `OrderId` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `Xignite_Order_FK_idx` (`OrderId` ASC),
  CONSTRAINT `Xignite_Order_FK`
    FOREIGN KEY (`OrderId`)
    REFERENCES `CStock`.`Order` (`OrderId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
