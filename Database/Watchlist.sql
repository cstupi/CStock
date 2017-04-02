CREATE TABLE `CStock`.`Watchlist` (
  `WatchlistId` INT NOT NULL AUTO_INCREMENT,
  `UserId` INT NOT NULL,
  `Asset` VARCHAR(256) NULL,
  PRIMARY KEY (`WatchlistId`),
  INDEX `UserId_idx` (`UserId` ASC),
  CONSTRAINT `UserId`
    FOREIGN KEY (`UserId`)
    REFERENCES `CStock`.`User` (`UserId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
