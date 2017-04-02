CREATE TABLE `CStock`.`MarketStatus` (
  `MarketStatusId` INT NOT NULL AUTO_INCREMENT,
  `Status` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`MarketStatusId`));


INSERT INTO MarketStatus (Status) VALUES ('PENDING'), ('CANCELED'), ('COMPLETE'), ('INVALID')