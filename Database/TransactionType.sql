CREATE TABLE `CStock`.`TransactionType` (
  `TransactionTypeId` INT NOT NULL AUTO_INCREMENT,
  `TransactionType` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`TransactionTypeId`));


INSERT INTO TransactionType (TransactionType) VALUES ('BUY'), ('SELL'), ('BUYCOVER'), ('SELLSHORT'), ('DIV')