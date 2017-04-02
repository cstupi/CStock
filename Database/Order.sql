CREATE TABLE `CStock`.`Order` (
  `OrderId` INT NOT NULL AUTO_INCREMENT,
  `TransactionType` INT NOT NULL,
  `OrderType` INT NOT NULL,
  `Status` INT NOT NULL,
  `ExpirationDate` DATETIME NULL,
  `ExecutionDate` DATE NULL,
  `Asset` VARCHAR(255) NOT NULL,
  `COUNT` DOUBLE NOT NULL,
  `PRICE` DOUBLE NULL,
  PRIMARY KEY (`OrderId`),
  INDEX `Order_Status_FK_idx` (`Status` ASC),
  INDEX `Order_TransType_FK_idx` (`TransactionType` ASC),
  INDEX `Order_OrderType_FK_idx` (`OrderType` ASC),
  CONSTRAINT `Order_Status_FK`
    FOREIGN KEY (`Status`)
    REFERENCES `CStock`.`MarketStatus` (`MarketStatusId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Order_TransType_FK`
    FOREIGN KEY (`TransactionType`)
    REFERENCES `CStock`.`TransactionType` (`TransactionTypeId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Order_OrderType_FK`
    FOREIGN KEY (`OrderType`)
    REFERENCES `CStock`.`OrderType` (`OrderTypeId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
