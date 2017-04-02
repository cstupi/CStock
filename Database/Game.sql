CREATE TABLE `CStock`.`Game` (
  `GameId` INT NOT NULL AUTO_INCREMENT,
  `GameName` VARCHAR(256) NOT NULL,
  `GamePassword` VARCHAR(256) NULL,
  PRIMARY KEY (`GameId`),
  UNIQUE INDEX `GameName_UNIQUE` (`GameName` ASC));
