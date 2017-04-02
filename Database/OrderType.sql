CREATE TABLE `CStock`.`OrderType` (
  `OrderTypeId` INT NOT NULL AUTO_INCREMENT,
  `OrderType` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`OrderTypeId`));


INSERT INTO OrderType (OrderType) VALUES ('Market'), ('LIMIT'), ('STOP')